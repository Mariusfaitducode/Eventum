
<?php

function generateToken(){

    $randomBytes = openssl_random_pseudo_bytes(32);
    $token = base64_encode($randomBytes);

    $token = str_replace('+', '', $token);
    $token = str_replace('/', '', $token);
    $token = str_replace('=', '', $token);  
    
    return $token;
}

function SecurizeString_ForSQL($string) {
    $string = trim($string);
    $string = stripcslashes($string);
    $string = addslashes($string);
    $string = htmlspecialchars($string);
    return $string;
}


?>