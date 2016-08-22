<?php
	$filename = $_POST['file'];
	$filestr = "assets/data/entries.json";//$filename";
	$contents = file_get_contents($filestr);
	// $file = fopen($filestr, "w") or die('Cannot open file.');
	
	$objectified = json_decode($contents);

	// Start manipulating file
	array_push($objectified, $_POST['newEntry']);
	echo var_dump($_POST);

	// fwrite($file, json_encode($contents)); 
?>