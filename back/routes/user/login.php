<?php
    include_once '../../classes/User.php';

    header("Access-Control-Allow-Origin: *");

    $response = array(
        'status' => 0,
        'message' => 'Error',
        'data' => null
    );

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $data = json_decode(file_get_contents('php://input'), true);

        $email = $data['email'];
        $password = $data['password'];

        $user = new User();

        if($user->login($email, $password)){
            $response['status'] = 1;
            $response['message'] = 'Success';
            $response['data'] = array(
                'id' => $user->data->id,
                'username' => $user->data->username,
                'email' => $user->data->email,
            );
        }
    }

    echo json_encode($response);
?>