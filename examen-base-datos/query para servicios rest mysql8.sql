create database nutrinet;
use nutrinet;
create table clientes (
cliente_id int not null auto_increment,
nombre_usuario varchar(50) unique,
contrasena varchar(50),
nombre varchar(50),
apellidos varchar(50),
correo_electronico varchar(50) unique,
edad int,
estatura dec(5, 2),
peso dec(5, 2),
imc dec(5, 2),
geb dec(5, 2),
eta dec(5, 2),
fecha_creacion date,
fecha_actualizacion date,
primary key(cliente_id)
);
show tables;
select * from clientes;
drop table clientes;
drop database nutrinet;
insert into clientes values (1, 'yordycc', 'welcome1', 'Yordy', 'Cruz Cruz', 'yordycruz96@gmail.com', 24, 1.64, 65, 22, 10, 10, '2020-09-05', '2020-09-05');
insert into clientes values (2, 'yordycc1', 'welcome1', 'Yordy', 'Cruz Cruz', 'yordycruz96@gmail.com', 24, 1.64, 65, 22, 10, 10, '2020-09-05', '2020-09-05');

delete from clientes where cliente_id = 13;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'welcome1';
GRANT all ON *.* TO 'root'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
flush privileges;