using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MembershipManagement.Web.Models
{
    public class ResponseData
    {
        public string Message { get; set; }
        public string Data { get; set; }
        public string SessionId { get; set; }
        public string UserId { get; set; }
    }
}
