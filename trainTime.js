// Initialize Firebase
var config = {
  apiKey: "AIzaSyBe22_eBaTd-OPP-rAIZd2x81DEIwN1qjs",
  authDomain: "traindata-478f5.firebaseapp.com",
  databaseURL: "https://traindata-478f5.firebaseio.com",
  projectId: "traindata-478f5",
  storageBucket: "traindata-478f5.appspot.com",
  messagingSenderId: "683220152706"
};

var currentTime = moment().format("HHmm");

firebase.initializeApp(config);

var database = firebase.database(); 

// 2. Button for adding Employees
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = $("#start-input").val().trim();
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
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.rate);
  



  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

    $("#train-name-input").text(trainName),
    $("#destination-input").text(trainDestination),
    $("#rate-input").text(trainRate),
    $("<div>").text("hello")
    //$("start-input").text(trainStart)

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = moment(childSnapshot.val().rate, "HH:mm");
  //Moment(this.state.dob,"MM/DD/YY")
  //(childSnapshot.val().start).format("HH:mm");
  var trainRate = childSnapshot.val().rate;


  // Prettify the employee start

  // Create the new row
$("#train-table").append(

    "<tr> <th>" + trainName + "</th>" +

    "<th>" + trainDestination + "</th>" +

    "<th>" + trainRate + "</th>" +

    "<th>" + trainStart + "</th>" +

    "<th>" + "blank" + "</th> </tr>"

  );

 console.log("this is the formattted train start " + trainStart);

  if (currentTime <= trainStart ){
    console.log("train has not come yet. The first train comes at " + trainStart);
    }
    
    else {
      var diffTime = moment().diff(moment(trainStart, "HHmm"), "minutes");

      console.log("this is the train difference");

      console.log(diffTime);

      var newModulus = (diffTime % trainRate);

      console.log("this is the modulus");

      console.log(newModulus);

      var nextTrainTime = currentTime + (trainRate - newModulus);

      console.log("this is the next train time ");

      console.log(nextTrainTime);
     
    
    
    }
 


});







