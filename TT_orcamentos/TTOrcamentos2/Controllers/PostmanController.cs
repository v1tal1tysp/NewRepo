using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using TT_orcamentos.Models.classes;
using TTOrcamentos2.Model;
using TTOrcamentos2.Models.DbModels;

namespace TTOrcamentos2.Controllers
{
    public class PostmanController : ApiController
    {
        [HttpPost]
        [Route("api/Postman/GetListAlojamento")]
        public List<alojamentoList> GetAlojamento([FromBody]alojamento orcamentoidv)
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
                    command.Parameters.Add("@orcamentoidv", SqlDbType.VarChar).Value = orcamentoidv.orcamentoidv;
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

        [HttpPost]
        [Route("api/Postman/getVoos")]
        public List<Voos> getVoos(JObject idorca)
        {
            List<Voos> Lista = new List<Voos>();
            try
            {
                var t = idorca.GetValue("orcamentoidv").ToString();
                Lista = Voos.GetAll(t);

                return Lista;
            }
            catch (Exception ex)
            {
                
                Console.WriteLine(ex.Message);
                return Lista;
            }

        }

        [HttpPost]
        [Route("api/Postman/getAllDiarias")]
        public List<Diarias> getAllDiarias(JObject diaria)
        {

            List<Diarias> Lista = new List<Diarias>();
            try
            {
                var t = diaria.GetValue("orcamentoidv").ToString();
                Lista = Diarias.GetAll(t);

                return Lista;
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                return Lista;
            }

        }

        [HttpPost]
        [Route("api/Postman/getAllServicos")]
        public List<ServicoTT> getAllServicos(JObject orcamento)
        {

            List<ServicoTT> Lista = new List<ServicoTT>();
            try
            {
                var t = orcamento.GetValue("orcamentoidv").ToString();
                Lista = ServicoTT.GetAll(t);

                return Lista;
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                return Lista;
            }

        }

        [HttpPost]
        [Route("api/Postman/getProjectoFiles")]
        public List<dynamic> getProjectoFiles(string id)
        {
            List<dynamic> ObjList = new List<dynamic>();
            try
            {
                using (var conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString))
                using (var command = new SqlCommand("getProjectoFiles", conn)
                {
                    CommandType = CommandType.StoredProcedure
                })
                {
                    command.Parameters.Add("@projectoid", SqlDbType.VarChar).Value = id;
                    conn.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            dynamic obj = new ExpandoObject();

                            obj.ID = reader.GetInt32(0);
                            obj.Namefile = reader.GetString(1);
                            obj.Filepath = reader.GetString(2);
                            obj.DataCriacao = reader.GetDateTime(3);
                            obj.projectoID = reader.GetString(4);
                            obj.orcamentoID = reader.GetString(5);
                            obj.TipoFicheiro = reader.GetInt32(6);

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


        /*GETS*/

        [HttpPost]
        [Route("api/Postman/getFornecedor")]
        public fornecedor getFornecedor([FromBody]fornecedor fornecedor)
        {
            fornecedor obj = new fornecedor();
            try
            {
                using (var conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString))
                using (var command = new SqlCommand("getFornecedor", conn)
                {
                    CommandType = CommandType.StoredProcedure
                })
                {
                    command.Parameters.Add("@fornecedoridv", SqlDbType.VarChar).Value = fornecedor.fornecedoridv;
                    conn.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            obj.fornecedoridv = reader.GetString(0);
	                        obj.tipofornecedoreidv = reader.GetString(1);
                            obj.paisidv = reader.GetString(2);
                            obj.cidade = reader.GetString(3);
                            obj.tipocustoidv = reader.GetString(4);
                            obj.f_nome = reader.GetString(5);
                            obj.f_nomecomercial = reader.GetString(6);
                            obj.f_morada = reader.GetString(7);
                            obj.f_localidade = reader.GetString(8);
                            obj.f_codigopostal = reader.GetString(9);
                            obj.f_telefone = reader.GetString(10);
                            obj.f_fax = reader.GetString(11);
                            obj.f_telemovel = reader.GetString(12);
                            obj.f_contacto = reader.GetString(13);
                            obj.f_email = reader.GetString(14);
                            obj.f_url = reader.GetString(15);
                            obj.f_contribuinte = reader.GetString(16);
                            obj.f_categoria = reader.GetString(17);
                           
                        }
                    }
                    else
                    {
                        Console.WriteLine("No rows found.");
                    }
                    reader.Close();
                    conn.Close();

                }
                return obj;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return obj;
        }




        /*AUX*/

        [HttpGet]
        [Route("api/Postman/getAllQuartos")]
        public string getAllQuartos()
        {
            string tst = string.Empty;
            List<Quartos> ObjList = new List<Quartos>();
            try
            {
                ObjList = Quartos.GetAll();

                return JsonConvert.SerializeObject(ObjList); ;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return tst;
        }

        [HttpGet]
        [Route("api/Postman/getAllServicosTT_Tipos")]
        public string getAllServicosTT_Tipos()
        {
            string tst = string.Empty;
            List<ServicosTT_Tipos> ObjList = new List<ServicosTT_Tipos>();
            try
            {
                ObjList = ServicosTT_Tipos.GetAll();

                return JsonConvert.SerializeObject(ObjList); ;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return tst;
        }


        [HttpGet]
        [Route("api/Postman/getAllCambios")]
        public string getAllCambios()
        {
            string tst = string.Empty;
            List<Cambio> ObjList = new List<Cambio>();
            try
            {
                ObjList = Cambio.GetAll();

                return JsonConvert.SerializeObject(ObjList); ;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return tst;
        }

        [HttpGet]
        [Route("api/Postman/getAllIvas")]
        public string getAllIvas()
        {
            string tst = string.Empty;
            List<Ivas> ObjList = new List<Ivas>();
            try
            {
                ObjList = Ivas.GetAll();

                return JsonConvert.SerializeObject(ObjList); 
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return tst;
        }

        [HttpGet]
        [Route("api/Postman/getAllTiposIva")]
        public string getAllTiposIva()
        {
            string tst = string.Empty;
            List<Tipo_Iva> ObjList = new List<Tipo_Iva>();
            try
            {
                ObjList = Tipo_Iva.GetAll();

                return JsonConvert.SerializeObject(ObjList); ;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return tst;
        }

        [HttpGet]
        [Route("api/Postman/getAllTipoCustos")]
        public string getAllTipoCustos()
        {
            string tst = string.Empty;
            List<TypeOfCost> ObjList = new List<TypeOfCost>();
            try
            {
                ObjList = TypeOfCost.GetAll();
                
                return JsonConvert.SerializeObject(ObjList); ;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return tst;
        }

        [HttpGet]
        [Route("api/Postman/getAllPaises")]
        public string getAllPaises()
        {
            string tst = string.Empty;
            List<Country> ObjList = new List<Country>();
            try
            {
                ObjList = Country.GetAll();

                return JsonConvert.SerializeObject(ObjList); ;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return tst;
        }

        [HttpGet]
        [Route("api/Postman/getAllTipoFornecedores")]
        public string getAllTipoFornecedores()
        {
            string tst = string.Empty;
            List<TipoFornecedor> ObjList = new List<TipoFornecedor>();
            try
            {
                ObjList = TipoFornecedor.GetAll();

                return JsonConvert.SerializeObject(ObjList); ;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return tst;
        }

        [HttpGet]
        [Route("api/Postman/getAllEstados")]
        public string getAllEstados()
        {
            string tst = string.Empty;
            List<Estado> ObjList = new List<Estado>();
            try
            {
                ObjList = Estado.GetAll();

                return JsonConvert.SerializeObject(ObjList); ;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return tst;
        }




        //INSERTS



        [HttpPost]
        [Route("api/Postman/insertFornecedor")]
        public string insertFornecedor(JObject fornecedor)
        {

            Fornecedor album = fornecedor.ToObject<Fornecedor>();
            Fornecedor.Insert(album);
            return album.Id.ToString();

        }

        [HttpPost]
        [Route("api/Postman/insertProjectoTT")]
        public string insertProjecto(JObject prj)
        {
            ProjectoTT newFornecedor = new ProjectoTT();

            
            var projecto = prj.GetValue("projecto");
            ProjectoTT Projecto = projecto.ToObject<ProjectoTT>();


            string id = string.Empty;
           

            if (ProjectoTT.Insert(Projecto, out id))
            {
                return id;
            }
            return id;
                   

        }

        [HttpPost]
        [Route("api/Postman/UpdateProjectoTT")]
        public bool UpdateProjecto(JObject prj)
        {

            var projectoid = prj.GetValue("id").ToString();
            var projecto = prj.GetValue("projecto");
            ProjectoTT Projecto = projecto.ToObject<ProjectoTT>();

            if (ProjectoTT.Update(Projecto, projectoid))
            {
                return true;
            }
            return false;
        }


        [HttpPost]
        [Route("api/Postman/insertOrcamento")]
        public string insertOrcamento(JObject orca)
        {
            
            // se tiver parrent é porque preciso actualizar o parrents active = false,

            var Orcamento = orca.GetValue("Orcamento");
            Orcamentos Orcamentos = Orcamento.ToObject<Orcamentos>();

            if(Orcamentos.parrentorcamentoidv != "0")
            {
                Orcamentos.UpdateActivity(Orcamentos.parrentorcamentoidv);

            }
            string id = string.Empty;
            if (Orcamentos.Insert(Orcamentos, out id))
            {
                return id;
            }

            return id;
         
        }
      
        [HttpPost]
        [Route("api/Postman/insertFicheiro")]
        public List<Ficheiros> insertFicheiro(string id, string orcamentoid ,int tipo)
        {
            List<Ficheiros> Lista = new List<Ficheiros>();
            try
            {

                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    var httpPostedFile = HttpContext.Current.Request.Files["UploadedImage"];
                    if (httpPostedFile != null)
                    {
                        if(!Directory.Exists(Properties.Settings.Default.PastaDocumentos + id))
                        {
                            Directory.CreateDirectory(Properties.Settings.Default.PastaDocumentos + id);
                        }

                        var fileSavePath = Properties.Settings.Default.PastaDocumentos + id + "\\" + httpPostedFile.FileName;
                        httpPostedFile.SaveAs(fileSavePath);

                        /*Insert na db*/


                        Ficheiros.Insert(httpPostedFile.FileName, fileSavePath, DateTime.Now, id, orcamentoid, tipo);


                        Lista = Ficheiros.GetAll(id);

                        return Lista;
                    }
                }

            }
            catch (Exception e)
            {

                return Lista;
            }
            return Lista;

            
        }


        [HttpPost]
        [Route("api/Postman/InsertAlojamento")]
        public alojamento InsertAlojamento([FromBody]alojamento Obj)
        {


            SqlConnection conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString);
            SqlCommand cmd = new SqlCommand("insertAlojamento", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            Obj.alojamentoidv = "";
            cmd.Parameters.AddWithValue("@alojamentoidv", SqlDbType.VarChar).Value = Obj.alojamentoidv;
            cmd.Parameters.AddWithValue("@orcamentoidv", SqlDbType.VarChar).Value = Obj.orcamentoidv;
            cmd.Parameters.AddWithValue("@fornecedoridv", SqlDbType.VarChar).Value = Obj.fornecedoridv;
	        cmd.Parameters.AddWithValue("@quartoidv", SqlDbType.VarChar).Value = Obj.quartoidv;
            cmd.Parameters.AddWithValue("@cambioidv", SqlDbType.VarChar).Value = Obj.cambioidv;
            cmd.Parameters.AddWithValue("@ivaidv", SqlDbType.VarChar).Value = Obj.ivaidv;
            cmd.Parameters.AddWithValue("@tipocustoidv", SqlDbType.VarChar).Value = Obj.tipocustoidv;
            cmd.Parameters.AddWithValue("@a_preco", SqlDbType.Float).Value = Obj.a_preco;
            cmd.Parameters.AddWithValue("@a_comissao" , SqlDbType.Float).Value = Obj.a_comissao;
            cmd.Parameters.AddWithValue("@a_net" , SqlDbType.Float).Value = Obj.a_net;
            cmd.Parameters.AddWithValue("@a_valorcambio" , SqlDbType.Float).Value = Obj.a_valorcambio;
            cmd.Parameters.AddWithValue("@a_valoreuros", SqlDbType.Float).Value = Obj.a_valoreuros;
            cmd.Parameters.AddWithValue("@a_numeronoites", SqlDbType.TinyInt).Value = Obj.a_numeronoites;
            cmd.Parameters.AddWithValue("@a_margemvenda", SqlDbType.Float).Value = Obj.a_margemvenda;
            cmd.Parameters.AddWithValue("@a_markup", SqlDbType.Float).Value = Obj.a_markup;
            cmd.Parameters.AddWithValue("@a_pagamento", SqlDbType.VarChar).Value = Obj.a_pagamento;
            cmd.Parameters.AddWithValue("@a_datapagamento", SqlDbType.DateTime).Value = Obj.a_datapagamento;
            cmd.Parameters.AddWithValue("@a_numeroquartos", SqlDbType.TinyInt).Value = Obj.a_numeroquartos;
            cmd.Parameters.AddWithValue("@a_numeropessoas", SqlDbType.TinyInt).Value = Obj.a_numeropessoas;
            cmd.Parameters.AddWithValue("@a_valortotalpvp" , SqlDbType.Float).Value = Obj.a_valortotalpvp;
            cmd.Parameters.AddWithValue("@a_valorporpessoapvp", SqlDbType.Float).Value = Obj.a_valorporpessoapvp;
            cmd.Parameters.AddWithValue("@a_observacoes", SqlDbType.VarChar).Value = Obj.a_observacoes;
            cmd.Parameters.AddWithValue("@a_opcao", SqlDbType.VarChar).Value = Obj.a_opcao;
            alojamento newObject = new alojamento();

            try
            {
                conn.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    
                    while (reader.Read())
                    {
                       

                        newObject.alojamentoidv = reader.GetString(0);
                        newObject.orcamentoidv = reader.GetString(1);
                        newObject.fornecedoridv = reader.GetString(2);
                        newObject.quartoidv = reader.GetString(3);
                        newObject.cambioidv = reader.GetString(4);
                        newObject.ivaidv = reader.GetString(5);
                        newObject.tipocustoidv = reader.GetString(6);
                        newObject.a_preco = reader.GetDouble(7);
                        newObject.a_comissao = reader.GetDouble(8);
                        newObject.a_net = reader.GetDouble(9);
                        newObject.a_valorcambio = reader.GetDouble(10);
                        newObject.a_valoreuros = reader.GetDouble(11);
                        newObject.a_numeronoites = reader.GetInt32(12);
                        newObject.a_margemvenda = reader.GetDouble(13);
                        newObject.a_markup = reader.GetDouble(14);
                        newObject.a_pagamento = reader.GetString(15);
                        newObject.a_datapagamento = reader.GetDateTime(16);
                        newObject.a_numeroquartos = reader.GetInt32(17);
                        newObject.a_numeropessoas = reader.GetInt32(18);
                        newObject.a_valortotalpvp = reader.GetDouble(19);
                        newObject.a_valorporpessoapvp = reader.GetDouble(20);
                        newObject.a_observacoes = reader.GetString(21);
                        newObject.a_opcao = reader.GetString(22);

                        return newObject;

                    }
                    
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Execption adding account. " + ex.Message);
            }
            finally
            {
                conn.Close();
            }




            return newObject;
        }

        [HttpPost]
        [Route("api/Postman/InsertVoos")]
        public Voos InsertVoos(JObject voo)
        {
            
            var projecto = voo.GetValue("_id");
            Voos Projecto = voo.ToObject<Voos>();

            if (Voos.Insert(Projecto))
            {
                return Projecto;
            }

            return Projecto;


        }

        [HttpPost]
        [Route("api/Postman/InsertDiaria")]
        public Diarias InsertDiaria(JObject Obj)
        {
            var projecto = Obj.GetValue("_id");
            Diarias diaria = Obj.ToObject<Diarias>();

            if (Diarias.Insert(diaria))
            {
                return diaria;
            }

            return diaria;

        }

        [HttpPost]
        [Route("api/Postman/InsertServico")]
        public ServicoTT InsertServico(JObject Obj)
        {

            
            ServicoTT Serv = Obj.ToObject<ServicoTT>();

            if (ServicoTT.Insert(Serv))
            {
                return Serv;
            }

            return Serv;


        }

        //DELETES

        [HttpPost]
        [Route("api/Postman/DeleteAlojamento")]
        public string DeleteAlojamento([FromBody]alojamento aloj)
        {
            string result = "nok";
            SqlConnection conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString);
            SqlCommand cmd = new SqlCommand("deleteAlojamento", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@alojamentoidv", SqlDbType.VarChar).Value = aloj.alojamentoidv;
            try
            {
                conn.Open();

                var t = cmd.ExecuteScalar();
                result = "ok";
            }
            catch (Exception ex)
            {
                throw new Exception("Execption adding account. " + ex.Message);
            }
            finally
            {
                conn.Close();
            }
            return result;
        }
        [HttpPost]
        [Route("api/Postman/DeleteVoos")]
        public string DeleteVoos([FromBody]voos voo)
        {
            string result = "nok";
            SqlConnection conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString);
            SqlCommand cmd = new SqlCommand("deleteVoo", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@vooidv", SqlDbType.VarChar).Value = voo.vooidv;
            try
            {
                conn.Open();

                var t = cmd.ExecuteScalar();
                result = "ok";
            }
            catch (Exception ex)
            {
                throw new Exception("Execption adding account. " + ex.Message);
            }
            finally
            {
                conn.Close();
            }
            return result;
        }
        [HttpPost]
        [Route("api/Postman/DeleteDiaria")]
        public string DeleteDiaria([FromBody]diarias diaria)
        {
            string result = "nok";
            SqlConnection conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString);
            SqlCommand cmd = new SqlCommand("deleteDiaria", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@diariaidv", SqlDbType.VarChar).Value = diaria.diariaidv;
            try
            {
                conn.Open();

                var t = cmd.ExecuteScalar();
                result = "ok";
            }
            catch (Exception ex)
            {
                throw new Exception("Execption adding account. " + ex.Message);
            }
            finally
            {
                conn.Close();
            }
            return result;
        }
        [HttpPost]
        [Route("api/Postman/DeleteServico")]
        public string DeleteServico([FromBody]servicos servico)
        {
            string result = "nok";
            SqlConnection conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString);
            SqlCommand cmd = new SqlCommand("deleteServico", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@servicoidv", SqlDbType.VarChar).Value = servico.servicoidv;
            try
            {
                conn.Open();

                var t = cmd.ExecuteScalar();
                result = "ok";
            }
            catch (Exception ex)
            {
                throw new Exception("Execption adding account. " + ex.Message);
            }
            finally
            {
                conn.Close();
            }
            return result;
        }





        //PESQUISA
        
        [HttpPost]
        [Route("api/Postman/pesquisaFornecedor")]
        public List<dynamic> pesquisaFornecedor(JObject mystr)
        {
            List<dynamic> lista = new List<dynamic>();
            dynamic json = mystr;
            string input = json.PesquisaFornecedor;
            var tc = Fornecedor.GetAllSearch(input);

            return tc;
        }



        [HttpPost]
        [Route("api/Postman/PesquisaUser")]
        public List<dynamic> PesquisaUser(JObject mystr)
        {

            List<dynamic> lista = new List<dynamic>();
            dynamic json = mystr;
            string input = json.PesquisaFornecedor;
            var tc = Users.GetAllSearch(input);

            foreach (var item in tc)
            {
                dynamic obj = new ExpandoObject();
                obj.id = item.Id.ToString();
                obj.Nome = item.Firstname + " " + item.LastName;
                 
                lista.Add(obj);
            }
            return lista;


        }

    }
}