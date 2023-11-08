<?php

    include_once '../../classes/Budget.php';
    header("Access-Control-Allow-Origin: *");

    $response = array(
        'status' => 0,
        'message' => 'An error occured'
    );

    if($_SERVER["REQUEST_METHOD"] == "POST") {

        $data = json_decode(file_get_contents('php://input'), true);

        $budget = new Budget();
        $user_id = $data['user_id'];
        $category_id = $data['category_id'];
        $amount = $data['amount'];

        $budget->createBudget($user_id, $category_id, $amount);

        $response['status'] = 1;
        $response['message'] = 'Budget created';
    }

    echo json_encode($response);
?>