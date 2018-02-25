using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TTOrcamentos2.Model;

namespace TTOrcamentos2 {
    public partial class FornecedorDetail : System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e)
        {


            Users t = (Users)Session["user"];

            if (t != null && t.Firstname != "")
            {
                loadPageAux();
                string fornecedorid = Request.QueryString["ID"];

                Fornecedor forne = Fornecedor.Get(fornecedorid);
                HiddenInfo.Value = JsonConvert.SerializeObject(forne);
                 
                List<ReportFornecedores> ListaDividas = ReportFornecedores.GetAll(fornecedorid);
                HiddenListaDividas.Value = JsonConvert.SerializeObject(ListaDividas);

            }
            else
                Response.Redirect("login.aspx", true);

        }

        private void loadPageAux()
        {

            var tdTypeOfCost = TypeOfCost.GetAll();
            HiddenTipoCustos.Value = JsonConvert.SerializeObject(tdTypeOfCost);

            var tdCountry = Country.GetAll();
            HiddenPaises.Value = JsonConvert.SerializeObject(tdCountry);


            var tdTiposForne = TipoFornecedor.GetAll();
            HiddenTipoFornecedor.Value = JsonConvert.SerializeObject(tdTiposForne);


        }

    }
}