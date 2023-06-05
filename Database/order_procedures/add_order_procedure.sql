USE ECOMMERCE
GO
--####################################################
--CREATE STORED PROCEDURE FOR INSERTING ORDER TO TABLE
--####################################################
CREATE OR ALTER PROCEDURE addOrder(
    @orderId VARCHAR(255),
	@orderDate VARCHAR(255), --TIME STAMP
	@totalAmount INT
)
AS
BEGIN
    INSERT INTO Orders
        (
        orderId,
        orderDate,
        totalAmount
        )
    VALUES(
        @orderId,
	    @orderDate, 
	    @totalAmount
    )
END

