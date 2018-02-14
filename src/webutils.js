/* webutils.js */
const path=require('path');
const fs=require('fs');

function getExtension(filename){

	let extension=path.extname(filename);
	extension=extension.slice(1,extension.length);

	return extension.toLowerCase();

}



function sendTextFile(filename,sock){

	let extension=getExtension(filename);
	const absolutePath=path.join(__dirname,'..','/public',filename);

	fs.readFile(absolutePath,'utf8',(err,data)=>{


	if(err){

		sock.write(`HTTP/1.1 404 OK\r\nContent-Type:text/plain\r\n\r\nproblem reading file`);

	}
	else{

		sock.write(`HTTP/1.1 200 OK\r\nContent-Type:text/${extension}\r\n\r\n${data}`)
	}

	sock.end();

	})

}



function sendImage(filename, sock){

	let extension=getExtension(filename);
	const absolutePath=path.join(__dirname,'..','public',filename);

	fs.readFile(absolutePath,(err,data)=>{
	
	if(err){

		sock.write(`HTTP/1.1 404 OK\r\nContent-Type:text/${extension}\r\n\r\nProblem reading file`);
	}
	else{

		sock.write(`HTTP/1.1 200 OK\r\nContent-Type:text/${extension}\r\n\r\n`);
		sock.write(data);
	}

	sock.close();
});

}


module.exports={

	getExtension: getExtension,
	sendTextFile: sendTextFile,
	sendImage:sendImage


}