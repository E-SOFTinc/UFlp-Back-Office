<?php
$url = 'http://membres.uflip.ca/admin/backup/generate_backup';
 
 get_data($url);
 
 function get_data($url) 
{ 
  $ch = curl_init();
  $timeout = 25;
  curl_setopt($ch,CURLOPT_URL,$url);
  curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
  curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  $data = curl_exec($ch);
  curl_close($ch);
  return $data;
}

