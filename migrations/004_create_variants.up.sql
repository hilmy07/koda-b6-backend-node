CREATE TABLE variants (
    id SERIAL PRIMARY KEY,
    variant_name VARCHAR(100) NOT NULL,
    add_price INTEGER DEFAULT 0
);