/**
 * stream_controller.js
 * 
 * The page/scripts responsible for control of the stream logic elements.
 */
 //////////////////////////////// CONST ///////////////////////////////////
//The HTML element config identifier for the template element id
const STREAM_TEMPLATE = 'config_stream_template_element';
const STREAM_CONTAINER = 'config_stream_container_element';

 /////////////////////////////// VARS /////////////////////////////////////
var StreamContainer = GetConfiguredElement(STREAM_CONTAINER);
var ActiveStreamIds = [];

 /////////////////////////////// INIT /////////////////////////////////////
AppEventHandler.addEventListener(DATA_RECEIVED,OnStreams,false);
 ///////////////////////////// FUNCTIONS //////////////////////////////////
/**
 * Clears existing stream elements from the stream container element.
 *
 *	@param	ignoreList	OPTIONAL	If supplied, will ignore elements with the specified ids
 */
function ClearStream(ignoreList = []){
	let safeElements = 0;
	let currentStream = StreamContainer.childNodes[0];
	while (currentStream){
		if (ignoreList.find(x => {return x == currentStream.id;})){
			safeElements++;
		} else {
			ActiveStreamIds.splice(ActiveStreamIds.indexOf(currentStream.id),1);
			StreamContainer.removeChild(currentStream);
		}
		currentStream = StreamContainer.childNodes[safeElements];
	}
	TryLog("Kept elements: "+safeElements);
}

/**
 *	Finds the ids in the list that do not match the existing stream info on display. Useful for refresh
 * 	where only one or two elements on a page might change.
 *
 *	@param		idList	An array of stream ids to keep on the document, if they exist.
 * 	@return 	Array	A list of identifiers that do not exist on the document.
 */
function IdendifyNewStreams(idList){
	let result = [];
	for (let id of idList){
		if (!ActiveStreamIds.find(x => {return x == id;})){
			result.push(id);
		}
	}
	return result;
}

/**
 *	Finds the ids in the list that match the existing stream info on display. Useful for refresh
 * 	where only one or two elements on a page might change.
 *
 *	@param		idList	An array of stream ids to keep on the document, if they exist.
 * 	@return 	Array	A list of identifiers that do not exist on the document.
 */
function IdendifyExistingStreams(idList){
	let result = [];
	for (let id of idList){
		if (ActiveStreamIds.find(x => {return x == id;})){
			result.push(id);
		} 
	}
	return result;
}

/**
 * Handler for when new streams may have been detected
 *
 * @param	e 	OPTIONAL 	unused (event listener)
 */
function OnStreams(e = null){
	if (HasValidResponse()){ 
		BuildStreamUI(RawResponse['streams']);
	}
}

/**
 * 	Takes in the array of stream objects and builds out the UI, altering the document.
 *
 *	@param	streamArray		The array of JS objects representing unique streams from twitch.
 */
function BuildStreamUI(streamArray){
	/**
	 * Builds a stream element based on the given stream element and adds it to the container.
	 *
	 * @param	streamInfo	The twitch api representation of a user stream
	 * @param	id 			The identifier for the document element
	 */
	function AddStreamElement(streamInfo, id){
		ActiveStreamIds.push(GetStreamId(streamInfo));
		var newStreamDisplay = GetConfiguredElement(STREAM_TEMPLATE).cloneNode(true);
		newStreamDisplay.id = id;
		newStreamDisplay.hidden = false;
		//Set the elements up to display the stream info
		newStreamDisplay.getElementsByClassName('stream-preview')[0].innerHTML = "<img src=\""+GetImage(streamInfo)+"\" />";
		newStreamDisplay.getElementsByClassName('stream-title')[0].innerHTML = GetChannelName(streamInfo);
		newStreamDisplay.getElementsByClassName('stream-game')[0].innerHTML = GetStreamGame(streamInfo);
		newStreamDisplay.getElementsByClassName('stream-viewers')[0].innerHTML = GetStreamViewerCount(streamInfo)+" viewers";
		newStreamDisplay.getElementsByClassName('stream-desc')[0].innerHTML = "(Language: "+GetChannelLanguage(streamInfo)+") "+ GetChannelStatus(streamInfo);
		StreamContainer.insertBefore(newStreamDisplay,StreamContainer.firstChild);
	}
	//create a list of identifiers for teh streamArray
	let incomingIds = [];
	for (let streamObj of streamArray){
		incomingIds.push(streamObj['_id']);
	}
	//clear stream of all elements not in our new array.
	ClearStream(IdendifyExistingStreams(incomingIds));
	//loop over streamArray for identifiers returned by IdendifyNewStreams
	let newIdentifiers = IdendifyNewStreams(incomingIds);

	for (let streamObj of streamArray){
		//if the stream is new, build the stream element
		let id = GetStreamId(streamObj);
		if (newIdentifiers.find(x => {return x == id;})){
			AddStreamElement(streamObj, id);
		}
	}
}


