// Initialize Firebase
var config = {
    apiKey: "AIzaSyDCZRxDedt0vShViXwJiaS4MJm7aywJ9os",
    authDomain: "fir-extended-session.firebaseapp.com",
    databaseURL: "https://fir-extended-session.firebaseio.com",
    projectId: "fir-extended-session",
    storageBucket: "fir-extended-session.appspot.com",
    messagingSenderId: "29912362988"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit-btn").on("click", function (e) {
    e.preventDefault();
    // getting the values from the input fields
    var name = $("#name").val().trim();
    var favMovie = $("#fav-movie").val().trim();

    console.log(name);
    console.log(favMovie);

    // add a record to firebase 
    database.ref("/users").push({
        "name": name,
        "favMovie": favMovie
    });

    $("#name").val("");
    $("#fav-movie").val("");
});

database.ref("/users").on("child_added", function (snapshot) {
    console.log(snapshot.key);
    console.log(snapshot.val());
    var tr = $("<tr>");
    tr.append(
        $("<td>").text(snapshot.key),
        $("<td>").text(snapshot.val().name),
        $("<td>").text(snapshot.val().favMovie)
    );
    $("#movie-table tbody").append(tr);
});