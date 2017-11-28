using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TT_orcamentos.Models.classes
{
    public class voosList
    {
        public string vooidv { get; set; }
        public string orcamentoidv { get; set; }
        public string fornecedoridv { get; set; }
        public string cambioidv { get; set; }
        public string ivaidv { get; set; }
        public string tipocustoidv { get; set; }
        public string v_partida { get; set; }
        public string v_destino { get; set; }
        public string v_nomevoo { get; set; }
        public Nullable<double> v_preco { get; set; }
        public Nullable<double> v_comissao { get; set; }
        public Nullable<double> v_net { get; set; }
        public Nullable<double> v_valorcambio { get; set; }
        public Nullable<double> v_valoreuros { get; set; }
        public Nullable<double> v_margemvenda { get; set; }
        public Nullable<double> v_markup { get; set; }
        public Nullable<double> v_taxaA { get; set; }
        public Nullable<double> v_taxaB { get; set; }
        public Nullable<int> v_numeropessoas { get; set; }
        public Nullable<int> v_disponibilidade { get; set; }
        public Nullable<double> v_valortotalpvp { get; set; }
        public Nullable<double> v_valorporpessoapvp { get; set; }
        public string v_pagamento { get; set; }
        public Nullable<System.DateTime> v_datapagamento { get; set; }
        public string f_nome { get; set; }
        public string c_nome { get; set; }
        public string i_taxa { get; set; }
        public string tc_nome { get; set; }

    }
}