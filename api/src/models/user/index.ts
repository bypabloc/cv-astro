import {
  prop,
  getModelForClass,
  pre,
  ReturnModelType,
} from "@typegoose/typegoose";

import { Base } from "@/models/base";

@pre<User>("save", function (next) {
  if (this.isNew) {
    this.createdAt = new Date();
  }
  this.updatedAt = new Date();
  next();
})
export class User extends Base {
  @prop({ required: true })
  public userId!: string;

  @prop({ required: true })
  public nickname!: string;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public passwordHash!: string;
}

export const UserModel = getModelForClass(User);

export type UserDocument = ReturnModelType<typeof User>;

/**
  async function createUser() {
    const newUser = new UserModel({
      userId: 'usuario123',
      nickname: 'Nick123',
      email: 'email@example.com',
      passwordHash: 'hashDeContraseña'
    });
    return await UserModel.saveDocument(newUser);
  }

  async function updateUser(userId: string) {
    return await UserModel.updateDocument({ userId }, { nickname: 'NuevoNick' });
  }

  async function deleteUser(userId: string) {
    return await UserModel.deleteDocument({ userId });
  }
 */
