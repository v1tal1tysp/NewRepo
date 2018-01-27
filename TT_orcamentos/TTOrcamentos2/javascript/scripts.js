var projectID = "";
var OrcamentoID = "";
var ParrentOrcamentoID = "";
var Versao = 1;
var peBOOL = false;
//https://www.getdonedone.com/accessing-your-windows-development-environment-from-osx/
var url = "img/check.png";
var url2 = "img/SaveIcn.png";
var url3 = "img/remove.png";
var url4 = "img/InfoObs.png";
var url5 = "img/add_btn.png";
var url6 = "img/setting.png";
var url7 = "img/icon-hotelbill.png";
var url8 = "img/arrow_down.png";
var url9 = "img/man-512.png";

var res = encodeURI(url);
var res2 = encodeURI(url2);
var res3 = encodeURI(url3);
var res4 = encodeURI(url4);
var res5 = encodeURI(url5);
var res6 = encodeURI(url6);
var res7 = encodeURI(url7);
var res8 = encodeURI(url8);
var res9 = encodeURI(url9);
var InputClick;
var InputId;

var form_modified = false;

var ListafornecedoresGBL = [];


$(".AddOrcamentoPe").click(function () {

    /*Orçamento */
    var orcamentoidv = "";
    var projectoidv = projectID; /*Este é hidden*/
    var fornecedoridv = $("#ProjectoFornecedorID").val();/*Este é hidden*/
    var datadeiniciar = ConvertDateForSend($("#OrcamentoDataInicio").val());
    var o_datainicio = datadeiniciar;
    var o_numeronoites = parseInt($("#OrcamentoNoites").val());
    var o_numerodias = parseInt($("#OrcamentoDias").val());
    var o_numeropessoas = parseInt($("#OrcamentoNumeroDePessoas").val());


    var estadoidv = $("#OrcamentoEstado option:selected").val();
    var estadonome = $("#OrcamentoEstado option:selected").text();
    var tipoivaidv = $("#OrcamentoTipoIva option:selected").val();
    var tipoivanome = $("#OrcamentoTipoIva option:selected").text();
    var ivaidv = $("#OrcamentoIva option:selected").val();
    var ivaidvnome = $("#OrcamentoIva option:selected").text();
    var OrcamentoCambioTXT = $("#OrcamentoMoedaCompra option:selected").val();
    var OrcamentoCambioTXTNome = $("#OrcamentoMoedaCompra option:selected").text();


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



    var DataUpdate2 = new Date();
    var DataUpdate = ConvertDateForSend(DataUpdate2);


    peBOOL = true;
    var orcamentoPai = "0";

    var orcamento = {
        "orcamentoidvId": orcamentoidv,
        "Orcamento": {
            "_id": orcamentoidv,
            "projectoidv": projectoidv,
            "estado": { "inId": estadoidv, "Name": estadonome },
            "tipoivaidv": { "inId": tipoivaidv, "name": tipoivanome },
            "ivaidv": { "inId": ivaidv, "name": ivaidvnome },
            "cambioidv": { "inId": cambioidv, "name": OrcamentoCambioTXTNome, "value": c_valor },
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
            "pe": peBOOL,
            "DataUpdate": DataUpdate
        }
    };



    InsertOrcamentoInicial(orcamento);

});

$("#SaveNewOrcamento").click(function () {
    var cty = $("#ListaOrcamentos").find("tr");
    var cnt = cty.length - 1;
    if (ParrentOrcamentoID === "0") {
        ParrentOrcamentoID = OrcamentoID;
    }

    OrcamentoID = "";

    var d = new Date();

    if (cnt === 0) {
        cnt = 1;
    }


    var ver = parseInt($("#VersaoActual").val());
    ver++;
    $("#VersaoActual").val(ver.toString());
    var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + "-v" + ver.toString();
    $("#OrcamentoNome").val(strDate);

    savecurrentProject();
    

});

function savecurrentProject() {

    /*PROJETO*/
    var Projetoestadoidv = $("#ProjectEstado option:selected").val();
    var ProjetoestadoName = $("#ProjectEstado option:selected").text();

    var Projetosigavidv = $("#ProjectoSigav").val();
    var Projetop_nome = $("#ProjectName").val();
    var Projetop_descricao = $("#ProjectDescription").val();
    var ProjectoFornecedorid = $("#ProjectoFornecedorID").val();
    var FornecedorName = $("#ProjectoFornecedor").val();

    var ProjectoAccountManagerName = $("#ProjectoAccountManagerName").val();
    var ProjectoAccountManager = $("#ProjectoAccountManager").val();
    var ProjectoDesigner = $("#ProjectoDesigner").val();
    var ProjectoDesignerName = $("#ProjectoDesignerName").val();

    var isoDate = new Date().toISOString();
    var DataEntrada = isoDate;
    var ProjectoNomeContacto = $("#ProjectoNomeContacto").val();

    /*Orçamento */
    var orcamentoidv = OrcamentoID;
    var projectoidv = projectID; /*Este é hidden*/
    var fornecedoridv = $("#ProjectoFornecedorID").val();/*Este é hidden*/




    var estadoidv = $("#OrcamentoEstado option:selected").val();
    var estadonome = $("#OrcamentoEstado option:selected").text();
    var tipoivaidv = $("#OrcamentoTipoIva option:selected").val();
    var tipoivanome = $("#OrcamentoTipoIva option:selected").text();
    var ivaidv = $("#OrcamentoIva option:selected").val();
    var ivaidvnome = $("#OrcamentoIva option:selected").text();
    var OrcamentoCambioTXT = $("#OrcamentoMoedaCompra option:selected").val();
    var OrcamentoCambioTXTNome = $("#OrcamentoMoedaCompra option:selected").text();



    var datadeiniciar = ConvertDateForSend($("#OrcamentoDataInicio").val());
    var o_datainicio = datadeiniciar;
    var o_numeronoites = parseInt($("#OrcamentoNoites").val());
    var o_numerodias = parseInt($("#OrcamentoDias").val());
    var o_numeropessoas = parseInt($("#OrcamentoNumeroDePessoas").val());
    var Versao = parseInt($("#VersaoActual").val());


    var CambioArr = OrcamentoCambioTXT.split("-");
    var cambioidv = CambioArr[0];
    var c_valor = parseFloat(CambioArr[1])
    var o_nome = $("#OrcamentoNome").val();
    var dataCriacao = new Date().toISOString();
    var o_datacriacao = dataCriacao;
    var o_margemvenda = parseFloat($("#OrcamentoMargem").val());
    var o_markup = parseFloat($("#OrcamentoMarkup").val());
    var o_descricao = $("#OrcamentoDescricao").val();

    /*ver o numero de orcamentos*/
    var conta = $("#ListaOrcamentos tr");
    var o_ordem = conta.length;



    var DataUpdate2 = new Date().toISOString();
    var DataUpdate = DataUpdate2;

    if (ParrentOrcamentoID === "" || ParrentOrcamentoID === null || ParrentOrcamentoID === "0") {
        var orcamentoPai = "0";
    } else {
        var orcamentoPai = ParrentOrcamentoID;
    }

    var orcamento = {
        "orcamentoidvId": orcamentoidv,
        "Orcamento": {
            "_id": orcamentoidv,
            "projectoidv": projectoidv,
            "estado": { "inId": estadoidv, "Name": estadonome },
            "tipoivaidv": { "inId": tipoivaidv, "name": tipoivanome },
            "ivaidv": { "inId": ivaidv, "name": ivaidvnome },
            "cambioidv": { "inId": cambioidv, "name": OrcamentoCambioTXTNome, "value": c_valor },
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
            "pe": peBOOL,
            "DataUpdate": DataUpdate
        }
    };

    var projecto = {
        "ClienteID": ProjectoFornecedorid,
        "id": projectoidv,
        "estado": { "inId": Projetoestadoidv, "Name": ProjetoestadoName },
        "projecto": {
            "_id": projectoidv,
            "estado": { "inId": Projetoestadoidv, "Name": ProjetoestadoName },
            "sigav": Projetosigavidv,
            "Nome": Projetop_nome,
            "descricao": Projetop_descricao,
            "ClienteId": ProjectoFornecedorid,
            "Cliente": FornecedorName,
            "AccountManagerId": ProjectoAccountManager,
            "AccountManager": ProjectoAccountManagerName,
            "DesignerId": ProjectoDesigner,
            "Designer": ProjectoDesignerName,
            "DataEntrada": DataEntrada,
            "NomeContacto": ProjectoNomeContacto
        }
    };
    InsertProjectoInicial(projecto, orcamento);


}

function SaveAllRecords( novorcamento) {
    ReadAlojamento();


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

        var data = {
            "_id": "",
            "orcamentoidv": OrcamentoID,
            "fornecedoridv": VoosFornecedorID,
            "VoosFornecedor": VoosFornecedor,
            "cambioidv": { "_id": VoosCambioidv, "name": VoosCambioName, "value": VoosMoedaValor },
            "ivaidv": { "_id": VoosIva, "name": VoosCambioName },
            "tipocustoidv": { "_id": VoosTipoIva, "name": VoosTipoIvaName },
            "v_partida": VoosPartida,
            "v_destino": VoosDestino,
            "v_nomevoo": VoosNomeVoo,
            "v_preco": VoosValor,
            "v_comissao": VoosCommisao,
            "v_net": VoosNet,
            "v_valorcambio": VoosMoedaValor,
            "v_valoreuros": 0,
            "v_margemvenda": VoosMargemVenda,
            "v_markup": VoosMarkup,
            "v_taxaA": VoosTaxaA,
            "v_taxaB": VoosTaxaB,
            "v_numeropessoas": 0,
            "v_disponibilidade": 1,
            "v_valortotalpvp": 0,
            "v_valorporpessoapvp": VoosValor
        };



        sendVoo(data, false);

        


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

function LoadingProjecto(id, IdOrc) {


    var returnedDataOrcamentos = $("#OrcamentosActivosHidden").val();
    var returnedData = $("#ProjectoHidden").val();

    var orcamentos = JSON.parse(returnedDataOrcamentos);
    var obj = JSON.parse(returnedData);

    projectID = id;

    GetProjectoFiles(projectID);

    var tteste = obj.estado.Name;

    var inId = obj.estado.inId;
    $("#ProjectEstado option:contains(" + tteste + ")").attr('selected', 'selected')



    $("#ProjectoSigav").val(obj.sigav);
    $("#ProjectName").val(obj.Nome);
    $("#ProjectoFornecedor").val(obj.Cliente);
    $("#ProjectoFornecedorID").val(obj.ClienteId);
    $("#ProjectDescription").val(obj.descricao);
    $("#ProjectoNomeContacto").val(obj.NomeContacto);
    $("#ProjectoDesigner").val(obj.DesignerId);
    $("#ProjectoDesignerName").val(obj.Designer);

    $("#ProjectoAccountManagerName").val(obj.AccountManager);
    $("#ProjectoAccountManager").val(obj.AccountManagerId);



    $(".AddOrcamentoBtn").css("display", "block");

    LoadingOrcamentos(projectID, IdOrc);

    obj = null;
    returnedData = null;



    $.each(orcamentos, function (index, obj) {

        var local = window.location;
        var page = window.location + '&IDorc=' + obj.Id;
        var query = window.location.href;
        var page = query.split('?')[0];

        var orcamentoidv = obj.Id;
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
            var page = window.location + '&IDorc=' + obj.Id;
            var query = window.location.href;
            var page = query.split('?')[0];

            var orcamentoidv = obj.Id;
            var projectoidv = obj.projectoidv;
            var estadoidv = obj.estado.inId;
            var tipoivaidv = obj.tipoivaidv.inId;
            var ivaidv = obj.ivaidv.inId;
            var cambioidv = obj.cambioidv.inId;
            var o_nome = obj.o_nome;
            var o_datacriacao = obj.o_datacriacao;
            var o_margemvenda = obj.o_margemvenda;
            var o_markup = obj.o_markup;
            var o_descricao = obj.o_descricao;
            var VersaoActual = obj.Versao;
            var OrcamentoParrent = obj.parrentorcamentoidv;

            var pe = obj.pe;
            var e_nome = obj.estado.Name;
            var ti_nome = obj.tipoivaidv.name;
            var i_taxa = obj.ivaidv.name;
            var c_nome = obj.cambioidv.name;
            var c_valor = parseFloat(obj.c_valor);



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


                $("#OrcamentoMoedaCompra option:contains(" + obj.cambioidv.name + ")").attr('selected', 'selected')



                $("#VersaoID").text(o_nome);
                var DataInicioInput = ConvertDateForInput(obj.o_datainicio);

                $("#OrcamentoNumeroDePessoas").val(parseInt(obj.o_numeropessoas));
                $("#OrcamentoNoites").val(parseInt(obj.o_numeronoites));
                $("#OrcamentoDias").val(parseInt(obj.o_numerodias));
                $("#OrcamentoDataInicio").val(DataInicioInput);

                ParrentOrcamentoID = OrcamentoParrent;
                setDias(parseInt(obj.o_numerodias), obj.o_datainicio);

                peBOOL = pe;
                LoadRecords(OrcamentoID);

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
                '<td>' + obj.o_numeropessoas + '</td>' +
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


    $(".tablinks").css("display", "block");
    $(".ProjectMenu button").css("display", "block");

}


function insertTabelaFornecedores(fornecedoridv, fname, notas, data, valor) {

    var aux = { "fornecedoridv": fornecedoridv, "fname": fname, "notas": notas, "data": data, "valor": valor };

    ListafornecedoresGBL.push(aux);



    var uniqueNames = [];
    var ListaJson = [];


    $.each(ListafornecedoresGBL, function (i, el) {
        if ($.inArray(el["fornecedoridv"], uniqueNames) === -1) {
            ListaJson.push({ "Fornecedor": el["fornecedoridv"], "Data": [] })
            uniqueNames.push(el["fornecedoridv"]);

        }


    });




    $("#FornecedoresRecords").find("tr:gt(0)").remove();

    $.each(ListafornecedoresGBL, function (index2) {
        var obj = ListafornecedoresGBL[index2];
        $.each(ListaJson, function (index) {

            if (ListaJson[index]["Fornecedor"] === obj["fornecedoridv"]) {
                var fornname = obj["fname"];
                var notass = obj["notas"];
                var datass = obj["data"];
                var valorss = obj["valor"];
                ListaJson[index]["Data"].push({ "fname": fornname, "notas": notass, "data": datass, "valor": valorss });

            }

        });

    });



    $.each(ListaJson, function (index) {
        var lista2 = ListaJson[index]["Data"];
        $.each(lista2, function (index2) {

            var len = ListaJson[index]["Data"].length;

            if (index2 === 0) {
                $("#FornecedoresRecords tr:last").after('<tr>' +
                    '<td rowspan="' + len + '">' + lista2[index2]["fname"] + '</td>' +
                    '<td>' + lista2[index2]["notas"] + '</td>' +
                    '<td>' + ConvertDateForTable(lista2[index2]["data"]) + '</td>' +
                    '<td>' + parseFloat(lista2[index2]["valor"]).formatMoney(2, '.', ',') + '</td>' +
                    '<td>' + 0 + '</td>' +
                    '</tr>');

            }
            else {
                $("#FornecedoresRecords tr:last").after('<tr>' +
                    '<td>' + lista2[index2]["notas"] + '</td>' +
                    '<td>' + ConvertDateForTable(lista2[index2]["data"]) + '</td>' +
                    '<td>' + parseFloat(lista2[index2]["valor"]).formatMoney(2, '.', ',') + '</td>' +
                    '</tr>');
            }

        });



    });


    updateValues($("#FornecedoresRecords"));


}


function preencherTabelaServicosLoading(data) {
    $.each(data, function (index, el) {


        var a_pagamento = el.s_pagamento;
        var tipoServicoIdv = el.servicottidv;
        var a_datapagamento = el.s_datapagamento;
        var tipocustoidv = el.tipocustoidv;
        var ivaidv = el.ivaidv;
        var cambioidv = el.cambioidv.Id;
        var servicoID = el.servicottidv;
        var ServicosFornecedor = el.fornecedornome;
        var ServicosFornecedorID = el.fornecedoridv;
        var ServicosTipoServico = el.s_nomeservico;
        var ServicosValor = parseFloat(el.s_preco);
        var ServicosMoedaCompra = parseFloat(el.s_valorcambio);
        var ServicosMoedaName = el.cambioidv.name;
        var ServicosNet = parseFloat(el.s_net);
        var ServicosComisao = parseFloat(el.s_comissao);
        var ServicosMargem = parseFloat(el.s_margemvenda);
        var ServicosMarkup = parseFloat(el.s_markup);
        var ServicosObservacoes = el.s_observacoes;
        var ServicosQuantidade = parseInt(el.s_quantidade);
        var ServicosUnidades = parseInt(el.s_unidades);
        var ValorTotal = el.s_valoreuros;


        var str = "";

        if (ServicosMoedaName === "EUR") {
            str = ServicosValor + '/<span class="Currency">EUR</span>';
        }
        else {
            
            str = ServicosValor + '/<span class="CurrencyRed">' + ServicosMoedaName + '</span>' + '</br>' + (ServicosValor / ServicosMoedaCompra).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>';
        }

        //insertTabelaFornecedores(ServicosFornecedorID,ServicosFornecedor, a_pagamento, a_datapagamento, ValorTotal);

        $("#ServicosRecords tr:last").after('<tr>' +
            '<td>' + ServicosFornecedor + '<input type="hidden" class="HiddenRecordId" value="' + servicoID + '">' +
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
            '<td>' + '<img class="InfoObs" src="' + res4 + '" alt="Guardar">' + '</td>' +
            '<td class="OpIcons">' +
            '<img class=" " src="' + res + '" alt="saved">' +
            '<img class="SaveRecAloj" src="' + res2 + '" alt="Guardar">' +
            '<img class="rmvRecord" src="' + res3 + '" alt="remover">' +
            '</td>' +
            '</tr>');

        updateValues($("#ServicosRecords"));
        $("#ServicosVerRecords tr:last").after('<tr>' +
            '<td>' + ServicosFornecedor + '<input type="hidden" class="HiddenRecordId" value="' + servicoID + '">' +
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
function preencherTabelaDiariasLoading(data) {
    $.each(data, function (index, el) {

        var DataDoRecord = el.d_data;


        var DataBase = $("#OrcamentoDataInicio").val()
        var dataInput2 = ConvertDateForInput(DataDoRecord);

        var numdias = parseInt($("#OrcamentoDias").val());
        var DiariaAuxDia = 1;
        for (var x = 1; x <= numdias; x++) {
            var dataInicial = new Date.parse(DataBase);
            var d2 = new Date(dataInicial.add(x).days());
            var d3 = ConvertDateForTable(d2);

            if (dataInput2 === d3) {
                DiariaAuxDia = x + 1;

            }
        }




        var RefAux = "#DiariasRecords" + el.DiariaAuxDia;
        var tabela = $(RefAux);
        var fornecedoridv = el.fornecedoridv;
        var tipocustoidv = el.tipocustoidv;
        var ivaidv = el.ivaidv;

        var a_pagamento = el.d_pagamento;
        var a_datapagamento = el.d_datapagamento;

        var DiariaID = el.diariaidv;
        var DiariaFornecedor = el.fornecedorname;
        var DiariaComisao = parseFloat(el.d_comissao);
        var DiariaValor = parseFloat(el.d_preco);
        var DiariaTotalPvp = parseFloat(el.d_valortotalpvp);
        var DiariaTotalPAXPvp = parseFloat(el.d_valorporpessoapvp);
        var cambioidv = el.cambioidv.Id;
        var DiariaCambioValor = parseFloat(el.cambioidv.value);
        var DiariaMoedaName = el.cambioidv.name;
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
            str = DiariaValor + '/<span class="Currency">EUR</span>';
        }
        else {
            str = DiariaValor + '/<span class="CurrencyRed">' + DiariaMoedaName + '</span>' + '</br>' + (DiariaValor / DiariaCambioValor).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>';
        }
        insertTabelaFornecedores(fornecedoridv, DiariaFornecedor, a_pagamento, a_datapagamento, ValorTotal);

        RefAux += " tr:last";
        var htmlRec = '<tr><td>' + DiariaFornecedor + '-' + DiariaAuxDia +
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
            '</td><td>' + DiariaNomeServico + '</td><td>' + str + '</td><td>' + DiariaQuantidade + '</td>' +
            '<td><input type="number" class="smNumInput" value="' + DiariaUnidade + '"></td><td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + DiariaMargem + '">%</td>' +
            '<td>' + DiariaTotalPvp + '</td><td>' + DiariaTotalPAXPvp + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + '<img class="InfoObs" src="' + res4 + '" alt="Guardar">' + '</td><td class="OpIcons">' +
            '<img class=" " src="' + res + '" alt="saved"><img class="SaveRecAloj" src="' + res2 + '" alt="Guardar"><img class="rmvRecord" src="' + res3 + '" alt="remover">' +
            '</td></tr>';


        $(RefAux).after(htmlRec);


        $("#DiariaVerRecords tr:last").after('<tr><td>' + DiariaFornecedor + '</br>' + '-' + dataInput2 +
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
            '</td><td>' + DiariaNomeServico + '</td><td>' + str + '</td><td>' + DiariaQuantidade + '</td>' +
            '<td><input type="number" class="smNumInput" value="' + DiariaUnidade + '"></td><td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + DiariaMargem + '">%</td>' +
            '<td>' + DiariaTotalPvp + '</td><td>' + DiariaTotalPAXPvp + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + '<img class="InfoObs" src="' + res4 + '" alt="Guardar">' + '</td><td class="OpIcons">' +
            '<img class=" " src="' + res + '" alt="saved"><img class="SaveRecAloj" src="' + res2 + '" alt="Guardar"><img class="rmvRecord" src="' + res3 + '" alt="remover">' +
            '</td></tr>');


    });
    activator();

}
function preencherTabelaVoosLoading(data) {

    var testing = data;
    $.each(data, function (index, el) {

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


        var id = el.vooidv;
        var VoosPartida = el.v_partida;
        var VoosDestino = el.v_destino;
        var VoosNomeVoo = el.v_nomevoo;
        var VoosValor = el.v_preco;
        var VoosMargemVenda = el.v_margemvenda;
        var VoosNLugares = el.v_numeropessoas;
        var VoosMoedaName = el.cambioidv.name;
        var VoosFornecedor = el.VoosFornecedor;
        var totalpvp = el.v_valortotalpvp;
        var PessoaPvp = el.v_valorporpessoapvp;
        var VMoeda = el.v_valorcambio;
        var valorTotal = el.v_valoreuros;





        var str = "";

        if (VoosMoedaName === "EUR") {
            str = VoosValor + '/<span class="Currency">EUR</span>';
        }
        else {
            str = VoosValor + '/<span class="CurrencyRed">' + VoosMoedaName + '</span>' + '</br>' + (VoosValor / VMoeda).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>';
        }
        insertTabelaFornecedores(fornecedoridv, VoosFornecedor, a_pagamento, a_datapagamento, valorTotal);

        /*ciclos*/
        $('#VoosRecords tr:last').after('<tr>' +
            '<td>' + VoosNomeVoo + '</br>' + VoosFornecedor + '<input type="hidden" class="HiddenRecordId" value="' + id + '">' +
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
             '<input type="hidden" class="HiddenRecordADATAPagamento" value="' + a_datapagamento + '">' +
             '<input type="hidden" class="HiddenRecordValorCambio" value="' + VMoeda + '">' + '</td>' +
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
            '<td>' + VoosNomeVoo + '<input type="hidden" class="HiddenRecordId" value="' + id + '">' +
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
             '<input type="hidden" class="HiddenRecordADATAPagamento" value="' + a_datapagamento + '">' +
             '<input type="hidden" class="HiddenRecordValorCambio" value="' + VMoeda + '">' + '</td>' +
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
    var btnBill = "<button class='GetBill' type='button' style='padding: 0px'><img class='GetIcon 5' src='" + res7 + "' alt='Guardar'></button>";
    var btn = "<button class='GetBtnFornecedor' type='button' style='padding: 0px'><img class='GetIcon 5' src='" + res6 + "' alt='Guardar'></button>";
    var btnRemove = "<button class='RemoveBtnFornecedor' type='button' style='padding: 0px'><img class='removeFornecedor' src='img/remove.png' alt='remover'></button>";
    var btnApplyToAllItemsBtn = "<button class='ApplyToTableColumn' type='button' style='padding: 0px'><img class='GetIcon 5' src='" + res8 + "' alt='Guardar'></button>";
    $("#tabs").tabs();

    var uniqueNames = [];
    var ListaJson = [];


    $.each(data, function (i, Tabela) {
        var num_tabs = $("#tabs#tabs ul li").length + 1;
        $("#tabs#tabs ul").append("<li><a href='#tab" + num_tabs + "'>" + Tabela.Hotelname + "</a></li>");
        var hiddenIDInterno = "<input type='hidden' class='AlojamentoID' value='" + Tabela.Id + "' >";
        var hidden = "<input type='hidden' class='AlojamentoFornecedorID' value='" + Tabela.Fornecedor + "' >";
        var jsonAcordo = JSON.stringify(Tabela.acordo);
        var hiddenAcordo = "<input type='hidden' class='hiddenAlojamentoAcordo' value='" + jsonAcordo + "' >";

        /*TABLE - FIRST ROW*/
        var table = "<table class='AlojamentoOverview " + i + 1 + "'><tr><td class='alojName'>" + Tabela.Hotelname + "</td>";
        /*<TD>  QUARTOS*/
        $.each(Tabela.quartos, function (index, obj) {
            table += "<td class='QuartoDev'><img class='rmvAlojType " + (index + 1) + "' src='img/remove.png' alt='remover'><input disabled type='text' value='" + obj.nome + "' class='form-control AlojTableType'><input type='hidden' value='" + obj.capacidade + "' class='form-control AlojNPax'></td>";
        });
        /*<TD>  AddIcon*/
        table += "<td>" + btnApplyToAllItemsBtn + "<img class='AddIcon AlojamentoTipos " + i + "' src='" + res5 + "' alt='Guardar'></td></tr>";

        /*TABLE - Day Rows*/
        $.each(Tabela.Dias, function (index, obj) {
            /*ROW HEAD*/
            var tr = "<tr class='AlojDiasTable'><td> <input type='date' value='" + ConvertDateForInput(obj.Data) + "' class='form-control AlojamentoDateAddVar'></td>";

            /*ROW Numbers*/
            $.each(obj.definicao, function (index, def) {
                tr += "<td> <input type='number'  min-value='0' value='" + def.numero + "'  class='AlojTableNumberIn " + def.nome + "' ></td>";
            });

            /*ROW END*/
            tr += "<td><span class='AlojTotaisPax " + 0 + "'>0</span>% / <span class='AlojTotaisPaxN " + 0 + "'>0</span><img class='boneco' src='" + res9 + "' alt='pax'></td></tr>";
            table += tr;
        });

        /*TABLE - Last ROW*/
        var lastTr = "<tr><td></td>";
        /*TABLE SOMATORIOS*/
        $.each(Tabela.quartos, function (index, obj) {
            lastTr += "<td><span class='AlojTotais " + obj.capacidade + "'>0</span></td>";

        });
        lastTr += "</tr></table>";
        table += lastTr;


        $("#tabs#tabs").append("<div id='tab" + num_tabs + "'>" + btnBill + hidden + hiddenAcordo + hiddenIDInterno + btn + btnRemove + table + "</div>");
        $("#AlojamentoResume").css("display", "block");


    });


    //RefreshAlojTableDias();
    RefreshAlojamento();
    $("#tabs#tabs").tabs("refresh");
}



function ReadAlojamento() {
    //Lista tabelas

    var tabelas = $(".AlojamentoOverview");
    var acrdos = $(".hiddenAlojamentoAcordo");

    var result = [];

    //TABELAS
    $.each(tabelas, function (index, tabela) {

        var jsonacordo = $(tabela).parent().find(".hiddenAlojamentoAcordo").val();
        var fornecedorId = $(tabela).parent().find(".AlojamentoFornecedorID").val();
        var acordo = JSON.parse(jsonacordo);

        var hotelname = $(tabela).find(".alojName").html();
        var orcaid = OrcamentoID;

        var quartosDef = $(tabela).find(".QuartoDev");


        var arrQuartosID = [];

        //QUARTOS
        $.each(quartosDef, function (index, qu) {
            // var quartosIds = $(qu).find(".AlojNPax").attr('class').split(' ')[1];
            var obj = new Object();
            obj.nome = $(qu).find(".AlojTableType").val();
            obj.capacidade = $(qu).find(".AlojNPax").val();

            arrQuartosID.push(obj)
        });


        var Diasrow = $(tabela).find(".AlojDiasTable");
        //DIAS

        var Dias = [];
        $.each(Diasrow, function (index, d) {
            var dia = $(d).find(".AlojamentoDateAddVar").val();
            var obj = new Object();
            obj.Data = dia;
            obj.definicao = arrDias;
            var numbersArr = $(d).find(".AlojTableNumberIn");
            //ARRAY de NUMEROS INPUTS
            var arrDias = []

            $.each(numbersArr, function (index, number) {
                var values = $(number).val();

                var IdQuarto = $(number).attr('class').split(' ')[1];

                var obj = new Object();

                obj.nome = IdQuarto;
                obj.numero = values;
                arrDias.push(obj);
            });
            obj.Data = dia;
            obj.definicao = arrDias;

            Dias.push(obj);
        });


        var AlojCambioName = $("#AlojamentoMoedaCompra option:selected").text();
        var AlojCambioArr = $("#AlojamentoMoedaCompra option:selected").val();
        var cambioarray = AlojCambioArr.split('-');
        var AlojCambioidv = cambioarray[0];
        var AlojMoedaValor = parseFloat(cambioarray[1]);

        var Almoco = $("#AlmocoChk").val();
        var AlojamentoObservacoes = $("#AlojamentoObservacoes").val();

        var AlojIvaName = $("#IvaAloj option:selected").text();
        var AlojIva = $("#IvaAloj option:selected").val();
        var AlojTipoIvaName = $("#AlojamentoTipoIva option:selected").text();
        var AlojTipoIva = $("#AlojamentoTipoIva option:selected").val();

        var MarkupAloj = parseFloat($("#MarkupAloj").val());
        var AlojomanentoNet = parseFloat($("#AlojomanentoNet").val());
        var MargemAloj = parseFloat($("#MargemAloj").val());
        var ALojamentoComisao = parseFloat($("#ALojamentoComisao").val());

        var trs = $("#AlojamentoRecords").find("." + fornecedorId);

        var records = [];
        $.each(trs, function (index, d) {
            var childslen = $(d).children().length;
            var childs = $(d).children();
            var className = d.className;

            var RecordToAppend = new Object();
            if (childslen === 10) {

                RecordToAppend.classnameTr = className;
                RecordToAppend.valor = parseFloat($(childs[3]).find(".smNumInput").val());
                RecordToAppend.margem = parseFloat($(childs[4]).find(".smNumInput").val());
                records.push(RecordToAppend);
            } else {
                RecordToAppend.classnameTr = className;
                RecordToAppend.valor = parseFloat($(childs[2]).find(".smNumInput").val());
                RecordToAppend.margem = parseFloat($(childs[3]).find(".smNumInput").val());
                records.push(RecordToAppend);
            }

        });



        var AlojamentoID = $(tabela).parent().find(".AlojamentoID").val();
        if (AlojamentoID === "none") {
            var AlojamentoID = "";
        }



        var hotel = {
            "_id": AlojamentoID,
            "Hotelname": hotelname,
            "OrcamentoId": orcaid,
            "Fornecedor": fornecedorId,
            "quartos": arrQuartosID,
            "acordo": acordo,
            "Dias": Dias,
            "Records": records
        }


        result.push(hotel);
    });


    var d = [];
    $.each(result, function (index, item) {
        var objeto = {
            "hotel": item._id,
            "Objeto": item
        }
        sendAlojamento(objeto, true)
    });


    //    send hotel

}

function InsertTableAlojamentoHotel(hotelname, valueID) {
    var num_tabs = $("#tabs#tabs ul li").length + 1;

    /*ICONS*/
    $("#tabs#tabs ul").append("<li><a href='#tab" + num_tabs + "'>" + hotelname + "</a></li>");




    var days = parseInt($("#OrcamentoNoites").val());


    var btnApplyToAllItemsBtn = "<button class='ApplyToTableColumn' type='button' style='padding: 0px'><img class='GetIcon 5' src='" + res8 + "' alt='Guardar'></button>";

    var btnBill = "<button class='GetBill' type='button' style='padding: 0px'><img class='GetIcon 5' src='" + res7 + "' alt='Guardar'></button>";
    var btn = "<button class='GetBtnFornecedor' type='button' style='padding: 0px'><img class='GetIcon 5' src='" + res6 + "' alt='Guardar'></button>";
    var btnRemove = "<button class='RemoveBtnFornecedor' type='button' style='padding: 0px'><img class='removeFornecedor' src='img/remove.png' alt='remover'></button>";
    var hiddenIDInterno = "<input type='hidden' class='AlojamentoID' value='none' >";
    var hidden = "<input type='hidden' class='AlojamentoFornecedorID' value='" + valueID + "' >";
    var hiddenAcordo = "<input type='hidden' class='hiddenAlojamentoAcordo' >";
    var cnt = $(".AlojamentoHoteis").children().length + 1;
    var data = ConvertDateForInput($("#OrcamentoDataInicio").val());
    var quartosArr = JSON.parse($("#quartos").val());


    /*TABLE - FIRST ROW*/
    var table = "<table class='AlojamentoOverview " + cnt + "'><tr><td class='alojName'>" + hotelname + "</td>";


    $.each(quartosArr, function (index, obj) {
        if (obj.predefenido == true) {

            table += "<td class='QuartoDev'><img class='rmvAlojType " + (index + 1) + "' src='img/remove.png' alt='remover'><input disabled type='text' value='" + obj.name + "' class='form-control AlojTableType'><input type='hidden' value='" + obj.capacidade + "' class='form-control AlojNPax " + obj.inId + "'></td>";
        }
    });


    /*Inserir aqui*/
    table += "<td>" + btnApplyToAllItemsBtn + "<img class='AddIcon AlojamentoTipos " + cnt + "' src='" + res5 + "' alt='Guardar'></td></tr>";


    /*TABLE - Day Rows*/

    for (var day = 0; day < days; day++) {

        var tomorrow = new Date(data)
        tomorrow.setDate(tomorrow.getDate() + day);
        /*ROW HEAD*/
        var tr = "<tr class='AlojDiasTable'><td> <input type='date' value='" + ConvertDateForInput(tomorrow) + "' class='form-control AlojamentoDateAddVar'></td>";

        /*ROW Numbers*/
        $.each(quartosArr, function (index, obj) {
            if (obj.predefenido == true) {
                tr += "<td> <input type='number'  min-value='0' value='0'  class='AlojTableNumberIn " + obj.inId + "' ></td>";
            }
        });

        /*ROW END*/
        tr += "<td><span class='AlojTotaisPax " + 0 + "'>0</span>% / <span class='AlojTotaisPaxN " + 0 + "'>0</span><img class='boneco' src='" + res9 + "' alt='pax'></td></tr>";
        table += tr;
    }

    /*TABLE - Last ROW*/
    var lastTr = "<tr><td></td>";

    $.each(quartosArr, function (index, obj) {
        if (obj.predefenido == true) {
            lastTr += "<td><span class='AlojTotais " + obj.capacidade + "'>0</span></td>";
        }
    });

    lastTr += "</tr></table>";
    table += lastTr;

    $("#tabs#tabs").append("<div id='tab" + num_tabs + "'>" + btnBill + hidden + hiddenAcordo + hiddenIDInterno + btn + btnRemove + table + "</div>");

    $("#tabs#tabs").tabs("refresh");
    //RefreshAlojTableDias();

    $("#AlojamentoResume").css("display", "block");
}

function RefreshTabelaresume() {
    var tabelas = $(".AlojamentoOverview");
    var cntTotal = 0;
    var miarr = new Array;

    var allrows = $(".AlojDiasTable");


    $(tabelas).each(function (i, tb) {
        var rows = $(tb).find(".AlojDiasTable");
        $(rows).each(function (i, row) {


            var paxCnt = $(row).find(".AlojTotaisPaxN").html();

            var myObject = new Object();
            myObject.index = i + 1;
            myObject.cnt = parseInt(paxCnt);


            var found = false;
            $(miarr).each(function (i, d) {
                if (d.index == myObject.index) {
                    d.cnt += myObject.cnt;
                    found = true;
                }
            })
            if (!found) {
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
        '<td>' + result.toFixed(2) + '</td>' +
        '</tr>');
    })





}


function RefreshAlojamento() {
    var tabelas = $(".AlojamentoOverview");
    var capacidadeTotalPax = parseInt($("#OrcamentoNumeroDePessoas").val());

    $(tabelas).each(function (i, table) {
        /*QUARTOS NOITES*/
        var spns = $(table).find(".AlojTotais");
        $(spns).each(function (i, spn) {
            var cap = spn.className.split(" ")[1];
            var arrInputs = $(table).find(".AlojTableNumberIn." + cap);
            var total = 0;
            $(arrInputs).each(function (i, input) {
                var valor = parseInt($(input).val());
                total += valor;

            });
            $(spn).html(total.toString());
        });


        /*CALCULO % / PAX*/
        var linhas = $(table).find(".AlojDiasTable");
        var AlojNPax = $(table).find(".AlojNPax");
        $(linhas).each(function (index, obj) {
            var Percentagem = $(obj).find(".AlojTotaisPax");
            var AlojTotaisPaxN = $(obj).find(".AlojTotaisPaxN");
            var nquartos = $(obj).find(".AlojTableNumberIn");
            var somapax = 0;
            $(nquartos).each(function (i, o) {

                var capac = parseInt(o.className.split(" ")[1]);
                var inputnumero = parseInt(o.value);
                somapax += inputnumero * capac;
            });

            var result = parseFloat((somapax * 100) / capacidadeTotalPax);
            $(AlojTotaisPaxN).html(somapax.toString());
            $(Percentagem).html(result.toFixed(2).toString());
        })

    });


    RefreshTabelaresume();

    RefreshAlojTableDias();

}
function RefreshAlojTableDias() {
    //AlojamentoRecords
    $("#AlojamentoRecords").find("tr:gt(0)").remove();
    $("#AlojamentoVerRecords").find("tr:gt(0)").remove();
    var tableas = $(".AlojamentoHoteis").find(".AlojamentoOverview");


    $(tableas).each(function (i, o) {
        var fornecedorId = $(o).parent().find(".AlojamentoFornecedorID").val();
        var tipologias = $(o).find(".AlojTableType");
        var tipologiVal = $(".AlojNPax");

        var acordojson = $(o).parent().find(".hiddenAlojamentoAcordo").val();



        var acordo = "";
        if (acordojson === "") {
            return;
        }
        else {
            acordo = JSON.parse(acordojson);
        }
        var cambioAcordo = acordo.cambio;


        var margem = parseFloat(acordo.margem);


        var AlojCambioName = $("#AlojamentoMoedaCompra option:selected").text();
        var AlojCambioArr = $("#AlojamentoMoedaCompra option:selected").val();
        var cambioarray = AlojCambioArr.split('-');
        var AlojCambioidv = cambioarray[0];
        var AlojMoedaValor = parseFloat(cambioarray[1]);


        var NomeHotel = $(o).find(".alojName").html();;

        var Rows = $(o).find(".AlojDiasTable");
        var totais = $(o).find(".AlojTotais");

        var tdValor = "";
        if (cambioAcordo.name === "EUR") {
            tdValor = '<input type="number" class="smNumInput" value="' + parseInt(0) + '">' + '<input type="hidden" class="HiddenCambioValue" value="' + cambioAcordo.value + '">' + '/<span class="Currency">EUR</span>';
        }
        else {
            tdValor = '<input type="number" class="smNumInput" value="' + parseInt(0) + '">' + '<input type="hidden" class="HiddenCambioValue" value="' + cambioAcordo.value + '">' + '/<span class="CurrencyRed">' + cambioAcordo.name + '</span>' + '</br>' + (0 / cambioAcordo.value).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>';;

        }

        for (var i = 0; i < tipologias.length; i++) {
            var NomeTipo = tipologias[i].value;
            var cap = tipologiVal[i].value;
            var totalQuartos = totais[i].innerHTML;


            if (i == 0) {
                $("#AlojamentoRecords tr:last").after('<tr class="' + fornecedorId + " " + NomeTipo + '">' +
                '<td rowspan="' + tipologias.length + '">' + NomeHotel +
                    '<input type="hidden" class="HiddenRecordId" value="' + fornecedorId + "." + NomeTipo + '">' +
                    '<input type="hidden" class="HiddenRecordIdFornecedor" value="' + 0 + '">' +
                '<td>' + NomeTipo +
                    '<input type="hidden" class="HiddenRecordQuartoIdv" value="' + cap + '">' +
                '</td>' +
                '<td >' + totalQuartos + '</td>' +
                '<td>' + tdValor + '</td>' +
                '<td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + margem + '"></td>' +
                '<td>' + parseFloat(0) + '</td>' +
                '<td>' + parseFloat(0) + '</td>' +
                '<td>' + parseFloat(0) + '</td>' +
                '<td>' + parseFloat(0) + '</td>' +
                '<td>' + 0 + '</td>' +
                '</tr>');

                $("#AlojamentoVerRecords tr:last").after('<tr class="' + fornecedorId + " " + NomeTipo + '">' +
                    '<td rowspan="' + tipologias.length + '">' + NomeHotel +
                        '<input type="hidden" class="HiddenRecordId" value="' + fornecedorId + "." + NomeTipo + '">' +
                        '<input type="hidden" class="HiddenRecordIdFornecedor" value="' + 0 + '">' +
                    '<td>' + NomeTipo +
                        '<input type="hidden" class="HiddenRecordQuartoIdv" value="' + cap + '">' +
                    '</td>' +
                    '<td >' + totalQuartos + '</td>' +
                    '<td>' + tdValor + '</td>' +
                    '<td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + margem + '"></td>' +
                    '<td>' + parseFloat(0) + '</td>' +
                    '<td>' + parseFloat(0) + '</td>' +
                    '<td>' + parseFloat(0) + '</td>' +
                    '<td>' + parseFloat(0) + '</td>' +
                    '<td>' + 0 + '</td>' +
                    '</tr>');
            }
            else {
                $("#AlojamentoRecords tr:last").after('<tr class="' + fornecedorId + " " + NomeTipo + '">' +
                    '<td>' + NomeTipo +
                        '<input type="hidden" class="HiddenRecordId" value="' + fornecedorId + "." + NomeTipo + '">' +
                        '<input type="hidden" class="HiddenRecordQuartoIdv" value="' + cap + '">' +
                    '</td>' +
                    '<td>' + totalQuartos +
                    '</td>' +
                    '<td>' + tdValor + '</td>' +
                    '<td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + margem + '"></td>' +
                    '<td>' + parseFloat(0) + '</td>' +
                    '<td>' + parseFloat(0) + '</td>' +
                    '<td>' + parseFloat(0) + '</td>' +
                    '<td>' + parseFloat(0) + '</td>' +
                    '<td>' + 0 + '</td>' +
                    '</tr>');

                $("#AlojamentoVerRecords tr:last").after('<tr class="' + fornecedorId + " " + NomeTipo + '">' +
                    '<td>' + NomeTipo +
                        '<input type="hidden" class="HiddenRecordId" value="' + fornecedorId + "." + NomeTipo + '">' +
                        '<input type="hidden" class="HiddenRecordQuartoIdv" value="' + cap + '">' +
                    '</td>' +
                    '<td>' + totalQuartos + '</td>' +
                    '<td>' + tdValor + '</td>' +
                    '<td><input type="number"  class="smNumInput" min="0" step=0.01 value="' + margem + '"></td>' +
                    '<td>' + parseFloat(0) + '</td>' +
                    '<td>' + parseFloat(0) + '</td>' +
                    '<td>' + parseFloat(0) + '</td>' +
                    '<td>' + parseFloat(0) + '</td>' +
                    '<td>' + 0 + '</td>' +
                    '</tr>');
            }


        }



    });


    var todosAloj = $("#HiddenAlojamento").val();
    var aloj;
    if (todosAloj === "") {
        return;
    }
    else {
        aloj = JSON.parse(todosAloj);

        var trs = $("#AlojamentoRecords tr:gt(0)");
        $(aloj).each(function (i, aloj) {
            var rec = aloj.Records;
            $(rec).each(function (id, info) {

                var filter = this.classnameTr.replace(" ", ".");
                var tds = $("#AlojamentoRecords tr." + filter).children();
                var tds2 = $("#AlojamentoVerRecords tr." + filter).children();

                if (tds.length === 10) {

                    $(tds2[3]).find(".smNumInput").val(info.valor);
                    $(tds2[4]).find(".smNumInput").val(info.margem);

                    $(tds[3]).find(".smNumInput").val(info.valor);
                    $(tds[4]).find(".smNumInput").val(info.margem);

                }
                else {

                    $(tds2[2]).find(".smNumInput").val(info.valor);
                    $(tds2[3]).find(".smNumInput").val(info.margem);


                    $(tds[2]).find(".smNumInput").val(info.valor);
                    $(tds[3]).find(".smNumInput").val(info.margem);
                }

            });

        });
        
    }
    activator();

}
$('#tabs').on('change', '.AlojTableNumberIn', function () {
    RefreshAlojamento();
});



$('.AlojamentoHoteis').on('click', '.ApplyToTableColumn', function () {

    var table = $(this).parent().parent().parent().parent();

    var First_linha = $(table).find(".AlojDiasTable:first");
    var all_lines = $(table).find(".AlojDiasTable:not(:first)")
    var inputs = $(First_linha).find(".AlojTableNumberIn");

    $(inputs).each(function (i, inpu) {
        var val = parseInt($(inpu).val());
        var tipo = $(inpu).attr("class");
        tipo = "." + tipo.replace(" ", ".");
        $(all_lines).each(function (i2, lin) {
            var inputToChange = $(lin).find(tipo);
            $(inputToChange).val(val)
        });
    });

    RefreshAlojamento()

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
        url: 'api/Postman/insertFicheiro?id=' + projectID + '&orcamentoid=' + "" + '&tipo=1',
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
            });


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

            if (save === true) {

            }
            else if (save === false) {
                preencherTabelaAlojamento(returnedData);

            }


        }).fail(function (response) {
            console.log("error");
        });
}


function InsertProjectoInicial(objectToSend, orcamento) {
    if (objectToSend.projecto._id == "") {//Sem Projecto, ou seja é novo
        $.post('api/Postman/insertProjectoTT', objectToSend,
            function (returnedData) {

                orcamento.Orcamento.projectoidv = returnedData;
                projectID = returnedData;
                InsertOrcamentoInicial(orcamento);

            }).fail(function () {
                alert("Erro ao criar o projecto!");
            });
    }
    else {// com projecto, ou seja, guarda toda info
        $.post('api/Postman/UpdateProjectoTT', objectToSend,
            function (returnedData) {

                orcamento.Orcamento.projectoidv = objectToSend.projecto._id;
                InsertOrcamentoInicial(orcamento);

                

            }).fail(function () {
                alert("Erro ao criar o projecto!");
            });
    }
}

function InsertOrcamentoInicial(objectToSend) {

    $.post('api/Postman/insertOrcamento', objectToSend,
        function (returnedData) {

            
            OrcamentoID = returnedData;

            SaveAllRecords(OrcamentoID);
            var page = 'NewProject?ID=' + projectID;
            var page2 = page + "&IDorc=" + OrcamentoID;

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
            var page = 'NewProject.aspx?ID=' + projectID;
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

            if (save === true) {

            }
            else if (save === false) {
                preencherTabelaServicosTT(returnedData);
            }


            obj = null;
            objectToSend = null;
        }).fail(function () {
            console.log("error insertServico");
        });
}
function sendDiaria(objectToSend, save) {
    $.post('api/Postman/insertDiaria', objectToSend,
        function (returnedData) {


            if (save === true) {

            }
            else if (save === false) {
                preencherTabelaDiarias(returnedData);
            }
            obj = null;
            objectToSend = null;
        }).fail(function () {
            console.log("error");
        });
}
function sendVoo(objectToSend, save) {
    $.post('api/Postman/InsertVoos', objectToSend,
        function (returnedData) {


            if (save === true) {

            }
            else if (save === false) {
                preencherTabelaVoos(returnedData);
            }
            obj = null;
            objectToSend = null;
        }).fail(function () {
            console.log("error");
        });
}
function sendFornecedor(objectToSend, idTab) {

    var res;
    var sedem = JSON.stringify(objectToSend);
    $.post('api/Postman/insertFornecedor', objectToSend,
        function (id) {

            if (id != "") {
                $(".FornecedorCheck").css("display", "block");

                var nome = $("#FornecedorNome").val();
                var nomecomercial = $("#FornecedorNomeComercial").val();
                /*Esta Função inseres os valores na pagina*/
                FornecedorInsertInputs(id, nome, nomecomercial, idTab);

                setTimeout(function () {
                    $("#NovoFornecedorModel").toggle("slow");
                    /* limpar campos */
                    $(".FornecedorError").css("display", "none");
                    $(".FornecedorCheck").css("display", "none");
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
            else {
                $(".FornecedorError").css("display", "block");
            }


            res = null;
        }).fail(function () {
            console.log("erro insertFornecedor");
        });
}

function GetFornecedor(objectToSend, idTab) {


    var res;
    $.post('api/Postman/getFornecedor', { "fornecedoridv": objectToSend },
        function (returnedData) {
            res = returnedData;

            if (res.Id != null) {

                var FORNECEDORIDV = res.Id;

                $("#FornecedorPais option:selected").val(res.Country);
                var tipoc = res.tipocustoidv;
                $("#FornecedorNome").val(res.nome);
                $("#FornecedorCidade").val(res.cidade);
                $("#FornecedorNomeComercial").val(res.nomecomercial);
                $("#FornecedorMorada").val(res.morada);
                $("#FornecedorLocalidade").val(res.localidade);
                $("#FornecedorCodigoPostal").val(res.codigopostal);
                $("#FornecedorTelefone").val(res.telefone);
                $("#FornecedorFax").val(res.fax);
                $("#FornecedorTelemovel").val(res.telemovel);
                $("#FornecedorContacto").val(res.contacto);
                $("#FornecedorEmail").val(res.email);
                $("#FornecedorUrl").val(res.url);
                $("#FornecedorContribuinte").val(res.contribuinte);
                $("#FornecedorTipoFornecedor option:selected").text(res.TipoFornecedor);

                /*$(".FornecedorCheck").css("display","block");*/

                /* FornecedorInsertInputs(res, idTab);*/
                $('#NovoFornecedorModel').modal('show');
                $('.modal-backdrop').remove();

                /*var testeDiarias = $('.DiariaTables > tbody > tr').not(':first');*/
                /* limpar campos */
                $(".FornecedorError").css("display", "none");
                $(".FornecedorCheck").css("display", "none");

            }
            else {
                $(".FornecedorError").css("display", "block");
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
function preencherTabelaVoos(data) {


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

function preencherTabelaServicosTT(data) {



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

function preencherTabelaDiarias(data) {

    $(".DiariaTables").find("tr:gt(0)").remove();
    $("#DiariaVerRecords").find("tr:gt(0)").remove();

    $.post('api/Postman/getAllDiarias', data,
        function (returnedData) {

            preencherTabelaDiariasLoading(returnedData);
            obj = null;
        }).fail(function () {
            console.log("Erro ao fazer ao carregar os alojamentos!");
        });


}


function updateTotaisLabels() {
    var listTBs = $(".TotalCompra").parent().parent().parent();

    var total = 0;
    var totalVenda = 0;
    var totalLucro = 0
    $.each(listTBs, function (index, el) {
        var trs = $(listTBs[index]).children().children();

        for (var i = 1; i < trs.length; i++) {
            var t = $(trs[i]).children();
            var nomeTB = listTBs[index].id;
            if (nomeTB === "AlojamentoVerRecords") {
                if (t.length === 14) {
                    var test = parseFloat(t[7].innerHTML.replace(',', ''));
                    var totalVE = parseFloat(t[9].innerHTML.replace(',', ''));
                    var totaLuc = parseFloat(t[11].innerHTML.replace(',', ''));
                    total = total + test;
                    totalVenda = totalVenda + totalVE;
                    totalLucro = totalLucro + totaLuc;

                }
                else if (t.length === 13) {
                    var test = parseFloat(t[6].innerHTML.replace(',', ''));
                    var totaLuc = parseFloat(t[10].innerHTML.replace(',', ''));
                    var totalVE = parseFloat(t[8].innerHTML.replace(',', ''));
                    total = total + test;
                    totalVenda = totalVenda + totalVE;
                    totalLucro = totalLucro + totaLuc;

                }
            }
            if (nomeTB === "VoosVerRecords") {
                var totaLuc = parseFloat(t[10].innerHTML.replace(',', ''));
                var totalVE = parseFloat(t[8].innerHTML.replace(',', ''));
                var test = parseFloat(t[6].innerHTML.replace(',', ''));
                total = total + test;
                totalVenda = totalVenda + totalVE;
                totalLucro = totalLucro + totaLuc;

            }
            if (nomeTB === "DiariaVerRecords") {
                var totaLuc = parseFloat(t[10].innerHTML.replace(',', ''));
                var totalVE = parseFloat(t[8].innerHTML.replace(',', ''));
                var test = parseFloat(t[6].innerHTML.replace(',', ''));
                total = total + test;
                totalVenda = totalVenda + totalVE;
                totalLucro = totalLucro + totaLuc;

            }
            if (nomeTB === "ServicosVerRecords") {
                var totaLuc = parseFloat(t[10].innerHTML.replace(',', ''));
                var totalVE = parseFloat(t[8].innerHTML.replace(',', ''));
                var test = parseFloat(t[6].innerHTML.replace(',', ''));
                total = total + test;
                totalVenda = totalVenda + totalVE;
                totalLucro = totalLucro + totaLuc;


            }
        }
    });

    $("#TotalGasto").text("Total a gastar: " + total.formatMoney(2, '.', ','));
    $("#TotalVenda").text("Total a receber: " + totalVenda.formatMoney(2, '.', ','));
    $("#totalLucro").text("Total de Lucro: " + totalLucro.formatMoney(2, '.', ','));


}

function updateValues(FiredTable) {

    var tableName = "#" + FiredTable.attr("id");
    var trs = $(tableName).children().children();

    if (tableName === "#AlojamentoRecords" || tableName === "#AlojamentoVerRecords") {
        for (var x = 1; x < trs.length; x++) {
            var capc;
            var tds = $(trs[x]).children();
            if (tds.length === 10) {

                capc = parseInt($(tds[1]).find(".HiddenRecordQuartoIdv").val());
                var unitCost = parseFloat($(tds[3]).find(".smNumInput").val());
                var td3text = tds[3].innerText.split('/')[1];

                var SeraEuros = td3text.indexOf("\n");


                var unitNights = parseInt(tds[2].innerHTML, 10);
                var margem = parseInt($(tds[4]).find("input").val(), 10);

                var TotalLucro = parseInt(tds[8].innerHTML, 10);
                var TotalLucroPax = parseInt(tds[9].innerHTML, 10);
                //var unitCost = tds[3].innerHTML;

                if (SeraEuros === -1) {// Nao encontra ou seja é Euros

                    /*Total*/
                    $(tds[5]).html((unitCost * unitNights).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                    //$(tds[7]).html(((unitCost * unitNights) * units).formatMoney(2, '.', ','));
                    /*TotalPAX*/
                    $(tds[6]).html(((unitCost * unitNights) / (capc * unitNights)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                    /*TotalVenda*/
                    $(tds[7]).html(((((unitCost * unitNights) / capc) / 100) * margem + (unitCost * unitNights) / capc).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                    //$(tds[7]).html((((unitCost *  unitNights) / 100) * margem + ( unitNights)).formatMoney(2, '.', ','));
                    /*TotalVendaPAX*/
                    $(tds[8]).html((((((unitCost * unitNights) / capc) / 100) * margem + (unitCost * unitNights) / capc) / (capc * unitNights)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                    // $(tds[8]).html(((((unitCost * unitNights) / capc) / 100) * margem + (unitCost * unitNights) / capc).formatMoney(2, '.', ','));

                    /*TotalLucro*/
                    $(tds[9]).html(((((unitCost * unitNights) / 100) * margem + (unitCost * unitNights)) - (unitCost * unitNights)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');

                    //var unitCost = tds[3].innerHTML.spli('/')[1];
                }
                else {// Se nao encontra é porque != Euros
                    var t = unitCost;
                    var MoedaCompra = td3text.split("\n")[0];
                    var VEuro = parseFloat($(tds[3]).find(".HiddenCambioValue").val());
                    var Vcompra = (unitCost / VEuro).formatMoney(2, '.', ',');
                    var innerHtmNotChange = tds[3].innerHTML.split("<br>")[0];
                    var innerHtm = tds[3].innerHTML.split("<br>")[1];
                    var auxinput = '<input type="number" class="smNumInput" value="' + unitCost + '">';
                    var hiddenaux = '<input type="hidden" class="HiddenCambioValue" value="' + VEuro + '">';

                    var valortoupdate = innerHtm.split("/")[0];
                    $(tds[3]).html(
                        auxinput + hiddenaux + '/<span class="CurrencyRed">' + MoedaCompra + '</span>' + '</br>' +
                        Vcompra + '/<span class="Currency">EUR</span>'
                    );



                    /*Total*/
                    $(tds[5]).html(
                        ((unitCost * unitNights)).formatMoney(2, '.', ',') + '/<span class="CurrencyRed">' + MoedaCompra + '</span>' + '</br>' +
                        ((Vcompra * unitNights)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>'
                    );
                    /*TotalPAX*/
                    $(tds[6]).html(
                        ((unitCost * unitNights) / (capc * unitNights)).formatMoney(2, '.', ',') + '/<span class="CurrencyRed">' + MoedaCompra + '</span>' + '</br>' +
                        ((Vcompra * unitNights) / (capc * unitNights)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>'
                    );
                    /*TotalVenda*/
                    $(tds[7]).html((((Vcompra * unitNights) / 100) * margem + (Vcompra * unitNights)).formatMoney(2, '.', ',') + '<span class="Currency">/EUR</span>');
                    /*TotalVendaPAX*/
                    $(tds[8]).html(((((Vcompra * unitNights) / 100) * margem + (Vcompra * unitNights)) / (capc * unitNights)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                    /*TotalLucro*/
                    $(tds[9]).html(((((Vcompra * unitNights) / 100) * margem + (Vcompra * unitNights)) - (Vcompra * unitNights)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');

                }

            }
            else {

                capc = parseInt($(tds[0]).find(".HiddenRecordQuartoIdv").val());
                var unitCost = parseFloat($(tds[2]).find(".smNumInput").val());
                var SeraEuros;
                var td3text = tds[2].innerText;
                td3text = tds[2].innerText.split('/')[1];

                if (td3text.indexOf("\n") === -1) {
                    //td3text = tds[2].innerText.split('/')[1];
                    //SeraEuros = td3text.indexOf("\n");
                    SeraEuros = -1;
                }
                else {
                    SeraEuros = td3text.indexOf("\n");
                }



                var unitNights = parseInt(tds[1].innerHTML, 10);
                var margem = parseInt($(tds[3]).find("input").val(), 10);


                //var TotalLucro = parseInt(tds[8].innerHTML, 10);
                //var TotalLucroPax = parseInt(tds[9].innerHTML, 10);
                //var unitCost = tds[3].innerHTML;

                if (SeraEuros === -1) {// Nao encontra ou seja é Euros

                    /*Total*/
                    $(tds[4]).html((unitCost * unitNights).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');

                    /*TotalPAX*/
                    $(tds[5]).html(((unitCost * unitNights) / (capc * unitNights)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                    /*TotalVenda*/
                    $(tds[6]).html(((((unitCost * unitNights)) / 100) * margem + (unitCost * unitNights)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                    /*TotalVendaPAX*/
                    $(tds[7]).html((((((unitCost * unitNights) / (capc * unitNights)) / 100) * margem) + ((unitCost * unitNights) / (capc * unitNights))).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');

                    /*TotalLucro*/
                    $(tds[8]).html(((((unitCost * unitNights) / 100) * margem + (unitCost * unitNights)) - (unitCost * unitNights)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');

                    //var unitCost = tds[3].innerHTML.spli('/')[1];
                }
                else {// Se nao encontra é porque != Euros

                    var t = unitCost;

                    var MoedaCompra = td3text.split("\n")[0];


                    var VEuro = parseFloat($(tds[2]).find(".HiddenCambioValue").val());
                    var Vcompra = (unitCost / VEuro).formatMoney(2, '.', ',');
                    var innerHtmNotChange = tds[2].innerHTML.split("<br>")[0];
                    var innerHtm = tds[2].innerHTML.split("<br>")[1];
                    var auxinput = '<input type="number" class="smNumInput" value="' + unitCost + '">';
                    var hiddenaux = '<input type="hidden" class="HiddenCambioValue" value="' + VEuro + '">';


                    var valortoupdate = innerHtm.split("/")[0];
                    $(tds[2]).html(
                        auxinput + hiddenaux + '/<span class="CurrencyRed">' + MoedaCompra + '</span>' + '</br>' +
                        Vcompra + '/<span class="Currency">EUR</span>'
                    );

                    /*Total*/
                    $(tds[4]).html(
                        ((unitCost * unitNights)).formatMoney(2, '.', ',') + '/<span class="CurrencyRed">' + MoedaCompra + '</span>' + '</br>' +
                        ((Vcompra * unitNights)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>'
                    );
                    /*TotalPAX*/
                    $(tds[5]).html(
                        ((unitCost * unitNights) / (capc * unitNights)).formatMoney(2, '.', ',') + '/<span class="CurrencyRed">' + MoedaCompra + '</span>' + '</br>' +
                        ((Vcompra * unitNights) / (capc * unitNights)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>'
                    );
                    /*TotalVenda*/
                    $(tds[6]).html((((Vcompra * unitNights) / 100) * margem + (Vcompra * unitNights)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                    /*TotalVendaPAX*/
                    $(tds[7]).html(((((Vcompra * unitNights) / 100) * margem + (Vcompra * unitNights)) / (capc * unitNights)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                    /*TotalLucro*/
                    $(tds[8]).html(((((Vcompra * unitNights) / 100) * margem + (Vcompra * unitNights)) - (Vcompra * unitNights)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');

                }
            }




        }
    }
    if (tableName === "#VoosRecords" || tableName === "#VoosVerRecords") {
        for (var x = 1; x < trs.length; x++) {
            var tds = $(trs[x]).children();

            var capc = parseInt(tds[1].innerHTML, 10);

            var unitNights = parseInt(tds[3].innerHTML, 10);
            var units = parseInt($(tds[4]).find("input").val(), 10);



            var margem = parseFloat($(tds[5]).find("input").val());

            var TotalLucro = parseInt(tds[8].innerHTML, 10);
            var TotalLucroPax = parseInt(tds[9].innerHTML, 10);
            var unitCost = tds[2].innerHTML;
            var MoedaCompra = $(tds[2]).find(".CurrencyRed").text();

            if (unitCost.indexOf("<br>") >= 0) {
                var t = unitCost.split('<br>');
                

                var Vcompra = parseFloat(t[0]);
                var VEuro = parseFloat(t[1]);

                /*Total GASTO*/
                $(tds[6]).html(
                    (Vcompra * units).formatMoney(2, '.', ',') + '/<span class="CurrencyRed">' + MoedaCompra + '</span>' + '</br>' +
                    (VEuro * units).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>'
                );
                /*Total GASTO PAX*/
                $(tds[7]).html(
                    (Vcompra).formatMoney(2, '.', ',') + '/<span class="CurrencyRed">' + MoedaCompra + '</span>' + '</br>' +
                    (VEuro).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>'
                );
                /*TotalVenda*/
                $(tds[8]).html((((VEuro * units) / 100) * margem + (VEuro * units)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                /*TotalVendaPAX*/
                $(tds[9]).html((((VEuro / 100) * margem) + VEuro).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                /*TotalLucro*/
                $(tds[10]).html((((VEuro * units) / 100) * margem + (VEuro * units) - (VEuro * units)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');

            }
            else {
                unitCost = parseFloat(tds[2].innerHTML);

                /*Total*/
                $(tds[6]).html((unitCost * units).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                /*TotalPAX*/
                $(tds[7]).html((unitCost).formatMoney(2, '.', ','));
                /*TotalVenda*/
                $(tds[8]).html((((unitCost * units) / 100) * margem + (unitCost * units)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                /*TotalVendaPAX*/
                $(tds[9]).html((((unitCost) / 100) * margem + unitCost).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                /*TotalLucro*/
                $(tds[10]).html((((unitCost * units) / 100) * margem + (unitCost * units) - (unitCost * units)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');


            }

        }
    }
    if (tableName.indexOf("#DiariasRecords") >= 0 || tableName === "#DiariaVerRecords") {
        for (var x = 1; x < trs.length; x++) {
            var tds = $(trs[x]).children();

            var unitNights = parseInt(tds[3].innerHTML, 10);
            var units = parseInt($(tds[4]).find("input").val(), 10);


            var qnt = parseInt(tds[3].innerHTML, 10);
            var margem = parseFloat($(tds[5]).find("input").val());

            var TotalLucro = parseInt(tds[8].innerHTML, 10);
            var TotalLucroPax = parseInt(tds[9].innerHTML, 10);
            var unitCost = tds[2].innerHTML;

            var MoedaCompra = $(tds[2]).find(".CurrencyRed").text();
            if (unitCost.indexOf("<br>") >= 0) {
                var t = unitCost.split('<br>');
                //var MoedaCompra = t[0].split('/');

                var Vcompra = parseFloat(t[0]);
                var VEuro = parseFloat(t[1]);

                /*Total GASTO*/
                $(tds[6]).html(
                    (Vcompra * units).formatMoney(2, '.', ',') + '/<span class="CurrencyRed">' + MoedaCompra + '</span>' + '</br>' +
                    (VEuro * units).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>'
                );
                /*Total GASTO PAX*/
                $(tds[7]).html(
                    (Vcompra / qnt).formatMoney(2, '.', ',') + '/<span class="CurrencyRed">' + MoedaCompra + '</span>' + '</br>' +
                    (VEuro / qnt).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>'
                );
                /*TotalVenda*/
                $(tds[8]).html((((VEuro * units) / 100) * margem + (VEuro * units)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                /*TotalVendaPAX*/
                $(tds[9]).html(((((VEuro / qnt) / 100) * margem) + VEuro).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                /*TotalLucro*/
                $(tds[10]).html((((VEuro * units) / 100) * margem + (VEuro * units) - (VEuro * units)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');

            }
            else {
                unitCost = parseFloat(tds[2].innerHTML);

                /*Total*/
                $(tds[6]).html((unitCost * units).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                /*TotalPAX*/
                $(tds[7]).html((unitCost / qnt).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                /*TotalVenda*/
                $(tds[8]).html((((unitCost * units) / 100) * margem + (unitCost * units)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                /*TotalVendaPAX*/
                $(tds[9]).html(((((unitCost * units) / 100) * margem + (unitCost * units)) / qnt).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                /*TotalLucro*/
                $(tds[10]).html((((unitCost * units) / 100) * margem + (unitCost * units) - (unitCost * units)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');


            }

        }
    }
    if (tableName === "#ServicosRecords" || tableName === "#ServicosVerRecords") {
        for (var x = 1; x < trs.length; x++) {
            var tds = $(trs[x]).children();

            var capc = parseInt(tds[1].innerHTML, 10);

            var unitNights = parseInt(tds[3].innerHTML, 10);
            var units = parseInt($(tds[4]).find("input").val(), 10);



            var margem = parseFloat($(tds[5]).find("input").val());

            var TotalLucro = parseInt(tds[8].innerHTML, 10);
            var TotalLucroPax = parseInt(tds[9].innerHTML, 10);
            var unitCost = tds[2].innerHTML;
            var MoedaCompra = $(tds[2]).find(".CurrencyRed").text();

            if (unitCost.indexOf("<br>") >= 0) {
                var t = unitCost.split('<br>');
                

                var Vcompra = parseFloat(t[0]);
                var VEuro = parseFloat(t[1]);

                /*Total GASTO*/
                $(tds[6]).html(
                    (Vcompra * units).formatMoney(2, '.', ',') + '/<span class="CurrencyRed">' + MoedaCompra + '</span>' + '</br>' +
                    (VEuro * units).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>'
                );
                /*Total GASTO PAX*/
                $(tds[7]).html(
                    (Vcompra).formatMoney(2, '.', ',') + '/<span class="CurrencyRed">' + MoedaCompra + '</span>' + '</br>' +
                    (VEuro).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>'
                );
                /*TotalVenda*/
                $(tds[8]).html((((VEuro * units) / 100) * margem + (VEuro * units)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                /*TotalVendaPAX*/
                $(tds[9]).html((((VEuro / 100) * margem) + VEuro).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                /*TotalLucro*/
                $(tds[10]).html((((VEuro * units) / 100) * margem + (VEuro * units) - (VEuro * units)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');

            }
            else {
                unitCost = parseFloat(tds[2].innerHTML);

                /*Total*/
                $(tds[6]).html((unitCost * units).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                /*TotalPAX*/
                $(tds[7]).html((unitCost).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                /*TotalVenda*/
                $(tds[8]).html((((unitCost * units) / 100) * margem + (unitCost * units)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                /*TotalVendaPAX*/
                $(tds[9]).html((((unitCost) / 100) * margem + unitCost).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');
                /*TotalLucro*/
                $(tds[10]).html((((unitCost * units) / 100) * margem + (unitCost * units) - (unitCost * units)).formatMoney(2, '.', ',') + '/<span class="Currency">EUR</span>');


            }

        }
    }
    if (tableName === "#FornecedoresRecords") {
        var TotalAcumulado = 0;
        for (var x = trs.length; x >= 1; x--) {

            var len = $(trs[x]).children().length;
            var tds = $(trs[x]).children();

            if (len === 5) {
                var teste = tds[3].innerHTML.replace(',', '');
                teste = teste.split('.')[0];
                var ttl = parseFloat(teste);
                TotalAcumulado = TotalAcumulado + ttl;
                $(tds[4]).html(TotalAcumulado.formatMoney(2, '.', ','));
                TotalAcumulado = 0;
            }
            if (len === 3) {
                var teste = tds[2].innerHTML.replace(',', '');
                teste = teste.split('.')[0];
                var ttl = parseFloat(teste);
                TotalAcumulado = TotalAcumulado + ttl;
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
                //var comissao = $(inputs[2]).val();
                $(inputsToUpdate[0]).val(unidades);
                $(inputsToUpdate[1]).val(margem);
                //$(inputsToUpdate[2]).val(comissao);
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
                //var comissao = $(inputs[2]).val();
                $(inputsToUpdate[0]).val(unidades);
                $(inputsToUpdate[1]).val(margem);
                //$(inputsToUpdate[2]).val(comissao);
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

    var ServicosCambioName = $("#ServicosMoeda option:selected").text();
    var ServicosCambioArr = $("#ServicosMoeda option:selected").val();
    var cambioarray = ServicosCambioArr.split('-');
    var ServicosCambioidv = cambioarray[0];
    var ServicosCambioValor = parseFloat(cambioarray[1]);
    var ServicosFornecedor = $("#ServicosFornecedor").val();
    var ServicosFornecedorID = $("#ServicosFornecedorID").val();
    var ServicosTipoServicoID = $("#ServicosTipoServico option:selected").val();
    var ServicosTipoServico = $("#ServicosTipoServico option:selected").text();
    var ServicosValor = parseFloat($("#ServicosValor").val());
    var ServicosNet = parseFloat($("#ServicosNet").val());
    var ServicosComisao = parseFloat($("#ServicosComisao").val());
    var ServicosMargem = parseFloat($("#ServicosMargem").val());
    var ServicosMarkup = parseFloat($("#ServicosMarkup").val());
    var ServicoIvaName = $("#ServicosIva option:selected").text();
    var ServicosIva = parseFloat($("#ServicosIva option:selected").val());
    var ServicosObservacoes = $("#ServicosObservacoes").val();
    var ServicosQuantidade = parseInt($("#ServicosQuantidade").val());




    data = {
        "_id": "",
        "orcamentoidv": OrcamentoID,
        "fornecedoridv": ServicosFornecedorID,
        "fornecedornome": ServicosFornecedor,
        "ivaidv": { "_id": ServicosIva, "name": ServicoIvaName },
        "tipocustoidv": { "_id": "6", "name": "ServiçosTT" },
        "cambioidv": { "_id": ServicosCambioidv, "name": ServicosCambioName, "value": ServicosCambioValor },
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
        "s_numeropessoas": 0,
        "s_valortotalpvp": 0,
        "s_valorporpessoapvp": 0,
        "s_observacoes": ServicosObservacoes
    }
    sendServicoTT(data, false);

});


$("#AddDiaria").click(function () {

    var DiariaAuxDia = parseInt($("#DiariaAuxDia").val());


    var DiariasCambioName = $("#DiariaMoeda option:selected").text();
    var DiariasCambioArr = $("#DiariaMoeda option:selected").val();
    var cambioarray = DiariasCambioArr.split('-');
    var DiariaCambioidv = cambioarray[0];
    var DiariaCambioValor = parseFloat(cambioarray[1]);

    var DiariaFornecedorID = $("#DiariaFornecedorID").val();
    var DiariaFornecedor = $("#DiariaFornecedor").val();
    var DiariaComisao = parseFloat($("#DiariaComisao").val());
    var DiariaValor = parseFloat($("#DiariaValor").val());
    var DiariaIvaName = $("#DiariaIva option:selected").text();
    var DiariaIva = parseFloat($("#DiariaIva option:selected").val());
    var DiariaMarkup = parseFloat($("#DiariaMarkup").val());

    var DiariaNomeServico = $("#DiariaNomeServico").val();
    var DiariaMargem = parseFloat($("#DiariaMargem").val());
    var DiariaNet = parseFloat($("#DiariaNet").val());
    var DiariaObservaçoes = $("#DiariaObservaçoes").val();



    var DiariaQuantidade = parseInt($("#DiariaQuantidade").val());



    /* este campo sera usado para identificar para que dia se trata este item diario, ou seja, data do orcamento + DiariaAuxDia - 1 para poder incrementar */
    var DiariaData = ConvertDateForSend($("#DataDeexecucao").val());



    data = {
        "diariaidv": "",
        "orcamentoidv": OrcamentoID,
        "fornecedoridv": DiariaFornecedorID,
        "fornecedorname": DiariaFornecedor,
        "ivaidv": { "_id": DiariaIva, "name": DiariaIvaName },
        "tipocustoidv": { "_id": "", "name": "Diarias" },
        "cambioidv": { "_id": DiariaCambioidv, "name": DiariasCambioName, "value": DiariaCambioValor },
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
        "d_numeropessoas": 0,
        "d_valortotalpvp": 0,
        "d_valorporpessoapvp": 0,
        "d_observacoes": DiariaObservaçoes,
        "DiariaAuxDia": DiariaAuxDia
    }


    sendDiaria(data, false);


});




$("#AddVoo").click(function () {

    var VoosFornecedorID = $("#VoosFornecedorID").val();
    var VoosFornecedor = $("#VoosFornecedor").val();

    var VoosCambioName = $("#VoosMoedaCompra option:selected").text();
    var VoosCambioArr = $("#VoosMoedaCompra option:selected").val();
    var cambioarray = VoosCambioArr.split('-');
    var VoosCambioidv = cambioarray[0];
    var VoosMoedaValor = parseFloat(cambioarray[1]);
    var VoosIvaName = parseInt($("#VoosIva option:selected").text());
    var VoosIva = parseInt($("#VoosIva option:selected").val());
    var VoosTipoIvaName = $("#VoosTipoIva option:selected").text();
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
    var VoosMarkup = parseFloat($("#VoosMarkup").val());


    var estadoidv = $("#OrcamentoEstado option:selected").val();
    var estadonome = $("#OrcamentoEstado option:selected").text();


    var data = {
        "_id": "",
        "orcamentoidv": OrcamentoID,
        "fornecedoridv": VoosFornecedorID,
        "VoosFornecedor": VoosFornecedor,
        "cambioidv": { "_id": VoosCambioidv, "name": VoosCambioName, "value": VoosMoedaValor },
        "ivaidv": { "_id": VoosIva, "name": VoosCambioName },
        "tipocustoidv": { "_id": VoosTipoIva, "name": VoosTipoIvaName },
        "v_partida": VoosPartida,
        "v_destino": VoosDestino,
        "v_nomevoo": VoosNomeVoo,
        "v_preco": VoosValor,
        "v_comissao": VoosCommisao,
        "v_net": VoosNet,
        "v_valorcambio": VoosMoedaValor,
        "v_valoreuros": 0,
        "v_margemvenda": VoosMargemVenda,
        "v_markup": VoosMarkup,
        "v_taxaA": VoosTaxaA,
        "v_taxaB": VoosTaxaB,
        "v_numeropessoas": 0,
        "v_disponibilidade": 1,
        "v_valortotalpvp": 0,
        "v_valorporpessoapvp": VoosValor
    };



    sendVoo(data, false);

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
        "_id": "",
        "TipoFornecedor": FornecedorTipoFornecedor,
        "Country": FornecedorPais,
        "cidade": FornecedorCidade,
        "tipocusto": FornecedorTipoServico,
        "nome": FornecedorNome,
        "nomecomercial": FornecedorNomeComercial,
        "morada": FornecedorMorada,
        "localidade": FornecedorLocalidade,
        "codigopostal": FornecedorCodigoPostal,
        "telefone": FornecedorTelemovel,
        "fax": FornecedorFax,
        "telemovel": FornecedorTelemovel,
        "contacto": FornecedorContacto,
        "email": FornecedorEmail,
        "url": FornecedorUrl,
        "contribuinte": FornecedorContribuinte
    };
    sendFornecedor(data, FornecedorLocalOrigem);


});




function DeleteRecs(table, id, Tr) {

    if (table === "AlojamentoRecords" || table === "AlojamentoVerRecords") {
        $.post('api/Postman/DeleteAlojamento', { "alojamentoidv": id },
            function (returnedData) {

                var respo = returnedData;
                if (respo === "ok") {
                    Tr.remove();
                }
                obj = null;
            }).fail(function () {
                console.log("error");
            });
    }
    if (table === "VoosRecords" || table === "VoosVerRecords") {
        $.post('api/Postman/DeleteVoos', { "vooidv": id },
            function (returnedData) {

                var respo = returnedData;
                if (respo === "ok") {
                    Tr.remove();
                }
                obj = null;
            }).fail(function () {
                console.log("error");
            });
    }
    if (table.indexOf("DiariasRecords") >= 0 || table === "DiariaVerRecords") {
        $.post('api/Postman/DeleteDiaria', { "diariaidv": id },
            function (returnedData) {

                var respo = returnedData;
                if (respo === "ok") {
                    Tr.remove();
                }
                obj = null;
            }).fail(function () {
                console.log("error");
            });
    }
    if (table === "ServicosRecords" || table === "ServicosVerRecords") {
        $.post('api/Postman/DeleteServico', { "servicoidv": id },
            function (returnedData) {

                var respo = returnedData;
                if (respo === "ok") {
                    Tr.remove();
                }
                obj = null;
            }).fail(function () {
                console.log("error");
            });
    }
}

function showpopUp(Tr) {

    var Observacoes = $(Tr[0]).find(".HiddenRecordObs").val();
    var idv = $(Tr[0]).find(".HiddenRecordId").val();
    var tablename = $(Tr).closest('table').attr('id');



    $('#InfoBlock').modal('show');

    $('#textMsg').html(Observacoes);


}

function SaveRecs(table, id, Tr) {





    if (table === "AlojamentoRecords" || table === "AlojamentoVerRecords") {
        var len = $(Tr[0]).children().length;

        if (len === 14) {
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
            var margem = parseFloat($(Tr[0].children[5]).find(".smNumInput").val());
            var commisao = parseFloat($(Tr[0].children[6]).find(".smNumInput").val());
            var totalCusto = parseFloat($(Tr[0].children[7]).text().replace(',', ''));
            var totalCustoPax = parseFloat($(Tr[0].children[8]).text().replace(',', ''));
            var TotalVenda = parseFloat($(Tr[0].children[9]).text().replace(',', ''));
            var TotalPax = parseFloat($(Tr[0].children[10]).text().replace(',', ''));
            var Observacoes = $(Tr[0].children[12]).text().replace(',', '');
            var ht = $(Tr[0].children[2]).html();
            var valorEur;
            var valorExterno;
            if (ht.indexOf("</br>") < 0) {
                valorEur = parseFloat($(Tr[0].children[2]).text().replace(',', ''));
                valorExterno = valorEur;
            }
            else {
                var strs = ht.split("</br>");
                valorEur = parseFloat($(strs[1]).text().replace(',', ''));
                valorExterno = parseFloat($(strs[0]).text().replace(',', ''));
            }
        }
        else {
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
            var margem = parseFloat($(Tr[0].children[4]).find(".smNumInput").val());
            var commisao = parseFloat($(Tr[0].children[5]).find(".smNumInput").val());
            var totalCusto = parseFloat($(Tr[0].children[6]).text().replace(',', ''));
            var totalCustoPax = parseFloat($(Tr[0].children[7]).text().replace(',', ''));
            var TotalVenda = parseFloat($(Tr[0].children[8]).text().replace(',', ''));
            var TotalPax = parseFloat($(Tr[0].children[9]).text().replace(',', ''));
            var Observacoes = $(Tr[0].children[11]).text().replace(',', '');
            var ht = $(Tr[0].children[1]).html();
            var valorEur;
            var valorExterno;
            if (ht.indexOf("</br>") < 0) {
                valorEur = parseFloat($(Tr[0].children[1]).text().replace(',', ''));
                valorExterno = valorEur;
            }
            else {
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
            "ivaidv": Ivaidv,
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

    if (table === "VoosRecords" || table === "VoosVerRecords") {

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
        var commisao = parseFloat($(Tr[0]).find(".HiddenRecordCOMISSAO").val());




        var nomevooarr = NomeVoo.split("<br>");
        var Nnoites = parseInt($(Tr[0].children[3]).text());
        var Unidades = parseInt($(Tr[0].children[4]).find(".smNumInput").val());
        var NomeDirecao = $(Tr[0].children[1]).text();
        var nomeArr = NomeDirecao.split("-");
        var partida = nomeArr[0];
        var destino = nomeArr[1];
        var margem = parseFloat($(Tr[0].children[5]).find(".smNumInput").val());
        var totalCusto = parseFloat($(Tr[0].children[6]).text().replace(',', ''));
        var totalCustoPax = parseFloat($(Tr[0].children[7]).text().replace(',', ''));
        var TotalVenda = parseFloat($(Tr[0].children[8]).text().replace(',', ''));
        var TotalPax = parseFloat($(Tr[0].children[9]).text().replace(',', ''));
        var Lucro = parseFloat($(Tr[0].children[10]).text().replace(',', ''));
        var ht = $(Tr[0].children[2]).html();
        var valorEur;
        var valorExterno;
        if (ht.indexOf("</br>") < 0) {
            valorEur = parseFloat($(Tr[0].children[2]).text().replace(',', ''));
            valorExterno = valorEur;
        }
        else {
            var strs = ht.split("</br>");
            valorEur = parseFloat($(strs[1]).text().replace(',', ''));
            valorExterno = parseFloat($(strs[0]).text().replace(',', ''));
        }



        var vooRec = {
            "vooidv": idv,
            "orcamentoidv": OrcamentoID,
            "fornecedoridv": fornecedoridv,
            "cambioidv": cambioidv,
            "ivaidv": Ivaidv,
            "tipocustoidv": tipocustoidv,
            "v_partida": partida,
            "v_destino": destino,
            "v_nomevoo": NomeVoo,
            "v_preco": valorExterno,
            "v_comissao": commisao,
            "v_net": net,
            "v_valorcambio": valorCambio,
            "v_valoreuros": TotalVenda,
            "v_margemvenda": margem,
            "v_markup": Markup,
            "v_taxaA": TAXAA,
            "v_taxaB": TAXAB,
            "v_numeropessoas": Unidades,
            "v_disponibilidade": DISPONIBILIDADE,
            "v_valortotalpvp": totalCusto,
            "v_valorporpessoapvp": totalCustoPax,
            "v_pagamento": APagameto,
            "v_datapagamento": ADataPagameto
        }

        sendVoo(vooRec, true);

    }

    if (table.indexOf("DiariasRecords") >= 0 || table === "DiariaVerRecords") {

        var DiariaIdv = $(Tr[0]).find(".HiddenRecordId").val();
        var DiariaCambioidv = $(Tr[0]).find(".HiddenRecordCambioIdv").val();
        var DiariaFornecedorID = $(Tr[0]).find(".HiddenRecordIdFornecedor").val();
        var ServicosTipoServicoID = $(Tr[0]).find(".HiddenRecordtipoServicoIdv").val();
        var DiariaComisao = parseFloat($(Tr[0]).find(".HiddenRecordDiariaComisao").val());
        var DiariaCambioValor = parseFloat($(Tr[0]).find(".HiddenRecordCambioValor").val());
        var DiariaMarkup = parseFloat($(Tr[0]).find(".HiddenRecordMarkup").val());
        var DiariaNet = $(Tr[0]).find(".HiddenRecordNet").val();
        var DiariaIva = parseFloat($(Tr[0]).find(".HiddenRecordIvaIdv").val());
        var DiariaData = ConvertDateForSend($(Tr[0]).find(".HiddenRecordADATA").val());

        var Str = $(Tr[0]).text();

        var ht = $(Tr[0].children[2]).html();
        var valorEur;
        var valorExterno;
        if (ht.indexOf("</br>") < 0) {
            valorEur = parseFloat($(Tr[0].children[2]).text().replace(',', ''));
            valorExterno = valorEur;
        }
        else {
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
        var totalCustoPax = parseFloat($(Tr[0].children[7]).text().replace(',', ''));
        var TotalVenda = parseFloat($(Tr[0].children[8]).text().replace(',', ''));


        var Unidades = parseInt($(Tr[0].children[4]).find(".smNumInput").val());



        dataDiaria = {
            "diariaidv": DiariaIdv,
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
            "d_numeropessoas": Unidades,
            "d_valortotalpvp": totalCusto,
            "d_valorporpessoapvp": totalCustoPax,
            "d_observacoes": DiariaObservaçoes,
        }

        sendDiaria(dataDiaria, true);

    }

    if (table === "ServicosRecords" || table === "ServicosVerRecords") {

        var ServicoIDv = $(Tr[0]).find(".HiddenRecordId").val();
        var ServicosCambioidv = $(Tr[0]).find(".HiddenRecordCambioIdv").val();
        var ServicosFornecedorID = $(Tr[0]).find(".HiddenRecordIdFornecedor").val();
        var ServicosTipoServicoID = $(Tr[0]).find(".HiddenRecordtipoServicoIdv").val();
        var ServicosComisao = parseFloat($(Tr[0]).find(".HiddenRecordServicosComisao").val());
        var CambioValor = parseFloat($(Tr[0]).find(".HiddenRecordCambioValor").val());
        var ServicosMarkup = parseFloat($(Tr[0]).find(".HiddenRecordMarkup").val());
        var ServicosNet = $(Tr[0]).find(".HiddenRecordNet").val();
        var ServicosIva = parseFloat($(Tr[0]).find(".HiddenRecordIvaIdv").val());


        var ht = $(Tr[0].children[2]).html();
        var valorEur;
        var valorExterno;
        if (ht.indexOf("</br>") < 0) {
            valorEur = parseFloat($(Tr[0].children[2]).text().replace(',', ''));
            valorExterno = valorEur;
        }
        else {
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
        var totalCustoPax = parseFloat($(Tr[0].children[7]).text().replace(',', ''));
        var TotalVenda = parseFloat($(Tr[0].children[8]).text().replace(',', ''));


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
            "s_numeropessoas": Unidades,
            "s_valortotalpvp": totalCusto,
            "s_valorporpessoapvp": totalCustoPax,
            "s_observacoes": ServicosObservacoes
        }
        sendServicoTT(dataServicos, true);

    }

}

function activator() {
    var tables = $("table");

    for (x = 0 ; x < tables.length; ++x) {
        var nome = tables[x].id;
        if (nome != "ListaOrcamentos") {
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
        if (parms.length === 2) {
            var pos2 = parms[1].indexOf('=');
            IdOrc = parms[1].substring(pos2 + 1);
            $("#accordion").accordion({ active: 1 });
        }
        else {
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

        SaveRecs(table, recID, Tr);
    });

    $('body').on('click', '.rmvRecord', function () {
        var table = $(this).parent().parent().parent().parent().attr("id");
        var recID = $(this).parent().parent().find(".HiddenRecordId").val();
        var Tr = $(this).parent().parent();

        DeleteRecs(table, recID, Tr);



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

        var AlojCambioName = $("#AlojamentoMoedaCompra option:selected").text();
        var AlojCambioArr = $("#AlojamentoMoedaCompra option:selected").val();
        var cambioarray = AlojCambioArr.split('-');
        var AlojCambioidv = cambioarray[0];
        var AlojMoedaValor = parseFloat(cambioarray[1]);

        var Almoco = $("#AlmocoChk").val();
        var AlojamentoObservacoes = $("#AlojamentoObservacoes").val();

        var AlojIvaName = $("#IvaAloj option:selected").text();
        var AlojIva = $("#IvaAloj option:selected").val();
        var AlojTipoIvaName = $("#AlojamentoTipoIva option:selected").text();
        var AlojTipoIva = $("#AlojamentoTipoIva option:selected").val();

        var MarkupAloj = parseFloat($("#MarkupAloj").val());
        var AlojomanentoNet = parseFloat($("#AlojomanentoNet").val());
        var MargemAloj = parseFloat($("#MargemAloj").val());
        var ALojamentoComisao = parseFloat($("#ALojamentoComisao").val());

        var hotel = {
            "cambio": { "_id": AlojCambioidv, "name": AlojCambioName, "value": AlojMoedaValor },
            "AlmocoIncluido": Almoco,
            "Iva": { "_id": AlojIva, "name": AlojIvaName },
            "markup": MarkupAloj,
            "net": AlojomanentoNet,
            "margem": MargemAloj,
            "Comissao": ALojamentoComisao,
            "TipoIva": { "_id": AlojTipoIva, "name": AlojTipoIvaName },
            "Observacoes": AlojamentoObservacoes
        };

        var jsohotel = JSON.stringify(hotel);

        var inputaux = $("#tabs#tabs .AlojamentoFornecedorID");


        var t = $(".AuxAcordo").val();


        var label = $(".uiitemlabel").val();
        var valfornec = $(".uiitemvalue").val();

        $.each(inputaux, function (index, item) {
            var Forneced = $(item).val()


            if (t === Forneced || t === "") {

                var input = $(item).parent().find(".hiddenAlojamentoAcordo");


                $(input).val(jsohotel);
            }
        });




        $('#AcordoComercial').modal('hide');

        RefreshAlojTableDias();
        //InsertTableAlojamentoHotel(label, valfornec);
    });

    $("#InserirTipologiaBTN").click(function () {
        var ti = $("#TabelaInvoker").val();
        var NomeTipo = $("#NomeTipologia").val();
        var Capatipo = parseInt($("#CapacidadeTipologia").val());

        ti = ti.replace(" ", ".");
        var idtable = "." + ti;
        var rows = $(idtable).children().children();
        var cnt = rows.length;



        $(rows).each(function (linha, value) {
            var ArrayTd = value.children;
            var posColuna = ArrayTd.length - 1;


            if (linha == 0) {
                $(ArrayTd[posColuna - 1]).after("<td><input type='text' disabled class='form-control AlojTableType' value='" + NomeTipo + "' ><input type='hidden' class='AlojNPax " + Capatipo + " ' value='" + Capatipo + "'  ><img class='rmvAlojType " + posColuna + "' src='img/remove.png' alt='remover'></td>");
            }
            else if (linha > 0 && linha < cnt - 1) {
                $(ArrayTd[posColuna - 1]).after("<td> <input type='number' min-value=0 value='0'  class='AlojTableNumberIn " + Capatipo + "' ></td>");
            } else
                if (linha == cnt - 1) {
                    $(ArrayTd[posColuna]).after("<td><span class='AlojTotais " + Capatipo + "'>0</span></td>");
                }
        });
    });

    function AddAlojamentoTipologia(idtable) {


        $("#TabelaInvoker").val(idtable);
        $('#PopUpTipologia').modal('show');
    }

    $('body').on('click', '.AddIcon', function () {
        var callClass = this.className.toString();
        var Ptable = $(this).parent();
        if (callClass.split(" ")[1] == "AlojamentoDias") {
            var idtable = this.closest("table");
            //AddAlojamentoDias(idtable);
        } else
            if (callClass.split(" ")[1] == "AlojamentoTipos") {
                var idtable = this.closest("table").className.toString();
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


    $('#tabs').on('click', '.RemoveBtnFornecedor', function () {


        var rootContainer = $(this).parent().parent();

        var root = $(this).parent();
        var rootid = $(this).parent().attr('id');
        var Li = $(rootContainer).find("[aria-controls='" + rootid + "']")
        var alojamentoidToremove = $(root).find(".AlojamentoFornecedorID").val();

        $(root).remove();
        $(Li).remove();

        RefreshAlojTableDias();
        $("#tabs#tabs").tabs("refresh");


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
        if (valueId != "") {
            GetFornecedor(valueId);
        }

    });
    function showBill(id, acordo) {



        var AlojCambioName = $("#AlojamentoMoedaCompra option:selected").text();
        var AlojCambioArr = $("#AlojamentoMoedaCompra option:selected").val();
        var cambioarray = AlojCambioArr.split('-');
        var AlojCambioidv = cambioarray[0];
        var AlojMoedaValor = parseFloat(cambioarray[1]);


        $("#OrcamentoMoedaCompra option:contains(" + acordo.cambio.name + ")").attr('selected', 'selected')

        $("#AlmocoChk").val(acordo.AlmocoIncluido);
        $("#AlojamentoObservacoes").val(acordo.Observacoes);

        $("#IvaAloj").val(acordo.Iva.inId);
        $("#AlojamentoTipoIva").val(acordo.TipoIva.inId);

        $("#MarkupAloj").val(parseFloat(acordo.markup));
        $("#AlojomanentoNet").val(parseFloat(acordo.net));
        $("#MargemAloj").val(parseFloat(acordo.margem));
        $("#ALojamentoComisao").val(parseFloat(acordo.Comissao));


        $('#AcordoComercial').modal('show');
    }

    $('#tabs').on('click', '.GetBill', function () {


        var callClass = this.className.toString();
        var id = $(this).parent().children()[1];

        var jsonacordo = $(this).parent().find(".hiddenAlojamentoAcordo").val();
        if (jsonacordo === "") {
            $('#AcordoComercial').modal('show');
        }
        else {
            var acordo = JSON.parse(jsonacordo);

            var valueId = $(id).val();
            if (valueId != "") {
                $(".AuxAcordo").val(valueId);
                showBill(valueId, acordo);
            }
        }


    });



    $(".ClosebtnDiaria").click(function () {
        $('#AddicionarItemDiario').modal('hide');

    });





    $("#ProjectoDias").change(function () {

        var numdias = parseInt($(this).val(), 10);

        var dataInicial = new Date($("#ProjectoDataInicio").val());

        setDias(numdias, dataInicial);
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


                    myarray.push({ "Nome": element.Nome, "id": element.id });

                    intex++;

                }, this);

                response($.map(myarray, function (item) {
                    return {
                        label: item.Nome,
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


    $(".fornecedor").autocomplete({
        source: function (request, response) {

            var teste = this;
            var dfg = teste.bindings[0].id;

            if (dfg === "ProjectoFornecedor") {
                InputClick = "#ProjectoFornecedor";
                InputId = "#ProjectoFornecedorID";
            }
            if (dfg === "AlojamentoFornecedor") {
                InputClick = "#AlojamentoFornecedor";
                InputId = "#AlojamentoFornecedorID";
            }
            if (dfg === "VoosFornecedor") {
                InputClick = "#VoosFornecedor";
                InputId = "#VoosFornecedorID";
            }
            if (dfg === "DiariaFornecedor") {
                InputClick = "#DiariaFornecedor";
                InputId = "#DiariaFornecedorID";
            }
            if (dfg === "ServicosFornecedor") {
                InputClick = "#ServicosFornecedor";
                InputId = "#ServicosFornecedorID";
            }
            var str2 = request["term"].toLowerCase();

            $.post('api/Postman/pesquisaFornecedor', { "PesquisaFornecedor": str2 },
            function (returnedData) {

                var myarray = [];
                var intex = 0;
                returnedData.forEach(function (element) {


                    myarray.push({ "nome": element.nome, "id": element.Id });

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
            if (InputClick == "#AlojamentoFornecedor") {
                $('#AcordoComercial').modal('show');
                $(".uiitemlabel").val(ui.item.label);
                $(".uiitemvalue").val(ui.item.value);
                $(".AuxAcordo").val(ui.item.value);
                InsertTableAlojamentoHotel(ui.item.label, ui.item.value);



            }
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

    $(".ui-autocomplete").css("z-index", "2147483647");


});





/* AUXILARES */

function loadPageAuxTables() {



    var items = JSON.parse($("#HiddenServicosTTTipos").val());

    $.each(items, function (idx, el) {
        var id = el.inId;
        var nome = el.name;
        $("#ServicosTipoServico").append($("<option />").val(id).text(nome));
    });



    var jsonEstados = JSON.parse($("#BundleConfigs").val());

    $.each(jsonEstados, function (idx, el) {
        var id = el.inId;
        var nome = el.Name;
        $(".EstadosSelect").append($("<option />").val(id).text(nome));
    });



    var jsonTiposIvas = JSON.parse($("#HiddenTiposIva").val());

    $.each(jsonTiposIvas, function (idx, el) {
        var id = el.inId;
        var nome = el.name;
        $(".TipoIVA").append($("<option />").val(id).text(nome));
    });



    var jsonIvas = JSON.parse($("#HiddenIvas").val());
    $.each(jsonIvas, function (idx, el) {
        var id = el.inId;
        var nome = el.name;
        $(".IVA").append($("<option />").val(id).text(nome));
    });



    var Jsoncambios = JSON.parse($("#HiddenCambios").val());

    $.each(Jsoncambios, function (idx, el) {
        var id = el.inId;
        var nome = el.name
        var valor = el.value;
        $(".moneyCtrl").append($("<option />").val(id + "-" + valor).text(nome));
    });



    resp = JSON.parse($("#HiddenTipoCustos").val());

    $.each(resp, function (idx, el) {
        var id = el.inId;
        var nome = el.name;
        $(".TipoServico").append($("<option />").val(id).text(nome));
    });



    resp = JSON.parse($("#HiddenPaises").val());
    $.each(resp, function (idx, el) {
        var id = el.inId;
        var nome = el.name;
        $(".Pais").append($("<option />").val(id).text(nome));
    });



    resp = JSON.parse($("#HiddenTipoFornecedor").val());
    $.each(resp, function (idx, el) {
        var id = el.inId;
        var nome = el.name;
        $(".FornecedorTipoTerceiro").append($("<option />").val(id).text(nome));
    });




}
function FornecedorInsertInputs(id, nome, nomecomercial, idtab) {
    nome
    var FORNECEDORIDV = id;
    var F_NOMECOMECIAL = nome;
    var F_NOME = nomecomercial;

    switch (idtab) {
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
                var date = "" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
            else
                var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
        }
        else {
            if (d.getDate() < 10)
                var date = "" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
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
                var date = "" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
            else
                var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
        }
        else {
            if (d.getDate() < 10)
                var date = "" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
            else
                var date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
        }

        return date;
    }(new Date(date));
    return dataIni;
}


function ConvertDateForOrcamentosTable(date) {
    var dataIni = function (d) {

        if (d.getMonth() < 10) {
            if (d.getDate() < 10)
                var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + "" + d.getDate() + " ";
            else
                var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " ";
        }
        else {
            if (d.getDate() < 10)
                var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + "" + d.getDate() + " ";
            else
                var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " ";

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
                var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + "0" + d.getDate() + " ";
            else
                var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " ";

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
                var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + "0" + d.getDate() + " ";
            else
                var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " ";

        }
        var auxhoras;
        if (d.toLocaleTimeString().toLowerCase().indexOf("am") >= 0) {
            auxhoras = d.toLocaleTimeString().toLowerCase().replace(" am", "") + ".000";

        }
        else {
            auxhoras = d.toLocaleTimeString().toLowerCase().replace(" pm", "") + ".000";
        }
        date += auxhoras
        return date;
    }(new Date(date));
    return dataIni;
}

function callPopUpDiarias(x) {
    var id = x;

    $("#DiariaAuxDia").val(id);

    var rows = $(".DayHeader");

    var currRow = x - 1;


    var input = $(rows[currRow]).children();
    var dt = $(input[1]).val();



    var dt3 = ConvertDateForTable(dt);
    var dt2 = ConvertDateForInput(dt3);

    $("#DiariaData").val(dt2);
    $("#DataDeexecucao").val(dt);



    $('#AddicionarItemDiario').modal('show');

};
function setDias(x, dataIni) {



    var container = $('.projectDia');
    var uri = "img/add_btn.png";
    var resUrl = encodeURI(uri);
    $('.DayRow').remove();
    for (var i = 1; i <= x; i++) {
        var t = ConvertDateForSetDias(dataIni.toString())
        var d1 = Date.parse(t);
        var d2 = d1.add(i - 1).days();
        var d3 = ConvertDateForTableDiarias(d2);
        var d4 = ConvertDateForSend(d2);

        $('<div class="DayRow">'
            + '<div class="DayHeader"> Dia ' + i
            + '<button class="AddDiariaBtn" type="button" onclick="callPopUpDiarias(' + i + ');" style="padding: 0px"><img class="AddDiariaInRow" src="' + resUrl + '" alt="Guardar"></button>'
            + ' - ' + d3
            + '<input type="hidden" class="DataDeExec" value="' + d4 + '">'
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

