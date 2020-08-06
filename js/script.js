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
		// Click exectutes ajax POST with the current content from input field
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
				// loadMessages();
				
			},
			error: function( jqXhr, textStatus, errorThrown ){
				console.log( errorThrown );
			}
		});
	});
});

// Function for Displaying messages stored on the server
// TODO: If  a timestamp is given then use different url with a limit, possibly with inline if
function loadMessages (timestamp) {
	$.get(urlPost + '?token=' + token, function(data, status){
	// Success: Sent messages are beeing displayed in console
	console.log("Data: " + data + "\nStatus: " + status);
	console.log(data);

	// Setting  up the DOM to display these messages (WIP)
	var msgWrapper = document.createElement("div");
				
	$.each(data, function(index) {
		var msg = document.createElement("ul");
		msg.className = "mmsg msg_" + index;
		msg.innerHTML += '<li> ' + data[index].author + '</li>';
		msg.innerHTML += '<li> ' + data[index].message + '</li>';
		msg.innerHTML += '<li> ' + data[index].timestamp + '</li>';
			
		console.log(data[index]);
		
		msgWrapper.append(msg);
		
	});
	// Append the Messages in dedicated box	
	$(".messagesContainer").append(msgWrapper);			

	});
}