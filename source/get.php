<?php 
	$filename = $_GET['file'];
	if ( $_GET['method'] !== null and $_GET['method'] == 'POST' ) {
		$contents = file_get_contents("assets/data/$filename");
		// $parsedData = json_decode($_GET['data']);
		// echo var_dump(json_encode($parsed));
		$file = fopen("assets/data/$filename", "w") or die('Cannot open file.');
		fwrite($file, $_GET['data']); 
		fclose($file);
		echo "Data received and $filename updated.";
	} else {
		echo file_get_contents("assets/data/$filename");
	}
?>