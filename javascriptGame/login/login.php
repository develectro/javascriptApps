<?php
# A tiny Script to handlig login things

class Log_In{
  
    private function __construct(){}
    private static Log_In $instance;
    private static $myEmails = 
    [
    "outlook1"=>"mustfa@outlook.com",
    ];
    private static $pass = ['pass'=>'123'];
    private static $err_message = "Not a Valid Option!s";
    private static $serve = 0;

    //initilizing Singleton
    public static function get_instance(){
        try{
            if(is_null($instance)){
              self::$instance = new self();
              //echo "Instantiation is OK";
             return self::$instance;
             
            }else{
                throw new Exception("N/A");
            }
        }catch(Exception $e){
            die($e);
        }  
    }
    public function connect(){
            if(isset($_POST['email'])){
                if($_POST['email'] == self::$myEmails['outlook1']){
                   self::$serve +=1;
                }
            }else{
                echo self::$err_message;
            }
            if(isset($_POST['pass'])){
                if($_POST['pass'] ==self::$pass['pass'] && self::$serve ==1){
                    self::$serve =0;
                    header('Location: https://www.google.com/');

                }else{
                    
                }
               
            }else{
                echo self::$err_message;
            }   
    }  
}
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    Log_IN::get_instance()->connect();
}
?>
















