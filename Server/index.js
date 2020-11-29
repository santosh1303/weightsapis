const express= require('express');
const port = 8000;
const app = express();
const routes = require('./../routes/routes');
const router = express.Router();

//
app.use(express.json());
app.use(express.urlencoded({extended:false}));
routes(app);
app.use('/', router);
//

//
app.listen(process.env.PORT || port, function(){
	console.log("Tell me Ankita. I am listening at port " + port);
});
