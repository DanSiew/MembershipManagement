using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Dtos = MembershipManagement.Web.Models.Dtos;
using Microsoft.AspNetCore.Authorization;
using MembershipManagement.Business.Common;
using MembershipManagement.Business.Interfaces;
using Microsoft.Extensions.Logging;

namespace MembershipManagement.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize]
    public class UsersController : Controller
    {
        private IMembershipUserObject _membershipUserObject;
        private readonly ILogger<UsersController> _log;

        public UsersController(IMembershipUserObject membershipUserObject, ILogger<UsersController> log)
        {
            _membershipUserObject = membershipUserObject;
            _log = log;
        }

        public IActionResult Get()
        {
            // The JWT "sub" claim is automatically mapped to ClaimTypes.NameIdentifier
            // by the UseJwtBearerAuthentication middleware
            var id = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier);
            var email = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Email);
            //var id = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.SerialNumber);
            //var firstName = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.GivenName);
            //var lastName = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Surname);
            //var role = HttpContext.User.Claims.First(c => c.Type == ClaimTypes.Role);


            var user = new Dtos.User
            {
                Id = id?.Value,
                Email = email?.Value,
                //Role = role?.Value,
                IsAuthenticated = true

            };

            return Json(user);
        }

        [HttpGet("{id}", Name = Constants.GetMembershipUserById)]
        public async Task<IActionResult> GetMembershipUserById(string id)
        {
            var logObject = $"{Constants.GetMembershipUserById} - {id}";
            try
            {
                var result = await _membershipUserObject.GetAsync(id);
                if (!result.Status)
                {
                    return BadRequest(result.ErrorResponse);
                }
                return Ok(result.MembershipUserDtos);
            }
            catch (Exception ex)
            {
                _log.LogError(LoggingEvents.GET_ITEM, ex, logObject, null);
                var errorResponse = Utilities.CreateErrorResponse(StatusCodes.Status500InternalServerError.ToString(), Messages.InternalError);
                return StatusCode(StatusCodes.Status500InternalServerError, errorResponse);
            }
        }

    }
}