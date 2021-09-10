declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;
    SERVER_PORT: string;
    REDIS_PORT: string;
    COOKIE_NAME: string;
    CLIENT_URL: string;
    CLIENT_PORT: string;
  }
}