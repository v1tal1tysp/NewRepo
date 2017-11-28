using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Models.DbModels
{
    public class fornecedor
    {
        public string fornecedoridv { get; set; }
        public string tipofornecedoreidv { get; set; }
        public string paisidv { get; set; }
        public string cidade { get; set; }
        public string tipocustoidv { get; set; }
        public string f_nome { get; set; }
        public string f_nomecomercial { get; set; }
        public string f_morada { get; set; }
        public string f_localidade { get; set; }
        public string f_codigopostal { get; set; }
        public string f_telefone { get; set; }
        public string f_fax { get; set; }
        public string f_telemovel { get; set; }
        public string f_contacto { get; set; }
        public string f_email { get; set; }
        public string f_url { get; set; }
        public string f_contribuinte { get; set; }
        public string f_categoria { get; set; }
    }
}