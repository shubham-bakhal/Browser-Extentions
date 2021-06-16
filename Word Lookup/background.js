console.log('Background script started!!!');

chrome.runtime.onMessage.addListener(receiver);

window.word = "please select a word";


function receiver(request, sender, sendResponse) {
  console.log(request);
  word = request.text;
}
