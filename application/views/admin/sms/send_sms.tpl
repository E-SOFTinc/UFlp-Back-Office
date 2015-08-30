﻿{include file="admin/layout/header.tpl"  name=""}

<div id="span_js_messages" style="display: none;">
    <span id="errmsg">{$tran_You_must_enter_keyword_to_search}</span>
    <input type="hidden" id="path_temp" name="path_temp" value="{$PUBLIC_URL}">
    <input type="hidden" id="path_root" name="path_root" value="{$PATH_TO_ROOT_DOMAIN}admin/">
    <span id="error_msg">{$tran_you_must_enter_number}</span>
    <span id="error_msg1">{$tran_you_must_select_distributors}</span>
    <span id="error_msg3">{$tran_you_must_select_distributors}</span>
    <span id="validate_msg3">{$tran_you_must_select_one_distributor}</span>     
    <span id="validate_msg4">{$tran_you_please_type_your_message}</span>     
    <span id="validate_msg5">{$tran_please_enter_phone_number}</span>     
    <span id="validate_msg6">{$tran_select_user}</span>     
    <span id="error_msg4">{$tran_you_must_select_file}</span>     
</div>

<div class="row">
    <div class="col-sm-12">
        <div class="panel panel-default">
            <div class="panel-heading">
                <i class="fa fa-external-link-square"></i>    {$tran_upload_excel_files}
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
            </div>
            <div class="panel-body">
                <form role="form" class="smart-wizard form-horizontal" method="post" name="upload" id="upload" ENCTYPE="multipart/form-data"  >

                    <div class="col-md-12">
                        <div class="errorHandler alert alert-danger no-display">
                            <i class="fa fa-times-sign"></i> {$tran_errors_check}.
                        </div>
                    
                   
                        
                    
<div class="form-group">
        <label class="col-sm-2 control-label" for="product_id"> {$tran_select_excel_file}:</label>

                            
                       
                        <div class="fileupload fileupload-new" data-provides="fileupload" >
                                
                                <div class="user-edit-image-buttons">
                                    <span class="btn btn-light-grey btn-file"><span class="fileupload-new"><i class="fa fa-picture"></i>  {$tran_select_excel_file}</span><span class="fileupload-exists"><i class="fa fa-picture"></i> Change</span>
                                        <input type="file" id="userfile" name="userfile" tabindex="1">
                                    </span>
                                    <a href="#" class="btn fileupload-exists btn-light-grey" data-dismiss="fileupload">
                                        <i class="fa fa-times"></i>Remove
                                    </a>
                                </div>
                            </div>
							 </div>
                    <div class="form-group">
                        <div class="col-sm-2 col-sm-offset-2">

                            <button class="btn btn-bricky"  type="submit" name="upload" id="upload" value="Upload" tabindex="2" >{$tran_upload} </button>
                        </div>
                    </div>
                  </div>
                </form>
            </div>
        </div>

    </div>

</div>    

<div class="row">
    <div class="col-sm-12">
        <div class="panel panel-default">
            <div class="panel-heading">
                <i class="fa fa-external-link-square"></i>    {$tran_send_sms}
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
            </div>
            <div class="panel-body">
               <form role="form" class="smart-wizard form-horizontal" method="post"  name="send_sms" id="send_sms" >

                    <div class="col-md-12">
                        <div class="errorHandler alert alert-danger no-display">
                            <i class="fa fa-times-sign"></i> {$tran_errors_check}.
                        </div>
                    </div>
                    <div class="form-group">
                                        <label class="col-sm-2 control-label" >{$tran_sender_id}: <font color="#ff0000">*</font></label>
                                        <div class="col-sm-3">
   <input tabindex="3" type="text" name="senderid" id="senderid" size="20" readonly="true" value="InfiniteSMS" 
					   title=""/>  <span id="username_box" style="display:none;"></span>
                                        </div>
                                    </div>
                                        
                                        
                                        
                                         
                                     <div class="form-group">
                                        <label class="col-sm-2 control-label" > {$tran_distributor}: <font color="#ff0000">*</font></label>
                                            <div class="col-sm-3">
                       <table >      
                           
                           <tr> <td><input tabindex="4" type="radio"  name="selectall" id="selectall" value="new" onClick="new_no();" /> </td><td><label for="val"></label>{$tran_new_no}</td></tr>
                           <tr> <td><input tabindex="4" type="radio"  name="selectall" id="selectall1" value="one" onClick="showone();"  /></td><td><label for="valid"></label> {$tran_select_one}</td></tr>
                           <tr> <td><input tabindex="4" type="radio"  name="selectall" id="selectall2" value="ids" onClick="showids();" /></td> <td><label for="val"></label>{$tran_select_by_ids}</td></tr>
                           <tr>   <td><input tabindex="4" type="radio" name="selectall" value="all" onClick="showall();"  id="selectall3"  /></td><td><label for="valid"></label>  {$tran_select_all} </td></tr>

                           {if $upload} <tr> <td> <input tabindex="5" type="radio"name="selectall" value="excel" checked="checked" onClick="showexcel();"  id="selectall4"  /></td><td><label for="valid"></label>  {$tran_from_file} </td></tr>{/if}
                       </table>
                                            </div>
                                     </div>
                                        
                       
							<div class="form-group" id="phone_num_container" style="display:none">
                                        <label class="col-sm-2 control-label" >{$tran_number}: <font color="#ff0000">*</font></label>
                                        <div class="col-sm-2">
										<p>
                                        <select tabindex="6"   class="form-control" name="individual" id="individual"  style="display:none; " onblur="validate_sms1();"> 
                                            {$select}
                                        </select>
										</p>
										<p>
                                        <select tabindex="6"  class="form-control" name="fromid" id="fromid" style="display:none;" onblur="validate_sms1();"> 
                                            {$first_id} 
                                        </select>
										</p>
										<p>
                                        <select tabindex="6"  class="form-control" name="toid" id="toid" style="display:none;" onblur="validate_sms1();">
                                            {$last_id}
                                        </select>
                                        <span id="select"></span>
										</p>
                                        
                                        
										<div class="form-group" >
										<div class="col-sm-12">
										<input tabindex="7" name="numbers" id="numbers" type="text" size="30" maxlength="100"  autocomplete="Off" value=''style="display:none;"  />
										</div>
										</div>

										</div>
						</div>
                                           
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="word_count"> 
                             {$tran_message}: <font color="#ff0000">*</font>
                            </label>
                            
                                <div class="col-sm-5">
                                    <textarea  class="form-control"name="word_count" id="word_count" cols="35" rows="6" onblur="validate_sms1();" tabindex="8" ></textarea></td>
									<div class="alert alert-info no-border-radius">
										<!--<button data-dismiss="alert" class="close">
											×
										</button>-->
										<i class="fa fa-info-circle"></i>
										{$tran_160_characters_consumes_one_unit_of_message}
									</div>
									

                                </div>
                            
                        </div>
                   

                                     <div class="form-group">
                                      
                                    </div>
                                    
                                     <div class="form-group">
                                         <font color="#ff0000"><label style="padding-top: 0;" class="col-sm-2 control-label" >{$tran_total_characters}:</label></font> 
                                         <span id="display_count">0</span>
                                    </div>
                                    
                                     <div class="form-group">
                                        <font color="#ff0000"> <label style="padding-top: 0;" class="col-sm-2 control-label" for="sms_count">{$tran_total_sms_count} :</label></font> 
                                         <span id="display_smscount">0</span>      
                            <input type="hidden" name="sms_count" value="0" id="sms_count"/>
                                    </div>
                                    
                    <div class="form-group">
                        <div class="col-sm-2 col-sm-offset-2">
                            <button class="btn btn-bricky"  type="submit"  name="send_sms_button"  id="send_sms_button" value="{$tran_send_sms}"tabindex="9" onblur="validate_sms1();">{$tran_send_sms}</button>
                        </div>
                    </div>
                  
                </form>
                
            </div>
        </div>
    </div>   
</div>   

{include file="admin/layout/footer.tpl" title="Example Smarty Page" name=""}
<script>
    jQuery(document).ready(function() {
    Main.init();               
     ValidateUser.init();
});        

</script>
{include file="admin/layout/page_footer.tpl" title="Example Smarty Page" name=""}