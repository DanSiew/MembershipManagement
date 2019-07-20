CREATE PROCEDURE [gen].[ErrorHandler]
    @pProcId INT = NULL -- Calling stored procedure object id (for system error messages)
AS
BEGIN
    DECLARE @errMsg   nvarchar(2048),
            @severity tinyint,
            @state    tinyint,
            @errNo    int,
            @proc     sysname,
            @lineNo   int
           
    SELECT @errMsg = error_message()
          ,@severity = error_severity()
          ,@state  = error_state()
		  ,@errNo = error_number()
          ,@proc   = ISNULL(gen.ObjectName(@pProcId),error_procedure())
		  ,@lineNo = error_line()
       
    IF (@errMsg NOT LIKE N'Error:%')
    BEGIN
        SET @errMsg = gen.GetErrorMessageFormatted (@errMsg
                                                     ,@severity
                                                     ,@state
                                                     ,@errNo
                                                     ,@proc
                                                     ,@lineNo)
    END

    RAISERROR('%s', @severity, @state, @errMsg);
END
