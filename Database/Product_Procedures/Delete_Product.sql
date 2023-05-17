USE Ecommerce
GO
--##############################################
--CREAT STORED PROCEDURE FOR DELETING A USER
--##############################################
CREATE OR ALTER PROCEDURE deleteProduct (
    @productId VARCHAR(100)
)
AS
BEGIN   
    UPDATE Products SET isDeleted=1
    WHERE productId=@productId
    AND isDeleted=0
END

EXEC deleteProduct '12321'
--##############################################
--########### VIEW UPDATED CONTENTS ############
--##############################################
SELECT * FROM Products