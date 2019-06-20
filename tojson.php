<?php
// read file
$data = file_get_contents('data/entityGroupsDb2.json');

// decode json to array
$json_arr = json_decode($data, true);

foreach ($json_arr as $key => $value) {
    // if ($value['_name'] == $_POST['group']) {
    	// echo $value['EntityTypes'];
        foreach ($value['EntityTypes'] as $key2 => $value2) {
        	// echo $value['_groupId'];
        	if($value2['_entityTypeId'] == $_POST['id']){ 
                // echo json_encode($json_arr[$key2]);
        		// $json_arr[$key2]['EntityTypes']['_name'] = $_POST['name'];
                $json_arr[$key]['EntityTypes'][$key2]['_name'] = $_POST['name'];
        		// echo json_encode($json_arr[$key]['EntityTypes'][$key2]['_name']);
        	}
        }
    // }
}
// die();

// encode array to json and save to file
file_put_contents('data/entityGroupsDb2.json', json_encode($json_arr));

$rows[] = array($_POST['id'], $_POST['name']);
echo json_encode($rows);

?>