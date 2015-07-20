var tryMap = {};
var newestId = 0;
var lastClicked = null;

/*
Calculates the word experience currently using
the date, decay rate, and last experience.

The experience of a word is it's last experience value
multiplied by it's decay rate to the power of the number
of days it has been since it was last seen.

Returns null if the word doesn't exist in the map
*/
function getCurrentWordExperience(word) {
  var entry = experienceMap[word];
  if (!entry){
    return null;
  }
  var msPerDay = 86400000;
  var currentTime = new Date().getTime();
  var daysSinceLastPractice = (currentTime - entry.lastPractice)/msPerDay;
  var currentExperience = entry.experience*Math.pow(entry.decayRate, daysSinceLastPractice);
  return currentExperience;
}

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

function getComprehension(text) {
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
    if (getCurrentWordExperience(words[k])){
      if (getCurrentWordExperience(words[k]) > 0.1){
        known += wordMap[words[k]];
      }
    }
  }
  var comprehension = known/i;
  return comprehension;
}

function checkPage(originalHtml) {
  var text = getPageText(originalHtml);
  console.log(text);
  //get rid of all punctuation
  var comprehension = getComprehension(text);
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
        if (!largestId || tryMap[keys[j]] > tryMap[largestId]){
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
    var opacity = getCurrentWordExperience(word);
    if (!opacity){
      wordSpan.addClass('new-word');
    }
    else{
      wordSpan.attr('style', 'color:rgb('+parseInt(255-(opacity*255))+', '+darkness+', '+darkness+')');
    }
  });
  textDiv.prepend($('<h1>').text(title));
  $('.buttons').show();
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
      var entry = experienceMap[word];
      var now = new Date().getTime();
      experienceMap[word] = !entry ? {"experience":0.1, "decayRate":0.9, "lastPractice":now} : increaseExperience(entry);
    }
  });
  localStorage.setItem('experienceMap', JSON.stringify(experienceMap));
  $(this).prop("disabled",true);
}

/*
Experience is increased by half of it's difference from 1.
Decay rate is divided by 2

Returns new entry
*/
function increaseExperience(entry) {
  var newEntry = {"experience":entry.experience+((1-entry.experience)/2), "decayRate":entry.decayRate/2, "lastPractice":new Date().getTime()};
  return newEntry;
}

function wordClickedCallback(data){
  var response = '';
  console.log(data);
  for (var i = 0; i < data.tuc.length; i++){
    var entry = data.tuc[i];
    if (entry.phrase){
      response += data.tuc[i].phrase.text + ', ';
    }
    else if (entry.meanings){
      for (var j = 0; j < entry.meanings.length; j++){
        response += entry.meanings[j].text + ', ';
      }
    }
  }
  if (response){
    alert(response.substring(0, response.length-2));
  }
  else{
    alert('No definition found');
  }
  //lastClicked.wrap('<a target="_blank" href=https://translate.google.com/#sv/en/'+key+'>');
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
    $.getScript('https://glosbe.com/gapi/translate?from=swe&dest=eng&format=json&callback=wordClickedCallback&pretty=true&phrase=' + $(this).text().toLowerCase());
  });

  getNewPage();
});

//These two are for getting the json from duolingo, but it doesn't work.
//Paste it into the console while on duolingo
function getVocab() {
  $.getJSON('https://www.duolingo.com/vocabulary/overview', cleanJSON);
}

function cleanJSON(data){
  var result = {};
  var wordList = data.vocab_overview;
  var now = new Date().getTime();
  for (var i = 0; i < wordList.length; i++){
    var entry = wordList[i];
    result[entry.word_string] = [entry.strength, 0.5, now];
  }
  var resultString = JSON.stringify(result);
  resultString = resultString.replace(/(],)/g, '$1\n  ');
  resultString = 'var experienceMap = '+resultString;
  console.log(resultString);
}
