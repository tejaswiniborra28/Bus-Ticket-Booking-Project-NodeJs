function tester(){
var message;
if(confirm("press a button!")){ 
message="you pressed ok!";
}
else{
message="you pressed cancel";

}
console.log(message);
}

tester();