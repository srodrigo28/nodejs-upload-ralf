USE railway;

CREATE TABLE produtos(
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    produto VARCHAR(50),
    valor DOUBLE,
    imagem VARCHAR(100)
);