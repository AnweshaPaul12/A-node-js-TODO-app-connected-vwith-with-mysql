var express = require('express');
var router = express.Router();
async = require("async");

/* GET home page. */
router.get('/', function(req, res, next) {
	var con = req.con;
	async.parallel(
		[
			function(callback){
				con.query('select * from accounts', function(errors, accounts){
					callback(errors, accounts);

					// console.log(accounts);

				});

				// console.log(accounts);
			}

		],
		function(err, results){
			// console.log(results);
			var data = {accounts: results[0]};
			// console.log(data.accounts[0].id);
			res.render('account/index1', data);
		}
	);

  
});

router.get('/account/add', function(req, res, next) {
	res.render('account/add');
});

router.post('/account/add', function(req, res, next) {
	var con = req.con;
	async.parallel(
		[
			function(callback){
				con.query('insert into accounts(name, description) values(?,?)', [req.body.name, req.body.description], function(errors, accounts){
					callback(errors);

					// console.log(req);

				});

				// console.log(accounts);
			}

		],
		function(err, results){
			res.redirect('/account');
		}
	);

});

router.get('/account/delete/:id', function(req, res, next) {
	var con = req.con;
	async.parallel(
		[
			function(callback){
				con.query('delete from accounts where id = ?', [req.params.id], function(errors, accounts){
					callback(errors);

					console.log(req);
				});

				// console.log(accounts);
			}

		],
		function(err, results){
			res.redirect('/account');
		}
	);
});

router.get('/account/edit/:id', function(req, res, next) {
	var con = req.con;
	async.parallel(
		[
			function(callback){
				con.query('select * from accounts where id = ?', [req.params.id], function(errors, accounts){
					callback(errors, accounts[0]);

					console.log(req);
				});

				// console.log(accounts);
			}

		],
		function(err, results){
			var data = {accounts: results[0]};
			res.render('account/edit', data);
		}
	);
});

router.post('/account/edit', function(req, res, next) {
	var con = req.con;
	async.parallel(
		[
			function(callback){
				con.query('select * from accounts where id = ?', [req.body.id], function(errors, accounts){
					var account = accounts[0];
					account.name = req.body.name;
					account.description = req.body.description;
					con.query('update accounts set name = ?, description = ? where id = ?', [req.body.name, req.body.description, req.body.id], function(errors, accounts){
						callback(errors);
					});

					console.log(req);
				});

				// console.log(accounts);
			}

		],
		function(err, results){
			res.redirect('/account');
		}
	);
});

module.exports = router;