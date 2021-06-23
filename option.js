$(document).ready(function(){
    $('#setLimit').click(function(){
        var limit = $('#limit').val();
        if(limit)
        {
            chrome.storage.sync.set({'limit': limit}, function(){
                $('#limit').val('');
            });
            // close();
        }
    });
    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total': 0}, function(){
            var notify = {
                type: "basic",
                iconUrl: "icon48.png",
                title: "Total Reset",
                message: "Total spend has been reset"
            }
            chrome.notifications.create('notify', notify);
        });
    });
    
});