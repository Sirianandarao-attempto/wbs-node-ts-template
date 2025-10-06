import { Product, Category } from "../models/index.ts";
import type { RequestHandler } from "express";

export const listProducts: RequestHandler = async (req, res) => {
  const filter: any = {};
  if (req.query.categoryId) filter.categoryId = req.query.categoryId;
  const products = await Product.find(filter).populate("categoryId", "name");
  res.json(products);
};

export const createProduct: RequestHandler = async (req, res) => {
  const { name, description, price, categoryId } = req.body;
  const category = await Category.findById(categoryId);
  if (!category) return res.status(400).json({ error: "Invalid categoryId" });

  const product = await Product.create({
    name,
    description,
    price,
    categoryId,
  });
  res.status(201).json(product);
};

export const getProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("categoryId", "name");
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
};

export const updateProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const updates: any = { ...req.body };

  if (updates.categoryId) {
    const category = await Category.findById(updates.categoryId);
    if (!category) return res.status(400).json({ error: "Invalid categoryId" });
  }

  const product = await Product.findByIdAndUpdate(id, updates, { new: true });
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
};

export const deleteProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.status(200).json({ message: "Product deleted successfully" });
};
