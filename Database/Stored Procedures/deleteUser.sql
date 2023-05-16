CREATE OR ALTER PROCEDURE deleteUser (
    @userId VARCHAR(100)
)
AS
BEGIN   
    UPDATE Users SET isDeleted=1
    WHERE userId=@userId
END
