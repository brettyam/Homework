//renderMenu.js

//document on ready function
$(function(){
	renderPizzas(com.dawgpizza.menu.pizzas);
	renderDrinks(com.dawgpizza.menu.drinks);
	renderDesserts(com.dawgpizza.menu.desserts);
});

function renderPizzas(pizzaItems) {
	var meatPizzaTemplate = $('.meat-pizza-template');
	var veggiePizzaTemplate = $('.veggie-pizza-template');
	var meatPizzaMenu = $('.meat-pizza-menu');
	var veggiePizzaMenu = $('.veggie-pizza-menu');
	var pizzaInstance;
	var priceString;

	//for each item in com.dawgpizza.menu.pizzas, merge them with
	//the template and add it to the page
	$.each(pizzaItems, function(){
		if (!this.vegetarian) {
			pizzaInstance = meatPizzaTemplate.clone();
		} else {
			pizzaInstance = veggiePizzaTemplate.clone();
		}
		priceString = "$" + this.prices[0] + "/$" + this.prices[1] + "/$" + this.prices[2];
		pizzaInstance.find('.name').html(this.name + "...................." + priceString);
		pizzaInstance.find('.description').html(this.description);
		if (!this.vegetarian) {
			meatPizzaMenu.append(pizzaInstance);
		} else {
			veggiePizzaMenu.append(pizzaInstance);
		}
	});
}

function renderDrinks(drinkItems) {
	var drinkTemplate = $('.drink-template');
	var drinkMenu = $('.drink-menu');
	var drinkInstance;

	//for each item in com.dawgpizza.menu.drinks, merge them with
	//the template and add it to the page
	$.each(drinkItems, function(){
		drinkInstance = drinkTemplate.clone();
		drinkInstance.find('.name').html(this.name + "....................$" + this.price);
		drinkMenu.append(drinkInstance);
	});
}

function renderDesserts(dessertItems) {
	var dessertTemplate = $('.dessert-template');
	var dessertMenu = $('.dessert-menu');
	var dessertInstance;

	//for each item in com.dawgpizza.menu.desserts, merge them with
	//the template and add it to the page
	$.each(dessertItems, function(){
		dessertInstance = dessertTemplate.clone();
		dessertInstance.find('.name').html(this.name + "....................$" + this.price);
		dessertMenu.append(dessertInstance);
	});
}