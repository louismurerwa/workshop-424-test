var getCommentsRepoURL = function () {
    return 'https://raw.githubusercontent.com/capJavert/clippy-dictionary/master/clippy.json?v=' + new Date().getTime()
}
var loadComments = function () {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', getCommentsRepoURL(), true);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
           settings.comments = JSON.parse(xhttp.response);

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
