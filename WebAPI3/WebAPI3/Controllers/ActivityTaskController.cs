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
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityTaskController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ActivityTaskController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ActivityTask -> RADI
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivityTask>>> GetActivityTask()
        {
           return await _context.ActivityTask.Include(p=>p.Schedule)
                .Include(i=>i.Activity).ThenInclude(a=>a.ActivityColor)
                .Include(i => i.Activity).ThenInclude(a => a.ActivityStatus)
                .Include(i => i.Activity).ThenInclude(a => a.User)
                .Include(i => i.Activity).ThenInclude(a => a.ActivityType).ToListAsync();
        }

        //RADI
        [HttpGet("user/{userId}/date/{date}", Name = "GetTasksByDate")]
         public async Task<ActionResult<IEnumerable<ActivityTask>>> GetTasksByDate(int userId, string date)
         {
           
             var parsedDate = DateTime.Parse(date);

            var z = _context.ActivityTask
                .Include(t => t.Schedule)
                .Where(p => p.Schedule.Any(a => a.Date.Month == parsedDate.Month && a.Date.Day == parsedDate.Day && a.Date.Year == parsedDate.Year))
                .ToList();

             return z;
     }




        // GET: api/ActivityTask/5  -> RADI
        [HttpGet("id/{id}")]
        public async Task<ActionResult<ActivityTask>> GetActivityTask(int id)
        {
            var activityTask = await _context.ActivityTask.Include(p => p.Schedule).Include(i => i.Activity).Where(p=>p.ActivityTaskId==id).FirstOrDefaultAsync();

            if (activityTask == null)
            {
                return NotFound();
            }

            return activityTask;
        }

        // PUT: api/ActivityTask/5 -> RADI
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]

        public async Task<IActionResult> PutActivityTask(int id, ActivityTask activityTask)
        {
            if (id != activityTask.ActivityTaskId)
            {
                return BadRequest();
            }

            _context.Entry(activityTask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityTaskExists(id))
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

        // POST: api/ActivityTask -> RADI
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ActivityTask>> PostActivityTask(ActivityTask activityTask,[FromRoute] string userId)
        {
            _context.ActivityTask.Add(activityTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivityTask", new {userId=userId, id = activityTask.ActivityTaskId }, activityTask);
        }

        // DELETE: api/ActivityTask/5  -> RADI
        [HttpDelete("{id}")]
        public async Task<ActionResult<ActivityTask>> DeleteActivityTask(int id)
        {
            var activityTask = _context.ActivityTask.Include(p=>p.Schedule).Where(i=>i.ActivityTaskId==id).FirstOrDefault();
            if (activityTask == null)
            {
                return NotFound();
            }

            var z = _context.Schedule.Where(p => p.ActivityTaskId == id).ToList();
            foreach (var t in z)
            {
                _context.Schedule.Remove(t);
            }
            _context.SaveChanges();

            _context.ActivityTask.Remove(activityTask);
            await _context.SaveChangesAsync();

            return activityTask;
        }

        private bool ActivityTaskExists(int id)
        {
            return _context.ActivityTask.Any(e => e.ActivityTaskId == id);
        }
    }
}
