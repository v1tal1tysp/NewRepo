<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="TTOrcamentos2.login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Login</title>
    <link rel="stylesheet" href="css\style.css"/>
    <link rel="stylesheet" href="css\bootstrap.min.css"/>

    <script type="text/javascript" src="javascript\jquery-3.2.0.min.js"></script>
    <script type="text/javascript" src="javascript\bootstrap.js"></script>
</head>
<body class="body">
    <img src="img\background.jpg" id="bg" alt=""/>
    <form id="form1" runat="server">
    <div class="Login">
    	<div class="vertical-alignment-helper">
        <div class="modal-dialog vertical-align-center">
            <div class="modal-content">
                <div class="modal-header">
                	<h4 class="modal-title" id="myModalLabel">Entrada Touchgroup Orçamentos</h4>

                </div>
                <div class="modal-body">

									
					<p><input id="Usename" runat="server" class="LoginUserInput" type="text" name="login" value="" placeholder="Username"/></p>
        			<p><input id="Password" runat="server" class="LoginUserInput" type="password" name="password" value="" placeholder="Password"/></p>

        			<p class="submit"><input type="submit" name="commit"  class="btnSubmit" value="Login"/></p>

				</div>

            </div>
        </div>
    </div>
         </div>
    </form>
</body>
</html>

