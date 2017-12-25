using MongoDB.Driver;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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
                loadFunc();
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



            /*
            var test = DB.Estado.Indexes;


            TipoFornecedor.Insert("Fornecedor");
            TipoFornecedor.Insert("Cliente");
            TipoFornecedor.Insert("Fornecedor / Cliente");


            Tipo_Iva.Insert("Portugal continental");
            Tipo_Iva.Insert("Regiões autónomas");
            Tipo_Iva.Insert("Europa comunitária");
            Tipo_Iva.Insert("Outros mercados");



            Cambio.Insert("EUR", 1);
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





            ServicosTT_Tipos.Insert("Balcão de aeroporto ANA – Lisboa");
            ServicosTT_Tipos.Insert("Balcão de aeroporto ANA – Porto");
            ServicosTT_Tipos.Insert("Voos staff – Partida Lisboa");
            ServicosTT_Tipos.Insert("Voos staff – Partida Porto");
            ServicosTT_Tipos.Insert("Voos staff – Internos");
            ServicosTT_Tipos.Insert("Ligações staff Lisboa / Porto / Lisboa");
            ServicosTT_Tipos.Insert("Alojamento staff SGL");
            ServicosTT_Tipos.Insert("Alojamento staff DBL/TWN");
            ServicosTT_Tipos.Insert("Acompanhamento interno");
            ServicosTT_Tipos.Insert("Acompanhamento externo");
            ServicosTT_Tipos.Insert("Documentações de viagem");
            ServicosTT_Tipos.Insert("Seguro de viagem");
            ServicosTT_Tipos.Insert("Produção e imagem");
            ServicosTT_Tipos.Insert("Plataforma de viagem");
            ServicosTT_Tipos.Insert("Viagem de inspeção");
            ServicosTT_Tipos.Insert("Despesas administrativas");
            ServicosTT_Tipos.Insert("Comunicações e economato");

            Estado.Insert("Criado");
            Estado.Insert("Em desenvolvimento");
            Estado.Insert("Em analise");
            Estado.Insert("Em reformulação");
            Estado.Insert("Ganho");
            Estado.Insert("Perdido");


            TypeOfCost.Insert("Voos");
            TypeOfCost.Insert("Alojamento");
            TypeOfCost.Insert("Transportes, transfers e assistências");
            TypeOfCost.Insert("Guias, atividades e entradas");
            TypeOfCost.Insert("Refeições e bebidas");
            TypeOfCost.Insert("Serviços Touch Travel");
            TypeOfCost.Insert("Outros");



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


            */

            /*



                        /*

                        var t = "{\"_id\":ObjectId(\"5a2fc92b565c8cbca8863954\"),\"Hotelname\":\"teste\",\"OrcamentoId\":\"5a2c406c565c8c2438ca6721\",\"quartosId\":[1,2,3],\"acordo\":{\"cambio\":{\"_id\":ObjectId(\"000000000000000000000000\"),\"name\":\"EUR\",\"value\":1.0},\"AlmocoIncluido\":false,\"Iva\":{\"_id\":ObjectId(\"000000000000000000000000\"),\"name\":\"teste\"},\"markup\":5.1,\"net\":4.1,\"margem\":2.1,\"Comissao\":4.6,\"TipoIva\":{\"_id\":ObjectId(\"000000000000000000000000\"),\"name\":\"TipoIva\"},\"Observaçoes\":\"Observaçoes\"},\"Dias\":[{\"Data\":ISODate(\"2017-12-13T12:18:43.157Z\"),\"definicao\":{\"nome\":\"1\",\"numero\":1}},{\"Data\":ISODate(\"2017-12-14T12:18:43.157Z\"),\"definicao\":{\"nome\":\"2\",\"numero\":2}}]}";

                        var str = t.Replace('\"', '"');


                        JObject json = JObject.Parse(str);

                         var result = JsonConvert.DeserializeObject<Alojamento>(json);
                        Alojamento f = json.ToObject<Alojamento>();

                        var test = "";
            /*
                        Alojamento aloj = new Alojamento();


                        aloj.Hotelname = "teste";
                        aloj.OrcamentoId = "5a2c406c565c8c2438ca6721";
                        List<int> ids = new List<int>();
                        ids.Add(1);
                        ids.Add(2);
                        ids.Add(3);


                        aloj.quartosId = ids;
                        Acordo acordo = new Acordo();

                        acordo.AlmocoIncluido = false;
                        acordo.cambio = new Cambio("EUR", 1);
                        acordo.Iva = new Ivas("teste");
                        acordo.markup = 5.1;
                        acordo.net = 4.1;
                        acordo.margem = 2.1;
                        acordo.Comissao = 4.6;
                        acordo.Observaçoes = "Observaçoes";
                        acordo.TipoIva = new Tipo_Iva("Tipo Iva");

                        aloj.acordo = acordo;



                        List<Dias> dias = new List<Dias>();

                        DateTime dt = DateTime.Now;

                        for (int i = 1; i < 3; i++)
                        {
                            Dias d = new Dias();
                            d.Data = dt.AddDays(i);
                            d.definicao = new def(i.ToString(), i);
                            dias.Add(d);
                        }
                        aloj.Dias = dias;


                        Alojamento.Insert("teste", "5a2c406c565c8c2438ca6721", ids, acordo, dias);
                        */
            //criar alojamento, inserir lo, ver o json...
            // dps pegar no json e testar se faz o parse correcto




            // Users.Insert("JoaoBragança", "Breakup0147.", "João", "Test", "slavi_popov@hotmail.com", Usertype.GetOrInsert("Normal"));
            //Users.Insert("Joana", "Breakup0147.", "Joana", "Mendes", "slavi_popov@hotmail.com", Usertype.GetOrInsert("Test"));


            /*

            Quartos.Insert("SGL", 1, true);
            Quartos.Insert("DBL", 2, true);
            Quartos.Insert("TRPL", 3, true);

            /*ServicosTT_Tipos.Insert("Balcão de aeroporto ANA – Lisboa");
            ServicosTT_Tipos.Insert("Balcão de aeroporto ANA – Porto");
            ServicosTT_Tipos.Insert("Voos staff – Partida Lisboa");
            ServicosTT_Tipos.Insert("Voos staff – Partida Porto");
            ServicosTT_Tipos.Insert("Voos staff – Internos");
            ServicosTT_Tipos.Insert("Ligações staff Lisboa / Porto / Lisboa");
            ServicosTT_Tipos.Insert("Alojamento staff SGL");
            ServicosTT_Tipos.Insert("Alojamento staff DBL/TWN");
            ServicosTT_Tipos.Insert("Acompanhamento interno");
            ServicosTT_Tipos.Insert("Acompanhamento externo");
            ServicosTT_Tipos.Insert("Documentações de viagem");
            ServicosTT_Tipos.Insert("Seguro de viagem");
            ServicosTT_Tipos.Insert("Produção e imagem");
            ServicosTT_Tipos.Insert("Plataforma de viagem");
            ServicosTT_Tipos.Insert("Viagem de inspeção");
            ServicosTT_Tipos.Insert("Despesas administrativas");
            ServicosTT_Tipos.Insert("Comunicações e economato");


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