using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JZSoft.AbpVueCodeGen.Mvc.Models
{
    public class PartCodeResult
    {
        public List<ParamDef> Properties { get; set; } = new List<ParamDef>();
        public int ErrorCount { get; set; } = 0;
        public TemplateType TemplateName { get; set; }
    }
}
