/* intro.js */

const net=require("net");
const webutils=require('./webutils.js')

const [PORT,HOST]=[8080, '127.0.0.1'];


class Request {


	constructor(s){


		const part=s.split(" ");
		this.body=s.split('\r\n\r\n')[1];
		this.method=part[0];
		this.path=part[1];


	}

}

const homepage=webutils.sendTextFile.bind(null,'index.html');
const stylish=webutils.sendTextFile.bind(null,'stylish.html');
const base=webutils.sendTextFile.bind(null,'base.css');
const picsplz=webutils.sendTextFile.bind(null,'image.html');
const animal=webutils.sendImage.bind(null,'animal.jpg');


const routes={

	'/': homepage,
	'/such/stylish':stylish,
	'/css/base.css':base,
	'/picsplz': picsplz,
	'/img/animal.jpg':animal,
  	'/showanimage':(sock) => {


    sock.write(`HTTP/1.1 301 OK\r\nLocation:/picsplz\r\n\r\n Redirecting`);
    sock.end();
  
  }


}

const server=net.createServer((sock)=>{

	sock.on('data',(binaryData)=>{


		const s=binaryData.toString();

		const req=new Request(s);

		if(req.method==='POST'){

			console.log(req.method);
			sock.write('HTTP/1.1 200 OK\r\n\r\n' + req.body);
        	sock.end();


		}
		else{

			if(routes.hasOwnProperty(req.path)){

			const requestHandler=routes[req.path];
			requestHandler(sock);


			}
			
			else{

			sock.write('HTTP/1.1 404 Not Found\r\nContent-Type:text/plain\r\n\r\nNot Found!!');
			sock.end();


			}

		}


	});

	



});



server.listen(PORT,HOST);
