import * as dotenv from 'dotenv';

dotenv.config();

const config = {
    app_name: process.env.APP_NAME,
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    debug: process.env.DEBUG || false,
    base_url: process.env.BASE_URL || "http://localhost:3000",
    db: {
        protocol: process.env.DB_PROTOCOL || "mongodb+srv",
        user: process.env.DB_USER || "user",
        password: process.env.DB_PASSWORD || "password",
        host: process.env.DB_HOST || "localhost",
        name: process.env.DB_NAME || "test"
    },
    jwt: {
        secret: process.env.JWT_SECRET || "mysecretkey"
    }
}

export default config;
