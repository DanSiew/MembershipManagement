CREATE TABLE [dbo].[MembershipRole]
(
	[Id] UNIQUEIDENTIFIER NOT NULL,
	[RoleName] [nvarchar](200) NOT NULL, 
    [RoleCode] INT NOT NULL, 
    CONSTRAINT [PK_MembershipRole] PRIMARY KEY ([Id]),
)
GO

ALTER TABLE [dbo].[MembershipRole] ADD  CONSTRAINT [DF_MembershipRole]  DEFAULT (newid()) FOR [Id]
