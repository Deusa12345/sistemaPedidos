-- Criação da tabela EMPRESAS
CREATE TABLE EMPRESAS (
    ID SERIAL PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL,
    NIF VARCHAR(20) UNIQUE NOT NULL,
    Email_Contato VARCHAR(255) UNIQUE NOT NULL
);

-- Inserção de dados na tabela EMPRESAS
INSERT INTO EMPRESAS (Nome, NIF, Email_Contato) VALUES ('Empresa X', '123456789', 'empresa@email.com');

-- Criação da tabela PEDIDOS
CREATE TABLE PEDIDOS (
    ID SERIAL PRIMARY KEY,
    Empresa_ID INT REFERENCES EMPRESAS(ID),
    Tipo VARCHAR(50) NOT NULL,
    Descricao TEXT,
    Valor DECIMAL(10, 2) NOT NULL,
    Data_Submissao DATE NOT NULL,
    Estado VARCHAR(20) DEFAULT 'PENDENTE'
);

-- Inserção de dados na tabela PEDIDOS
INSERT INTO PEDIDOS (Empresa_ID, Tipo, Descricao, Valor, Data_Submissao, Estado) VALUES (1, 'Aquisição', 'Compra de PCs', 2500, '2024-03-02', 'PENDENTE');