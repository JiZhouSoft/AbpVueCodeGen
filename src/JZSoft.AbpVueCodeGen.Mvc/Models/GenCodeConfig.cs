using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JZSoft.AbpVueCodeGen.Mvc.Models
{ 
    public class GenCodeConfigInput
    {
        public string JsonData { get; set; }
        public string Tag { get; set; }
        public string ListParamsJsonPath { get; set; }
        public string ListPropertiesJsonPath { get; set; }
        public string ListDtoName { get; set; }
        public string ListItemsDtoName { get; set; }
        public string CreateDtoName { get; set; }
        public string CreateParamsJsonPath { get; set; }
        public string UpdateParamsJsonPath { get; set; }
        public string UpdateDtoName { get; set; }
        public string DeleteApiJsonPath { get; set; }
    }
    public class GenCodeOutput
    {
        public string Tag { get; set; }
        public string ServiceClassName { get; set; }
        public List<string> ImportClassNames { get; set; } = new List<string>();
        public ListApi ListApi { get; set; }
        public Createapi CreateApi { get; set; }
        public Updateapi UpdateApi { get; set; }
        public Deleteapi DeleteApi { get; set; }
    }
    public class ListApi
    {
        public string ListResultDtoName { get; set; }
        public string ListResultDtoItemName { get; set; }
        public string JsMethodName { get; set; }
        public List<ParamDef> Properties { get; set; } = new List<ParamDef>();
        public List<ParamDef> Parameters { get; set; } = new List<ParamDef>();
    }
    public class Createapi : Updateapi
    {
    }
    public class Updateapi : Deleteapi
    {
        public string RequestDtoName { get; set; }
        public List<ParamDef> Properties { get; set; } = new List<ParamDef>();
    }
    public class Deleteapi
    {
        public string JsMethodName { get; set; }
    }
    public class ParamDef
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Format { get; set; }
        public Dictionary<string, string> EnumDef = new Dictionary<string, string>();
    }

}

