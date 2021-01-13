using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PersonalTimer.Models;
using PersonalTimer.Models.Requests;
using System;
using System.Collections.Generic;
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
        public async Task<IEnumerable<TimeLog>> GetAllTimeLogs()
        {
            var identity = User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var claims = identity.Claims;
                var userId = claims.Where(p => p.Type == "id").FirstOrDefault()?.Value;
                var timeLogs = await _timeLogRepository.GetTimeLogs(userId);
                return timeLogs;
            }
            else
            {
                return new List<TimeLog>();
            }
        }

        [HttpPost]
        [Route("create")]
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

                return Ok();
            }
                
            return BadRequest();
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteTimeLogAsync(int id)
        {
            var identity = User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                await _timeLogRepository.DeleteTimeLog(id);

                return Ok();
            }

            return BadRequest();
        }
    }
}
