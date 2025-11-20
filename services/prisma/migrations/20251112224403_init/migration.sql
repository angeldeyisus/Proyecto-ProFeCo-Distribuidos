-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('CONSUMIDOR', 'TIENDA', 'PROFECO');

-- CreateEnum
CREATE TYPE "TipoTienda" AS ENUM ('SUPERMERCADO', 'MERCADO_POPULAR', 'MERCADO_SOBRE_RUEDAS');

-- CreateEnum
CREATE TYPE "EstadoUsuario" AS ENUM ('ACTIVO', 'INACTIVO', 'SUSPENDIDO');

-- CreateEnum
CREATE TYPE "EstadoMulta" AS ENUM ('PENDIENTE', 'PAGADA', 'EN_APELACION', 'VENCIDA');

-- CreateEnum
CREATE TYPE "TipoMulta" AS ENUM ('LEVE', 'GRAVE', 'MUY_GRAVE');

-- CreateEnum
CREATE TYPE "EstadoReporte" AS ENUM ('PENDIENTE', 'EN_REVISION', 'RESUELTO', 'RECHAZADO');

-- CreateEnum
CREATE TYPE "TipoReporte" AS ENUM ('INCONSISTENCIA_PRECIO', 'PRODUCTO_NO_DISPONIBLE', 'PUBLICIDAD_ENGAÑOSA', 'OTROS');

-- CreateEnum
CREATE TYPE "EstadoInconsistencia" AS ENUM ('REPORTADA', 'EN_INVESTIGACION', 'CONFIRMADA', 'RECHAZADA', 'RESUELTA');

-- CreateEnum
CREATE TYPE "EstadoOferta" AS ENUM ('ACTIVA', 'EXPIRADA', 'CANCELADA', 'AGOTADA');

-- CreateEnum
CREATE TYPE "EstadoProducto" AS ENUM ('ACTIVO', 'INACTIVO', 'DESCONTINUADO');

-- CreateEnum
CREATE TYPE "CanalNotificacion" AS ENUM ('PUSH', 'EMAIL', 'SMS');

-- CreateEnum
CREATE TYPE "EstadoNotificacion" AS ENUM ('PENDIENTE', 'ENVIADA', 'FALLIDA');

-- CreateTable
CREATE TABLE "usuarios" (
    "usuario_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo_usuario" "TipoUsuario" NOT NULL,
    "telefono" TEXT,
    "avatar_url" TEXT,
    "estado" "EstadoUsuario" NOT NULL DEFAULT 'ACTIVO',
    "latitud" DECIMAL(10,6),
    "longitud" DECIMAL(10,6),
    "direccion" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "tiendas" (
    "tienda_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo_tienda" "TipoTienda" NOT NULL,
    "direccion_calle" TEXT NOT NULL,
    "direccion_ciudad" TEXT NOT NULL,
    "direccion_estado" TEXT NOT NULL,
    "direccion_codigo_postal" TEXT,
    "latitud" DECIMAL(10,6) NOT NULL,
    "longitud" DECIMAL(10,6) NOT NULL,
    "telefono" TEXT,
    "horario_apertura" TEXT,
    "horario_cierre" TEXT,
    "dias_apertura" TEXT[],
    "calificacion_promedio" DECIMAL(3,2) DEFAULT 0,
    "total_calificaciones" INTEGER DEFAULT 0,
    "logo_url" TEXT,
    "estado" "EstadoUsuario" NOT NULL DEFAULT 'ACTIVO',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tiendas_pkey" PRIMARY KEY ("tienda_id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "categoria_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "icono" TEXT,
    "imagen_url" TEXT,
    "padre_id" TEXT,
    "nivel" INTEGER NOT NULL DEFAULT 1,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "estado" "EstadoUsuario" NOT NULL DEFAULT 'ACTIVO',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("categoria_id")
);

-- CreateTable
CREATE TABLE "productos" (
    "producto_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "marca" TEXT,
    "categoria_id" TEXT NOT NULL,
    "upc" TEXT,
    "imagen_url" TEXT,
    "unidad_medida" TEXT NOT NULL,
    "contenido" DECIMAL(10,3) NOT NULL,
    "estado" "EstadoProducto" NOT NULL DEFAULT 'ACTIVO',
    "perecedero" BOOLEAN NOT NULL DEFAULT false,
    "organico" BOOLEAN NOT NULL DEFAULT false,
    "gluten_free" BOOLEAN NOT NULL DEFAULT false,
    "lactosa_free" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("producto_id")
);

-- CreateTable
CREATE TABLE "precios" (
    "precio_id" TEXT NOT NULL,
    "producto_id" TEXT NOT NULL,
    "tienda_id" TEXT NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,
    "precio_promocional" DECIMAL(10,2),
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "ultima_actualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fuente" TEXT NOT NULL DEFAULT 'tienda',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "precios_pkey" PRIMARY KEY ("precio_id")
);

-- CreateTable
CREATE TABLE "ofertas" (
    "oferta_id" TEXT NOT NULL,
    "tienda_id" TEXT NOT NULL,
    "producto_id" TEXT NOT NULL,
    "precio_oferta" DECIMAL(10,2) NOT NULL,
    "precio_regular" DECIMAL(10,2) NOT NULL,
    "descuento_porcentaje" DECIMAL(5,2),
    "descripcion" TEXT,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "stock_oferta" INTEGER,
    "estado" "EstadoOferta" NOT NULL DEFAULT 'ACTIVA',
    "notificaciones_enviadas" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ofertas_pkey" PRIMARY KEY ("oferta_id")
);

-- CreateTable
CREATE TABLE "calificaciones" (
    "calificacion_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "tienda_id" TEXT NOT NULL,
    "puntuacion" INTEGER NOT NULL,
    "comentario" TEXT,
    "titulo" TEXT,
    "precios_puntuacion" INTEGER,
    "limpieza_puntuacion" INTEGER,
    "atencion_puntuacion" INTEGER,
    "variedad_puntuacion" INTEGER,
    "recomendada" BOOLEAN,
    "estado" "EstadoUsuario" NOT NULL DEFAULT 'ACTIVO',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "calificaciones_pkey" PRIMARY KEY ("calificacion_id")
);

-- CreateTable
CREATE TABLE "reportes" (
    "reporte_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "tienda_id" TEXT NOT NULL,
    "producto_id" TEXT NOT NULL,
    "tipo" "TipoReporte" NOT NULL,
    "descripcion" TEXT NOT NULL,
    "evidencia_url" TEXT,
    "estado" "EstadoReporte" NOT NULL DEFAULT 'PENDIENTE',
    "fecha_resolucion" TIMESTAMP(3),
    "respuesta_profeco" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reportes_pkey" PRIMARY KEY ("reporte_id")
);

-- CreateTable
CREATE TABLE "inconsistencias" (
    "inconsistencia_id" TEXT NOT NULL,
    "reporte_id" TEXT NOT NULL,
    "tienda_id" TEXT NOT NULL,
    "producto_id" TEXT NOT NULL,
    "precio_publicado" DECIMAL(10,2) NOT NULL,
    "precio_real" DECIMAL(10,2) NOT NULL,
    "diferencia" DECIMAL(10,2) NOT NULL,
    "porcentaje_diferencia" DECIMAL(5,2) NOT NULL,
    "evidencia_url" TEXT,
    "estado" "EstadoInconsistencia" NOT NULL DEFAULT 'REPORTADA',
    "fecha_reporte" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_resolucion" TIMESTAMP(3),
    "comentario_investigacion" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inconsistencias_pkey" PRIMARY KEY ("inconsistencia_id")
);

-- CreateTable
CREATE TABLE "multas" (
    "multa_id" TEXT NOT NULL,
    "tienda_id" TEXT NOT NULL,
    "inconsistencia_id" TEXT,
    "motivo" TEXT NOT NULL,
    "monto" DECIMAL(10,2) NOT NULL,
    "tipo_multa" "TipoMulta" NOT NULL,
    "fecha_emision" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_limite_pago" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoMulta" NOT NULL DEFAULT 'PENDIENTE',
    "descripcion" TEXT,
    "recurrencia" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "multas_pkey" PRIMARY KEY ("multa_id")
);

-- CreateTable
CREATE TABLE "preferencias" (
    "preferencia_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "notificaciones_ofertas" BOOLEAN NOT NULL DEFAULT true,
    "radio_busqueda" INTEGER NOT NULL DEFAULT 10,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "preferencias_pkey" PRIMARY KEY ("preferencia_id")
);

-- CreateTable
CREATE TABLE "wishlists" (
    "wishlist_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL DEFAULT 'Mi lista de deseos',
    "es_publica" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wishlists_pkey" PRIMARY KEY ("wishlist_id")
);

-- CreateTable
CREATE TABLE "lista_compras" (
    "lista_compra_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "presupuesto_total" DECIMAL(10,2),
    "fecha_estimada_compra" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lista_compras_pkey" PRIMARY KEY ("lista_compra_id")
);

-- CreateTable
CREATE TABLE "notificaciones" (
    "notificacion_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "datos" JSONB,
    "leida" BOOLEAN NOT NULL DEFAULT false,
    "fecha_envio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_leida" TIMESTAMP(3),
    "canal" "CanalNotificacion" NOT NULL DEFAULT 'PUSH',
    "estado_envio" "EstadoNotificacion" NOT NULL DEFAULT 'PENDIENTE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notificaciones_pkey" PRIMARY KEY ("notificacion_id")
);

-- CreateTable
CREATE TABLE "_SupermercadosFavoritos" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductosFrecuentes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoriasInteres" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_WishlistProductos" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ListaCompraItems" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tiendas_usuario_id_key" ON "tiendas"("usuario_id");

-- CreateIndex
CREATE INDEX "tiendas_latitud_longitud_idx" ON "tiendas"("latitud", "longitud");

-- CreateIndex
CREATE UNIQUE INDEX "productos_upc_key" ON "productos"("upc");

-- CreateIndex
CREATE INDEX "productos_nombre_descripcion_idx" ON "productos"("nombre", "descripcion");

-- CreateIndex
CREATE UNIQUE INDEX "precios_producto_id_tienda_id_key" ON "precios"("producto_id", "tienda_id");

-- CreateIndex
CREATE INDEX "precios_precio_idx" ON "precios"("precio");

-- CreateIndex
CREATE INDEX "ofertas_fecha_fin_estado_idx" ON "ofertas"("fecha_fin", "estado");

-- CreateIndex
CREATE UNIQUE INDEX "calificaciones_usuario_id_tienda_id_key" ON "calificaciones"("usuario_id", "tienda_id");

-- CreateIndex
CREATE INDEX "calificaciones_tienda_id_puntuacion_idx" ON "calificaciones"("tienda_id", "puntuacion");

-- CreateIndex
CREATE INDEX "inconsistencias_tienda_id_estado_idx" ON "inconsistencias"("tienda_id", "estado");

-- CreateIndex
CREATE UNIQUE INDEX "preferencias_usuario_id_key" ON "preferencias"("usuario_id");

-- CreateIndex
CREATE INDEX "wishlists_usuario_id_idx" ON "wishlists"("usuario_id");

-- CreateIndex
CREATE INDEX "lista_compras_usuario_id_idx" ON "lista_compras"("usuario_id");

-- CreateIndex
CREATE INDEX "notificaciones_usuario_id_leida_idx" ON "notificaciones"("usuario_id", "leida");

-- CreateIndex
CREATE UNIQUE INDEX "_SupermercadosFavoritos_AB_unique" ON "_SupermercadosFavoritos"("A", "B");

-- CreateIndex
CREATE INDEX "_SupermercadosFavoritos_B_index" ON "_SupermercadosFavoritos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductosFrecuentes_AB_unique" ON "_ProductosFrecuentes"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductosFrecuentes_B_index" ON "_ProductosFrecuentes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriasInteres_AB_unique" ON "_CategoriasInteres"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriasInteres_B_index" ON "_CategoriasInteres"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_WishlistProductos_AB_unique" ON "_WishlistProductos"("A", "B");

-- CreateIndex
CREATE INDEX "_WishlistProductos_B_index" ON "_WishlistProductos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ListaCompraItems_AB_unique" ON "_ListaCompraItems"("A", "B");

-- CreateIndex
CREATE INDEX "_ListaCompraItems_B_index" ON "_ListaCompraItems"("B");

-- AddForeignKey
ALTER TABLE "tiendas" ADD CONSTRAINT "tiendas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_padre_id_fkey" FOREIGN KEY ("padre_id") REFERENCES "categorias"("categoria_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("categoria_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "precios" ADD CONSTRAINT "precios_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("producto_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "precios" ADD CONSTRAINT "precios_tienda_id_fkey" FOREIGN KEY ("tienda_id") REFERENCES "tiendas"("tienda_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ofertas" ADD CONSTRAINT "ofertas_tienda_id_fkey" FOREIGN KEY ("tienda_id") REFERENCES "tiendas"("tienda_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ofertas" ADD CONSTRAINT "ofertas_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("producto_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calificaciones" ADD CONSTRAINT "calificaciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calificaciones" ADD CONSTRAINT "calificaciones_tienda_id_fkey" FOREIGN KEY ("tienda_id") REFERENCES "tiendas"("tienda_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reportes" ADD CONSTRAINT "reportes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reportes" ADD CONSTRAINT "reportes_tienda_id_fkey" FOREIGN KEY ("tienda_id") REFERENCES "tiendas"("tienda_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reportes" ADD CONSTRAINT "reportes_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("producto_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inconsistencias" ADD CONSTRAINT "inconsistencias_reporte_id_fkey" FOREIGN KEY ("reporte_id") REFERENCES "reportes"("reporte_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inconsistencias" ADD CONSTRAINT "inconsistencias_tienda_id_fkey" FOREIGN KEY ("tienda_id") REFERENCES "tiendas"("tienda_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inconsistencias" ADD CONSTRAINT "inconsistencias_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("producto_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "multas" ADD CONSTRAINT "multas_tienda_id_fkey" FOREIGN KEY ("tienda_id") REFERENCES "tiendas"("tienda_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "multas" ADD CONSTRAINT "multas_inconsistencia_id_fkey" FOREIGN KEY ("inconsistencia_id") REFERENCES "inconsistencias"("inconsistencia_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preferencias" ADD CONSTRAINT "preferencias_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lista_compras" ADD CONSTRAINT "lista_compras_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificaciones" ADD CONSTRAINT "notificaciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SupermercadosFavoritos" ADD CONSTRAINT "_SupermercadosFavoritos_A_fkey" FOREIGN KEY ("A") REFERENCES "preferencias"("preferencia_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SupermercadosFavoritos" ADD CONSTRAINT "_SupermercadosFavoritos_B_fkey" FOREIGN KEY ("B") REFERENCES "tiendas"("tienda_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductosFrecuentes" ADD CONSTRAINT "_ProductosFrecuentes_A_fkey" FOREIGN KEY ("A") REFERENCES "preferencias"("preferencia_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductosFrecuentes" ADD CONSTRAINT "_ProductosFrecuentes_B_fkey" FOREIGN KEY ("B") REFERENCES "productos"("producto_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriasInteres" ADD CONSTRAINT "_CategoriasInteres_A_fkey" FOREIGN KEY ("A") REFERENCES "preferencias"("preferencia_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriasInteres" ADD CONSTRAINT "_CategoriasInteres_B_fkey" FOREIGN KEY ("B") REFERENCES "categorias"("categoria_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WishlistProductos" ADD CONSTRAINT "_WishlistProductos_A_fkey" FOREIGN KEY ("A") REFERENCES "productos"("producto_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WishlistProductos" ADD CONSTRAINT "_WishlistProductos_B_fkey" FOREIGN KEY ("B") REFERENCES "wishlists"("wishlist_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListaCompraItems" ADD CONSTRAINT "_ListaCompraItems_A_fkey" FOREIGN KEY ("A") REFERENCES "lista_compras"("lista_compra_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListaCompraItems" ADD CONSTRAINT "_ListaCompraItems_B_fkey" FOREIGN KEY ("B") REFERENCES "productos"("producto_id") ON DELETE CASCADE ON UPDATE CASCADE;