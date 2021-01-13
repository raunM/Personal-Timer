using System.ComponentModel.DataAnnotations;

namespace PersonalTimer.Models
{
    public class TimeLog
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(450)]
        public string UserId { get; set; }

        [Required]
        public int Duration { get; set; }

        [Required]
        [MaxLength(50)]
        public string Category { get; set; }

        [Required]
        [MaxLength(200)]
        public string Description { get; set; }
    }
}
