/*
 * Drop-down list IBGE
 * @author Eduardo Vicenzi Kuhn
 * @link github.com/eduardovk
 */

function selectEstados(id_elemento, tipo_value = "SIGLA") {
    var placeholder = "Selecione o estado";
    var url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
    document.getElementById(id_elemento).innerHTML = "<option disabled selected>Carregando...</option>";
    httpGetRequest(id_elemento, placeholder, url, preencherSelect, tipo_value);
}

function selectCidades(id_elemento, uf = "", uf_select = false, tipo_value = "NOME") {
    var placeholder = "Selecione a cidade";
    if (uf === "") {
//buscar todas cidades
        var url = 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios';
        httpGetRequest(id_elemento, placeholder, url, preencherSelect, tipo_value);
    } else if (uf_select) {
//utilizar select de uf
        document.getElementById(id_elemento).innerHTML = "<option disabled selected>" + placeholder + "</option>";
        var select_uf = document.getElementById(uf);
        select_uf.onchange = function () {
            document.getElementById(id_elemento).innerHTML = "<option disabled selected>Carregando...</option>";
            var uf_value = select_uf[select_uf.selectedIndex].value;
            //se identificador do estado nao for numerico (pode ser sigla ou nome do estado)
            if (isNaN(uf_value)) {
                selectCidadesEstado(uf_value, id_elemento, placeholder, tipo_value);
                //caso identificador do estado seja numerico (id) faz request normalmente
            } else {
                var url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + uf_value + '/municipios';
                httpGetRequest(id_elemento, placeholder, url, preencherSelect, tipo_value);
            }
        };
        //buscar pela uf informada
    } else {
        //caso identificador do estado nao seja numerico (id)
        if (isNaN(uf)) {
            selectCidadesEstado(uf, id_elemento, placeholder, tipo_value);
            //caso identificador do estado seja numerico (id) faz request normalmente
        } else {
            var url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + uf + '/municipios';
            httpGetRequest(id_elemento, placeholder, url, preencherSelect, tipo_value);
        }
}
}

function preencherSelect(id_select, placeholder, response, tipo_value) {
    var select = document.getElementById(id_select);
    var options = "<option disabled selected>" + placeholder + "</option>";
    var resposta = JSON.parse(response);
    resposta.forEach(function (value) {
        var valor = null;
        if (tipo_value === "ID") {
            valor = value.id;
        } else if (tipo_value === "SIGLA") {
            valor = value.sigla;
        } else {
            valor = value.nome;
        }
        options += '<option value="' + valor + '">' + value.nome + '</option>';
    });
    select.innerHTML = options;
}

function httpGetRequest(id_elemento, placeholder, url, callback, tipo_value = "ID") {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(id_elemento, placeholder, xmlHttp.responseText, tipo_value);
        }
    };
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

function selectCidadesEstado(estado, id_elemento, placeholder, tipo_value) {
    var cod_uf;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            var resposta = JSON.parse(xmlHttp.responseText);
            //percorre estados comparando nome ou sigla para obter o id numerico
            resposta.forEach(function (value) {
                if (estado.length > 2) {
                    //procura por nome
                    if (value.nome === estado) {
                        cod_uf = value.id;
                    }
                } else {
                    //procura por sigla
                    if (value.sigla === estado) {
                        cod_uf = value.id;
                    }
                }
            });
            //procura cidades a partir do id numerico obtido
            var url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + cod_uf + '/municipios';
            httpGetRequest(id_elemento, placeholder, url, preencherSelect, tipo_value);
        }
    };
    xmlHttp.open("GET", 'https://servicodados.ibge.gov.br/api/v1/localidades/estados', true);
    xmlHttp.send(null);
}