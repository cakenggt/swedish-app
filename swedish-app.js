var tryMap = {};
var newestId = 0;
var experienceMap = {"gammal":0.999986,"nu":0.808679,"barnen":0.993904,"till":0.102468,"hon":0.999986,"han":0.999986,"<*sf>":0.555239,"oss":0.999986,"sig":0.999986,"på":0.999754,"i":0.999986,"vi":0.999986,"dig":0.999986,"hans":0.999986,"jag":0.999986,"det":0.995822,"hennes":0.999986,"tillbaka":0.98142,"tittade":0.98142,"efter":0.999986,"varandra":0.843848,"dina":0.990422,"behöll":0.98142,"visste":0.683328,"mig":0.999986,"kände":0.830857,"de":0.999986,"letade":0.965571,"höll":0.98142,"tjugo":0.958629,"borta":0.999983,"vill":0.999983,"elva":0.983627,"tre":0.999983,"äpplen":0.999983,"åtta":0.950801,"tretton":0.932018,"har":0.999983,"fem":0.990081,"hästar":0.999983,"läser":0.999983,"inte":0.999983,"fjärde":0.897974,"hästarna":0.999983,"hundra":0.990081,"svarta":0.999983,"ens":0.034959,"åttio":0.950801,"min":0.999983,"är":0.999983,"stycken":0,"böcker":0.999983,"katter":0.999983,"äter":0.999983,"ha":0.999983,"hur":0.999983,"mycket":0.999983,"nyligen":0.950626,"ni":0.994111,"stöttade":0.909747,"en":0.999983,"fick":0.909747,"fåglarna":0.999983,"lunch":0.825771,"svängde":0.909747,"runt":0.911394,"inget":0.995791,"när":0.792632,"du":0.999983,"sprang":0.739629,"soppa":0.011035,"sålde":0.739629,"dog":0.909747,"henne":0.999983,"gav":0.909747,"din":0.999981,"våra":0.972645,"hund":0.999981,"vad":0.999981,"flicka":0.999981,"älskar":0.999981,"barn":0.999865,"sina":0.999981,"och":0.999981,"ringde":0.923044,"skrev":0.453315,"tog":0.620649,"att":0.999981,"varje":0.923044,"sin":0.999981,"fyra":0.974137,"tänkte":0.861059,"förlorade":0.923044,"stängde":0.956089,"trodde":0.861059,"var":0.999978,"per":0.897652,"trettio":0.817339,"sjuttio":0.525636,"ägg":0.645954,"sextio":0.676762,"sexton":0.718465,"mina":0.99108,"nitton":0.817339,"nästan":0.999978,"fjorton":0.570779,"ett":0.999978,"tio":0.718465,"åttonde":0.525636,"tackade":0.355767,"ställde":0.897201,"varför":0.999978,"hittade":0.675533,"gjorde":0.897201,"berättade":0.431372,"lade":0.816572,"förrgår":0.431372,"lämnade":0.524065,"annan":0.568932,"någonting":0.423221,"förrförra":0.177678,"båda":0.873118,"dessa":0.425086,"känner":0.425086,"någon":0.688598,"svenska":0.999975,"litar":0.999975,"hallå":0.999975,"där":0.727825,"behöver":0.999975,"man":0.999877,"talar":0.999975,"bor":0.999975,"mat":0.988787,"arbetade":0.606194,"regnade":0.872938,"lekte":0.606194,"hörde":0.109603,"lyssnade":0.348791,"tillsammans":0.999975,"hade":0.606194,"vilket":0.999969,"nära":0.876072,"ligger":0.985582,"öppna":0.999969,"mitt":0.999969,"vattnet":0.999969,"kom":0.720097,"tappade":0.256032,"om":0.003416,"socker":0.999969,"under":0.999969,"simmade":0.256032,"hästen":0.83281,"såg":0.256032,"älskade":0.256032,"före":0.999969,"tar":0.982843,"åt":0.115265,"talade":0.811654,"drack":0.677171,"salt":0.361502,"håller":0.999959,"innehåller":0.017756,"vem":0.999959,"med":0.999864,"klipper":0.2515,"saknar":0.648633,"många":0.999959,"brev":0.999959,"anser":0.432596,"tittar":0.299112,"köper":0.999951,"kör":0.000056,"svänger":0.916181,"bara":0.999951,"sover":0.999951,"mannen":0.999951,"räknar":0.568545,"respekterar":0.568545,"kommer":0.999942,"verkligen":0.260903,"nio":0.335192,"missar":0.050465,"trots":0.095897,"lyssnar":0.999942,"mer":0.999942,"pratar":0.999942,"liten":0.999942,"går":0.970841,"för":0.942412,"långt":0.999933,"bra":0.999933,"får":0.716729,"vilken":0.999933,"femton":0.694329,"tolv":0.814998,"äpple":0.999877,"ger":0.970181,"älgen":0.000714,"sjutton":0.505862,"här":0.999922,"slut":0.512293,"bok":0.999922,"av":0.999899,"aldrig":0.872739,"kanske":0.864416,"kvinnan":0.999884,"juice":0.999877,"pojken":0.999877,"kött":0.999877,"glass":0.999877,"måltid":0.294463,"vegetarian":0.583256,"fläskkött":0.999877,"olja":0.999877,"te":0.999877,"flickan":0.999877,"dricker":0.999877,"vatten":0.999877,"bröd":0.999877,"kvinna":0.999877,"pojke":0.999877,"arbetar":0.999865,"leker":0.999865,"några":0.178755,"ser":0.999865,"gör":0.564413,"eller":0.999865,"ingen":0.896372,"vet":0.949215,"denna":0.765676,"detta":0.765676,"ofta":0.999864,"alltid":0.999864,"lyckas":0.024899,"hoppas":0.024899,"något":0.073264,"igen":0.380308,"fattas":0.024899,"känns":0.024899,"sitt":0.999864,"minns":0.172906,"misslyckas":0.024899,"visar":0.910469,"åker":0.586518,"över":0.999842,"mellan":0.999842,"skriver":0.999842,"utomlands":0.140864,"börjar":0.956257,"pasta":0.999821,"vinet":0.999821,"köttet":0.999821,"sju":0.115236,"mindre":0.07182,"tredje":0.067491,"tjugofem":0.587398,"hundar":0.999754,"tusentals":0.022668,"tjugofyra":0.023953,"kvinnor":0.999753,"män":0.999753,"som":0.999182,"andra":0.098652,"fel":0.197557,"annat":0.308933,"kvinnorna":0.999713,"vin":0.999713,"kaffe":0.999713,"honom":0.949145,"egentligen":0.357383,"tycker":0.999614,"både":0.999614,"skrattar":0.999614,"tillräckligt":0.999614,"finns":0.944406,"definitivt":0.999614,"nödvändigtvis":0.999614,"åtminstone":0.047935,"älg":0.999614,"gråter":0.999614,"simmar":0.999552,"förrän":0.412112,"frukt":0.999552,"tidningen":0.999552,"barnet":0.999552,"reser":0.057302,"rosa":0.999407,"morgon":0.999049,"vårt":0.027024,"hundarna":0.999407,"flera":0.99929,"lunchen":0.21376,"orange":0.999183,"meny":0.999183,"så":0.999183,"den":0.998889,"väljer":0.042707,"kysser":0.759223,"helst":0.999182,"inga":0.798007,"sitter":0.99905,"vid":0.228952,"öppnar":0.296046,"sköldpaddor":0.999049,"flickor":0.999049,"absolut":0.999049,"ingenting":0.195975,"utom":0.14329,"hit":0.295976,"allting":0.195975,"böckerna":0.998889,"femte":0.174835,"sjätte":0.592452,"två":0.998716,"sex":0.736777,"plus":0.592452,"öl":0.998716,"lär":0.33826,"engelska":0.998714,"väldigt":0.13644,"studerar":0.998494,"förstår":0.028482,"fisken":0.998494,"men":0.998306,"än":0.371612,"faktiskt":0.163025,"också":0.011495,"sjunger":0.998306,"ändå":0.251224,"försöker":0.574017,"ibland":0.048251,"vit":0.998304,"ut":0.414108,"vita":0.99797,"tack":0.99797,"vitt":0.994258,"hittar":0.997969,"nästa":0.552223,"femtio":0.139268,"arton":0.139268,"nittio":0.139268,"tusen":0.348092,"flyger":0.997286,"vanligtvis":0.026093,"dör":0,"fler":0.124228,"tror":0.996848,"slutar":0.124228,"hjälper":0.000174,"tomat":0.996846,"framåt":0,"bjuder":0,"svart":0.99684,"helt":0.210408,"långsamt":0.652552,"ert":0.394678,"sjunde":0.526837,"nionde":0.118252,"ris":0.994258,"längs":0.994251,"lille":0.993338,"ditt":0.993333,"stöttar":0.993333,"kockar":0.993329,"springer":0.993329,"betalar":0.992248,"nej":0.990995,"varken":0.990984,"sent":0.083173,"sällan":0.05158,"fyrtio":0.083139,"bakom":0.893165,"genom":0.893165,"björn":0.415147,"önskar":0.168349,"er":0.160974,"sköldpaddan":0.000013,"häst":0.984274,"utan":0.749742,"redan":0.234791,"vanligt":0.443716,"fortfarande":0.069625,"små":0.42066,"heller":0.971353,"god":0.918523,"maten":0.724938,"elefanten":0.971258,"fågel":0.967349,"står":0.357182,"äntligen":0.047804,"gula":0.752859,"ritar":0.173716,"precis":0.176875,"räcker":0.039318,"möjligtvis":0.213859,"gamla":0.208107,"tydligt":0.555967,"björnen":0.918523,"ungefär":0.166285,"ja":0.918523,"dit":0.20242,"gammalt":0.799204,"fläskköttet":0.898831,"ägget":0,"snälla":0,"varsågod":0,"pojkar":0.898831,"fågeln":0,"eftersom":0.861504,"enligt":0.861468,"från":0.861222,"utanför":0.176831,"stannar":0.064006,"katt":0.849204,"äpplena":0,"ankor":0.84867,"männen":0.820634,"anka":0.820634,"orkar":0.798171,"djur":0.241754,"hos":0.235482,"ringer":0.651169,"passerar":0.757278,"deras":0.001563,"dem":0.26569,"djuret":0.002344,"tänker":0.772681,"katterna":0.000017,"dess":0,"fisk":0.819292,"citron":0.379689,"kockarna":0.691255,"tallrikarna":0.805265,"litet":0.685026,"vart":0.837922,"bort":0.29791,"mot":0.766918,"oljan":0.768995,"räddar":0.142692,"sköldpadda":0.617926,"troligtvis":0.112066,"bredvid":0.050238,"verkar":0.325579,"tackar":0.679846,"regnar":0.625461,"lagar":0.83048,"katten":0.831714,"tidning":0.63345,"tidningar":0.756183,"därför":0.67683,"säger":0.759533,"hunden":0.830485,"särskilt":0.10662,"letar":0.183683,"kaffet":0.792627,"hinner":0.235482,"frukten":0.464209,"senare":0.102766,"snart":0.102766,"presenterar":0.235482,"vilar":0.325579,"kramar":0.325579,"lever":0.209181,"vår":0.009618,"vilka":0.093055,"frågar":0.459713,"ganska":0.093012,"lila":0.003994,"era":0.045504,"följer":0.009934,"stämmer":0.08466,"smörgåsar":0.007293,"tidningarna":0.699052,"osten":0.130683,"smörgåsen":0.239088,"nötköttet":0.239088,"äpplet":0.049113,"tomaten":0.809347,"tills":0.023556,"svarar":0.001612,"lilla":0.226542,"jo":0.082809,"citronen":0.364853,"gyllene":0.484305,"vems":0.786255,"använder":0.000001,"pepparn":0.383406,"glassen":0.194511,"spindeln":0.77478,"fåglar":0.010794,"tallrikar":0.700967,"ost":0.05412,"hoppar":0.160981,"ankan":0.688306,"frukost":0.145837,"medan":0.327729,"innan":0.147821,"kyckling":0.438641,"färgglad":0.000001,"framför":0.140354,"smörgås":0.002174,"apelsin":0.056972,"säljer":0.638319,"hör":0.000001,"tvättar":0.000001,"elefanterna":0.347851,"jordgubbe":0.33572,"ankorna":0.720362,"pastan":0.241036,"kycklingen":0.078429,"sockret":0.204832,"krabban":0.719149,"saltet":0.204832,"soppan":0.332034,"peppar":0.718451,"elefant":0.70565,"krabba":0.70565,"djuren":0.615361,"elefanter":0.200174,"sköldpaddorna":0.014097,"smörgåsarna":0.014096,"spindel":0.700758,"hej":0.699004,"natt":0.594983,"nötkött":0,"då":0.685121,"ursäkta":0.000201,"mjölk":0.311168,"jordgubben":0.672897,"riset":0.547953,"frukosten":0.547953,"teet":0.498241};
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
    window.open('https://translate.google.com/#sv/en/'+$(this).text());
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
