$(document).ready(function () {
    $("#tabs").tabs();
    loadPageAuxTables();

    LoadFornecedorInfo();
    loadDespesas();
});



function LoadFornecedorInfo() {
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
}

function loadDespesas() {
    var json = $("#HiddenListaDividas").val();
    var res = JSON.parse(json);


    $.each(res, function (index, obj) {

        /*
        public ObjectId Id { get; set; }
        public string FornecedorId { get; set; }
        public string FornecedorName { get; set; }
        public string ProjectoId { get; set; }
        public string OrcamentoId { get; set; }
        public List<Servicos> servicos { get; set; }
        public double Total { get; set; }
        public bool   Active { get; set; }
        public string TipoMovimento { get; set; }
        */
        var text = "";
        var cambio;
        $.each(obj.servicos, function (index, servico) {
            text += servico.Name + " : " + parseFloat(servico.Valor).formatMoney(2, '.', ',') + "/" + servico.Cambio + "</br>";
            cambio = servico.Cambio;
        });

        $("#FornecedoresRecords tr:last").after('<tr>' +
            '<td>' + obj.NomeFile + '</td>' +
            '<td>' + obj.Ano + '</td>' +
            '<td>' + obj.Total.formatMoney(2, '.', ',') + "/" + cambio + '</td>' +
            '<td>' + "asd" + '</td>' +
            '</tr>');
    });

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

