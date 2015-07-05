// ==UserScript==
// @name         Mikelarg copy product SFC
// @version      1.0.2
// @description  Product Copy SFC
// @author       Mikelarg
// @match        https://fulfill.sfcservice.com/*
// @match        https://fulfill.sendfromchina.com/*
// @require http://code.jquery.com/jquery-latest.js
// @updateURL		https://raw.githubusercontent.com/Mikelarg/SFCProductCopy/master/sfc_product_copy.meta.js
// @downloadURL		https://raw.githubusercontent.com/Mikelarg/SFCProductCopy/master/sfc_product_copy.user.js
// ==/UserScript==
function generate_product_string() {
	var products = [];
	jQuery('textarea, input[type=text]').each(function(index) {
		var product = new Object();
		product.name = jQuery(this).attr('name');
		product.value = jQuery(this).val();
		products[index] = product;
	});
	return JSON.stringify(products);
}

function set_product_from_string(jsonString) {
	var products = JSON.parse(jsonString);
    for (var i = 0; i < products.length; i++) {
    	var product = products[i];
    	jQuery('textarea[name='+product.name+'], input[name='+product.name+']').val(product.value);
    }
    jQuery('textarea, input[type=text]').trigger('submit');
}
jQuery(document).ready(function() {
	jQuery('body').prepend('<div id="copy_button" style="cursor: pointer; position: fixed;background-color: black;color: white;padding: 5px 20px; border-radius: 2px;  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.39); z-index: 1000; right: 0.5%; bottom: 5px;">Copy</div>');
	jQuery('body').prepend('<div id="set_button" style="cursor: pointer; position: fixed;background-color: black;color: white;padding: 5px 20px; border-radius: 2px;  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.39); right: 0.5%; z-index: 1000; bottom: 40px;">Set</div>');
	jQuery('#copy_button').click(function () {
		window.prompt("Copy to clipboard: Ctrl+C, Enter", generate_product_string());
	});
	jQuery('#set_button').click(function () {
		var productString = window.prompt("Set product string", "");
		if(productString!="") set_product_from_string(productString);
	});
});