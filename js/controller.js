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

    var pizzasModel = createItemsModel({
        menu: com.dawgpizza.menu.pizzas
    }); //var pizzasModel

    var drinksModel = createItemsModel({
        menu: com.dawgpizza.menu.drinks
    }); //var drinksModel

    var dessertsModel = createItemsModel({
        menu: com.dawgpizza.menu.desserts
    }); //var dessertsModel

    var pizzasView = createPizzasView({
        model: pizzasModel,
        template: $('.pizza-template'),
        container: $('.pizzas-container')
    }); //var pizzasView

    var drinksView = createDrinksView({
        model: drinksModel,
        template: $('.drink-template'),
        container: $('.drinks-container')
    });

    var dessertsView = createDessertsView({
        model: dessertsModel,
        template: $('.dessert-template'),
        container: $('.desserts-container')
    });

    pizzasModel.refresh();      //render pizzas
    drinksModel.refresh();      //render drinks
    dessertsModel.refresh();    //render desserts

    //remove the only alcoholic beverage from drinksModel
    var beer = drinksModel.getItemByName('Irn Bru');
    drinksModel.removeItem(beer);

    //when a view triggers 'addToCart'
    //add the new item to the cart
    pizzasView.on('addToCart', function(data){
        var pizza = pizzasModel.getItemByName(data.pizzaName);
        if (!pizza) {
            throw 'Invalid pizza.';
        }
        //add appropriate size label
        var renderLabel;
        var postLabel;

        if (data.pizzaSize == 0) {
            renderLabel = " (S)";
            postLabel = 'small';
        } else if (data.pizzaSize == 1) {
            renderLabel = " (M)";
            postLabel = 'medium';
        } else {
            renderLabel = " (L)";
            postLabel = 'large';
        }
        cartModel.addItem({
            type: 'pizza',
            itemName: data.pizzaName,
            sizeLabel: renderLabel,
            size: postLabel,
            price: pizza.prices[data.pizzaSize]
        });
    }); //addToCart event for pizzas

    drinksView.on('addToCart', function(data){
        var drink = drinksModel.getItemByName(data.drinkName);
        if (!drink) {
            throw 'Invalid drink.';
        }
        cartModel.addItem({
            type: 'drink',
            itemName: drink.name,
            price: drink.price
        });
    }); //addToCart event for drinks

    dessertsView.on('addToCart', function(data){
        var dessert = dessertsModel.getItemByName(data.dessertName);
        if (!dessert) {
            throw 'Invalid dessert.';
        }
        cartModel.addItem({
            type: 'dessert',
            itemName: dessert.name,
            price: dessert.price
        });
    }); //addToCart event for desserts

    //empty cart button handler
    $('.start-over').click(function(){
        cartModel.removeItems();
    });

    //continue button handler
    $('.continue').click(function(){
         var grandTotal = cartModel.getGrandTotalPrice();
         if (grandTotal < 20) {
            $('.min-alert').show();
         } else {
            $('.min-alert').hide();
            $('.info-modal').modal(); 
         }
    });

    //place order button/submission handler 
    $('.place-order').click(function(){
        var finalInfo;
        var custInfoForm = $('.custInfoForm');
        var customerInfo = {};

        customerInfo.name = custInfoForm.find('input[name="first-name"]').val() +
                            " " + custInfoForm.find('input[name="last-name"]').val();
        customerInfo.address1 = custInfoForm.find('input[name="addr-1"]').val();
        customerInfo.address2 = custInfoForm.find('input[name="addr-2"]').val();
        customerInfo.zip = custInfoForm.find('input[name="zip"]').val();
        customerInfo.phone = custInfoForm.find('input[name="phone-num"]').val();
        finalInfo = combineInfo(customerInfo, cartModel.getItems());

        //make sure all fields are filled out
        if (finalInfo.name && finalInfo.address1 && finalInfo.zip && finalInfo.phone) {
            $('#final-input').val(JSON.stringify(finalInfo));
            $('#final').submit();
        } else {
            $('.field-alert').show();
        }
    });

    //save cart to local storage
    cartModel.on('change', function(){
        localStorage.setItem('cart', cartModel.toJSON());
    });
});

//put the cart and customer information in a single object
function combineInfo(customerData, cartData) {
    var finalForm = {};
    var idx;

    finalForm.name = customerData.name;
    finalForm.address1 = customerData.address1;
    if (customerData.address2)
        finalForm.address2 = customerData.address2;
    finalForm.zip = customerData.zip;
    finalForm.phone = customerData.phone;
    finalForm.nextUrl = 'http://students.washington.edu/brettyam/info343/Homework-4.0/';
    finalForm.items = [];
    for (idx = 0; idx < cartData.length; ++idx) {
        var item = cartData[idx];
        if (item.type == 'pizza') {
            finalForm.items.push({
                'type': 'pizza',
                'name': item.itemName,
                'size': item.size
            });
        } else {
            finalForm.items.push({
                'type': item.type,
                'name': item.itemName,
            });
        }
    }
    return finalForm;
}