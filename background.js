//Setting badge of the extension.
chrome.browserAction.setBadgeText({ text: 'OFF' });
//Setting up a boolean variable to store the state of button
var enable=false;
//Storing state of button in local storage
chrome.storage.sync.set({"enable": enable});
//Responding to onclick action of the on/off button
chrome.browserAction.onClicked.addListener(function (tab) {
    enable = !enable;
  //If button is on run the content script / extension
    if (enable) {
      chrome.browserAction.setBadgeText({ text: 'ON' });
      chrome.tabs.executeScript(null, { file: 'content.js' });
    } else {
//Reload the page and dont run the script
      chrome.browserAction.setBadgeText({ text: 'OFF' });
      chrome.tabs.executeScript(tab.id, {code: 'window.location.reload();'});
    }
//Restore the current state of the button
    chrome.storage.sync.set({"enable": enable}, function() {
      console.log('Value is set to ' + enable);
    });
  });


var getCommentsRepoURL = function () {
    return 'https://raw.githubusercontent.com/capJavert/clippy-dictionary/master/clippy.json?v=' + new Date().getTime()
}
var loadComments = function () {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', getCommentsRepoURL(), true);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
           settings.comments = JSON.parse(xhttp.response);
            console.log("kfkkf");
            browser.tabs.query({}, function(tabs) {
                for (var index in tabs) {
                    browser.tabs.sendMessage(
                        tabs[index].id,
                        {
                            name: 'comments',
                            value: settings.comments
                        }
                    );
                }
            });
        }
    };
    xhttp.send();
}
