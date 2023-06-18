<?php


/*
    Cette fonction permet de rendre tout les événements passés indisponibles

    Cette fonction ne prend pas de paramètres
    
    Cette fonction s'occupe de : 
        - rendre tout les événements passé indisponibles (is_disponible = 0)

    Cette fonction ne retourne rien
*/


function past_events() {

    $sql = "UPDATE
                evenement
            SET
                is_disponible = 0
            WHERE
                date < NOW()
            AND
                is_disponible = 1";

    $result=mysqli_query($mysqli,$sql);
    
}
    


?>
