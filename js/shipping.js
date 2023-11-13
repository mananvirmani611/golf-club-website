// JavaScript Document

jQuery(document).ready(function() {
	toggleShipping();			
});

var toggleShipping = function(){
	tstatus = jQuery("#shippingCheckbox").is(':checked');
	if(tstatus){
		jQuery("#shippingAddress").show();
	}else{
		jQuery("#shippingAddress").hide();
	}
}