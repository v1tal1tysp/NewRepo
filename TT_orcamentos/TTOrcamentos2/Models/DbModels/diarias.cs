using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Models.DbModels
{
    public class diarias
    {
        public string diariaidv { get; set; }
        public string orcamentoidv { get; set; }
        public string fornecedoridv { get; set; }
        public string ivaidv { get; set; }
        public string tipocustoidv { get; set; }
        public string cambioidv { get; set; }
        public string d_nomeservico { get; set; }
        public Nullable<System.DateTime> d_data { get; set; }
        public Nullable<double> d_preco { get; set; }
        public Nullable<double> d_comissao { get; set; }
        public Nullable<double> d_net { get; set; }
        public Nullable<double> d_valorcambio { get; set; }
        public Nullable<double> d_valoreuros { get; set; }
        public Nullable<int> d_quantidade { get; set; }
        public Nullable<int> d_unidades { get; set; }
        public Nullable<double> d_margemvenda { get; set; }
        public Nullable<double> d_markup { get; set; }
        public string d_pagamento { get; set; }
        public Nullable<System.DateTime> d_datapagamento { get; set; }
        public Nullable<int> d_numeropessoas { get; set; }
        public Nullable<double> d_valortotalpvp { get; set; }
        public Nullable<double> d_valorporpessoapvp { get; set; }
        public string d_observacoes { get; set; }
    }
}