using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI3;
using WebAPI3.Models;

namespace WebAPI3.Controllers
{
    [Route("api/user/{userId}/schedule")]
    [ApiController] //RADI SVE
    public class ScheduleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ScheduleController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Schedule ->RADI
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Schedule>>> GetSchedule([FromRoute] string userId)
        {
            return await _context.Schedule.Include(a => a.ActivityTask).ThenInclude(i => i.Activity)
                .Where(i => i.ActivityTask.Activity.UserId == Int32.Parse(userId)).ToListAsync();
        }

        // GET: api/Schedule/5 ->RADI
        [HttpGet("{id}")]
        public async Task<ActionResult<Schedule>> GetSchedule([FromRoute] string userId,int id)
        {
            var schedule = await _context.Schedule.Include(a => a.ActivityTask).ThenInclude(i => i.Activity)
                .Where(i => i.ActivityTask.Activity.UserId == Int32.Parse(userId)).Where(o=>o.ScheduleId==id).FirstOrDefaultAsync();

            if (schedule == null)
            {
                return NotFound();
            }

            return schedule;
        }

        // PUT: api/Schedule/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSchedule([FromRoute] string userId,int id, Schedule schedule)
        {
            if (id != schedule.ScheduleId)
            {
                return BadRequest();
            }      

            _context.Entry(schedule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScheduleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Schedule
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Schedule>> PostSchedule(Schedule schedule, [FromRoute] string userId)
        {
            List<Schedule> schedules = _context.Schedule.Include(a => a.ActivityTask).ThenInclude(i => i.Activity).AsEnumerable()
                .Where(i => i.ActivityTask.Activity.UserId == Int32.Parse(userId))
                .Where(o=>o.Date.ToShortDateString()==schedule.Date.ToShortDateString()).ToList();

            if (schedules.Any())
            {
                foreach (Schedule s in schedules)
                {
                    if (uTerminu(s.TimeFrom, s.TimeTo, schedule.TimeFrom, schedule.TimeTo))
                    {
                        throw new System.ArgumentException("Vec postoji zadatak u tom terminu");
                    }
                }
            }

            _context.Schedule.Add(schedule);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSchedule", new { userId = userId,id = schedule.ScheduleId }, schedule);
        }

        // DELETE: api/Schedule/5  ->RADI
        [HttpDelete("{id}")]
        public async Task<ActionResult<Schedule>> DeleteSchedule(int id)
        {
            var schedule = await _context.Schedule.FindAsync(id);
            if (schedule == null)
            {
                return NotFound();
            }

            _context.Schedule.Remove(schedule);
            await _context.SaveChangesAsync();

            return schedule;
        }

        private bool ScheduleExists(int id)
        {
            return _context.Schedule.Any(e => e.ScheduleId == id);
        }
        
        private bool uTerminu(int f1,int t1,int f2,int t2) //prvi je fiksni
        {
            if (t2>t1 && t2 < f1)
            {
                return false;
            }
            else
            {
                if (f2>t1 && f2 < f1)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }
    }
}
