using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI3;
using WebAPI3.Dtos;
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

        // GET: api/Activity ->RADI
        [HttpGet(Name = "GetActivity")]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivity(int userId) //dodaj schedule na task
        {
            var x=await _context.Activity.Include(p=>p.ActivityTask).ThenInclude(p => p.Schedule).Include(i=>i.ActivityStatus)
                .Include(a=>a.ActivityColor).Include(e=>e.User).Where(p => p.UserId == userId).ToListAsync();

            return x;
        }

        // GET: api/Activity/  ->RADI
        [HttpGet("{activityId}",Name = "GetUserActivity")]
        public async Task<ActionResult<Activity>> GetUserActivity(int userId,int activityId)
        {
            System.Diagnostics.Debug.WriteLine("USOOO");
            var x = await _context.Activity.Include(i=>i.ActivityTask).ThenInclude(p=>p.Schedule)
                .Include(o=>o.User).Include(a=>a.ActivityStatus).Include(e=>e.ActivityColor).Include(o => o.ActivityType).Where(o=>o.User.UserId==userId && o.ActivityId==activityId).FirstOrDefaultAsync();

            System.Diagnostics.Debug.WriteLine(x.ActivityName);

            return x;
        }


        // PUT: api/Activity/5 -> RADI
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        /*[HttpPut("{id}")]
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
        }*/

        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivity(int id, ActivityDto activityDto)
        {
            
            var activity = _context.Activity.Include(i => i.ActivityTask).ThenInclude(p => p.Schedule)
                .Include(o => o.User).Include(a => a.ActivityStatus).Include(e => e.ActivityColor).Where(o=>o.ActivityId == id).FirstOrDefault();

            activity.ActivityName = activityDto.ActivityName;
            activity.ActivityColorId = activityDto.ActivityColorId;
            activity.ActivityTypeId = activityDto.ActivityTypeId;
            activity.DeadLine = Convert.ToDateTime(activityDto.DeadLine);

            var activityColor = _context.ActivityColor.Where(o => o.ActivityColorId == activityDto.ActivityColorId).FirstOrDefault();
            activity.ActivityColor = activityColor;

            var activityType = _context.ActivityType.Where(o => o.ActivityTypeId == activityDto.ActivityTypeId).FirstOrDefault();
            activity.ActivityType = activityType;

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


        // POST: api/Activity -> RADI
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
            /*[HttpPost]
            public async Task<ActionResult<Activity>> PostActivity(Activity activity,[FromRoute] string userId)
            {
                _context.Activity.Add(activity);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUserActivity", new { userId = userId, activityId = activity.ActivityId }, activity);
            }*/

        [HttpPost]
        public async Task<ActionResult<Activity>> PostActivity(ActivityDto addActivityDto, [FromRoute] string userId)
        {
            var activity = new Activity();
            activity.ActivityName = addActivityDto.ActivityName;
            activity.ActivityColorId = addActivityDto.ActivityColorId;
            activity.ActivityTypeId = addActivityDto.ActivityTypeId;
            activity.DeadLine = Convert.ToDateTime(addActivityDto.DeadLine);

            var activityColor = _context.ActivityColor.Where(o => o.ActivityColorId == addActivityDto.ActivityColorId).FirstOrDefault();
            activity.ActivityColor = activityColor;

            var activityType = _context.ActivityType.Where(o => o.ActivityTypeId == addActivityDto.ActivityTypeId).FirstOrDefault();
            activity.ActivityType = activityType;

            var user = _context.User.Where(o => o.UserId == Int32.Parse(userId)).FirstOrDefault();
            activity.User = user;
            activity.UserId = Int32.Parse(userId);

            var activityStatus = _context.ActivityStatus.Where(o => o.ActivityStatusName=="NotDone").FirstOrDefault();
            activity.ActivityStatus = activityStatus;
            activity.ActivityStatusId = activityStatus.ActivityStatusId;


            _context.Activity.Add(activity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserActivity", new { userId = userId, activityId = activity.ActivityId }, activity);
        }

        // DELETE: api/Activity/5  ->RADI
        [HttpDelete("{id}")]
        public async Task<ActionResult<Activity>> DeleteActivity(int id)
        {
            var activity = await _context.Activity.FindAsync(id);
            if (activity == null)
            {
                return NotFound();
            }

            var z = _context.ActivityTask.Where(p => p.ActivityId == id).ToList();
            foreach (var t in z)
            {
                var zy = _context.Schedule.Where(p => p.ActivityTaskId == t.ActivityTaskId).ToList();
                foreach(var i in zy)
                {
                    _context.Schedule.Remove(i);
                }
                _context.SaveChanges();

                _context.ActivityTask.Remove(t);
            }
            _context.SaveChanges();


            try
            {
                _context.Activity.Remove(activity);
                _context.SaveChanges();
                System.Diagnostics.Debug.WriteLine("obrisano");
            }
            catch (Exception exc)
            {
                System.Diagnostics.Debug.WriteLine("PROBLEMI S BRISANJEM");
            }

            return activity;
        }

        private bool ActivityExists(int id)
        {
            return _context.Activity.Any(e => e.ActivityId == id);
        }

    }
}
