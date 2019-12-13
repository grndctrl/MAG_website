<?php
  $url = '/projecten';
  ob_start();
  header('Location: '. $url);
  ob_end_flush();
  die();
