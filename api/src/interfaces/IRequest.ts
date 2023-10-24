// Path: api/src/interfaces/IRequest.ts
import { IHeaders } from "./IHeaders";

export interface IRequest {
  headers: IHeaders;
  cookie: Object;
  query: Object;
  params: Object;
  body?: Object;
}
