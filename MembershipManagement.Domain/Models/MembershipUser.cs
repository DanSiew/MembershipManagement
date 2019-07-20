using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MembershipManagement.Domain.Models
{
    [Table("MembershipUser")]
    public class MembershipUser : EntityBase<Guid>
    {

        [Column("Password")]
        public string Password { get; set; }

        [Column("Email")]
        public string Email { get; set; }

        [Column("RoleId")]
        public Guid RoleId { get; set; }

        [Column("ClientId")]
        public Guid ClientId { get; set; }

        [ForeignKey("RoleId")]
        public MembershipRole MembershipRole  { get; set; }

        [ForeignKey("ClientId")]
        public MembershipClient MembershipClient { get; set; }

    }
}
