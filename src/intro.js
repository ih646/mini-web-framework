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

const server=net.createServer((sock)=>{

	sock.on('data',(binaryData)=>{

		const s=binaryData.toString();

		const req=new Request(s);

		sock.write('HTTP/1.1 200 OK\r\n\r\n' + req.body);

		sock.end();


	});

	



});



server.listen(PORT,HOST);
