<?php
    include_once '../../classes/Category.php';
    header("Access-Control-Allow-Origin: *");

    $response = array(
        'status' => 0,
        'message' => 'Error retrieving subcategories'
    );

    if($_SERVER["REQUEST_METHOD"] == "GET") {

        $category = new Category();
        $subCategories = $category->getCategories();

        if($subCategories) {
            $response['status'] = 1;
            $response['message'] = 'Categories retrieved successfully';
            $response['categories'] = $subCategories;
        }
    }

    echo json_encode($response);
?>