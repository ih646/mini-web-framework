/* better.js */

const App=require('./webframework.js').App;
const app=new App();


app.get('/', function(req,res){


	res.sendFile('site.html');

})

app.get('/form', function(req,res){


	res.sendFile('form.html');

})

app.get('/rando', function(req,res){


	res.redirect(301,'/');

})


app.get('/base.css',function(req,res){
	
	res.sendFile('base.css');
})

app.get('/image1.jpg',function(req,res){

	res.sendFile('image1.jpg');

})

app.get('/image2.jpg',function(req,res){

	res.sendFile('image2.jpg');
})

app.get('/giphy.gif',function(req,res){

	res.sendFile('giphy.gif');
})

app.get('/image3.jpg',function(req,res){

	res.sendFile('image3.jpg');
})

app.get('/random',function(req,res){

	let random=Math.floor(Math.random()*4);

	if (random === 1) {
       
        res.sendFile('random1.html')
    
    } else if (random === 2) {
      
        res.sendFile('random2.html')
   
    } else {
        
        res.sendFile('random3.html')
    }

})

app.post('/form',function(req,res){

	let formBody=req.body.split('=');
	let input=formBody[1];
	input=input.replace('&',' ');
	res.setHeader('Content-Type','text/plain');
	res.send(200,input);
	

});

app.listen(3000, '127.0.0.1');