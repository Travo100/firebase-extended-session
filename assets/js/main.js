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
    var userObj = {
        key: snapshot.key,
        name: snapshot.val().name,
        favMovie: snapshot.val().favMovie
    };
    var userObjString = JSON.stringify(userObj);
    var tr = $("<tr>");
    tr.addClass(snapshot.key);
    tr.append(
        $("<td>").text(snapshot.key),
        $("<td>").text(snapshot.val().name).addClass("name"),
        $("<td>").text(snapshot.val().favMovie).addClass("fav-movie"),
        $("<td>").append($("<button class='btn btn-info update-btn'>").text("Update").attr("data-user", userObjString))
    );
    $("#movie-table tbody").append(tr);
});

$(document).on("click", ".update-btn", function(e){
    e.preventDefault();
    var userObj = JSON.parse($(this).attr("data-user"));

    var updates = {};
    updates["/users/"+userObj.key] = { "name": "Travis", "favMovie": "Arrival" };
    console.log(updates);

    return database.ref().update(updates);
});

database.ref("/users").on("child_changed", function(snapshot){
    var key = "." + snapshot.key;
    $(key + " .name").text(snapshot.val().name);
    $(key + " .fav-movie").text(snapshot.val().favMovie);
});