//
// foodcard-store.jsx
//

var Reflux = require('reflux');
var objectAssign = require('object.assign');

var FoodCardActions = require('../actions/foodcard-actions');
var Api = require('../utils/api');
var Auth = require('../utils/auth');
var MealType = require('../utils/constants').MealType;

module.exports = Reflux.createStore({

  listenables: [FoodCardActions],
  
  getFoodCard: function(accountId, date, token) {

      var url = 'accounts/'+ accountId +'/mealCards/' + date; 
      Api.get(url, token)
        .then(function(json){
          if (json.success) {
            this.foodCard = json.data;
            this.triggerChange();
          }
        }.bind(this));
  },

  // call to create the foodcard info on server side
  // use callback to return the status back to caller in case there are errors
  updateFoodCard: function(accountId, date, foodCard, token, callback) {

    var url = 'accounts/'+ accountId +'/mealCards/' + date; 

    //convert foodCard to [{mealTypeId, recorded}]
    var mealItems = [
        {mealTypeId: MealType.Breakfast.id,
         recorded: foodCard.breakfast? foodCard.breakfast : false},
        {mealTypeId: MealType.Lunch.id,
         recorded: foodCard.lunch? foodCard.lunch : false},
        {mealTypeId: MealType.Dinner.id,
         recorded: foodCard.dinner? foodCard.dinner : false}
      ];

    Api.post(url, mealItems, token)
      .then(function(json){
        if (json.success) {
          this.foodCard = json.data;
          this.triggerChange();
        }
        // return the error code so that the caller can display proper UI to user
        if (callback) callback({success: json.success, status: json.status});
      }.bind(this))
      .catch(function (error) {
          console.log('Error when calling updateFoodCard: ' + error.toString());
          if (callback) callback({success: false, status: 500});
      });    
  },

  triggerChange: function() {

    // we first convert the array of objects format received from server
    // to a single object with breakfast, lunch and dinner properties
    var threeMealCard = {breakfast: false, lunch: false, dinner: false};

    for (var i=0; i<this.foodCard.length; i++) {
      var item = this.foodCard[i];
      if(item.mealTypeId === MealType.Breakfast.id) {
        threeMealCard.breakfast = item.recorded;
      } else if(item.mealTypeId === MealType.Lunch.id) {
        threeMealCard.lunch = item.recorded;
      } else if(item.mealTypeId === MealType.Dinner.id) {
        threeMealCard.dinner = item.recorded;
      } 
    }

    this.trigger('change', threeMealCard);
  },

  getInitialState: function() {
    this.foodCard = [];

    return this.foodCard;
  }
});
