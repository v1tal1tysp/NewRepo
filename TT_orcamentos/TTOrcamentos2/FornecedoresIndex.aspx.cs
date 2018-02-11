using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TTOrcamentos2.Model;

namespace TTOrcamentos2 {
    public partial class FornecedoresIndex : System.Web.UI.Page {
        protected void Page_Load(object sender, EventArgs e)
        {


            Users t = (Users)Session["user"];

            if (t != null && t.Firstname != "")
            {
                var fon = Fornecedor.GetAllIndex();
                var jsonOrcamentosActivos = JsonConvert.SerializeObject(fon);
                TableData.Value = jsonOrcamentosActivos;

            }
            else
                Response.Redirect("login.aspx", true);


        }
    }
}