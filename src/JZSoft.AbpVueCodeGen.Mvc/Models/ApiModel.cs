using System;
using System.Collections.Generic;
using System.Text; 
namespace JZSoft.AbpVueCodeGen.Mvc.Models
{
    public class ApiModel
    {
        public string Path { get; set; }
        public List<MethodDef> Methods { get; set; } = new List<MethodDef>();
    }
    public class MethodDef
    {
        public string Tags { get; set; }
        public string Method { get; set; }

        public List<ParametersDef> Parameters { get; set; } = new List<ParametersDef>();

        public ReponseDef Reponse { get; set; }
    }
    /// <summary>
    /// ["get"].Value/["parameters"].Value[""]
    /// </summary>
    public class ParametersDef
    {
        /// <summary>
        /// 是否为自定义类型
        /// </summary>
        public bool IsComplexModel { get; set; }
        /// <summary>
        /// First check schema
        /// </summary>
        public string SchemaName { get; set; }
        public ModelDtoDef InputModel { get; set; }
        /// <summary>
        /// ["parameters"].Value["name"]
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// ["parameters"].Value["type"]
        /// integer,string
        /// </summary>
        public string TypeName { get; set; }
        /// <summary>
        /// ["parameters"].Value["required"]
        /// </summary>
        public bool IsRequired { get; set; }
        /// <summary>
        /// format
        /// int32
        /// </summary>
        public string Format { get; set; }

        /// <summary>
        /// maximum
        ///Value	2147483647	object {double}
        /// </summary>
        public double Maximum { get; set; }
        /// <summary>
        /// minimum
        ///Value	2147483647	object {double}
        /// </summary>
        public double Minimum { get; set; }

    }

    /// <summary>
    /// responses
    /// </summary>
    public class ReponseDef
    {

        /// <summary>
        /// schema
        /// -		[0]	{[__referencePath, #/definitions/RoleDto]}	System.Collections.Generic.KeyValuePair<string, object>
        /// </summary>
        public string SchemaName { get; set; }

        public ModelDtoDef ResultModel { get; set; }
        /// <summary>
        /// "format": "int64",
        /// </summary>
        public string Format { get; set; } 
        public bool IsComplexModel { get; internal set; }
    }

    public class ModelDtoDef
    {
        public string Name { get; set; }
        public List<PropertiesDef> Properties { get; set; } = new List<PropertiesDef>();
    }


    public class PropertiesDef
    {
        public List<PropertiesDef> Items { get; set; } = new List<PropertiesDef>();
        public string Name { get; set; }
        public bool IsRequired { get; set; }
        /// <summary>
        /// object,integer
        /// </summary> 
        public ModelDtoDef ItemModelDtoDef { get; set; }
        public string TypeStr { get; set; }
        /// <summary>
        /// int32
        /// </summary>
        public string Format { get; set; }
        public int? MinLength { get; set; }
        public int? MaxLength { get; set; }
    }
}