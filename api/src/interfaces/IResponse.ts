// Path: api/src/interfaces/IResponse.ts

enum EStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export interface IBody {
  messageCode: String;
  status: String;
  message: String;
  data: {
    [key: string]: any;
  };
}

export interface IResponse {
  body: IBody;
  statusCode: EStatusCode;
}
