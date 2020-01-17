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
    [ApiController] //RADI SVE
    public class ActivityStatusController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ActivityStatusController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ActivityStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivityStatus>>> GetActivityStatus()
        {
            return await _context.ActivityStatus.ToListAsync();
        }

        // GET: api/ActivityStatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityStatus>> GetActivityStatus(int id)
        {
            var activityStatus = await _context.ActivityStatus.FindAsync(id);

            if (activityStatus == null)
            {
                return NotFound();
            }

            return activityStatus;
        }

        // PUT: api/ActivityStatus/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivityStatus(int id, ActivityStatus activityStatus)
        {
            if (id != activityStatus.ActivityStatusId)
            {
                return BadRequest();
            }

            _context.Entry(activityStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityStatusExists(id))
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

        // POST: api/ActivityStatus
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ActivityStatus>> PostActivityStatus(ActivityStatus activityStatus)
        {
            _context.ActivityStatus.Add(activityStatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivityStatus", new { id = activityStatus.ActivityStatusId }, activityStatus);
        }

        // DELETE: api/ActivityStatus/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ActivityStatus>> DeleteActivityStatus(int id)
        {
            var activityStatus = await _context.ActivityStatus.FindAsync(id);
            if (activityStatus == null)
            {
                return NotFound();
            }

            _context.ActivityStatus.Remove(activityStatus);
            await _context.SaveChangesAsync();

            return activityStatus;
        }

        private bool ActivityStatusExists(int id)
        {
            return _context.ActivityStatus.Any(e => e.ActivityStatusId == id);
        }
    }
}
