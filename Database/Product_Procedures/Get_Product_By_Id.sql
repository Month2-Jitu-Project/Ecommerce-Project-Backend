USE Ecommerce
GO

--###################################################
--CREATE STORED PROCEDURE FOR GETTING A SINGLE PRODUCT
--##################################################
CREATE OR ALTER PROCEDURE getProductById(@productId VARCHAR(255))
AS
BEGIN
    SELECT *
    FROM Products
    WHERE @productId = productId AND isDeleted = 0
END
--########################
--EXECUTE STORED PROCEDURE
--########################
EXEC getProductById @productId='abe0fc31-0e5b-4b30-994a-8318fdb81ede'