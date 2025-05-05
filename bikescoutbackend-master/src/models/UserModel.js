const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const userSchema=new Schema({
    Firstname:{
        type:String
    },
    Lastname:{

        type:String

    },

    Username:{
        type:String,
    },

    roleId:{    
        type:Schema.Types.ObjectId,
        ref:"roles",
    },

    email:{
       type:String,
       unique:true,
    


    },

    Phonenumber:{
        type:Number,
    },

    password:{

        type:String

    },


    isBlocked: {
        type: Boolean,
        default: false
      }




})


module.exports=mongoose.model("Users",userSchema)