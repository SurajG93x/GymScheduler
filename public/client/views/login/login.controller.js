(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("LoginController",LoginController);

    var users=[
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", role:"faculty"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", role:"faculty"  },
        {_id: "345", username: "carl",   password: "carl",   firstName: "Charly", lastName: "Garcia", role:"admin"  },
        {_id: "456", username: "dean", password: "dean", firstName: "Joe",   lastName: "Dean",role:"partner" }
    ]

    function LoginController($rootScope,$location) {
        var vm = this;
        vm.message = null;
        vm.login = login;

        function init(){

        }init();

        function login(userEmail,password) {

            for (var i in users)
            {
                if(users[i].username===userEmail&&users[i].password===password)
                {
                    $rootScope.currentUser = users[i];
                    if(users[i].role === "faculty")
                    {
                        $location.url("/faculty/"+users[i]._id);
                    }

                    if(users[i].role === "admin")
                    {
                        $location.url("/admin/"+users[i]._id);
                    }

                    if(users[i].role === "partner")
                    {
                        $location.url("/partner");
                    }
                }
            }
        }

    }
})();