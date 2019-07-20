/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
--:setvar Upgrade "0"  -- CAUTION:  Avoid updating this line of code as it used by powershell to automatically update its value


DECLARE     
    @upgrading INT = 0;


IF (@upgrading = 0) -- New installation only
BEGIN
    -- Data load
    EXECUTE dbo.InstallClients
    EXECUTE dbo.InstallRoles

END