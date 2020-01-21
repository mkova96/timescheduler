using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI3.Dtos
{
    public class ActivityDto
    {
        public string ActivityName { get; set; }
        public int ActivityColorId { get; set; }
        public string DeadLine { get; set; }
        public int ActivityTypeId { get; set; }
    }


}

