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
    [Route("api/user/{userId}/activity")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ActivityController(ApplicationDbContext context)
        {
            _context = context;
        }

        /*// GET: api/Activity
        [HttpGet(Name = "GetActivity")]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivity(int userId)
        {
            System.Diagnostics.Debug.WriteLine("ide je "+userId);
            //var x=await _context.Activity.Include(p=>p.ActivityTask)/*.Where(p => p.UserId == id)*///.ToListAsync();
          /*  System.Diagnostics.Debug.WriteLine("velicina jee"+x.Count);

            foreach (Activity a in x)
            {
                foreach (ActivityTask y in a.ActivityTask)
                {
                    System.Diagnostics.Debug.WriteLine(y.TimeFrom.ToShortDateString());
                }
            }
            return x;
        }*/

        // GET: api/Activity/
        [HttpGet("{activityId}",Name = "GetUserActivity")]
        public async Task<ActionResult<Activity>> GetUserActivity(int userId,int activityId)
        {
            System.Diagnostics.Debug.WriteLine("USOOO");
            var x = await _context.Activity.Include(i=>i.ActivityTask).Include(o=>o.User)
                .Where(o=>o.User.UserId==userId && o.ActivityId==activityId).FirstOrDefaultAsync();

            System.Diagnostics.Debug.WriteLine(x.ActivityName);

            return x;
        }


        // PUT: api/Activity/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivity(int id, Activity activity)
        {
            if (id != activity.ActivityId)
            {
                return BadRequest();
            }

            _context.Entry(activity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityExists(id))
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

        // POST: api/Activity
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Activity>> PostActivity(Activity activity)
        {
            _context.Activity.Add(activity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivity", new { id = activity.ActivityId }, activity);
        }

        // DELETE: api/Activity/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Activity>> DeleteActivity(int id)
        {
            var activity = await _context.Activity.FindAsync(id);
            if (activity == null)
            {
                return NotFound();
            }

            _context.Activity.Remove(activity);
            await _context.SaveChangesAsync();

            return activity;
        }

        private bool ActivityExists(int id)
        {
            return _context.Activity.Any(e => e.ActivityId == id);
        }

    }
}
