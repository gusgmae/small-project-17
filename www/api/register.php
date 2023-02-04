<?php
//used test basic funtionality

$con = mysqli_connect("161.35.140.80","TheBeast","WeLoveCOP4331",COP4331);

// Check connection
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
  };

  //error checks later, this is just checking to see if it can interface into the database



  $firstname = mysqli_real_escape_string($con, $_POST['firstName']);
  $lastname = mysqli_real_escape_string($con, $_POST['lastName']);
  $email = mysqli_real_escape_string($con, $_POST['email']);
  $password = mysqli_real_escape_string($con, $_POST['password']);


  $sql = "INSERT INTO Users(FirstName,LastName,Login,Password) VALUES('$firstname','$lastname','$email','$password')";

  //save to db and check

  if(mysqli_query($con,$sql)){
    //successful connection and saved
    //header('Location :index.js'); redirect after submission to the register page

  } else
  {
    echo ' query error' . mysqli_error($con);

  }


  ?>
