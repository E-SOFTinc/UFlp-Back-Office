<?php /* Smarty version Smarty 3.1.4, created on 2015-08-21 12:07:11
         compiled from "application/views/admin/ewallet/my_ewallet.tpl" */ ?>
<?php /*%%SmartyHeaderCode:78083972155bba453b2c4c0-44321919%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'ae3efbd9721d8772946d7450047e42f9f9ea9650' => 
    array (
      0 => 'application/views/admin/ewallet/my_ewallet.tpl',
      1 => 1439275251,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '78083972155bba453b2c4c0-44321919',
  'function' => 
  array (
  ),
  'version' => 'Smarty 3.1.4',
  'unifunc' => 'content_55bba453d2b91',
  'variables' => 
  array (
    'tran_select_user_name' => 0,
    'PUBLIC_URL' => 0,
    'PATH_TO_ROOT_DOMAIN' => 0,
    'tran_rows' => 0,
    'tran_shows' => 0,
    'tran_my_ewallet_details' => 0,
    'tran_errors_check' => 0,
    'tran_submit' => 0,
    'ewallet_view_permission' => 0,
    'details_count' => 0,
    'tran_ewallet_details' => 0,
    'user_name' => 0,
    'tran_slno' => 0,
    'tran_date' => 0,
    'tran_description' => 0,
    'tran_amount' => 0,
    'tran_balance' => 0,
    'ewallet_details' => 0,
    'v' => 0,
    'amount_type' => 0,
    'balance' => 0,
    'amount' => 0,
    'view_amount_type' => 0,
    'i' => 0,
    'class' => 0,
    'date' => 0,
    'type' => 0,
    'tran_available_amount' => 0,
    'tran_no_transfer_details' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_55bba453d2b91')) {function content_55bba453d2b91($_smarty_tpl) {?><?php if (!is_callable('smarty_function_counter')) include '/home/uflipca/membres/system/libraries/smarty/plugins/function.counter.php';
?><?php echo $_smarty_tpl->getSubTemplate ("admin/layout/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('name'=>''), 0);?>

</span>
">
">
</span>
</span>


<span class="symbol required"></span></label>
" tabindex="2">

   

 : <?php echo $_smarty_tpl->tpl_vars['user_name']->value;?>
 </h3></center>
</th>
</th>
</th>
</th>
</th>
 $_from = $_smarty_tpl->tpl_vars['ewallet_details']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
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