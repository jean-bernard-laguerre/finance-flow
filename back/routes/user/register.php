<?php
    include_once '../../classes/User.php';
    header("Access-Control-Allow-Origin: *");

    $response = array(
        'status' => 0,
        'message' => 'Error',
    );

    if($_SERVER["REQUEST_METHOD"] == 'POST') {

        $data = json_decode(file_get_contents('php://input'), true);
        $email = $data['email'];
        $username = $data['username'];
        $password = $data['password'];

        $user = new User();
        if($user->register($email, $username, $password)){
            $response['status'] = 1;
            $response['message'] = 'Success';
        }
    }

    echo json_encode($response);
?>