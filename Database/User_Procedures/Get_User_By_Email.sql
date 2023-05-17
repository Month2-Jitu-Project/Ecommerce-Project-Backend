USE Ecommerce
GO
--###################################################
--CREATE STORED PROCEDURE FOR GETTING INDIVIDUAL USERS
--##################################################
CREATE OR ALTER PROCEDURE getUserByEmail(@email VARCHAR(100))
AS
BEGIN
    SELECT *
    FROM Users
    WHERE @email = email AND isDeleted = 0
END
--########################
--EXECUTE STORED PROCEDURE
--########################
EXEC getUserByEmail @email='johndoe@gmail.com'
