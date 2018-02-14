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


const routes={

	'/': webutils.sendTextFile,
	'/such/stylish':(sock) => {
      sock.write('HTTP/1.1 200 OK\r\nContent-Type:text/html\r\n\r\n<h3>bye</h3>');
      sock.end();
  },
  	'/showanimage':(sock) => {
      sock.write('HTTP/1.1 301 OK\r\nLocation:/such/stylish\r\n\r\n ');
      sock.end();
  }


}

const server=net.createServer((sock)=>{

	sock.on('data',(binaryData)=>{

		const s=binaryData.toString();

		const req=new Request(s);
		console.log(req.path);

		if(req.path==='/'){


			const requestHandler=routes[req.path];
			requestHandler('index.html',sock);


		}
		else if(req.path==='/such/stylish'){

			const requestHandler=routes[req.path];
			requestHandler(sock);


		}
		else if(req.path==='/showanimage'){

			const requestHandler=routes[req.path];
			requestHandler(sock);


		}


	});

	



});



server.listen(PORT,HOST);
