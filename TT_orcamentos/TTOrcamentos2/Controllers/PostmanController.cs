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
        public List<voosList> getVoos([FromBody]voos orcamento)
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
                    command.Parameters.Add("@orcamentoidv", SqlDbType.VarChar).Value = orcamento.orcamentoidv;
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

        [HttpPost]
        [Route("api/Postman/getAllDiarias")]
        public List<diariasList> getAllDiarias([FromBody]diarias orcamento)
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
                    command.Parameters.Add("@orcamentoidv", SqlDbType.VarChar).Value = orcamento.orcamentoidv;
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

        [HttpPost]
        [Route("api/Postman/getAllServicos")]
        public List<servicosList> getAllServicos([FromBody]servicos orcamento)
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
                    command.Parameters.Add("@orcamentoidv", SqlDbType.VarChar).Value = orcamento.orcamentoidv;
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
        public List<aux_quartos> getAllQuartos()
        {
            List<aux_quartos> ObjList = new List<aux_quartos>();
            try
            {
                using (var conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString))
                using (var command = new SqlCommand("getAllQuartos", conn)
                {
                    CommandType = CommandType.StoredProcedure
                })
                {
                    conn.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            aux_quartos obj = new aux_quartos();

                            obj.quartoidv = reader.GetString(0);
                            obj.q_nome = reader.GetString(1);
                            obj.capacidade = reader.GetInt32(2);
                            obj.predefenido = reader.GetBoolean(3);

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

                return JsonConvert.SerializeObject(ObjList); ;
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
        public fornecedor insertFornecedor([FromBody]fornecedor fornecedor)
        {

            SqlConnection conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString);
            SqlCommand cmd = new SqlCommand("insertFornecedor", conn);
            cmd.CommandType = CommandType.StoredProcedure;


            cmd.Parameters.AddWithValue("@fornecedoridv", SqlDbType.VarChar).Value = "";
            cmd.Parameters.AddWithValue("@tipofornecedoreidv", SqlDbType.VarChar).Value = fornecedor.tipofornecedoreidv;
            cmd.Parameters.AddWithValue("@paisidv", SqlDbType.VarChar).Value = fornecedor.paisidv;
            cmd.Parameters.AddWithValue("@tipocustoidv", SqlDbType.VarChar).Value = fornecedor.tipocustoidv;
            cmd.Parameters.AddWithValue("@f_nome", SqlDbType.VarChar).Value = fornecedor.f_nome;
            cmd.Parameters.AddWithValue("@f_nomecomercial", SqlDbType.VarChar).Value = fornecedor.f_nomecomercial;
            cmd.Parameters.AddWithValue("@f_morada", SqlDbType.VarChar).Value = fornecedor.f_morada;
            cmd.Parameters.AddWithValue("@f_localidade", SqlDbType.VarChar).Value = fornecedor.f_localidade;
            cmd.Parameters.AddWithValue("@f_codigopostal", SqlDbType.VarChar).Value = fornecedor.f_codigopostal;
            cmd.Parameters.AddWithValue("@f_telefone", SqlDbType.VarChar).Value = fornecedor.f_telefone;
            cmd.Parameters.AddWithValue("@f_fax", SqlDbType.VarChar).Value = fornecedor.f_fax;
            cmd.Parameters.AddWithValue("@f_telemovel", SqlDbType.VarChar).Value = fornecedor.f_telemovel;
            cmd.Parameters.AddWithValue("@f_contacto", SqlDbType.VarChar).Value = fornecedor.f_contacto;
            cmd.Parameters.AddWithValue("@f_email", SqlDbType.VarChar).Value = fornecedor.f_email;
            cmd.Parameters.AddWithValue("@f_url", SqlDbType.VarChar).Value = fornecedor.f_url;
            cmd.Parameters.AddWithValue("@f_contribuinte", SqlDbType.VarChar).Value = fornecedor.f_contribuinte;
            cmd.Parameters.AddWithValue("@f_categoria", SqlDbType.VarChar).Value = fornecedor.f_categoria;

            fornecedor newObject = new fornecedor();

            newObject.fornecedoridv = "";
            try
            {
                conn.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        newObject.fornecedoridv = reader.GetString(0);
                        newObject.tipofornecedoreidv = reader.GetString(1);
                        newObject.paisidv = reader.GetString(2);
                        newObject.tipocustoidv = reader.GetString(3);
                        newObject.f_nome = reader.GetString(4);
                        newObject.f_nomecomercial = reader.GetString(5);
                        newObject.f_morada = reader.GetString(6);
                        newObject.f_localidade = reader.GetString(7);
                        newObject.f_codigopostal = reader.GetString(8);
                        newObject.f_telefone = reader.GetString(9);
                        newObject.f_fax = reader.GetString(10);
                        newObject.f_telemovel = reader.GetString(11);
                        newObject.f_contacto = reader.GetString(12);
                        newObject.f_email = reader.GetString(13);
                        newObject.f_url = reader.GetString(14);
                        newObject.f_contribuinte = reader.GetString(15);
                        newObject.f_categoria = reader.GetString(16);
                    }
                    return newObject;
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
        [Route("api/Postman/insertProjectoTT")]
        public projectos insertProjecto([FromBody]projectos prj)
        {
 

            SqlConnection conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString);
            SqlCommand cmd = new SqlCommand("insertProjectoTT", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            if(prj.projectoidv == null)
            {
                prj.projectoidv = "";
            }

            if(prj.DataEntrada == DateTime.MinValue)
            {
                prj.DataEntrada = DateTime.Now;
            }
            cmd.Parameters.AddWithValue("@projectoidv", SqlDbType.VarChar).Value = prj.projectoidv;
            cmd.Parameters.AddWithValue("@estadoidv", SqlDbType.VarChar).Value = prj.estadoidv;
            cmd.Parameters.AddWithValue("@sigavidv", SqlDbType.VarChar).Value = prj.sigavidv;
            cmd.Parameters.AddWithValue("@p_nome", SqlDbType.VarChar).Value = prj.p_nome;
            cmd.Parameters.AddWithValue("@p_descricao", SqlDbType.VarChar).Value = prj.p_descricao;
            cmd.Parameters.AddWithValue("@fornecedoridv", SqlDbType.VarChar).Value = prj.fornecedoridv;
            cmd.Parameters.AddWithValue("@AccountManager", SqlDbType.Int).Value = prj.AccountManager;
            cmd.Parameters.AddWithValue("@Designer", SqlDbType.Int).Value = prj.Designer;
            cmd.Parameters.AddWithValue("@DataEntrada", SqlDbType.DateTime).Value = prj.DataEntrada;
            cmd.Parameters.AddWithValue("@NomeContacto", SqlDbType.VarChar).Value = prj.NomeContacto;

            projectos newObject = new projectos();

            try
            {
                conn.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        newObject.projectoidv = reader.GetString(0);
                        newObject.estadoidv = reader.GetString(1);
                        newObject.sigavidv = reader.GetString(2);
                        newObject.p_nome = reader.GetString(3);
                        newObject.p_descricao = reader.GetString(4);
                        newObject.fornecedoridv = reader.GetString(5);
                        newObject.AccountManager = reader.GetInt32(6);
                        newObject.Designer = reader.GetInt32(7);
                        newObject.DataEntrada = reader.GetDateTime(8);
                        newObject.NomeContacto = reader.GetString(9);
                    }
                    return newObject;
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
        [Route("api/Postman/insertOrcamento")]
        public orcamentos insertOrcamento([FromBody]orcamentos prj)
        {


            SqlConnection conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString);
            SqlCommand cmd = new SqlCommand("insertOrcamento", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            if (prj.orcamentoidv == null)
            {
                prj.orcamentoidv = "";
            }
            if (prj.parrentorcamentoidv == null)
            {
                prj.parrentorcamentoidv = "";
            }
            if (prj.o_datacriacao == DateTime.MinValue)
            {
                prj.o_datacriacao = DateTime.Now;
            }

            prj.DataUpdate = DateTime.Now;


            cmd.Parameters.AddWithValue("@orcamentoidv", SqlDbType.VarChar).Value = prj.orcamentoidv;
            cmd.Parameters.AddWithValue("@projectoidv", SqlDbType.VarChar).Value = prj.projectoidv;
            cmd.Parameters.AddWithValue("@estadoidv", SqlDbType.VarChar).Value = prj.estadoidv;
            cmd.Parameters.AddWithValue("@tipoivaidv", SqlDbType.VarChar).Value = prj.tipoivaidv;
            cmd.Parameters.AddWithValue("@ivaidv", SqlDbType.VarChar).Value = prj.ivaidv;
            cmd.Parameters.AddWithValue("@cambioidv", SqlDbType.VarChar).Value = prj.cambioidv;
            cmd.Parameters.AddWithValue("@c_valor", SqlDbType.Float).Value = prj.c_valor;
            cmd.Parameters.AddWithValue("@o_nome", SqlDbType.VarChar).Value = prj.o_nome;
            cmd.Parameters.AddWithValue("@o_datacriacao", SqlDbType.DateTime).Value = prj.o_datacriacao;
            cmd.Parameters.AddWithValue("@o_datainicio", SqlDbType.DateTime).Value = prj.o_datainicio;
            cmd.Parameters.AddWithValue("@o_numeropessoas", SqlDbType.Int).Value = prj.o_numeropessoas;
            cmd.Parameters.AddWithValue("@o_numerodias", SqlDbType.Int).Value = prj.o_numerodias;
            cmd.Parameters.AddWithValue("@o_numeronoites", SqlDbType.Int).Value = prj.o_numeronoites;
            cmd.Parameters.AddWithValue("@o_margemvenda", SqlDbType.Float).Value = prj.o_margemvenda;
            cmd.Parameters.AddWithValue("@o_markup", SqlDbType.Float).Value = prj.o_markup;
            cmd.Parameters.AddWithValue("@o_descricao", SqlDbType.VarChar).Value = prj.o_descricao;
            cmd.Parameters.AddWithValue("@active", SqlDbType.Bit).Value = prj.active;
            cmd.Parameters.AddWithValue("@parrentorcamentoidv", SqlDbType.VarChar).Value = prj.parrentorcamentoidv;
            cmd.Parameters.AddWithValue("@Versao", SqlDbType.Int).Value = prj.Versao;
            cmd.Parameters.AddWithValue("@pe", SqlDbType.Bit).Value = prj.pe;
            cmd.Parameters.AddWithValue("@DataUpdate", SqlDbType.DateTime).Value = prj.DataUpdate;

            orcamentos newObject = new orcamentos();

            try
            {
                conn.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {

                        newObject.orcamentoidv = reader.GetString(0);
                        newObject.projectoidv = reader.GetString(1);
                        newObject.estadoidv = reader.GetString(2);
                        newObject.tipoivaidv = reader.GetString(3);
                        newObject.ivaidv = reader.GetString(4);
                        newObject.cambioidv = reader.GetString(5);
                        newObject.c_valor = reader.GetDouble(6);
                        newObject.o_nome = reader.GetString(7);
                        newObject.o_datacriacao = reader.GetDateTime(8);
                        newObject.o_datainicio = reader.GetDateTime(9);
                        newObject.o_numeropessoas = reader.GetInt32(10);
                        newObject.o_numerodias = reader.GetInt32(11);
                        newObject.o_numeronoites = reader.GetInt32(12);
                        newObject.o_margemvenda = reader.GetDouble(13);
                        newObject.o_markup = reader.GetDouble(14);
                        newObject.o_descricao = reader.GetString(15);
                        newObject.active = reader.GetBoolean(16);
                        newObject.parrentorcamentoidv = reader.GetString(17);
                        newObject.Versao = reader.GetInt32(18);
                        newObject.pe = reader.GetBoolean(19);
                        newObject.DataUpdate = reader.GetDateTime(20);

                    }
                    return newObject;
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
        [Route("api/Postman/insertFicheiro")]
        public List<dynamic> insertFicheiro(string id, string orcamentoid ,int tipo)
        {


            List<dynamic> Lista = new List<dynamic>(); 

            try
            {

                if (HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    // Get the uploaded image from the Files collection
                    var httpPostedFile = HttpContext.Current.Request.Files["UploadedImage"];

                    if (httpPostedFile != null)
                    {

                        Directory.CreateDirectory(Properties.Settings.Default.PastaDocumentos + id);
                        var fileSavePath = Properties.Settings.Default.PastaDocumentos + id + "\\"+ httpPostedFile.FileName;
                        httpPostedFile.SaveAs(fileSavePath);


                        SqlConnection conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString);
                        SqlCommand cmd = new SqlCommand("insertFicheiro", conn);
                        cmd.CommandType = CommandType.StoredProcedure;


                        if (id == null)
                            id = "";

                        if (orcamentoid == null)
                            orcamentoid = "";

                        cmd.Parameters.AddWithValue("@Namefile", SqlDbType.VarChar).Value = httpPostedFile.FileName;
                        cmd.Parameters.AddWithValue("@Filepath", SqlDbType.VarChar).Value = fileSavePath;
                        cmd.Parameters.AddWithValue("@DataCriacao", SqlDbType.DateTime).Value = DateTime.Now;
                        cmd.Parameters.AddWithValue("@projectoID", SqlDbType.VarChar).Value = id;
                        cmd.Parameters.AddWithValue("@orcamentoID", SqlDbType.VarChar).Value = orcamentoid;
                        cmd.Parameters.AddWithValue("@TipoFicheiro", SqlDbType.VarChar).Value = tipo;


                        conn.Open();

                        SqlDataReader reader = cmd.ExecuteReader();

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

                                Lista.Add(obj);
                            }

                        }

                        return Lista;

                    }
                    return Lista;

                }
                return Lista;
            }
            catch (Exception e)
            {
                return Lista;
            }

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
        public voos InsertVoos([FromBody]voos Obj)
        {

            SqlConnection conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString);
            SqlCommand cmd = new SqlCommand("insertVoo", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            Obj.vooidv = "";


            cmd.Parameters.AddWithValue("@vooidv", SqlDbType.VarChar).Value = Obj.vooidv;
	        cmd.Parameters.AddWithValue("@orcamentoidv", SqlDbType.VarChar).Value = Obj.orcamentoidv;
            cmd.Parameters.AddWithValue("@fornecedoridv", SqlDbType.VarChar).Value = Obj.fornecedoridv;
            cmd.Parameters.AddWithValue("@cambioidv", SqlDbType.VarChar).Value = Obj.cambioidv;
            cmd.Parameters.AddWithValue("@ivaidv", SqlDbType.VarChar).Value = Obj.ivaidv;
            cmd.Parameters.AddWithValue("@tipocustoidv", SqlDbType.VarChar).Value = Obj.tipocustoidv;
            cmd.Parameters.AddWithValue("@v_partida", SqlDbType.VarChar).Value = Obj.v_partida;
            cmd.Parameters.AddWithValue("@v_destino", SqlDbType.VarChar).Value = Obj.v_destino;
            cmd.Parameters.AddWithValue("@v_nomevoo", SqlDbType.VarChar).Value = Obj.v_nomevoo;
            cmd.Parameters.AddWithValue("@v_preco", SqlDbType.Float).Value = Obj.v_preco;
            cmd.Parameters.AddWithValue("@v_comissao", SqlDbType.Float).Value = Obj.v_comissao;
            cmd.Parameters.AddWithValue("@v_net", SqlDbType.Float).Value = Obj.v_net;
            cmd.Parameters.AddWithValue("@v_valorcambio", SqlDbType.Float).Value = Obj.v_valorcambio;
            cmd.Parameters.AddWithValue("@v_valoreuros", SqlDbType.Float).Value = Obj.v_valoreuros;
            cmd.Parameters.AddWithValue("@v_margemvenda", SqlDbType.Float).Value = Obj.v_margemvenda;
            cmd.Parameters.AddWithValue("@v_markup", SqlDbType.Float).Value = Obj.v_markup;
            cmd.Parameters.AddWithValue("@v_taxaA", SqlDbType.Float).Value = Obj.v_taxaA;
            cmd.Parameters.AddWithValue("@v_taxaB", SqlDbType.Float).Value = Obj.v_taxaB;
            cmd.Parameters.AddWithValue("@v_numeropessoas", SqlDbType.TinyInt).Value = Obj.v_numeropessoas;
            cmd.Parameters.AddWithValue("@v_disponibilidade", SqlDbType.TinyInt).Value = Obj.v_disponibilidade;
            cmd.Parameters.AddWithValue("@v_valortotalpvp", SqlDbType.Float).Value = Obj.v_valortotalpvp;
            cmd.Parameters.AddWithValue("@v_valorporpessoapvp", SqlDbType.Float).Value = Obj.v_valorporpessoapvp;
            cmd.Parameters.AddWithValue("@v_pagamento", SqlDbType.VarChar).Value = Obj.v_pagamento;
            cmd.Parameters.AddWithValue("@v_datapagamento", SqlDbType.DateTime).Value = Obj.v_datapagamento;



            voos newObject = new voos();


            try
            {
                conn.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {

                    while (reader.Read())
                    {

                        newObject.vooidv = reader.GetString(0);
                        newObject.orcamentoidv = reader.GetString(1);
                        newObject.fornecedoridv = reader.GetString(2);
                        newObject.cambioidv = reader.GetString(3);
                        newObject.ivaidv = reader.GetString(4);
                        newObject.tipocustoidv = reader.GetString(5);
                        newObject.v_partida = reader.GetString(6);
                        newObject.v_destino = reader.GetString(7);
                        newObject.v_nomevoo = reader.GetString(8);
                        newObject.v_preco = reader.GetDouble(9);
                        newObject.v_comissao = reader.GetDouble(10);
                        newObject.v_net = reader.GetDouble(11);
                        newObject.v_valorcambio = reader.GetDouble(12);
                        newObject.v_valoreuros = reader.GetDouble(13);
                        newObject.v_margemvenda = reader.GetDouble(14);
                        newObject.v_markup = reader.GetDouble(15);
                        newObject.v_taxaA = reader.GetDouble(16);
                        newObject.v_taxaB = reader.GetDouble(17);
                        newObject.v_numeropessoas = reader.GetInt32(18);
                        newObject.v_disponibilidade = reader.GetInt32(19);
                        newObject.v_valortotalpvp = reader.GetDouble(20);
                        newObject.v_valorporpessoapvp = reader.GetDouble(21);
                        newObject.v_pagamento = reader.GetString(22);
                        newObject.v_datapagamento = reader.GetDateTime(23);



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
        [Route("api/Postman/InsertDiaria")]
        public diarias InsertDiaria([FromBody]diarias Obj)
        {

            SqlConnection conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString);
            SqlCommand cmd = new SqlCommand("InsertDiaria", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            Obj.diariaidv = "";


    

            cmd.Parameters.AddWithValue("@diariaidv", SqlDbType.VarChar).Value = Obj.diariaidv;
            cmd.Parameters.AddWithValue("@orcamentoidv", SqlDbType.VarChar).Value = Obj.orcamentoidv;
            cmd.Parameters.AddWithValue("@fornecedoridv", SqlDbType.VarChar).Value = Obj.fornecedoridv;
            cmd.Parameters.AddWithValue("@ivaidv", SqlDbType.VarChar).Value = Obj.ivaidv;
	        cmd.Parameters.AddWithValue("@tipocustoidv", SqlDbType.VarChar).Value = Obj.tipocustoidv;
            cmd.Parameters.AddWithValue("@cambioidv", SqlDbType.VarChar).Value = Obj.cambioidv;
            cmd.Parameters.AddWithValue("@d_nomeservico", SqlDbType.VarChar).Value = Obj.d_nomeservico;
            cmd.Parameters.AddWithValue("@d_data", SqlDbType.DateTime).Value = Obj.d_data;
            cmd.Parameters.AddWithValue("@d_preco", SqlDbType.Float).Value = Obj.d_preco;
            cmd.Parameters.AddWithValue("@d_comissao", SqlDbType.Float).Value = Obj.d_comissao;
            cmd.Parameters.AddWithValue("@d_net", SqlDbType.Float).Value = Obj.d_net;
            cmd.Parameters.AddWithValue("@d_valorcambio", SqlDbType.Float).Value = Obj.d_valorcambio;
            cmd.Parameters.AddWithValue("@d_valoreuros", SqlDbType.Float).Value = Obj.d_valoreuros;
            cmd.Parameters.AddWithValue("@d_quantidade", SqlDbType.TinyInt).Value = Obj.d_quantidade;
            cmd.Parameters.AddWithValue("@d_unidades", SqlDbType.TinyInt).Value = Obj.d_unidades;
            cmd.Parameters.AddWithValue("@d_margemvenda", SqlDbType.Float).Value = Obj.d_margemvenda;
            cmd.Parameters.AddWithValue("@d_markup", SqlDbType.Float).Value = Obj.d_markup;
            cmd.Parameters.AddWithValue("@d_pagamento", SqlDbType.VarChar).Value = Obj.d_pagamento;
            cmd.Parameters.AddWithValue("@d_datapagamento", SqlDbType.DateTime).Value = Obj.d_datapagamento;
            cmd.Parameters.AddWithValue("@d_numeropessoas", SqlDbType.TinyInt).Value = Obj.d_numeropessoas;
            cmd.Parameters.AddWithValue("@d_valortotalpvp ", SqlDbType.Float).Value = Obj.d_valortotalpvp;
            cmd.Parameters.AddWithValue("@d_valorporpessoapvp", SqlDbType.Float).Value = Obj.d_valorporpessoapvp;
            cmd.Parameters.AddWithValue("@d_observacoes", SqlDbType.VarChar).Value = Obj.d_observacoes;



            diarias newObject = new diarias();


            try
            {
                conn.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {

                    while (reader.Read())
                    {

                        newObject.diariaidv = reader.GetString(0);
                        newObject.orcamentoidv = reader.GetString(1);
                        newObject.fornecedoridv = reader.GetString(2);
                        newObject.ivaidv = reader.GetString(3);
                        newObject.tipocustoidv = reader.GetString(4);
                        newObject.cambioidv = reader.GetString(5);
                        newObject.d_nomeservico = reader.GetString(6);
                        newObject.d_data = reader.GetDateTime(7);
                        newObject.d_preco = reader.GetDouble(8);
                        newObject.d_comissao = reader.GetDouble(9);
                        newObject.d_net = reader.GetDouble(10);
                        newObject.d_valorcambio = reader.GetDouble(11);
                        newObject.d_valoreuros = reader.GetDouble(12);
                        newObject.d_quantidade = reader.GetInt32(13);
                        newObject.d_unidades = reader.GetInt32(14);
                        newObject.d_margemvenda = reader.GetDouble(15);
                        newObject.d_markup = reader.GetDouble(16);
                        newObject.d_pagamento = reader.GetString(17);
                        newObject.d_datapagamento = reader.GetDateTime(18);
                        newObject.d_numeropessoas = reader.GetInt32(19);
                        newObject.d_valortotalpvp = reader.GetDouble(20);
                        newObject.d_valorporpessoapvp = reader.GetDouble(21);
                        newObject.d_observacoes = reader.GetString(22);




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
        [Route("api/Postman/InsertServico")]
        public servicos InsertServico([FromBody]servicos Obj)
        {

            SqlConnection conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString);
            SqlCommand cmd = new SqlCommand("insertServico", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            Obj.servicoidv = "";



            cmd.Parameters.AddWithValue("@servicoidv", SqlDbType.VarChar).Value = Obj.servicoidv;
            cmd.Parameters.AddWithValue("@orcamentoidv", SqlDbType.VarChar).Value = Obj.orcamentoidv;
            cmd.Parameters.AddWithValue("@fornecedoridv", SqlDbType.VarChar).Value = Obj.fornecedoridv;
            cmd.Parameters.AddWithValue("@ivaidv", SqlDbType.VarChar).Value = Obj.ivaidv;
            cmd.Parameters.AddWithValue("@tipocustoidv ", SqlDbType.VarChar).Value = Obj.tipocustoidv;
            cmd.Parameters.AddWithValue("@cambioidv", SqlDbType.VarChar).Value = Obj.cambioidv;
            cmd.Parameters.AddWithValue("@servicottidv", SqlDbType.VarChar).Value = Obj.servicottidv;
            cmd.Parameters.AddWithValue("@s_nomeservico", SqlDbType.VarChar).Value = Obj.s_nomeservico;
            cmd.Parameters.AddWithValue("@s_preco", SqlDbType.Float).Value = Obj.s_preco;
            cmd.Parameters.AddWithValue("@s_comissao", SqlDbType.Float).Value = Obj.s_comissao;
            cmd.Parameters.AddWithValue("@s_net", SqlDbType.Float).Value = Obj.s_net;
            cmd.Parameters.AddWithValue("@s_valorcambio", SqlDbType.Float).Value = Obj.s_valorcambio;
            cmd.Parameters.AddWithValue("@s_valoreuros", SqlDbType.Float).Value = Obj.s_valoreuros;
            cmd.Parameters.AddWithValue("@s_quantidade", SqlDbType.TinyInt).Value = Obj.s_quantidade;
            cmd.Parameters.AddWithValue("@s_unidades", SqlDbType.TinyInt).Value = Obj.s_unidades;
            cmd.Parameters.AddWithValue("@s_margemvenda", SqlDbType.Float).Value = Obj.s_margemvenda;
            cmd.Parameters.AddWithValue("@s_markup", SqlDbType.Float).Value = Obj.s_markup;
            cmd.Parameters.AddWithValue("@s_pagamento", SqlDbType.VarChar).Value = Obj.s_pagamento;
            cmd.Parameters.AddWithValue("@s_datapagamento", SqlDbType.DateTime).Value = Obj.s_datapagamento;
            cmd.Parameters.AddWithValue("@s_numeropessoas", SqlDbType.TinyInt).Value = Obj.s_numeropessoas;
            cmd.Parameters.AddWithValue("@s_valortotalpvp", SqlDbType.Float).Value = Obj.s_valortotalpvp;
            cmd.Parameters.AddWithValue("@s_valorporpessoapvp", SqlDbType.Float).Value = Obj.s_valorporpessoapvp;
            cmd.Parameters.AddWithValue("@s_observacoes", SqlDbType.VarChar).Value = Obj.s_observacoes;





            servicos newObject = new servicos();


            try
            {
                conn.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {

                    while (reader.Read())
                    {

                        newObject.servicoidv = reader.GetString(0);
                        newObject.orcamentoidv = reader.GetString(1);
                        newObject.fornecedoridv = reader.GetString(2);
                        newObject.ivaidv = reader.GetString(3);
                        newObject.tipocustoidv = reader.GetString(4);
                        newObject.cambioidv = reader.GetString(5);
                        newObject.servicottidv = reader.GetString(6);
                        newObject.s_nomeservico = reader.GetString(7);
                        newObject.s_preco = reader.GetDouble(8);
                        newObject.s_comissao = reader.GetDouble(9);
                        newObject.s_net = reader.GetDouble(10);
                        newObject.s_valorcambio = reader.GetDouble(11);
                        newObject.s_valoreuros = reader.GetDouble(12);
                        newObject.s_quantidade = reader.GetInt32(13);
                        newObject.s_unidades = reader.GetInt32(14);
                        newObject.s_margemvenda = reader.GetDouble(15);
                        newObject.s_markup = reader.GetDouble(16);
                        newObject.s_pagamento = reader.GetString(17);
                        newObject.s_datapagamento = reader.GetDateTime(18);
                        newObject.s_numeropessoas = reader.GetInt32(19);
                        newObject.s_valortotalpvp = reader.GetDouble(20);
                        newObject.s_valorporpessoapvp = reader.GetDouble(21);
                        newObject.@s_observacoes = reader.GetString(22);





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
        public List<fornecedor> pesquisaFornecedor(JObject mystr)
        {
            dynamic json = mystr;
            List<fornecedor> lista =  new List<fornecedor>();
            SqlConnection conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString);
            SqlCommand cmd = new SqlCommand("pesquisaFornecedor", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pesquisa", SqlDbType.VarChar).Value = json.PesquisaFornecedor;
            try
            {
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        fornecedor obj = new fornecedor();

                        obj.fornecedoridv = reader.GetString(0);
                        obj.f_nome = reader.GetString(1);
                        obj.f_nomecomercial = reader.GetString(2);


                        lista.Add(obj);

                    }

                }
                reader.Close();
                return lista;
            }
            catch (Exception ex)
            {
                throw new Exception("Execption adding account. " + ex.Message);
            }
            finally
            {
                conn.Close();
            }
        }



        [HttpPost]
        [Route("api/Postman/PesquisaUser")]
        public List<dynamic> PesquisaUser(JObject mystr)
        {
            dynamic json = mystr;
            List<dynamic> lista = new List<dynamic>();
            SqlConnection conn = new SqlConnection(TTOrcamentos2.Properties.Settings.Default.ConnectionString);
            SqlCommand cmd = new SqlCommand("PesquisaUser", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@pesquisa", SqlDbType.VarChar).Value = json.PesquisaFornecedor;
            try
            {
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        dynamic obj = new ExpandoObject();

                        obj.id = reader.GetInt32(0);
                        obj.Nome = reader.GetString(1);
 


                        lista.Add(obj);

                    }

                }
                reader.Close();
                return lista;
            }
            catch (Exception ex)
            {
                throw new Exception("Execption adding account. " + ex.Message);
            }
            finally
            {
                conn.Close();
            }
        }

    }
}