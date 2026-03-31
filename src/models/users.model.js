const usersData = [];

function findUserIndex(id) {
  return usersData.findIndex((user) => user.id === id);
}

export function getAllUsers() {
  return usersData;
}

export function getUserById(id) {
  const found = usersData.filter((user) => user.id === id);
  if (found.length === 1) {
    return found[0];
  } else {
    throw new Error("user not found");
  }
}

let incrementID = usersData.length + 1;

export function createUser(data) {
  //   const id = incrementID++;
  const newData = [{ id: incrementID++, ...data }];

  return usersData.push(newData);
}

/**
 *
 * @param {number} id
 * @param {User} data
 */
export function updateUser(id, data) {
  const index = findUserIndex(id);
  if (index !== -1) {
    usersData[index] = {
      ...usersData[index],
      ...data,
    };
    return usersData[index];
  } else {
    throw new Error("user not found");
  }
}

export function deleteUser(id) {
  const found = findUserIndex(id);
  const user = usersData[found];
  if (found !== -1) {
    delete usersData[found];
    return user;
  } else {
    throw new Error("user not found");
  }
}
