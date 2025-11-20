-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('CONSUMIDOR', 'TIENDA', 'PROFECO');

-- CreateEnum
CREATE TYPE "EstadoMulta" AS ENUM ('PENDIENTE', 'PAGADA', 'APELADA');

-- CreateTable
CREATE TABLE "usuarios" (
    "usuario_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo_usuario" "TipoUsuario" NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "tiendas" (
    "tienda_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT,
    "latitud" DECIMAL(65,30),
    "longitud" DECIMAL(65,30),
    "logo_url" TEXT,

    CONSTRAINT "tiendas_pkey" PRIMARY KEY ("tienda_id")
);

-- CreateTable
CREATE TABLE "multas" (
    "multa_id" TEXT NOT NULL,
    "tienda_id" TEXT NOT NULL,
    "fecha_emision" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motivo" TEXT NOT NULL,
    "monto" DECIMAL(65,30) NOT NULL,
    "estado" "EstadoMulta" NOT NULL DEFAULT 'PENDIENTE',
    "usuario_id" TEXT,

    CONSTRAINT "multas_pkey" PRIMARY KEY ("multa_id")
);
-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
-- CreateIndex
CREATE UNIQUE INDEX "tiendas_usuario_id_key" ON "tiendas"("usuario_id");
-- AddForeignKey
ALTER TABLE "tiendas" ADD CONSTRAINT "tiendas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "multas" ADD CONSTRAINT "multas_tienda_id_fkey" FOREIGN KEY ("tienda_id") REFERENCES "tiendas"("tienda_id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "multas" ADD CONSTRAINT "multas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE SET NULL ON UPDATE CASCADE;