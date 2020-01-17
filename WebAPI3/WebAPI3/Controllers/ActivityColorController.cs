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
    public class ActivityColorController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ActivityColorController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ActivityColor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivityColor>>> GetActivityColor()
        {
            return await _context.ActivityColor.ToListAsync();
        }

        // GET: api/ActivityColor/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityColor>> GetActivityColor(int id)
        {
            var activityColor = await _context.ActivityColor.FindAsync(id);

            if (activityColor == null)
            {
                return NotFound();
            }

            return activityColor;
        }

        // PUT: api/ActivityColor/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivityColor(int id, ActivityColor activityColor)
        {
            if (id != activityColor.ActivityColorId)
            {
                return BadRequest();
            }

            _context.Entry(activityColor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityColorExists(id))
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

        // POST: api/ActivityColor
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ActivityColor>> PostActivityColor(ActivityColor activityColor)
        {
            _context.ActivityColor.Add(activityColor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivityColor", new { id = activityColor.ActivityColorId }, activityColor);
        }

        // DELETE: api/ActivityColor/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ActivityColor>> DeleteActivityColor(int id)
        {
            var activityColor = await _context.ActivityColor.FindAsync(id);
            if (activityColor == null)
            {
                return NotFound();
            }

            _context.ActivityColor.Remove(activityColor);
            await _context.SaveChangesAsync();

            return activityColor;
        }

        private bool ActivityColorExists(int id)
        {
            return _context.ActivityColor.Any(e => e.ActivityColorId == id);
        }
    }
}
