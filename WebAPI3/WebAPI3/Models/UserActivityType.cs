using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebAPI3.Models
{
    public class UserActivityType
    {
        [Key]
        public int UserActivityTypeId { get; set; }

        public Nullable<int> UserId { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }

        public Nullable<int> ActivityTypeId { get; set; }
        [JsonIgnore]
        public virtual ActivityType ActivityType { get; set; }

        public int TimeFrom { get; set; }
        public int TimeTo { get; set; }
    }
}
