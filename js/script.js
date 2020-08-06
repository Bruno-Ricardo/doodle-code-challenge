/*
**	------------------------------------------
**	Author: Bruno Götti
**	Date: 06.08.2020
**	Description: Basic Functionality
**	------------------------------------------
*/


// VARIABLES
var urlPost 	= 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0';
var token 		= 'o8iBiCCNgaVj';



// Ready function for things to happen when the dom finishes loading
$(document).ready(function(){
	
	// Click funtionality for submitting text via JQUERY AJAX (POST)
	// Some functionality to see if msg's can be sent 
	$(".mysubmit").click(function(){
		$.ajax({
			url: 			urlPost,
			dataType: 		'json',
			type: 			'post',
			contentType: 	'application/json',
			headers: 		{'token': token},
			data: 			JSON.stringify( { "message": $('.mytext').val(), "author": 'BrunoRicardo' } ),
			processData: 	false,
			success: 		function( data, textStatus, jQxhr ){
				
				//console.log(data);
				//console.log(textStatus);
				//console.log(jQxhr);
				
				// Test was successfull
				// Load messages next..
				

			},
			error: function( jqXhr, textStatus, errorThrown ){
				console.log( errorThrown );
			}
		});
	});
});
