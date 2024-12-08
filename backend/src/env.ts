import "dotenv/config";

export const Env = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.PORT) || 8000,
  dbPort: Number(process.env.DB_PORT) || 3306,
  dbName: process.env.DB_NAME,
  secretKey: process.env.SECRET_KEY,
  expiresIn: Number(process.env.EXPIRE_TIME) || 3600,
  emailAddress: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASSWORD,
};
