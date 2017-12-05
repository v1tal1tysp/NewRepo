using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model {



    public class ProjectoTT {
        [BsonId]
        public ObjectId Id { get; set; }
        public Estado estado { get; set; }
        public string sigav { get; set; }
        public string Nome { get; set; }
        public string descricao { get; set; }
        public string ClienteId { get; set; }
        public string Cliente { get; set; }
        public string AccountManagerId { get; set; }
        public string AccountManager { get; set; }
        public string DesignerId { get; set; }
        public string Designer { get; set; }
        public DateTime DataEntrada { get; set; }
        public string NomeContacto { get; set; }

        


        public ProjectoTT()
        {

        }


        public ProjectoTT(Estado estado, string sigav, string nome, string p_descricao, string ClienteId, string Cliente, string AccountManagerId, string AccountManager, string DesignerId, string Designer, DateTime dataentrada, string NomeContacto)
        {
            
            this.estado = estado;
            this.sigav = sigav;
            this.Nome = nome;
            this.descricao = p_descricao;
            this.Cliente = Cliente;
            this.ClienteId = ClienteId;
            this.AccountManagerId = AccountManagerId;
            this.AccountManager = AccountManager;
            this.Designer = Designer;
            this.DesignerId = DesignerId;
            this.DataEntrada = dataentrada;
            this.NomeContacto = NomeContacto;

        }

        public bool Insert(Estado estado, string sigav, string nome, string p_descricao, string ClienteId, string Cliente, string AccountManagerId, string AccountManager, string DesignerId, string Designer, DateTime dataentrada, string NomeContacto)
        {
            try
            {
                ProjectoTT newObj = new ProjectoTT(estado, sigav, nome, p_descricao, ClienteId, Cliente, AccountManagerId, AccountManager, DesignerId, Designer, dataentrada, NomeContacto);
                DB.ProjectoTT.InsertOne(newObj);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Projecto : " + e.ToString());
            }
        }

        public static bool Insert(ProjectoTT proj, out string id)
        {

            try
            {
                proj.Id = ObjectId.GenerateNewId();
                id = proj.Id.ToString();

                DB.ProjectoTT.InsertOne(proj);

                var teste = proj.Id.ToString();
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Projecto : " + e.ToString());
            }
        }

        public bool Update(ProjectoTT proj)
        {
            try
            {
                DB.ProjectoTT.ReplaceOne(c => c.Id == proj.Id, proj);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update Projecto :" + e.ToString());
            }
        }

        public bool Delete(ProjectoTT proj)
        {
            try
            {
                DB.ProjectoTT.DeleteOne(x => x.Id == proj.Id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete Projecto :" + e.ToString());
            }
        }

        public static ProjectoTT Get(string projid)
        {
            try
            {
                ObjectId nid = new ObjectId(projid);
                var filter = Builders<ProjectoTT>.Filter.Where(x => x.Id == nid);

                var lista = DB.ProjectoTT.Find(filter).FirstOrDefault();
                
                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete Projecto :" + e.ToString());
            }
        }


        public static List<ProjectoTT> GetAll()
        {
            List<ProjectoTT> lista = new List<ProjectoTT>();
            try
            {
                var filter = Builders<ProjectoTT>.Filter.Empty;
                lista =  DB.ProjectoTT.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Pesquisar ProjectoTT " + e.ToString());
            }
        }


    }
}