/**
 * stream_controller.js
 *
 * Handles all things related to displaying/interacting with the
 * stream info response from the Twitch API call.
 */
//////////////////// Vars ///////////////////////


//////////////// Setup Code //////////////////////


//////////////// Functions //////////////////////
/**
 * Handles the updating of the visibility of the response container element
 */
function UpdateResponses(){
	if (RequestInProgress || (RawResponse === null && RawResponse === undefined)){
		document.getElementById("response-container").disabled = true;
	} else {
		document.getElementById("response-container").disabled = false;
	}
}
