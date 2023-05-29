
CREATE OR ALTER PROCEDURE InsertProduct
  @id VARCHAR(100),
  @name VARCHAR(100),
  @price VARCHAR(100)
AS
BEGIN
  IF NOT EXISTS (SELECT 1 FROM products WHERE id = @id)
  BEGIN
    INSERT INTO products (id, name, price)
    VALUES (@id, @name, @price);
    PRINT 'Product added successfully.';
  END
  ELSE
  BEGIN
    PRINT 'Product with the same ID already exists.';
  END
END