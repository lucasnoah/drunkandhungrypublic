'use strict';

/**
 * @ngdoc overview
 * @name drunkandhungryApp
 * @description
 * # drunkandhungryApp
 *
 * Main module of the application.
 */

var urlBase = 'https://rocky-shore-40201.herokuapp.com/';
var minOrderAmount = 1000;
var openHours = 'Wednesday-Sunday 10pm-4:30am'
//var urlBase = 'http://127.0.0.1:8000/'


angular
.module('drunkandhungryApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngStorage',
  'ngAutocomplete',
  'ngMessages',
  'satellizer',
  'formly',
  'formlyBootstrap',
  'angularSpinner',
  'angular-stripe',
  'cbuffer',
  'angularMoment',
  'ui.mask',
  'ui.bootstrap',
  "google.places",
  'tandibar/ng-rollbar',
  'ngGeolocation',
  'angulartics',
  'angulartics.google.analytics'
])

  .constant('API_BASE', urlBase)
  .constant('is', window.is)
  .constant('window.Stripe', window.Stripe)
  .constant('MIN_ORDER_AMOUNT', minOrderAmount)
  .constant('OPEN_HOURS', openHours)

  .config(function(RollbarProvider) {
  RollbarProvider.init({
    accessToken: "a3505e1297e946fca8a622a0cddd37e5",
    captureUncaught: true,
    payload: {
      environment: 'test'
    }
  });
})

.config(function (stripeProvider) {
  // SET UP STRIP PUBLIC KEY
  //stripeProvider.setPublishableKey('pk_test_b7DNvcW0ILbXaqffYQNo2DWU');
  stripeProvider.setPublishableKey('pk_live_qJnw48xCZlQdxfRX8OQrjez2');
})

.config(function ($routeProvider, $locationProvider) {
  // SET UP ROUTING AND CONTROLLERS MAPS
  $routeProvider
    .when('/', {
      templateUrl: 'views/splash.html',
      controller: 'SplashCtrl',
      controllerAs: 'splash'
    })
    .when('/shop', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .when('/cart', {
      templateUrl: 'views/cart.html',
      controller: 'CartCtrl',
      controllerAs: 'cart'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'login'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'SignupCtrl',
      controllerAs: 'signup'
    })
    .when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl',
      controllerAs: 'profile',
      authenticate: true
    })
    .when('/checkoutpayment', {
      templateUrl: 'views/checkoutpayment.html',
      controller: 'CheckoutpaymentCtrl',
      controllerAs: 'checkoutpayment',
      authenticate: true
    })

    .when('/orders', {
      templateUrl: 'views/orders.html',
      controller: 'OrdersCtrl',
      controllerAs: 'orders',
      authenticate:true
    })
    .when('/reset', {
      templateUrl: 'views/reset.html',
      controller: 'ResetCtrl',
      controllerAs: 'reset'
    })
    .when('/resetconfirm/:uid/:token', {
      templateUrl: 'views/resetconfirm.html',
      controller: 'ResetconfirmCtrl',
      controllerAs: 'resetconfirm'
    })
    .when('/ordercancellationmodal', {
      templateUrl: 'views/ordercancellationmodal.html',
      controller: 'OrdercancellationmodalCtrl',
      controllerAs: 'ordercancellationmodal'
    })
    .when('/orderisago', {
      templateUrl: 'views/orderisago.html',
      controller: 'OrderisagoCtrl',
      controllerAs: 'orderisago'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl',
      controllerAs: 'about'
    })
    .when('/support', {
      templateUrl: 'views/support.html',
      controller: 'SupportCtrl',
      controllerAs: 'support'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
})

.run(function($sessionStorage) {
  // INIT SESSION STORAGE VARIABLES
  $sessionStorage.locationVisibility = true
  $sessionStorage.checkoutButtonVisibility = false
})

.run(function(amMoment) {
  // set momement local
    amMoment.changeLocale('us');
})

  .constant('angularMomentConfig', {
    timezone: 'US/Eastern' // e.g. 'Europe/London'
})

.config(function ($httpProvider,  $authProvider, $sceDelegateProvider) {
  // SET UP CONFIGURATION FOR TOKEN AUTH AND SATELIZER  
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = false;
  $authProvider.httpInterceptor = function () {
    return true;
  },
    $authProvider.withCredentials = false;
  $authProvider.tokenRoot = false;
  $authProvider.baseUrl = urlBase;
  $authProvider.loginUrl = 'auth/login/';
  $authProvider.signupUrl = '/auth/register/';
  $authProvider.unlinkUrl = '/auth/unlink/';
  $authProvider.tokenName = 'token';
  $authProvider.tokenPrefix = 'satellizer';
  $authProvider.authHeader = 'Authorization';
  $authProvider.authToken = 'JWT';
  $authProvider.storageType = 'sessionStorage';
  $httpProvider.defaults.useXDomain = true;
  $authProvider.authToken = 'JWT';
  $authProvider.tokenPrefix = 'satellizer_jwt';  // to not collide with regular token auth

  //delete $httpProvider.defaults.headers.common["X-Requested-With"];

  $authProvider.facebook({
    name: 'facebook',
    url: 'oauth/login/social/jwt_user/',
    authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
    redirectUri: window.location.origin + '/',
    requiredUrlParams: ['display', 'scope'],
    scope: ['email'],
    scopeDelimiter: ',',
    display: 'popup',
    oauthType: '2.0',
    popupOptions: { width: 580, height: 400 },
    clientId: '1843495915887373',
    responseType: 'code',
  })
  $authProvider.httpInterceptor = true;

  $httpProvider.defaults.headers.common["Accept"] = "application/json";
  $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
  // DEV WHITELIST STUFF
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    // Allow loading from outer templates domain.
    'self',
    'http://localhost:9000',
    'http://localhost:9000/',
    'http://localhost:9000/*',
    'http://127.0.0.1:8000/*',
    'http://127.0.0.1:8000/',
    'http://0.0.0.0:8000/*',
    'http://0.0.0.0:8000',
  ])

})
.run(function ($rootScope, $location, $auth) {
  // check for token on route change
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !$auth.isAuthenticated()) {
      $location.path('/login');
    }
  });
})

.run(function(formlyConfig, is) {
  // SET UP BONUS FORMLY VALIDATORS. 
  addTypeForValidator('hexColor');
  addTypeForValidator('creditCard');
  addTypeForValidator('nanpPhone');
  addTypeForValidator('equal');

  function addTypeForValidator(validatorName) {
    var validators = {};
    validators[validatorName] = {
      expression: is[validatorName],
      message: '"Invalid ' + validatorName + '"'
    };
    formlyConfig.setType({
      name: validatorName,
      defaultOptions: {
        validators: validators
      }

    });

    formlyConfig.setType({
      name: 'maskedInput',
      extends: 'input',
      template: '<input class="form-control" ng-model="model[options.key]" />',
      defaultOptions: {
        ngModelAttrs: {
          mask: {
            attribute: 'ui-mask'
          },
          maskPlaceholder: {
            attribute: 'ui-mask-placeholder'
          }
        },
        templateOptions: {
          maskPlaceholder: ''
        }
      }
    });

    formlyConfig.setWrapper({
      name: 'loader',
      template: [
        '<formly-transclude></formly-transclude>',
        '<span class="glyphicon glyphicon-refresh loader" ng-show="to.loading"></span>'
      ].join(' ')
    });

    formlyConfig.setType({
      name: 'input-loader',
      extends: 'input',
      wrapper: ['loader']
    });

    formlyConfig.setWrapper({
      template: '<formly-transclude></formly-transclude><div my-messages="options"></div>',
      types: ['input', 'checkbox', 'select', 'textarea', 'radio', 'input-loader']
    });
  }
})
.run(function(formlyConfig, API_BASE, $http) {
  // SET UP ASYNC VALIDATOR FOR USER SIGNUP. PREVENTS DUPLICATE USERS FROM BEING CREATED
  formlyConfig.setType({
        name:'placeAutoComplete',
        template:"<label class='control-label' ng-if='to.label'>{{to.label}}</label>" +
            "<input g-places-autocomplete class='form-control' ng-model='model[options.key]'" +
        "ng-attr-options='to.autocompleteOptions'" +
        "ng-attr-force-selection='to.forceSelection'/>",
        link: function(scope, el, attrs) {},
    });

  formlyConfig.setType({
      name: 'isUniqueUser',
      defaultOptions: {
        validators: {
          isUniqueUser: function($viewValue, $modelValue, $scope){
          var value = $viewValue || $modelValue;
          return $http.post(API_BASE + 'customers/check_user/', {username:value}).success(function(d){
            return 'Unique'
          }).error(function(msg){
            throw new Error('not Unique')
          })
        }
        }
      }
  })

  formlyConfig.setType({
    name: 'creditCard',
    overwriteOk: true,
    extends: 'input',
    defaultOptions: {
      ngModelElAttrs: {
        'cc-number': ''
      },
      ngModelAttrs: {
        ccType: {
          bound: 'cc-type'
        }
      }
    }
  })

  formlyConfig.setType({
    overwriteOk: true,
    name: 'cvc',
    extends: 'input',
    defaultOptions: {
      ngModelElAttrs: {
        'cc-cvc': ''
      },
      ngModelAttrs: {
        ccType: {
          bound: 'cc-type'
        }
      }
    }
  })
  formlyConfig.setType({
    overwriteOk: true,
    name: 'month',
    extends: 'input',
    defaultOptions: {
      ngModelElAttrs: {
        'cc-exp-month': ''
      }
    }
  });

  formlyConfig.setType({
    overwriteOk: true,
    name: 'year',
    extends: 'input',
    defaultOptions: {
      ngModelElAttrs: {
        'cc-exp-year': ''
      }
    }
  })
})

.run(function(formlyConfig, formlyValidationMessages) {
  formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';
  formlyValidationMessages.addStringMessage('required', 'This field is required');
  formlyValidationMessages.addStringMessage('email', 'Please enter a valid email');
  formlyValidationMessages.addStringMessage('isUniqueUser', 'This username is already taken.');
})
.config(function (formlyConfigProvider) {
  formlyConfigProvider.setWrapper({
    name: 'validation',
    types: ['input'],
    templateUrl: 'views/error-messages.html'
  })
})
