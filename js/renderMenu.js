//renderMenu.js

//document on ready function
$(function(){
	renderPizzas(com.dawgpizza.menu.pizzas);
	renderMisc(com.dawgpizza.menu.drinks);
	renderMisc(com.dawgpizza.menu.desserts);
});

//this function handles both vegetarian and meat pizzas
function renderPizzas(pizzaItems) {
	var meatPizzaTemplate = $('.meat-pizza-template');
	var veggiePizzaTemplate = $('.veggie-pizza-template');
	var pizzaMenu;
	var pizzaInstance;
	var priceString;

	//for each item in com.dawgpizza.menu.pizzas, merge it
	//with its respective template and to the page
	$.each(pizzaItems, function(){
		//test whether this pizza is a meat or vegetarian pie
		if (!this.vegetarian) {
			pizzaInstance = meatPizzaTemplate.clone();
			pizzaMenu = $('.meat-pizza-menu')
		} else {
			pizzaInstance = veggiePizzaTemplate.clone();
			pizzaMenu = $('.veggie-pizza-menu')
		}
		priceString = "$" + this.prices[0] + "/$" + this.prices[1] + "/$" + this.prices[2];
		pizzaInstance.find('.name').html(this.name + "...................." + priceString);
		pizzaInstance.find('.description').html(this.description);
		pizzaMenu.append(pizzaInstance);
	});
	//dynamically change the name of this category
	$('.category1').html(com.dawgpizza.menuCategories[0].caption + ":");
}

//this function handles both drink and dessert items
function renderMisc(miscItems) {
	var drinkTemplate = $('.drink-template');
	var dessertTemplate = $('.dessert-template');
	var miscMenu;
	var miscInstance;
	var categoryNum;

	//for each item in com.dawgpizza.menu.drinks/desserts,
	//merge it with its respective template and add to page
	$.each(miscItems, function(){
		//test whether this item is a drink or a dessert
		if (this.type.toLowerCase() == 'drink') {
			miscInstance = drinkTemplate.clone();
			miscMenu = $('.drink-menu');
			categoryNum = 2;
		} else {
			miscInstance = dessertTemplate.clone();
			miscMenu = $('.dessert-menu');
			categoryNum = 3;
		}
		miscInstance.find('.name').html(this.name + "....................$" + this.price);
		miscMenu.append(miscInstance);
	});
	//dynamically change the name of this category
	$('.category' + categoryNum).html(com.dawgpizza.menuCategories[categoryNum - 1].caption + ":");
}