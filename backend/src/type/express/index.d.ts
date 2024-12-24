declare namespace Express {
  export interface Request {
    user: {
      uuid: string;
      username?: string;
      email?: string;
      password?:string;
    }
  }
}