<?php 
	$file = $_GET['file'];
	if ( $_GET['method'] !== null and $_GET['method'] == 'POST' ) {
		$contents = file_get_contents("assets/data/$file");
	} else {
		echo file_get_contents("assets/data/$file");
	}
?>