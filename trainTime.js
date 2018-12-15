// Initialize Firebase
var config = {
  apiKey: "AIzaSyBe22_eBaTd-OPP-rAIZd2x81DEIwN1qjs",
  authDomain: "traindata-478f5.firebaseapp.com",
  databaseURL: "https://traindata-478f5.firebaseio.com",
  projectId: "traindata-478f5",
  storageBucket: "traindata-478f5.appspot.com",
  messagingSenderId: "683220152706"
};

var currentTime = moment().format("HH:mm");

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = $("#start-input").val().trim();
  var trainRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    rate: trainRate
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.rate);




  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {

    $("#train-name-input").text(trainName),
    $("#destination-input").text(trainDestination),
    $("#rate-input").text(trainRate),
    $("<div>").text("hello")
  //$("start-input").text(trainStart)

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = moment(childSnapshot.val().start, "HH:mm").format("HH:mm");
  var trainRate = childSnapshot.val().rate;

  // Create the new row
  if (currentTime <= nextTrainTime) {
    var nextTrainTime = trainStart;
    minutesLeft = trainStart.diff(moment(), "minutes");

  }

  else {
    var diffTime = moment().diff(moment(trainStart, "HH:mm"), "minutes");
    var newModulus = (diffTime % trainRate);
    var minutesLeft = (trainRate - newModulus);
    var nextTrainTime = moment().add(minutesLeft, "m").format("HH:mm");

  }
  $("#train-table").append(

    "<tr> <th>" + trainName + "</th>" +

    "<th>" + trainDestination + "</th>" +

    "<th>" + trainRate + "</th>" +

    "<th>" + nextTrainTime + "</th>" +

    "<th>" + minutesLeft + "</th> </tr>"

  );


});







