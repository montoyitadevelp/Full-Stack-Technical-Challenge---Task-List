import Joi from "joi";
import j2s from "joi-to-swagger";

export const categoryCreateValidationSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).required(),
    color: Joi.string().max(20).optional(),
});

export const categoryUpdateValidationSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).optional(),
    color: Joi.string().max(20).optional(),
});

export const categoryResponseSchema = {
    type: "object",
    properties: {
        id: { type: "string", format: "uuid" },
        nombre: { type: "string" },
        color: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
    },
}

export const { swagger: categoryCreateSchema } = j2s(categoryCreateValidationSchema);
export const { swagger: categoryUpdateSchema } = j2s(categoryUpdateValidationSchema);

