// Path: api/src/config/index.ts

class Config {
  // Propiedades de la clase para cada variable de entorno que necesitas
  public readonly environment: string;
  public readonly port: number;
  public readonly dbName: string;
  public readonly dbHost: string;
  public readonly dbUsername: string;
  public readonly dbPassword: string;
  public readonly dbPort: number;
  public readonly dbUri: string;

  constructor() {
    // Asigna las variables de entorno a las propiedades de la clase
    // Utiliza el operador '!' para decirle a TypeScript que confíes en que estas variables están definidas
    this.environment = process.env.ENVIRONMENT! || "development";
    this.port = parseInt(process.env.PORT!) || 8000;
    this.dbName = process.env.DB_NAME! || "";
    this.dbHost = process.env.DB_HOST! || "";
    this.dbUsername = process.env.DB_USERNAME! || "";
    this.dbPassword = process.env.DB_PASSWORD! || "";
    this.dbPort = parseInt(process.env.DB_PORT!) || 27017;
    this.dbUri = process.env.DB_URI! || "";
  }
}

// Exporta una instancia de la configuración para que pueda ser importada en otras partes de tu aplicación
export const config = new Config();
