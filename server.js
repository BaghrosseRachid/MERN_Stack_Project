    //main entry file
    //bring an express server
        const express = require('express'); 
        const connectDB = require('./config/db');
        const path =require('path')
    //initialise the app variable 
        const app = express();
    // connexion to the database
         connectDB();
        
    //initianlise the middleware 
        app.use(express.json({ extended : false }))  ;
           
    //create end point to test (send data to the browser)
      

    // define routes 
        app.use('/api/users', require('./routes/api/users'));
        app.use('/api/profile', require('./routes/api/profile'));
        app.use('/api/posts', require('./routes/api/posts'));
        app.use('/api/auth', require('./routes/api/auth'));
        
        // serve static assets in production

        if (process.env.NODE_ENV === 'production') {
            //set satatic folder
            app.use(express.static('client/build'))

            app.get('*',(req,res)=>{
                res.sendFile(path.resolve(__dirname,'client','build','index.html'))
            })
        }

    //create a port
    //usefull when we will wnat to deploy it in heroko but locally we will use the port 5000
        const PORT = process.env.PORT || 5000 ;
        app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));