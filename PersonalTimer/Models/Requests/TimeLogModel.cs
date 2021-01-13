using System.ComponentModel.DataAnnotations;

namespace PersonalTimer.Models.Requests
{
    public class TimeLogModel
    {
        public int Duration { get; set; }

        public string Category { get; set; }

        public string Description { get; set; }
    }
}
