/*
	createDrinkView()

	View class that can render a drink item model.
	Uses TemplateView as the prototype and overrides
	render() to create the add to cart buttons for the
	various sizes.

*/

function createDrinkView(config) {
	var view = createTemplateView(config);

	view.afterRender = function(clonedTemplate){
		var drinkTemplate = clonedTemplate.find('.drink-template');

		clonedTemplate.find('.drink-name').html(this.model.name);
		clonedTemplate.find('.drink-price').html(this.model.price);
		clonedTemplate.find('.btn').attr({
			'data-drink-name': this.model.name,
			'data-drink-price': this.model.price
		});
		clonedTemplate.append(drinkTemplate);
		drinkTemplate.remove();
	};
	return view;
}