import Joi from "joi";
import j2s from "joi-to-swagger";

export const labelCreateValidationSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  color: Joi.string().max(20).optional(),
});

export const labelUpdateValidationSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).optional(),
  color: Joi.string().max(20).optional(),
});

export const labelResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    nombre: { type: "string" },
    color: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
};

// Swagger docs
export const { swagger: labelCreateSchema } = j2s(labelCreateValidationSchema);
export const { swagger: labelUpdateSchema } = j2s(labelUpdateValidationSchema);
