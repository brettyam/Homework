/*
	controller.js

	Controller for the Order page

*/

$(function(){
	var cartModel = createCartModel();

	var cartView = createCartView({
		model: cartModel,
		template: $('.cart-item-template'),
		container: $('.cart-items-container'),
		subtotalPrice: $('.subtotal-price'),
		tax: $('.tax'),
		grandTotalPrice: $('.grandtotal-price')
	}); //var cartView

	//remember what was previously in cart
	var cartJSON = localStorage.getItem('cart');
	if (cartJSON && cartJSON.length > 0) {
		cartModel.setItems(JSON.parse(cartJSON));
	} //var cartJSON

	var pizzasModel = createPizzasModel({
		menu: com.dawgpizza.menu.pizzas
	}); //var pizzasModel

	/*var drinksModel = createDrinksModel({
		menu: com.dawgpizza.menu.drinks
	}); */

	var pizzasView = createPizzasView({
		model: pizzasModel,
		template: $('.pizza-template'),
		container: $('.pizzas-container')
	}); //var pizzasView

	/*var drinksView = createDrinksView({
		model: drinksModel,
		template: $('.drink-template'),
		container: $('.drinks-container')
	});*/

	pizzasModel.refresh(); //refresh to get pizzas from server
	//drinksModel.refresh();

	//when the movies view triggers 'addToCart'
	//add a new item to the cart, using the supplied
	//pizzaName and price
	pizzasView.on('addToCart', function(data){
		var pizza = pizzasModel.getItemByName(data.pizzaName);
		if (!pizza) {
			throw 'Invalid pizza.'
		}
		cartModel.addItem({
			name: data.pizzaName,
			size: data.pizzaSize,
			price: pizza.prices[data.pizzaSize]
		});
	}); //addToCart event

	//save cart to local storage
	cartModel.on('change', function(){
		localStorage.setItem('cart', cartModel.toJSON());
	});
});