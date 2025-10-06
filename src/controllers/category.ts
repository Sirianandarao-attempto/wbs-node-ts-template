import { Category } from "../models/index.ts";
import type { RequestHandler } from "express";

export const listCategories: RequestHandler = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

export const createCategory: RequestHandler = async (req, res) => {
  console.log("Request body:", req);
  const { name } = req.body;
  const category = await Category.create({ name });
  res.status(201).json(category);
};

export const getCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) return res.status(404).json({ error: "Category not found" });
  res.json(category);
};

export const updateCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const updates: any = { ...req.body };
  const category = await Category.findByIdAndUpdate(id, updates, { new: true });
  if (!category) return res.status(404).json({ error: "Category not found" });
  res.json(category);
};

export const deleteCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) return res.status(404).json({ error: "Category not found" });
  res.status(200).json({ message: "Category deleted successfully" });
};
