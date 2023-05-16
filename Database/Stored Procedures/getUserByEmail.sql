CREATE OR ALTER PROCEDURE getUserByEmail(@email VARCHAR(100))
AS
BEGIN
    SELECT *
    FROM Users
    WHERE @email = email AND isDeleted = 0
END