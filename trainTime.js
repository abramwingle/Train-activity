// Initialize Firebase
var config = {
    apiKey: "AIzaSyBe22_eBaTd-OPP-rAIZd2x81DEIwN1qjs",
    authDomain: "traindata-478f5.firebaseapp.com",
    databaseURL: "https://traindata-478f5.firebaseio.com",
    projectId: "traindata-478f5",
    storageBucket: "traindata-478f5.appspot.com",
    messagingSenderId: "683220152706"
};


firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "00:00").format("X");
  var trainRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    rate: trainRate
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
console.log(newTrain.trainName);
console.log(newTrain.destination);
console.log(newTrain.start);
console.log(newTrain.trainRate);


  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().role;
  var trainStart = childSnapshot.val().start;
  var trainRate = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainRate);

  // Prettify the employee start
  //var trainStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainStart),
    $("<td>").text(trainRate),
    
  );

});




