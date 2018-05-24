(function() {
    angular.module("ServiceLearningApp")
        .controller("CategoryController1",CategoryController1);

    function CategoryController1($rootScope,$location,UserService,$scope) {
        var vm = this;
        vm.logout=logout;

        var id=$rootScope.currentUser._id;
        console.log(id)

        function init(){
            console.log("category page")
        }init();

        $scope.countryList = [
            "Adjustable Sit Up Benches", "Bar","Ab Wheel", "Stability Ball", "Roman Chairs", "Hyper Bench", "SEATED CABLE ROW", "BACK EXTENSIONS", "Assisted Pull-up", "Wide-Grip Pull-Up", "Bent-over Row","Barbell", "Bench Press Kit", "Chest Bench Kit", "Dumnble Kit", "Chest Fly Machine", "Chest Press Machine", "Dip Machine", "Biceps Curl", "Triceps Dip", "Fly Machine", "Seated High Row", "Lat Pull-Down,Seated", "Shoulder Press", "Treadmill", "Stair Mill", "Rowing Machine", "Spin Bike", "Jacob's Ladder", "ARC Trainer"
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



    }


})();