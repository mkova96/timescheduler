﻿using System;
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
        /*[HttpPut("{id}")]

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
        }*/

        [HttpPut("{id}")]

        public async Task<IActionResult> PutActivityTask(int id, UpdateActivityTaskDto activityTaskDto)
        {
            var activityTask = _context.ActivityTask.Include(p => p.Schedule).Include(i => i.Activity)
                .Where(p => p.ActivityTaskId == id).FirstOrDefault();

            activityTask.ActivityTaskName = activityTaskDto.ActivityTaskName;

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
        /*[HttpPost]
        public async Task<ActionResult<ActivityTask>> PostActivityTask(ActivityTask activityTask,[FromRoute] string userId)
        {
            activityTask.DonePercentage = "0/" + activityTask.Duration.ToString();
            _context.ActivityTask.Add(activityTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivityTask", new {userId=userId, id = activityTask.ActivityTaskId }, activityTask);
        }*/

        [HttpPost("user/{userId}/new")]
        public async Task<ActionResult<ActivityTask>> PostActivityTask(ActivityTaskDto activityTaskDto, [FromRoute] string userId)
        {


            if (activityTaskDto.Type == "auto")
            {
                var activityTask = new ActivityTask();
                activityTask.ActivityTaskName = activityTaskDto.ActivityTaskName;
                activityTask.ActivityId = activityTaskDto.ActivityId;
                activityTask.DonePercentage = "0/" + activityTaskDto.Duration.ToString();
                activityTask.Duration = activityTaskDto.Duration;

                var act = _context.Activity.Include(o => o.User).Where(a => a.ActivityId == activityTaskDto.ActivityId).FirstOrDefault();
                activityTask.Activity = act;

                _context.ActivityTask.Add(activityTask);
                await _context.SaveChangesAsync();

                var activity = _context.Activity.Include(o => o.User).Where(a => a.ActivityId == activityTaskDto.ActivityId).FirstOrDefault();

                System.Console.WriteLine(userId);;
                System.Console.WriteLine(Int32.Parse(userId));
                System.Console.WriteLine(activityTaskDto);

                var at = _context.UserActivityType.Include(a => a.ActivityType).ThenInclude(a => a.Activity)
                    .Where(a => a.ActivityTypeId == activity.ActivityTypeId && a.UserId == Int32.Parse(userId)).FirstOrDefault();

                int maxDnevnoSati = at.TimeTo - at.TimeFrom;
                int potrebno = activityTaskDto.Duration;

                DateTime day = DateTime.Today;

                while (potrebno > 0)
                {
                    string shortDay = day.ToShortDateString();
                    List<Schedule> schedules = _context.Schedule.Include(p => p.ActivityTask).ThenInclude(a => a.Activity).ThenInclude(o => o.User)
                        .AsEnumerable()
                        .Where(a => a.Date.ToShortDateString() == shortDay && a.ActivityTask.Activity.UserId == Int32.Parse(userId)).ToList();

                    if (!schedules.Any()) //prazan raspored taj dan
                    {
                        if (maxDnevnoSati >= potrebno)
                        {
                            Schedule newSchedule = new Schedule
                            {
                                TimeTo = at.TimeFrom + potrebno,
                                TimeFrom = at.TimeFrom,
                                Date = day,
                                Moveable = false,
                                ActivityTask = activityTask,
                                ActivityTaskId = activityTask.ActivityTaskId
                            };

                            //activityTask.Schedule.Add(newSchedule);


                            _context.Schedule.Add(newSchedule);
                            await _context.SaveChangesAsync();

                            potrebno = 0;
                            break;
                        }
                        else
                        {

                            Schedule newSchedule = new Schedule { TimeTo = at.TimeTo, TimeFrom = at.TimeFrom, Date = day, Moveable = false,
                                ActivityTask = activityTask,
                                ActivityTaskId = activityTask.ActivityTaskId
                            };
                            _context.Schedule.Add(newSchedule);
                            await _context.SaveChangesAsync();
                            potrebno -= maxDnevnoSati;
                        }
                    }
                    day = day.AddDays(1);
                }

                return CreatedAtAction("GetActivityTask", new { userId = userId, id = activityTask.ActivityTaskId }, activityTask);
            }
            else
            {
                var activityTask = new ActivityTask();
                activityTask.ActivityTaskName = activityTaskDto.ActivityTaskName;
                activityTask.ActivityId = activityTaskDto.ActivityId;
                activityTask.DonePercentage = "0/" + (activityTaskDto.TimeTo - activityTaskDto.TimeFrom).ToString();
                activityTask.Duration = activityTaskDto.TimeTo-activityTaskDto.TimeFrom;

                var act = _context.Activity.Include(o => o.User).Where(a => a.ActivityId == activityTaskDto.ActivityId).FirstOrDefault();
                activityTask.Activity = act;

                _context.ActivityTask.Add(activityTask);
                await _context.SaveChangesAsync();

                Schedule newSchedule = new Schedule
                {
                    TimeTo = activityTaskDto.TimeTo,
                    TimeFrom = activityTaskDto.TimeFrom,
                    Date = Convert.ToDateTime(activityTaskDto.FixedDate),
                    Moveable = false,
                    ActivityTask = activityTask,
                    ActivityTaskId = activityTask.ActivityTaskId
                };


                _context.Schedule.Add(newSchedule);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetActivityTask", new { userId = userId, id = activityTask.ActivityTaskId }, activityTask);

            }

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

       /* [HttpPost("user/{userId}/auto", Name = "PostTaskAuto")] //RADI
        public async Task<IActionResult> PostTaskAuto(ActivityTask activityTask, [FromRoute] string userId)
        {
            var activity = _context.Activity.Include(o=>o.User).Where(a => a.ActivityId == activityTask.ActivityId).FirstOrDefault();

            var at = _context.UserActivityType.Include(a=>a.ActivityType).ThenInclude(a=>a.Activity)
                .Where(a => a.ActivityTypeId == activity.ActivityTypeId && a.UserId== Int32.Parse(userId)).FirstOrDefault();

            int maxDnevnoSati = at.TimeTo - at.TimeFrom;
            int potrebno = activityTask.Duration;

            DateTime day = DateTime.Today;

            while (potrebno>0) {
                string shortDay = day.ToShortDateString();
                List<Schedule> schedules= _context.Schedule.Include(p=>p.ActivityTask).ThenInclude(a=>a.Activity).ThenInclude(o=>o.User)
                    .AsEnumerable()
                    .Where(a => a.Date.ToShortDateString() == shortDay && a.ActivityTask.Activity.UserId== Int32.Parse(userId)).ToList();

                if (!schedules.Any()) //prazan raspored taj dan
                {
                    if (maxDnevnoSati >= potrebno) {
                        Schedule newSchedule = new Schedule { TimeTo = at.TimeFrom+potrebno, TimeFrom = at.TimeFrom, Date = day, Moveable = false};
                        activityTask.Schedule.Add(newSchedule);

                        _context.Schedule.Add(newSchedule);
                        await _context.SaveChangesAsync();

                        potrebno = 0;
                        break;
                    }
                    else
                    {
                        Schedule newSchedule = new Schedule { TimeTo = at.TimeTo, TimeFrom = at.TimeFrom, Date = day, Moveable = false };
                        activityTask.Schedule.Add(newSchedule);
                        _context.Schedule.Add(newSchedule);
                        await _context.SaveChangesAsync();
                        potrebno -= maxDnevnoSati;
                    }
                }
                day = day.AddDays(1);
            }
            
            activityTask.DonePercentage = "0/" + activityTask.Duration.ToString();
            _context.ActivityTask.Add(activityTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActivityTask", new { userId = userId, id = activityTask.ActivityTaskId }, activityTask);
        }*/


        [HttpPut("updateWork/{id}")]

        public async Task<IActionResult> UpdateActivityTaskWork(UpdateWorkDto updateWorkDto,[FromRoute] string id)
        {

            var activityTask = await _context.ActivityTask.Include(p => p.Schedule).Include(i => i.Activity)
                .Where(p => p.ActivityTaskId == Int32.Parse(id)).FirstOrDefaultAsync();


            if (activityTask==null)
            {
                return BadRequest();
            }

            System.Diagnostics.Debug.WriteLine(activityTask.ActiveSchedule.TimeFrom + " "+activityTask.ActiveSchedule.TimeTo+ " "+
                updateWorkDto.timeFrom+" "+updateWorkDto.timeTo);


            if (updateWorkDto.workedOnTask == "yes")
            {
                System.Diagnostics.Debug.WriteLine("uso1");

                if (updateWorkDto.timeFrom == activityTask.ActiveSchedule.TimeFrom && updateWorkDto.timeTo == activityTask.ActiveSchedule.TimeTo)
                {
                    System.Diagnostics.Debug.WriteLine("ovdi");

                    activityTask.ActiveSchedule.TimeWorked = updateWorkDto.timeTo - updateWorkDto.timeFrom;
                    activityTask.DonePercentage = (updateWorkDto.timeTo - updateWorkDto.timeFrom) + "/" + activityTask.Duration;
                    _context.Entry(activityTask).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                }
                else
                {
                    activityTask.ActiveSchedule.TimeWorked = updateWorkDto.timeTo - updateWorkDto.timeFrom;
                    activityTask.DonePercentage = (updateWorkDto.timeTo - updateWorkDto.timeFrom) + "/" + activityTask.Duration;

                    var activity = _context.Activity.Include(o => o.User).Where(a => a.ActivityId == activityTask.ActivityId).FirstOrDefault();

                    var at = _context.UserActivityType.Include(a => a.ActivityType).ThenInclude(a => a.Activity)
                        .Where(a => a.ActivityTypeId == activity.ActivityTypeId && a.UserId == activity.UserId).FirstOrDefault();


                    DateTime day = DateTime.Today;
                    int potrebno = (activityTask.ActiveSchedule.TimeTo - activityTask.ActiveSchedule.TimeFrom) - activityTask.ActiveSchedule.TimeWorked;

                    while (true)
                    {
                        string shortDay = day.ToShortDateString();
                        List<Schedule> schedules = _context.Schedule.Include(p => p.ActivityTask).ThenInclude(a => a.Activity).ThenInclude(o => o.User)
                            .AsEnumerable()
                            .Where(a => a.Date.ToShortDateString() == shortDay && a.ActivityTask.Activity.UserId == activity.UserId).ToList();

                        if (!schedules.Any()) //prazan raspored taj dan
                        {

                            Schedule newSchedule = new Schedule { TimeTo = activityTask.ActiveSchedule.TimeFrom + potrebno, TimeFrom = activityTask.ActiveSchedule.TimeFrom, Date = day, Moveable = false };
                            activityTask.Schedule.Add(newSchedule);

                            _context.Schedule.Add(newSchedule);
                            await _context.SaveChangesAsync();

                            break;
                        }
                        day = day.AddDays(1);
                    }
                }

            }else
            {
                activityTask.ActiveSchedule.TimeWorked =0;

                var activity = _context.Activity.Include(o => o.User).Where(a => a.ActivityId == activityTask.ActivityId).FirstOrDefault();

                var at = _context.UserActivityType.Include(a => a.ActivityType).ThenInclude(a => a.Activity)
                    .Where(a => a.ActivityTypeId == activity.ActivityTypeId && a.UserId == activity.UserId).FirstOrDefault();

               
                DateTime day = DateTime.Today;

                while (true)
                {
                    string shortDay = day.ToShortDateString();
                    List<Schedule> schedules = _context.Schedule.Include(p => p.ActivityTask).ThenInclude(a => a.Activity).ThenInclude(o => o.User)
                        .AsEnumerable()
                        .Where(a => a.Date.ToShortDateString() == shortDay && a.ActivityTask.Activity.UserId == activity.UserId).ToList();

                    if (!schedules.Any()) //prazan raspored taj dan
                    {
                        
                            Schedule newSchedule = new Schedule { TimeTo = activityTask.ActiveSchedule.TimeTo, TimeFrom = activityTask.ActiveSchedule.TimeFrom, Date = day, Moveable = false };
                            activityTask.Schedule.Add(newSchedule);

                            _context.Schedule.Add(newSchedule);
                            await _context.SaveChangesAsync();

                            break;
                    }
                    day = day.AddDays(1);
                }


            }


            _context.Entry(activityTask).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivityTaskExists(Int32.Parse(id)))
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
    }
}
