USE MU_DB; -- Make sure this is the correct database.
GO

--obtenemos los telefonos de un cliente especifico 
CREATE FUNCTION GetTelefonosCliente(
    @cedula VARCHAR(100) -- Good, you've added the length!
)
RETURNS TABLE
AS
RETURN
(
    -- Corrected column name here
    SELECT numero
    FROM telefonosCliente
    WHERE CI_cliente = @cedula
);
GO

--select * from GetTelefonosCliente('cedula'); 