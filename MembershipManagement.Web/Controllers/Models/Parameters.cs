using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MembershipManagement.Web.Models
{
    public class Parameters
    {
        public string grant_type { get; set; }
        public string refresh_token { get; set; }
        public string client_code { get; set; }
        public string client_secret { get; set; }
        public string username { get; set; }
        public string password { get; set; }
    }
}
