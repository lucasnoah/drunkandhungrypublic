'use strict';

/**
 * @ngdoc directive
 * @name drunkandhungryApp.directive:productCarousel
 * @description
 * # productCarousel
 */


var ctrl = function ($scope, CBuffer, $location, utilityService) {


        $scope.decrementItemCount = function(item) {
      utilityService.decrement(item)
    }

    $scope.incrementItemCount = function(item) {
      utilityService.increment(item)
    }

        //variable used to toggle the left side of the array. Is incremented and decrements with the toggle left
        //or right buttons are clicked.
        var startingSlide = 0;
        var items = $scope.items;


        $scope.numberOfSlides = 4;
        console.log('items in car', items)

        //watch for data change while the $http call resolves
                    //create a new slider array with the length of the items array
                    var sliderArray = CBuffer($scope.items.length);
                    //push the items to the circular buffer

                    items.sort(function (a, b) {
                                  if (a.order_by > b.order_by) {
                                    return 1;
                                  }
                                  if (a.order_by < b.order_by) {
                                    return -1;
                                  }
                                  // a must be equal to b
                                  return 0;
                                });

                    angular.forEach(items, function(key, val){

                        sliderArray.push(key)
                        });

                    $scope.displayedItems = sliderArray.toArray().slice(0 ,($scope.numberOfSlides - 1));
  

      $scope.hasItems = function(){
        //check to see if event has items
        if(items.length > 0){
          return true
        }
        else{
          return false
        }
      }


        $scope.toggleLeft = function () {

            sliderArray.rotateRight();
            $scope.displayedItems = sliderArray.toArray().slice(0,($scope.numberOfSlides - 1));
        }

        $scope.toggleRight = function () {
            sliderArray.rotateLeft()
             $scope.displayedItems = sliderArray.toArray().slice(0,($scope.numberOfSlides - 1));
        }


    }

var directive = function () {


            return {
                templateUrl: 'views/product-carousel.html',
                restrict: 'E',
                scope: {
                    items: '<',

                },
                controller: ctrl,

                link: function (scope, element, attrs) {

                }
            }
        };



angular.module('drunkandhungryApp')
  .directive('productCarousel', directive);
