import Joi from "joi";
import j2s from "joi-to-swagger";


export const taskCreateValidationSchema = Joi.object({
  titulo: Joi.string().min(3).max(100).required(),
  descripcion: Joi.string().allow("").max(500),
  completada: Joi.boolean().default(false),
  categoriaId: Joi.string().uuid().required(),
  etiquetas: Joi.array().items(Joi.string().uuid()).default([]),
});

export const taskUpdateValidationSchema = Joi.object({
  titulo: Joi.string().min(3).max(100),
  descripcion: Joi.string().allow("").max(500),
  completada: Joi.boolean(),
  categoriaId: Joi.string().uuid(),
  etiquetas: Joi.array().items(Joi.string().uuid()),
});



export const { swagger: taskCreateSchema } = j2s(taskCreateValidationSchema);
export const { swagger: taskUpdateSchema } = j2s(taskUpdateValidationSchema);

export const taskResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    titulo: { type: "string" },
    descripcion: { type: "string" },
    completada: { type: "boolean" },
    categoriaId: { type: "string", format: "uuid" },
    etiquetas: {
      type: "array",
      items: { type: "string", format: "uuid" },
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
};
