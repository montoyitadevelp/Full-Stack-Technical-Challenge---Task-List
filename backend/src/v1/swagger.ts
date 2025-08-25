import { userRegisterSwagger, userLoginSwagger } from './user/user.schema';
import swaggerJSDoc from 'swagger-jsdoc';
import config from '../config';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: config.app_name,
        version: '1.0.0',
        description: 'API documentation generated with Swagger',
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            UserRegister: userRegisterSwagger,
            UserLogin: userLoginSwagger,
        }
    },
    servers: [
        {
            url: config.base_url,
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/v1/**/*.router.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
