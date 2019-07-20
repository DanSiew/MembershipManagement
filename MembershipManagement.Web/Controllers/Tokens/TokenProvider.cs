using MembershipManagement.Business.Interfaces;
using MembershipManagement.Domain.Models;
using MembershipManagement.Domain.Queries;
using MembershipManagement.Domain.Repositories;
using MembershipManagement.Web.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace MembershipManagement.Api.Tokens
{
    public class TokenProvider : ITokenProvider
    {
        private IOptions<Audience> _settings;
        private IGenericRepository<MembershipToken> _membershipToken;
        private IGenericRepository<MembershipClient> _membershipClient;
        private IGenericRepository<MembershipUser> _membershipUserRepo;
        private ISecuredPasswordHasher _passwordHasher;

        public TokenProvider(IOptions<Audience> settings,
            IGenericRepository<MembershipToken> membershipToken,
            IGenericRepository<MembershipClient> membershipClient,
            IGenericRepository<MembershipUser> membershipUserRepo,
            ISecuredPasswordHasher passwordHasher)
        {
            _settings = settings;
            _membershipToken = membershipToken;
            _membershipClient = membershipClient;
            _membershipUserRepo = membershipUserRepo;
            _passwordHasher = passwordHasher;

        }
        //scenario 1 get the access-token by username and password  
        public ResponseData DoPassword(Parameters parameters)
        {
            var filterBy = new Filter<MembershipUser>(
                filter => (filter.Email == parameters.username));
            var user = _membershipUserRepo.Query(filterBy.Expression).FirstOrDefault();

            var filterClientBy = new Filter<MembershipClient>(filter => (filter.ClientCode == parameters.client_code));
            var client = _membershipClient.Query(filterClientBy.Expression).FirstOrDefault();

            var isValidated = false;
            if (client.ClientSecret == parameters.client_secret)
            {
                isValidated = _passwordHasher.VerifyHashedPassword(user.Password, parameters.password);
            }

            if (!isValidated)
            {
                return new ResponseData
                {
                    Message = "The username or password you have entered is incorrect. Please try again.",
                    Data = null
                };
            }

            var refresh_token = Guid.NewGuid().ToString().Replace("-", "");
            /*
            var rToken = new MembershipToken
            {
                UserId = client.Id,
                RefreshToken = refresh_token,
                IsStop = false
            };
            var id = _membershipToken.Add(rToken);
            */

            return new ResponseData
            {
                Message = "",
                Data = GetJwt(parameters.username, client.Id.ToString(), refresh_token),
                UserId = user.Id.ToString()
            };
        }



        //scenario 2 get the access_token by refresh_token  
        public ResponseData DoRefreshToken(Parameters parameters)
        {
            var filterBy = new Filter<MembershipUser>(
                filter => (filter.Email == parameters.username));
            var user = _membershipUserRepo.Query(filterBy.Expression).FirstOrDefault();

            var filterClientBy = new Filter<MembershipClient>(filter => (filter.ClientCode == parameters.client_code));
            var client = _membershipClient.Query(filterClientBy.Expression).FirstOrDefault();


            if (user == null || client == null)
            {
                return new ResponseData
                {
                    Message = "can not refresh token",
                    Data = null
                };
            }

            var filterTokenBy = new Filter<MembershipToken>(
                filter => (filter.RefreshToken == parameters.refresh_token.ToString() && filter.UserId == user.Id));
            var token = _membershipToken.Query(filterTokenBy.Expression).FirstOrDefault();

            if (token == null)
            {
                return new ResponseData
                {
                    Message = "can not refresh token",
                    Data = null
                };
            }

            if (token.IsStop)
            {
                return new ResponseData
                {
                    Message = "refresh token has expired",
                    Data = null
                };
            }

            var refresh_token = Guid.NewGuid().ToString().Replace("-", "");

            token.IsStop = true;

            //expire the old refresh_token and add a new refresh_token  
            var updateFlag = _membershipToken.Update(token);

            var newToken = new MembershipToken
            {
                UserId = user.Id,
                RefreshToken = refresh_token,
                IsStop = false
            };

            var addFlag = _membershipToken.Add(newToken);

            if (updateFlag == token && addFlag.ToString() == newToken.Id.ToString())
            {
                return new ResponseData
                {
                    Message = "OK",
                    Data = GetJwt(parameters.username, client.Id.ToString(), refresh_token)
                };
            }
            else
            {
                return new ResponseData
                {
                    Message = "can not expire token or a new token",
                    Data = null
                };
            }
        }
        
        //get the jwt token   
        public string GetJwt(string email, string client_code, string refresh_token)
        {
            var now = DateTime.UtcNow;

            var claims = new Claim[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, client_code),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, now.ToUniversalTime().ToString(), ClaimValueTypes.Integer64),
            new Claim(JwtRegisteredClaimNames.Email, email)

            };

            var symmetricKeyAsBase64 = _settings.Value.Secret;
            var keyByteArray = Encoding.ASCII.GetBytes(symmetricKeyAsBase64);
            var signingKey = new SymmetricSecurityKey(keyByteArray);

            var jwt = new JwtSecurityToken(
                issuer: _settings.Value.Iss,
                audience: _settings.Value.Aud,
                claims: claims,
                notBefore: now,
                expires: now.Add(TimeSpan.FromMinutes(2)),
                signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                expires_in = (int)TimeSpan.FromMinutes(2).TotalSeconds,
                refresh_token = refresh_token,
            };

            return JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented });
        }
    }
}
