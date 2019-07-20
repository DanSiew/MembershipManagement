using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations.Schema;


namespace MembershipManagement.Domain.Models
{
    [Table("MembershipUserDetail")]
    public class MembershipUserDetail : EntityBase<Guid>
    {

        [Column("FirstName")]
        public string FirstName { get; set; }

        [Column("LastName")]
        public string LastName { get; set; }

        [Column("AddressLine1")]
        public string AddressLine1 { get; set; }

        [Column("AddressLine2")]
        public string AddressLine2 { get; set; }

        [Column("Suburb")]
        public string Suburb { get; set; }

        [Column("City")]
        public string City { get; set; }

        [Column("State")]
        public string State { get; set; }

        [Column("PostCode")]
        public string PostCode { get; set; }

        [Column("UserId")]
        public Guid UserId { get; set; }

        [ForeignKey("UserId")]
        public MembershipClient MembershipUser { get; set; }


    }
}
