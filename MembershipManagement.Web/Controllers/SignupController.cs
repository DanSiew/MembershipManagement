using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MembershipManagement.Web.Models;
using MembershipManagement.Business.Interfaces;
using MembershipManagement.Business.Common;
using Microsoft.Extensions.Logging;
using MembershipManagement.Api.Tokens;

namespace MembershipManagement.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class SignupController : Controller
    {
        private readonly IMembershipUserObject _membershipUserObject;
        private ITokenProvider _tokenProvider;
        private readonly ILogger<SignupController> _log;

        public SignupController(IMembershipUserObject membershipUserObject, ITokenProvider tokenProvider, ILogger<SignupController> log)
        {
            _membershipUserObject = membershipUserObject;
            _tokenProvider = tokenProvider;
            _log = log;
        }

        // POST api/Signup
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Business.Dtos.MembershipUser memberShipUser)
        {
            var logObject = $"Sign-up Create - {memberShipUser.Email}";
            try
            {
                var result = await _membershipUserObject.AddAsync(memberShipUser);
                if (!result.Status)
                {
                    return BadRequest(result.ErrorResponse);
                }
                var parameters = new Parameters
                {
                    client_code = memberShipUser.ClientCode,
                    client_secret = memberShipUser.ClientSecret,
                    grant_type = "password",
                    username = memberShipUser.Email,
                    password = memberShipUser.Password
                };

                var responseData = _tokenProvider.DoPassword(parameters);

                return Ok(responseData); 

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