let host = undefined;
if(process.env.NODE_ENV){
    host = '172.20.10.2'
} else{
    host = '123.207.138.78'
}
console.log(host);
export default host;