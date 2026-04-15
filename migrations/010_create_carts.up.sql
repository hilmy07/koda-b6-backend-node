CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    size VARCHAR(50),
    variant VARCHAR(50),
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT carts_unique_item
        UNIQUE (user_id, product_id, size, variant),

    CONSTRAINT fk_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);