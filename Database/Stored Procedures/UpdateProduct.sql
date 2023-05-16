CREATE PROCEDURE UpdateProduct
  @id VARCHAR(100),
  @name VARCHAR(100),
  @price VARCHAR(100)
AS
BEGIN
  UPDATE products
  SET name = @name,
      price = @price
  WHERE id = @id;
END
