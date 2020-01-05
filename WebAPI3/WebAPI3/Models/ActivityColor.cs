using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI3.Models
{
    public class ActivityColor
    {
        [Key]
        public int ActivityColorId { get; set; }

        [Required]
        public string ActivityColorName { get; set; }
    }
}
