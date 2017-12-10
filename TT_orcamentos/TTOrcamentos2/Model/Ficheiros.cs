using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model {
    public class Ficheiros {

        public ObjectId Id { get; set; }
        public string Namefile { get; set; }
        public string Filepath { get; set; }
        public DateTime DataCriacao { get; set; }
        public string projectoID { get; set; }
        public string orcamentoID { get; set; }
        public int TipoFicheiro { get; set; }

        public Ficheiros(string Namefile, string Filepath, DateTime DataCriacao, string projectoID, string orcamentoID, int TipoFicheiro)
        {
            this.Namefile = Namefile;
            this.Filepath = Filepath;
            this.DataCriacao = DataCriacao;
            this.projectoID = projectoID;
            this.orcamentoID = orcamentoID;
            this.TipoFicheiro = TipoFicheiro;
        }

        public static bool Insert(string Namefile, string Filepath, DateTime DataCriacao, string projectoID, string orcamentoID, int TipoFicheiro)
        {
            try
            {
                Ficheiros cntr = new Ficheiros( Namefile,  Filepath, DataCriacao, projectoID, orcamentoID,  TipoFicheiro);
                DB.Ficheiros.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Ficheiros" + e.ToString());
            }
        }


        public static bool Insert(Ficheiros proj, out string id)
        {

            try
            {
                proj.Id = ObjectId.GenerateNewId();

                DB.Ficheiros.InsertOne(proj);
                id = proj.Id.ToString();

                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Ficheiros : " + e.ToString());
            }
        }

        public static bool Update(Ficheiros fich)
        {
            try
            {
                DB.Ficheiros.ReplaceOne(c => c.Id == fich.Id, fich);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update Ficheiros :" + e.ToString());
            }
        }


        public static bool Delete(Ficheiros Estado)
        {
            try
            {
                DB.Orcamentos.DeleteOne(x => x.Id == Estado.Id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete Ficheiros :" + e.ToString());
            }
        }

        public static List<Ficheiros> GetAll(string projectoidv)
        {
            List<Ficheiros> lista = new List<Ficheiros>();
            try
            {
                var filter = Builders<Ficheiros>.Filter.Where(x => x.projectoID == projectoidv || x.orcamentoID == projectoidv);

                lista = DB.Ficheiros.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Pesquisar Ficheiros " + e.ToString());
            }
        }
    }
}