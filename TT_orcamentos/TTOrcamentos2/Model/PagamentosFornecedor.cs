using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model {
    public class PagamentosFornecedor {

        [BsonId]
        public ObjectId Id { get; set; }
        public string projectoid { get; set; }
        public string fornecedor { get; set; }
        public DateTime data { get; set; }
        public double valor { get; set; }
        public string Namefile { get; set; }
        public string Filepath { get; set; }
        public string Nota { get; set; }
        public Tipo_Iva tipoivaidv { get; set; }
        public Ivas ivaidv { get; set; }
        public Cambio cambioidv { get; set; }

        public PagamentosFornecedor(string projectoid, string fornecedor, DateTime data, double valor, string Namefile, string Filepath, Tipo_Iva tipoivaidv, Ivas ivaidv, Cambio cambioidv)
        {
            this.projectoid = projectoid;
            this.fornecedor = fornecedor;
            this.data = data;
            this.valor = valor;
            this.Namefile = Namefile;
            this.Filepath = Filepath;
            this.cambioidv = cambioidv;
            this.ivaidv = ivaidv;
            this.tipoivaidv = tipoivaidv;
        }

        public static bool Insert(string projectoid, string fornecedor, DateTime data, double valor, string Namefile, string Filepath, Tipo_Iva tipoivaidv, Ivas ivaidv, Cambio cambioidv)
        {
            try
            {
                PagamentosFornecedor cntr = new PagamentosFornecedor(projectoid, fornecedor, data, valor, Namefile, Filepath, tipoivaidv, ivaidv, cambioidv);
                DB.PagamentosFornecedor.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {
                
                throw new Exception("Erro Inserir PagamentosCliente" + e.ToString());
            }
        }

        public static bool Insert(PagamentosFornecedor pagemento)
        {
            try
            {
                DB.PagamentosFornecedor.InsertOne(pagemento);
                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir PagamentosCliente" + e.ToString());
            }
        }


        public static bool Clean()
        {
            try
            {
                var filter = Builders<PagamentosFornecedor>.Filter.Empty;
                DB.PagamentosFornecedor.DeleteMany(filter);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete PagamentosCliente :" + e.ToString());
            }
        }

        public static List<PagamentosFornecedor> GetAll(string projectoidv)
        {
            List<PagamentosFornecedor> lista = new List<PagamentosFornecedor>();
            try
            {
                var filter = Builders<PagamentosFornecedor>.Filter.Where(x => x.projectoid == projectoidv);

                lista = DB.PagamentosFornecedor.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Pesquisar PagamentosFornecedor " + e.ToString());
            }
        }
    }
}