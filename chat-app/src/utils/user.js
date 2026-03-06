
let users = [];

export const addUser = ({ id, username, room }) => {
  const userName = username.trim().toLowerCase();
  const joinedRoom = room.trim().toLowerCase();
  if (!userName || !joinedRoom) {
    return {
      error: 'User name and room are required'
    };
  }

  // check for existing user
  const existingUser = users.find(user => user.userName === userName && user.joinedRoom == joinedRoom);

  if (existingUser) {
    return {
      error: 'User name is in use'
    };
  }

  // Store user
  const user = { id, userName, joinedRoom };
  users.push(user);
  return { user };
};

export const removeUser = (id) => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getUser = (id) => {
  return users.find(user => user.id === id);
};

export const getUsersInRoom = (room) => {
  return users.filter(user => user.joinedRoom === room);
};
