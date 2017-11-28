using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Models.DbModels
{
    public class projectos
    {

        public string projectoidv { get; set; }
        public string estadoidv { get; set; }
        public string sigavidv { get; set; }
        public string p_nome { get; set; }
        public string p_descricao { get; set; }
        public string fornecedoridv { get; set; }
        public int AccountManager { get; set; }
        public int Designer { get; set; }
        public DateTime DataEntrada { get; set; }
        public string NomeContacto { get; set; }

    }
}