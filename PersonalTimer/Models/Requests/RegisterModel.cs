using System.ComponentModel.DataAnnotations;

namespace PersonalTimer.Models.Requests
{
    public class RegisterModel
    {
        [EmailAddress]
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
