using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JZSoft.AbpVueCodeGen.Mvc.Models
{
    public class PartCodeInnput
    {
        public TemplateType TemplateName { get; set; }
        public string Json { get; set; }
        public string JsonPath { get; set; }
    }

    public enum TemplateType
    {
        Json,
        ListItem,
        QueryParamsDef,
        QueryParamsQueryCode,
        QueryParamsDwonloadCode,
        FormItems
    }
}
