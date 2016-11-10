$(function(){
	apiURL = "https://csse280-recipesocialmedia.herokuapp.com/";
	var userId = getCookie("login");
	var user = '';

	var ingredients = [];
	ingredientIndex = 0;
	$('#addIngredient').click(addIngredient);
	//$('#addIngredient').click(sendIngredient);
	//getIngredientList();

	function addIngredient() {
		var ingredient = $("#autocomplete").val();
		ingredients.push(ingredient);

		addIngredientToPage(ingredient);
		$("#autocomplete").val('');

		//need to add logic that adds the ingredient to the database
	}

	function addIngredientToPage(ingredient) {
		var index = ingredientIndex;
		ingredientIndex++;

		//create elements
		var container = $('<div id="con-'+index+'" class="row" data-equalizer" ></div>');
		var name = $('<div class="small-9 columns panel" data-equalizer-watch></div>');
		var button = $('<div id="i-'+index+'" class="small-3 columns button alert" data-equalizer-watch></div>');

		//bind button functions
		button.click(removeIngredient);

		//set inner html
		$(name).html(ingredient);
		$(button).html('&times;');

		//collapse elements
		$(container).append(name);
		$(container).append(button);

		//add container to DOM
		$("#ingredients-container").append(container);
	}

	function removeIngredient() {
		var ingredientString = $(this).parent().children()[0].innerHTML;
		console.log(ingredientIndex = $(this).parent()[0].id.substring(4));
		$("#con-"+ingredientIndex).remove();
		ingredients.splice(ingredients.indexOf(ingredientString), 1);
		//sendIngredient();

		//need to add logic to remove from database
	}

	/*
	function sendIngredient() {
		var data = {
			ingredients: ingredients
		};

		$.ajax({
        	url: apiURL + '/ingredients',
        	type: 'POST',
            data: {
            	ingredients: JSON.stringify(data.ingredients)
            }
        });
	}

	function getIngredientList() {
		$.ajax({
	    	url: apiURL + '/ingredients',
	    	type: 'GET',
	    	success: setIngredients
	    });	
	}

	function setIngredients(res) {
		ingredients = res['content'];

		for (var i = 0; i<ingredients.length;i++) {
			addIngredientToPage(ingredients[i]);	
		}
	}*/
});