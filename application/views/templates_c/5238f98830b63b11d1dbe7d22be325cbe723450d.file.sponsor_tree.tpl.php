<?php /* Smarty version Smarty 3.1.4, created on 2015-08-03 18:56:35
         compiled from "application/views/admin/tree/sponsor_tree.tpl" */ ?>
<?php /*%%SmartyHeaderCode:133183358755bfffb37e42b4-34311887%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '5238f98830b63b11d1dbe7d22be325cbe723450d' => 
    array (
      0 => 'application/views/admin/tree/sponsor_tree.tpl',
      1 => 1438230077,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '133183358755bfffb37e42b4-34311887',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'BASE_URL' => 0,
    'tran_you_must_select_user' => 0,
    'tran_select_user' => 0,
    'tran_errors_check' => 0,
    'tran_select_user_id' => 0,
    'tran_type_members_name' => 0,
    'tran_view' => 0,
    'PUBLIC_URL' => 0,
    'tran_sponsor_tree' => 0,
    'user_id' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty 3.1.4',
  'unifunc' => 'content_55bfffb3889cc',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_55bfffb3889cc')) {function content_55bfffb3889cc($_smarty_tpl) {?><script>
    
function getSponsorTree(id)
{
    

   $.ajax({

     type: "POST",
     url: '<?php echo $_smarty_tpl->tpl_vars['BASE_URL']->value;?>
admin/tree/tree_view_sponsor',
     data: { user_id: id }, // appears as $_GET['id'] @ ur backend side
     success: function(data) {
           // data is ur summary
        $('#summary').html(data);
     }

   });

}

</script>
<?php echo $_smarty_tpl->getSubTemplate ("admin/layout/header.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>


<div id="span_js_messages" style="display:none">
    <span id="error_msg"><?php echo $_smarty_tpl->tpl_vars['tran_you_must_select_user']->value;?>
</span>
</div>

<!-- start: PAGE CONTENT -->
<div class="row">
    <div class="col-sm-12">
        <div class="panel panel-default">
            <div class="panel-heading">
                <i class="fa fa-external-link-square"></i><?php echo $_smarty_tpl->tpl_vars['tran_select_user']->value;?>
  
            </div>
            <div class="panel-body">
                <form role="form" class="smart-wizard form-horizontal" name="searchform" id="searchform"  method="post">
                    <div class="col-md-12">
                        <div class="errorHandler alert alert-danger no-display">
                            <i class="fa fa-times-sign"></i> <?php echo $_smarty_tpl->tpl_vars['tran_errors_check']->value;?>

                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label" for="user_name"><?php echo $_smarty_tpl->tpl_vars['tran_select_user_id']->value;?>
<span class="symbol required"></span></label>
                        <div class="col-sm-3">
                            <input placeholder="<?php echo $_smarty_tpl->tpl_vars['tran_type_members_name']->value;?>
" class="form-control" type="text" id="user_name" name="user_name"  onKeyUp="ajax_showOptions(this, 'getCountriesByLetters','no',event)" autocomplete="Off" tabindex="1" >

                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-2 col-sm-offset-2">
                            <button class="btn btn-bricky" type="submit" id="profile_update" value="profile_update" name="profile_update" tabindex="2">
                                <?php echo $_smarty_tpl->tpl_vars['tran_view']->value;?>

                            </button>
                        </div>
                    </div>
                    <input type="hidden" id="path_temp" name="path_temp" value="<?php echo $_smarty_tpl->tpl_vars['PUBLIC_URL']->value;?>
">
                </form>
            </div>
        </div>
    </div>
</div>
<!-- end: PAGE CONTENT -->

<!-- start: GENOLOGY TREE-->                                         
<div class="row">
    <div class="col-sm-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-sitemap"></i>
                       <?php echo $_smarty_tpl->tpl_vars['tran_sponsor_tree']->value;?>

                    </div>
<div class="panel-body" style="overflow: auto;">
                <button class="zoomIn"><span class="glyphicon glyphicon-zoom-in" style="font-size:20px"></span></button>
                <button class="zoomOut"><span class="glyphicon glyphicon-zoom-out" style="font-size:20px"></span></button>
                <button class="zoomOff"><span class="glyphicon glyphicon-off" style="font-size:20px"></span></button>

                <div id="dsply_tree_zoomable">
                    <div id="summary" class="panel-body tree-container1" style="height:100%;">         
                    </div>
                </div>
            </div>
                </div>
                </div>
                </div>

<!-- end: GENOLOGY TREE-->
 

<?php echo $_smarty_tpl->getSubTemplate ("admin/layout/footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('title'=>"Example Smarty Page",'name'=>''), 0);?>

<script>
    jQuery(document).ready(function() {
        Main.init();
        getSponsorTree('<?php echo $_smarty_tpl->tpl_vars['user_id']->value;?>
');
        ValidateUser.init();
    });
</script>
<?php echo $_smarty_tpl->getSubTemplate ("admin/layout/page_footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('title'=>"Example Smarty Page",'name'=>''), 0);?>
<?php }} ?>