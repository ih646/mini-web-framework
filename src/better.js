/* better.js */

const App=require('./webframework.js').App;
const app=new App();


app.get('/', function(req,res){


	res.sendFile('/html/site.html');

});

app.get('/form', function(req,res){


	res.sendFile('/html/form.html');

});

app.get('/rando', function(req,res){


	res.redirect(301,'/');

});


app.get('/css/base.css',function(req,res){
	
	res.sendFile('/css/base.css');
});

app.get('/image1.jpg',function(req,res){

	res.sendFile('/img/image1.jpg');

});

app.get('/image2.jpg',function(req,res){

	res.sendFile('/img/image2.jpg');
});

app.get('/image2.gif',function(req,res){

	res.sendFile('/img/image2.gif');
});

app.get('/image3',function(req,res){

	res.sendFile('/img/image3.jpg');
});

app.get('/random',function(req,res){

	const random=Math.floor(Math.random()*4);

	if (random === 1) {
       
        res.sendFile('/html/random1.html');
    
    } else if (random === 2) {
      
        res.sendFile('/html/random2.html');
   
    } else {
        
        res.sendFile('/html/random3.html');
    }

});

app.post('/form',function(req,res){

	const formReplies=req.body.split('&');
	const input1=formReplies[0].replace('character=','');
	const input2=formReplies[1].replace('quote=',' ');
	const input=input1+input2;
	res.setHeader('Content-Type','text/plain');
	res.send(200,input);
	

});

app.listen(3000, '127.0.0.1');