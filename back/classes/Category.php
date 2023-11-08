<?php
    include_once 'Database.php';

    class Category{

        private $db;

        public function __construct(){
            $this->db = new Database();
        }

        public function getCategories(){
            
            $sql = "SELECT * FROM category";
            $stmt = $this->db->bdd->prepare($sql);
            $stmt->execute();
            $categories = $stmt->fetchAll(PDO::FETCH_OBJ);
            return $categories;
        }

        public function getSubCategories() {
                
                $sql = "SELECT * FROM subcategory";
                $stmt = $this->db->bdd->prepare($sql);
                $stmt->execute();
                $subCategories = $stmt->fetchAll(PDO::FETCH_OBJ);
                return $subCategories;
        }
    }
?>