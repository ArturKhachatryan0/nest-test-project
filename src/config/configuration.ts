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
});
