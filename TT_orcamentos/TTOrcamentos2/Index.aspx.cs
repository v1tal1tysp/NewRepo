using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using TTOrcamentos2.Model;

namespace TT_orcamentos
{
    public partial class Index : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Users t = (Users)Session["user"];

            if (t != null && t.Firstname != "")
            {
                Table tabela = new Table();
                tabela.ID = "Listaprojectos";

                
                var table = Api.GetAllProjectos();

                var ListaProjectos = table.Select(x => x.projectoidv).Distinct();

                var json = JsonConvert.SerializeObject(table);


                TableData.Value = JsonConvert.ToString(json);
            }
            else
                Response.Redirect("login.aspx", true);

        }
    }
}