{include file="user/layout/header.tpl"  name=""}

<div id="span_js_messages" style="display:none;">
    <span id="error_msg1">{$tran_you_must_enter_your_current_password}</span>        

    <span id="error_msg3">{$tran_the_password_length_should_be_greater_than_6}</span>        
    <span id="error_msg4">{$tran_password_mismatch}</span>  
    <span id="error_msg8">{$tran_special_chars_not_allowed}</span>

</div>      



<div class="row">
    <div class="col-sm-12">
        <div class="panel panel-default">
            <div class="panel-heading">
                <i class="fa fa-external-link-square"></i>
                <div class="panel-tools">
                    <a class="btn btn-xs btn-link panel-collapse collapses" href="#">
                    </a>
                    <a class="btn btn-xs btn-link panel-refresh" href="#">
                        <i class="fa fa-refresh"></i>
                    </a>
                    <a class="btn btn-xs btn-link panel-expand" href="#">
                        <i class="fa fa-resize-full"></i>
                    </a>
                    <a class="btn btn-xs btn-link panel-close" href="#">
                        <i class="fa fa-times"></i>
                    </a>
                </div>
                {$tran_change_password}
            </div>
            <div class="panel-body">
                <form role="form" class="smart-wizard form-horizontal" id="change_pass_admin" name="change_pass_admin"  method="post" >

                    <div class="col-md-12">
                        <div class="errorHandler alert alert-danger no-display">
                            <i class="fa fa-times-sign"></i> {$tran_errors_check}.
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label" for="current_pwd_admin">{$tran_current_password} : <font color="#ff0000">*</font></label>
                        <div class="col-sm-3">
                            <input name="current_pwd_admin" type="password" id="current_pwd_admin" tabindex="1" autocomplete="Off" >
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label" for="new_pwd_admin">{$tran_new_password}  : <font color="#ff0000">*</font></label>
                        <div class="col-sm-3">
                            <input name="new_pwd_admin" type="password" id="new_pwd_admin" size="20"  autocomplete="Off" tabindex="2" />
                        </div>

                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label" for="confirm_pwd_common">{$tran_confirm_password}  : <font color="#ff0000">*</font></label>
                        <div class="col-sm-3">
                            <input name="confirm_pwd_admin" type="password" id="confirm_pwd_admin" size="20"  autocomplete="Off" tabindex="3" />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-2 col-sm-offset-2">


                            <button class="btn btn-bricky" type="submit" name="change_pass_button_admin"  id="change_pass_button_admins" value="{$tran_change_password}" tabindex="4">{$tran_change_password}</button>
                        </div>
                    </div>

                </form>



            </div>

        </div>
    </div>
</div>

{include file="user/layout/footer.tpl" title="Example Smarty Page" name=""}

<script>
    jQuery(document).ready(function() {
        Main.init();
        ValidatePassword.init();
    });
</script>
{include file="user/layout/page_footer.tpl" title="Example Smarty Page" name=""}
