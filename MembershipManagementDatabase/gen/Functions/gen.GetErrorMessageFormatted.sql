CREATE FUNCTION [gen].[GetErrorMessageFormatted]
(
	 @pErrMsg   NVARCHAR(2048) 
    ,@pSeverity TINYINT 
    ,@pState    TINYINT
    ,@pErrNo    INT 
    ,@pProc     sysname  = NULL
    ,@pLineNo   INT = NULL
)
RETURNS NVARCHAR(MAX)
AS
BEGIN
    DECLARE 
	    @errMsgFormatted NVARCHAR(MAX)

	IF (@pErrNo < 50000) -- system DB errors
	    SET @errMsgFormatted = COALESCE(QUOTENAME(@pProc), '<dynamic SQL>') +  N', Line No: ' + LTRIM(STR(@pLineNo)) +    N'. Error No: ' +  LTRIM(STR(@pErrNo)) + ': ' + @pErrMsg + N'.'; 
	ELSE -- application errors
	    SET @errMsgFormatted = gen.GetErrorTypeDescription(@pSeverity) + N': ' + @pErrMsg + N' (Msg#: ' + LTRIM(STR(@pErrNo)) + N').'

	RETURN (@errMsgFormatted);
END

