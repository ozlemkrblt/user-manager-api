<?php

    include('../config/db.php'); //database connection

    $token = $_COOKIE["token"]; //get token value from cookies

    $result = mysqli_query($conn, "SELECT * FROM users WHERE BINARY token='$token'"); 
    $data = array();
    while($row = mysqli_fetch_assoc($result)){
        $data = $row;
    }
    echo json_encode($data);