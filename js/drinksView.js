/*
	createDrinksView()

	View class that knows how to render the drinks model.
	Uses TemplateListView as the prototype.
	Overrides render() to add event handlers for the 
	add to cart buttons.
*/

function createDrinksView(config) {
	config.templateView = createDrinkView(config);
	var view = createTemplateListView(config);

	view.afterRender = function() {
		//add event handlers for add-to-cart buttons
		this.container.find('.add-to-cart').click(function(){
			var button = $(this);
			var eventData = {
				drinkName: button.attr('data-drink-name'),
				drinkPrice: button.attr('data-drink-price')
			};
			view.trigger('addToCart', eventData);
		});
	}; //afterRender()

	//auto-render if a model exists
	if (config.model) {
		view.render();
	}
	return view;
} //createDrinksView()