CREATE OR ALTER PROCEDURE UpdateCart
    @userid VARCHAR(100),
    @productid VARCHAR(100),
    @quantity INT,
    @price VARCHAR(100)
AS
BEGIN
    UPDATE cart
    SET quantity = @quantity,
        price = @price
    WHERE userid = @userid
        AND productid = @productid;
END