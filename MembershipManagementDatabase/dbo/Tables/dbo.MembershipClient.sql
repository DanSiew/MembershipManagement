CREATE TABLE [dbo].[MembershipClient](
	[Id] UNIQUEIDENTIFIER NOT NULL,
	[ClientCode] [nvarchar](100) NOT NULL, 
    [ClientSecret] NVARCHAR(200) NOT NULL, 
    CONSTRAINT [PK_MembershipClient] PRIMARY KEY ([Id])
	)
	Go

	ALTER TABLE [dbo].[MembershipClient] ADD  CONSTRAINT [DF_MembershipClient]  DEFAULT (newid()) FOR [Id]
