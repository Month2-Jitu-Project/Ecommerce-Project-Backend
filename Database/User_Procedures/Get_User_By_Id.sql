USE Ecommerce
GO
--###################################################
--CREATE STORED PROCEDURE FOR GETTING INDIVIDUAL USERS
--##################################################
CREATE OR ALTER PROCEDURE getUserById(@userId VARCHAR(100))
AS
BEGIN
    SELECT *
    FROM Users
    WHERE @userId = userId AND isDeleted = 0
END
--########################
--EXECUTE STORED PROCEDURE
--########################
EXEC getUserById @userId='1212o2331'