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
        public IvasIntern ivaidv { get; set; }
        public TypeOfCostIntern tipocustoidv { get; set; }
        public CambioIntern cambioidv { get; set; }
        public string nomeservico { get; set; }
        public DateTime data { get; set; }
        public double preco { get; set; }
        public double comissao { get; set; }
        public double net { get; set; }
        public double valorcambio { get; set; }
        public double valoreuros { get; set; }
        public int quantidade { get; set; }
        public int unidades { get; set; }
        public double margemvenda { get; set; }
        public double markup { get; set; }
        public int numeropessoas { get; set; }
        public double valortotalpvp { get; set; }
        public double valorporpessoapvp { get; set; }
        public string observacoes { get; set; }
        public int DiariaAuxDia { get; set; }


        public Diarias(string orcamentoidv, string fornecedoridv, string fornecedorname, IvasIntern ivaidv, TypeOfCostIntern tipocustoidv, CambioIntern cambioidv, string d_nomeservico, DateTime d_data, double d_preco, double d_comissao, double d_net, double d_valorcambio, double d_valoreuros, int d_quantidade, int d_unidades, double d_margemvenda, double d_markup, int d_numeropessoas, double d_valortotalpvp, double d_valorporpessoapvp, string d_observacoes,int DiariaAuxDia)
        {
            this.orcamentoidv = orcamentoidv;
            this.fornecedoridv = fornecedoridv;
            this.fornecedorname = fornecedorname;
            this.ivaidv = ivaidv;
            this.tipocustoidv = tipocustoidv;
            this.cambioidv = cambioidv;
            this.nomeservico = d_nomeservico;
            this.data = d_data;
            this.preco = d_preco;
            this.comissao = d_comissao;
            this.net = d_net;
            this.valorcambio = d_valorcambio;
            this.valoreuros = d_valoreuros;
            this.quantidade = d_quantidade;
            this.unidades = d_unidades;
            this.margemvenda = d_margemvenda;
            this.markup = d_markup;
            this.numeropessoas = d_numeropessoas;
            this.valortotalpvp = d_valortotalpvp;
            this.valorporpessoapvp = d_valorporpessoapvp;
            this.observacoes = d_observacoes;
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

        public static bool Insert(string orcamentoidv, string fornecedoridv, string fornecedorname, IvasIntern ivaidv, TypeOfCostIntern tipocustoidv, CambioIntern cambioidv, string d_nomeservico, DateTime d_data, double d_preco, double d_comissao, double d_net, double d_valorcambio, double d_valoreuros, int d_quantidade, int d_unidades, double d_margemvenda, double d_markup, int d_numeropessoas, double d_valortotalpvp, double d_valorporpessoapvp, string d_observacoes, int DiariaAuxDia)
        {
            try
            {
                Diarias cntr = new Diarias(orcamentoidv, fornecedoridv, fornecedorname, ivaidv, tipocustoidv, cambioidv, d_nomeservico, d_data, d_preco, d_comissao, d_net, d_valorcambio, d_valoreuros, d_quantidade, d_unidades, d_margemvenda, d_markup, d_numeropessoas, d_valortotalpvp, d_valorporpessoapvp, d_observacoes, DiariaAuxDia);
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