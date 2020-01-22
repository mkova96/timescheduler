using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace WebAPI3.Models
{
    public class ActivityStatus
    {
        [Key]
        public int ActivityStatusId { get; set; }

        [Required]
        public string ActivityStatusName { get; set; }
        [JsonIgnore]
        public virtual ICollection<Activity> Activity { get; set; }

    }
}
