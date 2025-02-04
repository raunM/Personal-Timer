﻿using System.ComponentModel.DataAnnotations;

namespace PersonalTimer.Models.Requests
{
    public class LoginModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
