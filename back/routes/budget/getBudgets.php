<?php

    include_once '../../classes/Budget.php';
    header("Access-Control-Allow-Origin: *");

    $response = array(
        'status' => 0,
        'message' => 'An error occured'
    );

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $budget = new Budget();
        $user_id = $_GET['user_id'];
        $budgets = $budget->getUserBudgets($user_id);
        
        if ($budgets) {
            $response['status'] = 1;
            $response['message'] = 'Budgets retrieved';
            $response['budgets'] = $budgets;
        } else {
            $response['message'] = 'No budgets found';
        }
    }

    echo json_encode($response);

?>