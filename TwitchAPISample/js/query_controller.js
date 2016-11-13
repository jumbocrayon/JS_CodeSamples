/**
 * query_controller.js
 *
 * Responsible for the logic control functions associated with this prototype.
 */
//////////////////// Const ////////////////////////
//The element that will reference the id of the response container in the document
const RESPONSE_ELEM = "config_response_container_element";

//////////////////// Vars ///////////////////////
//The element representing the search button
var SearchButton = document.getElementById("search");
//The element representing the query input field
var QueryField = document.getElementById("query");
//The element that represents the jsonp request in the header
var JsonpHeader;
//The limit in place for the amount per page returned for the query
var QueryLimit = 10;

//////////////// Setup Code //////////////////////
SearchButton.disabled = true;
SearchButton.onclick = MakeNewQuery;
QueryField.onkeyup = HandleKey;
CheckResponseContainerVisibility();

////////////////// Functions //////////////////////
/**
 * A keydown handler for the query field to support hitting enter as well as enabling the
 * search functionality as typing occurs within the input field.
 *
 * @param	event 	The event for the onkeydown attatched 
 */
function HandleKey(evt){
	UpdateSearchButton();
	if (SearchButton.disabled === false && RequestInProgress === false){
		if(evt.keyCode == 13){
			 MakeNewQuery();
		}
	}
}

/**
 * Handles the updating for the query search button so we are looking for a valid string
 */
function UpdateSearchButton(){
	if (QueryField != null && QueryField != undefined){
		SearchButton.disabled = QueryField.value.length <= 0 && !RequestInProgress;
	}
}

/**
 * Makes a query via jsonp on behalf of the user, which will invalidate any existing data.
 */
function MakeNewQuery(){
	RequestInProgress = true;
	ResetPageNumber();
	if (JsonpHeader != undefined && JsonpHeader != null){
		document.querySelector('head').removeChild(JsonpHeader);
	}
	let queryString = document.getElementById("query").value;
	let url = GetQueryUrl(queryString,'HandleNewResponse');
	JsonpHeader = document.createElement('script');
	JsonpHeader.src = url;
	document.querySelector('head').appendChild(JsonpHeader);
}

/**
 * Navigates to the specified url
 *
 * @param	url 	The url to load
 */
function NavigateQueryUrl(url){
	RequestInProgress = true;
	JsonpHeader = document.createElement('script');
	JsonpHeader.src = url;
	document.querySelector('head').appendChild(JsonpHeader);
}

/**
 * Updates the visibility of the response container for the page if there exists a valid response to display.
 */
function CheckResponseContainerVisibility(){
	let configElement = GetConfiguredElement(RESPONSE_ELEM);
	if (configElement != null){
		configElement.hidden = !HasValidResponse();
	}
}

/**
 * The controller function/callback for handling the server data from the API
 *
 * @param	serverData	A valid JS object containing either error information
 * 						or a valid set of streams to display information about.
 */
function HandleNewResponse(serverData) {
	TryLog(serverData);
	RawResponse = serverData;
	RequestInProgress = false;
	CheckResponseContainerVisibility();

	if (IsErrorResponse(serverData)){
		//handle error case here
	} else {
		AppEventHandler.dispatchEvent(DataReceivedEvent);
	}
}