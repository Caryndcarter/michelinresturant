CREATE DATABASE michelin_restaurantDB;

USE michelin_restaurantDB;

CREATE TABLE `reservations` (
  `res_id` int(11) NOT NULL AUTO_INCREMENT,
  `cust_name` varchar(100) NOT NULL,
  `cust_phone` varchar(100) NOT NULL,
  `cust_email` varchar(100) NOT NULL,
  `diner_number` int(15) NOT NULL,
  `table_number` int(15) DEFAULT NULL,
  `reservation` tinyint(1) DEFAULT '0',
  `waiting_list` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`res_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;