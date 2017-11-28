using Newtonsoft.Json;
using System;
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

                string projectid = Request.QueryString["ID"];
                string orcamento = Request.QueryString["IDorc"];

                if (projectid != null)
                {

                    //Projecto
                    var projecto = Api.GetProjecto(projectid);
                    var jsonProjecto = JsonConvert.SerializeObject(projecto);
                    ProjectoHidden.Value = jsonProjecto;

                    var orcamentosActivos = Api.getAllActiveOrcamentos(projectid);
                    var jsonOrcamentosActivos = JsonConvert.SerializeObject(orcamentosActivos);
                    OrcamentosActivosHidden.Value = jsonOrcamentosActivos;

                    var orcamentoPai = Api.GetParrentOrcamento(orcamento);
                    if(orcamentoPai == "")
                    {
                        //Orçamentos
                        var orcamentos = Api.GetAllOrcamentos(projectid, orcamento);
                        var jsonOrcamentos = JsonConvert.SerializeObject(orcamentos);
                        OrcamentosHidden.Value = jsonOrcamentos;
                    }
                    else
                    {
                        //Orçamentos
                        var orcamentos = Api.GetAllOrcamentos(projectid, orcamentoPai);
                        var jsonOrcamentos = JsonConvert.SerializeObject(orcamentos);
                        OrcamentosHidden.Value = jsonOrcamentos;
                    }


                    

                    
                    if (orcamento != null)
                    {
                        //Alojamento
                    /*    var alojamento = Api.GetAlojamento(orcamento);
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
                        */

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

    }
}