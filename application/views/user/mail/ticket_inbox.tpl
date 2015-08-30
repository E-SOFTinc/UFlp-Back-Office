
<div class="panel panel-default">
    <div class="panel-heading">
        <i class="fa fa-external-link-square"></i>{$tran_inbox}
    </div>

    <div class="panel-body">



        <div id="span_js_messages" style="display:none;">
            <span id="confirm_msg">{$tran_Sure_you_want_to_Delete_There_is_NO_undo}</span>
        </div>
        <input type="hidden" id="inbox_form" name="inbox_form" value="{$BASE_URL}" />

        <table  class="table table-hover" id="sample-table-1">
            <thead>
                <tr class="th">            
                    <th>Sl No:</th> 
                    <th>Ticket ID</th>
                        {*<th>{$tran_updated}</th>*}
                    <th>{$tran_subject}</th>
                        {*<th> {$tran_from}</th>*}
                    <th> Category</th>
                    <th>Status </th>
                    <th>Last replier</th>
                    <th>Priority</th>
                </tr>
            </thead>
            <tbody>
                {assign var=i value=1}
                {assign var=clr value=""}
                {assign var=id value=""}
                {assign var=msg_id value=""}
                {assign var=user_name value=""}
                {if $cnt_row > 0}
                {foreach from=$row item=v}

                    {*{if $v.read_msg=='yes'} *}
                        {$id = $v.id}  
                       {* {if $v.status!=3}*}
                        <tr>
                            <td>
                                {$i}
                            </td>
                           {* <td>
                                <a class="btn btn-xs btn-link panel-config" href ="http://localhost/WC/Mdiet/soportemdiet/admin/admin_main.php" data-toggle="modal" style='color:#C48189'> {$v.ticket_id}</a>
                            </td>*}
                            <td>
                                <a class="btn btn-xs btn-link panel-config" href ="#panel-config{$id}" onclick="readMessage({$id}, this.parentNode.parentNode.rowIndex, 'user', '{$BASE_URL}user')" data-toggle="modal" {if $v.read=='0'}style='color:#007AFF'{else}style='color:#C48189;'{/if}> {$v.ticket_id}</a>
                            </td>
                          
                             {*<td>
                                <a class="btn btn-xs btn-link panel-config" href ="#panel-config{$id}" onclick="readMessage({$id}, this.parentNode.parentNode.rowIndex, 'user', '{$BASE_URL}user')" data-toggle="modal" {if $v.read=='0'}style='color:#007AFF'{else}style='color:#C48189;'{/if}> {$v.updated_date}</a>
                            </td>*}
                            <td>
                                <a class="btn btn-xs btn-link panel-config" href ="#panel-config{$id}" onclick="readMessage({$id}, this.parentNode.parentNode.rowIndex, 'user', '{$BASE_URL}user')" data-toggle="modal" {if $v.read=='0'}style='color:#007AFF'{else}style='color:#C48189;'{/if}> {$v.subject}</a>
                            </td>
                            {*<td>
                                
                                
                                <a id="" class="btn btn-xs btn-link panel-config" href ="#panel-config{$id}" onclick="readMessage({$v.id}, this.parentNode.parentNode.rowIndex, 'user', '{$BASE_URL}user')" data-toggle="modal" style='color:#C48189;'>  {$tran_admin}</a>
                            </td>*}
                            <td>
                                <a class="btn btn-xs btn-link panel-config" href ="#panel-config{$id}" onclick="readMessage({$id}, this.parentNode.parentNode.rowIndex, 'user', '{$BASE_URL}user')" data-toggle="modal" {if $v.read=='0'}style='color:#007AFF'{else}style='color:#C48189;'{/if}> {$v.category}</a>
                            </td>
                            <td>
                                <a class="btn btn-xs btn-link panel-config" href ="#panel-config{$id}" onclick="readMessage({$id}, this.parentNode.parentNode.rowIndex, 'user', '{$BASE_URL}user')" data-toggle="modal" {if $v.read=='0'}style='color:#007AFF'{else}style='color:#C48189;'{/if}>{if $v.status==2} Replied{else if $v.status==3}RESOLVED{else}NEW{/if}</a>
                            </td>
                            
                            <td>
                                <a class="btn btn-xs btn-link panel-config" href ="#panel-config{$id}" onclick="readMessage({$id}, this.parentNode.parentNode.rowIndex, 'user', '{$BASE_URL}user')" data-toggle="modal" {if $v.read=='0'}style='color:#007AFF'{else}style='color:#C48189;'{/if}> {if $v.lastreplier}{$v.lastreplier}{else}NA{/if}</a>
                            </td>
                            <td>
                                <a class="btn btn-xs btn-link panel-config" href ="#panel-config{$id}" onclick="readMessage({$id}, this.parentNode.parentNode.rowIndex, 'user', '{$BASE_URL}user')" data-toggle="modal" {if $v.read=='0'}style='color:#007AFF'{else}style='color:#C48189;'{/if}> {if $v.priority=='3'}Low{else if $v.priority=='2'}Medium {else if $v.priority=='1'}High {/if}</a>
                            </td>
                                          
                            {*<td class="center">
                                {$msg_id=$v.id}
                                <div class="visible-md visible-lg hidden-sm hidden-xs">
                                    <a href="#" onclick="deleteMessage({$msg_id}, this.parentNode.parentNode.rowIndex, 'user', '{$BASE_URL}user')" class="btn btn-bricky tooltips" data-placement="top" data-original-title="Delete"><i class="fa fa-times fa fa-white"></i></a>
                                </div>
                                <div class="visible-xs visible-sm hidden-md hidden-lg">
                                    <div class="btn-group">
                                        <a class="btn btn-primary dropdown-toggle btn-sm" data-toggle="dropdown" href="#">
                                            <i class="fa fa-cog"></i> <span class="caret"></span>
                                        </a>
                                        <ul role="menu" class="dropdown-menu pull-right">
                                            <li role="presentation">
                                                <a role="menuitem" tabindex="-1" href="#" onclick="deleteMessage({$msg_id}, this.parentNode.parentNode.rowIndex, 'user', '{$BASE_URL}user')">
                                                    <i class="fa fa-times"></i> Remove
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>*}
                            </td>
                        </tr>
                       {* {/if}*}
                        {$i=$i+1}	

                   

                {/foreach}
                {else}
                <tbody><tr><td align="center" colspan="4"><b>{$tran_You_have_no_mails_in_inbox}</b></td></tr></tbody>
            {/if}
            </tbody>
        </table>
                {$result_per_page}
    </div>
</div>
