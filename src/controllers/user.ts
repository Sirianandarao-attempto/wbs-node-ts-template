import { User } from "../models/index.ts";
import type { RequestHandler } from "express";
import bcrypt from "bcrypt";

export const listUsers: RequestHandler = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
export const createUser: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  res.status(201).json(user);
};

export const getUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

export const updateUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const updates: any = { ...req.body };
  if (updates.password)
    updates.password = await bcrypt.hash(updates.password, 10);

  const user = await User.findByIdAndUpdate(id, updates, { new: true });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ message: "User deleted successfully" });
};
