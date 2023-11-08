<?php
    include_once '../../classes/Transaction.php';
    header("Access-Control-Allow-Origin: *");

    $response = array(
        'status' => 0,
        'message' => 'Error',
    );

    if($_SERVER['REQUEST_METHOD'] == 'GET') {

        $id = $_GET['id'];

        $transaction = new Transaction();
        if($transaction->deleteTransaction($id)){
            $response['status'] = 1;
            $response['message'] = 'Success';
        }
    }

    echo json_encode($response);
?>