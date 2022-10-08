// In src/services/workoutService.js
const { v4: uuid } = require("uuid");

const Workout = require("../database/Users");
const getAllUsers = () => {
  // *** ADD ***
  const allUsers = Workout.getAllUsers();
  // *** ADD ***
  return allUsers;
};

const getOneUserByUsername = async (username) => {
  const findUser = await Workout.getOneUserByUsername(username);
  return findUser;
};
const getOneUserById = async (userid) => {
  const findUser = await Workout.getOneUserById(userid);
  return findUser;
};

const createNewUser = async (newUserInsert) => {
  const userToInsert = {
    ...newUserInsert,
    userid: uuid(),
  };
  try {
    const createdWorkout = await Workout.createNewUser(userToInsert);
    return createdWorkout;
  } catch (error) {
    throw error;
  }
};

const updateOneUser = async (user) => {
  await console.log("req is", user);
  const updateUser = await Workout.updateOneUser(user);
  return updateUser;
};

const deleteOneUser = () => {
  return;
};

module.exports = {
  getAllUsers,
  getOneUserByUsername,
  createNewUser,
  updateOneUser,
  deleteOneUser,
  getOneUserById,
};
