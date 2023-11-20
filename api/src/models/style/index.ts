import mongoose, { Schema } from "mongoose";

// Modelo para Styles
const styleSchema = new Schema({
  userId: String,
  styleId: String,
  css: String,
  createdAt: Date,
  updatedAt: Date,
});

export const Style = mongoose.model("Style", styleSchema);
