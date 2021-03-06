﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI3.Models;

namespace WebAPI3
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options)
        { }

        public DbSet<ActivityColor> ActivityColor { get; set; }
        public DbSet<Activity> Activity { get; set; }
        public DbSet<ActivityStatus> ActivityStatus { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<ActivityType> ActivityType { get; set; }
        public DbSet<Schedule> Schedule { get; set; }
        public DbSet<UserActivityType> UserActivityType { get; set; }
        public DbSet<ActivityTask> ActivityTask { get; set; }


    }
}
