using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace TTOrcamentos2.Model {
    public class Fornecedor {
        private ObjectId Id { get; set; }
        private string TipoFornecedor { get; set; }
        private string Country { get; set; }
        private string cidade { get; set; }
        private string tipocusto { get; set; }
        private string nome { get; set; }
        private string nomecomercial { get; set; }
        private string morada { get; set; }
        private string localidade { get; set; }
        private string codigopostal { get; set; }
        private string telefone { get; set; }
        private string fax { get; set; }
        private string telemovel { get; set; }
        private string contacto { get; set; }
        private string email { get; set; }
        private string url { get; set; }
        private string contribuinte { get; set; }



        public Fornecedor(string TipoFornecedor, string Country, string cidade, string tipocusto, string nome, string nomecomercial, string morada, string localidade, string codigopostal, string telefone, string fax, string telemovel, string contacto, string email, string url, string contribuinte)
        {
            this.TipoFornecedor = TipoFornecedor;
            this.Country = Country;
            this.cidade = cidade;
            this.tipocusto = tipocusto;
            this.nome = nome;
            this.nomecomercial = nomecomercial;
            this.morada = morada;
            this.localidade = localidade;
            this.codigopostal = codigopostal;
            this.telefone = telefone;
            this.fax = fax;
            this.telemovel = telemovel;
            this.contacto = contacto;
            this.email = email;
            this.url = url;
            this.contribuinte = contribuinte;
            

        }

        public static bool Insert(string TipoFornecedor, string Country, string cidade, string tipocusto, string nome, string nomecomercial, string morada, string localidade, string codigopostal, string telefone, string fax, string telemovel, string contacto, string email, string url, string contribuinte)
        {
            try
            {
                Fornecedor newuser = new Fornecedor(TipoFornecedor, Country, cidade, tipocusto, nome, nomecomercial, morada, localidade, codigopostal,  telefone,  fax, telemovel,  contacto,  email,  url,  contribuinte);
                DB.Fornecedor.InsertOne(newuser);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Fornecedor" + e.ToString());
            }
        }
        
        public static bool Update(Fornecedor user)
        {
            try
            {
                DB.Fornecedor.ReplaceOne(c => c.Id == user.Id, user);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update Fornecedor :" + e.ToString());
            }
        }

        public static bool Delete(Fornecedor user)
        {
            try
            {
                DB.Fornecedor.DeleteOne(x => x.Id == user.Id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete Fornecedor :" + e.ToString());
            }
        }

    }
}