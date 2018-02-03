<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="NewProject.aspx.cs" Inherits="TT_orcamentos.NewProject" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Novo Projeto</title>

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
                        <li class="active"><a href="#">File</a></li>
                        <li><a href="#">Fornecedores</a></li>
                    </ul>
                    <ul class="nav navbar-nav" style="float:right;">
                        <li><a href="Config.html">Configuraçoes</a></li>
                        <li><a href="#">Sair</a></li>
                    </ul>
                </div>
            </nav>
        </div>

        <asp:HiddenField ID="HiddenQuartos" runat="server" />
        <asp:HiddenField ID="HiddenCambios" runat="server" />
        <asp:HiddenField ID="HiddenIvas" runat="server" />
        <asp:HiddenField ID="HiddenTiposIva" runat="server" />
        <asp:HiddenField ID="HiddenTipoCustos" runat="server" />
        <asp:HiddenField ID="HiddenPaises" runat="server" />
        <asp:HiddenField ID="HiddenServicosTTTipos" runat="server" />
        <asp:HiddenField ID="BundleConfigs" runat="server" />
         <asp:HiddenField ID="HiddenTipoFornecedor" runat="server" />

        

        <div class="ProjectForm">
<!-- Menu.-->
            <div class="tab">
                <asp:HiddenField ID="ProjectoHidden" runat="server" />
                <div class="ProjectLeftMenu">
                    <button type="button" class="tablinks active" onclick="openTab(event, 'Geral')">Geral</button>
                    <button type="button" class="tablinks" onclick="openTab(event, 'Alojamento')">Alojamento</button>
                    <button type="button" class="tablinks" onclick="openTab(event, 'Voos')">Voos</button>
                    <button type="button" class="tablinks" onclick="openTab(event, 'Diarias')">Diarias</button>
                    <button type="button" class="tablinks" onclick="openTab(event, 'Servicos')">Serviços touch</button>
                    <button type="button" class="tablinks" onclick="openTab(event, 'Ver')">Visualização</button>
                    <button type="button" class="tablinks" onclick="openTab(event, 'Report')">Report Entidades</button>
                    <button type="button" class="tablinks" onclick="openTab(event, 'History')">Historico</button>
                </div>
                <div class="ProjectMenu">
                    <button  type="button" style="padding: 0px;"><img class="SaveIcon" src="img\pdf.ico" alt="Guardar"/></button>
                    <button type="button" style="padding: 0px;"><img class="RequestExcel" src="img\Excell.ico" alt="Guardar"/></button>
                    <button type="button" style="padding: 0px;"><img class="SaveIcon" src="img\SaveIcn.png" alt="Guardar"/></button>
                </div>
            </div>
<!-- Container-->
            <div class="tabContentHolder">

<!-- Geral-->

                <div id="Geral" class="tabcontent" style="display: block;">

                    <div class="TitleTabela">Geral</div>
                    <!--Project Geral-->
                    <div id="accordion">
                        <h3>File</h3>
                        <div class="panel-body">
                        <!--projecto end-->

                            <div class="row">
                                <label for="example-text-input" class="col-lg-2 col-form-label">Cliente</label>
                                <div class="col-lg-3">
                                    <input id="ProjectoFornecedorID" type="hidden"  class="form-control" />
                                    <input class="form-control fornecedor" id="ProjectoFornecedor" />
                                </div>
                                <div class="col-lg-1">
                                    <button  type="button" class="AddBtnFornecedor" style="padding: 0px"><img class="AddIcon 1" src="img\add_btn.png" alt="Guardar"/></button>
                                </div> 
                                <label for="example-text-input" class="col-lg-1 col-form-label">Nome Contacto</label>
                                <div class="col-lg-2">
                                    <input class="form-control" type="text" value="" id="ProjectoNomeContacto"/>
                                </div>
                            </div>
                            <div class="row">
                                <input type="hidden" value="" id="projectoidv"/>
                                <label for="example-text-input" class="col-lg-2 col-form-label">Nome de Projeto</label>
                                <div class="col-lg-4">
                                    <input class="form-control" type="text" value="" id="ProjectName"/>
                                </div>
                                <label for="example-text-input" class="col-lg-1 col-form-label">Sigav</label>
                                <div class="col-lg-2">
                                    <input class="form-control" type="text" value="" id="ProjectoSigav"/>
                                </div>
                            </div>
                            <div class="row">
                                <label for="example-number-input" class="col-lg-2 col-form-label">Estado</label>
                                <div class="col-lg-2">
                                    <select name="Estado" id="ProjectEstado" class="EstadosSelect form-control">
   
                                    </select>
                                </div>
                                <label for="example-text-input" class="col-lg-2 col-form-label">Data Entrada:</label>
                            </div>
                            <div class="row">
                                <label for="example-text-input" class="col-lg-2 col-form-label">Designer</label>
                                <div class="col-lg-2">
                                    <asp:HiddenField ID="ProjectoDesigner" runat="server" Value="1" />
                                    <input class="form-control user" type="text" value="" id="ProjectoDesignerName"/>
                                </div>
                                <label for="example-text-input" class="col-lg-2 col-form-label">Account Manager</label>
                                <div class="col-lg-2">
                                    <asp:HiddenField ID="ProjectoAccountManager" runat="server" Value="1" />
                                    <input class="form-control user" type="text" value="" id="ProjectoAccountManagerName"/>
                                </div>
                                
                            </div>

                            <div class="row">
      
                                <label for="example-number-input" class="col-lg-2 col-form-label">Descriçao</label>
                                <div class="col-lg-5">
                                    <textarea class="form-control" id="ProjectDescription" rows="3"></textarea>
                                </div>
                            </div>
                            <div class="row">

                                <div class="col-lg-6">
                                    <button class="AddOrcamentoPe">Adicionar um Pe</button>
                                </div>
                                <div class="col-lg-12">
                                    <div class="OrcamentosAtivos">
                                        <h4><label class="col-form-label">Lista Orçamentos Activos</label></h4><br />
                                        <asp:HiddenField ID="OrcamentosActivosHidden" runat="server" />
                                        <table id="OverviewOrcamentos">
                                            <tr>
                                                <th>Orçamento Geral</th>
                                                <th>Pés</th>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="ProjectoFicheiros">
                                        <div>  
                                            <input type="file" name="txtUploadFile" id="txtUploadFile" class="txtUploadFile"  />
                                        </div>  
                                        <table id="FicheirosList">
                                            <tr>
                                                <th>Nome</th>
                                                <th>Data</th>
                                            </tr>
                                        </table>
                                    </div>
                                   

                                </div>
                                
                            </div>
                        </div>
                        <!--Orcamentos Geral-->

                        <h3>Orçamento <label ID="VersaoID" class="LabelOrcamento"></label></h3>
                        <div class="panel-body">
                            <asp:HiddenField ID="OrcamentosHidden" runat="server" />
                            <asp:HiddenField ID="VersaoActual" runat="server" Value="0" />
                            <!-- Estado & cambio & Tipo de IVA & IVA-->
                            <div class="row">
                                <input type="hidden" id="orcamentoidv"/>
                                <label for="example-number-input" class="col-lg-1 col-form-label">Estado</label>
                                <div class="col-lg-2">
                                    <select name="Estado" id="OrcamentoEstado" class="EstadosSelect form-control">

                                    </select>
                                </div>
                                <label for="example-text-input" class="col-lg-1 col-form-label">Tipo de Iva</label>
                                <div class="col-lg-2">
                                    <select name="Estado" id="OrcamentoTipoIva" class="TipoIVA form-control">

                                    </select>
                                </div>
                                <label for="example-text-input" class="col-lg-1 col-form-label">Iva</label>
                                <div class="col-lg-2">
                                    <select name="Estado" id="OrcamentoIva" class="IVA form-control">
    
                                    </select>
                                </div>
                                <div class="col-lg-1">
                                    <select name="Moeda" id="OrcamentoMoedaCompra" class="moneyCtrl form-control">
                                    </select>
                                </div>
                            </div>
                            <!--Pessoas  & Data de Execução & Data Final-->
                            <div class="row">
                                <label for="example-text-input" class="col-lg-1 col-form-label">Versão</label>
                                <div class="col-lg-2">
                                    <input class="form-control" type="text" disabled="disabled" value="" id="OrcamentoNome"/>
                                </div>
                                 <label for="example-text-input" class="col-lg-1 col-form-label">Markup</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" value="0" min="0" step="0.01" id="OrcamentoMarkup"/>
                                </div>
                                <label for="example-number-input" class="col-lg-1 col-form-label">Margem de Venda</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" value="5" min="0" step="0.01" id="OrcamentoMargem"/>
                                </div>
                                <label for="example-text-input" class="col-lg-1 col-form-label">Noites</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" value="0" id="OrcamentoNoites"/>
                                </div>

                            </div>
                            <div class="row">
                                <label for="example-text-input" class="col-lg-1 col-form-label">Dias</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" value="0" id="OrcamentoDias"/>
                                </div>
                                <label for="example-text-input" class="col-lg-1 col-form-label">PAX</label>
                                <div class="col-lg-2">
                                    <input class="form-control" type="number" name="Numero Pax Orçamento" value="0" id="OrcamentoNumeroDePessoas"/>
                                </div>
                                <label for="example-text-input" class="col-lg-1 col-form-label">Data de Partida</label>
                                <div class="col-lg-2">
                                    <input class="form-control" type="date" value="2011-08-19" id="OrcamentoDataInicio"/>
                                </div>
                            </div>
                            <!--Destino  & Margem-->
                            <div class="row">
                                <label for="example-number-input" class="col-lg-1 col-form-label">Descriçao</label>
                                <div class="col-lg-5">
                                    <textarea class="form-control" name="Orçamento Descição" id="OrcamentoDescricao" rows="3"></textarea>
                                </div>
                            </div>



                            <!--Title & addBtn-->
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="TitleTabela">Versões</div>
                                </div>

                                
                            </div>
                             <!--tabela Historico + operaçoes-->
                            <div class="row">
                                <div class="col-lg-12">
                                    <table id="ListaOrcamentos">
                                        <tr>
                                            <th>Nome</th>
                                            <th>Estado</th>
                                            <th>Tipo iva</th>
                                            <th>Iva</th>
                                            <th>Câmbio</th>
                                            <th>Data/Hora</th>
                                            <th>Margem Venda</th>
                                            <th>Markup</th>
                                            <th>Descricao</th>
                                            <th>PAX</th>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    <!--Orcamentos Geral end-->
                    </div>

                </div>
<!-- alojamento-->
                <div id="Alojamento" class="tabcontent">
                    <asp:HiddenField ID="HiddenAlojamento" runat="server" />
                    <div class="TitleTabela">Alojamento</div>
                    <div class="tabContentHolder">
                        <!--Projecto-->
                        <div class="panel-body">
                            <asp:HiddenField ID="quartos" runat="server"/>
                            <!-- Hotel  & quartos & numero de noites & valor por Noite-->
                            <div class="row">
                                <label for="example-text-input" class="col-lg-1 col-form-label">Entidade</label>
                                <div class="col-lg-3">
                                    <input class="form-control fornecedor" id="AlojamentoFornecedor" />
                                    
                                </div>
                                <div class="col-lg-2">
                                    <button type="button"  class="AddBtnFornecedor" style="padding: 0px"><img class="AddIcon 2" src="img\add_btn.png" alt="Guardar"></button>
                                </div>

                            </div>
                            <div class="row" style="display: flex;width: 100%;">
                                <div id="tabs" class="row AlojamentoHoteis">
                                    <ul>
                                    </ul>
                                </div>
                                <div id="AlojamentoResume" class="AlojamentoResume">
                                    <table id="AlojamentoResumetable">
                                        <tr>
                                            <th>Dia</th>
                                            <th>Total PAX</th>
                                            <th>%</th>
                                        </tr>
                                    </table>

                                </div>
                            </div>


                        </div>

                        <!--tabela-->
                        <div class="row">

                            <div class="col-lg-12">
                                <table id="AlojamentoRecords">
                                    <tr>
                                        <th>Hotel</th>
                                        <th>Tipo</th>
                                        <th>Roomnights</th>
                                        <th>Valor/Moeda</th>
                                        <th>Margem</th>
                                        <th class="paraVenda">Total</th>
                                        <th class="paraVenda">Total Pessoa</th>
                                        <th class="Lucro">Total</th>
                                        <th class="Lucro">Total Pessoa</th>
                                        <th class="Lucro">Lucro</th>
                                    </tr>
                                   
                                </table>
                                
                            </div>
                        </div>
                    </div>
                </div>
<!-- voos-->
                <div id="Voos" class="tabcontent">
                    <asp:HiddenField ID="HiddenVoos" runat="server" />
                    <div class="TitleTabela">Voos</div>
                    <div style="display: block;">
                        <div class="panel-body">
                            <!--Partida &  Destino & nome Voo-->
                            <div class="row">
                                <label for="example-text-input" class="col-lg-1 col-form-label">Partida</label>
                                <div class="col-lg-2">
                                    <input type="text" class="form-control" value="Lisboa" id="VoosPartida" />
                                </div>
                                <label for="example-text-input" class="col-lg-1 col-form-label">Destino</label>
                                <div class="col-lg-2">
                                    <input type="text" class="form-control" value="London" id="VoosDestino" />
                                </div>
                                <label for="example-number-input" class="col-lg-1 col-form-label">Nome Voo</label>
                                <div class="col-lg-4">
                                    <input class="form-control" type="text" value="TEsteBeta" id="VoosNomeVoo">
                                </div>
                            </div>
                            <!--Partida &  Destino & nome Voo-->
                            <div class="row">                
                                <label for="example-number-input" class="col-lg-2 col-form-label">Fornecedor</label>
                                <div class="col-lg-3">
                                    <input class="form-control" type="hidden"  id="VoosFornecedorID">
                                    <input class="form-control fornecedor" type="text"  id="VoosFornecedor">
                                </div>
                                 <div class="col-lg-1">
                                    <button type="button" class="AddBtnFornecedor" style="padding: 0px"><img class="AddIcon 3" src="img\add_btn.png" alt="Guardar"></button>
                                </div>
                                <label for="example-text-input" class="col-lg-1 col-form-label">Preço</label>
                                <div class="col-lg-4">
                                    <div class="col-lg-6">
                                        <input type="text" class="form-control" value="150"  min="0" step=0.01  id="VoosValor" />
                                    </div>
                                    <div class="col-lg-6">
                                        <select name="Moeda" id="VoosMoedaCompra" class="moneyCtrl form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <!--Preço  &  Iva & Inclusao-->
                            <div class="row">
                                <label for="example-number-input" class="col-lg-1 col-form-label">Número de lugares</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" value="60" id="VoosNLugares">
                                </div>
                                <label for="example-number-input" class="col-lg-1 col-form-label">Disponibilidade</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" value="60" id="VoosDisponibilidade">
                                </div>
                                <label for="example-number-input" class="col-lg-1 col-form-label">Margem</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" id="VoosMargemVenda" value="0"  min="0" step=0.01>
                                </div>

                                <label for="example-number-input" class="col-lg-1 col-form-label">taxas A</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" id="VoosTaxaA" value="0"  min="0" step=0.01>
                                </div>
                                <label for="example-number-input" class="col-lg-1 col-form-label">taxas B</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" id="VoosTaxaB" value="0"  min="0" step=0.01>
                                </div>
                            </div>
                            <div class="row">


                                <label for="MarkupAloj" class="col-lg-1 col-form-label">Markup</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" value="0" id="VoosMarkup" value="0"  min="0" step=0.01>
                                </div>
                                <label for="MargemAloj" class="col-lg-1 col-form-label">net</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" id="VoosNet" value="0"  min="0" step=0.01>
                                </div>
                                <label for="example-number-input" class="col-lg-1 col-form-label">Comisão</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" value="0"  min="0" step=0.01 id="VoosCommisao">
                                </div>
                                <label for="example-text-input" class="col-lg-1 col-form-label">Iva</label>
                                <div class="col-lg-1">
                                    <select name="Estado" id="VoosIva" class="IVA form-control">
                                    </select>
                                </div>
                                <label for="example-text-input" class="col-lg-1 col-form-label">Tipo de Iva</label>
                                <div class="col-lg-2">
                                    <select name="Estado"  id="VoosTipoIva" class="TipoIVA form-control">

                                    </select>
                                </div>

                            </div>
                            <div class="row">
                                <label for="example-number-input" class="col-lg-1 col-form-label">Número de Aviao</label>
                                <div class="col-lg-2">
                                    <input class="form-control" type="number" value="60" id="VoosNumeroAviao">
                                </div>
                            </div>
                            <div class="row">
                                <label for="example-number-input" class="col-lg-1 col-form-label">Observações</label>
                                <div class="col-lg-5">
                                    <textarea class="form-control" id="VoosObservacoes" rows="3"></textarea>
                                </div>
                            </div>

                        </div>


                        <!--addicionar-->
                        <div class="row">
                            <div class="col-lg-4">
                                <button class="AddVoo" type="button" id="AddVoo">Adicionar</button>
                            </div>
                        </div>
                        <!--Tabela-->
                        <div class="row">
                            <div class="col-lg-12">
                                <table id="VoosRecords">
                                    <tr>
                                        <th>Partida/Destino</th>
                                        <th>Nome Voo</th>
                                        <th>Valor/Moeda</th>
                                        <th>Capacidade</th>
                                        <th>PAX</th>
                                        <th>Margem</th>
                                        <th class="paraVenda">Total</th>
                                        <th class="paraVenda">Total Pessoa</th>
                                        <th class="Lucro">Total</th>
                                        <th class="Lucro">Total Pessoa</th>
                                        <th class="Lucro">Lucro</th>
                                        <th>Observaçoes</th>
                                        <th>Operaçoes</th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
<!-- diarias-->
                <div id="Diarias" class="tabcontent">
                    <asp:HiddenField ID="HiddenDiarias" runat="server" />
                    <div class="TitleTabela">Diarias</div>
                    <div class="projectDia">

                    </div>
                    <!-- Pop Up diarias -->
                    <div id="AddicionarItemDiario" class="modal">

                        <!-- Modal content -->
                        <div class="modal-content2">
                            <span class="close ClosebtnDiaria">&times;</span>
                            <div class="TitleTabela">Adicionar Item diario</div>
                            <input type="hidden" id="DiariaAuxDia" />
                            <input type="hidden" id="DataDeexecucao" />
                            <div class="panel-body">
                                <!-- Fornecedor & Commissao-->
                                <div class="row">
                                <label for="example-number-input" class="col-lg-2 col-form-label">Fornecedor</label>
                                <div class="col-lg-3">
                                    <input type="hidden" class="form-control" id="DiariaFornecedorID"/>
                                    <input class="form-control fornecedor" type="text" id="DiariaFornecedor"/>
                                </div>
                                 <div class="col-lg-1">
                                    <button type="button" class="AddBtnFornecedor" style="padding: 0px"><img class="AddIcon 4" src="img\add_btn.png" alt="Guardar"/></button>
                                </div>
                                    <label for="MargemAloj" class="col-lg-1 col-form-label">Comisão</label>
                                    <div class="col-lg-2">
                                        <input class="form-control" type="number" id="DiariaComisao" value="0" min="0" step="0.01"/>
                                    </div>

                                </div>
                                <!--Preço  &  Iva-->
                                <div class="row">
                                    <label for="example-text-input" class="col-lg-2 col-form-label">Preço</label>
                                    <div class="col-lg-4">
                                        <div class="col-lg-6">
                                            <input type="text" class="form-control" id="DiariaValor" name="price" />
                                        </div>
                                        <div class="col-lg-6">
                                            <select name="Moeda" id="DiariaMoeda" class="moneyCtrl form-control">
                                            </select>
                                        </div>
                                    </div>
                                    <label for="example-number-input" class="col-lg-1 col-form-label">Iva</label>
                                    <div class="col-lg-2">
                                        
                                            <select name="Estado" id="DiariaIva" class="IVA form-control">

                                            </select>
                                       
                                    </div>
                                    <label for="example-number-input" class="col-lg-1 col-form-label">Markup</label>
                                    <div class="col-lg-2">
                                        <input class="form-control" type="number" value="" id="DiariaMarkup"/>
                                    </div>
                                </div>
                                <!--Margem &  markup-->
                                <div class="row">

                                    <label for="example-number-input" class="col-lg-2 col-form-label">Nome do Serviço</label>
                                    <div class="col-lg-4">
                                        <input class="form-control" type="text" value="" id="DiariaNomeServico"/>
                                    </div>
                                    <label for="example-number-input" class="col-lg-1 col-form-label">Margem</label>
                                    <div class="col-lg-2">
                                        <input class="form-control" type="number" value="08" id="DiariaMargem"/>
                                    </div>
                                    <label for="MargemAloj" class="col-lg-1 col-form-label">net</label>
                                    <div class="col-lg-2">
                                        <input class="form-control" type="number" id="DiariaNet" value="0"  min="0" step="0.01"/>
                                    </div>

                                </div>

                                <!--Descriçao  capacidade-->
                                <div class="row">
                                    <label for="example-number-input" class="col-lg-2 col-form-label">Observaçoes</label>
                                    <div class="col-lg-4">
                                        <textarea class="form-control" id="DiariaObservaçoes"style="max-width:350px;" rows="3"></textarea>
                                    </div>
                                    <label for="example-number-input" class="col-lg-2 col-form-label">Quantidade</label>
                                    <div class="col-lg-4">
                                        <input class="form-control" type="number" value="" id="DiariaQuantidade"/>
                                    </div>
                                    </br>
                                    <label for="example-datetime-local-input" class="col-lg-2 col-form-label">Data</label>
                                    <div class="col-lg-3">
                                        <input class="form-control" type="date" value="2011-08-19" id="DiariaData"/>
                                    </div>
                                </div>

                                <!--addicionar-->
                                <div class="row">
                                <div class="col-lg-4">
                                    <button class="AddDiaria" type="button" id="AddDiaria">Adicionar</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
<!-- servicos-->
                <div id="Servicos" class="tabcontent">
                    <asp:HiddenField ID="HiddenServicos" runat="server" />
                    <div class="TitleTabela">Serviços touch</div>
                        <div class="panel-body">
                            <!-- Fornecedor & tipo de Serviço-->
                            <div class="row">
                                <label for="example-text-input" class="col-lg-2 col-form-label">Fornecedor</label>
                                <div class="col-lg-3">
                                    <input type="hidden" class="form-control" id="ServicosFornecedorID"/>
                                    <input class="form-control fornecedor" type="text" id="ServicosFornecedor"/>
                                </div>                                
                                 <div class="col-lg-1">
                                    <button type="button"  class="AddBtnFornecedor" style="padding: 0px"><img class="AddIcon 5" src="img\add_btn.png" alt="Guardar"></button>
                                </div>
                                <label for="example-text-input" class="col-lg-2 col-form-label">Tipo de Serviço</label>
                                <div class="col-lg-4">
                                    <select name="TipoServico" id="ServicosTipoServico" class="form-control">
                                    </select>
                                </div>
                            </div>
                            <!--Preço  &  Iva-->
                            <div class="row">
                                <label for="example-text-input" class="col-lg-2 col-form-label">Preço</label>
                                <div class="col-lg-4">
                                    <div class="col-lg-6">
                                        <input type="text" class="form-control" id="ServicosValor" name="price" />
                                    </div>
                                    <div class="col-lg-6">
                                        <select name="Moeda" id="ServicosMoeda" class="moneyCtrl form-control">
                                        </select>
                                    </div>
                                </div>
                                <label for="MargemAloj" class="col-lg-1 col-form-label">net</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" id="ServicosNet" value="0"  min="0" step="0.01"/>
                                </div>
                                <label for="MargemAloj" class="col-lg-1 col-form-label">Comisão</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" id="ServicosComisao" value="0" min="0" step="0.01"/>
                                </div>

                            </div>
                            <!--Margem &  markup-->
                            <div class="row">
                                <label for="example-number-input" class="col-lg-2 col-form-label">Margem</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" value="08" id="ServicosMargem"  min="0" step="0.01"/>
                                </div>
                                <label for="example-number-input" class="col-lg-1 col-form-label">Markup</label>
                                <div class="col-lg-2">
                                    <input class="form-control" type="number" value="" id="ServicosMarkup"/>
                                </div>
                                <label for="example-text-input" class="col-lg-1 col-form-label">Iva</label>
                                <div class="col-lg-2">
                                    <select name="Estado" id="ServicosIva" class="IVA form-control">

                                    </select>
                                </div>
                            </div>

                            <!--Descriçao  capacidade-->
                            <div class="row">
                                <label for="example-number-input" class="col-lg-2 col-form-label">Descriçao</label>
                                <div class="col-lg-4">
                                    <textarea class="form-control" style="max-width:500px;" id="ServicosObservacoes" rows="3"></textarea>
                                </div>
                                <label for="example-number-input" class="col-lg-2 col-form-label">Quantidade</label>
                                <div class="col-lg-4">
                                    <input class="form-control" type="number" value="" id="ServicosQuantidade"/>
                                </div>
                            </div>
                            <!--addicionar-->
                            <div class="row">
                                <div class="col-lg-4">
                                    <button class="AddServicos" type="button" id="AddServicos">Adicionar</button>
                                </div>
                            </div>
                            <!--Tabela-->
                            <div class="row">
                                <div class="col-lg-12">
                                    <table id="ServicosRecords">
                                        <tr>
                                            <th>Nome Fornecedor</th>
                                            <th>Nome Serviço</th>
                                            <th>Valor/Moeda</th>
                                            <th>Capacidade</th>
                                            <th>PAX</th>
                                            <th style="width: 75px;">Margem</th>
                                            <th class="paraVenda">Total</th>
                                            <th class="paraVenda">Total Pessoa</th>
                                            <th class="Lucro">Total</th>
                                            <th class="Lucro">Total Pessoa</th>
                                            <th class="Lucro">Lucro</th>
                                            <th>Observaçoes</th>
                                            <th>Operaçoes</th>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                    </div>
                </div>
<!-- report geral-->
                <div id="Ver" class="tabcontent">
                    <div class="TitleTabela">Visualização</div>
                    <p>Tabela do report.</p>
                    <div class="row">
                        <div class="RecTotais"><label id="totalLucro" class="totalLucroLbl" value="0"/></div>
                        <div class="RecTotais"><label id="TotalVenda" class="TotalVendaLbl" value="0"/></div>
                        <div class="RecTotais"><label id="TotalGasto" class="TotalGastoLbl" value="0"/></div>
                    </div>
                    <div class="VerTab">
                        <div class="DayHeader"> Alojamento
                        </div>
                        <table class="" id="AlojamentoVerRecords">
                            <tbody>
                                    <tr>
                                        <th>Hotel</th>
                                        <th>Tipo</th>
                                        <th>Roomnights</th>
                                        <th>Valor/Moeda</th>
                                        <th>Margem</th>
                                        <th class="paraVenda">Total</th>
                                        <th class="paraVenda">Total Pessoa</th>
                                        <th class="Lucro">Total</th>
                                        <th class="Lucro">Total Pessoa</th>
                                        <th class="Lucro">Lucro</th>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="VerTab">
                        <div class="DayHeader"> Voos
                        </div>
                        <table class="" id="VoosVerRecords">
                            <tbody>
                                <tr>
                                    <th>Partida/Destino</th>
                                    <th>Nome Voo</th>
                                    <th>Valor/Moeda</th>
                                    <th>Capacidade</th>
                                    <th>PAX</th>
                                    <th>Margem</th>
                                    <th class="paraVenda TotalCompra">Total</th>
                                    <th class="paraVenda">Total Pessoa</th>
                                    <th class="Lucro TotalVenda">Total</th>
                                    <th class="Lucro">Total Pessoa</th>
                                    <th class="Lucro TotalLucro">Lucro</th>
                                    <th>Observaçoes</th>
                                    <th>Operaçoes</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="VerTab">
                        <div class="DayHeader"> Diarias
                        </div>
                        <table class="" id="DiariaVerRecords">
                            <tbody>
                                <tr>
                                    <th>Fornecedor</th>
                                    <th>Nome Serviço</th>
                                    <th>Valor/Moeda</th>
                                    <th>Quantidade</th>
                                    <th>PAX</th>
                                    <th>Margem</th>
                                    <th class="paraVenda TotalCompra">Total</th>
                                    <th class="paraVenda">Total Pessoa</th>
                                    <th class="Lucro TotalVenda">Total</th>
                                    <th class="Lucro">Total Pessoa</th>
                                    <th class="Lucro TotalLucro">Lucro</th>
                                    <th>Observaçoes</th>
                                    <th>Operaçoes</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="VerTab">
                        <div class="DayHeader"> Servicos
                        </div>
                        <table class="" id="ServicosVerRecords">
                            <tbody>
                                <tr>
                                    <th>Nome Fornecedor</th>
                                    <th>Nome Serviço</th>
                                    <th>Valor/Moeda</th>
                                    <th>Quantidade</th>
                                    <th>PAX</th>
                                    <th>Margem</th>
                                    <th class="paraVenda TotalCompra">Total</th>
                                    <th class="paraVenda">Total Pessoa</th>
                                    <th class="Lucro TotalVenda">Total</th>
                                    <th class="Lucro">Total Pessoa</th>
                                    <th class="Lucro TotalLucro">Lucro</th>
                                    <th>Observaçoes</th>
                                    <th>Operaçoes</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
<!-- Report fornecedores-->
                <div id="Report" class="tabcontent">
                    <div class="TitleTabela">Report Fornecedores</div>
                    <table class="" id="FornecedoresRecords">
                            <tbody>
                                <tr>
                                    <th>Nome de Fornecedor</th>
                                    <th>Lista Despesas</th>
                                    <th>Total a Dever</th>
                                </tr>
                                <tr>
                                    <td>Vorwerk</td>
                                    <td>
                                        <table class="ListaDividas">
                                            <tbody>
                                                <tr>
                                                    <th>Notas Pagamento</th>
                                                    <th>Data</th>
                                                    <th>Valor</th>
                                                </tr>
                                                <tr>
                                                    <td>Notas Pagamento 1</td>
                                                    <td>data1</td>
                                                    <td>55</td>
                                                </tr>
                                                <tr>
                                                    <td>Notas Pagamento 2</td>
                                                    <td>data2</td>
                                                    <td>550</td>
                                                </tr>
                                                <tr>
                                                    <td>Notas Pagamento 3</td>
                                                    <td>data3</td>
                                                    <td>100</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>705</td>
     
                                </tr>
                                <tr>
                                    <td>Teste</td>
                                    <td>
                                        <table class="ListaDividas">
                                            <tbody>
                                                <tr>
                                                    <th>Notas Pagamento</th>
                                                    <th>Data</th>
                                                    <th>Valor</th>
                                                </tr>
                                                <tr>
                                                    <td>Notas Pagamento 1</td>
                                                    <td>data1</td>
                                                    <td>55</td>
                                                </tr>
                                                <tr>
                                                    <td>Notas Pagamento 2</td>
                                                    <td>data2</td>
                                                    <td>550</td>
                                                </tr>
                                                <tr>
                                                    <td>Notas Pagamento 3</td>
                                                    <td>data3</td>
                                                    <td>100</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>705</td>
 
                                </tr>
                            </tbody>
                        </table>
                </div>
                <div id="History" class="tabcontent">
                </div>
<!--Pop Ups-->
                <div id="NovoPagamento" class="modal">
                            <div  class="modal-content2">
                                <!-- Modal content -->
                                <span class="close CloseNewHotel">&times;</span>
                                <div class="panel-body">
                                    <div class="TitleTabela">Adicionar Novo Pagamento</div>
                                    <div class="row">
                                        <label for="example-text-input" class="col-lg-2 col-form-label">Nota Pagamento</label>
                                        <div class="col-lg-2">
                                            <input type="text" class="form-control" id="notaPagamento" name="Hotel" />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label for="example-text-input" class="col-lg-2 col-form-label">Data</label>
                                        <div class="col-lg-6">
                                            <input type="date" class="form-control" id="dataPagamento" name="dataPagamento" />
                                        </div>
                                        <label for="example-text-input" class="col-lg-2 col-form-label">valor</label>
                                        <div class="col-lg-2">
                                            <input type="number" value="0" min="0" step="0.01" class="form-control" id="ValorPagamento" name="ValorPagamento" />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label for="example-text-input" class="col-lg-2 col-form-label">Anexo</label>
                                        <div class="col-lg-6">
                                            <input type="file" class="PagamentoAnexo" id="PagamentoAnexo" name="Anexo" />
                                        </div>

                                    </div>

                                    <div class="row">

                                        <div class="col-lg-4">
                                            <button  type="button" class="AddFornecedor" id="TabelaFornecedor">Adicionar Pagamento</button>
                                            <img class="FornecedorCheck" src="img\check.png" alt="Guardar"/>
                                            <img class="FornecedorError" src="img\remove.png" alt="Guardar"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>
                <div id="NovoFornecedorModel" class="modal">
                            <div  class="modal-content2">
                                <!-- Modal content -->
                                <span class="close CloseNewHotel">&times;</span>
                                <div class="panel-body">
                                    <div class="TitleTabela">Adicionar Novo Terceiro</div>
                                    <div class="row">
                                            <label for="example-text-input" class="col-lg-2 col-form-label">Nome do Terceiro</label>
                                            <div class="col-lg-4">
                                                <input type="text" class="form-control" id="FornecedorNome" name="Hotel" />
                                                <input type="hidden"  id="FiredInsert" />
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
                                    <div class="row">

                                        <div class="col-lg-4">
                                            <button  type="button" class="AddFornecedor" id="TabelaFornecedor">Adicionar Fornecedor</button>
                                            <img class="FornecedorCheck" src="img\check.png" alt="Guardar">
                                            <img class="FornecedorError" src="img\remove.png" alt="Guardar">
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>
                <div id="InfoBlock" class="modal">
                    <div  class="modal-content2">
                       
                        <div class="panel-body">
                            
                            <textarea class="form-control" name="" id="textMsg"  rows="5"></textarea>
                        </div>
                    </div>
                </div>
                <div id="ComoGuardar" class="modal">
                            <div  class="modal-content3">
                                <!-- Modal content -->
                                <span class="close CloseSaveModel">&times;</span>
                                <div class="panel-body">
                                    <div class="TitleTabela">Como Guardar?</div>
                                    <div class="row">

                                        <div class="col-lg-6">
                                            <button class="GuardarNovo" type="button" id="SaveNewOrcamento">Guardar Novo Orçamento</button>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                </div>

                <div id="ComoImprimir" class="modal">
                            <div  class="modal-contentGuardar">
                                <!-- Modal content -->
                                <span class="close CloseSaveExcel">&times;</span>
                                <div class="panel-body">
                                    <div class="TitleTabela">Como imprimir?</div>
                                    <div class="row">

                                        <div class="col-lg-6">
                                            <button class="GuardarNovo" type="button" id="PrintThisExcel">Apenas este Orçamento</button>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                </div>
                <div id="AcordoComercial" class="modal">
                    <div  class="modal-content4">
                        <!-- Modal content -->
                        <span class="close CloseAlojAcordo">&times;</span>
                            <div class="TitleTabela">Acordo Comercial</div>
                            <div class="row">
                                 <input type="hidden" value="" class="uiitemlabel"/>
                                 <input type="hidden" value="" class="uiitemvalue"/>



                                <input type="hidden" value="" class="AuxAcordo"/>
                                
                                <div class="col-lg-2">
                                    <select name="Moeda" id="AlojamentoMoedaCompra" class="moneyCtrl form-control">
                                    </select>
                                </div>
                               <label for="Almoço" class="col-lg-1 col-form-label">P.A. Incluido?</label>
                                <div class="col-lg-1">
                                    <input type="checkbox" value="false" id="AlmocoChk"/>
                                </div>
                                <label for="example-text-input" class="col-lg-1 col-form-label">Iva</label>
                                <div class="col-lg-1">
                                    <select name="Estado" id="IvaAloj" class="IVA form-control">
                                    </select>
                                </div>
                                <label for="MarkupAloj" class="col-lg-1 col-form-label">Markup</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" value="0" id="MarkupAloj"/>
                                </div>
                                <label for="MargemAloj" class="col-lg-1 col-form-label">net</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" value="0" id="AlojomanentoNet"  min="0" step=0.01 />
                                </div>
                            </div>
                            <!--Piqueno Almoço &  Margem venda-->
                            <div class="row">
                                <label for="MargemAloj" class="col-lg-1 col-form-label">Margem de venda</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" value="0" id="MargemAloj" min="0" step=0.01/>
                                </div>
                                <label for="MargemAloj" class="col-lg-1 col-form-label">Comisão</label>
                                <div class="col-lg-1">
                                    <input class="form-control" type="number" id="ALojamentoComisao" value="0" min="0" step="0.01"/>
                                </div>
                                <label for="example-text-input" class="col-lg-1 col-form-label">Tipo de Iva</label>
                                <div class="col-lg-2">
                                    <select name="Estado" id="AlojamentoTipoIva" class="TipoIVA form-control">
                                    </select>
                                </div>
                            </div>
                            <!--Observaçoes-->
                            <div class="row">
                                <label for="example-number-input" class="col-lg-1 col-form-label">Observações</label>
                                <div class="col-lg-5">
                                    <textarea class="form-control" id="AlojamentoObservacoes" rows="3"></textarea>
                                </div>
                            </div>
                            <div class="row">                                     
                                <div class="col-lg-6">
                                    <button class="GuardarTipologiaAlojamento" type="button" id="GuardarOrcamentoAlojamento">Guardar Acordo</button>
                                </div>
                            </div>
                        </div>
                    </div>
                 <div id="PopUpTipologia" class="modal">
                    <div  class="modal-content5">
                        <!-- Modal content -->
                        <span class="close ClosePopUpTipologia">&times;</span>
                            <div class="TitleTabela">Inserir Tipologia</div>
                            <div class="row">
                                
                                <input type="hidden" value="" id="TabelaInvoker"/>
 
                                <label for="MarkupAloj" class="col-lg-2 col-form-label">Descrição</label>
                                <div class="col-lg-3">
                                    <input class="form-control" type="text" value="" id="NomeTipologia"/>
                                </div>
                                <label for="MargemAloj" class="col-lg-2 col-form-label">Capacidade</label>
                                <div class="col-lg-3">
                                    <input class="form-control" type="number" value="0" id="CapacidadeTipologia"  min="1" />
                                </div>
                            </div>
                            <div class="row">                                     
                                <div class="col-lg-6">
                                    <button class="GuardarTipologiaAlojamento" type="button" id="InserirTipologiaBTN">Inserir Tipologia</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    
<!--Scripts-->
    </form>
    <script type="text/javascript" src="javascript\scripts.js"></script>
</body>
</html>
