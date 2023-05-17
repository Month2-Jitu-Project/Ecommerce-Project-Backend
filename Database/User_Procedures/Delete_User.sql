USE Ecommerce
GO
--##############################################
--CREAT STORED PROCEDURE FOR DELETING A USER
--##############################################
CREATE OR ALTER PROCEDURE deleteUser (
    @userId VARCHAR(100)
)
AS
BEGIN   
    UPDATE Users SET isDeleted=1
    WHERE userId=@userId
END

SELECT * FROM Users

EXEC deleteUser 'A242o2380'

