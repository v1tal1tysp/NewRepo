using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TT_orcamentos.Models.classes
{
    public class orcamentos
    {
         
        public string orcamentoidv { get; set; }
        public string projectoidv { get; set; }
        public string estadoidv { get; set; }
        public string tipoivaidv { get; set; }
        public string ivaidv { get; set; }
        public string cambioidv { get; set; }
        public string o_nome { get; set; }
        public double c_valor { get; set; }
        public DateTime o_datainicio { get; set; }
        public int o_numeropessoas { get; set; }
        public int o_numeronoites { get; set; }
        public int o_numerodias { get; set; }
        public DateTime o_datacriacao { get; set; }
        public double o_margemvenda { get; set; }
        public double o_markup { get; set; }
        public string o_descricao { get; set; }
        public bool active { get; set; }
        public string parrentorcamentoidv { get; set; }
        public int Versao { get; set; }
        public bool pe { get; set; }
        public DateTime DataUpdate{get;set;}
    }
}