<?php
    
    //Definitons for servername, username, password ve dbname 
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "ozlem";

    //Connection to the server is made with specified username and password and specified database name
    $conn = mysqli_connect($servername, $username, $password, $dbname);

    $connSql = "CREATE DATABASE $dbname"; //create database with the name ozlem
    //create user and pet table
    $createUsers = "CREATE TABLE users (id int(11) NOT null AUTO_INCREMENT PRIMARY KEY,token text NOT null,uName text NOT null,fName text NOT null,lName text NOT null,pw text NOT null)";
    $createPets = "CREATE TABLE pets (id int(11) NOT null AUTO_INCREMENT PRIMARY KEY,pkey text NOT null,pName text NOT null,pType text NOT null,uName text NOT null)";
    //create admin with the name of Ozlem
    $createAdmin = "INSERT INTO users (uName, fName, lName, pw, token) VALUES ('Ozlem', 'Özlem', 'Karabulut', 'e120ea280aa50693d5568d0071456460', '903958e880049bce057802a9996e0a10')";

    if (!$conn) { //If creation of the database named "ozlem" is failed,

        /*in the $first, $conn operation is made again , 
        and then create database operation is repeated. */
        $first = mysqli_query(mysqli_connect($servername, $username, $password),$connSql);

        if ($first){
            $newConnection = mysqli_connect($servername, $username, $password, $dbname);
            
            /*Connection is made by doing the action named newConnection and 
            the action defined as createUsers is done over the connection that established.*/
            $tableUser = mysqli_query($newConnection,$createUsers);
            
            if ($tableUser){//if user table creation is successful,
                
                /*Connection is made by doing the action named newConnection and 
                the action defined as createPets is done over the connection that established.*/
                $tablePet = mysqli_query($newConnection,$createPets);

                if($tablePet){ //if pet table creation is successful,

                    /*Connection is made by doing the action named newConnection and 
                    the action defined as createAdmin is done over the connection that established.*/
                    mysqli_query($newConnection,$createAdmin);
                }
            }
        }
    }