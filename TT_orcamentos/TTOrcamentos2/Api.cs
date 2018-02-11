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
                    string parrentorcaid = t.ToString();
                    //ObjectId parrentObj = new ObjectId(parrent);
                    var filter1 = Builders<Orcamentos>.Filter.Where(x => x.parrentorcamentoidv == parrentorcaid);

                    var orcamentoList = DB.Orcamentos.Find(filter1).ToList();
                    foreach (var item in orcamentoList)
                    {
                        nlista.Add(item);
                    }

                    
                    return nlista;
                }
                else
                {
                    ObjectId parrentObj = new ObjectId(parrent);
                    var filter1 = Builders<Orcamentos>.Filter.Where(x =>  x.parrentorcamentoidv == parrent);
                    var filter2 = Builders<Orcamentos>.Filter.Where(x => x.Id == parrentObj);
                    var orcamentoList = DB.Orcamentos.Find(filter2).ToList();
                    var orcamentoList2 = DB.Orcamentos.Find(filter1).ToList();
                    foreach (var item in orcamentoList)
                    {

                        nlista.Add(item);

                    }
                    foreach (var item in orcamentoList2)
                    {

                        nlista.Add(item);

                    }

                }

            }
            return nlista;


        }

         
        
        public static List<Alojamento> GetAlojamento(string orcamento)
        {
            List<Alojamento> Lista = new List<Alojamento>();
            try
            {
                Lista = Alojamento.GetAll(orcamento);

                return Lista;
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                return Lista;
            }

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