show databases;

create database if not exists vehicle_rental_system;
use vehicle_rental_system;
-- drop database if exists vehicle_rental_system;

create table roles (
roleid int auto_increment primary key,
rolename varchar(50) not null unique
);


create table users (
userid int primary key auto_increment,
username varchar(100) not null,
email varchar(50) not null unique,
phone varchar(15) not null unique,
password varchar(255) not null,
roleid int not null,
created_at datetime default current_timestamp,
foreign key(roleid) references roles(roleid) on update cascade
);


create table useraddress (
addressid int auto_increment primary key,
userid int not null,
addressline varchar(255) not null,
city varchar(100),
state varchar(100),
pincode varchar(30),

foreign key(userid) references users(userid) on delete cascade on update cascade
);


create table userdrivinglicense (
licenseid int auto_increment primary key,
userid int not null,
licensenumber varchar(100) unique,
expirydate date not null,
verificationstatus enum('Pending','Approved','Rejected') default 'Pending',

foreign key(userid) references users(userid) on delete cascade on update cascade
);


create table vehiclebrand(
brandid int auto_increment primary key,
brandname varchar(100) not null
);



create table vehiclemodel(
modelid int auto_increment primary key,
brandid int not null,
modelname varchar(100) not null,
year year not null,

foreign key(brandid) references vehiclebrand(brandid) on delete cascade
);



create table vehiclecategory(
categoryid int auto_increment primary key,
categoryname varchar(100) not null unique
);

create table vehicle (
vehicleid int auto_increment primary key,
vehiclenumber varchar(100) not null unique,
brandid int not null,
modelid int not null,
categoryid int not null,
fueltype enum('Petrol','Diesel','Electric','Hybrid'),
transmission enum('Manual', 'Automatic'),
seatingcapacity int,
status enum('Available','Booked','Maintainance') default 'Available',

foreign key(brandid) references vehiclebrand(brandid) on delete cascade on update cascade,
foreign key(modelid) references vehiclemodel(modelid)  on delete cascade on update cascade,
foreign key (categoryid) references vehiclecategory(categoryid)  on delete cascade on update cascade
);



create table price (
priceid int auto_increment primary key,
vehicleid int not null,
hourlyprice decimal(10,2),
dailyprice decimal(10,2),
weeklyprice decimal(10,2),

foreign key (vehicleid) references vehicle(vehicleid) on delete cascade on update cascade
);



create table booking(
bookingid int auto_increment primary key,
userid int not null,
vehicleid int not null,
 pickupdate datetime not null,
 returndate datetime not null,
 pickuplocation varchar(255),
 droplocation varchar(255),
 bookingstatus enum('Pending','Confirmed', 'Cancelled', 'Completed') default 'Pending',
 totalprice decimal(10,2),
 
 foreign key (userid) references users(userid) on delete cascade on update cascade ,
 foreign key (vehicleid) references vehicle(vehicleid) on delete cascade on update cascade
 );
 

 create table payment(
paymentid int primary key auto_increment,
bookingid int not null,
priceid int not null,
paymentstatus enum('Pending', 'Success', 'Failed') default 'Pending',
paymentdate datetime default current_timestamp,

foreign key (bookingid) references booking(bookingid) on delete cascade on update cascade,
foreign key (priceid) references price(priceid) on delete cascade on update cascade
);



create table maintenance(
vehicleid int not null,
servicedate date ,
maintenanceid int auto_increment primary key,
description varchar(1000),
cost decimal(10,2),
nextservicedate date,

foreign key (vehicleid) references vehicle(vehicleid) on delete cascade on update cascade
);


create table review(
reviewid int auto_increment primary key,
userid int not null,
bookingid int not null,
vehicleid int not null,
rating int check (rating between 1 and 5),
comment varchar(1000),
createdate timestamp default current_timestamp,

foreign key (userid) references users(userid) on delete cascade on update cascade,
foreign key(vehicleid) references vehicle(vehicleid) on delete cascade on update cascade,
foreign key(bookingid) references booking(bookingid) on delete cascade on update cascade
);

