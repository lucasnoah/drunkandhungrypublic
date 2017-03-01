'use strict';

/**
 * @ngdoc function
 * @name drunkandhungryApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the drunkandhungryApp
 */

angular.module("drunkandhungryApp")
  .controller("googleautocompleteCtrl", ['$scope', 'userService',
    '$sessionStorage', 'utilityService', '$location', '$geolocation', function ($scope,
                                                   userService,
                                                   $sessionStorage,
                                                   utilityService, $location, $geolocation) {

      $scope.result = '';
      $scope.details = undefined;
      $scope.options = {};
      $scope.googleForm = {};
      $scope.autocomplete = undefined;

      $scope.$parent.locationSelectorVisibility = true;

      $scope.locationWarningMessage = {
        visible: false,
        status: '',
        message: ''
      }

      $scope.addressFields = [
          {
            key: 'location',
            type: 'placeAutoComplete',

            templateOptions: {
              label: 'Enter your address',
              focus:true,
              placeholder: 'Enter your address',
              autocompleteOptions: {
                types: ['establishment', 'geocode'],
                forceSelection:true,
                required:true,

              }
            }
          }
      ];



      $scope.sessionStorage = $sessionStorage;

      $scope.enterAddress = function (details) {
        console.log("scope details",$scope.details, $scope.autocomplete)
        if (details==undefined || typeof(details) == 'string'){
          $scope.locationWarningMessage.message = "Please enter an address";
          $scope.locationWarningMessage.visible = true;
          return null
        }

        else {
          $scope.beerLoader = true;
          $scope.beerLoaderMessage = "Loading The Party";
          // TODO: maybe scrolly wheel here
          checkAddressForAddressPrecision(details)
            .then(function (res) {
              console.log("res out", res)
              // update UI!
              $sessionStorage.latitude = res.data.details.geometry.location.lat();
              $sessionStorage.longitude = res.data.details.geometry.location.lng();
              $sessionStorage.currentFormattedAddress = res.data.details.formatted_address;
              return userService.registerLocation(res.data)
            })
            .then(function (res) {
              $scope.beerLoader = false;

              // end spinny wheel
              // console.log(' --- 2 ---  res: ', res)
              if (res.status === 200) {
                // in region!
                $sessionStorage.canShop = true;
                return userService.available_products({region_id: res.data.id})
              } else if (res.status === 204) {
                // not in region
                $scope.locationWarningMessage.visible = true;
                $scope.locationWarningMessage.message = 'This address is not served!';
                throw({msg: 'This address is not served!'})
              }
            })
            .then(function (res) {
              // update UI
              $sessionStorage.locationStatus = false;
              $sessionStorage.locationSelectorVisibility = false;
              $sessionStorage.checkoutButtonVisibility = true;
              // save data to sesion storage
              return utilityService.saveItemListToSessionStorage(res);

              // $sessionStorage.itemsList = res
              // force the render
            })
            .then(function (res) {
              return utilityService.initializeCartCounter()
            })
            .then(function (res) {
              return utilityService.countCartItems()
            })
            .then(function (res) {
              // console.log('dit it!', res)
              $location.path('/shop');
              $scope.$apply();

            })
            .catch(function (err) {
              // TODO: end spinny wheel?

              console.log('err in func', err)
              // update UI

              $scope.beerLoader = false;
              $sessionStorage.itemsList = false;
              $sessionStorage.locationStatus = err.msg;
              $sessionStorage.locationSelectorVisibility = true;
              $sessionStorage.checkoutButtonVisibility = false;
              $sessionStorage.currentFormattedAddress = err.msg;

              // force the render
              $scope.$apply()
            })

        }
      };

      $scope.getLocationFromHtml = function() {

        $geolocation.getCurrentPosition({
          timeout: 60000
        }).then(function (position) {
          //$scope.details.location = position;
          console.log("position", position)
          $scope.beerLoader = true;
          $scope.beerLoaderMessage = "Loading The Party";
          // TODO: maybe scrolly wheel here

          var data = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            details: {
              formatted_address: "none"
            }
          }
          userService.registerLocation(data).then(function (res) {
            console.log('user service reg local', res)
            if (res.status === 200) {
              // in region!
              $sessionStorage.canShop = true;
              $sessionStorage.addressConfirmed = false;
              return userService.available_products({region_id: res.data.id})
            } else if (res.status === 204) {
              // not in region
              $scope.locationWarningMessage.visible = true;
              $scope.locationWarningMessage.message = 'This address is not served!';
              throw({msg: 'This address is not served!'})
            }
          }).then(function (res) {
            // update UI
            $sessionStorage.locationStatus = false;
            $sessionStorage.locationSelectorVisibility = false;
            $sessionStorage.checkoutButtonVisibility = true;
            // save data to sesion storage
            return utilityService.saveItemListToSessionStorage(res);

            // $sessionStorage.itemsList = res
            // force the render
          })
            .then(function (res) {
              return utilityService.initializeCartCounter()
            })
            .then(function (res) {
              return utilityService.countCartItems()
            })
            .then(function (res) {
              // console.log('dit it!', res)
              $location.path('/shop');
              $scope.$apply();

            })
            .catch(function (err) {
              // TODO: end spinny wheel?

              // update UI
              $scope.beerLoader = false;
              $sessionStorage.itemsList = false;
              $sessionStorage.locationStatus = err.msg;
              $sessionStorage.locationSelectorVisibility = true;
              $sessionStorage.checkoutButtonVisibility = false;
              $sessionStorage.currentFormattedAddress = err.msg;
              // force the render
              $scope.$apply()
            })

        })
      }

      $scope.hideLocationWarningMessage = function () {
        $scope.locationWarningMessage.visible = false
      };

      var checkAddressForAddressPrecision = function (addressDetails) {
        console.log("checking for address percision")
        return new Promise(function (resolve, reject) {

          var address_components = addressDetails.address_components;
          // grab lat/lon
          var latitutde = addressDetails.geometry.location.lat();
          var longitude = addressDetails.geometry.location.lng();
          console.log('verifying address details', latitutde, longitude)
          // search for streen numbers in address_components
          var foundStreet = false;
          for (var i in address_components) {
            console.log(address_components[i])
            var thisComponent = address_components[i];
            var thisComponentTypes = thisComponent.types;
            for (var j in thisComponentTypes) {
              var thisType = thisComponentTypes[j];
              if (thisType === 'street_number') {
                foundStreet = true;
                break
              }
            }
          }
          if (!foundStreet) {
            reject({
              msg: 'Not a valid street address!'
            })
          } else {
            resolve({
              msg: 'Valid address',
              data: {
                latitude: latitutde,
                longitude: longitude,
                details: addressDetails
              }
            })
          }
        })
      };

    }]);
