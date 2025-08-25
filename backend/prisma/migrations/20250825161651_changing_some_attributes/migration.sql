/*
  Warnings:

  - You are about to drop the `Categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Etiqueta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tarea` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TareaEtiqueta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Categoria" DROP CONSTRAINT "Categoria_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Etiqueta" DROP CONSTRAINT "Etiqueta_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Tarea" DROP CONSTRAINT "Tarea_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Tarea" DROP CONSTRAINT "Tarea_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TareaEtiqueta" DROP CONSTRAINT "TareaEtiqueta_etiquetaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TareaEtiqueta" DROP CONSTRAINT "TareaEtiqueta_tareaId_fkey";

-- DropTable
DROP TABLE "public"."Categoria";

-- DropTable
DROP TABLE "public"."Etiqueta";

-- DropTable
DROP TABLE "public"."Tarea";

-- DropTable
DROP TABLE "public"."TareaEtiqueta";

-- DropTable
DROP TABLE "public"."Usuario";

-- CreateTable
CREATE TABLE "public"."usuario" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categoria" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."etiqueta" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "etiqueta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tarea" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "categoriaId" TEXT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "prioridad" "public"."TaskPriority" NOT NULL DEFAULT 'medium',
    "fechaVencimiento" TIMESTAMP(3),
    "completada" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tareaetiqueta" (
    "tareaId" TEXT NOT NULL,
    "etiquetaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tareaetiqueta_pkey" PRIMARY KEY ("tareaId","etiquetaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "public"."usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_usuarioId_nombre_key" ON "public"."categoria"("usuarioId", "nombre");

-- CreateIndex
CREATE UNIQUE INDEX "etiqueta_usuarioId_nombre_key" ON "public"."etiqueta"("usuarioId", "nombre");

-- AddForeignKey
ALTER TABLE "public"."categoria" ADD CONSTRAINT "categoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."etiqueta" ADD CONSTRAINT "etiqueta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tarea" ADD CONSTRAINT "tarea_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tarea" ADD CONSTRAINT "tarea_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tareaetiqueta" ADD CONSTRAINT "tareaetiqueta_tareaId_fkey" FOREIGN KEY ("tareaId") REFERENCES "public"."tarea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tareaetiqueta" ADD CONSTRAINT "tareaetiqueta_etiquetaId_fkey" FOREIGN KEY ("etiquetaId") REFERENCES "public"."etiqueta"("id") ON DELETE CASCADE ON UPDATE CASCADE;
