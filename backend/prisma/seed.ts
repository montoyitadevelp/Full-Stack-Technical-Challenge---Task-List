import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const hashed1 = await bcrypt.hash("string", 10);
    const hashed2 = await bcrypt.hash("string", 10);
    const user1 = await prisma.usuario.create({
        data: {
            nombre: "Juan Perez",
            email: "juan@example.com",
            password: hashed1,
        },
    });

    const user2 = await prisma.usuario.create({
        data: {
            nombre: "Maria Lopez",
            email: "maria@example.com",
            password: hashed2,
        },
    });


    const cat1 = await prisma.categoria.create({
        data: {
            nombre: "Trabajo",
            usuario: {
                connect: { id: user1.id },
            },
        },
    });

    const cat2 = await prisma.categoria.create({
        data: {
            nombre: "Personal",
            usuario: {
                connect: { id: user2.id },
            },
        },
    });


    const label1 = await prisma.etiqueta.create({
        data: {
            nombre: "Urgente", usuario: {
                connect: { id: user1.id },
            },
        }
    });
    const label2 = await prisma.etiqueta.create({
        data: {
            nombre: "Opcional", usuario: {
                connect: { id: user2.id },
            },
        }
    });


    await prisma.tarea.createMany({
        data: [
            {
                titulo: "Finalizar reporte",
                descripcion: "Reporte mensual de ventas",
                completada: false,
                prioridad: "high",
                fechaVencimiento: new Date(new Date().setDate(new Date().getDate() + 3)),
                usuarioId: user1.id,
                categoriaId: cat1.id,
            },
            {
                titulo: "Llamar al cliente",
                descripcion: "Seguimiento de prospecto",
                completada: true,
                prioridad: "medium",
                fechaVencimiento: new Date(new Date().setDate(new Date().getDate() - 1)),
                usuarioId: user1.id,
                categoriaId: cat1.id,
            },
            {
                titulo: "Comprar víveres",
                descripcion: "Leche, pan, huevos",
                completada: false,
                prioridad: "low",
                fechaVencimiento: new Date(new Date().setDate(new Date().getDate() + 5)),
                usuarioId: user2.id,
                categoriaId: cat2.id,
            },
        ],
    });

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
