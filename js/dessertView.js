/*
	createDessertView()

	View class that can render a dessert item model.
	Uses TemplateView as the prototype and overrides
	render() to create the add to cart buttons for the
	various sizes.

*/

function createDessertView(config) {
	var view = createTemplateView(config);

	view.afterRender = function(clonedTemplate){
		var dessertTemplate = clonedTemplate.find('.dessert-template');

		clonedTemplate.find('.dessert-name').html(this.model.name);
		clonedTemplate.find('.dessert-price').html(this.model.price);
		clonedTemplate.find('.btn').attr({
			'data-dessert-name': this.model.name,
			'data-dessert-price': this.model.price
		});
		clonedTemplate.append(dessertTemplate);
		dessertTemplate.remove();
	};
	return view;
}