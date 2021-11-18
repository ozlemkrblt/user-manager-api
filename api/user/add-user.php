<?php
    
	include '../config/db.php'; //Connection to the database

    //Values that are sent by Ajax are defined here,
	$fName = $_POST['fName'];
	$lName = $_POST['lName'];
	$uName = $_POST['uName'];
	$pw = $_POST['pw'];

    //Password is encyrpted in md5 format as "hPw" 
    $hPw = md5($pw);

    //Users that have $uName value are selected
    $query = "SELECT * FROM `users` WHERE BINARY `uName`='$uName'";
    $check = mysqli_query($conn ,$query);


    if (mysqli_num_rows($check) > 0){ // IF there are more than 0 users in query result,
        header('HTTP/1.1 409 CONFLICT', true, 409); //send "Conflict" error code

    }else{  // IF there are NO user in results

        if($uName == "Ozlem"){
        
            $authorized = true; //if user name is "Ozlem" , user is authenticated ( admin)

        }else{
           
            $authorized = false;
        }

        //A token is defined with username, password and authentication
        $token = md5(json_encode(array("Username"=>$uName, "Password"=>$pw, "Authorized"=>$authorized)));

       //Add a user to the users table where uName, fName, lName, pw, token values ​​will be the values ​​we define
        $sql = "INSERT INTO users (uName, fName, lName, pw, token) VALUES ('$uName', '$fName', '$lName', '$hPw', '$token')";
        $result = mysqli_query($conn ,$sql);

        if($result){ //if operation is successful,send "OK." status code.
            header('HTTP/1.1 200 OK', true, 200);
        }
    }