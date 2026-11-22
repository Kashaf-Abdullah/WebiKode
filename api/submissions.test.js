import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import handler from './submissions.js';

const environmentKeys = [
  'RESEND_API_KEY',
  'CONTACT_TO_EMAIL',
  'EMAIL_FROM',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_REFRESH_TOKEN',
  'GOOGLE_CALENDAR_ID',
];
const previousEnvironment = new Map(environmentKeys.map((key) => [key, process.env[key]]));
const previousFetch = global.fetch;

function createResponse() {
  return {
    statusCode: 0,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

function createPayload() {
  return {
    type: 'booking',
    project: 'MentoraLoop',
    name: 'Test User',
    email: 'user@example.com',
    phone: '+1 555 555 0100',
    description: 'Discuss the project.',
    startAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    timeZone: 'Asia/Karachi',
  };
}

beforeEach(() => {
  process.env.RESEND_API_KEY = 'test-resend-key';
  process.env.CONTACT_TO_EMAIL = 'owner@example.com';
  process.env.EMAIL_FROM = 'Webikode <bookings@example.com>';
  process.env.GOOGLE_CLIENT_ID = 'test-client-id';
  process.env.GOOGLE_CLIENT_SECRET = 'test-client-secret';
  process.env.GOOGLE_REFRESH_TOKEN = 'test-refresh-token';
  process.env.GOOGLE_CALENDAR_ID = 'primary';
});

afterEach(() => {
  for (const [key, value] of previousEnvironment) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  global.fetch = previousFetch;
});

test('books an available calendar slot and emails the owner', async () => {
  const requests = [];
  global.fetch = async (url, options = {}) => {
    requests.push({ url: String(url), options });
    if (String(url).includes('oauth2.googleapis.com/token')) {
      return { ok: true, status: 200, json: async () => ({ access_token: 'test-access-token' }) };
    }
    if (String(url).endsWith('/freeBusy')) {
      return { ok: true, status: 200, json: async () => ({ calendars: { primary: { busy: [] } } }) };
    }
    if (String(url).includes('/events?sendUpdates=all')) {
      return { ok: true, status: 200, json: async () => ({ id: 'event-1', htmlLink: 'https://calendar.google.com/event-1' }) };
    }
    if (String(url) === 'https://api.resend.com/emails') {
      return { ok: true, status: 200 };
    }
    throw new Error(`Unexpected request: ${url}`);
  };

  const response = createResponse();
  await handler({ method: 'POST', body: createPayload() }, response);

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.eventUrl, 'https://calendar.google.com/event-1');
  assert.equal(requests.filter(({ url }) => url === 'https://api.resend.com/emails').length, 1);
  const eventRequest = requests.find(({ url }) => url.includes('/events?sendUpdates=all'));
  assert.match(eventRequest.options.body, /MentoraLoop/);
  assert.match(eventRequest.options.body, /user@example.com/);
});

test('rejects a slot that is already busy without creating an event or sending an email', async () => {
  const requests = [];
  global.fetch = async (url) => {
    requests.push(String(url));
    if (String(url).includes('oauth2.googleapis.com/token')) {
      return { ok: true, status: 200, json: async () => ({ access_token: 'test-access-token' }) };
    }
    if (String(url).endsWith('/freeBusy')) {
      return { ok: true, status: 200, json: async () => ({ calendars: { primary: { busy: [{ start: 'busy', end: 'busy' }] } } }) };
    }
    throw new Error(`Unexpected request: ${url}`);
  };

  const response = createResponse();
  await handler({ method: 'POST', body: createPayload() }, response);

  assert.equal(response.statusCode, 409);
  assert.match(response.body.error, /no longer available/i);
  assert.equal(requests.some((url) => url.includes('/events?sendUpdates=all')), false);
  assert.equal(requests.includes('https://api.resend.com/emails'), false);
});

test('requires calendar credentials before accepting a booking', async () => {
  delete process.env.GOOGLE_REFRESH_TOKEN;
  global.fetch = async () => {
    throw new Error('No external request should be made.');
  };

  const response = createResponse();
  await handler({ method: 'POST', body: createPayload() }, response);

  assert.equal(response.statusCode, 503);
  assert.match(response.body.error, /not configured/i);
});
