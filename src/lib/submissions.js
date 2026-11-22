export async function submitSubmission(payload) {
  const response = await fetch('/api/submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error('The server returned an invalid response. Please try again.');
  }

  if (!response.ok) {
    const error = new Error(result.error || 'We could not submit your request. Please try again.');
    error.bookingCreated = Boolean(result.bookingCreated);
    throw error;
  }

  return result;
}
