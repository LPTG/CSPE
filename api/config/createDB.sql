-- Connect as Root user before running
CREATE USER 'mark'@'localhost' IDENTIFIED BY '4FwRc2WSnz7H.';

CREATE DATABASE mark;

GRANT ALL ON mark.* TO 'mark'@'localhost';