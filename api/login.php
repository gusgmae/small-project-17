<?php

$data = json_decode(file_get_contents("php://input"));

//print_r($data->username);
$conn = mysqli_connect("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

if (!$conn) {
  die("Connection failed: ");
}
$user = $data->username;
//$ask = 'SELECT * FROM Users where Login = "hi.com"';
$ask = 'SELECT * FROM Users where Login = "' . $user . '"'; 
//print_r($ask);


$emptyarr = array();

$result = mysqli_query($conn, $ask);

$database = mysqli_fetch_all($result,MYSQLI_ASSOC);
//if no user is found
//echo count($database);
if(count($database) == 0){
  //http_response_code(204);
  //exit();
  //echo "User not found!";
}
else{ //if user is found

  $userP = $database[0];
  $login = $userP['Login'];
  $pass = $userP['Password'];

  //print_r($userP['Login']);
  //print_r($userP['Password']);


header('Content-Type: application/json');
  //print_r($userP);
  

  echo json_encode($userP); //userP should be here this is a test
}
?>

