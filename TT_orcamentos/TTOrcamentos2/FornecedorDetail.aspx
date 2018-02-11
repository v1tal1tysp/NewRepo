<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FornecedorDetail.aspx.cs" Inherits="TTOrcamentos2.FornecedorDetail" %>

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
                    <button type="button" class="tablinks active" onclick="openTab(event, 'Geral')">Geral</button>
                    <button type="button" class="tablinks" onclick="openTab(event, 'Despesas')">Despesas</button>
                </div>
            </div>

            <div class="tabContentHolder">
                <div id="Geral" class="tabcontent" style="display: block;">
                        <div class="panel-body">
                            <div class="TitleTabela">Informação</div>
                            <div class="row">
                                    <label for="example-text-input" class="col-lg-2 col-form-label">Nome do Terceiro</label>
                                    <div class="col-lg-4">
                                        <input type="text" class="form-control" id="FornecedorNome" name="Hotel" />
                                        <input type="hidden"  id="Fornecedorid" />
                                    </div>
                                <label for="example-text-input" class="col-lg-2 col-form-label">Tipo de Serviço</label>
                                <div class="col-lg-4">
                                    <select id="FornecedorTipoServico" class="TipoServico form-control ">

                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <label for="example-text-input" class="col-lg-2 col-form-label">Pais</label>
                                <div class="col-lg-4">
                                    <select name="" id="FornecedorPais" class="Pais form-control">
                                        
                                    </select>
                                </div>
                                <label for="example-text-input" class="col-lg-2 col-form-label">Cidade</label>
                                <div class="col-lg-4">
                                    <input type="text" class="form-control" id="FornecedorCidade" name="Hotel" />
                                </div>
                                
                            </div>
                            <div class="row">
                                <label for="example-text-input" class="col-lg-2 col-form-label">Nome Comercial</label>
                                <div class="col-lg-4">
                                    <input type="text" class="form-control" id="FornecedorNomeComercial" name="Hotel" />
                                </div>
                                <label for="example-text-input" class="col-lg-2 col-form-label">Localidade</label>
                                <div class="col-lg-4">
                                    <input type="text" class="form-control" id="FornecedorLocalidade" name="Hotel" />
                                </div>
                                
                            </div>
                            <div class="row">
                                <label for="example-text-input" class="col-lg-2 col-form-label">Morada</label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" id="FornecedorMorada" name="Hotel" />
                                </div>
                                <label for="example-text-input" class="col-lg-2 col-form-label">Codigo Postal</label>
                                <div class="col-lg-2">
                                    <input type="text" class="form-control" id="FornecedorCodigoPostal" name="Hotel" />
                                </div>
                            </div>
                            <div class="row">
                                <label for="example-text-input" class="col-lg-2 col-form-label">Telefone</label>
                                <div class="col-lg-4">
                                    <input type="text" class="form-control" id="FornecedorTelefone" name="Hotel" />
                                </div>
                                <label for="example-text-input" class="col-lg-2 col-form-label">Fax</label>
                                <div class="col-lg-4">
                                    <input type="text" class="form-control" id="FornecedorFax" name="Hotel" />
                                </div>
                            </div>
                            <div class="row">
                                <label for="example-text-input" class="col-lg-2 col-form-label">Telemovel</label>
                                <div class="col-lg-4">
                                    <input type="text" class="form-control" id="FornecedorTelemovel" name="Hotel" />
                                </div>
                                <label for="example-text-input" class="col-lg-2 col-form-label">Contacto</label>
                                <div class="col-lg-4">
                                    <input type="text" class="form-control" id="FornecedorContacto" name="Hotel" />
                                </div>
                            </div>
                            <div class="row">
                                <label for="example-text-input" class="col-lg-2 col-form-label">Email</label>
                                <div class="col-lg-4">
                                    <input type="text" class="form-control" id="FornecedorEmail" name="Hotel" />
                                </div>
                                <label for="example-text-input" class="col-lg-2 col-form-label">Url</label>
                                <div class="col-lg-4">
                                    <input type="text" class="form-control" id="FornecedorUrl" name="Hotel" />
                                </div>
                            </div>
                            <div class="row">
                                <label for="example-text-input" class="col-lg-2 col-form-label">Tipo de Terceiro</label>
                                <div class="col-lg-4">
                                    <select id="FornecedorTipoTerceiro" class="FornecedorTipoTerceiro form-control">
     
                                    </select>
                                </div>
                                <label for="example-text-input" class="col-lg-2 col-form-label">Contribuinte</label>
                                <div class="col-lg-4">
                                    <input type="text" class="form-control" id="FornecedorContribuinte" name="Hotel" />
                                </div>
                            </div>
                 <!--           <div class="row">

                                <div class="col-lg-4">
                                    <button  type="button" class="AddFornecedor" id="TabelaFornecedor">Guardar</button>
                                    <img class="FornecedorCheck" src="img\check.png" alt="Guardar">
                                    <img class="FornecedorError" src="img\remove.png" alt="Guardar">
                                </div>
                            </div>-->
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
