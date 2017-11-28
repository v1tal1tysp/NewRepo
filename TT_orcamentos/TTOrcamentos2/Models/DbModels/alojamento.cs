using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Models.DbModels
{
    public class alojamento
    {
        public string alojamentoidv { get; set; }
        public string orcamentoidv { get; set; }
        public string fornecedoridv { get; set; }
        public string quartoidv { get; set; }
        public string cambioidv { get; set; }
        public string ivaidv { get; set; }
        public string tipocustoidv { get; set; }
        public Nullable<double> a_preco { get; set; }
        public Nullable<double> a_comissao { get; set; }
        public Nullable<double> a_net { get; set; }
        public Nullable<double> a_valorcambio { get; set; }
        public Nullable<double> a_valoreuros { get; set; }
        public Nullable<int> a_numeronoites { get; set; }
        public Nullable<double> a_margemvenda { get; set; }
        public Nullable<double> a_markup { get; set; }
        public string a_pagamento { get; set; }
        public Nullable<System.DateTime> a_datapagamento { get; set; }
        public Nullable<int> a_numeroquartos { get; set; }
        public Nullable<int> a_numeropessoas { get; set; }
        public Nullable<double> a_valortotalpvp { get; set; }
        public Nullable<double> a_valorporpessoapvp { get; set; }
        public string a_observacoes { get; set; }
        public string a_opcao { get; set; }
    }
}