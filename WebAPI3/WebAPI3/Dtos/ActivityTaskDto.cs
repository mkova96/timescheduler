using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI3.Dtos
{
    public class ActivityTaskDto
    {
        public string ActivityTaskName { get; set; }

        public int ActivityId { get; set; }
        public string Type { get; set; } //auto ili fixed
        public int Duration { get; set; }

        public string FixedDate { get; set; }
        public int TimeFrom { get; set; }
        public int TimeTo { get; set; }


    }

}
