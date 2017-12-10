using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model {

    public class ServicoTT {
        public ObjectId Id { get; set; }
        public string orcamentoidv { get; set; }
        public string fornecedoridv { get; set; }
        public string fornecedornome { get; set; }
        public Ivas ivaidv { get; set; }
        public TypeOfCost tipocustoidv { get; set; }
        public Cambio cambioidv { get; set; }
        public string servicottidv { get; set; }
        public string s_nomeservico { get; set; }
        public double s_preco { get; set; }
        public double s_comissao { get; set; }
        public double s_net { get; set; }
        public double s_valorcambio { get; set; }
        public double s_valoreuros { get; set; }
        public int s_quantidade { get; set; }
        public int s_unidades { get; set; }
        public double s_margemvenda { get; set; }
        public double s_markup { get; set; }
        public string s_pagamento { get; set; }
        public DateTime s_datapagamento { get; set; }
        public int s_numeropessoas { get; set; }
        public double s_valortotalpvp { get; set; }
        public double s_valorporpessoapvp { get; set; }
        public string s_observacoes { get; set; }




        public ServicoTT(string orcamentoidv, string fornecedoridv, string fornecedornome, Ivas ivaidv, TypeOfCost tipocustoidv, Cambio cambioidv, string servicottidv, string s_nomeservico, double s_preco, double s_comissao, double s_net, double s_valorcambio, double s_valoreuros, int s_quantidade, int s_unidades, double s_margemvenda, double s_markup, string s_pagamento, DateTime s_datapagamento, int s_numeropessoas, double s_valortotalpvp, double s_valorporpessoapvp, string s_observacoes)
        {
            this.orcamentoidv = orcamentoidv;
            this.fornecedoridv = fornecedoridv;
            this.fornecedornome = fornecedornome;
            this.ivaidv = ivaidv;
            this.tipocustoidv = tipocustoidv;
            this.cambioidv = cambioidv;
            this.servicottidv = servicottidv;
            this.s_nomeservico = s_nomeservico;
            this.s_preco = s_preco;
            this.s_comissao = s_comissao;
            this.s_net = s_net;
            this.s_valorcambio = s_valorcambio;
            this.s_valoreuros = s_valoreuros;
            this.s_quantidade = s_quantidade;
            this.s_unidades = s_unidades;
            this.s_margemvenda = s_margemvenda;
            this.s_markup = s_markup;
            this.s_pagamento = s_pagamento;
            this.s_datapagamento = s_datapagamento;
            this.s_numeropessoas = s_numeropessoas;
            this.s_valortotalpvp = s_valortotalpvp;
            this.s_valorporpessoapvp = s_valorporpessoapvp;
            this.s_observacoes = s_observacoes;
        }


        public static ServicoTT Get(string id)
        {
            try
            {
                ObjectId nid = ObjectId.Parse(id);
                ServicoTT pais = DB.ServicoTT.Find(x => x.Id == nid).FirstOrDefault();
                if (pais != null)
                {
                    return pais;
                }

                return null;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir ServicoTT" + e.ToString());
            }
        }

        public static bool Insert(string orcamentoidv, string fornecedoridv, string fornecedornome, Ivas ivaidv, TypeOfCost tipocustoidv, Cambio cambioidv, string servicottidv, string s_nomeservico, double s_preco, double s_comissao, double s_net, double s_valorcambio, double s_valoreuros, int s_quantidade, int s_unidades, double s_margemvenda, double s_markup, string s_pagamento, DateTime s_datapagamento, int s_numeropessoas, double s_valortotalpvp, double s_valorporpessoapvp, string s_observacoes)
        {
            try
            {
                ServicoTT cntr = new ServicoTT(orcamentoidv, fornecedoridv, fornecedornome, ivaidv, tipocustoidv, cambioidv, servicottidv, s_nomeservico, s_preco, s_comissao, s_net, s_valorcambio, s_valoreuros, s_quantidade, s_unidades, s_margemvenda, s_markup, s_pagamento, s_datapagamento, s_numeropessoas, s_valortotalpvp, s_valorporpessoapvp, s_observacoes);
                DB.ServicoTT.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir ServicoTT" + e.ToString());
            }
        }

        public static bool Insert(ServicoTT Diaria)
        {
            try
            {

                DB.ServicoTT.InsertOne(Diaria);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir ServicoTT" + e.ToString());
            }
        }

        public static bool Update(ServicoTT Diarias)
        {
            try
            {
                DB.ServicoTT.ReplaceOne(c => c.Id == Diarias.Id, Diarias);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update ServicoTT :" + e.ToString());
            }
        }

        public static bool Delete(ServicoTT voos)
        {
            try
            {
                DB.ServicoTT.DeleteOne(x => x.Id == voos.Id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete ServicoTT :" + e.ToString());
            }
        }

        public static List<ServicoTT> GetAll(string idOrca)
        {
            List<ServicoTT> lista = new List<ServicoTT>();
            try
            {
                var filter = Builders<ServicoTT>.Filter.Where(x => x.orcamentoidv == idOrca);
                lista = DB.ServicoTT.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro getall Diarias " + e.ToString());
            }
        }




    }
}