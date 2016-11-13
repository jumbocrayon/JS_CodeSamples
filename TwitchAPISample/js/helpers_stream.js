/**
 *	helpers_stream.js
 *
 *	The helper file for getting useful information out of a twitch stream 
 * 	response object based on the API documentation.
 */
///////////////////////////// CONST ///////////////////////////////////////
//root-level properties of interest
const ID = "_id";
const GAME = "game";
const NUM_VIEWERS = "viewers";
const WHEN_CREATED = "created_at";
const CHANNEL = "channel";
const PREVIEW_IMGS = "preview";
//channel-level properties of interest
const LANGUAGE = "broadcaster_language";
const CHANNEL_ID = "_id";
const NAME = "display_name";
const FOLLOWERS = "followers";
const CHANNEL_URL = "url";
const STATUS = "status";
//preview-level properties of interest
const SMALL = "small";
const MED	= "medium";
const LARGE = "large";

////////////////////////// FUNCTIONS /////////////////////////////////////
/**
 * Gets the stream identifier from the result
 *
 * @param	stream 		The stream object returned from the Twitch API
 * @return 	string		The unique identifier for the stream
 */
function GetStreamId(stream){
	return stream[ID];
}

/**
 * Gets the game being streamed from the result
 *
 * @param	stream 		The stream object returned from the Twitch API
 * @return 	string		The name of the game
 */
function GetStreamGame(stream){
	return stream[GAME];
}

/**
 * Gets the number of viewers for the given stream
 *
 * @param	stream 		The stream object returned from the Twitch API
 * @return 	int 		The number of people currently watching the stream
 */
function GetStreamViewerCount(stream){
	return stream[NUM_VIEWERS];
}

/**
 * Gets the game being streamed from the result
 *
 * @param	stream 		The stream object returned from the Twitch API
 * @return 	string		The datetime representation of when the stream was created.
 */
function WhenCreated(stream){
	return stream[WHEN_CREATED];
}

/**
 * Gets the channel identifier out of the stream object if it exists.
 *
 * @param	stream 		The stream object returned from the Twitch API
 * @return 	string		The identifier for the stream channel
 */
function GetChannelId(stream){
	return stream[CHANNEL][CHANNEL_ID];
}

/**
 * Gets the channel status description out of the stream object if it exists.
 *
 * @param	stream 		The stream object returned from the Twitch API
 * @return 	string		The status text for the stream channel
 */
function GetChannelStatus(stream){
	return stream[CHANNEL][STATUS];
}

/**
 * Gets the channel follower count out of the stream object if it exists.
 *
 * @param	stream 		The stream object returned from the Twitch API
 * @return 	int 		The number of followers for the stream channel
 */
function GetChannelFollowerCount(stream){
	return stream[CHANNEL][FOLLOWERS];
}


/**
 * Gets the channel display name out of the stream object if it exists.
 *
 * @param	stream 		The stream object returned from the Twitch API
 * @return 	string		The display name for the stream channel
 */
function GetChannelName(stream){
	return stream[CHANNEL][NAME];
}

/**
 * Gets the channel language property out of the stream object if it exists.
 *
 * @param	stream 		The stream object returned from the Twitch API
 * @return 	string		The broadcaster language for the stream channel
 */
function GetChannelLanguage(stream){
	return stream[CHANNEL][LANGUAGE];
}


/**
 * Gets the channel url out of the stream object if it exists.
 *
 * @param	stream 		The stream object returned from the Twitch API
 * @return 	string		The url for the stream channel
 */
function GetChannelUrl(stream){
	return stream[CHANNEL][CHANNEL_URL];
}

/**
 * Gets the image in order: med > small > large
 *
 * @param	stream 		The stream object returned from the Twitch API
 * @return 	string		The url at which the stream preview image can be found
 */
function GetImage(stream){
	var result = 'img/placeholder.png';
	if (stream[PREVIEW_IMGS] != null){
		if (stream[PREVIEW_IMGS][MED] != null){
			result = stream[PREVIEW_IMGS][MED];
		} else if (stream[PREVIEW_IMGS][SMALL] != null){
			result = stream[PREVIEW_IMGS][SMALL];
		} else if (stream[PREVIEW_IMGS][LARGE] != null){
			result = stream[PREVIEW_IMGS][LARGE];
		}
	}
	return result;
}
