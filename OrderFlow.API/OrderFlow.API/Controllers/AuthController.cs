using Microsoft.AspNetCore.Mvc;
using OrderFlow.API.Data;
using OrderFlow.API.Models;

namespace OrderFlow.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // REGISTER
        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(user);
        }

        // LOGIN
        [HttpPost("login")]
        public IActionResult Login(User loginData)
        {
            var user = _context.Users
                .FirstOrDefault(u =>
                    u.Email == loginData.Email &&
                    u.Password == loginData.Password);

            if (user == null)
                return Unauthorized("Invalid credentials");

            return Ok(user);
        }
    }
}