using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PersonalTimer.Models;
using PersonalTimer.Models.Requests;
using PersonalTimer.Repository;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PersonalTimer.Controllers
{
    [ApiController]
    [Authorize]
    [Route("time-log")]
    public class TimeLogController : ControllerBase
    {
        private readonly ITimeLogRepository _timeLogRepository;

        public TimeLogController(ITimeLogRepository timeLogRepository)
        {
            _timeLogRepository = timeLogRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetTimeLogsAsync()
        {
            var identity = User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var claims = identity.Claims;
                var userId = claims.Where(p => p.Type == "id").FirstOrDefault()?.Value;
                var timeLogs = await _timeLogRepository.GetTimeLogs(userId);
                return Ok(timeLogs);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateTimeLogAsync([FromBody] TimeLogModel timeLogModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var identity = User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var claims = identity.Claims;
                var userId = claims.Where(p => p.Type == "id").FirstOrDefault()?.Value;

                var timeLog = new TimeLog
                {
                    UserId = userId,
                    Duration = timeLogModel.Duration,
                    Category = timeLogModel.Category,
                    Description = timeLogModel.Description
                };

                await _timeLogRepository.CreateTimeLog(timeLog);

                // respond with new time log in case want to use later
                return Ok(timeLog);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimeLogAsync(int id)
        {
            var identity = User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                await _timeLogRepository.DeleteTimeLog(id);

                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
