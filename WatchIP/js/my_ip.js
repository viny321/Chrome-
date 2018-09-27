function sendMessage() {
    chrome.runtime.sendMessage('viny',function(response) {
        document.getElementById("ip_div").innerHTML = response;
    });
}

document.getElementById("viny").onclick = sendMessage;

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse) {
    if(!(message=='viny')){
        document.getElementById("ip_div").innerHTML = message;
    }
});
