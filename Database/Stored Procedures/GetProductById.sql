
CREATE PROCEDURE GetProductById
  @id VARCHAR(100)
AS
BEGIN
  SELECT id, name, price
  FROM products
  WHERE id = @id;
END