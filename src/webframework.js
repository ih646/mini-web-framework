/* webframework.js */

const path=require('path');
const fs=require('fs');
const webutils=require('./webutils.js');
const net=require("net");

class Request{

	constructor(s){


		const parts=s.split(" ");
		const[headers,body]= [s.split('\r\n\r\n')[0],s.split('\r\n\r\n')[1]];
		let headerNames=headers.split('\r\n');
		headerNames=headerNames.slice(1,headerNames.length);


		this.request=s;
		this.method=parts[0];
		this.path=parts[1];
		this.body=body;
		this.headers={};
		headerNames.forEach((headerName)=>{

			const headerParts=headerName.split(': ');
			this.headers[headerParts[0]]=headerParts[1];

		});

	

	}

	toString(){

			return this.request.toString();
		}

	

}


const contentType={

	'jpeg': 'image/jpeg',
	'jpg': 'image/jpg',
	'png': 'image/png',
	'gif': 'image/gif',
	'html': 'text/html',
	'css': 'text/css',
	'txt': 'text/plain',

};

const statusCodes={

		200: 'OK',
		301: 'Moved Permanently',
		302:  'Found',
		303: 'See Other',
		400: 'Bad Request',
		404: 'Not Found',
		405: 'Method Not Allowed',
		500: 'Internal Server Error'



	};



class Response{


	constructor(socket){


		this.sock=socket;
		this.headers={};
		this.body=undefined;
		this.statusCode=undefined;
		
		
	}
		setHeader(name,value){

				this.headers[name]=value;

			}

		write(data){

				this.sock.write(data);

			}

		end(data){

			this.sock.end(data);

		}
		
		send(statusCode,body){

			this.statusCode=statusCode;
			this.body=body;
			this.sock.end(this.toString());
		}

		writeHead(statusCode){

			this.statusCode=statusCode;
			const response=this.toString();
			this.sock.write(response);

		}
		
		redirect(statusCode,url){


				if (typeof(statusCode)==='number') {

					this.statusCode = statusCode;
					this.headers['Location'] = url;

				}
				else {

					this.statusCode = 301;
					this.headers['Location'] = statusCode;
				}

				this.sock.end(this.toString());

		}
		
		toString(){



			let response=`HTTP/1.1 ${this.statusCode} ${statusCodes[this.statusCode]}\r\n`;

			for(const key in this.headers){

				response+=`${key}: ${this.headers[key]}\r\n`;


			}

			response+=`\r\n`;

			if(this.body!==undefined){

				response+=`${this.body}`;
				


			}

			return response;

		}
		
		sendFile(filename){

			const extension=webutils.getExtension(filename);
			const absolutePath=path.join(__dirname,'..','/public',filename);

			if(extension==='html' || extension==='css' || extension==='txt'){

				fs.readFile(absolutePath,'utf8',(err,data)=>{
				this.handleRead(contentType[extension],err,data);

				});


			}

			else{

				fs.readFile(absolutePath,{},(err,data)=>{
				this.handleRead(contentType[extension],err,data);

				});

			}
			

		}

		handleRead(contentType, err, data){

			if(err){

					this.setHeader('Content-Type', contentType);
					this.send(500, 'Error reading file!');
				}
			
			else{

				this.setHeader('Content-Type',contentType);
				this.writeHead(200);
				this.end(data);

			}	





		}

}

class App{

	constructor(){

		this.server=net.createServer(this.handleConnection.bind(this));
		this.routes={

			'GET':{},
			'POST':{}
		};


	}

	get(path,cb){


		this.routes['GET'][path]=cb;


	}

	post(path, cb){


		this.routes['POST'][path]=cb;

	}

	listen(port,host){


		this.server.listen(port,host);
	}

	handleConnection(sock){

		sock.on('data',this.handleRequestData.bind(this,sock));
	}

	handleRequestData(sock,binaryData){


		const s=binaryData.toString();
		const req=new Request(s);
		const res=new Response(sock);

		if(req.headers['Host']===undefined){

			res.setHeader('Content-Type','text/plain');
			res.send(400,'Error occured, no headers');
		}
		else if(this.routes['GET'][req.path]!==undefined && req.method==='GET'){

				const callback=this.routes['GET'][req.path];
				callback(req,res);
				sock.on('close', this.logResponse.bind(this, req, res));


			}
			else if(this.routes['POST'][req.path]!==undefined && req.method==='POST'){

				const callback=this.routes['POST'][req.path];
				callback(req,res);
				sock.on('close', this.logResponse.bind(this, req, res));

			}
			else{

				res.setHeader('Content-Type','text/plain');
				res.send(404,'path does not exist');
				sock.on('close', this.logResponse.bind(this, req, res));
				
				
			}


	}

	logResponse(req, res){

		console.log(`request Method: ${req.method}\nrequest path: ${req.path}\n`);
		console.log(`resonse code: ${res.statusCode}\nresponse body: ${statusCodes[res.statusCode]}\n`);

	}


}


module.exports={

	Request: Request,
	Response: Response,
	App: App
	
};