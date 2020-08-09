/*
**	------------------------------------------
**	Author: Bruno Götti
**	Date: 06.08.2020
**	Description: Basic Functionality
* 	ToDO
* 	- Encode special chars
* 	- Add load Messages with Timestamp function
* 	- Different class if self posted message ->> align right, bg color
* 	- Submit on enter
* 	- Clear text on submit
*	- jump to bottom after send
*	- ..	
**	------------------------------------------
*/


// VARIABLES
var urlPost 	= 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0';
var token 		= 'o8iBiCCNgaVj';


// Ready function for things to happen when the dom finishes loading
$(document).ready(function(){
	
	// Load the messages on page load
	loadMessages();
	
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
				loadMessages();
				
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
		msg.className = "msg msg_" + index;
		msg.innerHTML += '<li class="author"> ' + data[index].author + '</li>';
		msg.innerHTML += '<li class="msgtext"> ' + data[index].message + '</li>';
		msg.innerHTML += '<li class="timestamp"> ' + data[index].timestamp + '</li>';
			
		console.log(data[index]);
		
		msgWrapper.append(msg);
		
	});
	// Append the Messages in dedicated box	
	$(".messagesContainer").append(msgWrapper);			

	});
}