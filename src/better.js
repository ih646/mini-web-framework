/* better.js */

const App=require('./webframework.js').App
const app=new APP();


app.get('/', function(req,res){


	res.sendFile('site.html');

})

app.get('/form', function(req,res){


	res.sendFile('form.html');

})

app.get('/rando', function(req,res){


	res.redirect(301,'/');

})


app.get('/css/base.css',function(req,res){
	
	res.sendFile('base.css');
})

app.get('/image1.jpg',function(req,res){

	res.sendFile('image1.jpg');

})

app.get('/image2.gif'function(req,res){

	res.sendFile('image.gif');
})

app.get('/image3.jpg'function(req,res){

	res.sendFile('image3.jpg');
})

app.post('/form',function(req,res){

	res.write('HTTP/1.1 200 OK\r\n\r\n' + req.body);
})

app.listen(8080, '127.0.0.1')