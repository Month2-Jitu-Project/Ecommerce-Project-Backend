CREATE OR ALTER PROCEDURE getUserById(@userId VARCHAR(100))
AS
BEGIN
    SELECT *
    FROM Users
    WHERE @userId = userId AND isDeleted = 0
END