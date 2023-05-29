
CREATE OR ALTER PROCEDURE InsertIntoCart
(
    @id VARCHAR(100),
    @userid VARCHAR(100),
    @productid VARCHAR(100),
    @price VARCHAR(100)
    
)
AS
BEGIN
    INSERT INTO cart (id,userid, productid,price)
    VALUES (@id, @userid, @productid,@price);
END;