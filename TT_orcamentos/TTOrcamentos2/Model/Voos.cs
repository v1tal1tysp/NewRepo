using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TTOrcamentos2.Model;

namespace TTOrcamentos2.Model {
    public class Voos {

        public ObjectId Id { get; set; }
        public string orcamentoidv { get; set; }
        public string fornecedoridv { get; set; }
        public string VoosFornecedor { get; set; }
        public Cambio cambioidv { get; set; }
        public Ivas ivaidv { get; set; }
        public TypeOfCost tipocustoidv { get; set; }
        public string v_partida { get; set; }
        public string v_destino { get; set; }
        public string v_nomevoo { get; set; }
        public double v_preco { get; set; }
        public double v_comissao { get; set; }
        public double v_net { get; set; }
        public double v_valorcambio { get; set; }
        public double v_valoreuros { get; set; }
        public double v_margemvenda { get; set; }
        public double v_markup { get; set; }
        public double v_taxaA { get; set; }
        public double v_taxaB { get; set; }
        public int v_numeropessoas { get; set; }
        public int v_disponibilidade { get; set; }
        public double v_valortotalpvp { get; set; }
        public double v_valorporpessoapvp { get; set; }


        public Voos(string orcamentoidv, string fornecedoridv, string VoosFornecedor, Cambio cambioidv, Ivas ivaidv, TypeOfCost tipocustoidv, string v_partida, string v_destino, string v_nomevoo, double v_preco, double v_comissao, double v_net, double v_valorcambio, double v_valoreuros, double v_margemvenda, double v_markup, double v_taxaA, double v_taxaB, int v_numeropessoas, int v_disponibilidade, double v_valortotalpvp, double v_valorporpessoapvp)
        {
            this.orcamentoidv = orcamentoidv;
            this.fornecedoridv = fornecedoridv;
            this.VoosFornecedor = VoosFornecedor;
            this.cambioidv = cambioidv;
            this.ivaidv = ivaidv;
            this.tipocustoidv =  tipocustoidv;
            this.v_partida = v_partida;
            this.v_destino = v_destino;
            this.v_nomevoo = v_nomevoo;
            this.v_preco = v_preco;
            this.v_comissao = v_comissao;
            this.v_net = v_net;
            this.v_valorcambio = v_valorcambio;
            this.v_valoreuros = v_valoreuros;
            this.v_margemvenda = v_margemvenda;
            this.v_markup = v_markup;
            this.v_taxaA = v_taxaA;
            this.v_taxaB = v_taxaB;
            this.v_numeropessoas = v_numeropessoas;
            this.v_disponibilidade = v_disponibilidade;
            this.v_valortotalpvp = v_valortotalpvp;
            this.v_valorporpessoapvp = v_valorporpessoapvp;
        }


        public static Voos Get(string id)
        {
            try
            {
                ObjectId nid = ObjectId.Parse(id);
                Voos pais = DB.Voos.Find(x => x.Id == nid).FirstOrDefault();
                if (pais != null)
                {
                    return pais;
                }

                return null;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Voos" + e.ToString());
            }
        }

        public static bool Insert(string orcamentoidv, string fornecedoridv, string VoosFornecedor, Cambio cambioidv, Ivas ivaidv, TypeOfCost tipocustoidv, string v_partida, string v_destino, string v_nomevoo, double v_preco, double v_comissao, double v_net, double v_valorcambio, double v_valoreuros, double v_margemvenda, double v_markup, double v_taxaA, double v_taxaB, int v_numeropessoas, int v_disponibilidade, double v_valortotalpvp, double v_valorporpessoapvp)
        {
            try
            {
                Voos cntr = new Voos(orcamentoidv, fornecedoridv, VoosFornecedor, cambioidv, ivaidv, tipocustoidv, v_partida, v_destino, v_nomevoo, v_preco, v_comissao, v_net,  v_valorcambio,  v_valoreuros,  v_margemvenda, v_markup,  v_taxaA,  v_taxaB,  v_numeropessoas,  v_disponibilidade, v_valortotalpvp, v_valorporpessoapvp);
                DB.Voos.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Voos" + e.ToString());
            }
        }

        public static bool Insert(Voos voo)
        {
            try
            {
                
                DB.Voos.InsertOne(voo);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Tipo_Iva" + e.ToString());
            }
        }

        public static bool Update(Voos voos)
        {
            try
            {
                DB.Voos.ReplaceOne(c => c.Id == voos.Id, voos);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update Voos :" + e.ToString());
            }
        }

        public static bool Delete(Voos voos)
        {
            try
            {
                DB.Voos.DeleteOne(x => x.Id == voos.Id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete voos :" + e.ToString());
            }
        }

        public static List<Voos> GetAll(string idOrca)
        {
            List<Voos> lista = new List<Voos>();
            try
            {
                var filter = Builders<Voos>.Filter.Where(x=> x.orcamentoidv == idOrca);
                lista = DB.Voos.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Voos " + e.ToString());
            }
        }


    }
}