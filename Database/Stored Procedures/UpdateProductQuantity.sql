CREATE OR ALTER PROCEDURE UpdateProductQuantity
(
    @productid VARCHAR(100),
    @quantity VARCHAR(100)
)
AS
BEGIN
    UPDATE products
    SET quantity = @quantity
    WHERE id = @productid;
END;
