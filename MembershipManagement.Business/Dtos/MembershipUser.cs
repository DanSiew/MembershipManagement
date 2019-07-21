using System;
using System.Collections.Generic;
using System.Text;

namespace MembershipManagement.Business.Dtos
{
    public class MembershipUser
    {
        public string Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public int RoleCode { get; set; }

        public string ClientCode { get; set; }

        public string ClientSecret { get; set; }

        public string Href { get; set; }

        public bool IsAuthenticated { get; set;}

    }
}
