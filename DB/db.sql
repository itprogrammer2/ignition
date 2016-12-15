CREATE TABLE accounts (
  username varchar(50),
  password varchar(50),
  PRIMARY KEY (username)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

INSERT INTO accounts (username, password) VALUES
('user1', md5('user123')),
('user2', md5('user123')),
('user3', md5('user123')),
('user4', md5('user123'));