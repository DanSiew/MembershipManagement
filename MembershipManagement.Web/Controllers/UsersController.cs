using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using MembershipManagement.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using MembershipManagement.Domain.Repositories;
using MembershipManagement.Domain.Models;

namespace MembershipManagement.Web.Controllers
{
  [Route("api/[controller]")]
  [Authorize]
  public class UsersController : Controller
  {
    
    
    public IActionResult Get()
    {
      // The JWT "sub" claim is automatically mapped to ClaimTypes.NameIdentifier
      // by the UseJwtBearerAuthentication middleware
      var username = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
      var email = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email);
      var id = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.SerialNumber);
      var firstName = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.GivenName);
      var lastName = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Surname);
      var role = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role);


      var user = new User
      {
        Id = id?.Value,
        FirstName = firstName?.Value,
        LastName = lastName?.Value,
        UserName = username,
        Email = email?.Value,
        Role = role?.Value,
        isAuthenticated = true

      };

      return Json(user);
    }
  }
}
