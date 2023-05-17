USE Ecommerce
GO
--######################################################
--CREATE STORED PROCEDURE FOR UPDATING INDIVIDUAL USERS
--######################################################
CREATE OR ALTER PROCEDURE updatePassword(
    @email VARCHAR(100),
    -- ENSURES THAT ALL VALUES IN A COLUMN ARE DIFFERENT
    -- Both the UNIQUE and PRIMARY KEY constraints provide a 
    -- guarantee for uniqueness for a column or set of columns
    @userPassword VARCHAR(100)
-- WILL BE CONVERTED TO STRING
)
AS
BEGIN
    UPDATE Users
    SET email=@email, 
        userPassword=@userPassword
    WHERE @email = email AND isDeleted = 0
END
--########################
--EXECUTE STORED PROCEDURE
--########################
EXEC updatePassword 'marymagdalene@gmail.com', 'pwd123'

/*** VIEW UPDATED TABLE **/
SELECT * FROM Users