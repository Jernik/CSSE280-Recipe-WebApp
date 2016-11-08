var foodImg = "images/ovenbakedomelet.jpg";
var author = "Tester";
var name = "Oven Baked Omelet";
var ingredients = ["1 teaspoon butter", "9 large eggs", " 1/2 cup sour cream", "1/2 cup milk", "1 teaspoon salt", "2 green onions, chopped", "1/4 cup shredded Cheddar cheese"];
var description = "Yummy, fluffy eggs made in the oven";
var instructions = ["Preheat oven to 350 degrees F (175 degress C). Grease an 8x8-inch baking dish with butter.", "Beat eggs, sour cream, milk, and salt in a bowl until blended. Stir in green onions. Pour mixture in the prepared baking dish.", "Bake in the preheated oven until set, 25 to 30 minutes. Sprinkle Cheddar cheese over eggs and continue baking until cheese is melted, 2 to 3 minutes more."];
var profileId = 0;
// TODO To be changed later
var apiUrl = "https://csse280-contact-back-smithtl.herokuapp.com/contacts";

function addRecipeInfo() {
    var header = '<img id ="foodImg" src="' + foodImg + '" width=200px height=200px />';
    header += "<p id='recipe'>" + name + "</p>";
    header += "<p id='author'>" + "By: " + author + "</p>";
    header += "<p>" + description + "</p>";
    $('#header').append(header);
    var ingredientsList = "<ul id='ingredients'>";
    for (var i = 0; i < ingredients.length; i++) {
        ingredientsList += "<li>" + ingredients[i] + "</li>";
    }
    ingredientsList += "</ul>";
    $('#ingredients').append(ingredientsList);
    var instructionsList = "<ol id='ingredients'>";
    for (var i = 0; i < instructions.length; i++) {
        instructionsList += "<li>" + instructions[i] + "</li>";
    }
    instructionsList += "</ol>";
    $('#instructions').append(instructionsList);
}

addRecipeInfo();
