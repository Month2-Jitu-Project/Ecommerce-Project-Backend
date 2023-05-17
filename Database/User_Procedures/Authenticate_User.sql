--##########################################
--####### STORED PROCEDURE FOR AUTHENTICATING
--################# USER ####################
--##########################################
CREATE OR ALTER PROCEDURE AuthenticateUser(
    @email VARCHAR(100),
    @userPassword VARCHAR(100)
)
AS
BEGIN
    SELECT email, userPassword
    FROM Users
    WHERE @email=email AND @userPassword=userPassword
END
