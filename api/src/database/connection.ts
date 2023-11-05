// Path: api/src/database/connection.ts

import mongoose from "mongoose";

class Connection {
  private static instance: Connection;
  private constructor() {}

  public static getInstance(): Connection {
    if (!Connection.instance) {
      Connection.instance = new Connection();
    }
    return Connection.instance;
  }

  public connect(uri: string): void {
    mongoose
      .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("Conexión exitosa a MongoDB"))
      .catch((error) => console.error("Error conectando a MongoDB:", error));
  }
}

export default Connection;
