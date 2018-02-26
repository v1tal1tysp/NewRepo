using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TTOrcamentos2.Model;

namespace TTOrcamentos2.Model {

    public class CambioIntern {
        public int inId { get; set; }
        public string name { get; set; }
        public double value { get; set; }
    }

    public class IvasIntern {
        public string name { get; set; }
        public int inId { get; set; }
    }

    public class TypeOfCostIntern {
        public string name { get; set; }
        public int inId { get; set; }
    }


    public class SaveRecordsModel {
        public List<Alojamento> ArrAloj { get; set; }
        public List<Voos> ArrVoos { get; set; }
        public List<Diarias> ArrDiarias { get; set; }
        public List<ServicoTT> ArrServicos { get; set; }
    }



    public class Voos {

        public ObjectId Id { get; set; }
        public string orcamentoidv { get; set; }
        public string fornecedoridv { get; set; }
        public string VoosFornecedor { get; set; }
        public CambioIntern cambioidv { get; set; }
        public IvasIntern ivaidv { get; set; }
        public TypeOfCostIntern tipocustoidv { get; set; }
        public string partida { get; set; }
        public string destino { get; set; }
        public string nomevoo { get; set; }
        public double preco { get; set; }
        public double comissao { get; set; }
        public double net { get; set; }
        public double valorcambio { get; set; }
        public double valoreuros { get; set; }
        public double margemvenda { get; set; }
        public double markup { get; set; }
        public double taxaA { get; set; }
        public double taxaB { get; set; }
        public int numeropessoas { get; set; }
        public int disponibilidade { get; set; }
        public double valortotalpvp { get; set; }
        public double valorporpessoapvp { get; set; }


        public Voos(string orcamentoidv, string fornecedoridv, string VoosFornecedor, CambioIntern cambioidv, IvasIntern ivaidv, TypeOfCostIntern tipocustoidv, string v_partida, string v_destino, string v_nomevoo, double v_preco, double v_comissao, double v_net, double v_valorcambio, double v_valoreuros, double v_margemvenda, double v_markup, double v_taxaA, double v_taxaB, int v_numeropessoas, int v_disponibilidade, double v_valortotalpvp, double v_valorporpessoapvp)
        {
            this.orcamentoidv = orcamentoidv;
            this.fornecedoridv = fornecedoridv;
            this.VoosFornecedor = VoosFornecedor;
            this.cambioidv = cambioidv;
            this.ivaidv = ivaidv;
            this.tipocustoidv =  tipocustoidv;
            this.partida = v_partida;
            this.destino = v_destino;
            this.nomevoo = v_nomevoo;
            this.preco = v_preco;
            this.comissao = v_comissao;
            this.net = v_net;
            this.valorcambio = v_valorcambio;
            this.valoreuros = v_valoreuros;
            this.margemvenda = v_margemvenda;
            this.markup = v_markup;
            this.taxaA = v_taxaA;
            this.taxaB = v_taxaB;
            this.numeropessoas = v_numeropessoas;
            this.disponibilidade = v_disponibilidade;
            this.valortotalpvp = v_valortotalpvp;
            this.valorporpessoapvp = v_valorporpessoapvp;
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

        public static bool Insert(string orcamentoidv, string fornecedoridv, string VoosFornecedor, CambioIntern cambioidv, IvasIntern ivaidv, TypeOfCostIntern tipocustoidv, string v_partida, string v_destino, string v_nomevoo, double v_preco, double v_comissao, double v_net, double v_valorcambio, double v_valoreuros, double v_margemvenda, double v_markup, double v_taxaA, double v_taxaB, int v_numeropessoas, int v_disponibilidade, double v_valortotalpvp, double v_valorporpessoapvp)
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

        public static bool Clean()
        {
            try
            {
                var filter = Builders<Voos>.Filter.Empty;
                DB.Voos.DeleteMany(filter);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete Voos :" + e.ToString());
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