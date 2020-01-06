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
    [Route("api/user/{userId}/task")]
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
           return await _context.ActivityTask.Include(p=>p.Schedule).Include(i=>i.Activity).ToListAsync();
        }

        /*//NIJE DOBROO
        [HttpGet("{date}", Name = "GetTasksByDate")]
        public async Task<ActionResult<IEnumerable<ActivityTask>>> GetTasksByDate(int userId, string date)
        {
            
            System.Diagnostics.Debug.WriteLine("POZVAN SAM s ovim vrijednostima:"+userId +"-"+date);
            var x = _context.ActivityTask.Include(o=>o.Activity).ThenInclude(o=>o.User).Include(a=>a.Schedule).AsEnumerable()
                .Where(p=>p.ShortDate==date && p.Activity.User.UserId==userId).ToList();
            
            
            System.Diagnostics.Debug.WriteLine("PRONASAO "+x.Count);


            return x;
        }*/




        // GET: api/ActivityTask/5  -> RADI
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityTask>> GetActivityTask(int id)
        {
            var activityTask = await _context.ActivityTask.Include(p => p.Schedule).Include(i => i.Activity).Where(p=>p.ActivityTaskId==id).FirstOrDefaultAsync();

            if (activityTask == null)
            {
                return NotFound();
            }

            return activityTask;
        }

        // PUT: api/ActivityTask/5
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

        // POST: api/ActivityTask
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ActivityTask>> PostActivityTask(ActivityTask activityTask)
        {
            _context.ActivityTask.Add(activityTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivityTask", new { id = activityTask.ActivityTaskId }, activityTask);
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
