
CREATE OR ALTER PROCEDURE InsertIntoCart
(
    @id VARCHAR(100),
    @userid VARCHAR(100),
    @productid VARCHAR(100),
    @price VARCHAR(100),
    @image VARCHAR(100),
    @description VARCHAR(100),
    @category VARCHAR(100) 

)
AS
BEGIN
    INSERT INTO cart (id,userid, productid,price,image,description,category)
    VALUES (@id, @userid, @productid,@price,@image,description,category);
END;