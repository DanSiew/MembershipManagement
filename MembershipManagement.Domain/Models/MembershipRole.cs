using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MembershipManagement.Domain.Models
{
 
    [Table("MembershipRole")]
    public class MembershipRole: EntityBase<Guid>
    {
        public MembershipRole()
        {
            MembershipUsers = new HashSet<MembershipUser>();
        }

        [Column("RoleCode")]
        public int RoleCode { get; set; }

        [Column("RoleName")]
        public string  RoleName { get; set; }

        public virtual ICollection<MembershipUser> MembershipUsers { get; set; }
    }
}
