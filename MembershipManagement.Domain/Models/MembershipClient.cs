using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MembershipManagement.Domain.Models
{
    [Table("MembershipClient")]
    public class MembershipClient : EntityBase<Guid>
    {
        [Column("ClientCode")]
        public string ClientCode { get; set; }

        [Column("ClientSecret")]
        public string ClientSecret { get; set; }

        public virtual ICollection<MembershipUser> MembershipUsers { get; set; }


    }
}
