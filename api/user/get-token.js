var result;
function getToken(uName){
    var response = null;
    const ajax = new XMLHttpRequest(); //database transaction request
    const method = "GET";
    const url = "user/users.php/?uName="+uName; //PHP file
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

function getTokenValue(item){
    result = item;
}

export {result, getToken, getTokenValue};