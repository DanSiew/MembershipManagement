CREATE PROCEDURE [gen].[GetMessage]
	@pMessageId INT
   ,@pVar1    SQL_VARIANT = NULL -- Parameter values to pass to the error message (via call to function FORMATMESSAGE())
   ,@pVar2    SQL_VARIANT = NULL -- If more than 3 parameters are required, then this stored procedure and gen.FormatMessage will need to be modified
   ,@pVar3    SQL_VARIANT = NULL
   --
   ,@pMessageOut NVARCHAR(MAX) NULL OUTPUT	
AS
BEGIN
    BEGIN TRY
        DECLARE
	        @message NVARCHAR(500) = NULL;


		-- Get the message XML from DB
        SELECT @message = m.[Message]
	    FROM gen.[Messages] m
		WHERE m.MessageId = @pMessageId

		IF (@pVar1 IS NOT NULL)
		    EXECUTE gen.[FormatMessage] @pMessage = @message
		                                 ,@pVar1 = @pVar1
										 ,@pVar2 = @pVar2
										 ,@pVar3 = @pVar3										 
	                                     ,@pMessageOut = @pMessageOut OUTPUT
		ELSE
		    SET @pMessageOut = @message
    END TRY
	BEGIN CATCH
	    IF (@@trancount > 0)
		    ROLLBACK;

		;THROW;
	END	CATCH
END
