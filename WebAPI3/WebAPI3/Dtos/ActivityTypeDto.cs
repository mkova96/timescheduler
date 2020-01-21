using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI3.Dtos
{
    public class ActivityTypeDto
    {
        public string ActivityTypeName { get; set; }
        public int TimeFrom { get; set; }
        public int TimeTo { get; set; }
    }
}
