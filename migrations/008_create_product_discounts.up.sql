CREATE TABLE product_discounts (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    is_flashsale BOOLEAN DEFAULT FALSE,
    discount_rate NUMERIC(5,2),
    description TEXT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    CONSTRAINT product_discounts_product_id_fkey
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);