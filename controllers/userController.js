import db from '../models/index.cjs';

const { Task, User } = db;

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: Task,
      order: [['id', 'ASC']],
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};