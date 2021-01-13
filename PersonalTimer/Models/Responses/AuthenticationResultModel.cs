using System.Collections.Generic;

namespace PersonalTimer.Models.Responses
{
    public class AuthenticationResultModel
    {
        public string Token { get; set; }

        public bool Success { get; set; }

        public IEnumerable<string> Errors { get; set; }
    }
}
