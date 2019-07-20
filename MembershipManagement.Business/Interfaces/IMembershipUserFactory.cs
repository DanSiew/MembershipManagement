using MembershipManagement.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MembershipManagement.Business.Interfaces
{
    public interface IMembershipUserFactory
    {
        MembershipUser Create(Dtos.MembershipUser membershipUserDto, string hashPassword, Guid clientId, Guid roleId);
        Dtos.MembershipUser CreateDtoEntity(MembershipUser membershipUser);
    }
}
