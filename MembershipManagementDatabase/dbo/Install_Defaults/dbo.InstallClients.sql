CREATE PROCEDURE [dbo].[InstallClients]
(
    @pUpgrade BIT = 0
)
AS
BEGIN
    SET NOCOUNT ON
	SET XACT_ABORT ON


    BEGIN TRY
	    -----------------------------------
	    -- Drop upgrade table if it exists
		-----------------------------------
	    IF (OBJECT_ID(N'upgrade.MembershipClient', N'U') IS NOT NULL)
		    DROP TABLE upgrade.MembershipClient

		------------------------------------------
		-- Create empty "upgrade" table
		------------------------------------------
		CREATE TABLE [upgrade].[MembershipClient](
			[ClientCode] [nvarchar](100) NOT NULL, 
			[ClientSecret] [nvarchar](200) NOT NULL
			)


	    BEGIN TRANSACTION
		    ------------------------------------------
			-- Load "upgrade" table
			------------------------------------------	
		    INSERT INTO [upgrade].[MembershipClient] (ClientCode, ClientSecret)          
			VALUES
				(N'1001',	N'ClientSecret1'),
				(N'1002',	N'ClientSecret2')

                ------------------------------------------
                -- Update actual table
                ------------------------------------------
				MERGE INTO [dbo].[MembershipClient] AS tgt
				USING [upgrade].[MembershipClient] AS src
				ON tgt.[ClientCode] = src.[ClientCode]
				WHEN NOT MATCHED BY TARGET THEN
				-- Insert new values
				INSERT (
					[ClientCode],
					[ClientSecret] 
				)
				VALUES (
					[ClientCode],
					[ClientSecret] 
				)
				WHEN NOT MATCHED BY SOURCE THEN
					DELETE
				WHEN MATCHED THEN
					-- Overwrite with new values
					UPDATE
					SET 					
						tgt.ClientSecret = src.ClientSecret;

		COMMIT TRANSACTION
	END TRY
	BEGIN CATCH
	    IF (@@TRANCOUNT > 0)
		    ROLLBACK TRANSACTION;

		EXECUTE gen.ErrorHandler @pProcId = @@procid
	END CATCH

END;



