let host = undefined;
if(process.env.NODE_ENV){
    host = '192.168.1.228'
} else{
    host = '123.207.138.78'
}
console.log(host);
export default host;