<?php
    include_once '../../classes/Transaction.php';
    header("Access-Control-Allow-Origin: *");

    $response = array(
        'status' => 0,
        'message' => 'Error',
    );

    if($_SERVER['REQUEST_METHOD'] == 'POST') {

        $data = json_decode(file_get_contents('php://input'), true);
        $title = $data['title'];
        $description = $data['description'];
        $amount = intval($data['amount']);
        $date = $data['date'];
        $place = $data['place'];
        $user_id = $data['user_id'];
        $category = $data['category'];
        $sub_category = $data['subCategory'];

        $transaction = new Transaction();
        if($transaction->createTransaction($title, $description, $amount, $date, $place, $user_id, $category, $sub_category)){
            $response['status'] = 1;
            $response['message'] = 'Success';
        }
    }

    echo json_encode($response);
?>