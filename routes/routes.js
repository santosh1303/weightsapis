const controller = require('./../controllers/controller');
const auth = require('./../controllers/auth');


module.exports = function(app){
  app.route('/').get(controller.getdefault);
  app.route('/getemployees').get(controller.getemployees);
  app.route('/getbyname/:employeeName').get(controller.getbyname);
  app.route('/addnewemployee').post(controller.addnewemployee);
  app.route('/addnewweight').put(controller.addnewweight);
  app.route('/loginuser').post(controller.loginuser);
}
