﻿using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TTOrcamentos2.Model {
    public static class DB {
        static private string connectionString = "mongodb://Someconnection:Breakup0147.@ds117156.mlab.com:17156/touchgroup_beta";
        
        static private MongoClient client = new MongoClient(connectionString);

        static public IMongoDatabase Database { get; set; } = client.GetDatabase("touchgroup_beta");
        
        static public IMongoCollection<Fornecedor> Fornecedor { get; set; } = Database.GetCollection<Fornecedor>("Fornecedor");
        static public IMongoCollection<Usertype> Usertype { get; set; } = Database.GetCollection<Usertype>("Usertype");
        static public IMongoCollection<Users> User { get; set; } = Database.GetCollection<Users>("User");
        static public IMongoCollection<ProjectoTT> ProjectoTT { get; set; } = Database.GetCollection<ProjectoTT>("ProjectoTT");
        static public IMongoCollection<TipoFornecedor> TipoFornecedor { get; set; } = Database.GetCollection<TipoFornecedor>("TipoFornecedor");
        static public IMongoCollection<TypeOfCost> TypeOfCost { get; set; } = Database.GetCollection<TypeOfCost>("TypeOfCost");
        static public IMongoCollection<Estado> Estado { get; set; } = Database.GetCollection<Estado>("Estado");
        static public IMongoCollection<Country> Country { get; set; } = Database.GetCollection<Country>("Country");
        static public IMongoCollection<City> City { get; set; } = Database.GetCollection<City>("City");
        static public IMongoCollection<Tipo_Iva> Tipo_Iva { get; set; } = Database.GetCollection<Tipo_Iva>("Tipo_Iva");
        static public IMongoCollection<Ivas> Ivas { get; set; } = Database.GetCollection<Ivas>("Ivas");
        static public IMongoCollection<Cambio> Cambio { get; set; } = Database.GetCollection<Cambio>("Cambio");
        static public IMongoCollection<ServicosTT_Tipos> ServicosTT_Tipos { get; set; } = Database.GetCollection<ServicosTT_Tipos>("ServicosTT_Tipos");
        static public IMongoCollection<Quartos> Quartos { get; set; } = Database.GetCollection<Quartos>("Quartos");

        static public IMongoCollection<Orcamentos> Orcamentos { get; set; } = Database.GetCollection<Orcamentos>("Orcamentos");
        static public IMongoCollection<Ficheiros> Ficheiros { get; set; } = Database.GetCollection<Ficheiros>("Ficheiros");
        static public IMongoCollection<Voos> Voos { get; set; } = Database.GetCollection<Voos>("Voos");
        static public IMongoCollection<Diarias> Diarias { get; set; } = Database.GetCollection<Diarias>("Diarias");
        static public IMongoCollection<ServicoTT> ServicoTT { get; set; } = Database.GetCollection<ServicoTT>("ServicoTT");
        static public IMongoCollection<Alojamento> Alojamento { get; set; } = Database.GetCollection<Alojamento>("Alojamento");
        static public IMongoCollection<ReportFornecedores> ReportFornecedores { get; set; } = Database.GetCollection<ReportFornecedores>("ReportFornecedores");

        static public IMongoCollection<ProjectLog> ProjectLog { get; set; } = Database.GetCollection<ProjectLog>("ProjectLog");

        static public IMongoCollection<PagamentosCliente> PagamentosCliente { get; set; } = Database.GetCollection<PagamentosCliente>("PagamentosCliente");
        static public IMongoCollection<PagamentosFornecedor> PagamentosFornecedor { get; set; } = Database.GetCollection<PagamentosFornecedor>("PagamentosFornecedor");


        


    }
}