import { userRegisterSchema, userLoginSchema, userProfileResponseSchema } from './user/user.schema';
import { taskCreateSchema, taskUpdateSchema, taskResponseSchema } from './task/task.schema';
import { categoryCreateSchema, categoryUpdateSchema, categoryResponseSchema } from './category/category.schema';
import { labelCreateSchema, labelResponseSchema } from './label/label.schema';
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
            UserRegister: userRegisterSchema,
            UserLogin: userLoginSchema,
            UserResponse: userProfileResponseSchema,
            TaskResponse: taskResponseSchema,
            TaskCreate: taskCreateSchema,
            TaskUpdate: taskUpdateSchema,
            CategoryCreate: categoryCreateSchema,
            CategoryUpdate: categoryUpdateSchema,
            CategoryResponse: categoryResponseSchema,
            LabelResponse: labelResponseSchema,
            LabelCreate: labelCreateSchema
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
