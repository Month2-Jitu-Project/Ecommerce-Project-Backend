SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[AddOrUpdateCartItem]
(
    @cartid VARCHAR(100),
    @userid VARCHAR(100),
    @productid VARCHAR(100)
)
AS
BEGIN
    -- Check if the product is already in the cart
    DECLARE @cartItemQuantity INT;
    SELECT @cartItemQuantity = quantity
    FROM cart
    WHERE userid = @userid AND productid = @productid;

    IF @cartItemQuantity IS NOT NULL
    BEGIN
        -- If the product is already in the cart, increment the quantity
        UPDATE cart
        SET quantity = @cartItemQuantity + 1
        WHERE userid = @userid AND productid = @productid;
    END
    ELSE
    BEGIN
        -- If the product is not in the cart, add it with quantity 1 and price from the products table
        DECLARE @productPrice VARCHAR(100);
        SELECT @productPrice = price
        FROM products
        WHERE id = @productid;
        
        IF @productPrice IS NOT NULL
        BEGIN
            INSERT INTO cart (id, userid, productid, quantity, price)
            VALUES (@cartid, @userid, @productid, 1, @productPrice);
        END
        ELSE
        BEGIN
            RAISERROR('Product does not exist.', 16, 1);
        END
    END
END;
GO
