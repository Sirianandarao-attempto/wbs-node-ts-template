import { Order, Product, User } from "../models/index.ts";
import type { RequestHandler } from "express";

export const listOrders: RequestHandler = async (req, res) => {
  const orders = await Order.find()
    .populate("userId", "name email")
    .populate("products.productId", "name price");
  res.json(orders);
};

export const createOrder: RequestHandler = async (req, res) => {
  const { userId, products } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ error: "Invalid userId" });

  let total = 0;
  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product)
      return res
        .status(400)
        .json({ error: `Invalid productId: ${item.productId}` });
    total += product.price * item.quantity;
  }

  const order = await Order.create({ userId, products, total });
  res.status(201).json(order);
};

export const getOrder: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id)
    .populate("userId", "name email")
    .populate("products.productId", "name price");
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
};

export const updateOrder: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { products } = req.body;

  const order = await Order.findById(id);
  if (!order) return res.status(404).json({ error: "Order not found" });

  let total = 0;
  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product)
      return res
        .status(400)
        .json({ error: `Invalid productId: ${item.productId}` });
    total += product.price * item.quantity;
  }

  order.products = products;
  order.total = total;
  await order.save();

  res.json(order);
};

export const deleteOrder: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByIdAndDelete(id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.status(200).json({ message: "Order deleted successfully" });
};
