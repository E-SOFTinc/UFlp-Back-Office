<?php
// the message

echo phpinfo();die();
$msg = "First line of text\nSecond line of text";

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

// send email
mail("letter4aparna@gmail.com","My subject",$msg);

echo "1111111111";