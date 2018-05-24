(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .config(Configure);


    function Configure($routeProvider) {

        $routeProvider

            .when("/login", {
                    templateUrl: "client/views/login/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"
            })

            .when("/home", {
                templateUrl: "client/views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })

            .when("/category/:cname", {
                templateUrl: "client/views/category/category.view.html",
                controller: "CategoryController",
                controllerAs: "model"
                // ,
                // resolve:{
                //     loggedIn:checkLoggedIn
                // }
            })

            .when("/profile", {
                templateUrl: "client/views/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    loggedIn:checkLoggedIn
                }
            })

            .when("/category/:cid", {
                templateUrl: "client/views/category/specificCategory.view.html",
                controller: "specificCategoryController",
                controllerAs: "model",
                resolve:{
                    loggedIn:checkLoggedIn
                }
            })

            .when("/category/:cid/instrument/:insId", {
                templateUrl: "client/views/category/bookInstrument.view.html",
                controller: "bookInstrumentController",
                controllerAs: "model"
            })

            .when("/dashboard", {
                templateUrl: "client/views/category/dashboard.view.html",
                controller: "dashboardController",
                controllerAs: "model",
                resolve:{
                    loggedIn:checkLoggedIn
                }
            })


            .otherwise({
                redirectTo: "home"
            });


        function checkLoggedIn(UserService,$location,$q,$rootScope) {
            var deferred=$q.defer();
            UserService
                .loggedIn()
                .then(function (response) {
                    var user=response.data;
                    console.log(user);
                    if(user === '0'){
                        $rootScope.currentUser = null;
                        deferred.reject();
                        $location.url("home");
                    }else{
                        $rootScope.currentUser=user;
                        deferred.resolve();
                    }
                },function (err) {
                    $location.url("home");
                });
            return deferred.promise;
        }

            }

})();