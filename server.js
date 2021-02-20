    //main entry file
    //bring an express server
        const express = require('express'); 
        const connectDB = require('./config/db');
    //initialise the app variable 
        const app = express();
    // connexion to the database
         connectDB();
        
    //initianlise the middleware 
        app.use(express.json({ extended : false }))  ;
           
    //create end point to test (send data to the browser)
        app.get('/', (req, res) => res.send('API running'));

    // define routes 
        app.use('/api/users', require('./routes/api/users'));
        app.use('/api/profile', require('./routes/api/profile'));
        app.use('/api/posts', require('./routes/api/posts'));
        app.use('/api/auth', require('./routes/api/auth'));

    //create a port
    //usefull when we will wnat to deploy it in heroko but locally we will use the port 5000
        const PORT = process.env.PORT || 5000 ;
        app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));