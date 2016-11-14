/**
 * app_controller.js
 *
 * Control functionality for the whole app, with all the features working together.
 */
////////////////////////////////// CONST /////////////////////////////////////
 const DATA_RECEIVED = 'ondata';
 const ERROR_RECEIVED = 'onerror';
 const CONFIG_ERR_ELEM = "config_err_elem";
 const DATA_ELEM = "data_received_controller";
////////////////////////////////// VARS ///////////////////////////////////////
//The event which will be thrown upon receipt of data to notify all features.
var DataReceivedEvent = new Event(DATA_RECEIVED);
//The event which will be thrown if an error is received
var ErrorReceivedEvent = new Event(ERROR_RECEIVED);
//The control element for the events regarding data in this app
var AppEventHandler = document.getElementById(DATA_ELEM);
//True, if there is currently a request in progress.
var RequestInProgress = false;
// The raw response object from the server.
var RawResponse;
// The display element for an error message on the page.
var ErrorDisplay = GetConfiguredElement(CONFIG_ERR_ELEM);
 //////////////////////////////// INIT ///////////////////////////////////////
AppEventHandler.addEventListener(ERROR_RECEIVED,ShowError,false);
AppEventHandler.addEventListener(DATA_RECEIVED, HideError, false)
 ////////////////////////////// FUNCTIONS ////////////////////////////////////
/**
 * Determines whether or not there is a valid response object associated with the last search
 *
 * @return 	True, if there exists a valid response for the jsonp request that was executed
 */
function HasValidResponse(){
	return !(RequestInProgress || typeof(RawResponse) === 'undefined' || RawResponse == null || IsErrorResponse(RawResponse));
}

/**
 * Determines if the response was an error, displaying an element to notify the user if so.
 *
 * @param	evt 	OPTIONAL	Not used (event listener)
 */
function ShowError(evt = null){
	ErrorDisplay.hidden = false;
}

/**
 * Determines if the response was an error, displaying an element to notify the user if so.
 *
 * @param	evt 	OPTIONAL	Not used (event listener)
 */
function HideError(evt = null){
	ErrorDisplay.hidden = true;
}