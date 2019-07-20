using MembershipManagement.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MembershipManagement.Api.Tokens
{
    public interface ITokenProvider
    {
        ResponseData DoPassword(Parameters parameters);
        ResponseData DoRefreshToken(Parameters parameters);
        string GetJwt(string email, string client_code, string refresh_token);
    }
}
