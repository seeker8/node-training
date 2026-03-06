
export function generateMessage(text) {
  return {
    text,
    createdAt: new Date().getTime()
  };
}

export function generateLocationMessage(locationUrl) {
  return {
    url: locationUrl,
    createdAt: new Date().getTime()
  };
}