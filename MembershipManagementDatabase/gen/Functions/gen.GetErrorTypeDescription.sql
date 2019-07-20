CREATE FUNCTION [gen].[GetErrorTypeDescription]
(
	@pSeverity TINYINT
)
RETURNS NVARCHAR(20)
AS
BEGIN
	RETURN (CASE 
		        WHEN (@pSeverity BETWEEN 1 AND 9) THEN
				    N'Warning'
				WHEN (@pSeverity IN (0, 10)) THEN
				    N'Info'
				ELSE
				    N'Error'
			END)
END;
