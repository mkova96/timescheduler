using WebAPI3.Models;

namespace WebAPI3.Seed
{
    public class SeedDb
    {
        private ApplicationDbContext _context;
        public SeedDb(ApplicationDbContext context) {
            _context = context;
        }
        public void Run()
        {
            var activityColor = new ActivityColor();
            activityColor.ActivityColorName = "#333333";
            _context.ActivityColor.Add(activityColor);
            _context.SaveChanges();
        }
    }
}