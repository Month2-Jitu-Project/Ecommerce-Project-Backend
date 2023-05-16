CREATE OR ALTER PROCEDURE GetCartById
  @id VARCHAR(100)
AS
BEGIN
  SELECT userid, productid,quantity,price
  FROM cart
  WHERE id = @id;
END