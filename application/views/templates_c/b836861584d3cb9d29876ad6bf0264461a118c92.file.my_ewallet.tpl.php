<?php /* Smarty version Smarty 3.1.4, created on 2015-08-03 06:55:48
         compiled from "application/views/user/ewallet/my_ewallet.tpl" */ ?>
<?php /*%%SmartyHeaderCode:43429185855bf56c497e528-17231020%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'b836861584d3cb9d29876ad6bf0264461a118c92' => 
    array (
      0 => 'application/views/user/ewallet/my_ewallet.tpl',
      1 => 1438230077,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '43429185855bf56c497e528-17231020',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'tran_you_must_enter_user_name' => 0,
    'tran_rows' => 0,
    'tran_shows' => 0,
    'PUBLIC_URL' => 0,
    'PATH_TO_ROOT_DOMAIN' => 0,
    'tran_my_ewallet_details' => 0,
    'details_count' => 0,
    'tran_ewallet_details' => 0,
    'user_name' => 0,
    'tran_slno' => 0,
    'tran_date' => 0,
    'tran_description' => 0,
    'tran_amount' => 0,
    'tran_balance' => 0,
    'details' => 0,
    'v' => 0,
    'amount_type' => 0,
    'balance' => 0,
    'amount' => 0,
    'i' => 0,
    'class' => 0,
    'date' => 0,
    'type' => 0,
    'tran_available_amount' => 0,
    'tran_no_transfer_details' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty 3.1.4',
  'unifunc' => 'content_55bf56c4b2039',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_55bf56c4b2039')) {function content_55bf56c4b2039($_smarty_tpl) {?><?php if (!is_callable('smarty_function_counter')) include '/home/uflipca/membres/system/libraries/smarty/plugins/function.counter.php';
?><?php echo $_smarty_tpl->getSubTemplate ("user/layout/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('name'=>''), 0);?>

</span>        
</span>
</span>
">
">

 : <?php echo $_smarty_tpl->tpl_vars['user_name']->value;?>
 </h3></center>
</th>
</th>
</th>
</th>
</th>
 $_from = $_smarty_tpl->tpl_vars['details']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['v']->key => $_smarty_tpl->tpl_vars['v']->value){
$_smarty_tpl->tpl_vars['v']->_loop = true;
?>
" align="center" >
</td>
</td>
</td>
</td>
</td>
 </b></td>
</b></td>
</h3>

<?php }} ?>