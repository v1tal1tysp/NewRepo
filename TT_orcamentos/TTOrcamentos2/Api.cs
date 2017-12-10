using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using TT_orcamentos.Models.classes;
using TTOrcamentos2.Models.DbModels;
using TTOrcamentos2.Models.SPs;
using TTOrcamentos2.Model;
using MongoDB.Driver;
using MongoDB.Bson;

namespace TT_orcamentos
{
    public class Api
    {
        public static List<dynamic> GetAllProjectos()
        {

            var listprj = ProjectoTT.GetAll();

            var listorcamentos = Orcamentos.GetAll();


            List<dynamic> ObjList = new List<dynamic>();

            foreach (var prj in listprj)
            {

                  foreach (var orc in listorcamentos)
                  {
                      if(prj.Id.ToString() == orc.projectoidv)
                      {

                        dynamic obj = new ExpandoObject();

                        obj.f_nome = prj.Cliente;
                        obj.p_nome = prj.Nome;
                        obj.projectoidv = prj.Id.ToString();
                        obj.p_descricao = prj.descricao;
                        obj.sigavidv = prj.sigav;
                        obj.orcamentoidv = orc.Id.ToString();
                        obj.o_nome = orc.o_nome;
                        obj.EstadoProjecto = prj.estado.Name;
                        obj.EstadoOrcamento = orc.estado.Name;
                        obj.o_datainicio = orc.o_datainicio;
                        obj.pe = orc.pe;
                        obj.o_numeropessoas = orc.o_numeropessoas;

                        ObjList.Add(obj);

                        
                      }
                  }
            }

            return ObjList;

        }



        public static List<Orcamentos> getAllActiveOrcamentos(string idProjecto)
        {

            var filter = Builders<Orcamentos>.Filter.Where(x => x.projectoidv == idProjecto);

            var lista = DB.Orcamentos.Find(filter).ToList();
            List<Orcamentos> nlista = new List<Orcamentos>();
            foreach (var item in lista)
            {
                if (item.active)
                {
                    nlista.Add(item);
                }
            }

            return nlista;
        }

        public static List<Orcamentos> GetAllOrcamentos(string idProjecto, string orcamentoidv)
        {

            var filter = Builders<Orcamentos>.Filter.Where(x => x.projectoidv == idProjecto);

            var lista = DB.Orcamentos.Find(filter).ToList();
            List<Orcamentos> nlista = new List<Orcamentos>();
            foreach (var item in lista)
            {

                nlista.Add(item);

            }

            return nlista;

        }


        public static List<Orcamentos> GetOrcamentosContext(string orcamentoidv)
        {

            ObjectId t = new ObjectId(orcamentoidv);

            var filter = Builders<Orcamentos>.Filter.Where(x => x.Id ==  t);

            var orcamento = DB.Orcamentos.Find(filter).FirstOrDefault();
            List<Orcamentos> nlista = new List<Orcamentos>();
            if (orcamento != null)
            {

                var parrent = orcamento.parrentorcamentoidv;

                if(parrent == "0" || parrent == null)
                {
                    nlista.Add(orcamento);
                    return nlista;
                }
                else
                {
                    ObjectId parrentObj = new ObjectId(parrent);

                    var filter2 = Builders<Orcamentos>.Filter.Where(x => x.Id == parrentObj || x.parrentorcamentoidv == parrent);
                    var orcamentoList = DB.Orcamentos.Find(filter2).ToList();

                    foreach (var item in orcamentoList)
                    {

                        nlista.Add(item);

                    }

                }

            }
            return nlista;


        }

         
        
        public static List<alojamentoList> GetAlojamento(string orcamento)
        {
            List<alojamentoList> ObjList = new List<alojamentoList>();
            try
            {
                using (var conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString))
                using (var command = new SqlCommand("getAllAlojamentos", conn)
                {
                    CommandType = CommandType.StoredProcedure
                })
                {
                    command.Parameters.Add("@orcamentoidv", SqlDbType.VarChar).Value = orcamento;
                    conn.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            alojamentoList obj = new alojamentoList();

                            obj.alojamentoidv = reader.GetString(0);
                            obj.orcamentoidv = reader.GetString(1);
                            obj.fornecedoridv = reader.GetString(2);
                            obj.quartoidv = reader.GetString(3);
                            obj.cambioidv = reader.GetString(4);
                            obj.ivaidv = reader.GetString(5);
                            obj.tipocustoidv = reader.GetString(6);
                            obj.a_preco = reader.GetDouble(7);
                            obj.a_comissao = reader.GetDouble(8);
                            obj.a_net = reader.GetDouble(9);
                            obj.a_valorcambio = reader.GetDouble(10);
                            obj.a_valoreuros = reader.GetDouble(11);
                            obj.a_numeronoites = reader.GetInt32(12);
                            obj.a_margemvenda = reader.GetDouble(13);
                            obj.a_markup = reader.GetDouble(14);
                            obj.a_pagamento = reader.GetString(15);
                            obj.a_datapagamento = reader.GetDateTime(16);
                            obj.a_numeroquartos = reader.GetInt32(17);
                            obj.a_numeropessoas = reader.GetInt32(18);
                            obj.a_valortotalpvp = reader.GetDouble(19);
                            obj.a_valorporpessoapvp = reader.GetDouble(20);
                            obj.a_observacoes = reader.GetString(21);
                            obj.a_opcao = reader.GetString(22);
                            obj.f_nome = reader.GetString(23);
                            obj.q_nome = reader.GetString(24);
                            obj.c_nome = reader.GetString(25);
                            obj.i_taxa = reader.GetString(26);
                            obj.tc_nome = reader.GetString(27);

                            ObjList.Add(obj);

                        }
                    }
                    else
                    {
                        Console.WriteLine("No rows found.");
                    }
                    reader.Close();
                    conn.Close();

                }
                return ObjList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return ObjList;
        }

        public static List<Voos> getVoos(string orcamento)
        {
            List<Voos> Lista = new List<Voos>();
            try
            {
                Lista = Voos.GetAll(orcamento);

                return Lista;
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                return Lista;
            }
        }

        public static List<Diarias> getAllDiarias(string orcamento)
        {
            List<Diarias> Lista = new List<Diarias>();
            try
            {
                Lista = Diarias.GetAll(orcamento);

                return Lista;
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                return Lista;
            }
        }


        public static List<ServicoTT> getAllServicos(string orcamento)
        {
            List<ServicoTT> Lista = new List<ServicoTT>();
            try
            {

                Lista = ServicoTT.GetAll(orcamento);

                return Lista;
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                return Lista;
            }

        }


        public static string GetParrentOrcamento(string orcamento)
        {



            try
            {

                using (var conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString))
                using (var command = new SqlCommand("GetParrentOrcamento", conn)
                {
                    CommandType = CommandType.StoredProcedure,
                })
                {
                    command.Parameters.Add("@orcamentoidv", SqlDbType.VarChar).Value = orcamento;
                    conn.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {


                            string t = reader.GetString(0);

                            return t;
                        }
                    }
                    else
                    {
                        Console.WriteLine("No rows found.");
                    }
                    reader.Close();
                    conn.Close();

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return "NoParrent";
        }

        public static dynamic GetProjecto(string idProjecto)
        {

            var proj = ProjectoTT.Get(idProjecto);

            return proj;

        }


        public static Users Login(string username, string password)
        {

            var usr =  Users.Login(username, password);
            if(usr != null)
            {
                return usr;
            }
            else
            {
                return null;
            }
        }

    }










    public static class JSONHelper
    {
        public static string ToJSON(this object obj)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(obj);
        }

        public static string ToJSON(this object obj, int recursionDepth)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.RecursionLimit = recursionDepth;
            return serializer.Serialize(obj);
        }
    }
}