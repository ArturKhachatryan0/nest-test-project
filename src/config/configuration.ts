export default () => ({
  SERVER: {
    SERVER_PORT: parseInt(process.env.SERVER_PORT) || 3000,
  },
  DATABASE: {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/nest-test",
    MONGODB_HOST: process.env.MONGODB_HOST || "localhost",
    MONGODB_PORT: parseInt(process.env.MONGODB_PORT) || 27017,
    MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME || "nest-test",
  },
  JWT: {
    ACCESS_TOKEN: {
      SECRET: process.env.ACCESS_TOKEN_SECRET || "SOME_CONSTANT_KEY",
      EXPIRED_IN: parseInt(process.env.ACCESS_TOKEN_EXPIRED_IN) || 3600,
    },
    REFRESH_TOKEN: {
      SECRET: process.env.REFRESH_TOKEN_SECRET || "SOME_CONSTANT_KEY",
      EXPIRED_IN: parseInt(process.env.REFRESH_TOKEN_EXPIRED_IN) || 2592000,
    },
  },
});
