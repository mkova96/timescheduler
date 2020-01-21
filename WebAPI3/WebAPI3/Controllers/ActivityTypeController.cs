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
    [Route("api/user/{userId}/activityType")]
    [ApiController] //RADI SVE
    public class ActivityTypeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ActivityTypeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ActivityType
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivityType>>> GetActivityType()
        {
            return await _context.ActivityType.Include(p=>p.Activity)
                .ThenInclude(i=>i.ActivityTask).ThenInclude(p=>p.Schedule).Include(a=>a.UserActivityType).ToListAsync();
        }

        // GET: api/ActivityType/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityType>> GetActivityType(int id)
        {
            var activityType = await _context.ActivityType.Include(a => a.UserActivityType).Include(p => p.Activity)
                .ThenInclude(i => i.ActivityTask).ThenInclude(p => p.Schedule).Where(a=>a.ActivityTypeId==id).FirstOrDefaultAsync();

            if (activityType == null)
            {
                return NotFound();
            }

            return activityType;
        }

        // PUT: api/ActivityType/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        /*[HttpPut("{id}")]
        public async Task<IActionResult> PutActivityType(int id, ActivityType activityType)
        {
            if (id != activityType.ActivityTypeId)
            {
                return BadRequest();
            }

            _context.Entry(activityType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityTypeExists(id))
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
        public async Task<IActionResult> PutActivityType(int id, ActivityTypeDto activityTypeDto, [FromRoute] string userId)
        {
            var activityType = _context.ActivityType.Include(a => a.UserActivityType).Include(p => p.Activity)
                            .ThenInclude(i => i.ActivityTask).ThenInclude(p => p.Schedule).Where(a => a.ActivityTypeId == id).FirstOrDefault();

            activityType.ActivityTypeName = activityTypeDto.ActivityTypeName;

            _context.Entry(activityType).State = EntityState.Modified;

            var userActivityType = _context.UserActivityType.Include(i => i.ActivityType).Include(o => o.User)
                .Where(o => o.UserId == Int32.Parse(userId) && o.ActivityTypeId == activityType.ActivityTypeId).FirstOrDefault();

            userActivityType.TimeFrom = activityTypeDto.TimeFrom;
            userActivityType.TimeTo = activityTypeDto.TimeTo;

            _context.Entry(userActivityType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityTypeExists(id))
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

        // POST: api/ActivityType
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        /*[HttpPost]
        public async Task<ActionResult<ActivityType>> PostActivityType(ActivityType activityType)
        {
            _context.ActivityType.Add(activityType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivityType", new { id = activityType.ActivityTypeId }, activityType);
        }*/

        [HttpPost]
        public async Task<ActionResult<ActivityType>> PostActivityType(ActivityTypeDto activityTypeDto, [FromRoute] string userId)
        {
            var activityType = new ActivityType();
            activityType.ActivityTypeName = activityTypeDto.ActivityTypeName;

            _context.ActivityType.Add(activityType);
            await _context.SaveChangesAsync();

            var userActivityType = new UserActivityType();
            userActivityType.TimeFrom = activityTypeDto.TimeFrom;
            userActivityType.TimeTo = activityTypeDto.TimeTo;

            userActivityType.ActivityType = activityType;
            userActivityType.ActivityTypeId = activityType.ActivityTypeId;

            var user = _context.User.Where(r => r.UserId == Int32.Parse(userId)).FirstOrDefault();
            userActivityType.User = user;
            userActivityType.UserId = user.UserId;

            _context.UserActivityType.Add(userActivityType);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivityType", new { userId = userId,id = activityType.ActivityTypeId }, activityType);
        }

        // DELETE: api/ActivityType/5  ---->RADI
        [HttpDelete("{id}")]
        public async Task<ActionResult<ActivityType>> DeleteActivityType(int id)
        {
            var activityType = await _context.ActivityType.FindAsync(id);
            if (activityType == null)
            {
                return NotFound();
            }
            var z = _context.UserActivityType.Where(p => p.ActivityTypeId == id).ToList();
            foreach(var t in z)
            {
                _context.UserActivityType.Remove(t);
            }

            try
            {
                _context.ActivityType.Remove(activityType);
                _context.SaveChanges();
                System.Diagnostics.Debug.WriteLine("obrisano");
            }
            catch (Exception exc)
            {
                System.Diagnostics.Debug.WriteLine("Nemoguce obrisati jer neke aktivnosti sadrže taj tip");

            }
            await _context.SaveChangesAsync();

            return activityType;
        }

        private bool ActivityTypeExists(int id)
        {
            return _context.ActivityType.Any(e => e.ActivityTypeId == id);
        }
    }
}
