USE BANCO;

CREATE TABLE produtos(
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    produto VARCHAR(50),
    valor DOUBLE,
    qtd INT,
    imagem VARCHAR(100)
)