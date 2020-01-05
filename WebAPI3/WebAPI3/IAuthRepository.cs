using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI3.Models;

namespace WebAPI3
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string email, string password);
        Task<bool> UserExists(string email);
    }
}
