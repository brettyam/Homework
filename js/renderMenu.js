//renderMenu.js

//document on ready function
$(function (){
	renderPizzas(com.dawgpizza.menu.pizzas);
	renderDrinks(com.dawgpizza.menu.drinks);
	renderDesserts(com.dawgpizza.menu.desserts);
});

function renderPizzas(pizzaItems) {
	var pizzaTemplate = $('.pizza-template');
	var pizzaMenu = $('.pizza-menu');
	var pizzaInstance;
	var priceString;

	$.each(pizzaItems, function(){
		pizzaInstance = pizzaTemplate.clone();
		priceString = "$" + this.prices[0] + "/$" + this.prices[1] + "/$" + this.prices[2];
		pizzaInstance.find('.name').html(this.name + ".........." + priceString);
		pizzaInstance.find('.description').html(this.description);
		pizzaInstance.removeClass('pizza-template');
		pizzaMenu.append(pizzaInstance);
	});
}

function renderDrinks(drinkItems) {
	var drinkTemplate = $('.drink-template');
	var drinkMenu = $('.drink-menu');
	var drinkInstance;

	$.each(drinkItems, function(){
		drinkInstance = drinkTemplate.clone();
		drinkInstance.find('.name').html(this.name + "..........$" + this.price);
		drinkInstance.removeClass('drink-template');
		drinkMenu.append(drinkInstance);
	});
}

function renderDesserts(dessertItems) {
	var dessertTemplate = $('.dessert-template');
	var dessertMenu = $('.dessert-menu');
	var dessertInstance;

	$.each(dessertItems, function(){
		dessertInstance = dessertTemplate.clone();
		dessertInstance.find('.name').html(this.name + "..........$" + this.price);
		dessertInstance.removeClass('dessert-template');
		dessertMenu.append(dessertInstance);
	});
}