<?php
    include_once 'Database.php';

    class Budget {

        private $db;

        public function __construct() {
            $this->db = new Database;
        }

        public function createBudget($user_id, $category_id, $amount) {
            
            $sql = "INSERT INTO budget (user_id, category_id, amount) VALUES (:user_id, :category_id, :amount)";
            $stmt = $this->db->bdd->prepare($sql);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':category_id', $category_id);
            $stmt->bindParam(':amount', $amount);
            return $stmt->execute();
        }

        public function deleteBudget($id) {

            $sql = "DELETE FROM budget WHERE id = :id";
            $stmt = $this->db->bdd->prepare($sql);
            $stmt->bindParam(':id', $id);
            return $stmt->execute();
        }

        public function getUserBudgets($user_id) {

            $sql = "SELECT budget.amount, category.name AS category_name
            FROM budget
            JOIN category ON budget.category_id = category.id
            WHERE user_id = :user_id";

            $stmt = $this->db->bdd->prepare($sql);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            $budgets = $stmt->fetchAll(PDO::FETCH_OBJ);
            return $budgets;
        }
    }
?>