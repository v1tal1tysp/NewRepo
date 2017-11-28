using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model {
    public class ProjectoTT {
        private ObjectId Id { get; set; }
        private Estado estado { get; set; }
        private string sigav { get; set; }
        private string Nome { get; set; }
        private string descricao { get; set; }
        private Fornecedor Cliente { get; set; }
        private Users AccountManager { get; set; }
        private Users Designer { get; set; }
        private DateTime DataEntrada { get; set; }
        private string NomeContacto { get; set; }

        public ProjectoTT(Estado estado, string sigav, string nome, string p_descricao, Fornecedor Cliente, Users AccountManager, Users Designer, DateTime dataentrada, string NomeContacto)
        {
            this.estado = estado;
            this.sigav = sigav;
            this.Nome = nome;
            this.descricao = p_descricao;
            this.Cliente = Cliente;
            this.AccountManager = AccountManager;
            this.Designer = Designer;
            this.DataEntrada = dataentrada;
            this.NomeContacto = NomeContacto;

        }

        public bool Insert(Estado estado, string sigav, string nome, string p_descricao, Fornecedor Cliente, Users AccountManager, Users Designer, DateTime dataentrada, string NomeContacto)
        {
            try
            {
                ProjectoTT newObj = new ProjectoTT(estado, sigav, nome, p_descricao, Cliente, AccountManager, Designer, dataentrada, NomeContacto);
                DB.ProjectosTT.InsertOne(newObj);
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
                DB.ProjectosTT.ReplaceOne(c => c.Id == proj.Id, proj);
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
                DB.ProjectosTT.DeleteOne(x => x.Id == proj.Id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete Projecto :" + e.ToString());
            }
        }
    }
}