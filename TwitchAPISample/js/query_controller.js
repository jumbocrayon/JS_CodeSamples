/**
 * query_controller.js
 *
 * Responsible for the logic control functions associated with this prototype.
 */
//////////////////// Vars ///////////////////////
// The raw response from the server.
var RawResponse;
//The element representing the search button
var SearchButton = document.getElementById("search");
//The element representing the query input field
var QueryField = document.getElementById("query");
//The element that represents the jsonp request in the header
var JsonpHeader;
//True, if there is currently a request in progress.
var RequestInProgress = false;
//The limit in place for the amount per page returned for the query
var QueryLimit = 10;

//////////////// Setup Code //////////////////////
SearchButton.disabled = true;
SearchButton.onclick = MakeNewQuery;
QueryField.addEventListener("focusout", UpdateSearchButton, true);

////////////////// Functions //////////////////////
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
 * The controller function/callback for handling the server data from the API
 *
 * @param	serverData	A valid JS object containing either error information
 * 						or a valid set of streams to display information about.
 */
function HandleNewResponse(serverData) {
	TryLog(serverData);
	RawResponse = serverData;
	RequestInProgress = false;
	if (IsErrorResponse(serverData)){
		//handle error case here
	} else {
		UpdateResponseNavbar();
		//do the things with the results.
	}
}