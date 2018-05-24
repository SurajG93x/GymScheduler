(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("bookInstrumentController",bookInstrumentController);

    var instruments=[

        // { "_id": "Adjustable Sit Up Benches", "n1": "1:00 PM", "n2": "1:30 PM", "n3":"2:00 PM", "n4":"2:30 PM", "n5":"3:00 PM", "n6":"3:30 PM","n7":"4:00 PM","n8":"4:30","n9":"5:00 PM","n10":"5:30","n11":"6:00","n12":"6:30","n13":"7:00",
        //     "a1":"f","a2":"t","a3":"t","a4":"t","a5":"t","a6":"t","a7":"t","a8":"t","a9":"t","a10":"t","a11":"t","a12":"t","a13":"t"},

        {"_id": "Adjustable Sit Up Benches", "n": "1:00 - 1:30 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "1:30 - 2:00 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "2:00 - 2:30 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "2:30 - 3:00 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "3:00 - 3:30 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "3:30 - 4:00 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "4:00 - 4:30 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "4:30 - 5:00 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "5:00 - 5:30 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "5:30 - 6:00 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "6:00 - 6:30 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "6:30 - 7:00 PM","a":"t"},
        {"_id": "Adjustable Sit Up Benches", "n": "7:00 - 7:30 PM","a":"t"},
        {"_id": "back", "n": "7:00 - 7:30 PM","a":"t"}
    ]

    var categories=[
        {"name":"Abs"},{"name":"Back"},{"name":"Chest"},{"name":"Arms"},{"name":"Cardio"},{"name":"Legs"}
    ]

    var subCategories=[
        {id:"Abs",name:"Adjustable Sit Up Benches"},{id:"Abs",name:"Bar"},{id:"Abs",name:"Ab Wheel"},{id:"Abs",name:"Stability Ball"},{id:"Abs",name:"Roman Chairs"},{id:"Abs",name:"Hyper Bench"},
        {id:"Back",name:"SEATED CABLE ROW"},{id:"Back",name:"BACK EXTENSIONS"},{id:"Back",name:"Assisted Pull-up"},{id:"Back",name:"Wide-Grip Pull-Up"},{id:"Back",name:"Bent-over Row"},{id:"Back",name:"Barbell"},
        {id:"Chest",name:"Bench Press Kit"},{id:"Chest",name:"Chest Bench Kit"},{id:"Chest",name:"Dumbbell Kit"},{id:"Chest",name:"Chest Fly Machine"},{id:"Chest",name:"Chest Press Machine"},{id:"Chest",name:"Dip Machine"},
        {id:"Arms",name:"Biceps Curl"},{id:"Arms",name:"Triceps Dip"},{id:"Arms",name:"Fly Machine"},{id:"Arms",name:"Seated High Row"},{id:"Arms",name:"Lat Pull-Down,Seated"},{id:"Arms",name:"Shoulder Press"},
        {id:"Cardio",name:"Treadmill"},{id:"Cardio",name:"Stair Mill"},{id:"Cardio",name:"Rowing Machine"},{id:"Cardio",name:"Spin Bike"},{id:"Cardio",name:"Jacob's Ladder"},{id:"Cardio",name:"ARC Trainer"},
        {id:"Legs",name:"Leg Press"},{id:"Legs",name:"Leg Extension"},{id:"Legs",name:"Hamstring Curl"},{id:"Legs",name:"Seated Calf Raise"},{id:"Legs",name:"Standing Calf Raise"},{id:"Legs",name:"Leg Abductor"}
    ]

    function bookInstrumentController($rootScope,$location,$routeParams,$scope,UserService,$window) {
        var vm = this;

        vm.categories=categories;
        vm.search=search;
        vm.userBookings=[]
        vm.logout=logout;

        if($rootScope.currentUser) {
            var id = $rootScope.currentUser._id;
            console.log(id)
        }


        vm.ins=[]
        vm.currentUser=id;
        console.log(vm.currentUser)

        vm.instrumentName=$routeParams.insId;
        vm.type=$routeParams.cid;
        vm.book=book;


        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/home")
                    },function (error) {
                        $location.url("/home")
                    }
                )
        }

        function init(){


            // console.log(vm.instrumentName)
            // console.log(vm.type)

            UserService.getInstuments(vm.instrumentName)
                .then(
                    function (response) {
                        vm.ins=response.data;
                        console.log(vm.ins);
                    },
                    function (err) {
                        vm.error="Error Not Found"
                    }
                )
            // for(var i in instruments)
            // {
            //     if(instruments[i]._id===vm.instrumentName)
            //     {
            //         vm.ins.push(instruments[i]);
            //     }
            // }

        // console.log(vm.ins);
        }init();

        function search(subcat) {
            console.log(subcat)
            for(var i in subCategories)
            {
                if(subcat===subCategories[i].name)
                {
                    $location.url("/category/"+subCategories[i].id+"/instrument/"+subCategories[i].name);
                }
            }

        }

        function book(name,time) {
            if(!id)
            {
                $window.alert("Sign in using your Husky ID to reserve Equipments")
                $location.url("/home");
            }
            else
            {

                UserService.findUserBookings($rootScope.currentUser._id)
                    .then(
                        function (response) {
                            vm.userBookings=response.data;
                            console.log(vm.userBookings.length);
                            if(vm.userBookings.length=="8")
                            {
                                vm.error="Cannot book more than 8 Equipments"
                                console.log(vm.error)
                            }
                            else{
                                UserService.book(name,time,$rootScope.currentUser)
                                    .then(
                                        function (response) {

                                            UserService.getInstuments(vm.instrumentName)
                                                .then(
                                                    function (response) {
                                                        vm.ins=response.data;
                                                        console.log(vm.ins);
                                                        vm.success="Equipment reserved. Check dashboard for modifications"
                                                    },
                                                    function (err) {
                                                        vm.error="Error Not Found"
                                                    }
                                                )

                                        },
                                        function (err) {
                                            vm.error="Error Not Found"
                                        }
                                    )
                            }
                        },
                        function (err) {
                            vm.error="Error Not Found"
                        }
                    )





                // for(var i in instruments)
                // {
                //     if(instruments[i]._id===name&&instruments[i].n===time)
                //     {
                //         instruments[i].a="f";
                //         vm.userBookings.push({"_id":id,"userName":$rootScope.currentUser.firstName+" "+$rootScope.currentUser.lastName,"insName":name,"insTime":time})
                //         console.log(vm.userBookings)
                //     }
                // }
            }
        }


        $scope.countryList = [
            "Adjustable Sit Up Benches", "Bar","Ab Wheel", "Stability Ball", "Roman Chairs", "Hyper Bench", "SEATED CABLE ROW", "BACK EXTENSIONS", "Assisted Pull-up", "Wide-Grip Pull-Up", "Bent-over Row","Barbell", "Bench Press Kit", "Chest Bench Kit", "Dumbbell Kit", "Chest Fly Machine", "Chest Press Machine", "Dip Machine", "Biceps Curl", "Triceps Dip", "Fly Machine", "Seated High Row", "Lat Pull-Down,Seated", "Shoulder Press", "Treadmill", "Stair Mill", "Rowing Machine", "Spin Bike", "Jacob's Ladder", "ARC Trainer"
        ];

        $scope.complete = function(string){
            $scope.hidethis = false;
            var output = [];
            angular.forEach($scope.countryList, function(country){
                if(country.toLowerCase().indexOf(string.toLowerCase()) >= 0)
                {
                    output.push(country);
                }
            });
            $scope.filterCountry = output;
        }

        $scope.fillTextbox = function(string){
            $scope.country = string;
            $scope.hidethis = true;
        }



    }
})();