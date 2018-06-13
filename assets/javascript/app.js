// Initialize Firebase
var config = {
    apiKey: "AIzaSyAg2Fs9fLIC2aOd-ySH08oPFW_7LKNzhKY",
    authDomain: "knbproject1.firebaseapp.com",
    databaseURL: "https://knbproject1.firebaseio.com",
    projectId: "knbproject1",
    storageBucket: "knbproject1.appspot.com",
    messagingSenderId: "176751730411"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  
// Reference to the database service
var database = firebase.database();

// Initial values
var currentTime = "";
var trainName = "";
var trainDest = "";
var trainTime = "";
var trainFreq = 0;
var timeDiff = 0;
var timeRemainder = 0;
var nextArrival = 0;
var minAway = 0;
var newTrain = {
    name: trainName,
    dest: trainDest,
    freq: trainFreq,
    firstTrain: trainTime,
}
var firstTrainInput = "";

$("#addTrainData").on("click", function (event) {
    event.preventDefault();

    firstTrainInput = moment($("#train-time").val().trim(), "HH:mm").format("HH:mm");

    // Error handler 
    if (firstTrainInput !== 'Invalid date') {
        newTrain.name = $("#train-name").val().trim();
        newTrain.dest = $("#train-destination").val().trim();
        newTrain.firstTrain = firstTrainInput;
        newTrain.freq = $("#train-freq").val().trim();
    } else {
        alert("Please enter a valid First Train Time");
        clearInput();
    }

    database.ref().push(newTrain);

    clearInput();
})

// Function that clears all input boxes
function clearInput() {
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#train-freq").val("");
}

// Creates the table with Train data and performs calculations for Next Arrival and Minutes Away
database.ref().on("child_added", function (snapshot) {
    // Error handler for when First Train Time is outside the 24h military time
    if (firstTrainInput !== 'Invalid date') {
        trainName = snapshot.val().name;
        trainDest = snapshot.val().dest;
        trainTime = moment(snapshot.val().firstTrain, "HH:mm");
        trainFreq = snapshot.val().freq;

        // trainTime (pushed back 1 year to make sure it comes before current time)
        var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");

        currentTime = moment().format("HH:mm");
        console.log("Current Time: " + currentTime);

        timeDiff = moment().diff(moment(trainTimeConverted), "minutes");
        console.log("Time remaining: " + timeDiff);

        timeRemainder = timeDiff % trainFreq;
        console.log("Remaining Time: " + timeRemainder);

        minAway = trainFreq - timeRemainder;
        console.log(minAway);

        nextArrival = moment().add(minAway, "minutes").format("HH:mm");

        $("#trainData").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");
    }
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});