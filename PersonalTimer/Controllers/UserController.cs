using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PersonalTimer.Models.Requests;
using PersonalTimer.Models.Responses;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PersonalTimer.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;

        public UserController(UserManager<IdentityUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("register")]
        public async Task<dynamic> RegisterAsync([FromBody] RegisterModel registerModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = await _userManager.FindByEmailAsync(registerModel.Email);

            if (existingUser != null)
            {
                return Conflict(new AuthenticationResultModel 
                { 
                    Success = false, 
                    Errors = new List<string>() { "This email address is taken." } 
                });
            }

            var newUser = new IdentityUser
            {
                Email = registerModel.Email,
                UserName = registerModel.Email
            };

            var newUserResult = await _userManager.CreateAsync(newUser, registerModel.Password);

            if (newUserResult.Succeeded)
            {
                return Ok(GenerateAuthenticationResult(newUser));
            }
            else
            {
                return BadRequest(new AuthenticationResultModel
                {
                    Success = false,
                    Errors = newUserResult.Errors.Select(error => error.Description)
                });
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginModel loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new AuthenticationResultModel
                {
                    Success = false,
                    Errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage))
                });
            }

            var user = await _userManager.FindByEmailAsync(loginModel.Email);

            if (user == null)
            {
                return Conflict(new AuthenticationResultModel
                {
                    Success = false,
                    Errors = new List<string>() { "Incorrect email and/or password." }
                });
            }

            var validPassword = await _userManager.CheckPasswordAsync(user, loginModel.Password);

            if (!validPassword)
            {
                return Unauthorized(new AuthenticationResultModel
                {
                    Success = false,
                    Errors = new List<string>() { "Incorrect email and/or password." }
                });
            }

            return Ok(GenerateAuthenticationResult(user));
        }

        public AuthenticationResultModel GenerateAuthenticationResult(IdentityUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["ApplicationSettings:JWTSecret"].ToString());
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim("id", user.Id)
                }),
                Expires = DateTime.UtcNow.AddHours(11),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new AuthenticationResultModel
            {
                Success = true,
                Token = tokenHandler.WriteToken(token)
            };
        }
    }
}
