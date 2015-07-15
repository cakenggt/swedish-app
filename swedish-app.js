var tryMap = {};

function checkPage(originalHtml) {
  var container = $('#html-container');
  //html, used for parsing the text
  var html = originalHtml;
  //remove image tags to prevent loading
  html = html.replace(/<img.*?>/g, '');
  //remove reference tags
  html = html.replace(/\[(<\/span>)\d*(<span(.*?)?>)\]/g, '');
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
  var comprehension = 0.9;
  //TODO find the comprehension rate
  //Display the page for reading
  var url = $('#holder').attr('src');
  var pageid = url.substring(url.lastIndexOf('=')+1, url.length);
  if (comprehension > 0.8){
    //show the page if it has above 80% comprehension
    $('iframe').attr('src', 'https://sv.wikipedia.org/wiki?curid=' + pageid);
  }
  else{
    //find the page with the highest comprehension and display that
    tryMap[pageid] = comprehension;
    var keys = Object.keys(tryMap);
    if (keys.length > 5){
      var largest = 0;
      for (var j = 0; j < keys.length; j++){
        if (largest === 0 || tryMap[keys[j]] > tryMap[keys[largest]]){
          largest = keys[j];
        }
      }
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
  $('#holder').attr('src', 'https://sv.wikipedia.org/w/api.php?action=parse&prop=text&format=json&callback=checkPageCallback&pageid='+pageid);
}

function loadPageCallback(data) {
  var pageid = data.query.random[0].id;
  loadPage(pageid);
}

function getNewPage(){
  $('#getter').attr('src', 'https://sv.wikipedia.org/w/api.php?action=query&list=random&format=json&callback=loadPageCallback&rnlimit=1&rnnamespace=0');
}

$(function(){
  getNewPage();
});
