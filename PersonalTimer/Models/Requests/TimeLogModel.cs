using System.ComponentModel.DataAnnotations;

namespace PersonalTimer.Models.Requests
{
    public class TimeLogModel
    {
        [Required]
        public int Duration { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
