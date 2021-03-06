﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace TTOrcamentos2.Model {
    public class Orcamentos {

        [BsonId]
        public ObjectId Id { get; set; }
        public string projectoidv { get; set; }
        public Estado estado { get; set; }
        public double c_valor { get; set; }
        public string o_nome { get; set; }
        public DateTime o_datacriacao { get; set; }
        public DateTime o_datainicio { get; set; }
        public int o_numeropessoas { get; set; }
        public int o_numerodias { get; set; }
        public int o_numeronoites { get; set; }
        public double o_margemvenda { get; set; }
        public double o_markup { get; set; }
        public string o_descricao { get; set; }
        public bool active { get; set; }
        public string parrentorcamentoidv { get; set; }
        public int Versao { get; set; }
        public bool pe { get; set; }
        public DateTime DataUpdate { get; set; }

        public Orcamentos(string projectoidv, Estado estadoidv, double c_valor, string o_nome, DateTime o_datacriacao, DateTime o_datainicio, int o_numeropessoas, int o_numerodias, int o_numeronoites, double o_margemvenda, double o_markup, string o_descricao, string active, string parrentorcamentoidv, int Versao, bool pe, DateTime DataUpdate)
        {
            this.projectoidv = projectoidv;
            this.estado = estadoidv;
            this.c_valor = c_valor;
            this.o_nome = o_nome;
            this.o_datacriacao = o_datacriacao;
            this.o_datainicio = o_datainicio;
            this.o_numeropessoas = o_numeropessoas;
            this.o_numerodias = o_numerodias;
            this.o_numeronoites = o_numeronoites;
            this.o_margemvenda = o_margemvenda;
            this.o_markup = o_markup;
            this.o_descricao = o_descricao;
            this.active = true;
            this.parrentorcamentoidv = parrentorcamentoidv;
            this.Versao = Versao;
            this.pe = pe;
            this.DataUpdate = DataUpdate;

        }

        public static bool Insert(string projectoidv, Estado estadoidv, double c_valor, string o_nome, DateTime o_datacriacao, DateTime o_datainicio, int o_numeropessoas, int o_numerodias, int o_numeronoites, double o_margemvenda, double o_markup, string o_descricao, string active, string parrentorcamentoidv, int Versao, bool pe, DateTime DataUpdate)
        {
            try
            {
                Orcamentos cntr = new Orcamentos(projectoidv, estadoidv, c_valor, o_nome, o_datacriacao, o_datainicio, o_numeropessoas, o_numerodias, o_numeronoites, o_margemvenda, o_markup, o_descricao, active, parrentorcamentoidv, Versao, pe, DataUpdate);
                DB.Orcamentos.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir Orcamentos" + e.ToString());
            }
        }


        public static bool Insert(Orcamentos proj, out string id)
        {
            
            try
            {
                proj.Id = ObjectId.GenerateNewId();
                
                DB.Orcamentos.InsertOne(proj);
                id = proj.Id.ToString();

                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Inserir Orcamentos : " + e.ToString());
            }
        }

        public static bool Update(Orcamentos Estado)
        {
            try
            {
                DB.Orcamentos.ReplaceOne(c => c.Id == Estado.Id, Estado);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Update Orcamentos :" + e.ToString());
            }
        }

        public static void UpdateActivity(string idorcamento)
        {
            try
            {


                ObjectId neid = new ObjectId(idorcamento);

                var filter = Builders<Orcamentos>.Filter.Where(_ => _.Id == neid || _.parrentorcamentoidv == idorcamento);
                var update = Builders<Orcamentos>.Update.Set(_ => _.active, false);
  
                DB.Orcamentos.UpdateMany(filter, update, null);

            }
            catch (Exception e)
            {
                throw new Exception("Erro Update Projecto :" + e.ToString());
            }
        }

        public static bool Delete(Orcamentos Estado)
        {
            try
            {
                DB.Orcamentos.DeleteOne(x => x.Id == Estado.Id);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete Orcamentos :" + e.ToString());
            }
        }

        public static bool Clean()
        {
            try
            {
                var filter = Builders<Orcamentos>.Filter.Empty;
                DB.Orcamentos.DeleteMany(filter);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete Orcamentos :" + e.ToString());
            }
        }

        public static List<Orcamentos> GetAll()
        {
            List<Orcamentos> lista = new List<Orcamentos>();
            try
            {
                var filter = Builders<Orcamentos>.Filter.Where(x => x.active == true && x.pe == false);

                lista = DB.Orcamentos.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Pesquisar Orcamentos " + e.ToString());
            }
        }

    }
}