<?php

include '../config/db.php';


$data = array(); //Define an empty array
      
      
      //*****REQUESTS FOR USERS*****//
            if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){ //If delete request is sent,

                if(isset($_GET['auth'])){ //check if 'auth' defined,
                    $fw= $_GET['fw']; //get 'fw' value
                    $authentication = $_GET['auth']; 
                    $token = $_GET['token'];
                    if($authentication == 'true'){    //if user is admin,
                        if(isset($_GET['uName'])){ //check if username defined,

                            $username = $_GET['uName']; //Get username
                            
                            if($username === 'Ozlem'){ //If admin and tries to delete his/her account,
                                header('HTTP/1.1 403 Forbidden', true, 403); //Forbidden
                            }else{ 
                                $deleteQuery="DELETE from users WHERE token='$token'"; 
                                mysqli_query($conn,$deleteQuery);
                                header('HTTP/1.1 200 OK', true, 200); 
                            }

                        }
                    }else if ($fw == 'true'){ // if user is doing an operation on his/her account,
                        if(isset($_GET['uName'])){  //check if username defined,

                            $username = $_GET['uName']; //Get username

                            if($username === 'Ozlem'){//If admin and tries to delete his/her account,
                                header('HTTP/1.1 403 Forbidden', true, 403);//Forbidden
                            }else{
                                $qdeleteQuery="DELETE from users WHERE token='$token'";
                                mysqli_query($conn,$qdeleteQuery);
                                header('HTTP/1.1 200 OK', true, 200);
                            }

                        }
                    }
                }else{
                    header('HTTP/1.1 400 Bad Request', true, 400);//Bad Request error
                }

            } else if ($_SERVER['REQUEST_METHOD'] === 'PUT'){ //If put request is sent,

                if(isset($_GET['fName']) && isset($_GET['lName'])){ // if first and last name is defined 
                    $token = $_GET['token'];
                    $fName = $_GET['fName'];
                    $lName = $_GET['lName'];
                    $editQuery = "UPDATE users SET fName='$fName', lName='$lName' WHERE token='$token'";
                    mysqli_query($conn ,$editQuery);
                    header('HTTP/1.1 200 OK', true, 200);
                }else{  
                    header('HTTP/1.1 400 Bad Request', true, 400); //Bad Request error
                }

            } else if ($_SERVER['REQUEST_METHOD'] === 'GET'){ //If get request is sent,
                
                if(isset($_GET['uName'])){ //check if 'uName' defined,
                   
                    $uName = $_GET['uName']; 
                    if(empty($uName)){
                        header('HTTP/1.1 422 Unprocessable Entity', true, 422); //Unprocessable Entity
                    }
                    $getQuery = "SELECT * FROM users WHERE BINARY uName='$uName'"; //Select the users with that username
                    $selectUser = mysqli_query($conn ,$getQuery);
                    $getuserdata = array(); //define an empty array
                    while($userrow = mysqli_fetch_assoc($selectUser)){
                        $getuserdata = $userrow; 
                    }
                    echo json_encode($getuserdata); 
                    header('HTTP/1.1 200 OK', true, 200);
                
                }else if(isset($_GET['token'])){
                    $token = $_GET['token'];
                    //List all the users that have this token value
                    $result = mysqli_query($conn, "SELECT * FROM users WHERE BINARY token='$token'");
  
                    while($row = mysqli_fetch_assoc($result)){       //Add each user to the empty array
                        $data[] = $row;
                    }
                    //Take id, token, uName, fName, lName, pw values of the users that found
                    $newsql = "SELECT id, token, uName, fName, lName, pw FROM users WHERE BINARY token='$token'";
                }else{ //If there is no token sent
                    //Choose all of the users
                    $result = mysqli_query($conn, "SELECT * FROM users"); 
                    while($row = mysqli_fetch_assoc($result)){ //Add every user to the empty array
                        $data[] = $row;
                    }
                    //Take each user's id, token, uName, fName, lName, pw values 
                    $newsql = "SELECT id, token, uName, fName, lName, pw FROM users";

                    $itemCount = count($data); //Count list

                    if($itemCount > 0){ //If array is not empty,
        
                        $userArr = array();         //define another empty array
                        $userArr["users"] = array(); //Define empty array for user inside userArr,
                        $userArr["userCount"] = $itemCount; //Define empty array for user count inside userArr,

                        $secondResult = mysqli_query($conn, $newsql);

                        if (mysqli_num_rows($secondResult) > 0) {

                            while($row = mysqli_fetch_assoc($secondResult)) { //If there are more than 0 users,
                                
                                $e = array(  //Define all the information of users as an array,
                                    "id" => $row["id"],
                                    "token" => $row["token"],
                                    "uName" => $row["uName"],
                                    "fName" => $row["fName"],
                                    "lName" => $row["lName"]
                                );
                                array_push($userArr["users"], $e); //Add each pet information as a row inside userArr[[users:[][]],[userCount:]]
                            }
                            //Send user array as a result
                            echo json_encode($userArr);
                        }       
                    }else{
                        header('HTTP/1.1 404 Not Found', true, 404); //User not found 
                    }
                }
            }

                