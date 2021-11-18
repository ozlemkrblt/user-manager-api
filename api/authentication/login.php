<?php

    include '../config/db.php'; //Connection to the database

    /* uName value that is sent by Ajax is defined as $uName in here,
    and password is sent as 'pw' by Ajax,defined as $pw. */
    
    $uName = $_POST['uName'];
	$pw = $_POST['pw'];

    //Password is encyrpted in md5 format as "hPw" 
    $hPw = md5($pw);

    //Users that have uName &  hPw values are selected
    $sql = "SELECT * FROM users WHERE BINARY uName='$uName' AND pw='$hPw'";
    $result = mysqli_query($conn, $sql);

    
    if (mysqli_num_rows($result) > 0){ // IF there are more than 0 users in query result,
        if($uName == "Ozlem"){
            $authorized = true;  //if user name is "Ozlem" , user is authenticated ( admin)
        }else{
            $authorized = false;
        }
        //A token is defined with username, password and authentication
        $token = md5(json_encode(array("Username"=>$uName, "Password"=>$pw, "Authorized"=>$authorized)));
        //Successful  token, authentication value and username is sent to Ajax
        echo json_encode(array("token"=>$token, "auth"=>$authorized, "username"=>$uName));
        header('HTTP/1.1 200 OK', true, 200);
    
    }else{ // IF there are NO user in results
        header('HTTP/1.1 422 Unprocessable Entity', true, 422); //Unprocessable Entity error code for wrong input is sent 
    }