--Nueva BD
-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.10.2-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para db_moto_pits
CREATE DATABASE IF NOT EXISTS `db_moto_pits` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `db_moto_pits`;

-- Volcando estructura para tabla db_moto_pits.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `nomb_categ` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla db_moto_pits.detalle_factura
CREATE TABLE IF NOT EXISTS `detalle_factura` (
  `id_dtfact` int(3) NOT NULL AUTO_INCREMENT,
  `id_produc` int(3) NOT NULL,
  `cant_produc` int(3) DEFAULT NULL,
  `factura_id` int(3) DEFAULT NULL,
  `valor` int(10) DEFAULT NULL,
  PRIMARY KEY (`id_dtfact`),
  KEY `id_produc` (`id_produc`),
  KEY `factura_id` (`factura_id`),
  CONSTRAINT `detalle_factura_ibfk_1` FOREIGN KEY (`id_produc`) REFERENCES `productos` (`id`),
  CONSTRAINT `detalle_factura_ibfk_2` FOREIGN KEY (`factura_id`) REFERENCES `facturas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla db_moto_pits.detalle_reps
CREATE TABLE IF NOT EXISTS `detalle_reps` (
  `idDetalleRep` int(5) NOT NULL AUTO_INCREMENT,
  `idMantenimiento` int(5) DEFAULT NULL,
  `idProducto` int(5) DEFAULT NULL,
  PRIMARY KEY (`idDetalleRep`),
  KEY `FK_detalle_reps_mantenimientos` (`idMantenimiento`),
  KEY `FK_detalle_reps_productos` (`idProducto`),
  CONSTRAINT `FK_detalle_reps_mantenimientos` FOREIGN KEY (`idMantenimiento`) REFERENCES `mantenimientos` (`id_mantenimiento`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_detalle_reps_productos` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla db_moto_pits.empleados
CREATE TABLE IF NOT EXISTS `empleados` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `cedula` int(10) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `cargo` varchar(15) NOT NULL,
  `contrasena` varchar(20) NOT NULL,
  `correo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla db_moto_pits.facturas
CREATE TABLE IF NOT EXISTS `facturas` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(10) NOT NULL,
  `fecha` varchar(50) NOT NULL DEFAULT '',
  `cedula` int(10) DEFAULT NULL,
  `descripcion` varchar(500) NOT NULL,
  `total` int(10) NOT NULL,
  `id_pago` int(3) DEFAULT NULL,
  `id_tiposervicio` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_facturas_pagos` (`id_pago`),
  KEY `FK_facturas_tipos_servicio` (`id_tiposervicio`),
  CONSTRAINT `FK_facturas_pagos` FOREIGN KEY (`id_pago`) REFERENCES `pagos` (`id_pago`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_facturas_tipos_servicio` FOREIGN KEY (`id_tiposervicio`) REFERENCES `tipos_servicio` (`id_tiposervicio`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10177 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla db_moto_pits.mantenimientos
CREATE TABLE IF NOT EXISTS `mantenimientos` (
  `id_mantenimiento` int(3) NOT NULL AUTO_INCREMENT,
  `placa` varchar(6) NOT NULL,
  `fecha_mantenimiento` varchar(50) NOT NULL DEFAULT '',
  `tipo_servicio` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `horas_empleadas` int(2) NOT NULL,
  `repuestos` varchar(200) NOT NULL,
  `manoobra` int(10) NOT NULL,
  `idCliente` int(10) DEFAULT NULL,
  `estadoMantenimiento` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_mantenimiento`),
  KEY `mantenimientos_ibfk_1` (`idCliente`),
  CONSTRAINT `mantenimientos_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla db_moto_pits.pagos
CREATE TABLE IF NOT EXISTS `pagos` (
  `id_pago` int(3) NOT NULL AUTO_INCREMENT,
  `tipo_pago` varchar(30) NOT NULL,
  PRIMARY KEY (`id_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla db_moto_pits.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `marca` varchar(50) DEFAULT NULL,
  `referencia` varchar(50) DEFAULT NULL,
  `descripcion` varchar(1500) DEFAULT NULL,
  `precio` int(10) DEFAULT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `cantidad` int(5) DEFAULT NULL,
  `talla` varchar(5) DEFAULT NULL,
  `id_categoria` int(3) DEFAULT NULL,
  `idProveedor` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categoria` (`id_categoria`),
  KEY `FK_productos_proveedores` (`idProveedor`),
  CONSTRAINT `FK_productos_proveedores` FOREIGN KEY (`idProveedor`) REFERENCES `proveedores` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`),
  CONSTRAINT `productos_ibfk_3` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`),
  CONSTRAINT `productos_ibfk_4` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`),
  CONSTRAINT `productos_ibfk_5` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`),
  CONSTRAINT `productos_ibfk_6` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`),
  CONSTRAINT `productos_ibfk_7` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla db_moto_pits.proveedores
CREATE TABLE IF NOT EXISTS `proveedores` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `nit_prov` int(10) NOT NULL DEFAULT 0,
  `nombre_prov` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla db_moto_pits.pruebas
CREATE TABLE IF NOT EXISTS `pruebas` (
  `codigo` varchar(50) NOT NULL DEFAULT 'AUTO_INCREMENT',
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla db_moto_pits.servicio_ocasional
CREATE TABLE IF NOT EXISTS `servicio_ocasional` (
  `id_sv_ocacional` int(3) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `descripcion` varchar(500) NOT NULL,
  PRIMARY KEY (`id_sv_ocacional`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla db_moto_pits.tipos_servicio
CREATE TABLE IF NOT EXISTS `tipos_servicio` (
  `id_tiposervicio` int(3) NOT NULL AUTO_INCREMENT,
  `nombre_tipo_servicio` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_tiposervicio`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla db_moto_pits.tipousuario
CREATE TABLE IF NOT EXISTS `tipousuario` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla db_moto_pits.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `cedula` int(10) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `celular` varchar(10) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `contrasena` varchar(20) NOT NULL,
  `idtipousuario` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `cedula` (`cedula`),
  KEY `idtipousuario` (`idtipousuario`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idtipousuario`) REFERENCES `tipousuario` (`id`),
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`idtipousuario`) REFERENCES `tipousuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para disparador db_moto_pits.detalle_factura_before_insert
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `detalle_factura_before_insert` BEFORE INSERT ON `detalle_factura` FOR EACH ROW BEGIN
declare stock_temp int;
set stock_temp= (select cantidad from productos where new.id_produc=productos.id)- new.cant_produc;  
if (stock_temp >= 0)THEN 
update productos set cantidad =stock_temp where id=new.id_produc;
set new.valor= new.cant_produc * (select precio from productos where new.id_produc=productos.id);    
UPDATE facturas SET total=total+new.valor where id=new.factura_id;
else 
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No tiene suficiente Stock';
END IF ;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;




































CREATE database db_moto_pits;

use db_moto_pits;

CREATE TABLE productos(
    id INT(1) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50),
    referencia VARCHAR(50),
    descripcion VARCHAR(250),
    precio INT(10),
    imagen VARCHAR(200),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE productos 
ADD cantidad INT(5);

ALTER TABLE productos
ADD talla VARCHAR(5);

ALTER TABLE productos
ADD id_categoria INT(3);

--Comentairo

CREATE TABLE usuarios (
    id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cedula INT(10) NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    celular VARCHAR(10) NOT NULL,
    correo VARCHAR(20) NOT NULL,
    contrasena VARCHAR(20) NOT NULL
);

CREATE TABLE tipousuario (
    id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL
);

CREATE TABLE categorias (
    id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nomb_categ VARCHAR(50) NOT NULL
);

CREATE TABLE empleados (
    id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cedula INT(10) NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    cargo VARCHAR(15) NOT NULL,
    contraseña VARCHAR(20) NOT NULL
);

CREATE TABLE detalle_reps (
    id_product INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_mto INT(3) NOT NULL
);

CREATE TABLE detalle_factura (
    id_dtfact INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_produc INT(3) NOT NULL,
    cant_produc INT(3)
);

CREATE TABLE tipos_servicio (
    id_tiposervicio INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_tipo_servicio VARCHAR(50)
);

CREATE TABLE pagos (
    id_pago INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo_pago VARCHAR(30) NOT NULL    
);

CREATE TABLE mantenimientos (
    id_mantenimiento INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(6) NOT NULL,
    fecha_mantenimiento TIMESTAMP NOT NULL,
    tipo_servicio VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    horas_empleadas INT(2) NOT NULL,
    repuestos VARCHAR(200) NOT NULL,
    manoobra INT(10) NOT NULL,
    cedula INT(10)
);

CREATE TABLE facturas (
    id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fecha TIMESTAMP NOT NULL,
    cedula INT(10),
    descripcion VARCHAR(500) NOT NULL,
    total INT(10) NOT NULL,
    iva FLOAT(4) NOT NULL,
    id_pago INT(3),
    id_tiposervicio INT(3)
);

CREATE TABLE servicio_ocasional (
    id_sv_ocacional INT(3) NOT NULL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL,
    descripcion  VARCHAR(500) NOT NULL
);



insert into usuarios values 
(null, 107345679, "Libardo", "Perez", 310310310, "libardo@mail.com", "abc123"), 
(null, 107398765, "Edwin", "Barajas", 313456789, "edwin@mail.com", "abc123"), 
(null, 107741582, "David", "Ballesteros", 32578695, "david@mail.com", "abc123");

drop table proveedores;
CREATE TABLE proveedores (
    id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nit_prov int(10) NOT NULL,
    nombre_prov VARCHAR(50) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    direccion varchar(50) NOT NULL

);

--Cambios

insert into tipousuario values(null, "admin"), (null, "usuario"), (null, "cliente");
alter table usuarios add column idtipousuario int(2); 
alter table usuarios add foreign key (idtipousuario) references tipousuario(id);

select * from usuarios inner join tipousuario on usuarios.id = tipousuario.id; 


drop table mantenimientos;

CREATE TABLE mantenimientos (
    id_mantenimiento INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(6) NOT NULL,
    fecha_mantenimiento TIMESTAMP NOT NULL,
    tipo_servicio VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    horas_empleadas INT(2) NOT NULL,
    repuestos VARCHAR(200) NOT NULL,
    manoobra INT(10) NOT NULL,
    idCliente INT(3),
    estadoMantenimiento varchar(30)
);
alter table mantenimientos add foreign key (idCliente) references usuarios(id);
--alter table mantenimientos add column estadoMantenimiento varchar(30);


insert into mantenimientos values (null, "abc123", "2023-02-14", "Mantenimiento", "Se le arreglo...", 8, "nadita",  1, 1, "en pausa");

insert into pagos values(null, "Efectivo"), (null, "Tarjeta"), (null, "Nequi"), (null, "Daviplata");

alter table productos add foreign key (id_categoria) references categorias(id);
alter table detalle_factura add foreign key (id_produc) references productos(id);
alter table detalle_factura add factura_id int(3);
alter table detalle_factura add foreign key (factura_id) references facturas(id_fact);
alter table detalle_factura add valor int(10);

-- trigger
CREATE DEFINER=`root`@`localhost` TRIGGER `db_moto_pits`.`detalle_factura_BEFORE_INSERT` BEFORE INSERT ON `detalle_factura` FOR EACH ROW
BEGIN

declare stock_temp int;
set stock_temp= (select cantidad from productos where new.id_produc=productos.id)- new.cant_produc;  
if (stock_temp >= 0)THEN 
update productos set cantidad =stock_temp where id=new.id_produc;
set new.valor= new.cant_produc * (select precio from productos where new.id_produc=productos.id);    
UPDATE facturas SET total=total+new.valor where id_fact=new.factura_id;
else 
SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No tiene suficiente Stock';
END IF ;
END


alter table mantenimientos change column fecha_mantenimiento fecha_mantenimento varchar(20);
alter table productos change column fecha fecha varchar(20);
alter table facturas change column fecha fecha varchar(20);

select * from facturas inner join detalle_factura on facturas.id = detalle_factura.id_fact;

insert into pagos values (null, "Por definir"); 
insert into tipo_servicio values (null, "Por definir");


CREATE TABLE `detalle_reps` (
	`idDetalleRep` INT(5) NOT NULL AUTO_INCREMENT,
	`idMantenimiento` INT(5) NULL,
	`idProducto` INT(5) NULL,
	PRIMARY KEY (`idDetalleRep`),
	CONSTRAINT `FK_detalle_reps_mantenimientos` FOREIGN KEY (`idMantenimiento`) REFERENCES `mantenimientos` (`id_mantenimiento`) ON UPDATE NO ACTION ON DELETE CASCADE,
	CONSTRAINT `FK_detalle_reps_productos` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`) ON UPDATE NO ACTION ON DELETE CASCADE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

