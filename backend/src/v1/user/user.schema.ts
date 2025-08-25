import Joi from "joi";
import j2s from 'joi-to-swagger';

export const userRegisterValidationSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
});

export const userLoginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
});


export const { swagger: userRegisterSchema } = j2s(userRegisterValidationSchema);
export const { swagger: userLoginSchema } = j2s(userLoginValidationSchema);


export const userProfileResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    nombre: { type: "string" },
    email: { type: "string" },
  }
}