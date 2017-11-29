var projectID = "";
var OrcamentoID = "";
var ParrentOrcamentoID = "";
var Versao = 1;

var url = "img/check.png";
var url2 = "img/SaveIcn.png";
var url3 = "img/remove.png";
var url4 = "img/InfoObs.png";
var url5 = "img/add_btn.png";
var url6 = "img/setting.png";
var url7 = "img/icon-hotelbill.png";

var res = encodeURI(url);
var res2 = encodeURI(url2);
var res3 = encodeURI(url3);
var res4 = encodeURI(url4);
var res5 = encodeURI(url5);
var res6 = encodeURI(url6);
var res7 = encodeURI(url7);

var InputClick;
var InputId;

var form_modified = false;

$(document).on('change', 'select', function () {
    var name = this.name;
    form_modified = true;
});

$(document).on('change keypress', 'input', function () {
    var name = this.name;
    var val = this.value;
    form_modified = true;

}); 

$(document).on('input', function () {
    var name = this.name;
    var val = this.value;
    form_modified = true;

});

var ListafornecedoresGBL = []; 


$(".AddOrcamentoPe").click(function () {
    
    /*Orçamento */
    var orcamentoidv = "";
    var projectoidv = projectID; /*Este é hidden*/
    var fornecedoridv = $("#ProjectoFornecedorID").val();/*Este é hidden*/
    var estadoidv = $("#OrcamentoEstado option:selected").val();
    var tipoivaidv = $("#OrcamentoTipoIva option:selected").val();
    var ivaidv = $("#OrcamentoIva option:selected").val();
    var datadeiniciar = ConvertDateForSend($("#OrcamentoDataInicio").val());
    var o_datainicio = datadeiniciar;
    var o_numeronoites = parseInt($("#OrcamentoNoites").val());
    var o_numerodias = parseInt($("#OrcamentoDias").val());
    var o_numeropessoas = parseInt($("#OrcamentoNumeroDePessoas").val());



    var OrcamentoCambioTXT = $("#OrcamentoMoedaCompra option:selected").val();
    var CambioArr = OrcamentoCambioTXT.split("-");
    var cambioidv = CambioArr[0];
    var c_valor = parseFloat(CambioArr[1])
    

    var d = new Date();


    var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + "-v1";
    var o_nome = strDate;

    var dataCriacao = new Date();
    var o_datacriacao = ConvertDateForSend(dataCriacao);
    var o_margemvenda = parseFloat($("#OrcamentoMargem").val());
    var o_markup = parseFloat($("#OrcamentoMarkup").val());
    var o_descricao = $("#OrcamentoDescricao").val();

    /*ver o numero de orcamentos*/
    var conta = $("#ListaOrcamentos tr");
    var o_ordem = conta.length;

    var pe = true;

    var DataUpdate2 = new Date();
    var DataUpdate = ConvertDateForSend(DataUpdate2);

    var orcamentoPai = "";
    var orcamento = {
        "orcamentoidv": orcamentoidv,
        "projectoidv": projectoidv,
        "fornecedoridv": fornecedoridv,
        "estadoidv": estadoidv,
        "tipoivaidv": tipoivaidv,
        "ivaidv": ivaidv,
        "cambioidv": cambioidv,
        "c_valor": c_valor,
        "o_nome": o_nome,
        "o_datacriacao": o_datacriacao,
        "o_datainicio": o_datainicio,
        "o_numeropessoas": o_numeropessoas,
        "o_numerodias": o_numerodias,
        "o_numeronoites": o_numeronoites,
        "o_margemvenda": o_margemvenda,
        "o_markup": o_markup,
        "o_descricao": o_descricao,
        "active": true,
        "parrentorcamentoidv": orcamentoPai,
        "Versao": Versao,
        "pe": pe,
        "DataUpdate": DataUpdate
    };


    InsertOrcamentoInicial(orcamento);
    
});

$("#SaveNewOrcamento").click(function () {
    var cty = $("#ListaOrcamentos").find("tr");
    var cnt = cty.length - 1;
    ParrentOrcamentoID = OrcamentoID;
    OrcamentoID = "";

    var d = new Date();

    if (cnt == 0) {
        cnt = 1;
    }


    var ver = parseInt($("#VersaoActual").val());
    ver++;
    $("#VersaoActual").val(ver.toString());
    var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + "-v" + ver.toString();
    $("#OrcamentoNome").val(strDate);


    savecurrentProject();


    /*
        add novo orcamento,
        e criar copy a todos records,
        mas com orcamento novo.
    */

});


$("#SaveOrcamento").click(function () {


    savecurrentProject();

    /*if (projectID == null || projectID == "") {
        savecurrentProject();
    }*/


});
 


function savecurrentProject() {

    /*PROJETO*/
    var Projetoestadoidv = $("#ProjectEstado option:selected").val();
    var Projetosigavidv = $("#ProjectoSigav").val();
    var Projetop_nome = $("#ProjectName").val();
    var Projetop_descricao = $("#ProjectDescription").val();
    var ProjectoFornecedorid = $("#ProjectoFornecedorID").val();
    var ProjectoAccountManager = parseInt($("#ProjectoAccountManager").val());
    var ProjectoDesigner = parseInt($("#ProjectoDesigner").val());
    var DataEntrada = "";
    var ProjectoNomeContacto = $("#ProjectoNomeContacto").val();

    /*Orçamento */
    var orcamentoidv = OrcamentoID;
    var projectoidv = projectID; /*Este é hidden*/
    var fornecedoridv = $("#ProjectoFornecedorID").val();/*Este é hidden*/
    var estadoidv = $("#OrcamentoEstado option:selected").val();
    var tipoivaidv = $("#OrcamentoTipoIva option:selected").val();
    var ivaidv = $("#OrcamentoIva option:selected").val();
    var datadeiniciar = ConvertDateForSend($("#OrcamentoDataInicio").val());
    var o_datainicio = datadeiniciar;
    var o_numeronoites = parseInt($("#OrcamentoNoites").val());
    var o_numerodias = parseInt($("#OrcamentoDias").val());
    var o_numeropessoas = parseInt($("#OrcamentoNumeroDePessoas").val());
    var Versao = parseInt($("#VersaoActual").val());


    var OrcamentoCambioTXT = $("#OrcamentoMoedaCompra option:selected").val();
    var CambioArr = OrcamentoCambioTXT.split("-");
    var cambioidv = CambioArr[0];
    var c_valor = parseFloat(CambioArr[1])
    var o_nome = $("#OrcamentoNome").val();
    var dataCriacao = new Date();
    var o_datacriacao = ConvertDateForSend(dataCriacao);
    var o_margemvenda = parseFloat($("#OrcamentoMargem").val());
    var o_markup = parseFloat($("#OrcamentoMarkup").val());
    var o_descricao = $("#OrcamentoDescricao").val();

    /*ver o numero de orcamentos*/
    var conta = $("#ListaOrcamentos tr");
    var o_ordem = conta.length ;
    
    var pe = false;

    var DataUpdate2 = new Date();
    var DataUpdate = ConvertDateForSend(DataUpdate2);

    var orcamentoPai = ParrentOrcamentoID;
    var orcamento = {
            "orcamentoidv":orcamentoidv,
            "projectoidv":projectoidv,
            "fornecedoridv":fornecedoridv,
            "estadoidv":estadoidv,
            "tipoivaidv":tipoivaidv,
            "ivaidv" :ivaidv,
            "cambioidv":cambioidv,
            "c_valor":c_valor,
            "o_nome" :o_nome,
            "o_datacriacao":o_datacriacao,
            "o_datainicio" :o_datainicio,
            "o_numeropessoas" :o_numeropessoas,
            "o_numerodias" :o_numerodias,
            "o_numeronoites":o_numeronoites,
            "o_margemvenda":o_margemvenda,
            "o_markup":o_markup,
            "o_descricao":o_descricao,
            "active": true,
            "parrentorcamentoidv": orcamentoPai,
            "Versao": Versao,
        	"pe": pe,
        	"DataUpdate": DataUpdate
    };

    var projecto = {
            "projectoidv": projectoidv,
            "estadoidv": Projetoestadoidv,
            "sigavidv": Projetosigavidv,
            "p_nome": Projetop_nome,
            "p_descricao": Projetop_descricao,
            "fornecedoridv": ProjectoFornecedorid,
            "AccountManager": ProjectoAccountManager,
            "Designer": ProjectoDesigner,
            "DataEntrada":DataEntrada,
            "NomeContacto":ProjectoNomeContacto
        };


     InsertProjectoInicial(projecto, orcamento);


  }














function savecurrentProjectOLD() {

    var CompleteSave = false;
    /*PROJETO*/
    var Projetoestadoidv = $("#ProjectEstado option:selected").val();
    var Projetofilettidv = $("#ProjectFilename").val();
    var Projetosigavidv = $("#ProjectoSigav").val();
    var Projetop_nome = $("#ProjectName").val();
    var Projetop_descricao = $("#ProjectDescription").val();
    var ProjectoFornecedorid = $("#ProjectoFornecedorID").val();
    var projecto;
    /*Apenas ao projecto */
    if(projectID === ""){
        projecto = {"projectoidv":"",
            "estadoidv": Projetoestadoidv,
            "filettidv": Projetofilettidv,
            "sigavidv": Projetosigavidv,
            "p_nome": Projetop_nome,
            "p_descricao": Projetop_descricao,
            "fornecedoridv":ProjectoFornecedorid
        };
        InsertProjectoInicial(projecto);
    }
    else  {  /* projecto existe, orçamento nao */
        if(projectID != "" && OrcamentoID === ""){
            projecto = {"projectoidv":projectID,
                "estadoidv": Projetoestadoidv,
                "filettidv": Projetofilettidv,
                "sigavidv": Projetosigavidv,
                "p_nome": Projetop_nome,
                "p_descricao": Projetop_descricao,
                "fornecedoridv":ProjectoFornecedorid
            };
            sendProjecto(projecto);




        }
    }
    /* projecto existe , orçamento tambem*/
    if(projectID !== "" && OrcamentoID != ""){
         projecto = {"projectoidv":projectID,
            "estadoidv": Projetoestadoidv,
            "filettidv": Projetofilettidv,
            "sigavidv": Projetosigavidv,
            "p_nome": Projetop_nome,
            "p_descricao": Projetop_descricao,
            "fornecedoridv":ProjectoFornecedorid
        };
        /*ORÇAMENTO*/
      
        var OrcamentoEstado = $("#OrcamentoEstado option:selected").val();
        var OrcamentoCambioTXT = $("#OrcamentoMoedaCompra option:selected").val();
        var CambioArr = OrcamentoCambioTXT.split("-");
        var OrcamentoCambio = CambioArr[0];
        var OrcamentoTipoIva = $("#OrcamentoTipoIva option:selected").val();
        var OrcamentoIva = $("#OrcamentoIva option:selected").val();
        var OrcamentoNome = $("#OrcamentoNome").val();
        var dttest = $("#OrcamentoDataInicio").val();
        var dttest2 = $("#OrcamentoDataFinal").val();

        var OrcamentoDataInicio = ConvertDateForSend($("#OrcamentoDataInicio").val());
        var OrcamentoDataFinal = ConvertDateForSend($("#OrcamentoDataFinal").val());
        var OrcamentoNumeroPAX =parseInt($("#OrcamentoNumeroPAX").val());
        var OrcamentoNdias = parseInt($("#OrcamentoNdias").val());
        var OrcamentoNNoites = parseInt($("#OrcamentoNNoites").val());
        var OrcamentoMarkup = parseFloat($("#OrcamentoMarkup").val());
        var OrcamentoMargem =parseFloat( $("#OrcamentoMargem").val());
        var OrcamentoDescricao = $("#OrcamentoDescricao").val();

        var orcamentoCreateDate = ConvertDateForSend(new Date());

        var orcamento = {"orcamentoidv":OrcamentoID,
                "projectoidv":projectID,
                "estadoidv": OrcamentoEstado,
                "tipoivaidv": OrcamentoTipoIva,
                "ivaidv": OrcamentoIva,
                "cambioidv": OrcamentoCambio,
                "o_nome": OrcamentoNome,
                "o_datacriacao": orcamentoCreateDate,
                "o_datainicio": OrcamentoDataInicio,
                "o_datafim": OrcamentoDataFinal,
                "o_numeropessoas": OrcamentoNumeroPAX,
                "o_numerodias": OrcamentoNdias,
                "o_numeronoites": OrcamentoNNoites,
                "o_margemvenda": OrcamentoMargem,
                "o_markup": OrcamentoMarkup,
                "o_descricao": OrcamentoDescricao,
                "o_ordem": "1"
        };
        



        $.post('http://www.touchgroup.com/sgtt/cfc/main.cfc?method=insertOrcamento', orcamento,
            function (returnedData) {
                var obj = JSON.parse(returnedData);
                OrcamentoID = obj.DATA["ORCAMENTOIDV"][0];
                objectToSend = null;
            }).fail(function () {
                alert("Erro ao criar o Orçamento!");
                console.log("Erro ao criar o projecto!");
        });
        sendProjecto(projecto);
        CompleteSave= true;
    }
    

/*
Alojamento
    orcamento
    data
    fornecedor



 */


    if(CompleteSave === true)
    {

        var listAlojamento = $("#AlojamentoRecords tr");
        var alojamentoss = [];


        for(var x = 1; x< listAlojamento.length ; x++){

            var rec = $(listAlojamento[x]).children();
            var len = $(rec).length;

            if(len === 14)
            {
                var idv = $(rec[1]).find(".HiddenRecordId").val();
                var fornecedoridv = $(rec[1]).find(".HiddenRecordIdFornecedor").val();
                var quartoIdv = $(rec[1]).find(".HiddenRecordQuartoIdv").val();
                var cambioidv = $(rec[1]).find(".HiddenRecordCambioIdv").val();
                var Ivaidv = $(rec[1]).find(".HiddenRecordIvaIdv").val();
                var tipocustoidv = $(rec[1]).find(".HiddenRecordTipocustoidv").val();
                var net = $(rec[1]).find(".HiddenRecordNet").val();
                var Markup = $(rec[1]).find(".HiddenRecordMarkup").val();
                var APagameto = $(rec[1]).find(".HiddenRecordAPagamento").val();
                var ADataPagameto = $(rec[1]).find(".HiddenRecordADATAPagamento").val();
                var valorCambio = $(rec[1]).find(".HiddenRecordValorCambio").val();
                var Nnoites = parseInt($(rec[3]).text());
                var Unidades = $(rec[4]).find(".smNumInput").val();
                var tipologia = parseInt($(rec[2]).text());
                var margem = parseFloat($(rec[5]).find(".smNumInput").val());
                var commisao = parseFloat($(rec[6]).find(".smNumInput").val());
                var totalCusto = parseFloat($(rec[7]).text().replace(',', ''));
                var totalCustoPax =parseFloat($(rec[8]).text().replace(',', ''));
                var TotalVenda =parseFloat($(rec[9]).text().replace(',', ''));
                var TotalPax = parseFloat($(rec[10]).text().replace(',', ''));
                var Observacoes = $(rec[11]).text();


                var ht = $(rec[2]).html();
                var valorEur;
                var valorExterno;
                if(ht.indexOf("</br>")<0)
                {
                    valorEur = parseFloat($(rec[2]).text().replace(',', ''));
                    valorExterno = valorEur;
                }
                else{
                    var strs = ht.split("</br>");

                    valorEur = parseFloat($(strs[1]).text().replace(',', ''));
                    valorExterno = parseFloat($(strs[0]).text().replace(',', ''));

                }
            }
            else{





                var idv = $(rec[0]).find(".HiddenRecordId").val();
                var fornecedoridv = $(rec[0]).find(".HiddenRecordIdFornecedor").val();
                var quartoIdv = $(rec[0]).find(".HiddenRecordQuartoIdv").val();
                var cambioidv = $(rec[0]).find(".HiddenRecordCambioIdv").val();
                var Ivaidv = $(rec[0]).find(".HiddenRecordIvaIdv").val();
                var tipocustoidv = $(rec[0]).find(".HiddenRecordTipocustoidv").val();
                var net = $(rec[0]).find(".HiddenRecordNet").val();
                var Markup = $(rec[0]).find(".HiddenRecordMarkup").val();
                var APagameto = $(rec[0]).find(".HiddenRecordAPagamento").val();
                var ADataPagameto = $(rec[0]).find(".HiddenRecordADATAPagamento").val();
                var valorCambio = $(rec[0]).find(".HiddenRecordValorCambio").val();


                var Nnoites = parseInt($(rec[2]).text());
                var Unidades = $(rec[3]).find(".smNumInput").val();
                var tipologia = parseInt($(rec[0]).text());
                var margem = parseFloat($(rec[4]).find(".smNumInput").val());
                var commisao = parseFloat($(rec[5]).find(".smNumInput").val());
                var totalCusto = parseFloat($(rec[6]).text().replace(',', ''));
                var totalCustoPax =parseFloat($(rec[7]).text().replace(',', ''));
                var TotalVenda =parseFloat($(rec[8]).text().replace(',', ''));
                var TotalPax = parseFloat($(rec[9]).text().replace(',', ''));
                var Observacoes = parseFloat($(rec[10]).text().replace(',', ''));


                var ht = $(rec[1]).html();
                var valorEur;
                var valorExterno;
                if(ht.indexOf("</br>")<0)
                {
                    valorEur = parseFloat($(rec[1]).text().replace(',', ''));
                    valorExterno = valorEur;
                }
                else{
                    var strs = ht.split("</br>");

                    valorEur = parseFloat($(strs[1]).text().replace(',', ''));
                    valorExterno = parseFloat($(strs[0]).text().replace(',', ''));

                }

            }





            var alojamento = {
            "orcamentoidv": OrcamentoID,
            "alojamentoidv": idv,
            "fornecedoridv": fornecedoridv,
            "quartoidv": quartoIdv,
            "cambioidv": cambioidv,
            "ivaidv":Ivaidv,
            "tipocustoidv": tipocustoidv,
            "a_preco": valorExterno,
            "a_comissao": commisao,
            "a_net": net,
            "a_valorcambio": valorCambio,
            "a_valoreuros": valorEur,
            "a_numeronoites": Nnoites,
            "a_margemvenda": margem,
            "a_markup": Markup,
            "a_pagamento": APagameto,
            "a_datapagamento": ADataPagameto,
            "a_numeroquartos": Unidades,
            "a_numeropessoas": Unidades * quartoIdv,
            "a_valortotalpvp": totalCusto,
            "a_valorporpessoapvp": totalCustoPax,
            "a_observacoes": Observacoes,
            "a_opcao": 1
            };


            alojamentoss.push(alojamento);
        }

        var JsonAlojamentos  = JSON.stringify(alojamentoss);

        $.post('http://www.touchgroup.com/sgtt/cfc/main.cfc?method=insertAlojamentoVarios', {ALOJAMENTOS:JsonAlojamentos} ,
            function (returnedData) {
                var sended = alojamentoss;
                var obj = returnedData;
                obj = null;
            }).fail(function (e) {
                console.log("error");
        });




        /*VOOS */
        var listaVoos = $("#VoosRecords tr");
        var myarrVooRecs = [];

        for (var i = 1; i < listaVoos.length; i++){
        
            var rec = $(listaVoos[i]).children();

            var idv = $(rec[0]).find(".HiddenRecordId").val();
            var fornecedoridv = $(rec[0]).find(".HiddenRecordIdFornecedor").val();
            var cambioidv = $(rec[0]).find(".HiddenRecordCambioIdv").val();
            var Ivaidv = $(rec[0]).find(".HiddenRecordIvaIdv").val();
            var tipocustoidv = $(rec[0]).find(".HiddenRecordTipocustoidv").val();
            var net = parseFloat($(rec[0]).find(".HiddenRecordNet").val());
            var Markup = parseFloat($(rec[0]).find(".HiddenRecordMarkup").val());
            var APagameto = $(rec[0]).find(".HiddenRecordAPagamento").val();
            var ADataPagameto = ConvertDateForSend($(rec[0]).find(".HiddenRecordADATAPagamento").val());
            var valorCambio = parseFloat($(rec[0]).find(".HiddenRecordValorCambio").val());
            var TAXAA = parseFloat($(rec[0]).find(".HiddenRecordTAXAA").val());
            var TAXAB = parseFloat($(rec[0]).find(".HiddenRecordTAXAB").val());
            var DISPONIBILIDADE = parseInt($(rec[0]).find(".HiddenRecordDISPONIBILIDADE").val());
            var NomeVoo = $(rec[0]).find(".HiddenRecordNomeVoo").val();
            var nomevooarr = NomeVoo.split("<br>");
            var Nnoites = parseInt($(rec[3]).text());
            var Unidades = parseInt($(rec[4]).find(".smNumInput").val());
            var NomeDirecao = $(rec[1]).text();
            var nomeArr = NomeDirecao.split("-");
            var partida = nomeArr[0];
            var destino = nomeArr[1];
            var margem = parseFloat($(rec[5]).find(".smNumInput").val());
            var commisao = parseFloat( $(rec[0]).find(".HiddenRecordCOMISSAO").val());
            var totalCusto = parseFloat($(rec[6]).text().replace(',', ''));
            var totalCustoPax =parseFloat($(rec[7]).text().replace(',', ''));
            var TotalVenda =parseFloat($(rec[8]).text().replace(',', ''));
            var TotalPax = parseFloat($(rec[9]).text().replace(',', ''));
            var Lucro = parseFloat($(rec[10]).text().replace(',', ''));
            var ht = $(rec[2]).html();
            var valorEur;
            var valorExterno;
            if(ht.indexOf("</br>")<0)
            {
                valorEur = parseFloat($(rec[2]).text().replace(',', ''));
                valorExterno = valorEur;
            }
            else{
                var strs = ht.split("</br>");
                valorEur = parseFloat($(strs[1]).text().replace(',', ''));
                valorExterno = parseFloat($(strs[0]).text().replace(',', ''));
            }



            var vooRec = {"vooidv":idv,
                "orcamentoidv":OrcamentoID,
                "fornecedoridv":fornecedoridv,
                "cambioidv":cambioidv,
                "ivaidv":Ivaidv,
                "tipocustoidv":tipocustoidv,
                "v_partida":partida,
                "v_destino":destino,
                "v_nomevoo":NomeVoo,
                "v_preco":valorExterno,
                "v_comissao":commisao,
                "v_net":net,
                "v_valorcambio":valorCambio,
                "v_valoreuros":TotalVenda,
                "v_margemvenda":margem,
                "v_markup":Markup,
                "v_taxaA":TAXAA,
                "v_taxaB":TAXAB,
                "v_numeropessoas":Unidades,
                "v_disponibilidade":DISPONIBILIDADE,
                "v_valortotalpvp":totalCusto,
                "v_valorporpessoapvp":totalCustoPax,
                "v_pagamento":APagameto,
                "v_datapagamento":ADataPagameto
            }

            $.post('http://www.touchgroup.com/sgtt/cfc/main.cfc?method=insertVoo',vooRec ,
                function (returnedData) {
                    var obj = JSON.parse(returnedData);
                
                    obj = null;
                }).fail(function () {
                    console.log("error");
            });

        


        }



        /*DIARIAS */

        var dataDiariaArr = [];

        var listaDiarias = $("#DiariaVerRecords tr");
        for (var i = 1; i < listaDiarias.length; i++){

            var rec = $(listaDiarias[i]).children();
        
            var DiariaIdv= $(rec[0]).find(".HiddenRecordId").val();
            var DiariaCambioidv= $(rec[0]).find(".HiddenRecordCambioIdv").val();
            var DiariaFornecedorID = $(rec[0]).find(".HiddenRecordIdFornecedor").val();
            var ServicosTipoServicoID = $(rec[0]).find(".HiddenRecordtipoServicoIdv").val();
            var DiariaComisao = parseFloat($(rec[0]).find(".HiddenRecordDiariaComisao").val());
            var DiariaCambioValor = parseFloat($(rec[0]).find(".HiddenRecordCambioValor").val());
            var DiariaMarkup = parseFloat($(rec[0]).find(".HiddenRecordMarkup").val());
        
            var ht = $(rec[2]).html();
            var valorEur;
            var valorExterno;
            if(ht.indexOf("</br>")<0)
            {
                valorEur = parseFloat($(rec[2]).text().replace(',', ''));
                valorExterno = valorEur;
            }
            else{
                var strs = ht.split("</br>");
                valorEur = parseFloat($(strs[1]).text().replace(',', ''));
                valorExterno = parseFloat($(strs[0]).text().replace(',', ''));
            }
        
        
            var DiariaNet = $(rec[0]).find(".HiddenRecordNet").val();
            var DiariaMargem = parseFloat($(rec[5]).find(".smNumInput").val());
            var DiariaIva = parseFloat($(rec[0]).find(".HiddenRecordIvaIdv").val());
            var DiariaObservaçoes = $(rec[11]).text();
            var DiariaNomeServico = $(rec[1]).text();
            var DiariaQuantidade = parseInt($(rec[3]).text());
            var DiariaPagamento = $(rec[0]).find(".HiddenRecordAPagamento").val();
            var DiariaPagamentoData = ConvertDateForSend($(rec[0]).find(".HiddenRecordADATAPagamento").val());
            
            var Str = $(rec[0]).text();
            var strarr = Str.split("-");
            var StrDt = strarr[1];
            var DiariaData = ConvertDateForSend(new Date.parse(StrDt));
        
        
            var TotalVendaPax = parseFloat($(rec[9]).text().replace(',', ''));
            var totalCusto = parseFloat($(rec[6]).text().replace(',', ''));
            var totalCustoPax =parseFloat($(rec[7]).text().replace(',', ''));
            var TotalVenda =parseFloat($(rec[8]).text().replace(',', ''));
            
            
            var Unidades = parseInt($(rec[4]).find(".smNumInput").val());
        
        
        
            dataDiaria = {"diariaidv": DiariaIdv,
                "orcamentoidv": OrcamentoID,
                "fornecedoridv": DiariaFornecedorID,
                "ivaidv": DiariaIva,
                "tipocustoidv": "4",
                "cambioidv": DiariaCambioidv,
                "d_nomeservico": DiariaNomeServico,
                "d_data": DiariaData,
                "d_preco": valorExterno,
                "d_comissao": DiariaComisao,
                "d_net": DiariaNet,
                "d_valorcambio": DiariaCambioValor,
                "d_valoreuros": valorEur,
                "d_quantidade": DiariaQuantidade,
                "d_unidades": Unidades,
                "d_margemvenda": DiariaMargem,
                "d_markup": DiariaMarkup,
                "d_pagamento": DiariaPagamento,
                "d_datapagamento": DiariaPagamentoData,
                "d_numeropessoas": Unidades,
                "d_valortotalpvp": totalCusto,
                "d_valorporpessoapvp": totalCustoPax,
                "d_observacoes": DiariaObservaçoes,
            }
        

            $.post('http://www.touchgroup.com/sgtt/cfc/main.cfc?method=insertDiaria', dataDiaria,
                function (returnedData) {
                    var obj = returnedData;
                    obj = null;
                }).fail(function () {
                    console.log("error");
            });
        }





        /*SERVICOS */
        var listServicos = $("#ServicosRecords tr");
        var listEnvioServicos = [];
        for(var x = 1; x< listServicos.length ; x++){

            var rec = $(listServicos[x]).children();

            var ServicosCambioidv= $(rec[0]).find(".HiddenRecordCambioIdv").val();
            var ServicosIdv= $(rec[0]).find(".HiddenRecordId").val();
            var ServicosFornecedorID = $(rec[0]).find(".HiddenRecordIdFornecedor").val();
            var ServicosTipoServicoID = $(rec[0]).find(".HiddenRecordtipoServicoIdv").val();
            var ServicosComisao = parseFloat($(rec[0]).find(".HiddenRecordServicosComisao").val());
            var CambioValor = parseFloat($(rec[0]).find(".HiddenRecordCambioValor").val());
            var ServicosMarkup = parseFloat($(rec[0]).find(".HiddenRecordMarkup").val());

            var ht = $(rec[2]).html();
            var valorEur;
            var valorExterno;
            if(ht.indexOf("</br>")<0)
            {
                valorEur = parseFloat($(rec[2]).text().replace(',', ''));
                valorExterno = valorEur;
            }
            else{
                var strs = ht.split("</br>");
                valorEur = parseFloat($(strs[1]).text().replace(',', ''));
                valorExterno = parseFloat($(strs[0]).text().replace(',', ''));
            }

        
            var ServicosNet = $(rec[0]).find(".HiddenRecordNet").val();
            var ServicosMargem = parseFloat($(rec[5]).find(".smNumInput").val());
            var ServicosIva = parseFloat($(rec[0]).find(".HiddenRecordIvaIdv").val());
            var ServicosObservacoes = $(rec[11]).text();
            var ServicosTipoServico = $(rec[1]).text();
            var ServicosQuantidade = parseInt($(rec[3]).text());
            var ServicoPagamento = $(rec[0]).find(".HiddenRecordAPagamento").val();
            var ServicosData = ConvertDateForSend($(rec[0]).find(".HiddenRecordADATAPagamento").val());
            var TotalVendaPax = parseFloat($(rec[9]).text().replace(',', ''));
            var totalCusto = parseFloat($(rec[6]).text().replace(',', ''));
            var totalCustoPax =parseFloat($(rec[7]).text().replace(',', ''));
            var TotalVenda =parseFloat($(rec[8]).text().replace(',', ''));


            var Unidades = $(rec[4]).find(".smNumInput").val();



             dataServicos = {
            	"servicoidv": ServicosIdv,
            	"orcamentoidv": OrcamentoID,
            	"fornecedoridv": ServicosFornecedorID,
            	"ivaidv": ServicosIva,
            	"tipocustoidv": "6",
            	"cambioidv": ServicosCambioidv,
            	"servicottidv": ServicosTipoServicoID,
            	"s_nomeservico": ServicosTipoServico,
            	"s_preco": valorExterno,
            	"s_comissao": ServicosComisao,
            	"s_net": ServicosNet,
            	"s_valorcambio": CambioValor,
            	"s_valoreuros": valorEur,
            	"s_quantidade": ServicosQuantidade,
            	"s_unidades": Unidades,
            	"s_margemvenda": ServicosMargem,
            	"s_markup": ServicosMarkup,
            	"s_pagamento": ServicoPagamento,
            	"s_datapagamento": ServicosData,
            	"s_numeropessoas": Unidades,
            	"s_valortotalpvp": totalCusto,
            	"s_valorporpessoapvp": totalCustoPax,
            	"s_observacoes":ServicosObservacoes 
            }


            $.post('http://www.touchgroup.com/sgtt/cfc/main.cfc?method=insertServico', dataServicos,
                function (returnedData) {
                    var obj = returnedData;
                    obj = null;
                }).fail(function () {
                    console.log("error");
            });

        }

    }
    
}



function LoadingProjecto(id, IdOrc) {

    
    var returnedDataOrcamentos = $("#OrcamentosActivosHidden").val();
    var returnedData = $("#ProjectoHidden").val();

    var orcamentos = JSON.parse(returnedDataOrcamentos);
    var obj = JSON.parse(returnedData);

    projectID = obj.projectoidv;

    GetProjectoFiles(projectID);
    $("#ProjectEstado").val(parseInt(obj.estadoidv));
    $("#ProjectoSigav").val(obj.sigavidv);
    $("#ProjectName").val(obj.p_nome);
    $("#ProjectoFornecedor").val(obj.f_nome);
    $("#ProjectoFornecedorID").val(obj.fornecedorIdv);
    $("#ProjectDescription").val(obj.p_descricao);
    $("#ProjectoNomeContacto").val(obj.NomeContacto);

    $("#ProjectoDesignerName").val(obj.Designer);

    $("#ProjectoAccountManagerName").val(obj.AccountManagerName);




    $(".AddOrcamentoBtn").css("display", "block");
    
    LoadingOrcamentos(projectID, IdOrc);
    
    obj = null;
    returnedData = null;

    

    $.each(orcamentos, function (index, obj) {

        var local = window.location;
        var page = window.location + '&IDorc=' + obj.orcamentoidv;
        var query = window.location.href;
        var page = query.split('?')[0];

        var orcamentoidv = obj.orcamentoidv;
        var projectoidv = obj.projectoidv;
        var o_nome = obj.o_nome;
        var pe = obj.pe;

        /*Criar o Link para os orçamentos*/
        page = page + "?ID=" + projectoidv + "&IDorc=" + orcamentoidv;
        /*Se o orcamento corresponder ao este ID entao é este que sera carregado nos inputs*/
        var aux;

        $("#OverviewOrcamentos tr:last").after("<tr>" +
            '<td><a href="' + page + '">' + o_nome + '</a>' +
            '<input type="hidden" class="HiddenRecordId" value="' + orcamentoidv + '">' + ' </td>' +
            ' </td>' +
            '<td>' + pe + '</td>' + 
            '</tr>');
    });



}
function LoadingOrcamentos(id, IdOrcOut) {

    var returnedData = $("#OrcamentosHidden").val();

    if (returnedData != "") {
        var Listobj = JSON.parse(returnedData);
        if (Listobj.length === 0) {
            var d = new Date();
            var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + "-v1";
            $("#OrcamentoNome").val(strDate);
        }
        $.each(Listobj, function (index, obj) {

            var local = window.location;
            var page = window.location + '&IDorc=' + obj.orcamentoidv;
            var query = window.location.href;
            var page = query.split('?')[0];

            var orcamentoidv = obj.orcamentoidv;
            var projectoidv = obj.projectoidv;
            var estadoidv = obj.estadoidv;
            var tipoivaidv = obj.tipoivaidv;
            var ivaidv = obj.ivaidv;
            var cambioidv = obj.cambioidv;
            var o_nome = obj.o_nome;
            var o_datacriacao = obj.o_datacriacao;
            var o_margemvenda = obj.o_margemvenda;
            var o_markup = obj.o_markup;
            var o_descricao = obj.o_descricao;
            var VersaoActual = obj.Versao;
            var OrcamentoParrent = obj.parrentorcamentoidv;


            var e_nome = obj.e_nome;
            var ti_nome = obj.ti_nome;
            var i_taxa = obj.i_taxa;
            var c_nome = obj.c_nome;
            var c_valor =  parseFloat(obj.c_valor);



            /*Criar o Link para os orçamentos*/
            page = page + "?ID=" + projectoidv + "&IDorc=" + orcamentoidv;
            /*Se o orcamento corresponder ao este ID entao é este que sera carregado nos inputs*/
            var aux;
            if (IdOrcOut === orcamentoidv) {   /*Este aux é para indicar qual é o orcamento selecionado */
                aux = '<tr class="Selected">';
                /*A partir daqui, se o orcamento é o mesmo, vai preencher os campos*/
                OrcamentoID = orcamentoidv;
                /* $("#ProjectoFornecedorID").val(fornecedoridv);/*Este é hidden*/
                /* $("#ProjectoFornecedor").val(fornecedoridv);*/
                $("#OrcamentoEstado").val(parseInt(estadoidv));
                $("#OrcamentoTipoIva").val(parseInt(tipoivaidv));
                $("#OrcamentoIva").val(parseInt(ivaidv));
                $("#OrcamentoNome").val(o_nome);
                $("#OrcamentoMargem").val(o_margemvenda);
                $("#OrcamentoMarkup").val(o_markup);
                $("#OrcamentoDescricao").val(o_descricao);
                $("#VersaoActual").val(VersaoActual);

                $("#VersaoID").text(o_nome);
                var DataInicioInput = ConvertDateForInput(obj.o_datainicio);

                $("#OrcamentoNumeroDePessoas").val(parseInt(obj.o_numeropessoas));
                $("#OrcamentoNoites").val(parseInt(obj.o_numeronoites));
                $("#OrcamentoDias").val(parseInt(obj.o_numerodias));
                $("#OrcamentoDataInicio").val(DataInicioInput);

                ParrentOrcamentoID = OrcamentoParrent;
                setDias(parseInt(obj.o_numerodias), obj.o_datainicio);

                LoadRecords(OrcamentoID);
                UpdateTabelaResume();
                $(".AddOrcamentoBtn").css("display", "block");

            }
            else {
                aux = '<tr>'
            }
            $("#ListaOrcamentos tr:last").after(aux +
                '<td><a href="' + page + '">' + o_nome + '</a>' +
                '<input type="hidden" class="HiddenRecordId" value="' + orcamentoidv + '">' + ' </td>' +
                ' </td>' +
                '<td>' + e_nome + '</td>' +
                '<td>' + ti_nome + '</td>' +
                '<td>' + i_taxa + '</td>' +
                '<td>' + c_nome + '</td>' +
                '<td>' + ConvertDateForOrcamentosTable(o_datacriacao) + '</td>' +
                '<td>' + o_margemvenda + '</td>' +
                '<td>' + o_markup + '</td>' +
                '<td>' + o_descricao + '</td>' +
                '<td>' + obj.o_numeropessoas+ '</td>' +
                '</tr>');
        });

    } 

}








function LoadRecords(idOrca) {

    //Alojamentos

    var returnedAlojamentos = $("#HiddenAlojamento").val();
    if (returnedAlojamentos != "") {
        var ListobjAlojamentos = JSON.parse(returnedAlojamentos);
        preencherTabelaAlojamentoLoading(ListobjAlojamentos);
    }
    
    //Voos
    var returnedVoos = $("#HiddenVoos").val();
    if (returnedVoos != "") {
        var ListobjVoos = JSON.parse(returnedVoos);
        preencherTabelaVoosLoading(ListobjVoos);
    }

    //Diarias
    var returnedDiarias = $("#HiddenDiarias").val();
    if (returnedDiarias != "") {
        var ListobjDiarias = JSON.parse(returnedDiarias);
        preencherTabelaDiariasLoading(ListobjDiarias);
    }
    //Servicos
    var returnedServicos = $("#HiddenServicos").val();
    if (returnedServicos != "") {
        var ListobjServicos = JSON.parse(returnedServicos);
        preencherTabelaServicosLoading(ListobjServicos);
    }
    

    $(".tablinks").css("display","block");
    $(".ProjectMenu button").css("display","block");
    
}


function insertTabelaFornecedores(fornecedoridv,fname, notas, data, valor){

    var aux =  {"fornecedoridv": fornecedoridv, "fname": fname, "notas": notas, "data": data , "valor": valor };
    
    ListafornecedoresGBL.push(aux);



	var uniqueNames = [];
	var ListaJson = [];
    
    
	$.each(ListafornecedoresGBL, function(i, el){
		if($.inArray(el["fornecedoridv"], uniqueNames) === -1)
		{ 
			ListaJson.push({"Fornecedor":el["fornecedoridv"],"Data":[]})
			uniqueNames.push(el["fornecedoridv"]);
            
		}


	});



    
    $("#FornecedoresRecords").find("tr:gt(0)").remove();

    $.each(ListafornecedoresGBL, function(index2) {
		var obj = ListafornecedoresGBL[index2];
		$.each(ListaJson, function(index) {
            
            if(ListaJson[index]["Fornecedor"] === obj["fornecedoridv"])
            {
                var fornname = obj["fname"];
                var notass = obj["notas"];
                var datass = obj["data"];
                var valorss = obj["valor"];
                ListaJson[index]["Data"].push({"fname": fornname, "notas": notass, "data": datass , "valor": valorss });

            }
							
		});
			
	});



	$.each(ListaJson, function(index) {
        var lista2 = ListaJson[index]["Data"];
        $.each(lista2, function(index2) {

            var len = ListaJson[index]["Data"].length;

            if(index2===0)
	        {
                $("#FornecedoresRecords tr:last").after('<tr>' +
                    '<td rowspan="'+len+'">' + lista2[index2]["fname"]+'</td>' +
                    '<td>' + lista2[index2]["notas"]+ '</td>' +
                    '<td>' + ConvertDateForTable( lista2[index2]["data"]) + '</td>' +
                    '<td>' + parseFloat(lista2[index2]["valor"]).formatMoney(2, '.', ',') + '</td>' +
                    '<td>' + 0 + '</td>' +
                    '</tr>');

	        }
	        else{
                $("#FornecedoresRecords tr:last").after('<tr>' +
                    '<td>' + lista2[index2]["notas"] + '</td>' +
                    '<td>' + ConvertDateForTable( lista2[index2]["data"]) + '</td>' +
                    '<td>' + parseFloat(lista2[index2]["valor"]).formatMoney(2, '.', ',') + '</td>' +
                    '</tr>');
	        }

        });


	
	});


    updateValues($("#FornecedoresRecords"));
        

}


function preencherTabelaServicosLoading(data){
    $.each(data, function (index,el) {


        
       /* 
        
        
        data.DATA["SERVICOTTIDV"][index];
        data.DATA["S_NOMESERVICO"][index];
        data.DATA["S_VALOREUROS"][index];
        data.DATA["S_UNIDADES"][index];
        data.DATA["S_NUMEROPESSOAS"][index];
        data.DATA["S_VALORTOTALPVP"][index];
        data.DATA["S_VALORPORPESSOAPVP"][index];
        data.DATA["I_TAXA"][index];
        data.DATA["TC_NOME"][index];
        */

        var a_pagamento = el.s_pagamento;
        var tipoServicoIdv = el.servicottidv;
        var a_datapagamento = el.s_datapagamento;
        var tipocustoidv = el.tipocustoidv;
        var ivaidv = el.ivaidv;
        var cambioidv = el.cambioidv;
        var servicoID = el.servicottidv;
        var ServicosFornecedor = el.f_nome;
        var ServicosFornecedorID = el.fornecedoridv;
        var ServicosTipoServico = el.stt_nome;
        var ServicosValor = parseFloat(el.s_preco);
        var ServicosMoedaCompra = parseFloat(el.s_valorcambio);
        var ServicosMoedaName = el.c_nome;
        var ServicosNet = parseFloat(el.s_net);
        var ServicosComisao = parseFloat(el.s_comissao);
        var ServicosMargem = parseFloat(el.s_margemvenda);
        var ServicosMarkup = parseFloat(el.s_markup);
        var ServicosObservacoes = el.s_observacoes;
        var ServicosQuantidade = parseInt(el.s_quantidade);
        var ServicosUnidades = parseInt(el.s_unidades);
        var ValorTotal = el.s_valoreuros;
        /*var ServicoPagamento = $("#ServicoPagamento").val();
        var ServicosData = ConvertDateForSend($("#ServicosData").val());*/

        var str = "";

        if (ServicosMoedaName === "EUR") {
            str = ServicosValor + '/' + ServicosMoedaName;
        }
        else {
            str = ServicosValor + '/' + ServicosMoedaName + '</br>' + (ServicosValor / ServicosMoedaName).formatMoney(2, '.', ',') + '/' + 'EUR';
        }
        
        //insertTabelaFornecedores(ServicosFornecedorID,ServicosFornecedor, a_pagamento, a_datapagamento, ValorTotal);

        $("#ServicosRecords tr:last").after('<tr>' +
            '<td>' + ServicosFornecedor +'<input type="hidden" class="HiddenRecordId" value="'+servicoID+'">'+
                        '<input type="hidden" class="HiddenRecordIdFornecedor" value="' + ServicosFornecedorID + '">' +
                        '<input type="hidden" class="HiddenRecordCambioIdv" value="' + cambioidv + '">' +
                        '<input type="hidden" class="HiddenRecordIvaIdv" value="' + ivaidv + '">' +
                        '<input type="hidden" class="HiddenRecordtipoServicoIdv" value="' + tipoServicoIdv + '">' +
                        '<input type="hidden" class="HiddenRecordServicosComisao" value="' + ServicosComisao + '">' +
                        '<input type="hidden" class="HiddenRecordCambioValor" value="' + ServicosMoedaCompra + '">' +
                        '<input type="hidden" class="HiddenRecordTipocustoidv" value="' + tipocustoidv + '">' +
                        '<input type="hidden" class="HiddenRecordNet" value="' + ServicosNet + '">' +
                         '<input type="hidden" class="HiddenRecordObs" value="' + ServicosObservacoes + '">' +
                        '<input type="hidden" class="HiddenRecordMarkup" value="' + ServicosMarkup + '">' +
                        '<input type="hidden" class="HiddenRecordAPagamento" value="' + a_pagamento + '">' +
                        '<input type="hidden" class="HiddenRecordADATAPagamento" value="' + a_datapagamento + '">' +
            '</td>' +
            '<td>' + ServicosTipoServico + '</td>' +
            '<td>' + str + '</td>' +
            '<td>' + ServicosQuantidade + '</td>' +
            '<td><input type="number" class="smNumInput" value="' + ServicosUnidades + '"></td>' +
            '<td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + ServicosMargem + '">%</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' +  '<img class="InfoObs" src="' + res4 + '" alt="Guardar">' + '</td>' +
            '<td class="OpIcons">' +
            '<img class=" " src="' + res + '" alt="saved">' +
            '<img class="SaveRecAloj" src="' + res2 + '" alt="Guardar">' +
            '<img class="rmvRecord" src="' + res3 + '" alt="remover">' +
            '</td>' +
            '</tr>');

        updateValues($("#ServicosRecords"));
        $("#ServicosVerRecords tr:last").after('<tr>' +
            '<td>' + ServicosFornecedor +'<input type="hidden" class="HiddenRecordId" value="'+servicoID+'">'+
            '<input type="hidden" class="HiddenRecordIdFornecedor" value="' + ServicosFornecedorID + '">' +
                        '<input type="hidden" class="HiddenRecordCambioIdv" value="' + cambioidv + '">' +
                        '<input type="hidden" class="HiddenRecordIvaIdv" value="' + ivaidv + '">' +
                        '<input type="hidden" class="HiddenRecordTipocustoidv" value="' + tipocustoidv + '">' +
                        '<input type="hidden" class="HiddenRecordNet" value="' + ServicosNet + '">' +
                        '<input type="hidden" class="HiddenRecordObs" value="' + ServicosObservacoes + '">' +
                        '<input type="hidden" class="HiddenRecordMarkup" value="' + ServicosMarkup + '">' +
                        '<input type="hidden" class="HiddenRecordAPagamento" value="' + a_pagamento + '">' +
                        '<input type="hidden" class="HiddenRecordADATAPagamento" value="' + a_datapagamento + '"></td>' +
            '<td>' + ServicosTipoServico + '</td>' +
            '<td>' + str + '</td>' +
            '<td>' + ServicosQuantidade + '</td>' +
            '<td><input type="number" class="smNumInput" value="' + ServicosUnidades + '"></td>' +
            '<td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + ServicosMargem + '">%</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + '<img class="InfoObs" src="' + res4 + '" alt="Guardar">' + '</td>' +
            '<td class="OpIcons">' +
            '<img class=" " src="' + res + '" alt="saved">' +
            '<img class="SaveRecAloj" src="' + res2 + '" alt="Guardar">' +
            '<img class="rmvRecord" src="' + res3 + '" alt="remover">' +
            '</td>' +
            '</tr>');
        updateValues($("#ServicosVerRecords"));
    });
    
    
}
function preencherTabelaDiariasLoading(data){
    $.each(data, function (index, el) {


      /*  
        data.DATA["D_NUMEROPESSOAS"][index];
        data.DATA["I_TAXA"][index];
        data.DATA["TC_NOME"][index];

        /*Verificar o dia e inserir conforme a data
        
        se dia for igual ao do orcamento Data Inicio
         -e primeiro dia

        */

        

        var DataDoRecord = Date.parse(el.d_data);
    
        
        var DataBase = $("#OrcamentoDataInicio").val()
        var dataInput2 = ConvertDateForTable(DataDoRecord);



        var numdias = parseInt($("#OrcamentoNdias").val());
        var DiariaAuxDia= 0;
        for(var x = 0; x < numdias;x++){
            var dataInicial = new Date.parse(DataBase);
            var d2 = new Date(dataInicial.add(x).days());
            var d3 = ConvertDateForTable(d2);
            
            if(dataInput2 === d3)
            {
                DiariaAuxDia = x+1;
                
            }
        }


        

        var RefAux = "#DiariasRecords" + DiariaAuxDia
        var tabela = $(RefAux);
        var fornecedoridv = el.fornecedoridv;
        var tipocustoidv = el.tipocustoidv;
        var ivaidv = el.ivaidv;

        var a_pagamento = el.d_pagamento;
        var a_datapagamento = el.d_datapagamento;

        var DiariaID = el.diariaidv;
        var DiariaFornecedor = el.f_nome;
        var DiariaComisao = parseFloat(el.d_comissao);
        var DiariaValor = parseFloat(el.d_preco);
        var DiariaTotalPvp = parseFloat(el.d_valortotalpvp);
        var DiariaTotalPAXPvp = parseFloat(el.d_valorporpessoapvp);
        var cambioidv = el.cambioidv;
        var DiariaCambioValor = parseFloat(el.v_valorcambio);
        var DiariaMoedaName = el.c_nome;
        var DiariaMarkup = parseFloat(el.d_markup);
        var DiariaNomeServico = el.d_nomeservico;
        var DiariaMargem = parseFloat(el.d_margemvenda);
        var DiariaNet = parseFloat(el.d_net);
        var DiariaObservaçoes = el.d_observacoes;
        var DiariaQuantidade = parseInt(el.d_quantidade);
        var DiariaUnidade = parseInt(el.d_unidades);
        var ValorTotal = el.d_valoreuros;


        var str = "";

        if (DiariaMoedaName === "EUR") {
            str = DiariaValor + '/' + DiariaMoedaName;
        }
        else {
            str = DiariaValor + '/' + DiariaMoedaName + '</br>' + (DiariaValor / DiariaCambioValor).formatMoney(2, '.', ',') + '/' + 'EUR';
        }
        insertTabelaFornecedores(fornecedoridv,DiariaFornecedor, a_pagamento, a_datapagamento, ValorTotal);

        RefAux += " tr:last";
        var htmlRec = '<tr><td>' + DiariaFornecedor + '-'+DiariaAuxDia+
             '<input type="hidden" class="HiddenRecordId" value="' + DiariaID + '">' + 
             '<input type="hidden" class="HiddenRecordIdFornecedor" value="' + fornecedoridv + '">' +
             '<input type="hidden" class="HiddenRecordCambioIdv" value="' + cambioidv + '">' +
             '<input type="hidden" class="HiddenRecordIvaIdv" value="' + ivaidv + '">' +
             '<input type="hidden" class="HiddenRecordTipocustoidv" value="' + tipocustoidv + '">' +
             '<input type="hidden" class="HiddenRecordCambioValor" value="' + DiariaCambioValor + '">' +
             '<input type="hidden" class="HiddenRecordDiariaComisao" value="' + DiariaComisao + '">' +
             '<input type="hidden" class="HiddenRecordNet" value="' + DiariaNet + '">' +
             '<input type="hidden" class="HiddenRecordObs" value="' + DiariaObservaçoes + '">' +
             '<input type="hidden" class="HiddenRecordMarkup" value="' + DiariaMarkup + '">' +
             '<input type="hidden" class="HiddenRecordAPagamento" value="' + a_pagamento + '">' +
             '<input type="hidden" class="HiddenRecordADATAPagamento" value="' + a_datapagamento + '">' +
             '<input type="hidden" class="HiddenRecordADATA" value="' + ConvertDateForSend(DataDoRecord) + '">' +
            '</td><td>' + DiariaNomeServico + '</td><td>'+str+'</td><td>' + DiariaQuantidade + '</td>' +
            '<td><input type="number" class="smNumInput" value="' + DiariaUnidade + '"></td><td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + DiariaMargem + '">%</td>' +
            '<td>' + DiariaTotalPvp + '</td><td>' + DiariaTotalPAXPvp + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + '<img class="InfoObs" src="' + res4 + '" alt="Guardar">' + '</td><td class="OpIcons">' +
            '<img class=" " src="' + res + '" alt="saved"><img class="SaveRecAloj" src="' + res2 + '" alt="Guardar"><img class="rmvRecord" src="' + res3 + '" alt="remover">' +
            '</td></tr>';


        $(RefAux).after(htmlRec);
        

        $("#DiariaVerRecords tr:last").after('<tr><td>' + DiariaFornecedor + '</br>'+ '-'+dataInput2+
             '<input type="hidden" class="HiddenRecordId" value="' + DiariaID + '">' + 
             '<input type="hidden" class="HiddenRecordIdFornecedor" value="' + fornecedoridv + '">' +
             '<input type="hidden" class="HiddenRecordCambioIdv" value="' + cambioidv + '">' +
             '<input type="hidden" class="HiddenRecordIvaIdv" value="' + ivaidv + '">' +
             '<input type="hidden" class="HiddenRecordTipocustoidv" value="' + tipocustoidv + '">' +
             '<input type="hidden" class="HiddenRecordCambioValor" value="' + DiariaCambioValor + '">' +
             '<input type="hidden" class="HiddenRecordDiariaComisao" value="' + DiariaComisao + '">' +
             '<input type="hidden" class="HiddenRecordNet" value="' + DiariaNet + '">' +
             '<input type="hidden" class="HiddenRecordObs" value="' + DiariaObservaçoes + '">' +
             '<input type="hidden" class="HiddenRecordMarkup" value="' + DiariaMarkup + '">' +
             '<input type="hidden" class="HiddenRecordAPagamento" value="' + a_pagamento + '">' +
             '<input type="hidden" class="HiddenRecordADATAPagamento" value="' + a_datapagamento + '">' +
             '<input type="hidden" class="HiddenRecordADATA" value="' + ConvertDateForSend(DataDoRecord) + '">' +
            '</td><td>' + DiariaNomeServico + '</td><td>'+str+'</td><td>' + DiariaQuantidade + '</td>' +
            '<td><input type="number" class="smNumInput" value="' + DiariaUnidade + '"></td><td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + DiariaMargem + '">%</td>' +
            '<td>' + DiariaTotalPvp + '</td><td>' + DiariaTotalPAXPvp + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + '<img class="InfoObs" src="' + res4 + '" alt="Guardar">' + '</td><td class="OpIcons">' +
            '<img class=" " src="' + res + '" alt="saved"><img class="SaveRecAloj" src="' + res2 + '" alt="Guardar"><img class="rmvRecord" src="' + res3 + '" alt="remover">' +
            '</td></tr>');

            
    });
    activator();
    
}
function preencherTabelaVoosLoading(data) {

    var testing = data;
    $.each(data, function (index,el) {

        var fornecedoridv = el.fornecedoridv;
        var cambioidv = el.cambioidv;
        var ivaidv = el.ivaidv;
        var tipocustoidv = el.tipocustoidv;
        var a_net = el.v_net;
        var a_markup = el.v_markup;
        var a_pagamento = el.v_pagamento;
        var a_datapagamento = el.v_datapagamento;



        var TAXAA = el.v_taxaA;
        var TAXAB = el.v_taxaB;
        var DISPONIBILIDADE = el.v_disponibilidade;
        var COMISSAO = el.v_comissao;
        /*
        var TAXA  =data.DATA["I_TAXA"][index];
        var NOME  =data.DATA["TC_NOME"][index];*/

        var id = el.vooidv;
        var VoosPartida = el.v_partida;
        var VoosDestino = el.v_destino;
        var VoosNomeVoo = el.v_nomevoo;
        var VoosValor = el.v_preco;
        var VoosMargemVenda = el.v_margemvenda;
        var VoosNLugares = el.v_numeropessoas;
        var VoosMoedaName = el.c_nome;
        var VoosFornecedor = el.f_nome;
        var totalpvp = el.v_valortotalpvp;
        var PessoaPvp = el.v_valorporpessoapvp;
        var VMoeda = el.v_valorcambio;
        var valorTotal = el.v_valoreuros;





        var str = "";

        if (VoosMoedaName === "EUR") {
            str = VoosValor + '/' + VoosMoedaName;
        }
        else {
            str = VoosValor + '/' + VoosMoedaName + '</br>' + (VoosValor / VMoeda).formatMoney(2, '.', ',') + '/' + 'EUR';
        }
        insertTabelaFornecedores(fornecedoridv,VoosFornecedor, a_pagamento, a_datapagamento, valorTotal);

    /*ciclos*/
        $('#VoosRecords tr:last').after('<tr>' +
            '<td>' + VoosNomeVoo +'</br>'+VoosFornecedor+'<input type="hidden" class="HiddenRecordId" value="' + id + '">' + 
             '<input type="hidden" class="HiddenRecordIdFornecedor" value="' + fornecedoridv + '">' +
             '<input type="hidden" class="HiddenRecordNomeVoo" value="' + VoosNomeVoo + '">' +
             '<input type="hidden" class="HiddenRecordCambioIdv" value="' + cambioidv + '">' +
             '<input type="hidden" class="HiddenRecordIvaIdv" value="' + ivaidv + '">' +
             '<input type="hidden" class="HiddenRecordTipocustoidv" value="' + tipocustoidv + '">' +
             '<input type="hidden" class="HiddenRecordNet" value="' + a_net + '">' +
             '<input type="hidden" class="HiddenRecordMarkup" value="' + a_markup + '">' +
             '<input type="hidden" class="HiddenRecordAPagamento" value="' + a_pagamento + '">' +
             '<input type="hidden" class="HiddenRecordTAXAA" value="' + TAXAA + '">' +
             '<input type="hidden" class="HiddenRecordTAXAB" value="' + TAXAB + '">' +
             '<input type="hidden" class="HiddenRecordDISPONIBILIDADE" value="' + DISPONIBILIDADE + '">' +
             '<input type="hidden" class="HiddenRecordCOMISSAO" value="' + COMISSAO + '">' +
             '<input type="hidden" class="HiddenRecordADATAPagamento" value="' + a_datapagamento + '">'+
             '<input type="hidden" class="HiddenRecordValorCambio" value="' + VMoeda + '">'  + '</td>' +
            '<td>' + VoosPartida + '-' + VoosDestino + '</td>' +
            '<td>' + str + '</td>' +
            '<td>' + DISPONIBILIDADE + '</td>' +
            '<td><input type="number" class="smNumInput" value="' + VoosNLugares + '"></td>' +
            '<td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + VoosMargemVenda + '">%</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td class="OpIcons">' +
            '<img class=" " src="' + res + '" alt="saved">' +
            '<img class="SaveRecAloj" src="' + res2 + '" alt="Guardar">' +
            '<img class="rmvRecord" src="' + res3 + '" alt="remover">' +
            '</td>' +
            '</tr>');
            
        updateValues($("#VoosRecords"));
            
        $('#VoosVerRecords tr:last').after('<tr>' +
            '<td>' + VoosNomeVoo +'<input type="hidden" class="HiddenRecordId" value="' + id + '">' + 
             '<input type="hidden" class="HiddenRecordIdFornecedor" value="' + fornecedoridv + '">' +
             '<input type="hidden" class="HiddenRecordNomeVoo" value="' + VoosNomeVoo + '">' +
             '<input type="hidden" class="HiddenRecordCambioIdv" value="' + cambioidv + '">' +
             '<input type="hidden" class="HiddenRecordIvaIdv" value="' + ivaidv + '">' +
             '<input type="hidden" class="HiddenRecordTipocustoidv" value="' + tipocustoidv + '">' +
             '<input type="hidden" class="HiddenRecordNet" value="' + a_net + '">' +
             '<input type="hidden" class="HiddenRecordMarkup" value="' + a_markup + '">' +
             '<input type="hidden" class="HiddenRecordAPagamento" value="' + a_pagamento + '">' +
             '<input type="hidden" class="HiddenRecordTAXAA" value="' + TAXAA + '">' +
             '<input type="hidden" class="HiddenRecordTAXAB" value="' + TAXAB + '">' +
             '<input type="hidden" class="HiddenRecordDISPONIBILIDADE" value="' + DISPONIBILIDADE + '">' +
             '<input type="hidden" class="HiddenRecordCOMISSAO" value="' + COMISSAO + '">' +
             '<input type="hidden" class="HiddenRecordADATAPagamento" value="' + a_datapagamento + '">'+
             '<input type="hidden" class="HiddenRecordValorCambio" value="' + VMoeda + '">'  + '</td>' +
            '<td>' + VoosPartida + '-' + VoosDestino + '</td>' +
            '<td>' + str + '</td>' +
            '<td>' + DISPONIBILIDADE + '</td>' +
            '<td><input type="number" class="smNumInput" value="' + VoosNLugares + '"></td>' +
            '<td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + VoosMargemVenda + '">%</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '<td class="OpIcons">' +
            '<img class=" " src="' + res + '" alt="saved">' +
            '<img class="SaveRecAloj" src="' + res2 + '" alt="Guardar">' +
            '<img class="rmvRecord" src="' + res3 + '" alt="remover">' +
            '</td>' +
            '</tr>');

        
        updateValues($("#VoosVerRecords"));
    });


    

}
function preencherTabelaAlojamentoLoading(data) {

	var uniqueNames = [];
	var ListaJson = [];
	$.each(data, function(i, el){
		if($.inArray(el.fornecedoridv, uniqueNames) === -1)
		{ 
		    ListaJson.push({ "Hotel": el.fornecedoridv, "alojamentos": [] })
		    uniqueNames.push(el.fornecedoridv);
		}
	});


    
	$.each(data, function(index, el){
		for(var x  =0 ; x < uniqueNames.length; x++)
		{
			var fornecedorunico = uniqueNames[x];
			var fornecedoraloj = el.fornecedoridv;
			if(fornecedorunico === fornecedoraloj)
			{
                var alojson = {
                    "alojamentoidv": el.alojamentoidv
                    , "f_nome": el.f_nome
                    , "fornecedoridv": el.fornecedoridv
                    , "quartoidv": el.quartoidv
                    , "cambioidv": el.cambioidv
                    , "a_valoreuros": el.a_valoreuros
                    , "a_numeronoites": el.a_numeronoites
                    , "a_margemvenda": el.a_margemvenda
                    , "a_numeroquartos": el.a_numeroquartos
                    , "a_valortotalpvp": el.a_valortotalpvp
                    , "a_valorporpessoapvp": el.a_valorporpessoapvp
                    , "q_nome": el.q_nome
                    , "c_nome": el.c_nome
                    , "a_preco": el.a_preco
                    , "a_observacoes": el.a_observacoes
                    , "a_valorcambio": el.a_valorcambio
                    , "a_comissao": el.a_comissao
                    , "i_taxa": el.i_taxa
                    , "a_numeropessoas": el.a_numeropessoas
                    , "ivaidv": el.ivaidv
                    , "tipocustoidv": el.tipocustoidv
                    , "a_net": el.a_net
                    , "a_markup": el.a_markup
                    , "a_pagamento": el.a_pagamento
                    , "a_datapagamento": el.a_datapagamento
                }
				
				ListaJson[x]["alojamentos"].push(alojson);
			}
		}
	});


    $.each(ListaJson, function (index) {

        $.each(ListaJson[index]["alojamentos"], function(index2) {
            
									
            var alojamentoidv = ListaJson[index]["alojamentos"][index2]["alojamentoidv"];
            var f_nome = ListaJson[index]["alojamentos"][index2]["f_nome"];
            var fornecedoridv = ListaJson[index]["alojamentos"][index2]["fornecedoridv"];
            var quartoidv = ListaJson[index]["alojamentos"][index2]["quartoidv"];
            var cambioidv =	ListaJson[index]["alojamentos"][index2]["cambioidv"];
            var a_valoreuros = ListaJson[index]["alojamentos"][index2]["a_valoreuros"];
            var a_numeronoites = ListaJson[index]["alojamentos"][index2]["a_numeronoites"];
            var a_margemvenda = ListaJson[index]["alojamentos"][index2]["a_margemvenda"];
            var a_numeroquartos	= ListaJson[index]["alojamentos"][index2]["a_numeroquartos"];
            var a_valortotalpvp	= ListaJson[index]["alojamentos"][index2]["a_valortotalpvp"];
            var a_valorporpessoapvp	= ListaJson[index]["alojamentos"][index2]["a_valorporpessoapvp"];
            var q_nome = ListaJson[index]["alojamentos"][index2]["q_nome"];
            var c_nome	= ListaJson[index]["alojamentos"][index2]["c_nome"];

            var a_preco	= ListaJson[index]["alojamentos"][index2]["a_preco"];
            var a_observacoes = ListaJson[index]["alojamentos"][index2]["a_observacoes"];
            var a_valorcambio = ListaJson[index]["alojamentos"][index2]["a_valorcambio"];
            var a_comissao = ListaJson[index]["alojamentos"][index2]["a_comissao"];
            var i_taxa = ListaJson[index]["alojamentos"][index2]["i_taxa"];
            var a_numeropessoas	= ListaJson[index]["alojamentos"][index2]["a_numeropessoas"];
            var ivaidv	= ListaJson[index]["alojamentos"][index2]["ivaidv"];
            var tipocustoidv= ListaJson[index]["alojamentos"][index2]["tipocustoidv"];
            var a_net = ListaJson[index]["alojamentos"][index2]["a_net"];

            var a_markup= ListaJson[index]["alojamentos"][index2]["a_markup"];
            var a_pagamento	= ListaJson[index]["alojamentos"][index2]["a_pagamento"];
            var a_datapagamento	= ListaJson[index]["alojamentos"][index2]["a_datapagamento"];

            var str = "";

            if (c_nome === "EUR") {
                str = a_preco + '/' + c_nome;
            }
            else {
                str = a_preco + '/' + c_nome + '</br>' + (a_preco / a_valorcambio).formatMoney(2, '.', ',') + '/' + 'EUR';
            }

			var len = ListaJson[index]["alojamentos"].length;
            
            insertTabelaFornecedores(fornecedoridv,f_nome, a_pagamento, a_datapagamento, a_valortotalpvp);

			if(index2===0)
			{

                $('#AlojamentoRecords tr:last').after('<tr>' +
                    '<td rowspan="'+len+'">' + f_nome + '</td>'+
                    '<td><input type="hidden" class="HiddenRecordId" value="' + alojamentoidv + '">' + 
                     '<input type="hidden" class="HiddenRecordIdFornecedor" value="' + fornecedoridv + '">' +
                     '<input type="hidden" class="HiddenRecordQuartoIdv" value="' + quartoidv + '">' +
                     '<input type="hidden" class="HiddenRecordCambioIdv" value="' + cambioidv + '">' +
                     '<input type="hidden" class="HiddenRecordIvaIdv" value="' + ivaidv + '">' +
                     '<input type="hidden" class="HiddenRecordTipocustoidv" value="' + tipocustoidv + '">' +
                     '<input type="hidden" class="HiddenRecordNet" value="' + a_net + '">' +
                     '<input type="hidden" class="HiddenRecordObs" value="' + a_observacoes + '">' +
                     '<input type="hidden" class="HiddenRecordMarkup" value="' + a_markup + '">' +
                     '<input type="hidden" class="HiddenRecordAPagamento" value="' + a_pagamento + '">' +
                     '<input type="hidden" class="HiddenRecordADATAPagamento" value="' + a_datapagamento + '">' +
                     '<input type="hidden" class="HiddenRecordValorCambio" value="' + a_valorcambio + '">' +'</br>'+q_nome+ '</td>' +
                    '<td>' + str + '</td>' +
                    '<td>' + a_numeronoites + '</td>' +
                    '<td><input type="number" class="smNumInput" value="' + parseInt(a_numeroquartos) + '"></td>' +
                    '<td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + parseFloat(a_margemvenda) + '">%</td>' +
                    '<td><input type="number" class="smNumInput" value="' + parseFloat(a_comissao) + '"></td>' +
                    '<td>' + parseFloat(a_valortotalpvp) + '</td>' +
                    '<td>' + parseFloat(a_valorporpessoapvp) + '</td>' +
                    '<td>' + parseFloat(a_valoreuros) + '</td>' +
                    '<td>' + 0 + '</td>' +
                    '<td>' + 0 + '</td>' +
                    '<td>' + '<img class="InfoObs" src="' + res4 + '" alt="Guardar">' +
                    '</td>' +
                    '<td class="OpIcons">' +
                    '<img class=" " src="' + res + '" alt="saved">' +
                    '<img class="SaveRecAloj" src="' + res2 + '" alt="Guardar">' +
                    '<img class="rmvRecord" src="' + res3 + '" alt="remover">' +
                    '</td>' +
                    '</tr>');

                $('#AlojamentoVerRecords tr:last').after('<tr>' +
                    '<td rowspan="'+len+'">' + f_nome + '</td>'+
                    '<td><input type="hidden" class="HiddenRecordId" value="' + alojamentoidv + '">' + 
                     '<input type="hidden" class="HiddenRecordIdFornecedor" value="' + fornecedoridv + '">' +
                     '<input type="hidden" class="HiddenRecordQuartoIdv" value="' + quartoidv + '">' +
                     '<input type="hidden" class="HiddenRecordCambioIdv" value="' + cambioidv + '">' +
                     '<input type="hidden" class="HiddenRecordIvaIdv" value="' + ivaidv + '">' +
                     '<input type="hidden" class="HiddenRecordTipocustoidv" value="' + tipocustoidv + '">' +
                     '<input type="hidden" class="HiddenRecordNet" value="' + a_net + '">' +
                     '<input type="hidden" class="HiddenRecordObs" value="' + a_observacoes + '">' +
                     '<input type="hidden" class="HiddenRecordMarkup" value="' + a_markup + '">' +
                     '<input type="hidden" class="HiddenRecordAPagamento" value="' + a_pagamento + '">' +
                     '<input type="hidden" class="HiddenRecordADATAPagamento" value="' + a_datapagamento + '">' +
                     '<input type="hidden" class="HiddenRecordValorCambio" value="' + a_valorcambio + '">' +'</br>'+q_nome+ '</td>' +
                    '<td>' + str + '</td>' +
                    '<td>' + a_numeronoites + '</td>' +
                    '<td><input type="number" class="smNumInput" value="' + parseInt(a_numeroquartos) + '"></td>' +
                    '<td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + parseFloat(a_margemvenda) + '">%</td>' +
                    '<td><input type="number" class="smNumInput" value="' + parseFloat(a_comissao) + '"></td>' +
                    '<td>' + parseFloat(a_valortotalpvp) + '</td>' +
                    '<td>' + parseFloat(a_valorporpessoapvp) + '</td>' +
                    '<td>' + parseFloat(a_valoreuros) + '</td>' +
                    '<td>' + 0 + '</td>' +
                    '<td>' + 0 + '</td>' +
                    '<td>' + '<img class="InfoObs" src="' + res4 + '" alt="Guardar">' +
                    '</td>' +
                    '<td class="OpIcons">' +
                    '<img class=" " src="' + res + '" alt="saved">' +
                    '<img class="SaveRecAloj" src="' + res2 + '" alt="Guardar">' +
                    '<img class="rmvRecord" src="' + res3 + '" alt="remover">' +
                    '</td>' +
                    '</tr>');
			}
			else{
                $('#AlojamentoRecords tr:last').after('<tr>' +
                    '<td><input type="hidden" class="HiddenRecordId" value="' + alojamentoidv + '">' + 
                     '<input type="hidden" class="HiddenRecordIdFornecedor" value="' + fornecedoridv + '">' +
                     '<input type="hidden" class="HiddenRecordQuartoIdv" value="' + quartoidv + '">' +
                     '<input type="hidden" class="HiddenRecordCambioIdv" value="' + cambioidv + '">' +
                     '<input type="hidden" class="HiddenRecordIvaIdv" value="' + ivaidv + '">' +
                     '<input type="hidden" class="HiddenRecordTipocustoidv" value="' + tipocustoidv + '">' +
                     '<input type="hidden" class="HiddenRecordNet" value="' + a_net + '">' +
                     '<input type="hidden" class="HiddenRecordObs" value="' + a_observacoes + '">' +
                     '<input type="hidden" class="HiddenRecordMarkup" value="' + a_markup + '">' +
                     '<input type="hidden" class="HiddenRecordAPagamento" value="' + a_pagamento + '">' +
                     '<input type="hidden" class="HiddenRecordADATAPagamento" value="' + a_datapagamento + '">' +
                     '<input type="hidden" class="HiddenRecordValorCambio" value="' + a_valorcambio + '">' +'</br>'+q_nome+ '</td>' +
                    '<td>' + str + '</td>' +
                    '<td>' + a_numeronoites + '</td>' +
                    '<td><input type="number" class="smNumInput" value="' + parseInt(a_numeroquartos) + '"></td>' +
                    '<td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + parseFloat(a_margemvenda) + '">%</td>' +
                    '<td><input type="number" class="smNumInput" value="' + parseFloat(a_comissao) + '"></td>' +
                    '<td>' + parseFloat(a_valortotalpvp) + '</td>' +
                    '<td>' + parseFloat(a_valorporpessoapvp) + '</td>' +
                    '<td>' + parseFloat(a_valoreuros) + '</td>' +
                    '<td>' + 0 + '</td>' +
                    '<td>' + 0 + '</td>' +
                    '<td>' + '<img class="InfoObs" src="' + res4 + '" alt="Guardar">' +
                    '</td>' +
                    '<td class="OpIcons">' +
                    '<img class=" " src="' + res + '" alt="saved">' +
                    '<img class="SaveRecAloj" src="' + res2 + '" alt="Guardar">' +
                    '<img class="rmvRecord" src="' + res3 + '" alt="remover">' +
                    '</td>' +
                    '</tr>');




                $('#AlojamentoVerRecords tr:last').after('<tr>' +
                    '<td><input type="hidden" class="HiddenRecordId" value="' + alojamentoidv + '">' + 
                     '<input type="hidden" class="HiddenRecordIdFornecedor" value="' + fornecedoridv + '">' +
                     '<input type="hidden" class="HiddenRecordQuartoIdv" value="' + quartoidv + '">' +
                     '<input type="hidden" class="HiddenRecordCambioIdv" value="' + cambioidv + '">' +
                     '<input type="hidden" class="HiddenRecordIvaIdv" value="' + ivaidv + '">' +
                     '<input type="hidden" class="HiddenRecordTipocustoidv" value="' + tipocustoidv + '">' +
                     '<input type="hidden" class="HiddenRecordNet" value="' + a_net + '">' +
                     '<input type="hidden" class="HiddenRecordObs" value="' + a_observacoes + '">' +
                     '<input type="hidden" class="HiddenRecordMarkup" value="' + a_markup + '">' +
                     '<input type="hidden" class="HiddenRecordAPagamento" value="' + a_pagamento + '">' +
                     '<input type="hidden" class="HiddenRecordADATAPagamento" value="' + a_datapagamento + '">' +
                     '<input type="hidden" class="HiddenRecordValorCambio" value="' + a_valorcambio + '">' +'</br>'+q_nome+ '</td>' +
                    '<td>' + str + '</td>' +
                    '<td>' + a_numeronoites + '</td>' +
                    '<td><input type="number" class="smNumInput" value="' + parseInt(a_numeroquartos) + '"></td>' +
                    '<td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + parseFloat(a_margemvenda) + '">%</td>' +
                    '<td><input type="number" class="smNumInput" value="' + parseFloat(a_comissao) + '"></td>' +
                    '<td>' + parseFloat(a_valortotalpvp) + '</td>' +
                    '<td>' + parseFloat(a_valorporpessoapvp) + '</td>' +
                    '<td>' + parseFloat(a_valoreuros) + '</td>' +
                    '<td>' + 0 + '</td>' +
                    '<td>' + 0 + '</td>' +
                    '<td>' + '<img class="InfoObs" src="' + res4 + '" alt="Guardar">' +
                    '</td>' +
                    '<td class="OpIcons">' +
                    '<img class=" " src="' + res + '" alt="saved">' +
                    '<img class="SaveRecAloj" src="' + res2 + '" alt="Guardar">' +
                    '<img class="rmvRecord" src="' + res3 + '" alt="remover">' +
                    '</td>' +
                    '</tr>');
			}
            
			
		});


    });
    updateValues($("#AlojamentoRecords"));
    updateValues($("#AlojamentoVerRecords"));

}






function InsertTableAlojamentoHotel(hotelname, valueID) {

    var num_tabs = $("#tabs#tabs ul li").length + 1;


    /*ICONS*/



    $("#tabs#tabs ul").append(
        "<li><a href='#tab" + num_tabs + "'>" + hotelname + "</a></li>"
    );

    
    var days = parseInt($("#OrcamentoNoites").val());

    var btnBill = "<button class='GetBill' type='button' style='padding: 0px'><img class='GetIcon 5' src='" + res7 + "' alt='Guardar'></button>";


    var btn = "<button class='GetBtnFornecedor' type='button' style='padding: 0px'><img class='GetIcon 5' src='" + res6 + "' alt='Guardar'></button>";



    var btnRemove = "<button class='RemoveBtnFornecedor' type='button' style='padding: 0px'><img class='removeFornecedor' src='img/remove.png' alt='remover'></button>";


    var hidden = "<input type='hidden' class='AlojamentoFornecedorID' value='" + valueID + "' >";
    var cnt = $(".AlojamentoHoteis").children().length + 1;

    var data = ConvertDateForInput($("#OrcamentoDataInicio").val());


    var quartosArr = JSON.parse($("#quartos").val());


    /*TABLE - FIRST ROW*/
    var table = "<table class='AlojamentoOverview " + cnt + "'><tr><td class='alojName'>" + hotelname + "</td>";


    $.each(quartosArr, function (index, obj) {
        if (obj.predefenido == true) {

            table += "<td><img class='rmvAlojType " + (index + 1) + "' src='img/remove.png' alt='remover'><input type='text' value='" + obj.q_nome + "' class='form-control AlojTableType'><input type='hidden' value='" + obj.capacidade + "' class='form-control AlojNPax  " + obj.quartoidv + "'></td>";
        }
    });
    table += "<td><img class='AddIcon AlojamentoTipos " + cnt + "' src='" + res5 + "' alt='Guardar'></td></tr>";


    /*TABLE - Day Rows*/

   for (var day = 0; day < days; day++) {

        var tomorrow = new Date(data)
        tomorrow.setDate(tomorrow.getDate() + day);
        /*ROW HEAD*/
        var tr = "<tr class='AlojDiasTable'><td> <input type='date' value='" + ConvertDateForInput(tomorrow) + "' class='form-control' class='AlojamentoDateAddVar'></td>";

        /*ROW Numbers*/
        $.each(quartosArr, function (index, obj) {
            if (obj.predefenido == true) {
                tr += "<td> <input type='number'  min-value='0' value='0'  class='AlojTableNumberIn " + obj.quartoidv + "' ></td>";
            }
        });

        /*ROW END*/
       tr += "<td><span class='AlojTotaisPax " + 0 + "'>0</span>% / <span class='AlojTotaisPaxN " + 0 + "'>0</span>pax</td></tr>";
        table += tr;
   }

   

    /*TABLE - Last ROW*/
   var lastTr = "<tr><td><img class='AddIcon AlojamentoDias' src='" + res5 + "' alt='Guardar'></td>";

   $.each(quartosArr, function (index, obj) {
       if (obj.predefenido == true) {
           lastTr += "<td><span class='AlojTotais " + obj.quartoidv + "'>0</span></td>";
       }
   });


   lastTr += "</tr></table>";
   table += lastTr;

    //$(".AlojamentoHoteis").append(table);
    $("#tabs#tabs").append(
            "<div id='tab" + num_tabs + "'>" + btnBill + hidden + btn + btnRemove + table + "</div>"
        );


   // var index = $('#tabs ul').index($('#tabId'));
   // $('#tabs ul').tabs('select', index);


    $("#tabs#tabs").tabs("refresh");
    RefreshAlojTableDias();

    $("#AlojamentoResume").css("display", "block");
}

function RefreshTabelaresume() {
    var tabelas = $(".AlojamentoOverview");
    var cntTotal = 0;
    var miarr = new Array;
    $(tabelas).each(function (i, tb) {

        var dias = $(tb).find(".AlojDiasTable");

        $(dias).each(function (i, dia) {


            var paxCnt = $(dia).find(".AlojTotaisPaxN").html();
            var myObject = new Object();
            myObject.index = i+1;
            myObject.cnt = parseInt(paxCnt);


            var found = false;
            $(miarr).each(function (i, d) {
                if (d.index == myObject.index) {
                    d.cnt += myObject.cnt;
                    found = true;
                }
            })
            if (!found)
            {
                miarr.push(myObject);
            }
        })
    })


    var days = parseInt($("#OrcamentoNoites").val());
    var data = ConvertDateForInput($("#OrcamentoDataInicio").val());
    $("#AlojamentoResumetable").find("tr:gt(0)").remove();

    var capacidadeTotalPax = parseInt($("#OrcamentoNumeroDePessoas").val());

    $(miarr).each(function (i, d) {

        var result = parseFloat((d.cnt * 100) / capacidadeTotalPax);


        $("#AlojamentoResumetable tr:last").after("<tr>" +
        '<td>' + d.index + ' </td>' +
        '<td>' + d.cnt + '</td>' +
        '<td>' + result + '</td>' +
        '</tr>');
    })



}


function UpdateTabelaResume() 
{

    var days = parseInt($("#OrcamentoNoites").val());
    var data = ConvertDateForInput($("#OrcamentoDataInicio").val());

     

    for (var day = 1; day <= days; day++) {
        /*ROW HEAD*/
        $("#AlojamentoResumetable tr:last").after("<tr>" +
            '<td>' + day + ' </td>' +
            '<td>' + 0 + '</td>' +
            '<td>' + 0 + '</td>' +
            '</tr>');
    }
}






function RefreshAlojTableDias() {
    //AlojamentoRecords
    $("#AlojamentoRecords").find("tr:gt(0)").remove();
    var tableas = $(".AlojamentoHoteis").find(".AlojamentoOverview");


    $(tableas).each(function (i, o) {

        var tipologias = $(o).find(".AlojTableType");
        var tipologiVal = $(".AlojNPax");

        var NomeHotel = $(o).find(".alojName").html();;

        var Rows = $(o).find(".AlojDiasTable");
        var totais = $(o).find(".AlojTotais");

        for (var i = 0; i < tipologias.length; i++) {
            var NomeTipo = tipologias[i].value;
            var totalQuartos = totais[i].innerHTML;
            if (i == 0) {
                $("#AlojamentoRecords tr:last").after('<tr>' +
                '<td rowspan="' + tipologias.length + '">' + NomeHotel +
                    '<input type="hidden" class="HiddenRecordId" value="' + 0 + '">' +
                    '<input type="hidden" class="HiddenRecordIdFornecedor" value="' + 0 + '">' +
                '<td>' + NomeTipo + '</td>' +
                '<td >' + totalQuartos + '</td>' +
                '<td><input type="number" class="smNumInput" value="' + parseInt(0) + '"></td>' +
                '<td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + parseFloat(0) + '">%</td>' +
                '<td><input type="number" class="smNumInput" value="' + parseFloat(0) + '"></td>' +
                '<td>' + parseFloat(0) + '</td>' +
                '<td>' + parseFloat(0) + '</td>' +
                '<td>' + parseFloat(0) + '</td>' +
                '<td>' + 0 + '</td>' +
                '</tr>');
            }
            else {
                $("#AlojamentoRecords tr:last").after('<tr>' +
                    '<td>' + NomeTipo + '</td>' +
                    '<td>' + totalQuartos + '</td>' +
                    '<td><input type="number" class="smNumInput" value="' + parseInt(0) + '"></td>' +
                    '<td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + parseFloat(0) + '">%</td>' +
                    '<td><input type="number" class="smNumInput" value="' + parseFloat(0) + '"></td>' +
                    '<td>' + parseFloat(0) + '</td>' +
                    '<td>' + parseFloat(0) + '</td>' +
                    '<td>' + parseFloat(0) + '</td>' +
                    '<td>' + 0 + '</td>' +
                    '</tr>');
            }

        }



    })

}
$('#tabs').on('change', '.AlojTableNumberIn', function () {



    var tipo = this.className.split(' ')[1];
    var table = $(this).parent().parent().parent().parent();

    var spns = $(table).find(".AlojTotais." + tipo);
    var arrInputs = $(table).find(".AlojTableNumberIn." + tipo);

    var total = 0;

    /*Somas*/
    $(arrInputs).each(function (i, input) {
        if (input.className.indexOf(tipo) > -1) {

            var valor = parseInt($(input).val());

            total += valor;
        }
    })


    $(spns).html(total.toString());
   
    $(".AlojamentoRecords").find()


    var capacidadeTotalPax = parseInt($("#OrcamentoNumeroDePessoas").val());

    var linhas = $(table).find(".AlojDiasTable");
    var AlojNPax = $(table).find(".AlojNPax");
    $(linhas).each(function (index, obj) {


        var Percentagem = $(obj).find(".AlojTotaisPax");
        var AlojTotaisPaxN = $(obj).find(".AlojTotaisPaxN");
        var nquartos = $(obj).find(".AlojTableNumberIn");
        var somapax = 0;

        $(nquartos).each(function (i, o) {

            var capac = parseInt(AlojNPax[i].value);
            var inputnumero = parseInt(o.value);
            somapax += inputnumero * capac;
        })



        var result = parseFloat((somapax * 100) / capacidadeTotalPax);

        
        
        $(AlojTotaisPaxN).html(somapax.toString());
        $(Percentagem).html(result.toFixed(2).toString());
    })

    
    
    
    RefreshTabelaresume();

     RefreshAlojTableDias();
});




$('.AlojamentoHoteis').on('click', '.rmvAlojType', function () {



    var table = $(this).parent().parent().parent().parent();
    var tipo = $(this).parent().index();
    $(table).find('tr').each(function () {
        this.removeChild(this.cells[tipo]);
    });
    RefreshAlojTableDias();
});

$('body').on('change', '#txtUploadFile', function () {

    var data = new FormData();

    var files = $("#txtUploadFile").get(0).files;

    // Add the uploaded image content to the form data collection
    if (files.length > 0) {
        data.append("UploadedImage", files[0]);
    }

    $.ajax({
        type: "POST",
        url: 'api/Postman/insertFicheiro?id=' + projectID + '&orcamentoid='+""+'&tipo=1',
        contentType: false,
        processData: false,
        data: data,
        success: function (result) {
            console.log(result);
            $("#txtUploadFile").val('');
            $("#FicheirosList").find("tr:gt(0)").remove();
            $(result).each(function (i, d) {
                var nome = d.Namefile;


                $("#FicheirosList tr:last").after("<tr>" +
                    '<td><a href="' + "#" + '">' + d.Namefile + '</a>' +
                    '<input type="hidden" class="HiddenRecordId" value="' + d.ID + '">' +
                    ' </td>' +
                    '<td>' + ConvertDateForOrcamentosTable(d.DataCriacao) + '</td>' +
                    '</tr>');
            })


        },
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3 + " " + p4;
            if (xhr.responseText && xhr.responseText[0] == "{")
                err = JSON.parse(xhr.responseText).Message;
            console.log(err);
        }
    });
        
    
});


$('body').on('change', '.PagamentoAnexo', function () {

    var data = new FormData();

    var files = $(".PagamentoAnexo").get(0).files;

    // Add the uploaded image content to the form data collection
    if (files.length > 0) {
        data.append("UploadedImage", files[0]);
    }

    $.ajax({
        type: "POST",
        url: 'api/Postman/insertFicheiro?id=' + projectID + '&orcamentoid=' + "" + '&tipo=2',
        contentType: false,
        processData: false,
        data: data,
        success: function (result) {
            console.log(result);
            $(".PagamentoAnexo").val('');

            
            $(result).each(function (i, d) {
                var nome = d.Namefile;


                $("#FicheirosList tr:last").after("<tr>" +
                    '<td><a href="' + "#" + '">' + d.Namefile + '</a>' +
                    '<input type="hidden" class="HiddenRecordId" value="' + d.ID + '">' +
                    ' </td>' +
                    '<td>' + ConvertDateForOrcamentosTable(d.DataCriacao) + '</td>' +
                    '</tr>');
            })


        },
        error: function (xhr, status, p3, p4) {
            var err = "Error " + " " + status + " " + p3 + " " + p4;
            if (xhr.responseText && xhr.responseText[0] == "{")
                err = JSON.parse(xhr.responseText).Message;
            console.log(err);
        }
    });


});

function GetProjectoFiles(id) {

    $.post('api/Postman/getProjectoFiles?id=' + id,
        function (returnedData) {
            $("#FicheirosList").find("tr:gt(0)").remove();
            $(returnedData).each(function (i, d) {
                var nome = d.Namefile;


                $("#FicheirosList tr:last").after("<tr>" +
                    '<td><a href="' + "#" + '">' + d.Namefile + '</a>' +
                    '<input type="hidden" class="HiddenRecordId" value="' + d.ID + '">' +
                    ' </td>' +
                    '<td>' + ConvertDateForOrcamentosTable(d.DataCriacao) + '</td>' +
                    '</tr>');
            })


        }).fail(function (response) {
            console.log("error");
        });
}


function sendAlojamento(objectToSend, save) {
    
    $.post('api/Postman/InsertAlojamento', objectToSend,
        function (returnedData) {
            
            if(save === true)
            {

            }
            else if(save === false){
                preencherTabelaAlojamento(returnedData);
                
            }
            
            
        }).fail(function (response) {
            console.log("error");
        });
}
function sendProjecto(objectToSend) {
    $.post('http://www.touchgroup.com/sgtt/cfc/main.cfc?method=insertProjecto', objectToSend,
        function (returnedData) {
            var obj = JSON.parse(returnedData);
            projectID = obj.DATA["PROJECTOIDV"][0];
            $(".AddOrcamentoBtn").css("display", "block");
            objectToSend = null;
        }).fail(function () {
            alert("Erro ao criar o projecto!");
            console.log("Erro ao criar o projecto!");
    });
}
function InsertProjectoInicial(objectToSend, orcamento) {
    $.post('api/Postman/insertProjectoTT', objectToSend,
        function (returnedData) {
            
            orcamento.projectoidv = returnedData.projectoidv;
            InsertOrcamentoInicial(orcamento);

        }).fail(function () {
            alert("Erro ao criar o projecto!");
    });
}

function InsertOrcamentoInicial(objectToSend) {
    $.post('api/Postman/insertOrcamento', objectToSend,
        function (returnedData) {

            OrcamentoID = returnedData.orcamentoidv;

            var page = 'NewProject?ID=' + returnedData.projectoidv;
            var page2 = page + "&IDorc=" + OrcamentoID;
            //insertTableListaAlojamento()
            window.location.href = page2;
            objectToSend = null;


        }).fail(function () {
            alert("Erro ao criar o Orçamento!");
            
    });
}

function sendOrcamento(objectToSend) {

    $.post('http://www.touchgroup.com/sgtt/cfc/main.cfc?method=insertOrcamento', objectToSend,
        function (returnedData) {
            var obj = JSON.parse(returnedData);
            OrcamentoID = obj.DATA["ORCAMENTOIDV"][0];
            var page = 'NewProject.aspx?ID='+projectID;
            var page2 = page + "&IDorc=" + OrcamentoID;
            window.location.href = page2;
            objectToSend = null;
        }).fail(function () {
            console.log("Erro ao criar o projecto!");
    });
}
function sendServicoTT(objectToSend, save) {
    $.post('api/Postman/InsertServico', objectToSend,
        function (returnedData) {

            if(save === true)
            {

            }
            else if(save === false){
                preencherTabelaServicosTT(returnedData);
            }
           

            obj = null;
            objectToSend= null;
        }).fail(function () {
            console.log("error insertServico");
        });
}
function sendDiaria(objectToSend, save) {
    $.post('api/Postman/insertDiaria', objectToSend,
        function (returnedData) {
            

            if(save === true)
            {

            }
            else if(save === false){
                preencherTabelaDiarias(returnedData);
            }
            obj = null;
            objectToSend= null;
        }).fail(function () {
            console.log("error");
        });
}
function sendVoo(objectToSend, save) {
    $.post('api/Postman/InsertVoos', objectToSend,
        function (returnedData) {
     
            
            if(save === true)
            {

            }
            else if(save === false){
                preencherTabelaVoos(returnedData);
            }
            obj = null;
            objectToSend= null;
        }).fail(function () {
            console.log("error");
        });
}
function sendFornecedor(objectToSend, idTab) {

    var res;
    var sedem = JSON.stringify(objectToSend);
    $.post('api/Postman/insertFornecedor',  objectToSend,
        function (returnedData) {

            if (returnedData != "")
            {
                $(".FornecedorCheck").css("display","block");
                
                //FornecedorInsertInputs(returnedData, idTab);

                setTimeout(function() {
                    $("#NovoFornecedorModel").toggle("slow");
                    /* limpar campos */
                    $(".FornecedorError").css("display","none");
                    $(".FornecedorCheck").css("display","none");
                    $("#FornecedorNome").val("");
                    $("#FornecedorTipoServico option:selected").val()
                    $("#FornecedorPais option:selected").text();
                    $("#FornecedorPais option:selected").val();
                    $("#FornecedorCidade").val("");
                    $("#FornecedorNomeComercial").val("");
                    $("#FornecedorLocalidade").val("");
                    $("#FornecedorMorada").val("");
                    $("#FornecedorCodigoPostal").val("");
                    $("#FornecedorTelefone").val("");
                    $("#FornecedorFax").val("");
                    $("#FornecedorTelemovel").val("");
                    $("#FornecedorContacto").val("");
                    $("#FornecedorEmail").val("");
                    $("#FornecedorUrl").val("");
                    $("#FornecedorContribuinte").val("");
                    $("#FornecedorTipoFornecedor option:selected").val()
                }, 500);
            }
            else{
                $(".FornecedorError").css("display","block");
            }
            

            res = null;
        }).fail(function () {
            console.log("erro insertFornecedor");
        });
}

function GetFornecedor(objectToSend,idTab) {




    var res;
    $.post('api/Postman/getFornecedor', { "fornecedoridv": objectToSend },
        function (returnedData) {
            res = returnedData;

            if(res.fornecedoridv != null)
            {



                var FORNECEDORIDV = res.fornecedoridv

                $("#FornecedorPais option:selected").val(res.paisidv);
                var tipoc = res.tipocustoidv;
                $("#FornecedorNome").val(res.f_nome);
                $("#FornecedorCidade").val(res.cidade);
                $("#FornecedorNomeComercial").val(res.f_nomecomercial);
                $("#FornecedorMorada").val(res.f_morada);
                $("#FornecedorLocalidade").val(res.f_localidade);
                $("#FornecedorCodigoPostal").val(res.f_codigopostal);
                $("#FornecedorTelefone").val(res.f_telefone);
                $("#FornecedorFax").val(res.f_fax);
                $("#FornecedorTelemovel").val(res.f_telemovel);
                $("#FornecedorContacto").val(res.f_contacto);
                $("#FornecedorEmail").val(res.f_email);
                $("#FornecedorUrl").val(res.f_url);
                $("#FornecedorContribuinte").val(res.f_contribuinte);
                $("#FornecedorTipoFornecedor option:selected").text(res.tipofornecedoreidv);

                /*$(".FornecedorCheck").css("display","block");*/
                
               /* FornecedorInsertInputs(res, idTab);*/
                $('#NovoFornecedorModel').modal('show');
                $('.modal-backdrop').remove();

                /*var testeDiarias = $('.DiariaTables > tbody > tr').not(':first');*/
                    /* limpar campos */
                    $(".FornecedorError").css("display","none");
                    $(".FornecedorCheck").css("display","none");




            }
            else{
                $(".FornecedorError").css("display","block");
            }
            

            res = null;
        }).fail(function () {
            console.log("erro insertFornecedor");
        });
}






function preencherTabelaAlojamento(data) {

    
    $("#AlojamentoRecords").find("tr:gt(0)").remove();
    $("#AlojamentoVerRecords").find("tr:gt(0)").remove();

    $.post('api/Postman/GetListAlojamento', data,
        function (returnedData) {
            
            preencherTabelaAlojamentoLoading(returnedData);
            obj = null;
        }).fail(function () {
            console.log("Erro ao fazer ao carregar os alojamentos!");
    });


}
function preencherTabelaVoos(data){


    $("#VoosRecords").find("tr:gt(0)").remove();
    $("#VoosVerRecords").find("tr:gt(0)").remove();

    $.post('api/Postman/getVoos', data,
        function (returnedData) {
            
            preencherTabelaVoosLoading(returnedData);
            obj = null;
        }).fail(function () {
            console.log("Erro ao fazer ao carregar os alojamentos!");
    });

}

function preencherTabelaServicosTT(data){



    $("#ServicosRecords").find("tr:gt(0)").remove();
    $("#ServicosVerRecords").find("tr:gt(0)").remove();

    $.post('api/Postman/getAllServicos', data,
        function (returnedData) {
           
            
            preencherTabelaServicosLoading(returnedData);
            obj = null;
        }).fail(function () {
            console.log("Erro ao fazer ao carregar os alojamentos!");
        });

}

function preencherTabelaDiarias(data){

    $(".DiariaTables").find("tr:gt(0)").remove();
    $("#DiariaVerRecords").find("tr:gt(0)").remove();

    $.post('api/Postman/getAllDiarias', { 'ORCAMENTOIDV': OrcamentoID },
        function (returnedData) {
        
            preencherTabelaDiariasLoading(returnedData);
            obj = null;
        }).fail(function () {
            console.log("Erro ao fazer ao carregar os alojamentos!");
    });


}


function updateTotaisLabels(){
    var listTBs = $(".TotalCompra").parent().parent().parent();
    
    var total = 0;
    var totalVenda = 0;
    var totalLucro = 0
    $.each(listTBs, function(index, el){
        var trs = $(listTBs[index]).children().children();

        for(var i = 1; i < trs.length; i++ ){
            var t = $(trs[i]).children();
            var nomeTB = listTBs[index].id;
            if(nomeTB === "AlojamentoVerRecords")
            {
                if(t.length === 14){
                    var test = parseFloat(t[7].innerHTML.replace(',', ''));
                    var totalVE = parseFloat(t[9].innerHTML.replace(',', ''));
                    var totaLuc = parseFloat(t[11].innerHTML.replace(',', ''));
                    total = total + test;
                    totalVenda = totalVenda +totalVE;
                    totalLucro = totalLucro +totaLuc;

                }
                else if(t.length ===13){
                    var test = parseFloat(t[6].innerHTML.replace(',', ''));
                    var totaLuc = parseFloat(t[10].innerHTML.replace(',', ''));
                    var totalVE = parseFloat(t[8].innerHTML.replace(',', ''));
                     total = total + test;
                     totalVenda = totalVenda +totalVE;
                     totalLucro = totalLucro +totaLuc;

                }
            }
            if(nomeTB === "VoosVerRecords")
            {
                    var totaLuc = parseFloat(t[10].innerHTML.replace(',', ''));
                    var totalVE = parseFloat(t[8].innerHTML.replace(',', ''));
                    var test = parseFloat(t[6].innerHTML.replace(',', ''));
                    total = total + test;       
                    totalVenda = totalVenda +totalVE;         
                    totalLucro = totalLucro +totaLuc;    
 
            }
            if(nomeTB === "DiariaVerRecords")
            {
                    var totaLuc = parseFloat(t[10].innerHTML.replace(',', ''));
                    var totalVE = parseFloat(t[8].innerHTML.replace(',', ''));
                    var test = parseFloat(t[6].innerHTML.replace(',', ''));
                    total = total + test;
                    totalVenda = totalVenda +totalVE;
                    totalLucro = totalLucro +totaLuc;

            }
            if(nomeTB === "ServicosVerRecords")
            {
                    var totaLuc = parseFloat(t[10].innerHTML.replace(',', ''));
                    var totalVE = parseFloat(t[8].innerHTML.replace(',', ''));
                    var test = parseFloat(t[6].innerHTML.replace(',', ''));
                    total = total + test;
                    totalVenda = totalVenda +totalVE;
                    totalLucro = totalLucro +totaLuc;


            }
        }
    });
    
    $("#TotalGasto").text("Total a gastar: " + total.formatMoney(2, '.', ','));
    $("#TotalVenda").text("Total a receber: " + totalVenda.formatMoney(2, '.', ','));
    $("#totalLucro").text("Total de Lucro: " + totalLucro.formatMoney(2, '.', ','));


}

function updateValues(FiredTable) {

    var tableName =  "#"+FiredTable.attr("id");
    var trs = $(tableName).children().children();

    if(tableName === "#AlojamentoRecords" || tableName === "#AlojamentoVerRecords"){
        for (var x = 1; x < trs.length; x++) {
            var capc;
            var tds = $(trs[x]).children();
            if(tds.length === 14)
            {
                capc = parseInt($(tds[1]).find(".HiddenRecordQuartoIdv").val());
                var unitNights = parseInt(tds[3].innerHTML, 10);
                var units = parseInt($(tds[4]).find("input").val(), 10);
                var margem = parseFloat($(tds[5]).find("input").val());

                var TotalLucro = parseInt(tds[8].innerHTML, 10);
                var TotalLucroPax = parseInt(tds[9].innerHTML, 10);
                var unitCost = tds[2].innerHTML;
                if (unitCost.indexOf("<br>") >= 0) {
                    var t = unitCost.split('<br>');
                    var MoedaCompra = t[0].split('/');

                    var Vcompra = parseFloat(t[0]);
                    var VEuro = parseFloat(t[1]);

                    /*Total*/
                    $(tds[7]).html(
                        ((Vcompra * unitNights) * units).formatMoney(2, '.', ',') + '/' + MoedaCompra[1] + '</br>' +
                        ((VEuro * unitNights) * units).formatMoney(2, '.', ',')
                    );
                    /*TotalPAX*/
                    $(tds[8]).html(
                        ((Vcompra * unitNights) / capc).formatMoney(2, '.', ',') + '' + MoedaCompra[1] + '</br>' +
                        ((VEuro * unitNights) / capc).formatMoney(2, '.', ',')
                    );
                    /*TotalVenda*/
                    $(tds[9]).html((((VEuro * units * unitNights) / 100) * margem + (VEuro * units * unitNights)).formatMoney(2, '.', ','));
                    /*TotalVendaPAX*/
                    $(tds[10]).html(((((VEuro * unitNights) / capc) / 100) * margem + (VEuro * unitNights) / capc).formatMoney(2, '.', ','));
                    /*TotalLucro*/
                    $(tds[11]).html(((((VEuro * units * unitNights) / 100) * margem + (VEuro * units * unitNights)) - (VEuro * units * unitNights)).formatMoney(2, '.', ','));

                }
                else {
                    unitCost = parseFloat(tds[2].innerHTML);

                    /*Total*/
                    $(tds[7]).html(((unitCost * unitNights) * units).formatMoney(2, '.', ','));
                    /*TotalPAX*/
                    $(tds[8]).html(((unitCost * unitNights) / capc).formatMoney(2, '.', ','));
                    /*TotalVenda*/
                    $(tds[9]).html((((unitCost * units * unitNights) / 100) * margem + (unitCost * units * unitNights)).formatMoney(2, '.', ','));
                    /*TotalVendaPAX*/
                    $(tds[10]).html(((((unitCost * unitNights) / capc) / 100) * margem + (unitCost * unitNights) / capc).formatMoney(2, '.', ','));
                    /*TotalLucro*/
                    $(tds[11]).html(((((unitCost * units * unitNights) / 100) * margem + (unitCost * units * unitNights)) - (unitCost * units * unitNights)).formatMoney(2, '.', ','));


                }
            }
            else{
                 capc = parseInt($(tds[0]).find(".HiddenRecordQuartoIdv").val());
                var unitNights = parseInt(tds[2].innerHTML, 10);
                var units = parseInt($(tds[3]).find("input").val(), 10);
                var margem = parseFloat($(tds[4]).find("input").val());

                var TotalLucro = parseInt(tds[7].innerHTML, 10);
                var TotalLucroPax = parseInt(tds[8].innerHTML, 10);
                var unitCost = tds[1].innerHTML;

                if (unitCost.indexOf("<br>") >= 0) {
                    var t = unitCost.split('<br>');
                    var MoedaCompra = t[0].split('/');

                    var Vcompra = parseFloat(t[0]);
                    var VEuro = parseFloat(t[1]);

                    /*Total*/
                    $(tds[6]).html(
                        ((Vcompra * unitNights) * units).formatMoney(2, '.', ',') + '/' + MoedaCompra[1] + '</br>' +
                        ((VEuro * unitNights) * units).formatMoney(2, '.', ',')
                    );
                    /*TotalPAX*/
                    $(tds[7]).html(
                        ((Vcompra * unitNights) / capc).formatMoney(2, '.', ',') + '' + MoedaCompra[1] + '</br>' +
                        ((VEuro * unitNights) / capc).formatMoney(2, '.', ',')
                    );
                    /*TotalVenda*/
                    $(tds[8]).html((((VEuro * units * unitNights) / 100) * margem + (VEuro * units * unitNights)).formatMoney(2, '.', ','));
                    /*TotalVendaPAX*/
                    $(tds[8]).html(((((VEuro * unitNights) / capc) / 100) * margem + (VEuro * unitNights) / capc).formatMoney(2, '.', ','));
                    /*TotalLucro*/
                    $(tds[10]).html(((((VEuro * units * unitNights) / 100) * margem + (VEuro * units * unitNights)) - (VEuro * units * unitNights)).formatMoney(2, '.', ','));

                }
                else {
                    unitCost = parseFloat(tds[1].innerHTML);

                    /*Total*/
                    $(tds[6]).html(((unitCost * unitNights) * units).formatMoney(2, '.', ','));
                    /*TotalPAX*/
                    $(tds[7]).html(((unitCost * unitNights) / capc).formatMoney(2, '.', ','));
                    /*TotalVenda*/
                    $(tds[8]).html((((unitCost * units * unitNights) / 100) * margem + (unitCost * units * unitNights)).formatMoney(2, '.', ','));
                    /*TotalVendaPAX*/
                    $(tds[9]).html(((((unitCost * unitNights) / capc) / 100) * margem + (unitCost * unitNights) / capc).formatMoney(2, '.', ','));
                    /*TotalLucro*/
                    $(tds[10]).html(((((unitCost * units * unitNights) / 100) * margem + (unitCost * units * unitNights)) - (unitCost * units * unitNights)).formatMoney(2, '.', ','));


                }
            }
            



        }
    }
    if(tableName === "#VoosRecords" || tableName === "#VoosVerRecords"){
        for (var x = 1; x < trs.length; x++) {
            var tds = $(trs[x]).children();

            var capc = parseInt(tds[1].innerHTML, 10);

            var unitNights = parseInt(tds[3].innerHTML, 10);
            var units = parseInt($(tds[4]).find("input").val(), 10);



            var margem = parseFloat($(tds[5]).find("input").val());
        
            var TotalLucro = parseInt(tds[8].innerHTML, 10);
            var TotalLucroPax = parseInt(tds[9].innerHTML, 10);
            var unitCost = tds[2].innerHTML;
        
        
            if (unitCost.indexOf("<br>") >= 0) {
                var t = unitCost.split('<br>');
                var MoedaCompra = t[0].split('/');
            
                var Vcompra = parseFloat(t[0]);
                var VEuro = parseFloat(t[1]);
            
                /*Total GASTO*/
                $(tds[6]).html(
                    (Vcompra * units).formatMoney(2, '.', ',') + '/' + MoedaCompra[1] + '</br>' +
                    (VEuro * units).formatMoney(2, '.', ',')
                );
                /*Total GASTO PAX*/
                $(tds[7]).html(
                    (Vcompra).formatMoney(2, '.', ',') + '' + MoedaCompra[1] + '</br>' +
                    (VEuro).formatMoney(2, '.', ',')
                );
                /*TotalVenda*/
                $(tds[8]).html((((VEuro * units ) / 100) * margem + (VEuro * units)).formatMoney(2, '.', ','));
                /*TotalVendaPAX*/
                $(tds[9]).html((((VEuro / 100) * margem) + VEuro).formatMoney(2, '.', ','));
                /*TotalLucro*/
                $(tds[10]).html((((VEuro * units ) / 100) * margem + (VEuro * units) - (VEuro * units)).formatMoney(2, '.', ','));
            
            }
            else {
                unitCost = parseFloat(tds[2].innerHTML);
            
                /*Total*/
                $(tds[6]).html((unitCost * units).formatMoney(2, '.', ','));
                /*TotalPAX*/
                $(tds[7]).html((unitCost ).formatMoney(2, '.', ','));
                /*TotalVenda*/
                $(tds[8]).html((((unitCost * units ) / 100) * margem + (unitCost * units )).formatMoney(2, '.', ','));
                /*TotalVendaPAX*/
                $(tds[9]).html((((unitCost) / 100) * margem + unitCost).formatMoney(2, '.', ','));
                /*TotalLucro*/
                $(tds[10]).html((((unitCost * units ) / 100) * margem + (unitCost * units ) - (unitCost * units)).formatMoney(2, '.', ','));
            
            
            }
        
        }
    }
    if(tableName.indexOf("#DiariasRecords") >= 0  || tableName === "#DiariaVerRecords"){
        for (var x = 1; x < trs.length; x++) {
            var tds = $(trs[x]).children();

            var unitNights = parseInt(tds[3].innerHTML, 10);
            var units = parseInt($(tds[4]).find("input").val(), 10);


            var qnt = parseInt(tds[3].innerHTML, 10);
            var margem = parseFloat($(tds[5]).find("input").val());
        
            var TotalLucro = parseInt(tds[8].innerHTML, 10);
            var TotalLucroPax = parseInt(tds[9].innerHTML, 10);
            var unitCost = tds[2].innerHTML;
        
        
            if (unitCost.indexOf("<br>") >= 0) {
                var t = unitCost.split('<br>');
                var MoedaCompra = t[0].split('/');
            
                var Vcompra = parseFloat(t[0]);
                var VEuro = parseFloat(t[1]);
            
                /*Total GASTO*/
                $(tds[6]).html(
                    (Vcompra * units).formatMoney(2, '.', ',') + '/' + MoedaCompra[1] + '</br>' +
                    (VEuro * units).formatMoney(2, '.', ',')
                );
                /*Total GASTO PAX*/
                $(tds[7]).html(
                    (Vcompra / qnt).formatMoney(2, '.', ',') + '' + MoedaCompra[1] + '</br>' +
                    (VEuro / qnt).formatMoney(2, '.', ',')
                );
                /*TotalVenda*/
                $(tds[8]).html((((VEuro * units ) / 100) * margem + (VEuro * units)).formatMoney(2, '.', ','));
                /*TotalVendaPAX*/
                $(tds[9]).html(((((VEuro / qnt) / 100) * margem) + VEuro).formatMoney(2, '.', ','));
                /*TotalLucro*/
                $(tds[10]).html((((VEuro * units ) / 100) * margem + (VEuro * units) - (VEuro * units)).formatMoney(2, '.', ','));
            
            }
            else {
                unitCost = parseFloat(tds[2].innerHTML);
            
                /*Total*/
                $(tds[6]).html((unitCost * units).formatMoney(2, '.', ','));
                /*TotalPAX*/
                $(tds[7]).html((unitCost / qnt).formatMoney(2, '.', ','));
                /*TotalVenda*/
                $(tds[8]).html((((unitCost * units ) / 100) * margem + (unitCost * units )).formatMoney(2, '.', ','));
                /*TotalVendaPAX*/
                $(tds[9]).html(((((unitCost * units ) / 100) * margem + (unitCost * units ))/qnt).formatMoney(2, '.', ','));
                /*TotalLucro*/
                $(tds[10]).html((((unitCost * units ) / 100) * margem + (unitCost * units ) - (unitCost * units)).formatMoney(2, '.', ','));
            
            
            }
        
        }
    }
    if(tableName === "#ServicosRecords" || tableName === "#ServicosVerRecords"){
        for (var x = 1; x < trs.length; x++) {
            var tds = $(trs[x]).children();

            var capc = parseInt(tds[1].innerHTML, 10);

            var unitNights = parseInt(tds[3].innerHTML, 10);
            var units = parseInt($(tds[4]).find("input").val(), 10);



            var margem = parseFloat($(tds[5]).find("input").val());
        
            var TotalLucro = parseInt(tds[8].innerHTML, 10);
            var TotalLucroPax = parseInt(tds[9].innerHTML, 10);
            var unitCost = tds[2].innerHTML;
        
        
            if (unitCost.indexOf("<br>") >= 0) {
                var t = unitCost.split('<br>');
                var MoedaCompra = t[0].split('/');
            
                var Vcompra = parseFloat(t[0]);
                var VEuro = parseFloat(t[1]);
            
                /*Total GASTO*/
                $(tds[6]).html(
                    (Vcompra * units).formatMoney(2, '.', ',') + '/' + MoedaCompra[1] + '</br>' +
                    (VEuro * units).formatMoney(2, '.', ',')
                );
                /*Total GASTO PAX*/
                $(tds[7]).html(
                    (Vcompra).formatMoney(2, '.', ',') + '' + MoedaCompra[1] + '</br>' +
                    (VEuro).formatMoney(2, '.', ',')
                );
                /*TotalVenda*/
                $(tds[8]).html((((VEuro * units ) / 100) * margem + (VEuro * units)).formatMoney(2, '.', ','));
                /*TotalVendaPAX*/
                $(tds[9]).html((((VEuro / 100) * margem) + VEuro).formatMoney(2, '.', ','));
                /*TotalLucro*/
                $(tds[10]).html((((VEuro * units ) / 100) * margem + (VEuro * units) - (VEuro * units)).formatMoney(2, '.', ','));
            
            }
            else {
                unitCost = parseFloat(tds[2].innerHTML);
            
                /*Total*/
                $(tds[6]).html((unitCost * units).formatMoney(2, '.', ','));
                /*TotalPAX*/
                $(tds[7]).html((unitCost ).formatMoney(2, '.', ','));
                /*TotalVenda*/
                $(tds[8]).html((((unitCost * units ) / 100) * margem + (unitCost * units )).formatMoney(2, '.', ','));
                /*TotalVendaPAX*/
                $(tds[9]).html((((unitCost) / 100) * margem + unitCost).formatMoney(2, '.', ','));
                /*TotalLucro*/
                $(tds[10]).html((((unitCost * units ) / 100) * margem + (unitCost * units ) - (unitCost * units)).formatMoney(2, '.', ','));
            
            
            }
        
        }
    }
    if(tableName === "#FornecedoresRecords"){
        var TotalAcumulado = 0;
        for (var x = trs.length; x >= 1; x--) {
            
            var len = $(trs[x]).children().length;
            var tds = $(trs[x]).children();
            
            if(len===5){
                var teste = tds[3].innerHTML.replace(',', '');
                teste = teste.split('.')[0];
                var ttl = parseFloat(teste);
                TotalAcumulado =TotalAcumulado+ ttl;
                $(tds[4]).html(TotalAcumulado.formatMoney(2, '.', ','));
                TotalAcumulado = 0;
            }
            if(len===3){
                var teste = tds[2].innerHTML.replace(',', '');
                 teste = teste.split('.')[0];
                var ttl = parseFloat(teste);
                 TotalAcumulado =TotalAcumulado+ ttl;
            }

        
        }
        
    }

    updateTotaisLabels();
   
}


function sicronizeTables(Tabela, row, inId) {
    var Mytable = Tabela.attr("id");
    var updatedRecord = $(row);


    if (Mytable === "AlojamentoRecords") {
        var TabelaVerAloj = $("#AlojamentoVerRecords").find("input.HiddenRecordId");
        var inputs = $(updatedRecord).find("input.smNumInput");
        TabelaVerAloj.each(function () {
            var id = $(this).val();
            if (id === inId) {
                var recordToUpd = $(this).parent().parent();
                var inputsToUpdate = $(recordToUpd).find("input.smNumInput");
                var unidades = $(inputs[0]).val();
                var margem = $(inputs[1]).val();
                var comissao = $(inputs[2]).val();
                $(inputsToUpdate[0]).val(unidades);
                $(inputsToUpdate[1]).val(margem);
                $(inputsToUpdate[2]).val(comissao);
            }
        });
    }
    if (Mytable === "AlojamentoVerRecords") {
        var TabelaVerAloj = $("#AlojamentoRecords").find("input.HiddenRecordId");
        var inputs = $(updatedRecord).find("input.smNumInput");
        TabelaVerAloj.each(function () {
            var id = $(this).val();
            if (id === inId) {
                var recordToUpd = $(this).parent().parent();
                var inputsToUpdate = $(recordToUpd).find("input.smNumInput");
                var unidades = $(inputs[0]).val();
                var margem = $(inputs[1]).val();
                var comissao = $(inputs[2]).val();
                $(inputsToUpdate[0]).val(unidades);
                $(inputsToUpdate[1]).val(margem);
                $(inputsToUpdate[2]).val(comissao);
            }
        });
    }
    if (Mytable === "VoosRecords") {
        var TabelaVerAloj = $("#VoosVerRecords").find("input.HiddenRecordId");
        var inputs = $(updatedRecord).find("input.smNumInput");
        TabelaVerAloj.each(function () {
            var id = $(this).val();
            if (id === inId) {
                var recordToUpd = $(this).parent().parent();
                var inputsToUpdate = $(recordToUpd).find("input.smNumInput");
                var unidades = $(inputs[0]).val();
                var margem = $(inputs[1]).val();
                $(inputsToUpdate[0]).val(unidades);
                $(inputsToUpdate[1]).val(margem);
            }
        });
    }
    if (Mytable === "VoosVerRecords") {
        var TabelaVerAloj = $("#VoosRecords").find("input.HiddenRecordId");
        var inputs = $(updatedRecord).find("input.smNumInput");
        TabelaVerAloj.each(function () {
            var id = $(this).val();
            if (id === inId) {
                var recordToUpd = $(this).parent().parent();
                var inputsToUpdate = $(recordToUpd).find("input.smNumInput");
                var unidades = $(inputs[0]).val();
                var margem = $(inputs[1]).val();
                $(inputsToUpdate[0]).val(unidades);
                $(inputsToUpdate[1]).val(margem);
            }
        });
    }

    if (Mytable === "ServicosRecords") {
        var TabelaVerAloj = $("#ServicosVerRecords").find("input.HiddenRecordId");
        var inputs = $(updatedRecord).find("input.smNumInput");
        TabelaVerAloj.each(function () {
            var id = $(this).val();
            if (id === inId) {
                var recordToUpd = $(this).parent().parent();
                var inputsToUpdate = $(recordToUpd).find("input.smNumInput");
                var unidades = $(inputs[0]).val();
                var margem = $(inputs[1]).val();
                $(inputsToUpdate[0]).val(unidades);
                $(inputsToUpdate[1]).val(margem);
            }
        });
    }
    if (Mytable === "ServicosVerRecords") {
        var TabelaVerAloj = $("#ServicosRecords").find("input.HiddenRecordId");
        var inputs = $(updatedRecord).find("input.smNumInput");
        TabelaVerAloj.each(function () {
            var id = $(this).val();
            if (id === inId) {
                var recordToUpd = $(this).parent().parent();
                var inputsToUpdate = $(recordToUpd).find("input.smNumInput");
                var unidades = $(inputs[0]).val();
                var margem = $(inputs[1]).val();
                $(inputsToUpdate[0]).val(unidades);
                $(inputsToUpdate[1]).val(margem);
            }
        });
    }

    if (Mytable.indexOf("DiariasRecords") === 0) {
        var TabelaVerAloj = $("#DiariaVerRecords").find("input.HiddenRecordId");
        var inputs = $(updatedRecord).find("input.smNumInput");
        TabelaVerAloj.each(function () {
            var id = $(this).val();
            if (id === inId) {
                var recordToUpd = $(this).parent().parent();
                var inputsToUpdate = $(recordToUpd).find("input.smNumInput");
                var unidades = $(inputs[0]).val();
                var margem = $(inputs[1]).val();
                $(inputsToUpdate[0]).val(unidades);
                $(inputsToUpdate[1]).val(margem);
            }
        });
    }





}



$("#AddServicos").click(function () {


    var ServicosCambioArr = $("#ServicosMoeda option:selected").val();
    var cambioarray = ServicosCambioArr.split('-');
    var ServicosCambioidv= cambioarray[0];
    var ServicosCambioValor= parseFloat(cambioarray[1]);
    var ServicosFornecedor = $("#ServicosFornecedor").val();
    var ServicosFornecedorID = $("#ServicosFornecedorID").val();
    var ServicosTipoServicoID = $("#ServicosTipoServico option:selected").val();
    var ServicosTipoServico = $("#ServicosTipoServico option:selected").text();
    var ServicosValor = parseFloat($("#ServicosValor").val());
    var ServicosNet = parseFloat($("#ServicosNet").val());
    var ServicosComisao = parseFloat($("#ServicosComisao").val());
    var ServicosMargem = parseFloat($("#ServicosMargem").val());
    var ServicosMarkup = parseFloat($("#ServicosMarkup").val());
    var ServicosIva = parseFloat($("#ServicosIva option:selected").val());
    var ServicosObservacoes = $("#ServicosObservacoes").val();
    var ServicosQuantidade = parseInt($("#ServicosQuantidade").val());
    
    var ServicoPagamento = $("#ServicoPagamento").val();
    var ServicosData = ConvertDateForSend($("#ServicosData").val());


     data = {
    	"servicoidv": "",
    	"orcamentoidv": OrcamentoID,
    	"fornecedoridv": ServicosFornecedorID,
    	"ivaidv": ServicosIva,
    	"tipocustoidv": "6",
    	"cambioidv": ServicosCambioidv,
    	"servicottidv": ServicosTipoServicoID,
    	"s_nomeservico": ServicosTipoServico,
    	"s_preco": ServicosValor,
    	"s_comissao": ServicosComisao,
    	"s_net": ServicosNet,
    	"s_valorcambio": ServicosCambioValor,
    	"s_valoreuros": ServicosValor,
    	"s_quantidade": ServicosQuantidade,
    	"s_unidades": 0,
    	"s_margemvenda": ServicosMargem,
    	"s_markup": ServicosMarkup,
    	"s_pagamento": ServicoPagamento,
    	"s_datapagamento": ServicosData,
    	"s_numeropessoas": 0,
    	"s_valortotalpvp": 0,
    	"s_valorporpessoapvp": 0,
    	"s_observacoes":ServicosObservacoes 
    }
    sendServicoTT(data, false);

});


$("#AddDiaria").click(function () {

    var DiariaAuxDia = $("#DiariaAuxDia").val();

    var RefAux = "#DiariasRecords" + DiariaAuxDia
    var tabela = $(RefAux);


    var DiariasCambioArr = $("#DiariaMoeda option:selected").val();
    var cambioarray = DiariasCambioArr.split('-');
    var DiariaCambioidv= cambioarray[0];
    var DiariaCambioValor= parseFloat(cambioarray[1]);

    var DiariaFornecedorID = $("#DiariaFornecedorID").val();
    var DiariaFornecedor = $("#DiariaFornecedor").val();
    var DiariaComisao = parseFloat($("#DiariaComisao").val());
    var DiariaValor = parseFloat($("#DiariaValor").val());

    var DiariaIva = parseFloat($("#DiariaIva option:selected").val());
    var DiariaMarkup = parseFloat($("#DiariaMarkup").val());

    var DiariaNomeServico = $("#DiariaNomeServico").val();
    var DiariaMargem = parseFloat($("#DiariaMargem").val());
    var DiariaNet = parseFloat($("#DiariaNet").val());
    var DiariaObservaçoes = $("#DiariaObservaçoes").val();
    var DiariaPagamento = $("#DiariaPagamento").val();
    
    
    var DiariaQuantidade = parseInt($("#DiariaQuantidade").val());
    var DiariaPagamentoData = ConvertDateForSend($("#DiariaDataPagamento").val());


    /* este campo sera usado para identificar para que dia se trata este item diario, ou seja, data do orcamento + DiariaAuxDia - 1 para poder incrementar */
    var DiariaData = ConvertDateForSend($("#DataDeexecucao").val());



    data = {"diariaidv": "",
        "orcamentoidv": OrcamentoID,
        "fornecedoridv": DiariaFornecedorID,
        "ivaidv": DiariaIva,
        "tipocustoidv": "4",
        "cambioidv": DiariaCambioidv,
        "d_nomeservico": DiariaNomeServico,
        "d_data": DiariaData,
        "d_preco": DiariaValor,
        "d_comissao": DiariaComisao,
        "d_net": DiariaNet,
        "d_valorcambio": DiariaCambioValor,
        "d_valoreuros": DiariaValor,
        "d_quantidade": DiariaQuantidade,
        "d_unidades": 0,
        "d_margemvenda": DiariaMargem,
        "d_markup": DiariaMarkup,
        "d_pagamento": DiariaPagamento,
        "d_datapagamento": DiariaPagamentoData,
        "d_numeropessoas": 0,
        "d_valortotalpvp": 0,
        "d_valorporpessoapvp": 0,
        "d_observacoes": DiariaObservaçoes,
    }


    sendDiaria(data, false);
    

});




$("#AddVoo").click(function () {

    var VoosFornecedorID = $("#VoosFornecedorID").val();
    var VoosCambioArr = $("#VoosMoedaCompra option:selected").val();
    var cambioarray = VoosCambioArr.split('-');
    var VoosCambioidv= cambioarray[0];
    var VoosMoedaValor = parseFloat(cambioarray[1]);
    var VoosIva = parseInt($("#VoosIva option:selected").val());
    var VoosTipoIva = $("#VoosTipoIva option:selected").val();
    var VoosPartida = $("#VoosPartida").val();
    var VoosDestino = $("#VoosDestino").val();
    var VoosNomeVoo = $("#VoosNomeVoo").val();
    var VoosValor = parseFloat($("#VoosValor").val());
    var VoosCommisao = parseFloat($("#VoosCommisao").val());
    var VoosNet = parseFloat($("#VoosNet").val());
    var VoosMargemVenda = parseFloat($("#VoosMargemVenda").val());
    var VoosTaxaA = parseFloat($("#VoosTaxaA").val());
    var VoosTaxaB = parseFloat($("#VoosTaxaB").val());
    var VoosFormaPagemento = $("#VoosFormaPagemento").val();
    var VoosDataPagamento = ConvertDateForSend($("#VoosDataPagamento").val());
    var VoosMarkup = parseFloat($("#VoosMarkup").val());

    var data = {
        "vooidv": "",                
	    "orcamentoidv": OrcamentoID,
	    "fornecedoridv": VoosFornecedorID,
	    "cambioidv": VoosCambioidv,
	    "ivaidv": VoosIva,
	    "tipocustoidv": VoosTipoIva,
	    "v_partida": VoosPartida,
	    "v_destino": VoosDestino,
	    "v_nomevoo": VoosNomeVoo,
	    "v_preco": VoosValor,
	    "v_comissao": VoosCommisao,
	    "v_net": VoosNet,
	    "v_valorcambio": VoosMoedaValor,
	    "v_valoreuros":  0,
	    "v_margemvenda": VoosMargemVenda,
	    "v_markup": VoosMarkup,
	    "v_taxaA": VoosTaxaA,
	    "v_taxaB": VoosTaxaB,
	    "v_numeropessoas": 0,
	    "v_disponibilidade": 1,
	    "v_valortotalpvp": 0,
	    "v_valorporpessoapvp": VoosValor,
	    "v_pagamento": VoosFormaPagemento,
	    "v_datapagamento": VoosDataPagamento
    }

    sendVoo(data, false);

});


$("#AddAlojamento").click(function () {

    var countRows = $('#AlojamentoRecords tr').length;
    var Entidade = $("#Hoteis").val();
    var HotelName = $("#AlojamentoNomeHotel").val();
    var TipoQuarto = $("#TipoQuarto option:selected").val();
    var Valor = parseFloat($("#ValorAlojamento").val());
    var MoedaName = $("#MoedaAlojamento option:selected").text();
    var MoedaidvArr = $("#MoedaAlojamento option:selected").val();
    var cambioarray = MoedaidvArr.split('-');
    var cambioidv = cambioarray[0];
    var cambioval = parseFloat(cambioarray[1]);


    var Nnoites = parseInt($("#NumNoites").val());
    var IvaAlj = $("#IvaAloj option:selected").text();
    var IvaValor = $("#IvaAloj").val();
    var Markup = parseFloat($("#MarkupAloj").val());
    var Almoço = $("#Almoço").val();
    var MargemVenda = parseFloat($("#MargemAloj").val());
    var ALojamentoComisao = parseFloat($("#ALojamentoComisao").val());
    var AlojamentoObservacoes = $("#AlojamentoObservacoes").val();
    var AlojamentoFornecedor = $("#AlojamentoFornecedor").val();
    var AlojamentoFornecedorID = $(".AlojamentoFornecedorID").val();
    var AlojomanentoNet = parseFloat($("#AlojomanentoNet").val());
    var AlojPaydayComment = $("#AlojPaydayComment").val();


    var AlojamentoDataPagamento = ConvertDateForSend($("#AlojamentoDataPagamento").val());
    var AlojamentoTipoIva = $("#AlojamentoTipoIva option:selected").val();

    var data = {
        "orcamentoidv": OrcamentoID,
        "alojamentoidv": "",
        "fornecedoridv": AlojamentoFornecedorID,
        "quartoidv": TipoQuarto,
        "cambioidv": cambioidv,
        "ivaidv": IvaValor,
        "tipocustoidv": AlojamentoTipoIva,
        "a_preco": Valor,
        "a_comissao": ALojamentoComisao,
        "a_net": AlojomanentoNet,
        "a_valorcambio": cambioval,
        "a_valoreuros": Valor,
        "a_numeronoites": Nnoites,
        "a_margemvenda": MargemVenda,
        "a_markup": Markup,
        "a_pagamento": AlojPaydayComment,
        "a_datapagamento": AlojamentoDataPagamento,
        "a_numeroquartos": 0,
        "a_numeropessoas": 0,
        "a_valortotalpvp": 0,
        "a_valorporpessoapvp": 0,
        "a_observacoes": AlojamentoObservacoes,
        "a_opcao": "1"
    };

    sendAlojamento(data, false);




});



$(".AddFornecedor").click(function () {


    var FornecedorLocalOrigem = parseInt($("#FiredInsert").val());


    var FornecedorNome = $("#FornecedorNome").val();
    var FornecedorTipoServico = $("#FornecedorTipoServico option:selected").text()
    var FornecedorPais = $("#FornecedorPais option:selected").text();
    var FornecedorPaisID = $("#FornecedorPais option:selected").val();
    var FornecedorCidade = $("#FornecedorCidade").val();
    var FornecedorNomeComercial = $("#FornecedorNomeComercial").val();
    var FornecedorLocalidade = $("#FornecedorLocalidade").val();
    var FornecedorMorada = $("#FornecedorMorada").val();
    var FornecedorCodigoPostal = $("#FornecedorCodigoPostal").val();
    var FornecedorTelefone = $("#FornecedorTelefone").val();
    var FornecedorFax = $("#FornecedorFax").val();
    var FornecedorTelemovel = $("#FornecedorTelemovel").val();
    var FornecedorContacto = $("#FornecedorContacto").val();
    var FornecedorEmail = $("#FornecedorEmail").val();
    var FornecedorUrl = $("#FornecedorUrl").val();
    var FornecedorContribuinte = $("#FornecedorContribuinte").val();
    var FornecedorTipoFornecedor = $("#FornecedorTipoTerceiro option:selected").text();



    var data = {
        "Id": "",
        "TipoFornecedor": FornecedorTipoFornecedor,
        "Country": FornecedorPais,
        "cidade": FornecedorCidade,
        "tipocusto": FornecedorTipoServico,
        "nome": FornecedorNome ,
        "nomecomercial": FornecedorNomeComercial ,
        "morada": FornecedorMorada ,
        "localidade":  FornecedorLocalidade,
        "codigopostal": FornecedorCodigoPostal ,
        "telefone":  FornecedorTelemovel,
        "fax":  FornecedorFax,
        "telemovel":  FornecedorTelemovel,
        "contacto":  FornecedorContacto,
        "email": FornecedorEmail ,
        "url":  FornecedorUrl,
        "contribuinte":FornecedorContribuinte  , 
        "categoria ":  "1"
    };
    sendFornecedor(data, FornecedorLocalOrigem);


});




function DeleteRecs(table, id,Tr){

    if(table === "AlojamentoRecords" || table === "AlojamentoVerRecords"){
        $.post('api/Postman/DeleteAlojamento', { "alojamentoidv": id },
            function (returnedData) {
                
                var respo = returnedData;
                if(respo === "ok")
                {
                    Tr.remove();
                }
                obj = null;
            }).fail(function () {
            console.log("error");
        });
    }
    if(table === "VoosRecords" || table === "VoosVerRecords"){
        $.post('api/Postman/DeleteVoos', { "vooidv": id },
            function (returnedData) {

                var respo = returnedData;
                if(respo === "ok")
                {
                    Tr.remove();
                }
                obj = null;
            }).fail(function () {
            console.log("error");
        });
    }
    if(table.indexOf("DiariasRecords") >= 0 || table === "DiariaVerRecords"){
        $.post('api/Postman/DeleteDiaria', { "diariaidv": id },
            function (returnedData) {

                var respo = returnedData;
                if(respo === "ok")
                {
                    Tr.remove();
                }
                obj = null;
            }).fail(function () {
            console.log("error");
        });
    }
    if(table === "ServicosRecords" || table === "ServicosVerRecords"){
        $.post('api/Postman/DeleteServico', { "servicoidv": id },
            function (returnedData) {
 
                var respo = returnedData;
                if(respo === "ok")
                {
                    Tr.remove();
                }
                obj = null;
            }).fail(function () {
            console.log("error");
        });
    }
}

function showpopUp(Tr){

    var Observacoes= $(Tr[0]).find(".HiddenRecordObs").val();
    var idv = $(Tr[0]).find(".HiddenRecordId").val();
    var tablename = $(Tr).closest('table').attr('id');

    

    $('#InfoBlock').modal('show');

    $('#textMsg').html(Observacoes);


}

function SaveRecs(table, id,Tr){





    if(table === "AlojamentoRecords" || table === "AlojamentoVerRecords"){
        var len = $(Tr[0]).children().length;

        if(len === 14)
        {
            var idv = $(Tr[0]).find(".HiddenRecordId").val();
            var fornecedoridv = $(Tr[0]).find(".HiddenRecordIdFornecedor").val();
            var quartoIdv = $(Tr[0]).find(".HiddenRecordQuartoIdv").val();
            var cambioidv = $(Tr[0]).find(".HiddenRecordCambioIdv").val();
            var Ivaidv = $(Tr[0]).find(".HiddenRecordIvaIdv").val();
            var tipocustoidv = $(Tr[0]).find(".HiddenRecordTipocustoidv").val();
            var net = $(Tr[0]).find(".HiddenRecordNet").val();
            var Markup = $(Tr[0]).find(".HiddenRecordMarkup").val();
            var APagameto = $(Tr[0]).find(".HiddenRecordAPagamento").val();
            var ADataPagameto = $(Tr[0]).find(".HiddenRecordADATAPagamento").val();
            var valorCambio = $(Tr[0]).find(".HiddenRecordValorCambio").val();


            var Nnoites = parseInt($(Tr[0].children[3]).text());
            var Unidades = $(Tr[0].children[4]).find(".smNumInput").val();
            var margem = parseFloat(    $(Tr[0].children[5]).find(".smNumInput").val()   );
            var commisao = parseFloat($(Tr[0].children[6]).find(".smNumInput").val());
            var totalCusto = parseFloat($(Tr[0].children[7]).text().replace(',', ''));
            var totalCustoPax =parseFloat($(Tr[0].children[8]).text().replace(',', ''));
            var TotalVenda =parseFloat($(Tr[0].children[9]).text().replace(',', ''));
            var TotalPax = parseFloat($(Tr[0].children[10]).text().replace(',', ''));
            var Observacoes = $(Tr[0].children[12]).text().replace(',', '');
            var ht = $(Tr[0].children[2]).html();
            var valorEur;
            var valorExterno;
            if(ht.indexOf("</br>")<0)
            {
                valorEur = parseFloat($(Tr[0].children[2]).text().replace(',', ''));
                valorExterno = valorEur;
            }
            else{
                var strs = ht.split("</br>");
                valorEur = parseFloat($(strs[1]).text().replace(',', ''));
                valorExterno = parseFloat($(strs[0]).text().replace(',', ''));
            }
        }
        else{
            var idv = $(Tr[0]).find(".HiddenRecordId").val();
            var fornecedoridv = $(Tr[0]).find(".HiddenRecordIdFornecedor").val();
            var quartoIdv = $(Tr[0]).find(".HiddenRecordQuartoIdv").val();
            var cambioidv = $(Tr[0]).find(".HiddenRecordCambioIdv").val();
            var Ivaidv = $(Tr[0]).find(".HiddenRecordIvaIdv").val();
            var tipocustoidv = $(Tr[0]).find(".HiddenRecordTipocustoidv").val();
            var net = $(Tr[0]).find(".HiddenRecordNet").val();
            var Markup = $(Tr[0]).find(".HiddenRecordMarkup").val();
            var APagameto = $(Tr[0]).find(".HiddenRecordAPagamento").val();
            var ADataPagameto = $(Tr[0]).find(".HiddenRecordADATAPagamento").val();
            var valorCambio = $(Tr[0]).find(".HiddenRecordValorCambio").val();


            var Nnoites = parseInt($(Tr[0].children[2]).text());
            var Unidades = $(Tr[0].children[3]).find(".smNumInput").val();
            var margem = parseFloat(    $(Tr[0].children[4]).find(".smNumInput").val()   );
            var commisao = parseFloat($(Tr[0].children[5]).find(".smNumInput").val());
            var totalCusto = parseFloat($(Tr[0].children[6]).text().replace(',', ''));
            var totalCustoPax =parseFloat($(Tr[0].children[7]).text().replace(',', ''));
            var TotalVenda =parseFloat($(Tr[0].children[8]).text().replace(',', ''));
            var TotalPax = parseFloat($(Tr[0].children[9]).text().replace(',', ''));
            var Observacoes = $(Tr[0].children[11]).text().replace(',', '');
            var ht = $(Tr[0].children[1]).html();
            var valorEur;
            var valorExterno;
            if(ht.indexOf("</br>")<0)
            {
                valorEur = parseFloat($(Tr[0].children[1]).text().replace(',', ''));
                valorExterno = valorEur;
            }
            else{
                var strs = ht.split("</br>");
                valorEur = parseFloat($(strs[1]).text().replace(',', ''));
                valorExterno = parseFloat($(strs[0]).text().replace(',', ''));
            }

        }




        var alojamento = {
            "orcamentoidv": OrcamentoID,
            "alojamentoidv": idv,
            "fornecedoridv": fornecedoridv,
            "quartoidv": quartoIdv,
            "cambioidv": cambioidv,
            "ivaidv":Ivaidv,
            "tipocustoidv": tipocustoidv,
            "a_preco": valorExterno,
            "a_comissao": commisao,
            "a_net": net,
            "a_valorcambio": valorCambio,
            "a_valoreuros": valorEur,
            "a_numeronoites": Nnoites,
            "a_margemvenda": margem,
            "a_markup": Markup,
            "a_pagamento": APagameto,
            "a_datapagamento": ADataPagameto,
            "a_numeroquartos": Unidades,
            "a_numeropessoas": Unidades * quartoIdv,
            "a_valortotalpvp": totalCusto,
            "a_valorporpessoapvp": totalCustoPax,
            "a_observacoes": Observacoes,
            "a_opcao": 1
        };


        sendAlojamento(alojamento, true);
    }
        
    if(table === "VoosRecords" || table === "VoosVerRecords"){

            var idv = $(Tr[0]).find(".HiddenRecordId").val();
            var fornecedoridv = $(Tr[0]).find(".HiddenRecordIdFornecedor").val();
            var cambioidv = $(Tr[0]).find(".HiddenRecordCambioIdv").val();
            var Ivaidv = $(Tr[0]).find(".HiddenRecordIvaIdv").val();
            var tipocustoidv = $(Tr[0]).find(".HiddenRecordTipocustoidv").val();
            var net = parseFloat($(Tr[0]).find(".HiddenRecordNet").val());
            var Markup = parseFloat($(Tr[0]).find(".HiddenRecordMarkup").val());
            var APagameto = $(Tr[0]).find(".HiddenRecordAPagamento").val();
            var ADataPagameto = ConvertDateForSend($(Tr[0]).find(".HiddenRecordADATAPagamento").val());
            var valorCambio = parseFloat($(Tr[0]).find(".HiddenRecordValorCambio").val());
            var TAXAA = parseFloat($(Tr[0]).find(".HiddenRecordTAXAA").val());
            var TAXAB = parseFloat($(Tr[0]).find(".HiddenRecordTAXAB").val());
            var DISPONIBILIDADE = parseInt($(Tr[0]).find(".HiddenRecordDISPONIBILIDADE").val());
            var NomeVoo = $(Tr[0]).find(".HiddenRecordNomeVoo").val();
            var commisao = parseFloat( $(Tr[0]).find(".HiddenRecordCOMISSAO").val());




            var nomevooarr = NomeVoo.split("<br>");
            var Nnoites = parseInt($(Tr[0].children[3]).text());
            var Unidades = parseInt($(Tr[0].children[4]).find(".smNumInput").val());
            var NomeDirecao = $(Tr[0].children[1]).text();
            var nomeArr = NomeDirecao.split("-");
            var partida = nomeArr[0];
            var destino = nomeArr[1];
            var margem = parseFloat($(Tr[0].children[5]).find(".smNumInput").val());
            var totalCusto = parseFloat($(Tr[0].children[6]).text().replace(',', ''));
            var totalCustoPax =parseFloat($(Tr[0].children[7]).text().replace(',', ''));
            var TotalVenda =parseFloat($(Tr[0].children[8]).text().replace(',', ''));
            var TotalPax = parseFloat($(Tr[0].children[9]).text().replace(',', ''));
            var Lucro = parseFloat($(Tr[0].children[10]).text().replace(',', ''));
            var ht = $(Tr[0].children[2]).html();
            var valorEur;
            var valorExterno;
            if(ht.indexOf("</br>")<0)
            {
                valorEur = parseFloat($(Tr[0].children[2]).text().replace(',', ''));
                valorExterno = valorEur;
            }
            else{
                var strs = ht.split("</br>");
                valorEur = parseFloat($(strs[1]).text().replace(',', ''));
                valorExterno = parseFloat($(strs[0]).text().replace(',', ''));
            }



            var vooRec = {"vooidv":idv,
                "orcamentoidv":OrcamentoID,
                "fornecedoridv":fornecedoridv,
                "cambioidv":cambioidv,
                "ivaidv":Ivaidv,
                "tipocustoidv":tipocustoidv,
                "v_partida":partida,
                "v_destino":destino,
                "v_nomevoo":NomeVoo,
                "v_preco":valorExterno,
                "v_comissao":commisao,
                "v_net":net,
                "v_valorcambio":valorCambio,
                "v_valoreuros":TotalVenda,
                "v_margemvenda":margem,
                "v_markup":Markup,
                "v_taxaA":TAXAA,
                "v_taxaB":TAXAB,
                "v_numeropessoas":Unidades,
                "v_disponibilidade":DISPONIBILIDADE,
                "v_valortotalpvp":totalCusto,
                "v_valorporpessoapvp":totalCustoPax,
                "v_pagamento":APagameto,
                "v_datapagamento":ADataPagameto
            }

            sendVoo(vooRec,true);
            
    }
    
    if(table.indexOf("DiariasRecords") >= 0 || table === "DiariaVerRecords"){

        var DiariaIdv= $(Tr[0]).find(".HiddenRecordId").val();
        var DiariaCambioidv= $(Tr[0]).find(".HiddenRecordCambioIdv").val();
        var DiariaFornecedorID = $(Tr[0]).find(".HiddenRecordIdFornecedor").val();
        var ServicosTipoServicoID = $(Tr[0]).find(".HiddenRecordtipoServicoIdv").val();
        var DiariaComisao = parseFloat($(Tr[0]).find(".HiddenRecordDiariaComisao").val());
        var DiariaCambioValor = parseFloat($(Tr[0]).find(".HiddenRecordCambioValor").val());
        var DiariaMarkup = parseFloat($(Tr[0]).find(".HiddenRecordMarkup").val());
        var DiariaNet = $(Tr[0]).find(".HiddenRecordNet").val();
        var DiariaIva = parseFloat($(Tr[0]).find(".HiddenRecordIvaIdv").val());
        var DiariaPagamentoData = ConvertDateForSend($(Tr[0]).find(".HiddenRecordADATAPagamento").val());
        var DiariaData = ConvertDateForSend($(Tr[0]).find(".HiddenRecordADATA").val());
        var DiariaPagamento = $(Tr[0]).find(".HiddenRecordADATAPagamento").val();
        var Str = $(Tr[0]).text();

        var ht = $(Tr[0].children[2]).html();
        var valorEur;
        var valorExterno;
        if(ht.indexOf("</br>")<0)
        {
            valorEur = parseFloat($(Tr[0].children[2]).text().replace(',', ''));
            valorExterno = valorEur;
        }
        else{
            var strs = ht.split("</br>");
            valorEur = parseFloat($(strs[1]).text().replace(',', ''));
            valorExterno = parseFloat($(strs[0]).text().replace(',', ''));
        }


    
        var DiariaMargem = parseFloat($(Tr[0].children[5]).find(".smNumInput").val());
        var DiariaObservaçoes = $(Tr[0].children[11]).text();
        var DiariaNomeServico = $(Tr[0].children[1]).text();
        var DiariaQuantidade = parseInt($(Tr[0].children[3]).text());
        
        var strarr = Str.split("-");
        var StrDt = strarr[1];
        /*
        var DiariaData = ConvertDateForSend(new Date.parse(StrDt));*/


        var TotalVendaPax = parseFloat($(Tr[0].children[9]).text().replace(',', ''));
        var totalCusto = parseFloat($(Tr[0].children[6]).text().replace(',', ''));
        var totalCustoPax =parseFloat($(Tr[0].children[7]).text().replace(',', ''));
        var TotalVenda =parseFloat($(Tr[0].children[8]).text().replace(',', ''));
        
        
        var Unidades = parseInt($(Tr[0].children[4]).find(".smNumInput").val());



        dataDiaria = {"diariaidv": DiariaIdv,
            "orcamentoidv": OrcamentoID,
            "fornecedoridv": DiariaFornecedorID,
            "ivaidv": DiariaIva,
            "tipocustoidv": "4",
            "cambioidv": DiariaCambioidv,
            "d_nomeservico": DiariaNomeServico,
            "d_data": DiariaData,
            "d_preco": valorExterno,
            "d_comissao": DiariaComisao,
            "d_net": DiariaNet,
            "d_valorcambio": DiariaCambioValor,
            "d_valoreuros": valorEur,
            "d_quantidade": DiariaQuantidade,
            "d_unidades": Unidades,
            "d_margemvenda": DiariaMargem,
            "d_markup": DiariaMarkup,
            "d_pagamento": DiariaPagamento,
            "d_datapagamento": DiariaPagamentoData,
            "d_numeropessoas": Unidades,
            "d_valortotalpvp": totalCusto,
            "d_valorporpessoapvp": totalCustoPax,
            "d_observacoes": DiariaObservaçoes,
        }

        sendDiaria(dataDiaria, true);
        
    }
    
    if(table === "ServicosRecords" || table === "ServicosVerRecords"){

        var ServicoIDv= $(Tr[0]).find(".HiddenRecordId").val();
        var ServicosCambioidv= $(Tr[0]).find(".HiddenRecordCambioIdv").val();
        var ServicosFornecedorID = $(Tr[0]).find(".HiddenRecordIdFornecedor").val();
        var ServicosTipoServicoID = $(Tr[0]).find(".HiddenRecordtipoServicoIdv").val();
        var ServicosComisao = parseFloat($(Tr[0]).find(".HiddenRecordServicosComisao").val());
        var CambioValor = parseFloat($(Tr[0]).find(".HiddenRecordCambioValor").val());
        var ServicosMarkup = parseFloat($(Tr[0]).find(".HiddenRecordMarkup").val());
        var ServicosNet = $(Tr[0]).find(".HiddenRecordNet").val();
        var ServicosIva = parseFloat($(Tr[0]).find(".HiddenRecordIvaIdv").val());
        var ServicoPagamento = $(Tr[0]).find(".HiddenRecordAPagamento").val();
        var ServicosData = ConvertDateForSend($(Tr[0]).find(".HiddenRecordADATAPagamento").val());


        var ht = $(Tr[0].children[2]).html();
        var valorEur;
        var valorExterno;
        if(ht.indexOf("</br>")<0)
        {
            valorEur = parseFloat($(Tr[0].children[2]).text().replace(',', ''));
            valorExterno = valorEur;
        }
        else{
            var strs = ht.split("</br>");
            valorEur = parseFloat($(strs[1]).text().replace(',', ''));
            valorExterno = parseFloat($(strs[0]).text().replace(',', ''));
        }

        var ServicosMargem = parseFloat($(Tr[0].children[5]).find(".smNumInput").val());
        var ServicosObservacoes = $(Tr[0].children[11]).text();
        var ServicosTipoServico = $(Tr[0].children[1]).text();
        var ServicosQuantidade = parseInt($(Tr[0].children[3]).text());
        var TotalVendaPax = parseFloat($(Tr[0].children[9]).text().replace(',', ''));
        var totalCusto = parseFloat($(Tr[0].children[6]).text().replace(',', ''));
        var totalCustoPax =parseFloat($(Tr[0].children[7]).text().replace(',', ''));
        var TotalVenda =parseFloat($(Tr[0].children[8]).text().replace(',', ''));
        
        
        var Unidades = parseInt($(Tr[0].children[4]).find(".smNumInput").val());



         dataServicos = {
        	"servicoidv": ServicoIDv,
        	"orcamentoidv": OrcamentoID,
        	"fornecedoridv": ServicosFornecedorID,
        	"ivaidv": ServicosIva,
        	"tipocustoidv": "6",
        	"cambioidv": ServicosCambioidv,
        	"servicottidv": ServicosTipoServicoID,
        	"s_nomeservico": ServicosTipoServico,
        	"s_preco": valorExterno,
        	"s_comissao": ServicosComisao,
        	"s_net": ServicosNet,
        	"s_valorcambio": CambioValor,
        	"s_valoreuros": valorEur,
        	"s_quantidade": ServicosQuantidade,
        	"s_unidades": Unidades,
        	"s_margemvenda": ServicosMargem,
        	"s_markup": ServicosMarkup,
        	"s_pagamento": ServicoPagamento,
        	"s_datapagamento": ServicosData,
        	"s_numeropessoas": Unidades,
        	"s_valortotalpvp": totalCusto,
        	"s_valorporpessoapvp": totalCustoPax,
        	"s_observacoes":ServicosObservacoes 
        }
        sendServicoTT(dataServicos,true);

    }
    
}

function activator(){
    var tables = $("table");

    for(x = 0 ; x < tables.length; ++x)
    {
         var nome =  tables[x].id;
        if( nome != "ListaOrcamentos"){
            updateValues($(tables[x]));
        }

       

    }

}
$(document).ready(function () {
    
    $("#accordion").accordion({
        heightStyle: "content"
    });
    
    loadPageAuxTables();


    var today = new Date();



   // $("#AlojamentoDateAddVa").val(ConvertDateForInput(today));




    projectID = "";
    OrcamentoID = "";
    var qsParm = new Array();
    var query = window.location.search.substring(1);
    var parms = query.split('&');
    var IdOrc;
    var IDproj;
    if (parms.length >= 1 && parms[0] != "") {
        var pos = parms[0].indexOf('=');
        if(parms.length ===2){
            var pos2 = parms[1].indexOf('=');
            IdOrc = parms[1].substring(pos2 + 1);
            $( "#accordion" ).accordion({ active: 1 });
        }
        else{
            IdOrc = "";
            $(".ProjectMenu").css('display', "block");

        }

        IDproj = parms[0].substring(pos + 1);
       
        LoadingProjecto(IDproj, IdOrc);/* Se Vier Com parametro faz o loading do projecto*/

    }
    else {

         var d = new Date();
         var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + "-v1";
         $("#OrcamentoNome").val(strDate);
    }
    $("#tabs").tabs();


    $('.modal-backdrop').css("display", "none");





    $('body').on('click', '.SaveRecAloj', function () {
        var table = $(this).parent().parent().parent().parent().attr("id");
        var recID = $(this).parent().parent().find(".HiddenRecordId").val();
        var Tr = $(this).parent().parent();

        SaveRecs(table, recID,Tr);
    });






    $('body').on('click', '.rmvRecord', function () {
        var table = $(this).parent().parent().parent().parent().attr("id");
        var recID = $(this).parent().parent().find(".HiddenRecordId").val();
        var Tr = $(this).parent().parent();

        DeleteRecs(table, recID,Tr);



    });

    $('body').on('click', '.InfoObs', function () {
        var Tr = $(this).parent().parent();
        showpopUp(Tr);
 
    });


    $('body').on('change', '.smNumInput', function () {

        var FiredInput = $(this).parent().parent();
        var row = $(FiredInput).children();
        var inp = $(row.find("input.HiddenRecordId")).val();


        var FiredTable = $(this).parent().parent().parent().parent();


        /*sicronizar os campos entre tabelas*/
        sicronizeTables(FiredTable, row, inp);

        /*update de todos campos e calcular*/
        /*updateValues(FiredTable);*/
        FiredTable = null;
        row = null;
        inp = null;

        activator();



    });

    $(".smNumInput").change(function () {
        var FiredInput = $(this).parent().parent();
        var row = $(FiredInput).children();
        var inp = $(row.find("input.HiddenRecordId")).val();


        var FiredTable = $(this).parent().parent().parent().parent();


        /*sicronizar os campos entre tabelas*/
        sicronizeTables(FiredTable, row, inp);

        /*update de todos campos e calcular*/
        updateValues(FiredTable);


        FiredTable = null;
        row = null;
        inp = null;

    });



    $(".SaveIcon").click(function () {
        $('#ComoGuardar').modal('show');
    });




    $(".CloseAlojAcordo").click(function () {
        $('#AcordoComercial').modal('hide');

    });
    $(".CloseSaveModel").click(function () {
        $('#ComoGuardar').modal('hide');

    });
    $(".CloseNewHotel").click(function () {
        $('#NovoFornecedorModel').modal('hide');

    });
    $(".CloseObsBox").click(function () {
        $('#InfoBlock').modal('hide');

    });


    $("#GuardarOrcamentoAlojamento").click(function () {

        savecurrentProject();

    });



    function AddAlojamentoTipologia(idtable){

        var rows =$(idtable).children().children();
        var cnt = rows.length;




        var quartosArr = JSON.parse($("#quartos").val());

        $(rows).each(function (linha, value) {
            var ArrayTd = value.children;
            var posColuna = ArrayTd.length - 1;


            if (linha == 0) {
                $(ArrayTd[posColuna - 1]).after("<td><input type='text' class='form-control AlojTableType' ><input type='number' class='AlojTableNumber' value='0'  ><img class='rmvAlojType " + posColuna + "' src='img/remove.png' alt='remover'></td>");
            }
            else if (linha > 0 && linha < cnt-1) {
                $(ArrayTd[posColuna - 1]).after("<td> <input type='number' min-value='0' value='0'  class='AlojTableNumberIn " + posColuna + "' ></td>");
            }else
                if (linha == cnt-1) {
                    $(ArrayTd[posColuna ]).after("<td><span class='AlojTotais " + 0 + "'>0</span></td>");
                }





       /*     var k = key;
            var tdarr = value.children;
            
            var le = tdarr.length - 1;

            $(tdarr).each(function (key, value2) {

                if(cnt != k)
                {

                    if(key=== 0 && k === 0){
                        $(tdarr[le - 1]).after("<td><input type='text' class='form-control AlojTableType' ><img class='rmvAlojType "+le+"' src='img/remove.png' alt='remover'></td>");
                    }else if(key=== 0){
                        $(tdarr[le - 1]).after("<td> <input type='number' min-value='0' value='0'  class='AlojTableNumberIn " + key + "' ></td>");
                    }
                }

            })*/
        });
    }


    function AddAlojamentoDias(idtable){
         var tabelas =$(".AlojamentoOverview");


         var cntTDs = $(idtable).children().children().first().children().length-1;
         var test = $(idtable).children().children().last().before("<tr></tr>");
         
       // $(".AlojamentoOverview tr:last-child").before("<tr></tr>");


         var cnt = $(idtable).children().children().length-1;
         var arraRows = $(idtable).children().children();
         
        for(var idx = 0; idx < cntTDs; idx++  ){

            if(idx === 0 ){
                $(arraRows[cnt-1]).append("<td> <input type='date' class='form-control' class='AlojamentoDateAddVar' > </td>");
            }
            else{
                $(arraRows[cnt-1]).append("<td> <input type='number' class='form-control' min-value='0' value='0' class='AlojTableNumberIn' > </td>");

            }
            
        }
    }





    $('body').on('click', '.AddIcon', function () {
        var callClass = this.className.toString();
        var Ptable = $(this).parent();
        if (callClass.split(" ")[1] == "AlojamentoDias") {
            var idtable = this.closest("table");
            AddAlojamentoDias(idtable);
        } else
            if (callClass.split(" ")[1] == "AlojamentoTipos") {
                var idtable = this.closest("table");
                AddAlojamentoTipologia(idtable);
            } else {
                $("#FiredInsert").val(callClass.split(" ")[1]);
                $('#NovoFornecedorModel').modal('show');
                $('.modal-backdrop').remove();
            }


    });

    $('body').on('click', '.AddPagamento', function () {
        var callClass = this.className.toString();
        var Ptable = $(this).parent();

        
        $('#NovoPagamento').modal('show');
        $('.modal-backdrop').remove();
            
    });





    $(".AddBtnFornecedor").click(function () {
        $('#NovoFornecedorModel').modal('show');
        $('.modal-backdrop').remove();
        var testeDiarias = $('.DiariaTables > tbody > tr').not(':first');
    });

    $('#tabs').on('click', '.GetBtnFornecedor', function () {


        var callClass = this.className.toString();
        var id = $(this).parent().children()[1];


        //var IDFornecedor = $("#AlojamentoFornecedorID").val();


        var valueId = $(id).val();
        if(valueId !=""){
            GetFornecedor(valueId);
        }

    });
    function showBill(id) {
        $('#AcordoComercial').modal('show');
    }

    $('#tabs').on('click', '.GetBill', function () {


        var callClass = this.className.toString();
        var id = $(this).parent().children()[1];

        var valueId = $(id).val();
        if (valueId != "") {
            showBill(valueId);
        }

    });






    $(".ClosebtnDiaria").click(function () {
        $('#AddicionarItemDiario').modal('hide');

    });





    $("#ProjectoDias").change(function () {

        var numdias = parseInt($(this).val(), 10);

        var dataInicial = new Date($("#ProjectoDataInicio").val());

        setDias(numdias,dataInicial);
    });



    $(".user").autocomplete({
        source: function (request, response) {


            dfg = this.bindings[0].id;

            if (dfg === "ProjectoDesignerName") {
                InputClick = "#ProjectoDesignerName";
                InputId = "#ProjectoDesigner";
            }
            if (dfg === "ProjectoAccountManagerName") {
                InputClick = "#ProjectoAccountManagerName";
                InputId = "#ProjectoAccountManager";
            }

            var str2 = request["term"].toLowerCase();

            $.post('api/Postman/PesquisaUser', { "PesquisaFornecedor": str2 },
            function (returnedData) {

                var myarray = [];
                var intex = 0;
                returnedData.forEach(function (element) {


                    myarray.push({ "nome": element.Nome, "id": element.id });

                    intex++;

                }, this);

                response($.map(myarray, function (item) {
                    return {
                        label: item.nome,
                        value: item.id
                    }
                }));
                resu = null;
            }).fail(function () {
                console.log("erro getAllFornecedores");
            });
        },
        minLength: 1,
        select: function (event, ui) {
            $(InputClick).val(ui.item.label);
            $(InputId).val(ui.item.value);
            return false;


        },
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });


    $( ".fornecedor" ).autocomplete({
      source: function( request, response ) {

        var teste = this;
        var dfg = teste.bindings[0].id;

        if(dfg === "ProjectoFornecedor"){
            InputClick ="#ProjectoFornecedor";
            InputId ="#ProjectoFornecedorID";
        }
        if(dfg === "AlojamentoFornecedor"){
            InputClick ="#AlojamentoFornecedor";
            InputId ="#AlojamentoFornecedorID";
        }
        if(dfg === "VoosFornecedor"){
            InputClick ="#VoosFornecedor";
            InputId ="#VoosFornecedorID";
        }
        if(dfg === "DiariaFornecedor"){
            InputClick ="#DiariaFornecedor";
            InputId ="#DiariaFornecedorID";
        }
        if(dfg === "ServicosFornecedor"){
            InputClick ="#ServicosFornecedor";
            InputId ="#ServicosFornecedorID";
        }
        var str2 = request["term"].toLowerCase();
        
          $.post('api/Postman/pesquisaFornecedor', { "PesquisaFornecedor": str2 },
          function (returnedData) {
            
            var myarray=[];
            var intex = 0;
            returnedData.forEach(function (element) {

                
                myarray.push({ "nome": element.f_nome, "id": element.fornecedoridv });
                
                intex++;

            }, this);

            response( $.map( myarray, function( item ) {
                return {
                    label: item.nome,
                    value: item.id
                }
            }));
            resu = null;
        }).fail(function () {
            console.log("erro getAllFornecedores");
        });
      },
      minLength: 1,
      select: function (event, ui) {
          if (InputClick == "#AlojamentoFornecedor") {
              InsertTableAlojamentoHotel(ui.item.label, ui.item.value);
          }
            $( InputClick ).val(ui.item.label);
            $( InputId).val(ui.item.value);
           return false;
          

      },
      open: function() {
        $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      },
      close: function() {
        $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      }
    });

    $(".ui-autocomplete").css("z-index", "2147483647");

     
});





/* AUXILARES */

function loadPageAuxTables() {

    $.get('api/Postman/getAllServicosTT_Tipos',
    function (returnedData) {
        var items = JSON.parse(returnedData);

        $.each(items, function (idx, el) {
            var id = el.Id;
            var nome = el.name;
            $("#ServicosTipoServico").append($("<option />").val(id).text(nome));
        });


        returnedData = null;
    }).fail(function () {
        console.log("Erro ao fazer ao carregar os getAllEstados!");
    });


    $.get('api/Postman/getAllEstados',
        function (returnedData) {
            var items = JSON.parse(returnedData);

            $.each(items, function (idx, el) {
                var id = el.Id;
                var nome = el.Name;
                $(".EstadosSelect").append($("<option />").val(id).text(nome));
            });


            returnedData = null;
        }).fail(function () {
            console.log("Erro ao fazer ao carregar os getAllEstados!");
        });


    $.get('api/Postman/getAllQuartos',
            function (returnedData) {
                  $("#quartos").val(returnedData);
                returnedData = null;
            }).fail(function () {
                console.log("Erro ao fazer ao carregar os getAllQuartos!");
            });


    $.get('api/Postman/getAllCambios',
        function (returnedData) {
            var items = JSON.parse(returnedData);
            $.each(items, function (idx, el) {
                var id = el.Id;
                var nome = el.name
                var valor = el.value;
                $(".moneyCtrl").append($("<option />").val(id + "-" + valor).text(nome));
            });
            returnedData = null;
        }).fail(function () {
            console.log("Erro ao fazer ao carregar os getAllCambios!");
        });

    $.get('api/Postman/getAllIvas',
        function (returnedData) {
            var items = JSON.parse(returnedData);
            $.each(items, function (idx, el) {
                var id = el.Id;
                var nome = el.name;
                $(".IVA").append($("<option />").val(id).text(nome));
            });
            returnedData = null;
        }).fail(function () {
            console.log("Erro ao fazer ao carregar os getAllIvas!");
        });

    $.get('api/Postman/getAllTiposIva',
        function (returnedData) {
            var items = JSON.parse(returnedData);
            $.each(items, function (idx, el) {
                var id = el.Id;
                var nome = el.name;
                $(".TipoIVA").append($("<option />").val(id).text(nome));
            });
            returnedData = null;
        }).fail(function () {
            console.log("Erro ao fazer ao carregar os getAllTiposIva!");
        });

    $.get('api/Postman/getAllTipoCustos',
        function (returnedData) {
            resp = JSON.parse(returnedData);

            $.each(resp, function (idx, el) {
                var id = el.id;
                var nome = el.name;
                $(".TipoServico").append($("<option />").val(id).text(nome));
            });
            returnedData = null;
        }).fail(function () {
            console.log("Erro ao fazer ao carregar os getAllTipoCustos!");
        });
    $.get('api/Postman/getAllPaises',
        function (returnedData) {
            resp = JSON.parse(returnedData);
            $.each(resp, function (idx, el) {
                var id = el.id;
                var nome = el.name;
                $(".Pais").append($("<option />").val(id).text(nome));
            });

            returnedData = null;
        }).fail(function () {
            console.log("Erro ao fazer ao carregar os getAllPaises!");
        });


    $.get('api/Postman/getAllTipoFornecedores',
    function (returnedData) {
        resp = JSON.parse(returnedData);
        $.each(resp, function (idx, el) {
            var id = el.id;
            var nome = el.name;
            $(".FornecedorTipoTerceiro").append($("<option />").val(id).text(nome));
        });

        returnedData = null;
    }).fail(function () {
        console.log("Erro ao fazer ao carregar os getAllPaises!");
    });



}
function FornecedorInsertInputs(data, id) {

    var FORNECEDORIDV = data.DATA["FORNECEDORIDV"][0];
    var F_NOMECOMECIAL = data.DATA["F_NOMECOMERCIAL"];
    var F_NOME = data.DATA["F_NOME"];

    switch (id) {
        case 1:/*Geral */
            $("#ProjectoFornecedorID").val(FORNECEDORIDV);
            $("#ProjectoFornecedor").val(F_NOMECOMECIAL);
            break;
        case 2:/*Alojamento */
            $("#AlojamentoFornecedorID").val(FORNECEDORIDV);
            $("#AlojamentoNomeHotel").val(F_NOME);
            $("#AlojamentoFornecedor").val(F_NOMECOMECIAL);
            break;
        case 3:/*Voos */
            $("#VoosFornecedorID").val(FORNECEDORIDV);
            $("#VoosFornecedor").val(F_NOMECOMECIAL);
            break;
        case 4:/*Diarias */
            $("#DiariaFornecedorID").val(FORNECEDORIDV);
            $("#DiariaFornecedor").val(F_NOMECOMECIAL);
            break;
        case 5:/*Servicos */
            $("#ServicosFornecedorID").val(FORNECEDORIDV);
            $("#ServicosFornecedor").val(F_NOMECOMECIAL);
            break;
    }



}
Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d === undefined ? "." : d,
        t = t === undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function PopulatePaisesList() {
    var list;
    $.get("http://www.touchgroup.com/sgtt/cfc/main.cfc?method=getAllPaises", function (data, status) {
        resp = JSON.parse(data);
        $.each(resp, function () {
            list = this['PAIS_NOME'];

        });
    });
    var lista = list;
}

function ConvertDateForInput(date) {
    var dataIni = function (d) {

        var month = d.getMonth() + 1;
        var dia = d.getDate();
        if (month < 10) {
            if (dia < 10)
                var date = d.getFullYear() + "-0" + (d.getMonth() + 1) + "-0" + d.getDate();
            else
                var date = d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + d.getDate();
        }
        else {
            if (dia < 10)
                var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-0" + d.getDate();
            else
                var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        }
        
        return date;
    }(new Date(date));
    
    return dataIni;
}

function ConvertDateForTable(date) {
    var dataIni = function (d) {

        if (d.getMonth() < 10) {
            if (d.getDate() < 10)
                var date = "0" + d.getDate() + "/0" + (d.getMonth() + 1) + "/" + d.getFullYear();
            else
                var date = d.getDate() + "/0" + (d.getMonth() + 1) + "/" + d.getFullYear();
        }
        else {
            if (d.getDate() < 10)
                var date = "0" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
            else
                var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
        }
        var auxhoras;
        if (d.toLocaleTimeString().toLowerCase().indexOf("am") >= 0) {
            auxhoras = d.toLocaleTimeString().toLowerCase().replace(" am", "") + ".000";

        }
        else {
            auxhoras = d.toLocaleTimeString().toLowerCase().replace(" pm", "") + ".000";
        }
        date += " " + auxhoras;
        return date;
    }(new Date(date));
    return dataIni;
}

function ConvertDateForTableDiarias(date) {
    var dataIni = function (d) {

        if (d.getMonth() < 10) {
            if (d.getDate() < 10)
                var date = "0" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
            else
                var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
        }
        else {
            if (d.getDate() < 10)
                var date = "0" + d.getDate() + "/0" + (d.getMonth() + 1) + "/" + d.getFullYear();
            else
                var date = d.getDate() + "/0" + (d.getMonth() + 1) + "/" + d.getFullYear();
        }

        return date;
    }(new Date(date));
    return dataIni;
}


function ConvertDateForOrcamentosTable(date) {
    var dataIni = function (d) {

        if (d.getMonth() < 10) {
            if (d.getDate() < 10)
                var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + "0" + d.getDate() + " ";
            else
                var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " ";
        }
        else {
            if (d.getDate() < 10)
                var date = d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + "0" + d.getDate() + " ";
            else
                var date = d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + d.getDate() + " ";

        }
        var auxhoras;
        if (d.toLocaleTimeString().toLowerCase().indexOf("am") >= 0) {
            auxhoras = d.toLocaleTimeString().toLowerCase().replace(" am", "");

        }
        else {
            auxhoras = d.toLocaleTimeString().toLowerCase().replace(" pm", "");
        }
        date += " " + auxhoras;
        return date;
    }(new Date(date));
    return dataIni;
}


function ConvertDateForSetDias(date) {
    var dataIni = function (d) {

        if (d.getMonth() < 10) {
            if (d.getDate() < 10)
                var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + "0" + d.getDate() + " ";
            else
                var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " ";
        }
        else {
            if (d.getDate() < 10)
                var date = d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + "0" + d.getDate() + " ";
            else
                var date = d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + d.getDate() + " ";

        }

        return date;
    }(new Date(date));
    return dataIni;
}


function ConvertDateForSend(date) {
    var dataIni = function (d) {

        if (d.getMonth() < 10) {
            if (d.getDate() < 10)
                var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + "0" + d.getDate() + " ";
            else
                var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " ";
        }
        else {
            if (d.getDate() < 10)
                var date = d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + "0" + d.getDate() + " ";
            else
                var date = d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + d.getDate() + " ";
               
        }
        var auxhoras;
        if(d.toLocaleTimeString().toLowerCase().indexOf("am") >= 0)
        {
           auxhoras = d.toLocaleTimeString().toLowerCase().replace(" am", "") + ".000";

        }
        else{
            auxhoras = d.toLocaleTimeString().toLowerCase().replace(" pm", "") + ".000";
        }
        date += auxhoras
        return date;
    }(new Date(date));
    return dataIni;
}

function populateFornecedorList() {
    var response;
    $.ajax({
        url: "http://www.touchgroup.com/sgtt/cfc/main.cfc?method=getAllFornecedores",
        type: "GET",
        contentType: "json",
        success: function (data) {
            response = data;
            if (data.status === 'success') {
                var test = this
            }
            else if (data.status === 'error')
                var test = this
        },
        dataType: 'json'
    });
    var baba = response;
}
function callPopUpDiarias(x) {
    var id = x;

    $("#DiariaAuxDia").val(id);

    var rows = $(".DayHeader");

    var currRow = x-1;


    var input =  $(rows[currRow]).children();
   var dt = $(input[1]).val();



    var dt3 = ConvertDateForTable(dt);
    var dt2 = ConvertDateForInput(dt3);

    $("#DiariaData").val(dt2);
    $("#DataDeexecucao").val(dt);


    
    $('#AddicionarItemDiario').modal('show');

};
function setDias(x, dataIni){   



    var container = $('.projectDia');
    var uri = "img/add_btn.png";
    var resUrl = encodeURI(uri);
    $('.DayRow').remove();
    for (var i = 1; i <= x; i++) {
        var t = ConvertDateForSetDias(dataIni.toString())
        var d1 = Date.parse(t);
        var d2 = d1.add(i-1).days();
        var d3 = ConvertDateForTableDiarias(d2);
        var d4 = ConvertDateForSend(d2);

        $('<div class="DayRow">'
            + '<div class="DayHeader"> Dia ' + i
            + '<button class="AddDiariaBtn" type="button" onclick="callPopUpDiarias(' + i  +');" style="padding: 0px"><img class="AddDiariaInRow" src="' + resUrl + '" alt="Guardar"></button>'
            + ' - '+ d3
            + '<input type="hidden" class="DataDeExec" value="'+ d4 +'">'
            + '</div>'
            + '<table class="DiariaTables" id="DiariasRecords' + i + '">'
            + '<tr>'
            + '<th>Fornecedor</th>'
            + '<th>Nome Serviço</th>'
            + '<th>Valor/Moeda</th>'
            + '<th>Quantidade</th>'
            + '<th>PAX</th>'
            + '<th>Margem</th>'
            + '<th class="paraVenda">Total</th>'
            + '<th class="paraVenda">Total Pessoa</th>'
            + '<th class="Lucro">Total</th>'
            + '<th class="Lucro">Total Pessoa</th>'
            + '<th class="Lucro">Lucro</th>'
            + '<th>Observaçoes</th>'
            + '<th>Operaçoes</th>'
            + '</tr>'
            + '</table>'
            + '</div>').appendTo(container);
        var d2 = d1.add(i).days();
    }
    
}

function openHotelMenu(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent2");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
function openTab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

