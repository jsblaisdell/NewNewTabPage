var greeting = function () {
  var date = new Date;
  var hour = date.getHours();
  var timeOfDayElement = document.getElementById('timeOfDay');
  var body = document.getElementById('body');
  var timeOfDay;

  if (hour < 12) {
    timeOfDay = "morning";
  } else if (hour >= 12 && hour < 17) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "evening";
  }

  timeOfDayElement.innerHTML = timeOfDay[0].toUpperCase() + timeOfDay.slice(1);
  body.classList.add(timeOfDay);
};

var quotes = function () {
  var quoteList = [
    ["Don't cry because it's over, smile because it happened.", "Dr. Seuss"],
    ["Be yourself; everyone else is already taken.", "Oscar Wilde"],
    ["Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", "Albert Einstein"],
    ["Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.", "Bernard M. Baruch"],
    ["You've gotta dance like there's nobody watching, Love like you'll never be hurt, Sing like there's nobody listening, And live like it's heaven on earth.", "William W. Purkey"],
    ["So many books, so little time.", "Frank Zappa"],
    ["A room without books is like a body without a soul.", "Marcus Tullius Cicero"],
    ["You only live once, but if you do it right, once is enough.", "Mae West"],
    ["Be the change that you wish to see in the world.", "Mahatma Gandhi"],
    ["In three words I can sum up everything I've learned about life: it goes on.", "Robert Frost"],
    ["If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.", "J.K. Rowling"],
    ["No one can make you feel inferior without your consent.", "Eleanor Roosevelt"],
    ["If you tell the truth, you don't have to remember anything.", "Mark Twain"],
    ["I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", "Maya Angelou"],
    ["Always forgive your enemies; nothing annoys them so much.", "Oscar Wilde"],
    ["Live as if you were to die tomorrow. Learn as if you were to live forever.", "Mahatma Gandhi"],
    ["Darkness cannot drive out darkness: only light can do that. Hate cannot drive out hate: only love can do that.", "Martin Luther King Jr."],
    ["To live is the rarest thing in the world. Most people exist, that is all.", "Oscar Wilde"],
    ["To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", "Ralph Waldo Emerson"],
    ["It is better to be hated for what you are than to be loved for what you are not.", "André Gide"]
  ];
  var selectedQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
  document.getElementById('quote').innerHTML = selectedQuote[0];
  document.getElementById('author').innerHTML = selectedQuote[1];
};

var HttpClient = function() {
  this.get = function(aUrl, aCallback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        aCallback(httpRequest.responseText);
      }
    }

    httpRequest.open( "GET", aUrl, true );
    httpRequest.send( null );
  }
};

var inactivity = function () {
  var flipTimer;
  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;

  function flip() {
    var main = document.getElementById('main');
    main.classList.add('flip');
  }

  function resetTimer() {
    clearTimeout(flipTimer);
    flipTimer = setTimeout(flip, 30000);
  }
};

var pageLoad = function () {
  setTimeout(function() {
    var body = document.getElementById('body');
    body.classList.add('loaded');
  }, 10);
};

greeting();
quotes();
aClient = new HttpClient();
aClient.get("http://api.wunderground.com/api/cd02859ae4b575e4/conditions/q/TX/Austin.json", function(response) {
  var jsonData = JSON.parse(response);
  var tempF = document.getElementById('tempF');
  var tempC = document.getElementById('tempC');
  var weather = document.getElementById('weather');

  tempF.innerHTML = jsonData.current_observation.temp_f;
  tempC.innerHTML = jsonData.current_observation.temp_c;
  weather.innerHTML = jsonData.current_observation.weather.toLowerCase();
});
inactivity();
pageLoad();
