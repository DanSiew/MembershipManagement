CREATE PROCEDURE [gen].[FormatMessage]
	@pMessage NVARCHAR(2048) NULL
   ,@pVar1    SQL_VARIANT = NULL -- Parameter values to pass to the error message (via call to function FORMATMESSAGE())
   ,@pVar2    SQL_VARIANT = NULL -- If more than 3 parameters are required, then this stored procedure and gen.FormatMessage will need to be modified
   ,@pVar3    SQL_VARIANT = NULL
   ,@pMessageOut NVARCHAR(2048) NULL OUTPUT
AS
BEGIN
    BEGIN TRY
	    DECLARE @ParameterTmp TABLE (
		    Id INT NOT NULL,
			Parameter NVARCHAR(2048) NOT NULL,
			UNIQUE(Id)
		)

        DECLARE 	   	   	      
	        @sql NVARCHAR(MAX)
		   ,@sqlParmDefinition NVARCHAR(MAX)
		   ,@parameterList NVARCHAR(MAX) = N''
		   ,@maxId INT
	     
        IF (@pVar1 IS NULL) -- no substitution required.  Set output variable to input and do nothing else
	    BEGIN
	       SET @pMessageOut = @pMessage
	    END
	    ELSE -- @pVar1 IS NOT NULL
	    BEGIN
		    -- Load parameters into Parameter temp. table
	       ;WITH NonNullSourceCte 
	        AS (
		        SELECT 1 AS Id
			          ,@pVar1 AS Parameter
			    UNION ALL
			    SELECT 2 AS Id
			          ,@pVar2 AS Parameter
			    UNION ALL
			    SELECT 3 AS Id 
			          ,@pVar3 AS Parameter
				-- Add more parameters (if needed) here
		    )
		    INSERT INTO @ParameterTmp (
                Id
		       ,Parameter
		    )
		    SELECT src.Id
                  ,QUOTENAME(CAST(src.Parameter AS NVARCHAR(2048)),N'''') AS Parameter
		    FROM NonNullSourceCte src
		    WHERE src.Parameter IS NOT NULL;
		
		    -- Build the FORMATMESSAGE parameter list
		    SELECT @parameterList += N', ' + t.Parameter 
		    FROM @ParameterTmp t
		    ORDER BY t.Id
        
		    -- Build the dynamic FORMATMESSAGE sql string
		    SET @sql = CONCAT(N'SELECT @ppMessageOut = FORMATMESSAGE(@ppMessage', @parameterList, N')')

    	    SET @sqlParmDefinition = N'@ppMessage NVARCHAR(2048),@ppMessageOut NVARCHAR(2048) OUTPUT'

	        EXECUTE [sp_executesql] @sql
	                             ,@sqlParmDefinition
		 	                     ,@ppMessage = @pMessage
				    		     ,@ppMessageOut = @pMessageOut OUTPUT
	    END -- ELSE 
	END TRY
	BEGIN CATCH
	    IF (@@trancount > 0)
		    ROLLBACK;

		;THROW
	END CATCH
END