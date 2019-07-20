CREATE TABLE [dbo].[MembershipUser](
	[Id] [uniqueidentifier] NOT NULL,
	[Email] [nvarchar](200) NOT NULL,
	[Password] [nvarchar](200) NOT NULL,
	[RoleId] UNIQUEIDENTIFIER NOT NULL,
	[ClientId] UNIQUEIDENTIFIER NOT NULL, 
    CONSTRAINT [PK_MembershipUser] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	),
	CONSTRAINT [FK_MembershipUser_MembershipRole] FOREIGN KEY([RoleId])
		REFERENCES [dbo].[MembershipRole] ([Id]),

	CONSTRAINT [FK_MembershipUser_Client] FOREIGN KEY([ClientId])
		REFERENCES [dbo].[MembershipClient] ([Id])
)
GO

ALTER TABLE [dbo].[MembershipUser] ADD  CONSTRAINT [DF_MembershipUser]  DEFAULT (newid()) FOR [Id]
