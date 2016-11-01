var pictures = [];
var descriptions = [];
var comments = [];
var i = 0;
var columnTracker = 0;
var columns = ["#leftColumn", "#centerColumn", "#rightColumn"];

// Function that pulls post from backend
function getPosts(){
    pictures.push("images/burlyBurger.jpg");
    pictures.push("images/smokyChipotleMacAndCheese.jpg");
    pictures.push("images/spencePestoChickenPasta.jpg");
    descriptions.push("The maniliest burger");
    descriptions.push("mmm mac and cheese");
    descriptions.push("My favorite dish");
    comments.push("threjkwe");
    comments.push("jtlkrejtlkret");
    comments.push("jrewjrlkewr");
}

//function that places posts
function placePosts(){
    for (i; i<pictures.length; i++){
        var insertDiv = '<div class="post"> <img src="'+ pictures[i]+'" alt="">';
        insertDiv +='<p>'+descriptions[i]+'</p>';
        insertDiv +='<p>'+comments[i]+'</p></div>';
        $(columns[columnTracker]).append(insertDiv);
        if(columnTracker === 2){
            columnTracker = 0;
        }
        columnTracker++;
    }
}
getPosts();
placePosts();