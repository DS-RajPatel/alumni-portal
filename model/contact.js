const mongoose = require("mongoose");
const contact = mongoose.Schema({

    contact_name:{
             type: String, 
            },
    contact_email: {
            type: String, 
           
        },
    contact_msg: { 
            type: String,
         }

});
module.exports = mongoose.model("contact", contact);
