using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Models.DbModels
{
    public class servicos
    {
        public string servicoidv { get; set; }
        public string orcamentoidv { get; set; }
        public string fornecedoridv { get; set; }
        public string ivaidv { get; set; }
        public string tipocustoidv { get; set; }
        public string cambioidv { get; set; }
        public string servicottidv { get; set; }
        public string s_nomeservico { get; set; }
        public Nullable<double> s_preco { get; set; }
        public Nullable<double> s_comissao { get; set; }
        public Nullable<double> s_net { get; set; }
        public Nullable<double> s_valorcambio { get; set; }
        public Nullable<double> s_valoreuros { get; set; }
        public Nullable<int> s_quantidade { get; set; }
        public Nullable<int> s_unidades { get; set; }
        public Nullable<double> s_margemvenda { get; set; }
        public Nullable<double> s_markup { get; set; }
        public string s_pagamento { get; set; }
        public Nullable<System.DateTime> s_datapagamento { get; set; }
        public Nullable<int> s_numeropessoas { get; set; }
        public Nullable<double> s_valortotalpvp { get; set; }
        public Nullable<double> s_valorporpessoapvp { get; set; }
        public string s_observacoes { get; set; }
    }
}