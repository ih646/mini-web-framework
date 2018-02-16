/* webframework.js */




let s = ''
s += 'GET /foo.html HTTP/1.1\r\n';   // request line
s += 'Host: localhost:8080\r\n'; // headers
s += '\r\n\r\n'; 


class Request{

	constructor(s){


		const parts=s.split(" ");
		const[headers,body]= [s.split('\r\n\r\n')[0],s.split('\r\n\r\n')[1]];
		let headerNames=headers.split('\r\n');
		headerNames=headerNames.slice(1,headerNames.length);



		this.method=parts[0];
		this.path=parts[1];
		this.body=body;
		this.headers={};
		headerNames.forEach((headerName)=>{

			const headerParts=headerName.split(': ');
			this.headers[headerParts[0]]=headerParts[1]

		})

		this.toString=function(){

			return s.toString();
		}

	}

	

}

class Response{



	

	constructor(socket){

		let statusCodes={

		200: 'OK',
		301: 'Moved Permanently',
		302:  'Found',
		303: 'See Other',
		400: 'Bad Request',
		404: 'Not Found',
		405: 'Method Not Allowed',
		500: 'Internal Server Error'



	}

		this.sock: socket;
		this.headers:{};
		this.body:'';
		this.statusCode='';
		this.setHeader: function(name,value){

			this.headers[name]=value;

		}
		this.write: function(data){

			this.sock.write(`HTTP/1.1 200 OK\r\nContent-Type:${this.headers['Content-Type']}\r\n\r\n${data}`);

		}

		this.end: function(data){

			this.sock.write(`HTTP/1.1 200 OK\r\nContent-Type:${this.headers['Content-Type']}\r\n\r\n${data}`);
			this.sock.end();

		}
		this.send: function(statusCode,body){

			this.statusCode=statusCode;
			this.body=body;
			this.sock.write(`HTTP/1.1 ${statusCode} OK\r\nContent-Type:${this.headers['Content-Type']}\r\n\r\n${body}`);
			this.sock.end();
		};

		this.writeHead: function(statusCode){

			this.statusCode=statusCode;
			this.sock.write(`HTTP/1.1 ${statusCode} OK\r\nContent-Type:${this.headers['Content-Type']}\r\n\r\n`);



		};
		this.redirect: function(statusCode,url){

			this.statusCode=statusCode===''?'301':statusCode;

			this.sock.write(`HTTP/1.1 ${this.statusCode} OK\r\nLocation:${url}\r\n\r\n Redirecting`);
			this.sock.end();



		};
		this.toString: function(){

			let response=`HTTP/1.1 ${this.statusCode} OK\r\nContent-Type:${this.headers['Content-Type']}\r\n\r\n${this.body}`;
			return response;


		};
		this.sendFile: function(filename){};
		





	}

}

class App{

	constructor(){


	}



}





module.exports={

	Request: Request
	
}