using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebAPI3.Models
{
    public class Activity
    {
        [Key]
        public int ActivityId { get; set; }

        [Required]
        public string ActivityName { get; set; }
        //public Nullable<int> ActivityStatusId { get; set; }
        public virtual ActivityStatus ActivityStatus { get; set; }
        
        public Nullable<int> UserId { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; }

        public virtual ICollection<ActivityTask> ActivityTask { get; set; }
    }
}
