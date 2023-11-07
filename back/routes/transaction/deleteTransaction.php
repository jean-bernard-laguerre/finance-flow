<?php
    include_once '../../classes/Transaction.php';
    header("Access-Control-Allow-Origin: *");

    $response = array(
        'status' => 0,
        'message' => 'Error',
    );

    if($_SERVER['REQUEST_METHOD'] == 'POST') {

        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];

        $transaction = new Transaction();
        if($transaction->deleteTransaction($id)){
            $response['status'] = 1;
            $response['message'] = 'Success';
        }
    }

    echo json_encode($response);
?>