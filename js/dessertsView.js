/*
	createDessertsView()

	View class that knows how to render the desserts model.
	Uses TemplateListView as the prototype.
	Overrides render() to add event handlers for the 
	add to cart buttons.
*/

function createDessertsView(config) {
	config.templateView = createDessertView(config);
	var view = createTemplateListView(config);

	view.afterRender = function() {
		//add event handlers for add-to-cart buttons
		this.container.find('.add-to-cart').click(function(){
			var button = $(this);
			var eventData = {
				dessertName: button.attr('data-dessert-name'),
				dessertPrice: button.attr('data-dessert-price')
			};
			view.trigger('addToCart', eventData);
		});
	}; //afterRender()

	//auto-render if a model exists
	if (config.model) {
		view.render();
	}
	return view;
} //createDessertsView()