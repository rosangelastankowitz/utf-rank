const functions = require('firebase-functions');

var fs = require("fs");
var text = fs.readFileSync("codes.txt").toString('utf-8');
var codes = text.split("\n")

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateNewPage(code) {
  return "\
<!DOCTYPE html>\
<html>\
  <head>\
    <meta charset=\"utf-8\">\
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\
    <title>Welcome to Firebase Hosting</title>\
\
 	<link rel=\"stylesheet\" href=\"https://utfrank-ddb59.firebaseapp.com/rateyo/jquery.rateyo.min.css\"/>\
\
    <!-- update the version number as needed -->\
    <script defer src=\"/__/firebase/5.2.0/firebase-app.js\"></script>\
    <!-- include only the Firebase features as you need -->\
    <script defer src=\"/__/firebase/5.2.0/firebase-auth.js\"></script>\
    <script defer src=\"/__/firebase/5.2.0/firebase-database.js\"></script>\
    <script defer src=\"/__/firebase/5.2.0/firebase-messaging.js\"></script>\
    <script defer src=\"/__/firebase/5.2.0/firebase-storage.js\"></script>\
    <!-- initialize the SDK after all desired features are loaded -->\
    <script defer src=\"/__/firebase/init.js\"></script>\
\
    <style media=\"screen\">\
      body { background: #ECEFF1; color: rgba(0,0,0,0.87); font-family: Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; }\
      #message { background: white; max-width: 360px; margin: 100px auto 16px; padding: 32px 24px; border-radius: 3px; }\
      #message h2 { color: #ffa100; font-weight: bold; font-size: 16px; margin: 0 0 8px; }\
      #message h1 { font-size: 22px; font-weight: 300; color: rgba(0,0,0,0.6); margin: 0 0 16px;}\
      /*#message p { line-height: 140%; margin: 16px 0 24px; font-size: 14px; }\
      #message a { display: block; text-align: center; background: #039be5; text-transform: uppercase; text-decoration: none; color: white; padding: 16px; border-radius: 4px; }\
       #message, #message a { box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); } */\
      #load { color: rgba(0,0,0,0.4); text-align: center; font-size: 13px; }\
      @media (max-width: 600px) {\
        body, #message { margin-top: 0; background: white; box-shadow: none; }\
        body { border-top: 16px solid #ffa100; }\
      }\
	  #photo {text-align: center;}\
	  #voting {text-align: center; width:100px; margin:auto; margin-top:15px}\
    </style>\
  </head>\
\
  <body>\
   <div id=\"message\">\
      <h2>UTFRank</h2>\
      <h1>Qual a sua nota para essa pessoa?</h1>\
      <p>" + code + "</p>\
		<img src=\"https://utfrank-ddb59.firebaseapp.com/photos/" + code + "\" />\
	  <div id=\"voting\">\
 	  </div>\
	</div>\
    <div>\
      <div id=\"rateYo1\" style=\"margin: 10px auto\"></div>\
      <div class=\"counter\" style=\"float: left; font-weight: bold; margin-left: 10px; margin-top: 7px;\"></div>\
      <div style=\"clear: both\"></div>\
    </div>\
	<script type=\"text/javascript\" src=\"https://utfrank-ddb59.firebaseapp.com/rateyo/jquery-3.3.1.min.js\"></script>\
    <script type=\"text/javascript\" src=\"https://utfrank-ddb59.firebaseapp.com/rateyo/jquery.rateyo.js\"></script>\
    <script>\
      $(function () {\
        var rating = 0;\
        $(\"#rateYo1\").rateYo({\
          rating: rating,\
          numStars: 5,\
          precision: 2,\
          starWidth: \"64px\",\
          spacing: \"5px\",\
		  fullStar: true,\
          onInit: function () {\
            console.log(\"On Init\");\
          },\
          onSet: function () {\
            console.log(\"On Set\");\
          }\
        }).on(\"rateyo.set\", function () {console.log(\"rateyo.set\"); })\
          .on(\"rateyo.change\", function () {console.log(\"rateyo.change\"); });\
      });\
    </script>\
  </body>\
</html>\
";
}

exports.getNewPhoto = functions.https.onRequest((request, response) => {
	var idx = getRandomInt(codes.length - 1);	
	var code = codes[idx];

	response.send(generateNewPage(code));
});
