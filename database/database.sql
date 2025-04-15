CREATE DATABASE onboarding;

USE onboarding;

CREATE TABLE consumers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  org_name VARCHAR(255),
  org_type VARCHAR(255),
  address TEXT,
  name VARCHAR(255),
  mobile VARCHAR(20)
);

CREATE TABLE providers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  org_name VARCHAR(255),
  org_type VARCHAR(255),
  gst VARCHAR(255),
  name VARCHAR(255),
  mobile VARCHAR(20)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mobile VARCHAR(20),
  pin VARCHAR(10),
  role ENUM('provider', 'consumer')
);

INSERT INTO users (mobile, pin, role) VALUES ('9999999999', '1234', 'consumer');
INSERT INTO users (mobile, pin, role) VALUES ('8888888888', '4321', 'provider');
select * from users;
select * from consumers;
select * from providers;