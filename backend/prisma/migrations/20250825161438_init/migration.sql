-- CreateEnum
CREATE TYPE "public"."TaskPriority" AS ENUM ('low', 'medium', 'high', 'urgent');

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Categoria" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Etiqueta" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Etiqueta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tarea" (
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

    CONSTRAINT "Tarea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TareaEtiqueta" (
    "tareaId" TEXT NOT NULL,
    "etiquetaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TareaEtiqueta_pkey" PRIMARY KEY ("tareaId","etiquetaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_usuarioId_nombre_key" ON "public"."Categoria"("usuarioId", "nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Etiqueta_usuarioId_nombre_key" ON "public"."Etiqueta"("usuarioId", "nombre");

-- AddForeignKey
ALTER TABLE "public"."Categoria" ADD CONSTRAINT "Categoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Etiqueta" ADD CONSTRAINT "Etiqueta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tarea" ADD CONSTRAINT "Tarea_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tarea" ADD CONSTRAINT "Tarea_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TareaEtiqueta" ADD CONSTRAINT "TareaEtiqueta_tareaId_fkey" FOREIGN KEY ("tareaId") REFERENCES "public"."Tarea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TareaEtiqueta" ADD CONSTRAINT "TareaEtiqueta_etiquetaId_fkey" FOREIGN KEY ("etiquetaId") REFERENCES "public"."Etiqueta"("id") ON DELETE CASCADE ON UPDATE CASCADE;
