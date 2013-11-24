/*
	createPizzaView()

	View class that can render a pizza item model.
	Uses TemplateView as the prototype and overrides
	render() to create the add to cart buttons for the
	various sizes.

*/

function createPizzaView(config) {
	var view = createTemplateView(config);

	view.afterRender = function(clonedTemplate){
		//add buttons for the various sizes, indicating their price
		var price;
		var sizeLabel;
		var sizeTemplate = clonedTemplate.find('.size-template');
		var clonedSizeTemplate;

		clonedTemplate.find('.pizza-name').html(this.model.name);
		if (this.model.vegetarian) {
			clonedTemplate.find('.vegetarian').html('(Vegetarian)');
		}
		clonedTemplate.find('.pizza-description').html(this.model.description);
		for (size in this.model.prices) {
			clonedSizeTemplate = sizeTemplate.clone();
			if (size == 0) {
				sizeLabel = 'Small';
			} else if (size == 1) {
				sizeLabel = 'Med';
			} else {
				sizeLabel = 'Large';
			}
			clonedSizeTemplate.find('.pizza-size').html(sizeLabel);
			clonedSizeTemplate.find('.size-price').html(this.model.prices[size]);
			//add attributes for pizzaName and pizzaSize so we 
			//know what name and size to add to user's cart
			clonedSizeTemplate.find('button').attr({
				'data-pizza-name': this.model.name,
				'data-pizza-size': size
			});
			clonedTemplate.append(clonedSizeTemplate);
		}
		sizeTemplate.remove();
	};
	return view;
}