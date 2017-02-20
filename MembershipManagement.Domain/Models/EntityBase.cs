using System;
using System.Collections.Generic;
using System.Text;

namespace MembershipManagement.Domain.Models
{
    public class EntityBase<key>
    {
        public key Id { get; set; }
    }
}
