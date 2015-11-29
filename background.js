function navigate(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: url});
  });
}

//Set default suggestion for the user
function resetdefaultSuggestion() {
	chrome.omnibox.setDefaultSuggestion({
		description: "Search Facebook"
	});
}

resetdefaultSuggestion();

//returns the top hits to the entered text
chrome.omnibox.onInputEntered.addListener(function(text) {
	navigate("https://www.facebook.com/search/top/?q=" + text)
});