// Path: api/src/models/base/index.ts

import { Document, Model, model, Schema } from "mongoose";

export interface IBase extends Document {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class Base<T extends Document> {
  private model: Model<T>;

  constructor(schema: Schema, collectionName: string) {
    this.model = model<T>(collectionName, schema);
  }

  async findAll(page: number = 1, limit: number = 10) {
    return this.model
      .find()
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async findOne(id: string) {
    return this.model.findById(id);
  }

  async create(data: Partial<T>) {
    return new this.model(data).save();
  }

  async update(id: string, data: Partial<T>) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  // Otros métodos que necesites
}
