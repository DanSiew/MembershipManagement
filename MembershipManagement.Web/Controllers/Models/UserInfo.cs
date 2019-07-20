using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MembershipManagement.Web.Models
{
    public class UserInfo
    {
        
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ClientCode { get; set; }
        public string ClientSecret { get; set; }


        public static IList<UserInfo> GetAllUsers()
        {
            return new List<UserInfo>()
            {
                new UserInfo {  ClientCode="1001", ClientSecret="ClientSecret1", UserName="test@gmail.com",Password="Password10" },
                new UserInfo {  ClientCode="1002", ClientSecret="ClientSecret2", UserName="Order",Password="123" },
            };
        }

    }
}
