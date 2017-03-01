  'use strict';

/**
 * @ngdoc service
 * @name drunkandhungryApp.userService
 * @description
 * # userService
 * Service in the drunkandhungryApp.
 */
angular.module('drunkandhungryApp')
  .service('userService', function ($http, API_BASE, $sessionStorage) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    // TODO: refactor each of these http requests as a promise. find where they are called and add 'then' promise functionality

    this.register = function(user_data){
      return new Promise(function(resolve, reject) {
        $http.post(API_BASE + 'auth/register/', user_data)
        .success(function (res) {
                  // var user = {
                  //   username: userData.email,
                  //   password: userData.password
                  // }
                  // console.log('Signup log auth: ', $auth)
                  resolve(res)
        })
        .error(function(err) {
          reject(err)
        })

      })
    }

    this.registerLocation = function(address_data){
      console.log('registering location')
      return new Promise(function(resolve, reject) {
        $http.post(API_BASE + 'regions/check_region/', address_data)
          .then(function successCallback(res) {
            $sessionStorage.currentRegionID = res.data.id;
            $sessionStorage.region =  res.data;

            resolve(res)
          }, function errorCallback(errRes) {
            console.log('error! register location')
            $sessionStorage.currentRegionID = undefined
            reject(errRes)
          });
      })
    }

    this.getCustomerData = function() {
      return new Promise(function(resolve, reject) {
        $http.get(API_BASE + 'customers/get_customer_data/')
        .success(function(res) {
          resolve(res)
        })
        .error(function(err) {
          reject(err)
        })
      })
    }

    this.fetchUserOrders = function(){
      return $http.get(API_BASE + 'orders/');
    }

    this.updateUserDetails = function(details) {
      console.log('Details to update:', details)
      return new Promise(function(resolve, reject) {
        $http.post(API_BASE + 'customers/update_user/', details)
        .success(function(res) {
          resolve(res)
        })
        .error(function(err) {
          reject(err)
        })
      })
    }

    this.sendToken = function(token) {
      return new Promise(function(resolve, reject) {
        $http.post(API_BASE + 'customers/add_card/', token)
        .success(function(res) {
          resolve(res)
        })
        .error(function(err) {
          reject(err)
        })
      })
    }

    this.available_products = function(regionID) {
      return new Promise(function(resolve, reject) {
        console.log('return item list')
        $sessionStorage.beerLoader = true;

        // var itemList = [{
        //     id: 1, // primary key in db
        //     title: 'candy',
        //     price: '300',
        //     imgUrl: 'http://www.partycity.com/images/products/en_us/gateways/candy-2015/candy/lollipops.jpg'
        //   },
        //   {
        //     id: 2,
        //     title: 'drink',
        //     price: '321',
        //     imgUrl: 'https://www.nasa.gov/sites/default/files/styles/image_card_4x3_ratio/public/thumbnails/image/leisa_christmas_false_color.png?itok=Jxf0IlS4'
        //   },
        //   {
        //     id: 3,
        //     title: 'burrito',
        //     price: '532',
        //     imgUrl: 'http://i.dailymail.co.uk/i/pix/2016/03/08/22/006F877400000258-3482989-image-a-10_1457476109735.jpg'
        //   }
        // ];

        // resolve(itemList)

        return $http.post(API_BASE + 'regions/available_products/', regionID)
          .then(function successCallback(res) {
            console.log('Available products from region id===')
            console.log('ID: ', regionID)
            console.log('Res: ', res)
            $sessionStorage.beerLoader = false;
            resolve(res.data)
          }, function errorCallback(errRes) {
            $sessionStorage.beerLoader = false;
            reject(errRes)
          });
      })
    }

    /*PASSWORD RESET METHODS */
    this.sendPasswordResetEmail = function(email){
      var data = {
        email:email
      }
      return $http.post(API_BASE + 'auth/password/reset/', data)
    }

    this.confirmPasswordReset = function(data){
      return $http.post(API_BASE + 'auth/password/reset/confirm/', data);
    }

    this.checkCoupon = function(data){
      return $http.post(API_BASE + 'orders/check_coupon/', data);
    }

  });
