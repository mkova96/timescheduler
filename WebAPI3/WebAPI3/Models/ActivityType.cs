using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace WebAPI3.Models
{
    public class ActivityType
    {
        [Key]
        public int ActivityTypeId { get; set; }

        [Required]
        public string ActivityTypeName { get; set; }

        [JsonIgnore]
        public virtual ICollection<Activity> Activity { get; set; }
        [JsonIgnore]
        public virtual ICollection<UserActivityType> UserActivityType { get; set; }

    }
}
