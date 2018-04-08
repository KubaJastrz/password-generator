export const updateOptions = (payload) => ({
  type: 'UPDATE_OPTIONS',
  payload: {
    ...payload,
    length: Number(payload.length)
  }
});