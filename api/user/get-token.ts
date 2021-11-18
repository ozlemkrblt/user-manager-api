var result;
function getToken(uName: string){
    var response = null;
    const ajax :XMLHttpRequest = new XMLHttpRequest(); //database transaction request
    const method :string = "GET";
    const url :string = "user/users.php/?uName="+uName; //PHP file
    const asynchronous = true;
    ajax.open(method, url, asynchronous);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var dataResult = JSON.parse(this.responseText);
            response = dataResult.token;
            getTokenValue(response);
        }else if(this.status == 404){
            console.log("Token Not Found");
        }else if(this.status == 422){
            console.log("Username not defined");
        }
    };
}

function getTokenValue(item: any){
    result = item;
}

export {result, getToken, getTokenValue};