const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// connexion function
const connectDB = async () => {

    try {
        // connect link
         await mongoose.connect(db, {
            useUnifiedTopology: true ,
            useFindAndModify : false,
            useNewUrlParser: true,
            useCreateIndex :true
         });
         console.log('connected successfully ');
    }
    
    catch(err){
        console.error(err.message);
        //scape from the precess with failure
        process.exit(1);
    }

}
module.exports = connectDB;