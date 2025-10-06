import mongoose, { Schema } from "mongoose";

const OrderProductSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: { type: [OrderProductSchema], required: true },
    total: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

OrderSchema.set("toJSON", {
  transform: function (_doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model("Order", OrderSchema);
