function setup() {
  noCanvas();

  let bgPage = chrome.extension.getBackgroundPage();
  let word = bgPage.word.trim();

  let definitionUrl = `http://api.wordnik.com:80/v4/word.json/${word}/definitions?limit=1&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`;
  let audioUrl = `https://api.wordnik.com/v4/word.json/${word}/audio?useCanonical=false&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`;

  loadJSON(definitionUrl, gotData);
  loadJSON(audioUrl, gotAudio);

  function gotData(data) {
    createP(data[0].text).style('font-size', '48pt');
  }
  function gotAudio(data) {
    console.log(data[0].fileUrl);
    ele = createAudio(data[0].fileUrl);
    ele.autoplay(true);
  }
}
