import Joi from "joi";
import j2s from "joi-to-swagger";


export const taskCreateValidationSchema = Joi.object({
  titulo: Joi.string().min(3).max(100).required(),
  descripcion: Joi.string().allow("").max(500).allow(null),
  prioridad: Joi.string().valid("low", "medium", "high").default("medium"),
  completada: Joi.boolean().default(false),
  categoriaId: Joi.string().uuid().allow(null),
  etiquetas: Joi.array().items(Joi.string().uuid()).allow(null).default([]),
  fechaVencimiento: Joi.date().optional().allow(null),
});

export const taskUpdateValidationSchema = Joi.object({
  titulo: Joi.string().min(3).max(100),
  descripcion: Joi.string().allow("").max(500).allow(null),
  prioridad: Joi.string().valid("low", "medium", "high"),
  completada: Joi.boolean(),
  categoriaId: Joi.string().uuid().allow(null),
  etiquetas: Joi.array().items(Joi.string().uuid()).allow(null).default([]),
  fechaVencimiento: Joi.date().allow(null),
});



export const { swagger: taskCreateSchema } = j2s(taskCreateValidationSchema);
export const { swagger: taskUpdateSchema } = j2s(taskUpdateValidationSchema);

export const taskResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    titulo: { type: "string" },
    descripcion: { type: "string" },
    prioridad: { type: "string", enum: ["low", "medium", "high"] },
    completada: { type: "boolean" },
    categoriaId: { type: "string", format: "uuid" },
    etiquetas: {
      type: "array",
      items: { type: "string", format: "uuid" },
    },
    fechaVencimiento: { type: "string", format: "date-time" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
}

export const paginatedTaskResponseSchema = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: taskResponseSchema,
    },
    total: { type: "number" },
    page: { type: "number" },
    pageSize: { type: "number" },
    totalPages: { type: "number" },
  },
  required: ["data", "total", "page", "pageSize", "totalPages"],
}
