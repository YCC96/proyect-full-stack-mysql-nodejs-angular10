-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tienda
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tienda
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tienda` DEFAULT CHARACTER SET utf8 ;
USE `tienda` ;

-- -----------------------------------------------------
-- Table `tienda`.`Cajeros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tienda`.`Cajeros` (
  `Cajero` INT NOT NULL,
  `NomApell` VARCHAR(255) NULL,
  PRIMARY KEY (`Cajero`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tienda`.`Productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tienda`.`Productos` (
  `Producto` INT NOT NULL,
  `Nombre` VARCHAR(100) NULL,
  `Precio` DECIMAL(10,3) NULL,
  PRIMARY KEY (`Producto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tienda`.`Maquinas_Registradoras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tienda`.`Maquinas_Registradoras` (
  `Maquina` INT NOT NULL,
  `Piso` INT NULL,
  PRIMARY KEY (`Maquina`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tienda`.`Venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tienda`.`Venta` (
  `Cajero` INT NOT NULL,
  `Producto` INT NOT NULL,
  `Maquina` INT NOT NULL,
  INDEX `fk_Cajeros_has_Productos_Productos1_idx` (`Producto` ASC) VISIBLE,
  INDEX `fk_Cajeros_has_Productos_Cajeros_idx` (`Cajero` ASC) VISIBLE,
  INDEX `fk_Maquinas_has_Maquinas_Maquinas_idx` (`Maquina` ASC) INVISIBLE,
  CONSTRAINT `fk_Cajeros_has_Productos_Cajeros`
    FOREIGN KEY (`Cajero`)
    REFERENCES `tienda`.`Cajeros` (`Cajero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cajeros_has_Productos_Productos1`
    FOREIGN KEY (`Producto`)
    REFERENCES `tienda`.`Productos` (`Producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Maquinas_has_Productos_Productos1`
    FOREIGN KEY (`Maquina`)
    REFERENCES `tienda`.`Maquinas_Registradoras` (`Maquina`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
-- -----------------------------------------------------------------------
-- a.	Generar script para poblar todas las tablas.
insert into cajeros values(1, 'Cajero 1');
insert into cajeros values(2, 'Cajero 2');
insert into cajeros values(3, 'Cajero 3');

insert into maquinas_registradoras values(1, 1);
insert into maquinas_registradoras values(2, 2);
insert into maquinas_registradoras values(3, 3);

insert into productos values(1, 'Sabritas', 12);
insert into productos values(2, 'Rufles', 13.5);
insert into productos values(3, 'Doritos', 10.5);
insert into productos values(4, 'Rollos', 9);

insert into venta values(1, 1, 3);
insert into venta values(1, 1, 4);
insert into venta values(1, 1, 1);
insert into venta values(2, 1, 4);
insert into venta values(2, 2, 2);
insert into venta values(3, 1, 2);
insert into venta values(3, 2, 1);
insert into venta values(3, 2, 1);
insert into venta values(3, 2, 1);
insert into venta values(2, 2, 1);
insert into venta values(3, 2, 1);
insert into venta values(3, 3, 1);
insert into venta values(3, 3, 1);
insert into venta values(3, 3, 1);
insert into venta values(3, 3, 1);
insert into venta values(1, 4, 3);
insert into venta values(1, 4, 3);
insert into venta values(1, 4, 3);
insert into venta values(1, 4, 3);
-- ------------------------------------------------------------------------------
show tables;
select * from cajeros;
select * from maquinas_registradoras;
select * from productos;
select * from venta;
-- ------------------------------------------------------------------------------
-- b.	Mostrar el número de ventas de cada producto, ordenado de más a menos ventas.
select p.nombre, count(*) total from venta v, productos p
where v.producto=p.producto group by p.nombre order by total desc;
-- ------------------------------------------------------------------------------
-- c.	Obtener un informe completo de ventas, indicando el nombre del cajero que realizo la venta, nombre y
-- precios de los productos vendidos, y el piso en el que se encuentra la máquina registradora donde se realizó la venta.
select c.NomApell, p.nombre, p.precio, m.piso from venta v, cajeros c, productos p, maquinas_registradoras m
where v.cajero=c.cajero and v.producto=p.producto and m.maquina=v.maquina group by c.NomApell, p.nombre, p.precio, m.piso order by c.NomApell, p.nombre asc;

-- ------------------------------------------------------------------------------
-- d.	Obtener las ventas totales realizadas en cada piso. 
select piso, count(*) total from venta v, maquinas_registradoras m
where v.maquina=m.maquina group by piso;

select piso, count(*) total from venta v left join maquinas_registradoras m on
v.maquina=m.maquina group by piso;

-- ------------------------------------------------------------------------------
-- e.	Obtener el código y nombre de cada cajero junto con el importe total de sus ventas. 
select c.cajero, c.NomApell, count(*) total_ventas, sum(precio) from cajeros c inner join venta v inner join productos p
on c.cajero=v.cajero where v.producto=p.producto group by c.cajero;
-- ------------------------------------------------------------------------------
-- f.	Obtener el código y nombre de aquellos cajeros que hayan realizado ventas en pisos cuyas ventas totales sean inferiores a los 60 pesos.
select x.cajero, x.NomApell, sum(x.precio)
from(
select c.cajero, c.NomApell, count(*) total, sum(precio) precio from venta v left join maquinas_registradoras m
on v.maquina=m.maquina
inner join productos p 
on v.producto=p.producto
inner join cajeros c 
on v.cajero=c.cajero
group by c.cajero, c.NomApell) x where x.precio <= 60 group by x.cajero, x.NomApell;
-- ---------------------------------------------------------------------------------------------------