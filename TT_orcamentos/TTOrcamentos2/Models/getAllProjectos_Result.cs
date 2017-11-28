using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Web;

namespace TT_orcamentos.Models.classes
{
    public class getAllProjectos_Result
    {
        public string f_nome { get; set; }
        public string projectoidv { get; set; }
        public int o_numeropessoas { get; set; }
        public string p_nome { get; set; }
        public string p_descricao { get; set; }
        public string sigavidv { get; set; }
        public string orcamentoidv { get; set; }
        public string o_nome { get; set; }
        public string EstadoProjecto { get; set; }
        public string EstadoOrcamento { get; set; }
        public DateTime o_datainicio { get; set; }

    }

}



