using MembershipManagement.Business.Common;

namespace MembershipManagement.Business.Interfaces
{
    public interface ISecuredPasswordHasher
    {

        string HashPassword(string password);
        bool VerifyHashedPassword(string hashedPassword, string providedPassword);
    }
}
