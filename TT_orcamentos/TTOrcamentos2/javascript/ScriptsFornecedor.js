$(document).ready(function () {
    $("#tabs").tabs();
    loadPageAuxTables();


    var json = $("#HiddenInfo").val();
    var res = JSON.parse(json);


    $("#Fornecedorid").val(res.Id);

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
});














function loadPageAuxTables() {

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

