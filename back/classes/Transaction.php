<?php
    include_once 'Database.php';
    class Transaction {

        private $db;

        function __construct()
        {
            $this->db = new Database();
        }

        public function createTransaction($title, $description, $amount, $date, $place, $user_id, $category, $sub_category)
        {
            $sql = "INSERT INTO transaction (title, description, amount, date, place, user_id, category, sub_category) VALUES (:title, :description, :amount, :date, :place, :user_id, :category, :sub_category)";
            $stmt = $this->db->bdd->prepare($sql);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':amount', $amount);
            $stmt->bindParam(':date', $date);
            $stmt->bindParam(':place', $place);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':category', $category);
            $stmt->bindParam(':sub_category', $sub_category);
            return $stmt->execute();
        }

        public function getUserTransactions($user_id){
            $sql = "SELECT * FROM transaction WHERE user_id = :user_id";
            $stmt = $this->db->bdd->prepare($sql);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            $transactions = $stmt->fetchAll(PDO::FETCH_OBJ);
            return $transactions;
        }

        public function getTransaction($id){
            $sql = "SELECT * FROM transaction WHERE id = :id";
            $stmt = $this->db->bdd->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $transaction = $stmt->fetch(PDO::FETCH_OBJ);
            return $transaction;
        }
        
        public function deleteTransaction($id){
            $sql = "DELETE FROM transaction WHERE id = :id";
            $stmt = $this->db->bdd->prepare($sql);
            $stmt->bindParam(':id', $id);
            return $stmt->execute();
        }
    }
?>