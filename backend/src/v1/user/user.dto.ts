import { usuario } from "@prisma/client";

export type UserDTO = {
  id: string;
  nombre: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export function toUserDTO(u: Record<string, any>): UserDTO {
  return {
    id: u.id,
    nombre: u.nombre,
    email: u.email,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  };
}
