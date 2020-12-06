    //main entry file
    //bring an express server
        const express = require('express'); 

    //initialise the app variable 
        const app = express();
    //create end point to test (send data to the browser)
        app.get('/', (req, res) => res.send('API running'));

    //create a port
    //usefull when we will wnat to deploy it in heroko but locally we will use the port 5000
        const PORT = process.env.PORT || 5000 ;
        app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));