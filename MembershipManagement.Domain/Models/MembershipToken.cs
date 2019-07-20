using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;

namespace MembershipManagement.Domain.Models
{
    [Table("MembershipToken")]
    public class MembershipToken : EntityBase<Guid>
    {
        [Column("UserId")]
        public Guid UserId { get; set; }

        [Column("RefreshToken")]
        public string RefreshToken { get; set; }

        [Column("IsStop")]
        public bool IsStop { get; set; }

        [ForeignKey("UserId")]
        public MembershipClient MembershipUser { get; set; }


    }
}
