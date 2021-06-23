var contextMenuItem = {
    "id": "toAddMoney",
    "title": "Add to spend",
    "contexts": ["selection"]
}
chrome.contextMenus.create(contextMenuItem);

function isInt(value)
{
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.id = "toAddMoney" && clickData.selectionText)
    {
        if(isInt(clickData.selectionText)){
            chrome.storage.sync.get(['total', 'limit'], function(budget){
                var newTotal = 0;
                if(budget.total)
                {
                    newTotal += budget.total;
                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total': newTotal}, function(){
                    if(newTotal >= budget.limit)
                {
                    var notify = {
                        type: "basic",
                        iconUrl: "icon48.png",
                        title: "Limit Reached",
                        message: "Uh oh! looks like you've reached the limit!"
                    }
                    chrome.notifications.create('notify', notify);
                }
                });
            });

        }
    }
});

chrome.storage.onChanged.addListener(function(changes, storageName){                // all the changes in storage are reflected in 'changes'
    chrome.browserAction.setBadgeText({'text': changes.total.newValue.toString()}); // in newValue and oldValue
})