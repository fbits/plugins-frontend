var Fbits = Fbits || {};
Fbits.Plugin = Fbits.Plugin || {};

Fbits.Plugin.AvisoAoComprar = {
    init: function (selector, options) {

        if (options) {
            if (options.template) this.defaults.template = options.template;
        }

        var mensagem = 'Este produto é ';
        if (Fbits.Produto.AtributosProduto.length > 0) {
            var cont = 0;
            $.each(Fbits.Produto.AtributosProduto[0], function (index, item) {
                if (cont > 0)
                    mensagem += ' - ';
                mensagem += item;
                cont++;
            });

            this.buyButton = $(selector);
            //var botaoComprar = $("[id^=produto-botao-comprar-]");
            this.buyButton.unbind("click");//Remove os eventos do botão.
            //Adiciona o novo evento ao botão.
            this.buyButton.click(function () {
                var template = Fbits.Plugin.AvisoAoComprar.defaults.template;
                template = template.replace('{{Mensagem}}', mensagem);
                $.fancybox(
                  template,
                  {
                      'autoDimensions': false,
                      'showCloseButton': false,
                      'width': '40%',
                      'height': 300,
                      'transitionIn': 'none',
                      'transitionOut': 'none'
                  }
                );
                $('body').append(Fbits.Plugin.AvisoAoComprar.defaults.styleToTemplate);
                $.each(Fbits.Plugin.AvisoAoComprar.defaults.css, function (index, item) {
                    $('#fancybox-outer').css(index, item);
                });
            });
        } else {
            this.initMessage = 'Não existem atributos JS cadastrados para este produto.';
        }
    },
    version: '0.0.1',
    initMessage: '',
    defaults: {
        template: '<div id="box-tensao-alert" width="40%" height="300px"><p class="box-tensao-alert-p"><img src="http://www.arcondicionado.com.br/skin/frontend/arcondicionado/default/images/voltagem_icon.png"></p><p class="box-tensao-alert-p" style="padding-bottom:0;color:#FFCA24;font-size:1.7em;letter-spacing:0.09em;font-weight:normal;padding-top:0;">Atenção</p><p class="box-tensao-alert-p" style="padding-bottom:0;color:#1e90ff;font-size:2em;font-weight:bold;padding-top:10px;">{{Mensagem}}</p><p class="box-tensao-alert-p" style="padding-top: 16px"><a onclick="javascript: Fbits.Plugin.AvisoAoComprar.addBuyEvent()" href="#add-to-cart"><img src="http://www.arcondicionado.com.br/skin/frontend/arcondicionado/default/images/voltagem_button.png"><a></p><p class="box-tensao-alert-p"><a onclick="$.fancybox.close()" href="javascript:void(0);">Cancelar</a></p></div>',
        styleToTemplate: '<style>#box-tensao-alert .box-tensao-alert-p{text-align:center;margin:0; padding:0;width:100%!important;float:none!important;font-size: 1em;font-family:fontstyle_thin;}</style>',
        css: { 'position': 'relative', 'border-radius': '5px', 'border': '#1e90ff 5px solid' }
    },
    buyButton: '', 
    addBuyEvent: function () { comprarProduto($(this.buyButton).parents('[id^="produto-item-"]'), true, this.buyButton, "botaoComprar"); }
}

$(function () {
    Fbits.Plugin.AvisoAoComprar.init('[id^=produto-botao-comprar-]');
});