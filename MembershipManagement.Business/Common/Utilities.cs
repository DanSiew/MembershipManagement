using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace MembershipManagement.Business.Common
{
    public static class Utilities
    {
        public static ErrorResponse CreateErrorResponse(string status, string message)
        {
            return new ErrorResponse
            {
                Error = new ErrorResponseError
                {
                    Status = status,
                    Message = message
                }
            };
        }
    }
}
