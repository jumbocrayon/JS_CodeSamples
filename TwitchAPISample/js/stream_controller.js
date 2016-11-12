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

 /////////////////////////////// INIT /////////////////////////////////////

 ///////////////////////////// FUNCTIONS //////////////////////////////////
/**
 * Clears existing stream elements from the stream container element.
 *
 *	@param	ignoreList	OPTIONAL	If supplied, will ignore elements with the specified ids
 */
function ClearStream(ignoreList = null){
	//
}

/**
 *	Finds the ids in the list that match the existing stream info on display. Useful for refresh
 * 	where only one or two elements on a page might change.
 *
 *	@param		idList	An array of stream ids to keep on the document, if they exist.
 * 	@return 	Array	A list of identifiers that do not exist on the document.
 */
function IdendifyNewStreams(idList){
	return [];
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
	 */
	function BuildStreamElement(streamInfo){

	}

	//create a list of identifiers for teh streamArray
	//clear stream of all elements not in our new array.
	//loop over streamArray for identifiers returned by IdendifyNewStreams
		//BuildStreamElement
}


