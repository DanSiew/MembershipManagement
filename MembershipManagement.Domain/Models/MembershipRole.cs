using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MembershipManagement.Domain.Models
{
    [Table("MembershipRole")]
    public class MembershipRole: EntityBase<int>
    {
        [Column("RoleName")]
        public string  RoleName { get; set; }
    }
}
