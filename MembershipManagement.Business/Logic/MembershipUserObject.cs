using MembershipManagement.Business.Common;
using MembershipManagement.Business.Interfaces;
using MembershipManagement.Business.Results;
using MembershipManagement.Domain.Models;
using MembershipManagement.Domain.Queries;
using MembershipManagement.Domain.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MembershipManagement.Business.Logic
{
    public class MembershipUserObject : IMembershipUserObject
    {
        private IGenericRepository<MembershipClient> _membershipClientRepo;
        private IGenericRepository<MembershipRole> _membershipRoleRepo;
        private IGenericRepository<MembershipUser> _membershipUserRepo;
        public IMembershipUserFactory _membershipUserFactory;
        private readonly IUrlHelper _urlHelper;
        private readonly ILogger<MembershipUserObject> _log;
        private ISecuredPasswordHasher _passwordHasher;


        public MembershipUserObject(
            IGenericRepository<MembershipClient> membershipClientRepo,
            IGenericRepository<MembershipRole> membershipRoleRepo,
            IGenericRepository<MembershipUser> membershipUserRepo,
             IMembershipUserFactory membershipUserFactory,
             IUrlHelper urlHelper,
             ILogger<MembershipUserObject> log,
             ISecuredPasswordHasher passwordHasher)
        {
            _membershipClientRepo = membershipClientRepo;
            _membershipRoleRepo = membershipRoleRepo;
            _membershipUserRepo = membershipUserRepo;
            _membershipUserFactory = membershipUserFactory;
            _urlHelper = urlHelper;
            _log = log;
            _passwordHasher = passwordHasher;
        }


        public async Task<MembershipUserResult> AddAsync(Dtos.MembershipUser membershipUserDto)
        {
            var result = new MembershipUserResult();
            var retValue = false;
            var userNameFilter = new Filter<MembershipUser>(filter => (filter.Email == membershipUserDto.Email));
            var logObject = "MembershipUserObject";
            var message = string.Empty;
            if (_membershipUserRepo.Get(userNameFilter.Expression) != null)
            {
                message = Messages.InputExists;
                _log.LogInformation($"{logObject} : {message}");
                result.ErrorResponse = Utilities.CreateErrorResponse(StatusCodes.Status400BadRequest.ToString(), message);
                result.Status = retValue;
                return result;
            }
            message = PasswordAdvisor.CheckPassword(membershipUserDto.Password);
            if (message != string.Empty)
            {
                _log.LogInformation($"{logObject} : {message}");
                result.ErrorResponse = Utilities.CreateErrorResponse(StatusCodes.Status400BadRequest.ToString(), message);
                result.Status = retValue;
                return result;
            }

            var filterClientBy = new Filter<MembershipClient>(filter => (filter.ClientCode == membershipUserDto.ClientCode));
            var client = _membershipClientRepo.Query(filterClientBy.Expression).FirstOrDefault();
            if (client == null)
            {
                message = string.Format(Messages.IncorrectInput, "Client", "Id");
                _log.LogInformation($"{logObject} : {message}");

                result.ErrorResponse = Utilities.CreateErrorResponse(StatusCodes.Status400BadRequest.ToString(), message);
                result.Status = retValue;
                return result;
            }

            var filterRoleBy = new Filter<MembershipRole>(filter => (filter.RoleCode == membershipUserDto.RoleCode));
            var role = _membershipRoleRepo.Query(filterRoleBy.Expression).FirstOrDefault();
            if (role == null)
            {
                message = string.Format(Messages.IncorrectInput, "Role", "Id");
                _log.LogInformation($"{logObject} : {message}");

                result.ErrorResponse = Utilities.CreateErrorResponse(StatusCodes.Status400BadRequest.ToString(), message);
                result.Status = retValue;
                return result;
            }
            var hashPassword = _passwordHasher.HashPassword(membershipUserDto.Password);
            var membershipUser = _membershipUserFactory.Create(membershipUserDto, hashPassword, client.Id, role.Id);
            var membershipUserId = Guid.Parse(_membershipUserRepo.Add(membershipUser).ToString());
            var idFilter = new Filter<MembershipUser>(filter => (filter.Id == membershipUserId));
            var includes = GetIncludes();

            membershipUser = await _membershipUserRepo.GetAsync(idFilter.Expression, includes.Expression);
            result.MembershipUserDtos = _membershipUserFactory.CreateDtoEntity(membershipUser);
            result.Status = true;

            return result;
        }


        public async Task<MembershipUserResult> GetAsync(string membershipUserId)
        {
            var result = new MembershipUserResult();
            Guid identifier;
            if (!Guid.TryParse(membershipUserId, out identifier))
            {
                result.ErrorResponse = Utilities.CreateErrorResponse(StatusCodes.Status400BadRequest.ToString(), Messages.NotCorrectFormat);
                result.Status = false;
            }
            else
            {
                var includes = GetIncludes();
                var idFilter = new Filter<MembershipUser>(filter => (filter.Id == identifier));
                var membershipUser = await _membershipUserRepo.GetAsync(idFilter.Expression, includes.Expression);
                result.MembershipUserDtos = _membershipUserFactory.CreateDtoEntity(membershipUser);
                result.Status = true;
            }

            return result;

        }

        private Includes<MembershipUser> GetIncludes()
        {
            return new Includes<MembershipUser>(query =>
            {
                return query
                    .Include(t => t.MembershipRole)
                    .Include(c => c.MembershipClient);
            });
        }
    }
}
