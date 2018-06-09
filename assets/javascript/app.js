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


  $("#trainADD").on("click", function(event) {
    event.preventDefault(); 

    var trainName = $("#trainInput").val().trim();
    var trainDest = $("#destinationInput").val().trim();
    var trainTime = moment($("#ttimeInput").val().trim(), "DD/MM/YY").format("X");
    var trainFreq = $("#freqInput").val().trim();
  
    var newTrain = {
      name: empName,
      dest: trainDest,
      time: traintime,
      frew: trainFreq
    };

    database.ref().push(newTrain);

})