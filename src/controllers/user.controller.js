import User from "../database/models/User.js";
import * as Sentry from "@sentry/node";

/**
 * Get all users
 */
export const getUsers = async (request) => {
  const { payload } = request;

  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // optional, if you store sensitive info
      order: [["id", "DESC"]],
    });

    return {
      status: 200,
      message: "Users fetched successfully",
      data: {
        users,
      },
    };
  } catch (e) {
    process.env.SENTRY_ENABLED === "true" && Sentry.captureException(e);
    return {
      status: 500,
      data: [],
      error: {
        message: "Something went wrong",
        reason: e.message,
        stack: process.env.DEBUG === "true" ? e.stack.split("\n") : "",
      },
    };
  }
};

export const getAllUsers = async () => {
  const users = await User.findAll({
    order: [["id", "DESC"]],
  });
  return users;
};

/**
 * Get user by ID
 */
export const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

/**
 * Create a new user
 */
export const createUser = async (payload) => {
  const newUser = await User.create(payload);
  return newUser;
};

/**
 * Update an existing user
 */
export const updateUser = async (id, payload) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  await user.update(payload);
  return user;
};

/**
 * Delete a user
 */
export const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  await user.destroy();
  return { message: "User deleted successfully" };
};
