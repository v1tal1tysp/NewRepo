using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model {
    public class Diarias {
        public ObjectId Id { get; set; }
        public string orcamentoidv { get; set; }
        public string fornecedoridv { get; set; }
        public string fornecedorname { get; set; }
        public Ivas ivaidv { get; set; }
        public TypeOfCost tipocustoidv { get; set; }
        public Cambio cambioidv { get; set; }
        public string d_nomeservico { get; set; }
        public DateTime d_data { get; set; }
        public double d_preco { get; set; }
        public double d_comissao { get; set; }
        public double d_net { get; set; }
        public double d_valorcambio { get; set; }
        public double d_valoreuros { get; set; }
        public int d_quantidade { get; set; }
        public int d_unidades { get; set; }
        public double d_margemvenda { get; set; }
        public double d_markup { get; set; }
        public string d_pagamento { get; set; }
        public DateTime d_datapagamento { get; set; }
        public int d_numeropessoas { get; set; }
        public double d_valortotalpvp { get; set; }
        public double d_valorporpessoapvp { get; set; }
        public string d_observacoes { get; set; }
        public int DiariaAuxDia { get; set; }


        public Diarias(string orcamentoidv, string fornecedoridv, string fornecedorname, Ivas ivaidv, TypeOfCost tipocustoidv, Cambio cambioidv, string d_nomeservico, DateTime d_data, double d_preco, double d_comissao, double d_net, double d_valorcambio, double d_valoreuros, int d_quantidade, int d_unidades, double d_margemvenda, double d_markup, string d_pagamento, DateTime d_datapagamento, int d_numeropessoas, double d_valortotalpvp, double d_valorporpessoapvp, string d_observacoes,int DiariaAuxDia)
        {
            this.orcamentoidv = orcamentoidv;
            this.fornecedoridv = fornecedoridv;
            this.fornecedorname = fornecedorname;
            this.ivaidv = ivaidv;
            this.tipocustoidv = tipocustoidv;
            this.cambioidv = cambioidv;
            this.d_nomeservico = d_nomeservico;
            this.d_data = d_data;
            this.d_preco = d_preco;
            this.d_comissao = d_comissao;
            this.d_net = d_net;
            this.d_valorcambio = d_valorcambio;
            this.d_valoreuros = d_valoreuros;
            this.d_quantidade = d_quantidade;
            this.d_unidades = d_unidades;
            this.d_margemvenda = d_margemvenda;
            this.d_markup = d_markup;
            this.d_pagamento = d_pagamento;
            this.d_datapagamento = d_datapagamento;
            this.d_numeropessoas = d_numeropessoas;
            this.d_valortotalpvp = d_valortotalpvp;
            this.d_valorporpessoapvp = d_valorporpessoapvp;
            this.d_observacoes = d_observacoes;
            this.DiariaAuxDia = DiariaAuxDia;
        }


        public static Diarias Get(string id)
        {
            try
            {
                ObjectId nid = ObjectId.Parse(id);
                Diarias pais = DB.Diarias.Find(x => x.Id == nid).FirstOrDefault();
                if (pais != null)
                {
                    return pais;
                }

                return null;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Diarias" + e.ToString());
            }
        }

        public static bool Insert(string orcamentoidv, string fornecedoridv, string fornecedorname, Ivas ivaidv, TypeOfCost tipocustoidv, Cambio cambioidv, string d_nomeservico, DateTime d_data, double d_preco, double d_comissao, double d_net, double d_valorcambio, double d_valoreuros, int d_quantidade, int d_unidades, double d_margemvenda, double d_markup, string d_pagamento, DateTime d_datapagamento, int d_numeropessoas, double d_valortotalpvp, double d_valorporpessoapvp, string d_observacoes, int DiariaAuxDia)
        {
            try
            {
                Diarias cntr = new Diarias(orcamentoidv, fornecedoridv, fornecedorname, ivaidv, tipocustoidv, cambioidv, d_nomeservico, d_data, d_preco, d_comissao, d_net, d_valorcambio, d_valoreuros, d_quantidade, d_unidades, d_margemvenda, d_markup, d_pagamento, d_datapagamento, d_numeropessoas, d_valortotalpvp, d_valorporpessoapvp, d_observacoes, DiariaAuxDia);
                DB.Diarias.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Diarias" + e.ToString());
            }
        }

        public static bool Insert(Diarias Diaria)
        {
            try
            {

                DB.Diarias.InsertOne(Diaria);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Diarias" + e.ToString());
            }
        }

        public static bool Update(Diarias Diarias)
        {
            try
            {
                DB.Diarias.ReplaceOne(c => c.Id == Diarias.Id, Diarias);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update Diarias :" + e.ToString());
            }
        }

        public static bool Delete(Diarias voos)
        {
            try
            {
                DB.Diarias.DeleteOne(x => x.Id == voos.Id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete Diarias :" + e.ToString());
            }
        }

        public static List<Diarias> GetAll(string idOrca)
        {
            List<Diarias> lista = new List<Diarias>();
            try
            {
                var filter = Builders<Diarias>.Filter.Where(x => x.orcamentoidv == idOrca);
                lista = DB.Diarias.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro getall Diarias " + e.ToString());
            }
        }



    }
}