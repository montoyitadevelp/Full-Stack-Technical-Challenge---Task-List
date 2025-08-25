import * as dotenv from 'dotenv';

dotenv.config();

const config = {
    app_name: process.env.APP_NAME,
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    debug: process.env.DEBUG,
    base_url: process.env.BASE_URL,
    db: {
        url: process.env.DATABASE_URL
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES_IN
    }
}

export default config;
