
CREATE table contacts (
	id serial PRIMARY KEY,
	nome VARCHAR ( 100 ) NOT NULL,
	celular VARCHAR ( 13 ) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  password TEXT NOT NULL
);

INSERT INTO users (name, password) values ('thiago', '123');