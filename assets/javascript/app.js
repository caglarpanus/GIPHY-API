
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
renderButtons();
// This function handles events where one button is clicked
$("#add-gif").on("click", function(event){

    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box

    var gifs = $("#gif-input").val().trim();
    
    if (gifs == ""){
        return false; //To block user from trying to add blank button.
    } 

    //the things we searched for will be added to our selectedWords array.
    
    searchedWords.push(gifs);
    console.log("add:", searchedWords);
    renderButtons();
    console.log("test");
});


//COULDNT FIGURE OUT!!! ASK!!!
function removeLastGif(){
    console.log("remove:", searchedWords);
    $("#removeGif").on("click", function(event){
        event.preventDefault();
        searchedWords.pop();
        renderButtons();
        //return false;
    })
}


function displayGif(gifDisplay) {
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifDisplay + "&api_key=sPfklQzrEwIhwetFX6WCEWYYYPYirfPv";
    
    $.ajax({
        url: queryURL,
        method:"GET"

    }).done(function(response){
        $("#gifsView").empty(); //We dont want to add GIFs on top of each other everytime we clicked.
        var result = response.data;
        console.log(result); //to see if there is any return from data.


        for(var i = 0; i < result.length; i++) {

            //This div was created so that GIFs could hold it. 
            var imgContainer = $("<div>"); 
            imgContainer.addClass("imgContainer");

            //In order to get the rating data.
            var gifRating = $("<p>").text("Rating: " + result[i].rating);
            imgContainer.append(gifRating);

            var img = $("<img>");

            img.attr("src", result[i].images.fixed_width.url);
            img.attr("data-still", result[i].images.fixed_width.url);
            img.attr("data-animate", result[i].images.fixed_width.url);
            img.attr("data-state", "still");
    
            console.log(result[i]);

            imgContainer.append(img);

            $("#gifsView").append(imgContainer);
        }

       
    });
}
//var gifDisplay = $(".gifs").attr("data-name")
//displayGif();


$(document).on("click", ".gifs", function() {
    var d = $(this).attr("data-name");
    console.log(d);
    displayGif(d)
});


