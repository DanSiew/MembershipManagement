CREATE TABLE [dbo].[MembershipToken](
	[Id] [uniqueidentifier] NOT NULL,
	[UserId] UNIQUEIDENTIFIER NOT NULL,
	[RefreshToken] [nvarchar](max) NOT NULL,
	[IsStop] [bit] NOT NULL,
 CONSTRAINT [PK_MembershipToken] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	), 
CONSTRAINT [FK_MembershipToken_MembershipUser] FOREIGN KEY ([UserId]) REFERENCES [dbo].[MembershipUser] ([Id])

)