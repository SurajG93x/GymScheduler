(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("specificCategoryController",specificCategoryController);

    var instruments=[
        { "_id": "Abs", "n1": "Adjustable Sit Up Benches", "n2": "Bar", "n3":"Ab Wheel", "n4":"Stability Ball", "n5":"Roman Chairs", "n6":"Hyper Bench" },
        { "_id": "Back", "n1": "SEATED CABLE ROW", "n2": "BACK EXTENSIONS", "n3":"Assisted Pull-up", "n4":"Wide-Grip Pull-Up", "n5":"Bent-over Row", "n6":"Barbell" },
        { "_id": "Chest", "n1": "Bench Press Kit", "n2": "Chest Bench Kit", "n3":"Dumnble Kit", "n4":"Chest Fly Machine", "n5":"Chest Press Machine", "n6":"Dip Machine" },
        { "_id": "Arms", "n1": "Biceps Curl", "n2": "Triceps Dip", "n3":"Fly Machine", "n4":"Seated High Row", "n5":"Lat Pull-Down,Seated", "n6":"Shoulder Press" },
        { "_id": "Cardio", "n1": "Treadmill", "n2": "Stair Mill", "n3":"Rowing Machine", "n4":"Spin Bike", "n5":"Jacob's Ladder", "n6":"ARC Trainer" },
        { "_id": "Legs", "n1": "Leg Press", "n2": "Leg Extension", "n3":"Hamstring Curl", "n4":"Seated Calf Raise", "n5":"Standing Calf Raise", "n6":"Leg Abductor" }
    ]


    function specificCategoryController($rootScope,$location,$routeParams) {
        var vm = this;


        function init(){
            vm.instrumentName=$routeParams.cid;

            for(var i in instruments)
            {
                if(vm.instrumentName===instruments[i]._id)
                {
                    vm.ins=instruments[i];
                }
            }

            console.log(vm.ins);

        }init();



    }
})();