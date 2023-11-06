<?php
    include_once '../classes/Transaction.php';
    header("Access-Control-Allow-Origin: *");

    $response = array(
        'status' => 0,
        'message' => 'Error',
        'data' => null
    );

    if($_SERVER['REQUEST_METHOD'] == 'POST') {

        $data = json_decode(file_get_contents('php://input'), true);
        $user_id = $data['user_id'];

        $transaction = new Transaction();
        $response['status'] = 1;
        $response['message'] = 'Success';
        $response['data'] = $transaction->getUserTransactions($user_id);
    }

    echo json_encode($response);
?>