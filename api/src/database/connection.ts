// Path: api/src/database/connection.ts

import mongoose from "mongoose";
import { config } from "@/config";

class Connection {
  private static instance: Connection;
  private db: mongoose.Connection | null = null; // Agregamos una propiedad para mantener la conexión a la base de datos

  private constructor() {}

  public static getInstance(): Connection {
    if (!Connection.instance) {
      Connection.instance = new Connection();
    }
    return Connection.instance;
  }

  public async connect(uri: string): Promise<void> {
    if (this.db) {
      // Verificamos si ya hay una conexión existente
      return;
    }

    console.log("Conectando a MongoDB...");

    try {
      const mongooseConnection = await mongoose.connect(uri);
      this.db = mongooseConnection.connection;
      this.db.on("disconnected", () => {
        console.log("MongoDB disconnected!");
        this.db = null; // Reset la conexión en la instancia cuando se desconecta
      });

      if (config.environment === "test") {
        // Limpiar la base de datos para pruebas
        await this.clearDatabase();
      }

      console.log("Conexión exitosa a MongoDB");
    } catch (error) {
      console.error("Error conectando a MongoDB:", error);
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.db) {
      return;
    }

    console.log("Desconectando de MongoDB...");
    await mongoose.disconnect();
    this.db = null; // Reset la conexión en la instancia después de desconectar
  }

  private async clearDatabase(): Promise<void> {
    if (!this.db) {
      throw new Error("No hay conexión a la base de datos");
    }

    console.log("Limpiando base de datos...");

    const collections = this.db.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }

    console.log("Base de datos limpia");
  }
}

export default Connection;
