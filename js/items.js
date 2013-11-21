/* 
	createItemsModel()

	Creates a model for the items of a given menu.
	Uses ListModel as the prototype but adds specific methods.
*/

function createItemsModel(config) {
	var model = createListModel(config);

	model.getItemByName = function(name) {
		var items = model.getItems();
		var item;
		var idx;

		for (idx = 0; idx < items.length; ++idx) {
			item = items[idx];
			if (name == item.name) {
				return item;
			} 
		}
		throw 'No such item.'
	}

	model.refresh = function() {
		if (!this.menu) {
			throw new 'No menu property supplied in config.'
		}
		var items = this.menu;
		model.setItems(items);
	}; //refresh()
	return model;
} //createItemsModel()