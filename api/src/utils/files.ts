// Path: api/src/utils/files.ts

import * as fs from "node:fs";

interface IFiles {
  isDirectory: boolean;
  name: string;
  route: string;
  pathRoute: string;
  handler: () => any;
  prefix: string;
  method: string;
}

class Files {
  _basePathProject = Bun.main.replace(/\/[^/]+\.[^/]+$/, "");
  _pathValidated = false;
  _exists = false;
  _prefix = "";

  filePath = "";
  files: IFiles[] = [];

  constructor({ dir, prefix }: { dir: string; prefix: string }) {
    this.filePath = this._basePathProject + dir;
    this._prefix = prefix;
  }

  _validatePath() {
    if (this._pathValidated) return;
    this._exists = fs.existsSync(this.filePath);
    this._pathValidated = true;

    this._files();
  }

  exists() {
    this._validatePath();
    return this._exists;
  }

  _getMethod(filename: string): string {
    if (filename === "index.ts") return "GET";

    const methodMatch = filename.match(/\.([a-z]+)\.ts$/i);
    if (methodMatch && methodMatch[1]) {
      const method = methodMatch[1].toUpperCase();
      return ["GET", "POST", "PUT", "DELETE"].includes(method) ? method : "GET";
    }

    return "GET";
  }

  _files() {
    try {
      const files = fs.readdirSync(this.filePath, { withFileTypes: true });
      this.files = files.flatMap((file) => {
        const { name } = file;

        if (!name.endsWith(".ts") && !file.isDirectory()) return []; // Ignora si no es un archivo TS o un directorio

        let route = name.replace(/\.[^/.]+$/, ""); // Quita la extensión
        if (route === "index") {
          route = "";
        } else if (route.startsWith("[") && route.endsWith("]")) {
          route = `:${route.slice(1, -1)}`;
        }

        let newPrefix = `${this._prefix === "/" ? "" : this._prefix}/${route}`;

        return {
          isDirectory: file.isDirectory(),
          name,
          route,
          pathRoute: `${this._prefix}${route}`,
          prefix: newPrefix,
          handler: () => require(this.filePath + "/" + name).default,
          method: this._getMethod(name),
        };
      });
    } catch (error) {
      console.log(
        "Path: api/src/utils/files.ts -> _files",
        "Error al leer los archivos del directorio",
        error
      );
      return;
    }
  }
}

export default Files;
