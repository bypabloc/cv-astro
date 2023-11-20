// Path: api/src/models/user/index.ts

import { Schema } from "mongoose";
import { Base, IBase } from "@/models/base";

export interface IUser extends IBase {
  nickname: string;
  email: string;
  passwordHash: string;
}

const userSchema = new Schema<IUser>({
  nickname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export class User extends Base<IUser> {
  constructor() {
    super(userSchema, "users");
  }

  // Sobrescribe métodos aquí si es necesario
  // Añade métodos adicionales aquí
}
