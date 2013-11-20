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
		totalPrice: $('.total-price')
	}); //var cartView

	//remember what was previously in cart
	var cartJSON = localStorage.getItem('cart');
	if (cartJSON && cartJSON.length > 0) {
		cartModel.setItems(JSON.parse(cartJSON));
	} //var cartJSON

	var pizzasModel = createPizzasModel({
		menu: com.dawgpizza.menu.pizzas
	}); //var pizzasModel

	var pizzasView = createPizzasView({
		model: pizzasModel,
		template: $('.pizza-template'),
		container: $('.pizzas-container')
	}); //var pizzasView

	pizzasModel.refresh(); //refresh to get pizzas from server

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