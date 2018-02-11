<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FornecedoresIndex.aspx.cs" Inherits="TTOrcamentos2.FornecedoresIndex" %>

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
                    <li><a href="#">Lista de Orçamentos <span class="sr-only">(current)</span></a></li>
                    <li><a href="NewProject.aspx">Novo Projeto</a></li>
                    <li class="active"><a href="FornecedoresIndex.aspx">Fornecedores</a></li>
                </ul>
                <ul class="nav navbar-nav" style="float:right;">
                    <li><a href="Config.aspx">Configuraçoes</a></li>
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
                            <input type="combo" aria-label="..." />
                        </span>
                        <input type="text" class="form-control" aria-label="..." />
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="input-group">
                        <span class="input-group-addon">
                            <input type="radio" aria-label="..."/>
                        </span>
                        <input type="text" class="form-control" aria-label="..."/>
                    </div>
                </div>

            </div>
            <div class="row">
                <div class="col-lg-12">
                    <asp:HiddenField ID="TableData" runat="server"/>

                    <table id="Listafornecedores">
                        <tr>
                            <th>Nome</th>
                            <th>Pais</th>
                            <th>Cidade</th>
                        </tr>
                    </table>

                </div>
            </div>

        </div>
    </div>
        
    </form>

<script>

	var url3 = "img/remove.png";
	var res = encodeURI(url3);


	$(document).ready(function () {
	  
	    var fornecedores = JSON.parse( $("#TableData").val());

	    $(fornecedores).each(function (index, obj) {
	        var page = 'FornecedorDetail.aspx?ID=' + obj.Id;
	        


	        $("#Listafornecedores tr:last").after('<tr>' +
                '<td><a href="' + page + '">' + obj.nome + "</a>" + '</td>' +
                '<td>' + obj.Country + '</td>' +
                '<td>' + obj.cidade + '</td>' +
                '</tr>');
	    });
	    //UpdateCambios()
	});



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

</script>
</body>
</html>
