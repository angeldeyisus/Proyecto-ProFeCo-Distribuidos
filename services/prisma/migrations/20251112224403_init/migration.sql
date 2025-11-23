-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('CONSUMIDOR', 'TIENDA', 'PROFECO', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "EstadoMulta" AS ENUM ('PENDIENTE', 'PAGADA', 'APELADA', 'CANCELADA');

-- CreateTable
CREATE TABLE "usuarios" (
    "usuario_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo_usuario" "TipoUsuario" NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_login" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "perfiles_usuario" (
    "perfil_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "telefono" TEXT,
    "direccion" TEXT,
    "fecha_nacimiento" TIMESTAMP(3),
    "avatar_url" TEXT,
    "preferencias" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "perfiles_usuario_pkey" PRIMARY KEY ("perfil_id")
);

-- CreateTable
CREATE TABLE "sesiones_usuario" (
    "sesion_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "user_agent" TEXT,
    "ip_address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sesiones_usuario_pkey" PRIMARY KEY ("sesion_id")
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
    "is_activa" BOOLEAN NOT NULL DEFAULT true,
    "horario" TEXT,
    "telefono" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tiendas_pkey" PRIMARY KEY ("tienda_id")
);

-- CreateTable
CREATE TABLE "multas" (
    "multa_id" TEXT NOT NULL,
    "tienda_id" TEXT NOT NULL,
    "usuario_id" TEXT,
    "fecha_emision" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motivo" TEXT NOT NULL,
    "monto" DECIMAL(65,30) NOT NULL,
    "estado" "EstadoMulta" NOT NULL DEFAULT 'PENDIENTE',
    "fecha_pago" TIMESTAMP(3),
    "evidencia_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "multas_pkey" PRIMARY KEY ("multa_id")
);

-- CreateTable
CREATE TABLE "precios" (
    "precio_id" TEXT NOT NULL,
    "producto_id" TEXT NOT NULL,
    "tienda_id" TEXT NOT NULL,
    "precio" DECIMAL(65,30) NOT NULL,
    "en_oferta" BOOLEAN NOT NULL DEFAULT false,
    "precio_original" DECIMAL(65,30),
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "ultima_actualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "precios_pkey" PRIMARY KEY ("precio_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "perfiles_usuario_usuario_id_key" ON "perfiles_usuario"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "sesiones_usuario_token_key" ON "sesiones_usuario"("token");

-- CreateIndex
CREATE UNIQUE INDEX "tiendas_usuario_id_key" ON "tiendas"("usuario_id");

-- CreateIndex
CREATE INDEX "precios_producto_id_tienda_id_idx" ON "precios"("producto_id", "tienda_id");

-- AddForeignKey
ALTER TABLE "perfiles_usuario" ADD CONSTRAINT "perfiles_usuario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sesiones_usuario" ADD CONSTRAINT "sesiones_usuario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tiendas" ADD CONSTRAINT "tiendas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "multas" ADD CONSTRAINT "multas_tienda_id_fkey" FOREIGN KEY ("tienda_id") REFERENCES "tiendas"("tienda_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "multas" ADD CONSTRAINT "multas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "precios" ADD CONSTRAINT "precios_tienda_id_fkey" FOREIGN KEY ("tienda_id") REFERENCES "tiendas"("tienda_id") ON DELETE RESTRICT ON UPDATE CASCADE;