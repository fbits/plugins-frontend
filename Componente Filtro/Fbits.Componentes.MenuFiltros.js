var Fbits = Fbits || {};
Fbits.Componentes = Fbits.Componentes || {};
Fbits.Componentes.MenuFiltros = {
	filtros: [],
    init: function (selectorAppend,filtros,somenteCategoriaPai, options) {
		this.filtros = filtros;
		this.selectorAppend = selectorAppend;
        if (options) {
            if (options.template) this.defaults.template = options.template;
        }
		var _filtros = [];
		for(var i in filtros){
			_filtros.push(filtros[i].filtro);
		}
		//async
		this.carregaDados(_filtros,somenteCategoriaPai);

    },
    version: '0.0.1',
    initMessage: '',
    defaults: {
        template: '',
        styleToTemplate: '<style></style>',
        css: { 'position': 'relative', 'border-radius': '5px', 'border': '#1e90ff 5px solid' }
    },
	carregaDados: function(filtros,somenteCategoriaPai){
		$.ajax({
			dataType: "json",
			traditional: true,
			type: "GET", 
			async: true,
			data: {'somenteCategoriaPai': somenteCategoriaPai, 'filtro': filtros},
			url: "/Busca/RetornaFiltros",
			
			success: function (dados) {
				if(dados.itens){
					Fbits.Componentes.MenuFiltros.montaHtml(dados.itens);
				}
			}
		})
	},
	montaHtml: function(itens){
		if(itens){
			var divContainer = document.createElement("div");
			divContainer.className="menuFiltroCustomizado";
			var divIcone = document.createElement("div");
			divIcone.className="menuFiltroIcone";
			divContainer.appendChild(divIcone);
			var divTitulo = document.createElement("div");
			divTitulo.className="menuFiltroTitulo";
			divContainer.appendChild(divTitulo);
			var divGrupoSelect = document.createElement("div");
			divGrupoSelect.className="grupoSelect";
			
			for(var i in itens){
				if(itens[i].valores){
					var selectList = document.createElement("select");
					selectList.className = "selectMenuFiltro-"+itens[i].filtro;
					divGrupoSelect.appendChild(selectList);
					var option = document.createElement("option");
					option.text = this.filtros[i].placeholder;
					option.value = "placeholder";
					selectList.appendChild(option);
					for (var o in itens[i].valores) {
						option = document.createElement("option");
						option.value = itens[i].filtro+":"+itens[i].valores[o];
						var valor = itens[i].valores[o];
						if(itens[i].chave.indexOf("Faixas de Preço")>-1){
							valor = valor.replace(/(\||)/g, "");
						}
						option.text = valor
						selectList.appendChild(option);
					}
				}
			}
			divContainer.appendChild(divGrupoSelect);
			var divBotaoBuscar = document.createElement("div");
			divBotaoBuscar.className="menuFiltroBuscar";
			divBotaoBuscar.innerHTML = "Buscar";
			divBotaoBuscar.onclick = Fbits.Componentes.MenuFiltros.aplicarFiltro;
			divContainer.appendChild(divBotaoBuscar);
			$(this.selectorAppend).append(divContainer);
		}
	},
	aplicarFiltro: function(){
		var query = '';
		$(".menuFiltroCustomizado .grupoSelect select option:selected").each(function(a,b){
			if(b.value!="placeholder"){
				query=  query+'&'+"filtro="+(b.value);
			}
		})
		if(query!=''){
			query = '/busca?busca='+query;
			window.location=query;
		}
		else{
			alert('Selecione pelo menos um filtro');
		}
		console.log(query);
		console.log('crick');
	}
};
$(function () {
	var filtros =[{
		filtro: 'Categoria',
		placeholder:'Categoria'
		},{
		filtro: 'Capacidade',
		placeholder:'Capacidade (BTU/h)'
		},{
		filtro: 'Ciclo',
		placeholder:'Ciclo'
		},{
		filtro: 'Marcas',
		placeholder:'Marca'
		},{
		filtro: 'Faixas de Preço',
		placeholder: 'Faixas de Preço'
		}];
//Ira dar um append com o conteudo do filtro no selector especificado.
var selectorAppend = ".menu-container";
    Fbits.Componentes.MenuFiltros.init(selectorAppend,filtros,true);
});
