using System.Collections.Generic;
using System.Threading.Tasks;

namespace PersonalTimer.Models
{
    public interface ITimeLogRepository
    {
        Task<IEnumerable<TimeLog>> GetTimeLogs(string userId);

        Task<TimeLog> CreateTimeLog(TimeLog timeLog);

        Task DeleteTimeLog(int id);
    }
}
