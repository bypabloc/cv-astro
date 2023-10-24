// Path: api/src/routes/index.ts

import { IRequest } from "@/interfaces/IRequest";
import { IResponse } from "@/interfaces/IResponse";

export default async (req: IRequest): Promise<IResponse> => {
  console.log("Hello, world! -> from ./src/routes/index.ts -> req", req);

  return {
    statusCode: 200,
    body: {
      messageCode: "HELLO_WORLD",
      status: "success",
      message: "Hello, world! -> from ./src/routes/index.ts",
      data: {},
    },
  };
};
