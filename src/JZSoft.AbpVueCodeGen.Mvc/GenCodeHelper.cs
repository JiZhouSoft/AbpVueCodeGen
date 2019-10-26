using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JZSoft.AbpVueCodeGen.Mvc
{
    public static class GenCodeHelper
    {
        public static string ToUpperStart(this string str)
        {
            if (str == null)
            {
                return null;
            }
            List<char> strs = new List<char>();
            int i = 0;
            foreach (var item in str.ToCharArray())
            {
                if (i == 0)
                {
                    strs.Add(item.ToString().ToUpper().First());
                }
                else
                {
                    strs.Add(item);
                }
                i++;
            }
            return string.Join("", strs);
        }
        public static string ToLowerStart(this string str)
        {
            if (str == null)
            {
                return null;
            }
            List<char> strs = new List<char>();
            int i = 0;
            foreach (var item in str.ToCharArray())
            {
                if (i == 0)
                {
                    strs.Add(item.ToString().ToLower().First());
                }
                else
                {
                    strs.Add(item);
                }
                i++;
            }
            return string.Join("", strs);
        }
    }
}
