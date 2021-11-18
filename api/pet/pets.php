<?php

include '../config/db.php';

 
$data = array();    //Define an empty array 


//*****REQUESTS FOR PETS*****//
$pkey = $_GET['pkey'];

if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){
                if(isset($_GET['pkey'])){ //Check if 'pkey' is defined,
                $deleteQuery="DELETE from pets WHERE pkey='$pkey'"; 
                mysqli_query($conn,$deleteQuery);
                header('HTTP/1.1 200 OK', true, 200);
                }else{
                    header('HTTP/1.1 400 Bad Request', true, 400);//Bad request error
                }
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT'){
                if(isset($_GET['pkey']) && isset($_GET['pName']) && isset($_GET['pType']) && isset($_GET['newPkey'])){
                    $pName = $_GET['pName'];
                    $pType = $_GET['pType'];
                    $newPkey = $_GET['newPkey'];
                    $editQuery = "UPDATE pets SET pkey='$newPkey', pName='$pName', pType='$pType' WHERE pkey='$pkey'";
                    mysqli_query($conn ,$editQuery);
                    header('HTTP/1.1 200 OK', true, 200);
                }else{
                    header('HTTP/1.1 400 Bad Request', true, 400); //Bad request error 
                }

}else if($_SERVER['REQUEST_METHOD'] === 'GET'){
    //Check if pkey coming from URL is defined 
    //users-deneme.php/?pkey= ...
    if(isset($_GET['pkey'])){
        $pkey = $_GET['pkey'];
        //List all the pets that have this pkey value
        $result = mysqli_query($conn, "SELECT * FROM pets WHERE pkey='$pkey'");
        //Add each pet to the array
        while($row = mysqli_fetch_assoc($result)){
            $data[] = $row;
        }
        //Take id, token, uName, fName, lName, pw values of the pets that found
        $newsql = "SELECT id, pkey, pName, pType, uName FROM pets WHERE pkey='$pkey'";
        echo json_encode($data);
    }else{ //If there is no pkey coming from URL
        //Choose all pets
        $result = mysqli_query($conn, "SELECT * FROM pets");
        //Add all users to the array
        while($row = mysqli_fetch_assoc($result)){
            $data[] = $row;
        }
        //Take each pet's id, token, uName, fName, lName, pw values
        $newsql = "SELECT id, pkey, pName, pType, uName FROM pets";


        //Count list
    $itemCount = count($data);

    if($itemCount > 0){ //If array is not empty,
        
        //Define another array
        $petArr = array();
        //Define empty array for pets inside petArr,
        $petArr["pets"] = array();
        //Define empty array for pet count inside petArr,
        $petArr["petCount"] = $itemCount;

        $secondResult = mysqli_query($conn, $newsql);

        if (mysqli_num_rows($secondResult) > 0) { //if there are more than 0 pets,

            while($row = mysqli_fetch_assoc($secondResult)) { 
                //Define all the information of pets as an array,
                $e = array(
                    "id" => $row["id"],
                    "pkey" => $row["pkey"],
                    "pName" => $row["pName"],
                    "pType" => $row["pType"],
                    "uName" => $row["uName"]
                );
                //Add each pet information as a row inside petArr[[pets:[][]],[petCount:]]
                array_push($petArr["pets"], $e);
            }
            
            echo json_encode($petArr); //Send petArr array as result
        }else{
            header('HTTP/1.1 404 Not Found', true, 404); //Pet not found 
        }
    }
}

}