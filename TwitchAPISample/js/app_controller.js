/**
 * app_controller.js
 *
 * Control functionality for the whole app, with all the features working together.
 */
////////////////////////////////// CONST /////////////////////////////////////
 const DATA_RECEIVED = 'ondata';
////////////////////////////////// VARS ///////////////////////////////////////
//The event which will be thrown upon receipt of data to notify all features.
var DataReceivedEvent = new Event(DATA_RECEIVED);
//The control element for the events regarding data in this app
var AppEventHandler = document.getElementById('data_received_controller');
//True, if there is currently a request in progress.
var RequestInProgress = false;
// The raw response object from the server.
var RawResponse;
 //////////////////////////////// INIT ///////////////////////////////////////

 ////////////////////////////// FUNCTIONS ////////////////////////////////////
/**
 * Determines whether or not there is a valid response object associated with the last search
 *
 * @return 	True, if there exists a valid response for the jsonp request that was executed
 */
function HasValidResponse(){
	return !(RequestInProgress || typeof(RawResponse) === 'undefined' || RawResponse == null || IsErrorResponse(RawResponse));
}
