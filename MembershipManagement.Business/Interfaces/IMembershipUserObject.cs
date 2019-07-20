using MembershipManagement.Business.Results;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MembershipManagement.Business.Interfaces
{
    public interface IMembershipUserObject
    {
        Task<MembershipUserResult> AddAsync(Dtos.MembershipUser membershipUserDto);

        Task<MembershipUserResult> GetAsync(string membershipUserId);
    }
}
