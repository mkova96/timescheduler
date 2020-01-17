using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebAPI3.Models
{
    public class Schedule
    {
        [Key]
        public int ScheduleId { get; set; }
        public DateTime Date { get; set; }
        public int TimeFrom { get; set; }
        public int TimeTo { get; set; }
        public bool Moveable { get; set; }
        public Nullable<int> ActivityTaskId { get; set; }

        [JsonIgnore]
        public virtual ActivityTask ActivityTask { get; set; }

        [NotMapped]
        public virtual string ShortDate => Date.ToShortDateString();

        [NotMapped]
        public bool Done;
    }
}
