CREATE TABLE product_sizes (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    size_id INTEGER,
    CONSTRAINT product_sizes_product_id_fkey
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);