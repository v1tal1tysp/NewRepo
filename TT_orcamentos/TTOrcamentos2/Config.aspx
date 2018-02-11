<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Config.aspx.cs" Inherits="TTOrcamentos2.Config" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Detalhe Fornecedor</title>

    <link rel="stylesheet" href="css\style.css"/>
    <link rel="stylesheet" href="css\DataTables.css"/>
    <link rel="stylesheet" href="css\bootstrap.min.css"/>

    <script type="text/javascript" src="javascript\jquery-3.2.0.min.js"></script>
    <script type="text/javascript" src="javascript\bootstrap.js"></script>
    <script type="text/javascript" src="javascript\jquery-ui.min.js"></script>
    <script type="text/javascript" src="javascript\money.min.js"></script>
    <script type="text/javascript" src="javascript\DataTables.js"></script>
    <script type="text/javascript" src="javascript\jquery.circliful.min.js"></script>
    <script type="text/javascript" src="javascript\date.js"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div class="header">
            <nav class="navbar navbar-default">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                        aria-expanded="false">
			    	<span class="sr-only">Toggle navigation</span>
			    	<span class="icon-bar"></span>
			    	<span class="icon-bar"></span>
			    	<span class="icon-bar"></span>
			        </button>
                    <a class="navbar-brand" href="#"><img src="img/logotipo.jpg"></a>
                </div>
                <div class="menu collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li><a href="index.aspx">Lista de Files <span class="sr-only">(current)</span></a></li>
                        <li ><a href="NewProject.aspx">File</a></li>
                        <li class="active"><a href="FornecedoresIndex.aspx">Fornecedores</a></li>
                    </ul>
                    <ul class="nav navbar-nav" style="float:right;">
                        <li><a href="Config.aspx">Configuraçoes</a></li>
                        <li><a href="#">Sair</a></li>
                    </ul>
                </div>
            </nav>
        </div>
        <asp:HiddenField ID="HiddenInfo" runat="server" />
        <asp:HiddenField ID="HiddenTipoCustos" runat="server" />
        <asp:HiddenField ID="HiddenPaises" runat="server" />
        <asp:HiddenField ID="HiddenTipoFornecedor" runat="server" />

        <div class="ProjectForm">
  
            <div class="tab">
                
                <div class="FornecedorMenu">
                    <button type="button" class="tablinks active" onclick="openTab(event, 'Utilizadores')">Geral</button>
                    <button type="button" class="tablinks" onclick="openTab(event, 'Despesas')">Despesas</button>
                </div>
            </div>

            <div class="tabContentHolder">
                <div id="Utilizadores" class="tabcontent" style="display: block;">
                        <div class="panel-body">
                            <div class="TitleTabela">Utilizadores</div>
                        </div>  
                </div>
                <div id="Despesas" class="tabcontent">
                    <div class="panel-body">
                        <div class="TitleTabela">Despesas</div>
                    </div>
                </div>
            </div>



        </div>

    </form>
    <script type="text/javascript" src="javascript\ScriptsFornecedor.js"></script>
</body>
</html>
