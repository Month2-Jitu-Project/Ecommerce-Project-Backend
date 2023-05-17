USE Ecommerce
GO

--###################################################
--CREATE STORED PROCEDURE FOR GETTING ALL PRODUCTS
--##################################################
CREATE OR ALTER PROCEDURE getProducts
AS
BEGIN
    SELECT *
    FROM Products
    WHERE isDeleted = 0
END
--########################
--EXECUTE STORED PROCEDURE
--########################
EXEC getProducts