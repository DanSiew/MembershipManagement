using MembershipManagement.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace MembershipManagement.Domain
{
    public class MembershipContext : DbContext
    {
        public MembershipContext(DbContextOptions<MembershipContext> options)
            : base(options)
        { }

        public DbSet<MembershipUser> MembershipUsers { get; set; }

        public DbSet<MembershipRole> MembershipRoles { get; set; }

        public DbSet<MembershipToken> MembershipTokens { get; set; }

        public DbSet<MembershipClient> MembershipClients { get; set; }

    }
}
