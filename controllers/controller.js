//const data = require('./../Data/data.json');
const Employee = require('./../models/employee');
const jwt = require('jsonwebtoken');


exports.loginuser = function(req, res){
	let empName = req.body.empName;
	let empPass = req.body.empPass;

  Employee.find({empName:empName}, function(err, results) {
    if (err) res.end(err);
        if (empPass == results[0].empPass){
          jwt.sign(
						{
							empName: results[0].empName,
							userID: results[0]._id
						},
						"mysecret",
						{expiresIn:"1hr"},
						function(err, token){
							//do it more gracefully than this. Implement in near future
							if (err) throw err;

							res.json({token:token});
						}
					);
        } else {
          res.send({status:"Login Failed"});
        }
    });

};



exports.getdefault = function(req, res){
  res.send('You are on the root route, from controller');
};

exports.getemployees = function(req, res){
  //res.send(data);

  Employee.find({}, function(err, results){
    if (err)
      res.end(err);

    res.json(results);
  })
};

exports.addnewemployee = function(req, res){
  const Emp = new Employee();

  Emp.empName = req.body.empName;
  Emp.empPass = req.body.empPass;
  Emp.save({}, function(err, result){
    if (err)
      res.end(err);

    //res.end(`Created ${Emp.empName}`);
		res.json({message: "Created " + Emp.empName});

  });
};

exports.addnewweight = function(req, res){
  let empName = req.body.empName;
  let empWeight = parseInt(req.body.empWeight);
  Employee.updateOne(
    {empName:empName},
    {$addToSet:{
      employeeWeights: {
        empWeight: empWeight
      }
    }},

    {upsert:false},
    function(err, results){
      if (err){
        return console.log(err);
      } else{
        return res.send("Done. Added weight");
      }



    }
  );

};


exports.getbyname  = function(req, res){
	let empToFind = req.params.employeeName;

  Employee.find({empName:empToFind}, function(err, results){
		if(err)
			res.end(err)

		res.json(results);

	});
};
