using PersonalTimer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PersonalTimer.Repository
{
    public interface ITimeLogRepository
    {
        Task<IEnumerable<TimeLog>> GetTimeLogs(string userId);

        Task<TimeLog> CreateTimeLog(TimeLog timeLog);

        Task DeleteTimeLog(int id);
    }
}
