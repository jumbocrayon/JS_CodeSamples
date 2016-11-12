/**
 * stream_controller.js
 *
 * Handles all things related to displaying/interacting with the
 * stream info response from the Twitch API call.
 */
//////////////////// Vars ///////////////////////
const RESULTS_PREFIX = "Total Results: ";
//previous page button reference
var PrevButton = document.getElementById("prev");
var PrevUrl;
//refresh current page button reference
var SelfButton = document.getElementById("self");
var SelfUrl;
//next page button reference
var NextButton = document.getElementById("next");
var NextUrl;
// The current page number for the query.
var PageNumber = 1;

//////////////// Setup Code //////////////////////
UpdateResponseNavbar();

//////////////// Functions //////////////////////
/**
 * Resets the page number to 1;
 */
function ResetPageNumber(){
	PageNumber = 1;
}

/**
 * Handles the updating of the visibility of the response container element
 */
function UpdateResponseNavbar(){
	if (RequestInProgress || typeof(RawResponse) === 'undefined' || RawResponse == null || IsErrorResponse(RawResponse)){
		//hide the response nav element if there's no valid response list
		document.getElementById("response-container").hidden = true;
	} else {
		//update visibility, text, buttons
		document.getElementById("total_results").innerHTML = RESULTS_PREFIX+RawResponse['_total'];
		let total = Math.ceil(RawResponse['_total']/QueryLimit);

		PrevUrl = GetRelationLink("prev",RawResponse,'HandleNewResponse');
		PrevButton.disabled = PrevUrl == null;
		PrevButton.onclick = function() {
			PageNumber--;
			NavigateQueryUrl(PrevUrl);
		};
		SelfUrl = GetRelationLink("self",RawResponse,'HandleNewResponse');
		SelfButton.disabled = SelfUrl == null;
		SelfButton.onclick = function() {
			NavigateQueryUrl(SelfUrl);
		};
		NextUrl = GetRelationLink("next",RawResponse,'HandleNewResponse');
		NextButton.disabled = NextUrl == null || (PageNumber == total);
		NextButton.onclick = function() {
			PageNumber++;
			NavigateQueryUrl(NextUrl);
		};
		
		document.getElementById("page-number").innerHTML = 'page '+PageNumber+'/'+total;
		document.getElementById("response-container").hidden = false;
	}
}
