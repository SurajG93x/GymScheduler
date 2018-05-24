(function () {
        angular
            .module("ServiceLearningApp")
            .factory("UserService", UserService);

        function UserService($http) {
            var api = {
                logout: logout,
                loggedIn: loggedIn,
                findUserById:findUserById,
                updateUser:updateUser,
                getInstuments:getInstuments,
                book:book,
                findUserBookings:findUserBookings,
                cancel:cancel
            };
            return api;

            function cancel(userId,name,time) {
                var url='/api/cancel/'+userId+'/name/'+name+'/time/'+time;
                return $http.get(url);
            }

            function findUserBookings(userId) {
                var url='/api/userBookiings/'+userId;
                return $http.get(url);
            }

            function book(name,time,currentUser) {
                console.log(currentUser)
                var url='/api/book/name/'+name+'/time/'+time;
                return $http.put(url,currentUser);
            }

            function getInstuments(instrumentName) {
                var url='/api/instruments/'+instrumentName;
                return $http.get(url);
            }

            function findUserById(id) {
                var url="/api/user/"+id;
                return $http.get(url);
            }

            function loggedIn() {
                return $http.get("/api/loggedIn");
            }

            function logout() {
                return $http.post("/api/logout");
            }

            function updateUser(id,newUser) {
                var url="/api/user/"+id;
                return $http.put(url,newUser);
            }

        }
    }


)();