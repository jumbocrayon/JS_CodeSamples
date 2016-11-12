/**
 * helpers_app.js
 *
 * Application/Document specific application helper collections.
 */

//////////////////////////// Functions ////////////////////////////////
/**
 * Checks the document that the configured identifier exists and returns it, logging issues along the way.
 * 
 * @param	configIdentifier 	The identifier on the document that should contain the value for the element id
 * @return 	The element if it exists, null if it does not.
 */
function GetConfiguredElement(configIdentifier){
	let configElement = document.getElementById(configIdentifier);
	if (configElement != null){
		let pageElement = document.getElementById(configElement.value);
		if (pageElement != null){
			return pageElement;
		}else {
			TryLog("Err: Could not find element with id "+configElement.value+" - try updating the value of "+configIdentifier);
		}
	} else {
		TryLog("Err: Could not find element with id "+configIdentifier);
	}
	return null;
}