const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = 5000;

function isText(value, maxLength = MAX_LENGTH) {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

function isEmail(value) {
  return isText(value, 254) && EMAIL_PATTERN.test(value);
}

function getBookingDetails(body) {
  if (
    !isText(body.name, 120) ||
    !isEmail(body.email) ||
    !isText(body.phone, 32) ||
    !/^[+()\d.\-\s]{7,32}$/.test(body.phone.trim()) ||
    !isText(body.project, 120) ||
    !isText(body.description) ||
    !isText(body.startAt, 64) ||
    !isText(body.timeZone, 100)
  ) return null;

  const start = new Date(body.startAt);
  if (!Number.isFinite(start.getTime()) || start.getTime() <= Date.now()) return null;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: body.timeZone }).format(start);
  } catch {
    return null;
  }

  return {
    name: body.name.trim(),
    email: body.email.trim(),
    phone: body.phone.trim(),
    project: body.project.trim(),
    description: body.description.trim(),
    start,
    timeZone: body.timeZone,
  };
}

function getEmailContent(body, booking) {
  if (body.type === 'booking' && booking) {
    return {
      subject: `Project call booking: ${booking.project}`,
      replyTo: booking.email,
      text: [
        'New project call booking',
        `Project: ${booking.project}`,
        `Name: ${booking.name}`,
        `Email: ${booking.email}`,
        `Phone: ${booking.phone}`,
        `Requested time: ${booking.start.toLocaleString('en-US', { timeZone: booking.timeZone, timeZoneName: 'short' })}`,
        '',
        'Project discussion details:',
        booking.description,
      ].join('\n'),
    };
  }

  if (body.type === 'ai-configurator') {
    if (
      !isText(body.name, 120) ||
      !isEmail(body.email) ||
      !isText(body.product, 120) ||
      !Array.isArray(body.features) ||
      body.features.length < 1 ||
      body.features.length > 20 ||
      !body.features.every((feature) => isText(feature, 120)) ||
      (body.notes != null && typeof body.notes !== 'string') ||
      (body.notes && body.notes.length > MAX_LENGTH)
    ) return null;

    return {
      subject: `AI integration request: ${body.product}`,
      replyTo: body.email,
      text: [
        'New AI integration request',
        `Name: ${body.name.trim()}`,
        `Email: ${body.email.trim()}`,
        `Product: ${body.product.trim()}`,
        `Features: ${body.features.map((feature) => feature.trim()).join(', ')}`,
        `Requirements: ${body.notes?.trim() || 'Not provided'}`,
      ].join('\n'),
    };
  }

  if (body.type === 'contact') {
    if (!isText(body.name, 120) || !isEmail(body.email) || !isText(body.message)) return null;

    return {
      subject: `Website contact message from ${body.name.trim()}`,
      replyTo: body.email,
      text: [
        'New website contact message',
        `Name: ${body.name.trim()}`,
        `Email: ${body.email.trim()}`,
        '',
        body.message.trim(),
      ].join('\n'),
    };
  }

  if (body.type === 'newsletter') {
    if (!isEmail(body.email)) return null;

    return {
      subject: 'New Webikode newsletter signup',
      text: `New newsletter signup: ${body.email.trim()}`,
    };
  }

  return null;
}

async function getGoogleAccessToken() {
  let response;
  try {
    response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
    });
  } catch (error) {
    console.error('Could not reach Google OAuth:', error);
    throw new Error('Google Calendar could not be reached.');
  }

  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.access_token) {
    console.error(`Google OAuth returned ${response.status}.`);
    throw new Error('Google Calendar authorization failed.');
  }
  return result.access_token;
}

async function googleCalendarRequest(url, accessToken, body) {
  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error('Could not reach Google Calendar:', error);
    throw new Error('Google Calendar could not be reached.');
  }

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error(`Google Calendar API returned ${response.status}.`);
    throw new Error('Google Calendar could not process this booking.');
  }
  return result;
}

async function createCalendarBooking(booking) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
  const accessToken = await getGoogleAccessToken();
  const start = booking.start;
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const encodedCalendarId = encodeURIComponent(calendarId);
  const baseUrl = 'https://www.googleapis.com/calendar/v3';
  const availability = await googleCalendarRequest(`${baseUrl}/freeBusy`, accessToken, {
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    timeZone: booking.timeZone,
    items: [{ id: calendarId }],
  });
  const busySlots = availability.calendars?.[calendarId]?.busy;
  if (!Array.isArray(busySlots)) throw new Error('Google Calendar availability could not be checked.');
  if (busySlots.length > 0) return { conflict: true };

  const event = await googleCalendarRequest(
    `${baseUrl}/calendars/${encodedCalendarId}/events?sendUpdates=all`,
    accessToken,
    {
      summary: `Call about ${booking.project} with ${booking.name}`,
      description: [
        `Project: ${booking.project}`,
        `Name: ${booking.name}`,
        `Email: ${booking.email}`,
        `Phone: ${booking.phone}`,
        '',
        'Discussion details:',
        booking.description,
      ].join('\n'),
      start: { dateTime: start.toISOString(), timeZone: booking.timeZone },
      end: { dateTime: end.toISOString(), timeZone: booking.timeZone },
      attendees: [{ email: booking.email }],
    }
  );
  if (!event.id) throw new Error('Google Calendar did not confirm the booking.');
  return { conflict: false, event };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'A valid submission is required.' });
  }

  const booking = body.type === 'booking' ? getBookingDetails(body) : null;
  const email = getEmailContent(body, booking);
  if (!email) return res.status(400).json({ error: 'Please check the submitted information and try again.' });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, EMAIL_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !EMAIL_FROM) {
    console.error('Email delivery is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and EMAIL_FROM.');
    return res.status(503).json({ error: 'Email delivery is not configured yet. Please try again later.' });
  }

  let calendarBooking = null;
  if (booking) {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
      console.error('Google Calendar is not configured. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN.');
      return res.status(503).json({ error: 'Google Calendar booking is not configured yet. Please try again later.' });
    }

    try {
      calendarBooking = await createCalendarBooking(booking);
    } catch (error) {
      console.error('Could not create the Google Calendar booking:', error);
      return res.status(502).json({ error: error.message || 'We could not book this call. Please try again.' });
    }
    if (calendarBooking.conflict) {
      return res.status(409).json({ error: 'That time is no longer available. Please choose another time.' });
    }
    email.text += `\n\nCalendar event: ${calendarBooking.event.htmlLink || 'Created in Google Calendar'}`;
  }

  let response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [CONTACT_TO_EMAIL],
        subject: email.subject,
        text: email.text,
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
      }),
    });
  } catch (error) {
    console.error('Could not reach the email delivery service:', error);
    return res.status(502).json({
      error: booking ? 'The calendar booking was created, but the notification email could not be sent.' : 'We could not deliver your message. Please try again.',
      ...(booking ? { bookingCreated: true } : {}),
    });
  }

  if (!response.ok) {
    console.error(`Email delivery service returned ${response.status}.`);
    return res.status(502).json({
      error: booking ? 'The calendar booking was created, but the notification email could not be sent.' : 'We could not deliver your message. Please try again.',
      ...(booking ? { bookingCreated: true } : {}),
    });
  }

  return res.status(200).json({ ok: true, ...(calendarBooking ? { eventUrl: calendarBooking.event.htmlLink } : {}) });
}
