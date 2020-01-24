using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI3.Dtos
{
    public class UpdateWorkDto
    {
        public string workedOnTask { get; set; }
        public int timeFrom { get; set; }
        public int timeTo { get; set; }
    }

}
