$(document).ready(function () {
    chrome.storage.sync.get(['total', 'limit'], function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    })
    $('#submit').click(function () {
        chrome.storage.sync.get(['total','limit'], function (budget) {

            var newTotal = 0;
            if (budget.total) {
                newTotal += parseInt(budget.total);
            }

            var amount = $('#amount').val();
            if (amount) {
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({ 'total': newTotal }, function(){
                if(amount && newTotal >= budget.limit)
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

            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});
