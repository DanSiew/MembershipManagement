using System;
using System.Collections.Generic;
using System.Text;

namespace MembershipManagement.Business.Common
{
    public static class Messages
    {
        public const string InputExists = "User already registered. Please login used the current email.";
        public const string IncorrectInput = "{0} does not exist. Please provide the correct {1}";
        public const string NotCorrectFormat = "Requested Id is not correct format.";
        public const string InternalError = "An internal error occurred when processing the request";

    }
}
