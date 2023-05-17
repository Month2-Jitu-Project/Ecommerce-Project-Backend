USE Ecommerce
GO
--###################################################
--CREATE STORED PROCEDURE FOR GETTING ALL USERS
--##################################################
CREATE OR ALTER PROCEDURE getUsers
AS
BEGIN
    SELECT *
    FROM Users
    WHERE isDeleted = 0
END
--########################
--EXECUTE STORED PROCEDURE
--########################
EXEC getUsers