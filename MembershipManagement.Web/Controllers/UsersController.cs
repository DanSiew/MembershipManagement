using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MembershipManagement.Web.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class UsersController : Controller
    {
        public string Get()
        {
            // The JWT "sub" claim is automatically mapped to ClaimTypes.NameIdentifier
            // by the UseJwtBearerAuthentication middleware
            var username = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;

            return $"Hello {username}!";
        }
    }
}
