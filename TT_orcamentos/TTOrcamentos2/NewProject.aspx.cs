using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Services;
using TTOrcamentos2.Model;

namespace TT_orcamentos
{
    public partial class NewProject : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            Users t = (Users)Session["user"];

            if (t != null && t.Username != "")
            {

                loadPageAux();
                var usernjson = JsonConvert.SerializeObject(t);
                CurrentuserHidden.Value = usernjson;

                string projectid = Request.QueryString["ID"];
                string orcamento = Request.QueryString["IDorc"];

                if (projectid != null)
                {

                    //Projecto
                    var projecto = Api.GetProjecto(projectid);
                    var jsonProjecto = JsonConvert.SerializeObject(projecto);
                    ProjectoHidden.Value = jsonProjecto;

                    List<Orcamentos> orcamentosActivos = Api.getAllActiveOrcamentos(projectid);
                    var jsonOrcamentosActivos = JsonConvert.SerializeObject(orcamentosActivos);
                    OrcamentosActivosHidden.Value = jsonOrcamentosActivos;


                    var orcamentoPai = orcamentosActivos.Where(x => x.parrentorcamentoidv == "0").FirstOrDefault();

      
                    var orcamentos = Api.GetOrcamentosContext( orcamento);
                    var jsonOrcamentos = JsonConvert.SerializeObject(orcamentos);
                    OrcamentosHidden.Value = jsonOrcamentos;


                    var logs = ProjectLog.GetAll(projectid);
                    HiddenLog.Value = JsonConvert.SerializeObject(logs);


                    var pagamentosCliente = PagamentosCliente.GetAll(projectid);
                    HiddenpagamentosCliente.Value = JsonConvert.SerializeObject(logs);


                    if (orcamento != null)
                    {
                        //Alojamento
                        var alojamento = Api.GetAlojamento(orcamento);
                        var jsonAlojamento = JsonConvert.SerializeObject(alojamento);
                        HiddenAlojamento.Value = jsonAlojamento;
                        
                        //Voos
                        var voos = Api.getVoos(orcamento);
                        var jsonVoos = JsonConvert.SerializeObject(voos);
                        HiddenVoos.Value = jsonVoos;

                        

                        //diarias
                        var diarias = Api.getAllDiarias(orcamento);
                        var jsondiarias = JsonConvert.SerializeObject(diarias);
                        HiddenDiarias.Value = jsondiarias;
                        

                        //Servicos
                        var servicos = Api.getAllServicos(orcamento);
                        var jsonservicos = JsonConvert.SerializeObject(servicos);
                        HiddenServicos.Value = jsonservicos;
                    }



    
                }
            }
            else
                Response.Redirect("login.aspx", true);
        }

        private void loadPageAux()
        {


            var estados = Estado.GetAll();
            BundleConfigs.Value = JsonConvert.SerializeObject(estados);


            var tipoivas = Tipo_Iva.GetAll();
            HiddenTiposIva.Value = JsonConvert.SerializeObject(tipoivas);



            var tipoServicosTT_Tipos = ServicosTT_Tipos.GetAll();
            HiddenServicosTTTipos.Value = JsonConvert.SerializeObject(tipoServicosTT_Tipos);


            var quartost = Quartos.GetAll();
            quartos.Value  =  JsonConvert.SerializeObject(quartost);


            var tdivas = Ivas.GetAll();
            HiddenIvas.Value = JsonConvert.SerializeObject(tdivas);


            var tdCambios = Cambio.GetAll();
            HiddenCambios.Value = JsonConvert.SerializeObject(tdCambios);


            var tdTypeOfCost = TypeOfCost.GetAll();
            HiddenTipoCustos.Value = JsonConvert.SerializeObject(tdTypeOfCost);

            var tdCountry = Country.GetAll();
            HiddenPaises.Value = JsonConvert.SerializeObject(tdCountry);


            var tdTiposForne = TipoFornecedor.GetAll();
            HiddenTipoFornecedor.Value = JsonConvert.SerializeObject(tdTiposForne);
            


        }
    }
}