﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;


namespace TTOrcamentos2.Model {
    public class PagamentosCliente {
        [BsonId]
        public ObjectId Id { get; set; }
        public string projectoid { get; set; }
        public string fornecedor { get; set; }
        public string projectname { get; set; }
        public DateTime data { get; set; }
        public double valor { get; set; }
        public string Namefile { get; set; }
        public string Filepath { get; set; }
        public string Nota { get; set; }
        public Tipo_Iva tipoivaidv { get; set; }
        public Ivas ivaidv { get; set; }
        public Cambio cambioidv { get; set; }

        public PagamentosCliente(string projectoid , string fornecedor,DateTime data,double valor, string Namefile, string Filepath, Tipo_Iva tipoivaidv, Ivas ivaidv, Cambio cambioidv)
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
                PagamentosCliente cntr = new PagamentosCliente(projectoid, fornecedor, data, valor, Namefile, Filepath, tipoivaidv, ivaidv, cambioidv);
                DB.PagamentosCliente.InsertOne(cntr);

                return true;
            }
            catch (Exception e)
            {

                throw new Exception("Erro Inserir PagamentosCliente" + e.ToString());
            }
        }

        public static bool Insert(PagamentosCliente pagemento)
        {
            try
            {
                DB.PagamentosCliente.InsertOne(pagemento);
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
                var filter = Builders<PagamentosCliente>.Filter.Empty;
                DB.PagamentosCliente.DeleteMany(filter);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("Erro delete PagamentosCliente :" + e.ToString());
            }
        }

        public static List<PagamentosCliente> GetAll(string projectoidv)
        {
            List<PagamentosCliente> lista = new List<PagamentosCliente>();
            try
            {
                var filter = Builders<PagamentosCliente>.Filter.Where(x => x.projectoid == projectoidv);

                lista = DB.PagamentosCliente.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Pesquisar PagamentosCliente " + e.ToString());
            }
        }



        public static List<PagamentosCliente> GetAllByfornecedor(string fornecedorid)
        {
            List<PagamentosCliente> lista = new List<PagamentosCliente>();
            try
            {
                var filter = Builders<PagamentosCliente>.Filter.Where(x => x.fornecedor == fornecedorid);

                lista = DB.PagamentosCliente.Find(filter).ToList();

                return lista;
            }
            catch (Exception e)
            {
                throw new Exception("Erro Pesquisar PagamentosCliente " + e.ToString());
            }
        }

        
    }
}