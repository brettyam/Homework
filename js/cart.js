/*
    createCartModel()

    Creates a model for the shopping cart. This uses the ListModel
    as the prototype, but adds a few specific methods.

    The config parameter can contain the following properties:
    - items (array of objects) initial items for the cart (optional)
*/

function createCartModel(config) {
	var model = createListModel(config);
	
	model.getSubtotalPrice = function() {
		var idx;
		var subtotalPrice = 0;
		for (idx = 0; idx < this.items.length; ++idx) {
			subtotalPrice += this.items[idx].price;
		}
		console.log(subtotalPrice.toFixed(2));
		return subtotalPrice.toFixed(2);
	} //add getsubtotalPrice() function

	model.getTax = function() {
		return (0.095 * this.getSubtotalPrice()).toFixed(2);
	}

	model.getGrandTotalPrice = function() {
		var subTotal = this.getSubtotalPrice();
		var tax = this.getTax();
		var grandTotal = +subTotal + +tax;
		return grandTotal.toFixed(2);
	}

	model.toJSON = function() {
		return JSON.stringify(this.items)
	} //add toJSON() function

	return model;
} //createCartModel()