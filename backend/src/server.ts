import express from 'express'
import cors from 'cors'
import helmet from 'helmet';
import v1 from './v1/index';
import limiter from './utils';


export const createServer = () => {
    const app = express();

    app
        /**
         * Configure security
        */
        .use(helmet())
        /**
         * Rate limiting
         */
        .use(limiter)
        /**
         * Configure body parser
        */
        .use(express.urlencoded({ extended: true }))
        .use(express.json())
        /**
         * Configure cors
         */
        .use(cors())
        .use("/api/v1", v1)

    return app;
}