using MembershipManagement.Business.Common;
using MembershipManagement.Business.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace MembershipManagement.Business.Results
{
    public class MembershipUserResult
    {
        public MembershipUserResult()
        {
            ErrorResponse = new ErrorResponse();
        }
        public ErrorResponse ErrorResponse { get; set; }

        public bool Status { get; set; }

        public MembershipUser MembershipUserDtos { get; set; }

        public string Data { get; set; }
    }
}
