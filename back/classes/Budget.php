<?php
    include_once 'Database.php';

    class Budget {

        private $db;

        public function __construct() {
            $this->db = new Database;
        }

        public function createBudget($user_id, $category_id, $amount) {

            $sql = "SELECT * FROM budget WHERE user_id = :user_id AND category_id = :category_id";
            $stmt = $this->db->bdd->prepare($sql);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':category_id', $category_id);
            $stmt->execute();
            $budget = $stmt->fetch(PDO::FETCH_OBJ);

            if($budget){
                return $this->updateBudget($budget->id, $amount);
            } 
            
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

        public function updateBudget($id, $amount) {

            $sql = "UPDATE budget SET amount = :amount WHERE id = :id";
            $stmt = $this->db->bdd->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':amount', $amount);
            return $stmt->execute();
        }

        public function getUserBudgets($user_id) {

            $sql = "SELECT budget.*, subcategory.name AS category_name
            FROM budget
            JOIN subcategory ON budget.category_id = subcategory.id
            WHERE user_id = :user_id";

            $stmt = $this->db->bdd->prepare($sql);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            $budgets = $stmt->fetchAll(PDO::FETCH_OBJ);
            return $budgets;
        }
    }
?>