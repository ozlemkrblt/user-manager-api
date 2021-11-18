<?php

    include('db.php'); //database connection

    //Get table, auth ve fw values from cookies and define
    $table = $_COOKIE["table"];
    $auth = $_COOKIE["auth"];
    $fw = $_COOKIE["fw"];

    
    if($table == 'users'){ //If operation is on users table
        //If user is authenticated or doing operation about his/her account
        if($auth == 'true' || $fw == 'true'){
            $result = mysqli_query($conn, "SELECT * FROM $table"); //Select all the users from table
            $data = array();
            while($row = mysqli_fetch_assoc($result)){
                $data[] = $row;
            }
            echo json_encode($data);

        }else{ //If user is not authenticated or not doing an operation about his/her account
            header('HTTP/1.1 401 Unauthorized', true, 401);
        }

    }else if ($table == 'pets'){ //If operation is on pets table
        $result = mysqli_query($conn, "SELECT * FROM $table"); //Select all the pets from table
        $data = array();
        while($row = mysqli_fetch_assoc($result)){
            $data[] = $row;
        }
        echo json_encode($data);
    }