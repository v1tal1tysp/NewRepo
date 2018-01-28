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
        public IvasIntern ivaidv { get; set; }
        public TypeOfCostIntern tipocustoidv { get; set; }
        public CambioIntern cambioidv { get; set; }
        public string servicottidv { get; set; }
        public string nomeservico { get; set; }
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




        public ServicoTT(string orcamentoidv, string fornecedoridv, string fornecedornome, IvasIntern ivaidv, TypeOfCostIntern tipocustoidv, CambioIntern cambioidv, string servicottidv, string nomeservico, double preco, double comissao, double net, double valorcambio, double valoreuros, int quantidade, int unidades, double margemvenda, double markup, int numeropessoas, double valortotalpvp, double valorporpessoapvp, string observacoes)
        {
            this.orcamentoidv = orcamentoidv;
            this.fornecedoridv = fornecedoridv;
            this.fornecedornome = fornecedornome;
            this.ivaidv = ivaidv;
            this.tipocustoidv = tipocustoidv;
            this.cambioidv = cambioidv;
            this.servicottidv = servicottidv;
            this.nomeservico = nomeservico;
            this.preco = preco;
            this.comissao = comissao;
            this.net = net;
            this.valorcambio = valorcambio;
            this.valoreuros = valoreuros;
            this.quantidade = quantidade;
            this.unidades = unidades;
            this.margemvenda = margemvenda;
            this.markup = markup;
            this.numeropessoas = numeropessoas;
            this.valortotalpvp = valortotalpvp;
            this.valorporpessoapvp = valorporpessoapvp;
            this.observacoes = observacoes;
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

        public static bool Insert(string orcamentoidv, string fornecedoridv, string fornecedornome, IvasIntern ivaidv, TypeOfCostIntern tipocustoidv, CambioIntern cambioidv, string servicottidv, string nomeservico, double preco, double comissao, double net, double valorcambio, double valoreuros, int quantidade, int unidades, double margemvenda, double markup, int numeropessoas, double valortotalpvp, double valorporpessoapvp, string observacoes)
        {
            try
            {
                ServicoTT cntr = new ServicoTT(orcamentoidv, fornecedoridv, fornecedornome, ivaidv, tipocustoidv, cambioidv, servicottidv, nomeservico, preco, comissao, net, valorcambio, valoreuros, quantidade, unidades, margemvenda, markup, numeropessoas, valortotalpvp, valorporpessoapvp, observacoes);
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