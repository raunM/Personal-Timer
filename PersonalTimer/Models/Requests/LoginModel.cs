using System.ComponentModel.DataAnnotations;

namespace PersonalTimer.Models.Requests
{
    public class LoginModel
    {
        [EmailAddress]
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
