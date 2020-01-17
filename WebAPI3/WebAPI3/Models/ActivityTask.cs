using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebAPI3.Models
{
    public class ActivityTask
    {
        [Key]
        public int ActivityTaskId { get; set; }

        [Required]
        public string ActivityTaskName { get; set; }

        public int Duration { get; set; }

        public string DonePercentage { get; set; }

        
        public Nullable<int> ActivityId { get; set; }

        [JsonIgnore]

        public virtual Activity Activity { get; set; }

        public virtual ICollection<Schedule> Schedule { get; set; }

        [NotMapped]
        public virtual Schedule ActiveSchedule => Schedule.Where(t => t.ShortDate == DateTime.Today.ToShortDateString()).FirstOrDefault();

         [NotMapped]
         public virtual Schedule NextOccurance => Schedule.Where(p=>DateTime.Compare(p.Date.Date,DateTime.Now.Date)>0).OrderBy(y=>y.Date).FirstOrDefault();

    }
}
