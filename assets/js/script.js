var currentTime;
var trainName;
var destination;
var firstTrainTime;
var trainFrequency;


var config = {
  apiKey: "AIzaSyC_2r4Bztvb8NSFBOI2WI5o1c5WxFKiymY",
  authDomain: "classwork-63945.firebaseapp.com",
  databaseURL: "https://classwork-63945.firebaseio.com",
  projectId: "classwork-63945",
  storageBucket: "classwork-63945.appspot.com",
  messagingSenderId: "922797499325"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#train-form").on("submit", function (event) {
  event.preventDefault();

  trainName = $("#name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrainTime = $("#first-train-input").val();
  trainFrequency = $("#train-frequency").val();

  var trainDataInput = {
    name: $("#name-input").val().trim(),
    destination: $("#destination-input").val().trim(),
    firstTrainTime: $("#first-train-input").val().trim(),
    trainFrequency: $("#train-frequency").val().trim()
  }

  database.ref().push(trainDataInput);

})

database.ref().on('child_added', function (childSnapshot) {

  var trainData = childSnapshot.val();

  currentTime = moment();
  $("#current-time").text(currentTime);

  var firstTimeConverted = moment((trainData.firstTrainTime), "HH:mm").subtract(1, "years");

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  var tRemainder = Math.ceil(diffTime % (trainData.trainFrequency));

  var tMinutesTillTrain = Math.ceil((trainData.trainFrequency) - tRemainder);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTrain = moment(nextTrain).format("hh:mm a")

  var $tr = $('<tr>');

  var $tdTrainName = $('<td>').text(trainData.name);
  var $tdDestination = $('<td>').text(trainData.destination);
  var $tdTrainFrequency = $('<td>').text(trainData.trainFrequency);
  var $tdFirstTrain = $('<td>').text(trainData.firstTrainTime);
  var $tdNextTrain = $('<td>').text(nextTrain);
  var $tdMinutesAway = $('<td>').text(tMinutesTillTrain);

  $tr.append($tdTrainName, $tdDestination, $tdTrainFrequency, $tdFirstTrain, $tdNextTrain, $tdMinutesAway);

  $("tbody").append($tr);

})