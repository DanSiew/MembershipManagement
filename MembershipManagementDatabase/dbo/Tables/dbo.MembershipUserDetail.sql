CREATE TABLE [dbo].[MembershipUserDetail]
(
	[Id] UNIQUEIDENTIFIER NOT NULL,
	[FirstName] [nvarchar](200) NOT NULL,
	[LastName] [nvarchar](200) NOT NULL,
	[AddressLine1] [nvarchar](500) NULL,
	[AddressLine2] [nvarchar](500) NULL,
	[Suburb] [nvarchar](500) NULL,
	[City] [nvarchar](500) NULL,
	[State] [nvarchar](100) NULL,
	[PostCode] [nvarchar](10) NULL,
	[UserId] UNIQUEIDENTIFIER NOT NULL, 

CONSTRAINT [PK_MembershipUserDetail] PRIMARY KEY CLUSTERED 
	(
		[Id] ASC
	),

CONSTRAINT [FK_MembershipUser_MembershipUserDetai] FOREIGN KEY([UserId])
	REFERENCES [dbo].[MembershipUser] ([Id])
	)
	Go

ALTER TABLE [dbo].[MembershipUserDetail] ADD  CONSTRAINT [DF_MembershipUserDetail]  DEFAULT (newid()) FOR [Id]
