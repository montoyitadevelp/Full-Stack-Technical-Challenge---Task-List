

export type UserDTO = {
  id: string;
  nombre: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export function toUserDTO(user: Record<string, any>): UserDTO {
  return {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
