CREATE PROCEDURE [dbo].[InstallRoles]
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
	    IF (OBJECT_ID(N'upgrade.MembershipRole', N'U') IS NOT NULL)
		    DROP TABLE upgrade.MembershipRole

		------------------------------------------
		-- Create empty "upgrade" table
		------------------------------------------
		CREATE TABLE [upgrade].[MembershipRole](
				[RoleName] [nvarchar](200) NOT NULL, 
				[RoleCode] INT NOT NULL, 
			)


	    BEGIN TRANSACTION
		    ------------------------------------------
			-- Load "upgrade" table
			------------------------------------------	
		    INSERT INTO [upgrade].[MembershipRole] ([RoleCode], [RoleName] )          
			VALUES
				(1,	N'Admin'),
				(2,	N'User')

                ------------------------------------------
                -- Update actual table
                ------------------------------------------
				MERGE INTO [dbo].[MembershipRole] AS tgt
				USING [upgrade].[MembershipRole] AS src
				ON tgt.[RoleCode] = src.[RoleCode]
				WHEN NOT MATCHED BY TARGET THEN
				-- Insert new values
				INSERT (
					[RoleCode],
					[RoleName] 
				)
				VALUES (
					[RoleCode],
					[RoleName] 
				)
				WHEN NOT MATCHED BY SOURCE THEN
					DELETE
				WHEN MATCHED THEN
					-- Overwrite with new values
					UPDATE
					SET 					
						tgt.RoleName = src.RoleName;

		COMMIT TRANSACTION
	END TRY
	BEGIN CATCH
	    IF (@@TRANCOUNT > 0)
		    ROLLBACK TRANSACTION;

		EXECUTE gen.ErrorHandler @pProcId = @@procid
	END CATCH

END;


