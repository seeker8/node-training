
export function generateMessage(text, user) {
  return {
    text,
    createdAt: new Date().getTime(),
    userName: user?.userName
  };
}

export function generateLocationMessage(locationUrl, user) {
  return {
    url: locationUrl,
    createdAt: new Date().getTime(),
    userName: user?.userName
  };
}