CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name_product VARCHAR(150) NOT NULL,
    description TEXT,
    base_price NUMERIC(12,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

