import {
  prop,
  getModelForClass,
  pre,
  ReturnModelType,
} from "@typegoose/typegoose";

export class Base {
  @prop()
  public createdAt?: Date;

  @prop()
  public updatedAt?: Date;

  @prop()
  public deletedAt?: Date;

  // Método para guardar un documento
  public static async saveDocument(
    this: ReturnModelType<typeof Base>,
    doc: InstanceType<ReturnModelType<typeof Base>>
  ) {
    doc.createdAt = new Date();
    return await doc.save();
  }

  // Método para actualizar un documento
  public static async updateDocument(
    this: ReturnModelType<typeof Base>,
    filter: any,
    update: any
  ) {
    update.updatedAt = new Date(); // Asegúrate de actualizar la marca de tiempo
    return await this.findOneAndUpdate(filter, update, { new: true }).exec();
  }

  // Método para eliminar un documento
  public static async deleteDocument(
    this: ReturnModelType<typeof Base>,
    filter: any,
    update: any
  ) {
    update.deletedAt = new Date();
    return await this.findOneAndUpdate(filter, update, { new: true }).exec();
  }
}

export const BaseModel = getModelForClass(Base);

export type BaseDocument = InstanceType<typeof Base>;
