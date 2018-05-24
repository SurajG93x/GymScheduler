var mongoose = require ("mongoose");

module.exports = function () {
    var UserSchema = require("./user.schema.server.js")();
    var UserInfo =  mongoose.model("UserInfo", UserSchema);

    var api = {
        findUserByGoogleId:findUserByGoogleId,
        createUser: createUser,
        findUserById:findUserById,
        updateUser:updateUser

    };

    return api;


    function findUserByGoogleId(id){
        return UserInfo.findOne({"google.id":id});
    }


    function createUser(user) {
        return UserInfo.create(user);
    }

    function findUserById(userId) {
        console.log(userId);
        return UserInfo.findById(userId);
    }

    function updateUser(id,newUser) {

        return UserInfo
            .update({_id:id},{
                $set: {
                    firstName:newUser.firstName,
                    lastName:newUser.lastName,
                }
            });
    }

}