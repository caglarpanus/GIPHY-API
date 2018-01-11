
//Array that we will push our new words that we want to search for.
var searchedWords = ["Birds","Cars","Cats","Soccer","Funny","Jim Carrey","The Big Lebowski"];

//function that we will display buttons of words that we searched for

function renderButtons(){

    //this is necessary otherwise we will have repeat buttons
    $("#gifButtons").empty();
      
    // Looping through the array of movies

    for (var i = 0; i < searchedWords.length; i++){

        //dynamicaly generating buttons for each movie in the array.
        var gifButtonShow = $("<button>");

        gifButtonShow.addClass("gifs");

        gifButtonShow.addClass("btn btn-info");
        // this classes was added to have space between buttons. CSS file was also updated. 
        gifButtonShow.addClass("btn btn-space");

        // Adding a data-attribute with a value of the movie
        gifButtonShow.attr("data-name", searchedWords[i]);
        // Providing the button's text with a value
        gifButtonShow.text(searchedWords[i]);

        $("#gifButtons").append(gifButtonShow);

    }

}

// This function handles events where one button is clicked
$("#add-gif").on("click", function(event){

// We're using a form so that the user can hit enter instead of clicking the button if they want
event.preventDefault();

    // This line will grab the text from the input box

    var gifs = $("#gif-input").val().trim();
    
    if (gifs == ""){
        return false //To block user from trying to add blank button.
    } 

    //the things we searched for will be added to our selectedWords array.
    
    searchedWords.push(gifs);

    renderButtons();
});
//COULDNT FIGURE OUT!!! ASK!!!
function removeLastGif(){
    $("#removeGif").on("click", function(){
        searchedWords.pop();
        renderButtons();
        return false;
    })
}


function displayGIF() {

    var gifDisplay = $(".gifs").attr("data-name")
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifDisplay + "&api_key=sPfklQzrEwIhwetFX6WCEWYYYPYirfPv";
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method:"GET"

    }).done(function(response){
        console.log(response);
        

    })
}





