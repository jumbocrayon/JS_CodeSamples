/**
 * helpers.js
 *
 * Basic query helper functionality for ease of use. These do not operate
 * in terms of the document, such as data marshalling or computational.
 */
//////////////////// Consts ///////////////////////
//the client API key needed for any twitch API call
const TWITCH_API_KEY = "tge5yc9wa2q5v2rvx2a6akzlwqjq94k";
//The base url this app is allowed to run queries against.
const URL_BASE = "https://api.twitch.tv/kraken/search/streams?";

////////////////// Functions //////////////////////
/**
 * Responsible for building a url based on a new input query
 * 
 * @param	query 		The user-generated query string
 * @param	callback	The name of the callback
 * @return 	string 		The url for the jsonp request	
 */
function GetQueryUrl(query, callback = 'callback') {
	let q = encodeURIComponent(query);
	return URL_BASE+'client_id='+TWITCH_API_KEY+'&q='+q+'&callback='+callback;
}

/**
 * Formats the relation specified for a jsonp request
 *
 * @param	relationName	self, prev, or next
 * @param	rawResponse		the raw response we are generating a URL based on
 * @return  A fully valid URL ready to be used in a jsonp request
 */
function GetRelationLink(relationName, rawResponse, callback = 'callback'){
	function checkRelationValid(){
		var validOptions = ['self','next','prev'];
		return validOptions.find(x => {return x === relationName;}) != null;
	}
	if (!checkRelationValid()){
		TryLog("Relation must be self, next, or prev, not: "+relationName);
		return null;
	}
	if (!("_links" in rawResponse) || !(relationName in rawResponse["_links"])){
		return null;
	}
		
	//TODO: format the new url with the API key and fix the silly amprisand thingy
	return rawResponse["_links"][relationName]+'&client_id='+TWITCH_API_KEY+'&callback='+callback;
}

/**
 * Attempts to log to the console, if it exists in current browser.
 * 
 * @param	message		The message to be logged
 */
function TryLog(message){
	if (typeof(console) != "undefined"){
		console.log(message);
	}
}

/**
 * Determines if the response is an error. This is necessary because the 
 * Twitch API specifies that all responses returned will be of a 200 code.
 *
 * @param responseObject A JS object returned from the PJSON request
 * @return 	Boolean	 True, if the response is an error.
 */
function IsErrorResponse(responseObject) {
	return ("status" in responseObject && responseObject["status"] >= 400);
}
