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
    [Route("api/user/{userId}/activityType")]
    [ApiController]
    public class UserActivityTypeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserActivityTypeController(ApplicationDbContext context)
        {
            _context = context;
        }

        /*// GET: api/UserActivityType
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserActivityType>>> GetUserActivityType()
        {
            return await _context.UserActivityType.ToListAsync();
        }*/

        // GET:
        [HttpGet(Name = "GetUserActivityType")]
        public async Task<IEnumerable<UserActivityType>> GetUserActivityType(int userId)
        {
            System.Diagnostics.Debug.WriteLine("uso sam i dobio id korisnika: "+userId);
            var x = await _context.UserActivityType.Include(i => i.ActivityType).Include(o => o.User)
                .Where(o => o.UserId == userId).ToListAsync();

            System.Diagnostics.Debug.WriteLine("vracam broj tipova:" + x.Count);

            return x;
        }

        /*// GET: api/UserActivityType/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserActivityType>> GetUserActivityType(int id)
        {
            var userActivityType = await _context.UserActivityType.FindAsync(id);

            if (userActivityType == null)
            {
                return NotFound();
            }

            return userActivityType;
        }*/

        // PUT: api/UserActivityType/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserActivityType(int id, UserActivityType userActivityType)
        {
            if (id != userActivityType.UserActivityTypeId)
            {
                return BadRequest();
            }

            _context.Entry(userActivityType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserActivityTypeExists(id))
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

        // POST: api/UserActivityType
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<UserActivityType>> PostUserActivityType(UserActivityType userActivityType)
        {
            _context.UserActivityType.Add(userActivityType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserActivityType", new { id = userActivityType.UserActivityTypeId }, userActivityType);
        }

        // DELETE: api/UserActivityType/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserActivityType>> DeleteUserActivityType(int id)
        {
            var userActivityType = await _context.UserActivityType.FindAsync(id);
            if (userActivityType == null)
            {
                return NotFound();
            }

            _context.UserActivityType.Remove(userActivityType);
            await _context.SaveChangesAsync();

            return userActivityType;
        }

        private bool UserActivityTypeExists(int id)
        {
            return _context.UserActivityType.Any(e => e.UserActivityTypeId == id);
        }
    }
}
