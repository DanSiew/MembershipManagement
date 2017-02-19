using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MembershipManagement.Web.Models
{
  public class User
  {
    public string Id { get; set; }

    public string UserName { get; set; }

    public string Role { get; set; }

    public string LastName { get; set; }

    public string FirstName { get; set; }

    public string Email { get; set; }

    public bool isAuthenticated { get; set; }
  }

 
  
}
