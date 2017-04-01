<?php
// Connect to the database
try {
  $db = new PDO('mysql:host=localhost;dbname=fnaf_2015_data;charset=utf8mb4','mselzer', 'redbull');
  sayHi($db);
} catch (Exception $e) {
  echo $e->getMessage();
}

/*
function sayHi($db) {
    $sql = "SELECT 'Hello from the database' AS message FROM dual";
    foreach ($db->query($sql) as $row) {
        print $row['message'] . "\n";
    }*/
}
// Get the name value
//$from_angular = json_decode( file_get_contents('php://input') );
//$userName = $from_angular->name;
//echo $userName;

//Insert game_id
//$gameID = $_SESSION['game_id'];
// Put name value into the database
//$sql = "INSERT INTO game_data (player_name)
//VALUES ($userName)";

//mysqli_close($conn);
?>


?>
