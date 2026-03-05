
export function generateMessage(text) {
  return {
    text,
    createdAt: new Date().getTime()
  };
}

export function generateLocationMessage(location) {
  return {
    location,
    createdAt: new Date().getTime()
  };
}