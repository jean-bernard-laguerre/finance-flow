<?php
    include_once '../../classes/Category.php';
    header("Access-Control-Allow-Origin: *");

    $response = array(
        'status' => 0,
        'message' => 'Error retrieving subcategories'
    );

    if($_SERVER["REQUEST_METHOD"] == "GET") {

        $category = new Category();
        $subCategories = $category->getSubCategories();

        if($subCategories) {
            $response['status'] = 1;
            $response['message'] = 'Subcategories retrieved successfully';
            $response['subCategories'] = $subCategories;
        }
    }

    echo json_encode($response);
?>