<?php
    include_once 'Database.php';
    class User{

        public $data;
        private $db;

        function __construct()
        {
            $this->db = new Database();
        }

        public function register($email, $username, $password)
        {
            $stmt = $this->db->bdd->prepare("SELECT * FROM user WHERE email = :email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (empty($user)) {
                $sql = "INSERT INTO user (email, username, password) VALUES (:email, :username, :password)";
                $stmt = $this->db->bdd->prepare($sql);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':username', $username);
                $stmt->bindValue(':password', hash('sha256', $password));
                $stmt->execute();

                return true;
            }
            return false;
        }



        public function login($email, $password)
        {

            
            $sql = "SELECT * FROM user WHERE email = :email";
            $stmt = $this->db->bdd->prepare($sql);
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_OBJ);

            if($user){
                if($user->password == hash('sha256', $password)){
                    $this->data = $user;
                    return true;
                }
            }
            return false;
        }

        public function getUser($id){
            $sql = "SELECT * FROM user WHERE id = :id";
            $stmt = $this->db->bdd->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_OBJ);

            return $user;
        }
    }
?>