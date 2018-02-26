using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model
{
    public class ReportFornecedores
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string FornecedorId { get; set; }
        public string FornecedorName { get; set; }
        public string FornecedorNameCliente { get; set; }
        public string NomeFile { get; set; }
        public string Nomeorcamento { get; set; }
        public string ProjectoId { get; set; }
        public string OrcamentoId { get; set; }
        public List<Servicos> servicos { get; set; }
        public double Total { get; set; }
        public bool   Active { get; set; }
        public string TipoMovimento { get; set; }
        public int Ano { get; set; }


        public ReportFornecedores(string _FornecedorId, string _FornecedorName, string FornecedorNameCliente, string NomeFile,string Nomeorcamento, string _ProjectoId, string _OrcamentoId, List<Servicos> _servicos, double _Total, bool _ative, string _TipoMovimento, int Ano)
        {
            this.FornecedorId = _FornecedorId;
            this.FornecedorName = _FornecedorName;
            this.FornecedorNameCliente = FornecedorNameCliente;
            this.NomeFile = NomeFile;
            this.ProjectoId = _ProjectoId;
            this.OrcamentoId = _OrcamentoId;
            this.servicos = _servicos;
            this.Total = _Total;
            this.Active = _ative;
            this.TipoMovimento = _TipoMovimento;
            this.Ano = Ano;
            this.Nomeorcamento = Nomeorcamento;
        }


        public static bool Insert(string _FornecedorId, string _FornecedorName, string FornecedorNameCliente, string _NomeFile, string Nomeorcamento, string _ProjectoId, string _OrcamentoId, List<Servicos> _servicos, double _Total, bool _ative, string _TipoMovimento, int Ano)
        {
            try
            {
                ReportFornecedores cntr = new ReportFornecedores(_FornecedorId, _FornecedorName, FornecedorNameCliente, _NomeFile, Nomeorcamento, _ProjectoId, _OrcamentoId, _servicos, _Total, _ative, _TipoMovimento, Ano);
                DB.ReportFornecedores.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir ReportFornecedores" + e.ToString());
            }
        }
        public static bool Insert(ReportFornecedores cambio)
        {
            try
            {
                //DeleteByProjecto(cambio.ProjectoId,cambio.FornecedorId);
                DB.ReportFornecedores.InsertOne(cambio);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir ReportFornecedores" + e.ToString());
            }
        }

        public static void DeleteByProjecto(string project, string fornecedorid)
        {

            try
            {
                DB.ReportFornecedores.DeleteMany(x => x.ProjectoId == project && x.FornecedorId == fornecedorid);
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete ReportFornecedores " + e.ToString());
            }
        }

        public static bool Update(JObject ReportFornecedores)
        {
            try
            {
                ObjectId otalId = ObjectId.Parse(ReportFornecedores.GetValue("_id").ToString());
                ReportFornecedores aux = ReportFornecedores.ToObject<ReportFornecedores>();
                aux.Id = otalId;


                DB.ReportFornecedores.ReplaceOne(x => x.Id == aux.Id, aux);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update ReportFornecedores :" + e.ToString());
            }
        }


        public static bool Clean()
        {
            try
            {
                var filter = Builders<ReportFornecedores>.Filter.Empty;
                DB.ReportFornecedores.DeleteMany(filter);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete ReportFornecedores :" + e.ToString());
            }
        }



        public static bool Delete(ReportFornecedores Cambio)
        {
            try
            {
                DB.ReportFornecedores.DeleteOne(x => x.Id == Cambio.Id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete ReportFornecedores :" + e.ToString());
            }
        }

        public static List<ReportFornecedores> GetAll(string fornecedorid)
        {
            List<ReportFornecedores> lista = new List<ReportFornecedores>();
            try
            {
                var filter = Builders<ReportFornecedores>.Filter.Where(x => x.FornecedorId == fornecedorid);
                lista = DB.ReportFornecedores.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro getAll ReportFornecedores " + e.ToString());
            }
        }

    }

    public class Servicos
    {
        public string Name { get; set; }
        public string Valor { get; set; }
        public string Cambio { get; set; }
    }
}