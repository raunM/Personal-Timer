using Microsoft.EntityFrameworkCore;
using PersonalTimer.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PersonalTimer.Repository
{
    public class TimeLogRepository : ITimeLogRepository
    {
        private readonly AppDbContext _context;

        public TimeLogRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TimeLog>> GetTimeLogs(string userId)
        {
            return await _context.TimeLog.Where(tl => tl.UserId.Equals(userId)).ToListAsync();
        }

        public async Task<TimeLog> CreateTimeLog(TimeLog timeLog)
        {
            await _context.TimeLog.AddAsync(timeLog);
            await _context.SaveChangesAsync();
            return timeLog;
        }

        public async Task DeleteTimeLog(int id)
        {
            var timeLog = await _context.TimeLog.FindAsync(id);
            _context.TimeLog.Remove(timeLog);
            await _context.SaveChangesAsync();
        }
    }
}
