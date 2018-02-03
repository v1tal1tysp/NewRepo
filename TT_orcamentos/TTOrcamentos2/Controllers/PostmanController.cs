using ClosedXML.Excel;
using MongoDB.Bson;
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
        public List<Alojamento> GetAlojamento(JObject orcamentoidv)
        {
            List<Alojamento> Lista = new List<Alojamento>();
            try
            {
                var t = orcamentoidv.GetValue("orcamentoidv").ToString();
                Lista = Alojamento.GetAll(t);

                return Lista;
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                return Lista;
            }
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
        public List<Ficheiros> getProjectoFiles(string id)
        {
            List<Ficheiros> Lista = new List<Ficheiros>();
            try
            {
                Lista = Ficheiros.GetAll(id);
                return Lista;
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                return Lista;
            }


        }


        /*GETS*/

        [HttpPost]
        [Route("api/Postman/getFornecedor")]
        public Fornecedor getFornecedor(JObject fornecedorid)
        {
            var t = fornecedorid.GetValue("fornecedoridv").ToString();

            return Fornecedor.Get(t);
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
        [Route("api/Postman/DownloadFile")]
        public HttpResponseMessage DownloadFile(JObject obj)
        {
            try
            {
                var id = obj.GetValue("id");
                var filepath = obj.GetValue("filepath").ToString();
                var name = obj.GetValue("name").ToString();
                //filepath = filepath.Replace("\\", @"\");

                
                Stream fileStream = File.Open(filepath, FileMode.Open, FileAccess.Read);
                
               // var stream = new FileStream(FilePath, FileMode.Open);
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Content = new StreamContent(fileStream);
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.ms-excel");
                response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = name
                };
                return response;
            }
            catch(Exception ex)
            {
                
                return new HttpResponseMessage(HttpStatusCode.NoContent);
            }
        }

      /*  [HttpPost]
        [Route("api/Postman/DownloadFile")]
        public HttpResponseMessage DownloadFile( JObject obj)
        {
            var id = obj.GetValue("id");
            var filepath = obj.GetValue("filepath").ToString();
            var name = obj.GetValue("name").ToString();
            HttpResponseMessage t = new HttpResponseMessage();
            try
            {
                MemoryStream responseStream = new MemoryStream();
                Stream fileStream = File.Open(filepath, FileMode.Open);
                bool fullContent = true;
 

                fileStream.CopyTo(responseStream);
                
                fileStream.Close();
                responseStream.Position = 0;

                HttpResponseMessage response = new HttpResponseMessage();
                response.StatusCode = fullContent ? HttpStatusCode.OK : HttpStatusCode.PartialContent;
                response.Content = new StreamContent(responseStream);
                return response;
            }
            catch (IOException)
            {
                return t;
            }
     
            
        }*/




        [HttpPost]
        [Route("api/Postman/InsertAlojamento")]
        public string InsertAlojamento(JObject Obj)
        {
            var id = Obj.GetValue("hotel").ToString();
            var Orcamento = Obj.GetValue("Objeto");

            Alojamento aloj = Orcamento.ToObject<Alojamento>();
            if (id == "")
            {
                Alojamento.Insert(aloj);
            }
            else
            {
                ObjectId pantObj = new ObjectId(id);
                aloj.Id = pantObj;
                Alojamento.Update(aloj);

            }

            return "";



     
        }


        public Stream GetStream(XLWorkbook excelWorkbook)
        {
            Stream fs = new MemoryStream();
            excelWorkbook.SaveAs(fs);
            fs.Position = 0;
            return fs;
        }
        [HttpPost]
        [Route("api/Postman/PrintExcel")]
        public Stream PrintExcel(JObject container)
        {
            Stream strm  = new MemoryStream();
            if (container != null)
            {
                try
                {
                    SaveRecordsModel Projecto = container.ToObject<SaveRecordsModel>();
                    if (Projecto != null)
                    {

                        var workbook = new XLWorkbook();
                        var worksheet = workbook.Worksheets.Add("Relatorio");


                        foreach (var r in Enumerable.Range(1, 5))
                            foreach (var c in Enumerable.Range(1, 5))
                                worksheet.Cell(r, c).Value = "X";


                        /*if (Projecto.ArrAloj != null)
                        {
                            foreach (var item in Projecto.ArrAloj)
                            {
                               
                                
                                //Alojamento.Insert(item);
                            }
                        }
                        if (Projecto.ArrVoos != null)
                        {
                            foreach (var item in Projecto.ArrVoos)
                            {
                                //Voos.Insert(item);
                            }
                        }
                        if (Projecto.ArrDiarias != null)
                        {
                            foreach (var item in Projecto.ArrDiarias)
                            {
                                //Diarias.Insert(item);
                            }
                        }
                        if (Projecto.ArrServicos != null)
                        {
                            foreach (var item in Projecto.ArrServicos)
                            {
                                //ServicoTT.Insert(item);
                            }
                        }*/

                         return GetStream(workbook);



                        //workbook.SaveAs("FirstExcel.xlsx");

                    }

                    //return "Ok";
                }
                catch (Exception ex)
                {

                    //return ex.InnerException.ToString();
                }
                return strm;
            }
            else
            {
                return strm;
            }

        }


        [HttpPost]
        [Route("api/Postman/SaveRecords")]
        public string SaveRecords(JObject container)
        {
            if (container != null)
            {
                try
                {
                    SaveRecordsModel Projecto = container.ToObject<SaveRecordsModel>();
                    if (Projecto != null)
                    {
                        if (Projecto.ArrAloj != null)
                        {
                            foreach (var item in Projecto.ArrAloj)
                            {
                                Alojamento.Insert(item);
                            }
                        }
                        if (Projecto.ArrVoos != null)
                        {
                            foreach (var item in Projecto.ArrVoos)
                            {
                                Voos.Insert(item);
                            }
                        }
                        if (Projecto.ArrDiarias != null)
                        {
                            foreach (var item in Projecto.ArrDiarias)
                            {
                                Diarias.Insert(item);
                            }
                        }
                        if (Projecto.ArrServicos != null)
                        {
                            foreach (var item in Projecto.ArrServicos)
                            {
                                ServicoTT.Insert(item);
                            }
                        }
                    }

                    return "Ok";
                }
                catch (Exception ex)
                {

                    return ex.InnerException.ToString();
                }
            }
            else
            {
                return "no_magic";
            }

        }






        [HttpPost]
        [Route("api/Postman/InsertVoos")]
        public Voos InsertVoos(JObject voo)
        {
            
            var projecto = voo.GetValue("Id");
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



        
        [HttpPost]
        [Route("api/Postman/UpdateCambio")]
        public bool UpdateCambio(JObject mystr)
        {
            if (Cambio.Update(mystr))
            {
                return true;
            }else
            {
                return false;
            }
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