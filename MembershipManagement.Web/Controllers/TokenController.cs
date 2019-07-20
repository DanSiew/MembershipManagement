using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MembershipManagement.Web.Models;
using MembershipManagement.Domain.Repositories;
using MembershipManagement.Domain.Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using MembershipManagement.Domain.Queries;
using MembershipManagement.Api.Tokens;
using MembershipManagement.Business.Common;

namespace MembershipManagement.Web.Controllers
{
   // [Produces("application/json")]
    [Route("api/[controller]")]
    public class TokenController : Controller
    {
        private ITokenProvider _tokenProvider;

        public TokenController(ITokenProvider tokenProvider )
        {
            _tokenProvider = tokenProvider;
        }

        [HttpPost("auth")]
        public IActionResult Auth([FromForm]Parameters parameters)
        {
            if (parameters == null)
            {
                return BadRequest(new ResponseData
                {
                    Message = "null of parameters",
                    Data = null
                });
            }

            if (parameters.grant_type == "password")
            {
                //string SessionKeyName = "Session";
                var responseData = _tokenProvider.DoPassword(parameters);
                //HttpContext.Session.SetString(SessionKeyName, responseData.SessionId);
                if (!string.IsNullOrEmpty(responseData.Message))
                {
                    var errorResponse = Utilities.CreateErrorResponse(StatusCodes.Status400BadRequest.ToString(), responseData.Message);
                    return BadRequest(errorResponse);

                }
                return Ok(responseData);
            }
            else if (parameters.grant_type == "refresh_token")
            {
                return Ok(_tokenProvider.DoRefreshToken(parameters));
            }
            else
            {
                return BadRequest(new ResponseData
                {
                    Message = "bad request"
                });
            }
        }

        

        
    }

}