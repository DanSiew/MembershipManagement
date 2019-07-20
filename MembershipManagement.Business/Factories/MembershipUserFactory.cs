using MembershipManagement.Business.Common;
using MembershipManagement.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;

namespace MembershipManagement.Business.Factories
{
    public class MembershipUserFactory : IMembershipUserFactory
    {
        private readonly IUrlHelper _urlHelper;

        public MembershipUserFactory(IUrlHelper urlHelper)
        {
            _urlHelper = urlHelper;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="membershipUserDto"></param>
        /// <param name="clientId"></param>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public Domain.Models.MembershipUser Create(Dtos.MembershipUser membershipUserDto, string hashPassword, Guid clientId, Guid roleId)
        {
            
            var membershipUser = new Domain.Models.MembershipUser
            {
                Email = membershipUserDto.Email,
                Password = hashPassword,
                ClientId = clientId,
                RoleId = roleId

            };

            return membershipUser;
        }

        public Dtos.MembershipUser CreateDtoEntity(Domain.Models.MembershipUser membershipUser)
        {
            var dtosMembershipUser = new Dtos.MembershipUser
            {
                Id = membershipUser.Id.ToString(),
                Email = membershipUser.Email,
                Href = _urlHelper.Link(Constants.GetMembershipUserById, new { id = membershipUser.Id.ToString() }),
                ClientCode = membershipUser.MembershipClient.ClientCode,
                RoleCode = membershipUser.MembershipRole.RoleCode

            };

            return dtosMembershipUser;
        }
    }
}
