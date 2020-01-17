CREATE TABLE IF NOT EXISTS Responsible (
  responsible_id SERIAL PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  mail VARCHAR(100) NOT NULL,
  pwd VARCHAR(100) NOT NULL,
  FK_CUSTOMER_ID INTEGER DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS Customer (
    customer_id SERIAL PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  mail VARCHAR(100) NOT NULL,
  pwd VARCHAR(100) NOT NULL,
  FK_RESPONSIBLE_ID INTEGER DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS BankAccount (
  account_id SERIAL PRIMARY KEY,
  card_number VARCHAR(16) NOT NULL,
  validity_date DATE NOT NULL,
  cryptogram integer NOT NULL,
  FK_CUSTOMER_ID INTEGER NOT NULL,
  amount integer NOT NULL DEFAULT 0,
  autorizedOverdraft integer NOT NULL,
  alert boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS Transactions(
  transaction_id SERIAL PRIMARY KEY,
  FK_SENDER INTEGER NOT NULL, 
  FK_RECEIVER INTEGER NOT NULL,
  date_transaction DATE DEFAULT NOW()
);