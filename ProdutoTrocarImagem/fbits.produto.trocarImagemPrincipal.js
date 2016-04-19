var tamanhoImagemAtributo = '70';
var tamanhoImagemPrincipal = '460';

var oldSrc = '';
$('body').on('hover', '.valorAtributoFoto', function(e) {
    if (e.type == "mouseenter") {
     oldSrc =  $('#zoomImagemProduto').attr('src');
    var novaUrl = $(this).css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '').replace(tamanhoImagemAtributo,tamanhoImagemPrincipal);
    $('#zoomImagemProduto').attr('src', novaUrl);
    }
    else { // mouseleave
       $('#zoomImagemProduto').attr('src', oldSrc);
    }
});

$(".valorAtributoFoto").each(function(index, item){ 
	var image = new Image(); 
	image.src = $(item).css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '').replace(tamanhoImagemAtributo,tamanhoImagemPrincipal);
});
  
var oldSrc = '';
$('body').on('hover', '.fbits-produto-imagensMinicarrossel-item', function(e) {
    if (e.type == "mouseenter") {
		oldSrc =  $('#zoomImagemProduto').attr('src');
    var novaUrl = $(this).find('a').data('image');
    $('#zoomImagemProduto').attr('src', novaUrl);
    }
    else { // mouseleave
       $('#zoomImagemProduto').attr('src', oldSrc);
    }
});
  $('body .fbits-produto-imagensMinicarrossel-item a').click( function(e) {
    var novaUrl = oldSrc = $(this).find('a').data('image');console.log(oldSrc);
    $('#zoomImagemProduto').attr('src', novaUrl);
});
$('.fbits-produto-imagensMinicarrossel-item>a').each(function(index, item){ 
	var image = new Image(); 
	image.src = $(item).data('image'); 
});