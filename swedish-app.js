var tryMap = {};
var newestId = 0;
var lastClicked = null;

function getPageText(html) {
  var container = $('#html-container');
  //remove image tags to prevent loading
  html = html.replace(/<img.*?>/g, '');
  //remove reference tags
  html = html.replace(/\[(<\/span>)\d*(<span(.*?)?>)\]/g, '');
  container.empty();
  container.append($(html));
  var text = '';
  container.find('p').each(function(){
    text += $(this).text() + ' ';
  });
  return text.substring(0, text.length -1);
}

function checkPage(originalHtml) {
  var text = getPageText(originalHtml);
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
    displayText(pageid);
  }
  else{
    //find the page with the highest comprehension and display that
    tryMap[pageid] = comprehension;
    var keys = Object.keys(tryMap);
    if (keys.length > 5){
      console.log('No good pages, picking best one');
      var largestId = 0;
      for (var j = 0; j < keys.length; j++){
        if (largestId === 0 || tryMap[keys[j]] > tryMap[largestId]){
          largestId = keys[j];
        }
      }
      console.log('Best page is: ' + largestId + ' with comprehension of: ' + tryMap[largestId]);
      displayText(largestId);
    }
    else{
      getNewPage();
    }
  }
}

function displayText(pageid){
  $.getScript('https://sv.wikipedia.org/w/api.php?action=parse&prop=text&format=json&callback=fillDivCallback&pageid='+pageid);
}

function fillDivCallback(data){
  var title = data.parse.title;
  var html = data.parse.text["*"];
  fillDiv(title, html);
}

function fillDiv(title, html){
  var textDiv = $('#text');
  var text = getPageText(html);
  //prepare the html with opacity
  //surround each word with a span of class "word"
  var preparedHtml = text.replace(/([^!"#$%&'()*+,\-–.\/:;<=>?@[\\\]^_`{|}~\s]+)/g, '<span class="word">$1</span>');
  textDiv.html(preparedHtml);
  //adjust style
  var darkness = 44;
  textDiv.find('.word').each(function(){
    var wordSpan = $(this);
    var word = wordSpan.text();
    var opacity = experienceMap[word];
    if (opacity === undefined){
      wordSpan.addClass('new-word');
    }
    else{
      wordSpan.attr('style', 'color:rgb('+parseInt(255-(opacity*255))+', '+darkness+', '+darkness+')');
    }
  });
  textDiv.prepend($('<h1>').text(title));
  $('#newPage').show();
  $('#readIt').show();
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
  $.getScript('https://sv.wikipedia.org/w/api.php?action=parse&prop=text&format=json&callback=checkPageCallback&pageid='+pageid);
}

function loadPageCallback(data) {
  var pageid = data.query.random[0].id;
  loadPage(pageid);
}

function getNewPage(){
  //Get saved experience map if it exists
  if (localStorage.getItem("experienceMap") !== null){
    experienceMap = JSON.parse(localStorage.getItem("experienceMap"));
  }
  $.getScript('https://sv.wikipedia.org/w/api.php?action=query&list=random&format=json&callback=loadPageCallback&rnlimit=1&rnnamespace=0');
}

function readIt(){
  $('.word').each(function(){
    //if it hasn't been clicked, increase the experience
    if (!$(this).hasClass('clicked')){
      var word = $(this).text();
      experienceMap[word] = experienceMap[word] === undefined ? 0.1 : experienceMap[word]+((1-experienceMap[word])/2);
    }
  });
  localStorage.setItem('experienceMap', JSON.stringify(experienceMap));
  $(this).prop("disabled",true);
}

function wordClickedCallback(data){
  var key = lastClicked.text();
  if (data[key].length > 0){
    alert(data[key]);
  }
  else{
    lastClicked.wrap('<a target="_blank" href=https://translate.google.com/#sv/en/'+key+'>');
  }
}

$(function(){
  $('#newPage').on('click', function(){
    //reset global variables
    tryMap = {};
    newestId = 0;
    $('#readIt').prop("disabled",false);
    getNewPage();
  });
  $('#readIt').on('click', readIt);
  $(document).on('click', '.word', function(){
    $(this).addClass('clicked');
    lastClicked = $(this);
    $.getScript('https://d2.duolingo.com/api/1/dictionary/hints/sv/en?callback=wordClickedCallback&tokens=' + JSON.stringify([$(this).text()]));
  });

  getNewPage();
});

//This is for getting the json from duolingo, but it doesn't work.
//Paste it into the console while on duolingo
function cleanJSON(data){
  var result = {};
  var wordList = data.vocab_overview;
  for (var i = 0; i < wordList.length; i++){
    var entry = wordList[i];
    result[entry.word_string] = entry.strength;
  }
  return result;
  //Or return the stringified version
  //return JSON.stringify(result);
}
