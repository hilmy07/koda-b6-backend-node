CREATE TABLE sizes (
    id SERIAL PRIMARY KEY,
    size_name VARCHAR(50) NOT NULL,
    add_price NUMERIC(12,2) DEFAULT 0
);