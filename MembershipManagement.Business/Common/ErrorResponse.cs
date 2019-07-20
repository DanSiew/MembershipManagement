using System;
using System.Collections.Generic;
using System.Text;

namespace MembershipManagement.Business.Common
{
    /// <summary>
    /// Error response object
    /// </summary>
    public class ErrorResponse
    {
        /// <summary>
        /// 
        /// </summary>
        public ErrorResponseError Error { get; set; }
    }

    /// <summary>
    /// Error object
    /// </summary>
    public class ErrorResponseError
    {
        /// <summary>
        /// HTTP status code
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// Message of the error
        /// </summary>
        public string Message { get; set; }


    }



}
