var tryMap = {};
var newestId = 0;
var experienceMap = {
  "av": 0.1,
  "best": 0.1,
  "bland": 0.2,
  "bli": 0.1,
  "borneo": 0.1,
  "brittisk": 0.1,
  "brittiska": 0.1,
  "började": 0.1,
  "början": 0.1,
  "central": 0.1,
  "chokladfabriken": 0.1,
  "club": 0.1,
  "critics": 0.1,
  "crow": 0.1,
  "debut": 0.1,
  "design": 0.3,
  "designa": 0.1,
  "designade": 0.1,
  "diego": 0.1,
  "en": 0.2,
  "fear": 0.1,
  "fick": 0.1,
  "fight": 0.1,
  "film": 0.1,
  "filmen": 0.1,
  "filmerna": 0.2,
  "flera": 0.1,
  "fortsatte": 0.1,
  "född": 0.1,
  "föddes": 0.1,
  "för": 0.3,
  "föräldrar": 0.1,
  "gjorde": 0.1,
  "grundade": 0.1,
  "gräsklipparmannen": 0.1,
  "han": 0.4,
  "hans": 0.1,
  "i": 0.2
};

function checkPage(originalHtml) {
  var container = $('#html-container');
  //html, used for parsing the text
  var html = originalHtml;
  //remove image tags to prevent loading
  html = html.replace(/<img.*?>/g, '');
  //remove reference tags
  html = html.replace(/\[(<\/span>)\d*(<span(.*?)?>)\]/g, '');
  container.empty();
  container.append($(html));
  var text = container.find('p').text();
  console.log(text);
  //get rid of all punctuation
  text = text.replace(/[!"#$%&'()*+,\-–./:;<=>?@[\\\]^_`{|}~]/g, ' ');
  var wordList = text.split(/\s+/).filter(Boolean);
  var wordMap = {};
  var i = 0;
  while (i < wordList.length){
    var word = wordList[i].toLowerCase();
    if (wordMap[word]){
      wordMap[word] = wordMap[word]+1;
    }
    else{
      wordMap[word] = 1;
    }
    i++;
  }
  console.log(wordMap);
  console.log('Total Words: '+i);
  //comprehension keeps track of what percentage of the words you know
  var known = 0;
  var words = Object.keys(wordMap);
  for (var k = 0; k < words.length; k++){
    if (experienceMap[words[k]] && experienceMap[words[k]] > 0.1){
      known += wordMap[words[k]];
    }
  }
  var comprehension = known/i;
  console.log('comprehension: ' + comprehension);
  //Display the page for reading
  var pageid = newestId;
  if (comprehension > 0.8){
    //show the page if it has above 80% comprehension
    $('iframe').attr('src', 'https://sv.wikipedia.org/wiki?curid=' + pageid);
  }
  else{
    //find the page with the highest comprehension and display that
    tryMap[pageid] = comprehension;
    var keys = Object.keys(tryMap);
    if (keys.length > 5){
      console.log('No good pages, picking best one');
      var largest = 0;
      for (var j = 0; j < keys.length; j++){
        if (largest === 0 || tryMap[keys[j]] > tryMap[keys[largest]]){
          largest = keys[j];
        }
      }
      console.log('Best page is: ' + largest + ' with comprehension of: ' + tryMap[largest]);
      $('iframe').attr('src', 'https://sv.wikipedia.org/wiki?curid=' + largest);
    }
    else{
      getNewPage();
    }
  }
}

function checkPageCallback(data){
  console.log(data);
  console.log(data.parse.title);
  //originalHtml, used for rendering the page if it is good
  var originalHtml = data.parse.text["*"];
  checkPage(originalHtml);
}

function loadPage(pageid) {
  newestId = pageid;
  //$("body").append($("<script />", {
  //src: 'https://sv.wikipedia.org/w/api.php?action=parse&prop=text&format=json&callback=checkPageCallback&pageid='+pageid,
  //id: 'h'+pageid
  //}));
  $.getScript('https://sv.wikipedia.org/w/api.php?action=parse&prop=text&format=json&callback=checkPageCallback&pageid='+pageid);
}

function loadPageCallback(data) {
  var pageid = data.query.random[0].id;
  loadPage(pageid);
}

function getNewPage(){
  //$("body").append($("<script />", {
  //src: 'https://sv.wikipedia.org/w/api.php?action=query&list=random&format=json&callback=loadPageCallback&rnlimit=1&rnnamespace=0',
  //id: 'g'+newestId
  //}));
  $.getScript('https://sv.wikipedia.org/w/api.php?action=query&list=random&format=json&callback=loadPageCallback&rnlimit=1&rnnamespace=0');
}

$(function(){
  getNewPage();
});
