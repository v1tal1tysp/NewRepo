﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="TT_orcamentos.Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title>Lista</title>

	<link rel="stylesheet" href="css/style.css"/>

    <link href="css/bootstrap.min.css" rel="stylesheet" />

	<script type="text/javascript" src="javascript\jquery-3.2.0.min.js"></script>
	<script type="text/javascript" src="javascript\bootstrap.js"></script>
    
</head>
<body>
    <form id="form1" runat="server">
    <div class="header">
        <nav class="navbar navbar-default">

            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#"><img src="img/logotipo.jpg"></a>
            </div>


            <div class="menu collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#">Lista de Orçamentos <span class="sr-only">(current)</span></a></li>
                    <li><a href="NewProject.aspx">Novo Projeto</a></li>
                </ul>
                <ul class="nav navbar-nav" style="float:right;">
                    <li><a href="Config.html">Configuraçoes</a></li>
                    <li><a href="#">Sair</a></li>
                </ul>
            </div>
        </nav>
    </div>

    <div class="ProjectForm">
        <div class="ListContainer">

            <div class="ListFilters">

                <div class="col-lg-6">
                    <div class="input-group">
                        <span class="input-group-addon">
                            <input type="combo" aria-label="...">
                        </span>
                        <input type="text" class="form-control" aria-label="...">
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="input-group">
                        <span class="input-group-addon">
                            <input type="radio" aria-label="...">
                        </span>
                        <input type="text" class="form-control" aria-label="...">
                    </div>
                </div>

            </div>
            <div class="row">
                <div class="col-lg-12">
                    <asp:HiddenField ID="TableData" runat="server"/>
                    <asp:table id="Listaprojectos" runat="server">
                            <asp:TableHeaderRow>
     
                                <asp:TableHeaderCell>Cliente</asp:TableHeaderCell>
                                <asp:TableHeaderCell>Projecto</asp:TableHeaderCell>
                                <asp:TableHeaderCell>Orçamento</asp:TableHeaderCell>
                                <asp:TableHeaderCell>Data Início <br /> PAX</asp:TableHeaderCell>
                                <asp:TableHeaderCell>File Sigav</asp:TableHeaderCell>
                                <asp:TableHeaderCell>Descrição</asp:TableHeaderCell>
                            
                            </asp:TableHeaderRow>

                    </asp:table>
                </div>
            </div>

        </div>
    </div>

    </form>

<script>

	var url3 = "img/remove.png";
	var res = encodeURI(url3);


	$(document).ready(function () {
	    LoadList();

	});


    	$('body').on('click', '.rmvRecord', function () {
    	    var table = $(this).parent().parent().parent().parent().attr("id");
    	    var recID = $(this).parent().parent().find(".HiddenRecordId").val();
    	    var Tr = $(this).parent().parent();

    	    deleteProject(recID);

    	});

		function deleteProject(id){
			$.post('http://www.touchgroup.com/sgtt/cfc/main.cfc?method=deleteProjecto', {"projectoidv":id},
        	    function (returnedData) {
        	        var obj = JSON.parse(returnedData);
        	        var respo = obj.DATA["RESPOSTA"][0];
        	        if(respo === "ok")
        	        {
        	            window.location.href = window.location.href;
        	        }
        	        obj = null;
        	    }).fail(function () {
        	    console.log("error");
        	});
		}
		function Tratartabela(data){





			var uniqueNames = [];
			var ListaJson = [];
            


            $.each(data, function (i, el) {
				if($.inArray(el.projectoidv, uniqueNames) === -1)
				{
				    var strname = el.projectoidv;
				    ListaJson.push({ "projecto": strname, "orcamentos": [] })
				    uniqueNames.push(strname);
				}
			});


            $.each(data, function (i, el) {
				for(var x  =0 ; x < uniqueNames.length; x++)
				{
					var t = uniqueNames[x];
					var t2 = el.projectoidv;

					if (uniqueNames[x] === el.projectoidv)
					{
						var inp =  uniqueNames[i];
						var orcajsn = {
						    "orcamento": el.orcamentoidv,
						    "Nome de Projecto": el.o_nome,
						    "NomeCliente": el.f_nome,
						    "EstadoProjecto": el.EstadoProjecto,
						    "EstadoOrcamento": el.EstadoOrcamento,
						    "Fileidv": el.filettidv,
						    "Descrição": el.p_descricao,
						    "Sigav": el.sigavidv,
						    "p_descricao": el.p_descricao,
						    "p_nome": el.p_nome,
						    "o_datainicio": el.o_datainicio,
						    "o_numeropessoas": el.o_numeropessoas,


						}

						ListaJson[x]["orcamentos"].push(orcajsn);
					}
				}

			});


			$.each(ListaJson, function(index2) {


				$.each(ListaJson[index2]["orcamentos"], function(index) {




					var f_nome = ListaJson[index2]["orcamentos"][index]["NomeCliente"];
					var page = 'NewProject.aspx?ID='+ListaJson[index2]["projecto"];
					var orcamentoidv = ListaJson[index2]["orcamentos"][index]["orcamento"];
					var Estado = ListaJson[index2]["orcamentos"][index]["EstadoProjecto"];
					var EstadoOrcamento = ListaJson[index2]["orcamentos"][index]["EstadoOrcamento"];
					var Fileidv = ListaJson[index2]["orcamentos"][index]["Fileidv"];
					var Sigav = ListaJson[index2]["orcamentos"][index]["Sigav"];
					var Descri = ListaJson[index2]["orcamentos"][index]["p_descricao"];
					var ProjectName = ListaJson[index2]["orcamentos"][index]["p_nome"];

					var o_datainicio = ConvertDateForOrcamentosTable(ListaJson[index2]["orcamentos"][index]["o_datainicio"]);
					var o_numeropessoas = ListaJson[index2]["orcamentos"][index]["o_numeropessoas"];

					var page2 = page + "&IDorc=" + orcamentoidv;

					var projectname = ListaJson[index2]["orcamentos"][index]["Nome de Projecto"];

					var len = ListaJson[index2]["orcamentos"].length;
					if(projectname == null){
						projectname = "";
						EstadoOrcamento = "Sem orçamentos";
						page2 ="";
					}


					if(index==0)
					{

						$("#Listaprojectos tr:last").after('<tr class="RowPrincipal">'+
                			'<td rowspan="'+len+'">'+f_nome+
							'<input type="hidden" class="HiddenRecordId" value="' + ListaJson[index2]["projecto"] + '">' +
							'</td>'+
							'<td rowspan="'+len+'">'+ProjectName+'</br>' +Estado+'</td>'+
                			'<td><a href="'+page2+'">'+projectname+'</a></br>'+EstadoOrcamento+'</td>'+
                			'<td>' + o_datainicio + '</br>' + o_numeropessoas + '</td>' +
                			'<td>'+Sigav+'</td>'+
                			'<td>'+Descri+'</td>'+
							'<td class="OpIcons">' +
                    		'<img class="rmvRecord" src="' + res + '" alt="remover">' +
                    		'</td>'+
                			'</tr>');
					}
					else{
						$("#Listaprojectos tr:last").after('<tr>'+
                			'<td><a href="'+page2+'">'+projectname+'</a></br>'+EstadoOrcamento+'</td>'+
							'<td>' + o_datainicio + '</br>' + o_numeropessoas + '</td>' +
                			'<td>'+Sigav+'</td>'+
                			'<td>'+Descri+'</td>'+
                			'</tr>');
					}


				});



			});


		}
		function LoadList(){
		    var json = $("#TableData").val();

		    var teste = JSON.parse(json);

		    response = $.parseJSON(teste);

		    Tratartabela(response);

		}

		function ConvertDateForOrcamentosTable(date) {
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



		function UpdateCambios(obj){
		    var rates;
		    var arrayCambios={};


		    var demo = function(data) {

		    rates = data.rates;
		    var ratingsValores = $.param(data.rates);

		    var resultado = ratingsValores.split("&");
		    var i = 1;

		    $.each(obj.DATA['CAMBIOIDV'], function(idx) {
				var idv = obj.DATA['CAMBIOIDV'][idx];
				var nome = obj.DATA['C_NOME'][idx];
				 $.each(resultado, function(){
					 var currincy = this.split("=");

					 if(nome === currincy[0])
					 {
						var resp;
		    			var data = {
							"cambioidv": idv,
		    			    "c_nome": nome,
							"c_valor": parseFloat(currincy[1])
		    			}

		        		sendCambio(data);
					 }

				 })

		    });





		    }

		    $.getJSON("http://api.fixer.io/latest", demo);
		}



        function sendCambio(objectToSend) {

            var res;
            $.post('http://www.touchgroup.com/sgtt/cfc/main.cfc?method=insertCambio', objectToSend,
                function (returnedData) {
                    res = JSON.parse(returnedData);

                    res = null;
                }).fail(function () {
                    console.log("erro insertCambio");
                });
        }

</script>
</body>
</html>
