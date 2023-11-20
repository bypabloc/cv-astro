// Path: api/src/interfaces/IRequest.ts
import { IHeaders } from "@/interfaces/IHeaders";

export interface IRequest {
  headers: IHeaders;
  cookie: Object;
  params: Object;
  body: {
    [key: string]: any;
  };
}
