# dropdownlist_ibge
JS para criar campos select de cidades/estados em HTML de forma dinâmica com a API do IBGE

## Visualização de Exemplos:
https://eduardovk.github.io/dropdownlist_ibge/

## Utilização

O elemento html select que irá dispor os estados ou cidades pode ser declarado normalmente, utilizando qualquer id.

Ex.:

`<select id="estado"></option>`     
`<select id="cidade"></option>`

No final do elemento body, incluir o arquivo dropdown_ibge.js:

`<script src="dropdown_ibge.js"></script>`

Para vincular o select de estados, utilizar o método `selectEstados(id_elemento, tipo_value)`

Ex.:

`selectEstados("estado");`

O select de estados já está pronto. Para vincular o select de cidades, utilizar o método `selectCidades(id_elemento, uf, uf_select, tipo_value)`

Ex.:

`selectCidades('cidade', 'estado', true);`

Ambos selects agora estão prontos. Como o parâmetro "uf_select" do método selectCidades foi setado como "true", o select de cidades estará atrelado ao elemento informado
no parâmetro "uf", ou seja, no campo select de cidades só irão aparecer as cidades do estado selecionado no select de estados.

## Métodos

`selectEstados(id_elemento, tipo_value);`

Sendo:<br>
string id_elemento = ID do elemento HTML select dos estados<br>
string tipo_value(opcional) = ID, SIGLA(padrão) ou NOME<br>
<br><br>

`selectCidades(id_elemento, uf, uf_select, tipo_value)`

Sendo:<br>
string id_elemento = ID do elemento HTML select das cidades<br>
string uf(opcional) = nome, id, ou sigla do estado, ou id do elemento select dos estados<br>
boolean uf_select(opcional) = caso true, irá utilizar o select de estados (uf) para obter cidades<br>
string tipo_value(opcional) = ID, SIGLA(padrão) ou NOME<br>

## Observações

- Podem ser utilizados múltiplos campos select em uma mesma página, desde que cada um contenha um id diferente
- Podem ser utilizados ID ou NOME como value para cidade
- Podem ser utilizados ID, NOME ou SIGLA como value para estados
- Um select de cidades pode estar atrelado a um select de estados
- Um select de cidades pode exibir todas as cidades brasileiras, ou exibir as cidades de um estado previamente informado

Sinta-se à vontade para contribuir com este projeto!

Eduardo Vicenzi Kuhn<br>
2019
