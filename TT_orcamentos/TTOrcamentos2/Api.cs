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



        public static List<dynamic> getAllActiveOrcamentos(string idProjecto)
        {

            var filter = Builders<Orcamentos>.Filter.Where(x => x.projectoidv == idProjecto);

            var lista = DB.Orcamentos.Find(filter).ToList();
            List<dynamic> nlista = new List<dynamic>();
            foreach (var item in lista)
            {
                if (item.active)
                {
                    nlista.Add(item);
                }
            }

            return nlista;
        }




        public static List<dynamic> GetAllOrcamentos(string idProjecto, string orcamentoidv)
        {
            List<dynamic> ObjList = new List<dynamic>();
            try
            {
                using (var conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString))
                using (var command = new SqlCommand("getAllOrcamentos", conn)
                {
                    CommandType = CommandType.StoredProcedure
                })
                {
                    command.Parameters.Add("@projectoidv", SqlDbType.VarChar).Value = idProjecto;
                    command.Parameters.Add("@orcamentoidv", SqlDbType.VarChar).Value = orcamentoidv;
                    conn.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            dynamic obj = new ExpandoObject();

                            obj.orcamentoidv = reader.GetString(0);
                            obj.projectoidv = reader.GetString(1);
                            obj.estadoidv = reader.GetString(2);
                            obj.tipoivaidv = reader.GetString(3);
                            obj.ivaidv = reader.GetString(4);
                            obj.cambioidv = reader.GetString(5);
                            obj.c_valor = reader.GetDouble(6);
                            obj.o_nome = reader.GetString(7);
                            obj.o_datacriacao = reader.GetDateTime(8);
                            obj.o_datainicio = reader.GetDateTime(9);
                            obj.o_numeropessoas = reader.GetInt32(10);
                            obj.o_numerodias = reader.GetInt32(11);
                            obj.o_numeronoites = reader.GetInt32(12);
                            obj.o_margemvenda = reader.GetDouble(13);
                            obj.o_markup = reader.GetDouble(14);
                            obj.o_descricao = reader.GetString(15);
                            obj.active = reader.GetBoolean(16);
                            obj.parrentorcamentoidv = reader.GetString(17);
                            obj.Versao = reader.GetInt32(18);
                            obj.pe = reader.GetBoolean(19);
                            obj.DataUpdate = reader.GetDateTime(20);
                            obj.e_nome = reader.GetString(21);
                            obj.ti_nome = reader.GetString(22);
                            obj.i_taxa = reader.GetString(23);
                            obj.c_nome = reader.GetString(24);


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

        public static List<voosList> getVoos(string orcamento)
        {
            List<voosList> ObjList = new List<voosList>();
            try
            {
                using (var conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString))
                using (var command = new SqlCommand("getAllVoos", conn)
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
                            voosList obj = new voosList();
                            
                            obj.vooidv = reader.GetString(0);
                            obj.orcamentoidv = reader.GetString(1);
                            obj.fornecedoridv = reader.GetString(2);
                            obj.cambioidv = reader.GetString(3);
                            obj.ivaidv = reader.GetString(4);
                            obj.tipocustoidv = reader.GetString(5);
                            obj.v_partida = reader.GetString(6);
                            obj.v_destino = reader.GetString(7);
                            obj.v_nomevoo = reader.GetString(8);
                            obj.v_preco = reader.GetDouble(9);
                            obj.v_comissao = reader.GetDouble(10);
                            obj.v_net = reader.GetDouble(11);
                            obj.v_valorcambio = reader.GetDouble(12);
                            obj.v_valoreuros = reader.GetDouble(13);
                            obj.v_margemvenda = reader.GetDouble(14);
                            obj.v_markup = reader.GetDouble(15);
                            obj.v_taxaA = reader.GetDouble(16);
                            obj.v_taxaB = reader.GetDouble(17);
                            obj.v_numeropessoas = reader.GetInt32(18);
                            obj.v_disponibilidade = reader.GetInt32(19);
                            obj.v_valortotalpvp = reader.GetDouble(20);
                            obj.v_valorporpessoapvp = reader.GetDouble(21);
                            obj.v_pagamento = reader.GetString(22);
                            obj.v_datapagamento = reader.GetDateTime(23);
                            obj.f_nome = reader.GetString(24);
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


        public static List<diariasList> getAllDiarias(string orcamento)
        {
            List<diariasList> ObjList = new List<diariasList>();
            try
            {
                using (var conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString))
                using (var command = new SqlCommand("getAllDiarias", conn)
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
                            diariasList obj = new diariasList();

                            obj.diariaidv = reader.GetString(0);
                            obj.orcamentoidv = reader.GetString(1);
                            obj.fornecedoridv = reader.GetString(2);
                            obj.ivaidv = reader.GetString(3);
                            obj.tipocustoidv = reader.GetString(4);
                            obj.cambioidv = reader.GetString(5);
                            obj.d_nomeservico = reader.GetString(6);
                            obj.d_data = reader.GetDateTime(7);
                            obj.d_preco = reader.GetDouble(8);
                            obj.d_comissao = reader.GetDouble(9);
                            obj.d_net = reader.GetDouble(10);
                            obj.d_valorcambio = reader.GetDouble(11);
                            obj.d_valoreuros = reader.GetDouble(12);
                            obj.d_quantidade = reader.GetInt32(13);
                            obj.d_unidades = reader.GetInt32(14);
                            obj.d_margemvenda = reader.GetDouble(15);
                            obj.d_markup = reader.GetDouble(16);
                            obj.d_pagamento = reader.GetString(17);
                            obj.d_datapagamento = reader.GetDateTime(18);
                            obj.d_numeropessoas = reader.GetInt32(19);
                            obj.d_valortotalpvp = reader.GetDouble(20);
                            obj.d_valorporpessoapvp = reader.GetDouble(21);
                            obj.d_observacoes = reader.GetString(22);
                            obj.f_nome = reader.GetString(23);
                            obj.c_nome = reader.GetString(24);
                            obj.i_taxa = reader.GetString(25);
                            obj.tc_nome = reader.GetString(26);



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


        public static List<servicosList> getAllServicos(string orcamento)
        {
            List<servicosList> ObjList = new List<servicosList>();
            try
            {
                using (var conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString))
                using (var command = new SqlCommand("getAllServicos", conn)
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
                            servicosList obj = new servicosList();

                            obj.servicoidv = reader.GetString(0);
                            obj.orcamentoidv = reader.GetString(1);
                            obj.fornecedoridv = reader.GetString(2);
                            obj.ivaidv = reader.GetString(3);
                            obj.tipocustoidv = reader.GetString(4);
                            obj.cambioidv = reader.GetString(5);
                            obj.servicottidv = reader.GetString(6);
                            obj.s_nomeservico = reader.GetString(7);
                            obj.s_preco = reader.GetDouble(8);
                            obj.s_comissao = reader.GetDouble(9);
                            obj.s_net = reader.GetDouble(10);
                            obj.s_valorcambio = reader.GetDouble(11);
                            obj.s_valoreuros = reader.GetDouble(12);
                            obj.s_quantidade = reader.GetInt32(13);
                            obj.s_unidades = reader.GetInt32(14);
                            obj.s_margemvenda = reader.GetDouble(15);
                            obj.s_markup = reader.GetDouble(16);
                            obj.s_pagamento = reader.GetString(17);
                            obj.s_datapagamento = reader.GetDateTime(18);
                            obj.s_numeropessoas = reader.GetInt32(19);
                            obj.s_valortotalpvp = reader.GetDouble(20);
                            obj.s_valorporpessoapvp = reader.GetDouble(21);
                            obj.s_observacoes = reader.GetString(22);
                            obj.f_nome = reader.GetString(23);
                            obj.c_nome = reader.GetString(24);
                            obj.i_taxa = reader.GetString(25);
                            obj.tc_nome = reader.GetString(26);
                            obj.stt_nome = reader.GetString(27);

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