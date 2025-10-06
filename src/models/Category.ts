import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  { name: { type: String, required: true } },
  { timestamps: true }
);

CategorySchema.set("toJSON", {
  transform: function (_doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model("Category", CategorySchema);
