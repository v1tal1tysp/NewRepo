using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TT_orcamentos;
using TTOrcamentos2.Model;

namespace TTOrcamentos2
{
    public partial class login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
            if (IsPostBack)
            {
                /*loadFunc();*/
                if (Usename.Value != "" && Password.Value != "")
                {
                    Users T = Api.Login(Usename.Value, Password.Value);

                    if (T != null)
                    {
                        Session.Add("user", T);
                        Response.Redirect("Index.aspx", true);
                    }
                }
                
            }
        }
        public void loadFunc()
        {

           /* Cambio.Insert("EUR", 1);
            Cambio.Insert("TRY", 1);
            Cambio.Insert("MAD", 1);
            Cambio.Insert("MXN", 1);
            Cambio.Insert("GBP", 1);
            Cambio.Insert("RUB", 6);
            Cambio.Insert("CHF", 1);
            Cambio.Insert("AUD", 1);
            Cambio.Insert("AED", 7);
            Cambio.Insert("IDR", 1);
            Cambio.Insert("AOA", 1);
            Cambio.Insert("DKK", 1);
            Cambio.Insert("JPY", 1);


            Ivas.Insert("Isento");
            Ivas.Insert("Incluído");
            Ivas.Insert("13 %");
            Ivas.Insert("16 %");
            Ivas.Insert("23 %");
            Ivas.Insert("6 %");


            Tipo_Iva.Insert("Portugal continental");
            Tipo_Iva.Insert("Regiões autónomas");
            Tipo_Iva.Insert("Europa comunitária");
            Tipo_Iva.Insert("Outros mercados");

            /*
            Estado.Insert("Criado");
            Estado.Insert("Em desenvolvimento");
            Estado.Insert("Em analise");
            Estado.Insert("Em reformulação");
            Estado.Insert("Ganho");
            Estado.Insert("Perdido");

            /*
            Country.Insert("Portugal");
            Country.Insert("Angola");
            Country.Insert("Itália");
            Country.Insert("Índia");
            Country.Insert("EUA");
            Country.Insert("Alemanha");
            Country.Insert("Indonésia");
            Country.Insert("Brasil");
            Country.Insert("México");
            Country.Insert("Rússia");


            City.Insert("Lisboa", Country.Get("Portugal"));
            City.Insert("Porto", Country.Get("Portugal"));

            TipoFornecedor.Insert("Fornecedor");
            TipoFornecedor.Insert("Cliente");
            TipoFornecedor.Insert("Fornecedor / Cliente");

            TypeOfCost.Insert("Voos");
            TypeOfCost.Insert("Alojamento");
            TypeOfCost.Insert("Transportes, transfers e assistências");
            TypeOfCost.Insert("Guias, atividades e entradas");
            TypeOfCost.Insert("Refeições e bebidas");
            TypeOfCost.Insert("Serviços Touch Travel");
            TypeOfCost.Insert("Outros");


            Users.Insert("Slavi", "Breakup0147.", "Slavi", "Popov", "slavi_popov@hotmail.com", Usertype.GetOrInsert("Admin"));
            Users.Insert("Ricardo", "123.", "Ricardo", "Santos", "ricardo@hotmail.com", Usertype.GetOrInsert("Admin"));*/

        }
    }
}