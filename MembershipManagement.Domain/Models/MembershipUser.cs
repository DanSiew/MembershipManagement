using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MembershipManagement.Domain.Models
{
    [Table("MembershipUser")]
    public class MembershipUser : EntityBase<Guid>
    {
        [Column("UserName")]
        public string UserName { get; set; }
        [Column("LastName")]
        public string LastName { get; set; }
        [Column("FirstName")]
        public string FirstName { get; set; }
        [Column("Password")]
        public string Password { get; set; }
        [Column("Email")]
        public string Email { get; set; }
        [Column("RoleId")]
        public int RoleId { get; set; }

        [ForeignKey("RoleId")]
        public MembershipRole MembershipRole  { get; set; }
    }
}
