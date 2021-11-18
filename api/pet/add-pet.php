<?php

    
	include '../config/db.php'; //Connection to the database

    //Values that are sent by Ajax are defined here,
	$pName = $_POST['pName'];
	$pType = $_POST['pType'];
	$uName = $_POST['uName'];
	$pkey = $_POST['pkey'];

    $token = $_COOKIE["token"]; //"token" cookie data are defined as $token

    //Check if user has a token value ( user logged in)
    //Select all users whose token is equal to the token value we got from the cookies,
    $checkUserFirst = mysqli_query($conn ,"SELECT * FROM `users` WHERE BINARY `token`='$token'");
    echo json_encode($checkUserFirst);
    if(mysqli_num_rows($checkUserFirst) > 0){ //IF ANY USER FOUND

        //Select the pet which its 'pkey' value is equal to the one sent by AJAX
        $query = "SELECT * FROM `pets` WHERE `pkey`='$pkey'";
        $check = mysqli_query($conn ,$query);

        if (mysqli_num_rows($check) > 0){ //If any pet found with these data
           
            header('HTTP/1.1 409 Conflict', true, 409);   //"Conflict" error code is sent
        
        }else{ //If there isn't any pet with these data

            //Insert that pet into pets table with the values pkey,pName,pType,uName
            $sql = "INSERT INTO pets (pkey, pName, pType, uName) VALUES ('$pkey', '$pName', '$pType', '$uName')";
            $result = mysqli_query($conn ,$sql);

            if($result){  //If process is successful,send 'OK' statusCode
                header('HTTP/1.1 200 OK', true, 200);
            }
        }

    }else{ //IF NO USERS FOUND (user tries to do the operation without logging in) ,
        header('HTTP/1.1 401 Unauthorized', true, 401); //"Unauthorized" error code is sent
    }