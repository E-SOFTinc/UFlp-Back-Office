if(typeof(TopUp)=="undefined")
{
    var scriptElement=(function deriveScriptElement()
    
    {
            var c="tu_dummy_script";
            document.write('<script id="'+c+'"><\/script>');
            var b=document.getElementById(c);
            var a=b.previousSibling;
            b.parentNode.removeChild(b);
            return a
        }()
        );
    var scriptHost=(function deriveScriptHost(){
        var a=scriptElement.getAttribute("src");
        return a.match(/^\w+\:\/\//)?a.match(/^\w+\:\/\/[^\/]*\//)[0]:""
        }());
    var scriptParams=(function deriveScriptParams(){
        var e=scriptElement.getAttribute("src");
        var c=((e.match(/([\?]*)\?(.*)+/)||["","",""])[2]||"").replace(/(^[0123456789]+|\.js(\s+)?$)/,"").split("&");
        var d={};

        for(var b=0;b<c.length;b++){
            if(c[b]!=""){
                var a=c[b].split("=");
                if(a.length==2){
                    d[a[0].replace(/^\s+|\s+$/g,"")]=a[1].replace(/^\s+|\s+$/g,"")
                    }
                }
        }
        return d
    }());
TopUp=(function(){
    var initialized=false,selector=null,on_ready=[],displaying=false,options=null,group=null,index=null,data=null;
    var fast_mode=false;
    var default_preset={
        layout:"dashboard",
        effect:"transform",
        resizable:1
    },presets={};

    var extendjQuery=function(){
        jQuery.extend({
            keys:function(hash){
                var keys=[];
                for(var key in hash){
                    if(hash.hasOwnProperty(key)){
                        keys.push(key)
                        }
                    }
                return keys
            },
        ie:jQuery.browser.msie,
        ie6:jQuery.browser.msie&&parseInt(jQuery.browser.version,10)==6,
            ie7:jQuery.browser.msie&&parseInt(jQuery.browser.version,10)==7,
            ie8:jQuery.browser.msie&&parseInt(jQuery.browser.version,10)==8,
            ff2:jQuery.browser.mozilla&&parseFloat(jQuery.browser.version)<1.9
            });
    jQuery.fn.extend({
        id:function(){
            if(!this.is("[id]")){
                var id="";
                var counter=0;
                do{
                    id="element_"+counter++
                }while(jQuery("#"+id).length);
                jQuery(this).attr("id",id)
                }
                return jQuery(this).attr("id")
            },
        markerId:function(){
            return"_"+this.id()+"_marker"
            },
        bubbleDetect:function(selector,separator){
            var detected=null;
            var element=this;
            jQuery.each(selector.split(separator||","),function(i,e){
                var selector=jQuery.trim(e);
                if(jQuery(selector).index(element)!=-1){
                    detected={
                        element:jQuery(element),
                        selector:selector
                    }
                }
            });
    return detected||(element.parent()[0]?jQuery(element.parent()[0]).bubbleDetect(selector,separator):null)
        },
    center:function(){
        var css={
            top:parseInt((jQuery(window).height()-this.outerHeight())/2,10)+jQuery(window).scrollTop(),
            left:parseInt((jQuery(window).width()-this.outerWidth())/2,10)+jQuery(window).scrollLeft(),
            position:"absolute"
        };

        this.css(css);
        return this
        },
    lockDimensions:function(){
        this.css({
            width:this.outerWidth(),
            height:this.outerHeight()
            });
        return this
        },
    unlockDimensions:function(){
        this.css({
            width:"auto",
            height:"auto"
        });
        return this
        },
    centerWrap:function(compare){
        var current={
            width:this.outerWidth(),
            height:this.outerHeight()
            },delta={
            width:0,
            height:0
        },diff=0;
        compare.find(".te_frame").css("display","block");
        diff=compare.outerWidth()-current.width;
        if(delta.width<diff){
            delta.width=diff
            }
            diff=compare.outerHeight()-current.height;
        if(delta.height<diff){
            delta.height=diff
            }
            var offset=this.offset();
        var css={
            top:offset.top-(delta.height===0?0:parseInt(delta.height/2,10)),
            left:offset.left-(delta.width===0?0:parseInt(delta.width/2,10)),
            width:this.width()+delta.width,
            height:this.height()+delta.height
            };

        if(options.x){
            css.left=options.x-parseInt((css.width-compare.outerWidth())/2,10)
            }
            if(options.y){
            css.top=options.y-parseInt((css.height-compare.outerHeight())/2,10)
            }
            jQuery("#tu_center_wrapper").css(css);
        jQuery("#tu_centered_content").append(this);
        this.css({
            top:"auto",
            left:"auto",
            width:"auto",
            height:"auto",
            display:"inline-block",
            position:"relative"
        });
        if(jQuery.ff2){
            this.css({
                display:"table"
            })
            }
            if(jQuery.ie){
            this.css({
                display:"inline"
            })
            }
            jQuery("#tu_center_wrapper").show();
        return this
        },
    removeCenterWrap:function(newTopUpWidth){
        var position=jQuery("#tu_center_wrapper").offset();
        var delta={
            width:jQuery("#tu_center_wrapper").outerWidth()-newTopUpWidth,
            height:jQuery("#tu_center_wrapper").outerHeight()-this.outerHeight()
            };

        this.css({
            top:position.top+parseInt(delta.height/2,10),
            left:position.left+parseInt(delta.width/2,10),
            position:"absolute"
        }).appendTo("body");
        jQuery("#tu_center_wrapper").hide();
        return this
        },
    draggableZ:function(opts){
        var element=this;
        this.mousedown(function(event){
            if(opts&&opts.only&&!jQuery(event.target).is(opts.only)){
                return
            }
            event.preventDefault();
            var offset=element.offset();
            var diff={
                top:event.pageY-offset.top,
                left:event.pageX-offset.left
                };

            jQuery("body").addClass("te_dragging");
            jQuery("*").bind("mousemove.draggable",function(event){
                element.css({
                    top:event.pageY-diff.top,
                    left:event.pageX-diff.left
                    })
                })
            });
        jQuery("#top_up").mouseup(function(event){
            jQuery("body").removeClass("te_dragging");
            jQuery("*").unbind("mousemove.draggable")
            })
        }
    })
};

var injectCode=function(){
    var images_url=TopUp.host+TopUp.images_path;
    var css='<style type="text/css" media="screen">.te_overflow{overflow:hidden !important}.te_dragging{cursor:move !important}#tu_overlay,.te_top_up{top:0;left:0}#tu_overlay{width:100%;height:100%;position:fixed;z-index:999}#temp_up{top:-9999px;z-index:-1}.te_transparent{opacity:0}.te_shaded{opacity:.65;background:black}.te_scrollable{overflow:auto}.te_top_up{position:absolute;z-index:1000}.te_top_up a{border:0}.te_top_up a:hover{border:0}.te_top_up .ui-resizable-se{position:absolute !important;background-color:transparent !important;border:0 !important}.te_wrapper{position:relative}.te_title{width:100%;color:white;font-family:"Lucida Grande", "Arial";font-size:11px;position:absolute;text-align:center;z-index:1001}.te_frame,#tu_center_wrapper{border-collapse:collapse}.te_frame tr,.te_frame td{margin:0;padding:0}.te_frame .te_left,.te_frame .te_middle,.te_frame .te_right{padding:0}.te_controls{position:absolute;z-index:1001}.te_close_link,.te_previous_link,.te_next_link{cursor:pointer}.te_close_link{position:absolute;z-index:1002}.te_previous_link,.te_next_link{display:block;float:left}#tu_center_wrapper{position:absolute;z-index:1000}#tu_loader{width:100%;height:100%;position:absolute;background:url('+images_url+"loader.gif) no-repeat 50% 50%;display:block;z-index:1003} #top_up .te_dashboard .ui-resizable-se{width:10px !important;height:10px !important;bottom:12px !important;right:10px !important;background-image:url("+images_url+"dashboard/sprite.png) !important;background-position:0 0 !important}.te_dashboard .te_title{top:-9px;font-weight:bold;text-shadow:1px 1px 1px black}.te_dashboard .te_corner,.te_dashboard .te_rib{background-image:url("+images_url+"dashboard/sprite.png)}.te_dashboard .te_top,.te_dashboard .te_bottom{height:20px}.te_dashboard .te_left_filler{width:20px}.te_dashboard .te_right_filler{width:19px}.te_dashboard .te_middle .te_middle{background:url("+images_url+"dashboard/middle.png)}.te_dashboard .te_top .te_left{background-position:-17px -29px}.te_dashboard .te_top .te_middle{background-position:0 -71px}.te_dashboard .te_top .te_right{background-position:-33px -29px}.te_dashboard .te_middle .te_left{background-position:-17px -232px}.te_dashboard .te_middle .te_right{background-position:-33px -232px}.te_dashboard .te_bottom .te_left{background-position:-17px -47px}.te_dashboard .te_bottom .te_middle{background-position:-17px -89px}.te_dashboard .te_bottom .te_right{background-position:-33px -47px}.te_dashboard .te_content{margin:-11px -12px -11px -13px}.te_dashboard .te_controls{left:50%;width:63px;height:29px;margin-left:-33px;padding-left:5px;bottom:35px;background-image:url("+images_url+"dashboard/sprite.png);background-position:0 -178px}.te_dashboard .te_previous_link,.te_dashboard .te_next_link{width:31px;height:29px;background-image:url("+images_url+"dashboard/sprite.png)}.te_dashboard .te_previous_link{background-position:66px -113px}.te_dashboard .te_next_link{background-position:30px -113px}.te_dashboard .te_previous_link:hover{background-position:66px -142px}.te_dashboard .te_next_link:hover{background-position:30px -142px}.te_dashboard .te_close_link{width:28px;height:26px;top:-1px;right:-6px;background-image:url("+images_url+"dashboard/sprite.png);background-position:-20px 0} #top_up .te_quicklook .ui-resizable-se{width:10px !important;height:10px !important;bottom:12px !important;right:9px !important;background-image:url("+images_url+"quicklook/sprite.png) !important;background-position:-75px -181px !important}.te_quicklook .te_title{top:6px}.te_quicklook .te_corner,.te_quicklook .te_rib{background-image:url("+images_url+"quicklook/sprite.png)}.te_quicklook .te_top{height:24px}.te_quicklook .te_bottom{height:56px}.te_quicklook .te_left_filler,.te_quicklook .te_right_filler{width:12px}.te_quicklook .te_middle .te_middle{background:url("+images_url+"quicklook/middle.png)}.te_quicklook .te_top .te_left{background-position:0 0}.te_quicklook .te_top .te_middle{background-position:0 -30px}.te_quicklook .te_top .te_right{background-position:12px 0}.te_quicklook .te_middle .te_left{background-position:0 -181px}.te_quicklook .te_middle .te_right{background-position:12px -181px}.te_quicklook .te_bottom .te_left{background-position:0 -122px}.te_quicklook .te_bottom .te_middle{background-position:0 -61px}.te_quicklook .te_bottom .te_right{background-position:12px -122px}.te_quicklook .te_content{margin:0 -7px}.te_quicklook .te_controls{left:50%;width:66px;margin-left:-33px;bottom:18px}.te_quicklook .te_previous_link,.te_quicklook .te_next_link{width:31px;height:29px;margin:0 1px;background-image:url("+images_url+"quicklook/sprite.png)}.te_quicklook .te_previous_link{background-position:89px -195px}.te_quicklook .te_next_link{background-position:52px -195px}.te_quicklook .te_previous_link:hover{background-position:89px -226px}.te_quicklook .te_next_link:hover{background-position:52px -226px}.te_quicklook .te_close_link{width:13px;height:13px;top:7px;left:9px;background-image:url("+images_url+"quicklook/sprite.png);background-position:-24px -181px} #top_up .te_flatlook .ui-resizable-se{width:10px !important;height:10px !important;bottom:22px !important;right:14px !important;background-image:url("+images_url+"flatlook/sprite.png) !important;background-position:-75px -181px !important}.te_flatlook .te_title{top:5px;text-shadow:1px 1px 2px #2A2A2A}.te_flatlook .te_corner,.te_flatlook .te_rib{background-image:url("+images_url+"flatlook/sprite.png)}.te_flatlook .te_top{height:26px}.te_flatlook .te_bottom{height:29px}.te_flatlook .te_left_filler,.te_flatlook .te_right_filler{width:21px}.te_flatlook .te_middle .te_middle{background:url("+images_url+"flatlook/middle.png) repeat-x top}.te_flatlook .te_top .te_left{background-position:0 0}.te_flatlook .te_top .te_middle{background-position:0 -29px}.te_flatlook .te_top .te_right{background-position:-89px 0}.te_flatlook .te_middle .te_left{background-position:0 -181px}.te_flatlook .te_middle .te_right{background-position:-89px -181px}.te_flatlook .te_bottom .te_left{background-position:0 -90px}.te_flatlook .te_bottom .te_middle{background-position:0 -58px}.te_flatlook .te_bottom .te_right{background-position:-89px -90px}.te_flatlook .te_content{margin:-2px -11px -3px -11px}.te_flatlook .te_controls{left:50%;width:66px;margin-left:-33px;bottom:18px}.te_flatlook .te_previous_link,.te_flatlook .te_next_link{width:31px;height:29px;margin:0 1px;background-image:url("+images_url+"flatlook/sprite.png)}.te_flatlook .te_previous_link{background-position:89px -195px}.te_flatlook .te_next_link{background-position:52px -195px}.te_flatlook .te_previous_link:hover{background-position:89px -226px}.te_flatlook .te_next_link:hover{background-position:52px -226px}.te_flatlook .te_close_link{width:13px;height:13px;top:6px;left:15px;background-image:url("+images_url+"flatlook/sprite.png);background-position:-24px -181px}</style>";
    var ie7fix='<style type="text/css" media="screen">.te_dashboard .te_content{margin-bottom:-14px}</style>';
    var ie6fix='<style type="text/css" media="screen">.te_dashboard .te_content{margin-bottom:-13px}.te_dashboard .te_controls{width:65px;padding-left:3px}.te_dashboard .te_top .te_left,.te_dashboard .te_top .te_middle,.te_dashboard .te_top .te_right{background-image:none}.te_dashboard .te_middle .te_left,.te_dashboard .te_middle .te_right{background-image:none}.te_dashboard .te_bottom .te_left,.te_dashboard .te_bottom .te_middle,.te_dashboard .te_bottom .te_right{background-image:none}.te_dashboard .te_controls,.te_dashboard .te_previous_link,.te_dashboard .te_next_link,.te_dashboard .te_close_link{background-image:none}.te_dashboard .te_top .te_left{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'dashboard/top_left.png" , sizingMethod="crop" )}.te_dashboard .te_top .te_middle{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'dashboard/top_middle.png" , sizingMethod="scale")}.te_dashboard .te_top .te_right{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'dashboard/top_right.png" , sizingMethod="crop" )}.te_dashboard .te_middle .te_left{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'dashboard/middle_left.png" , sizingMethod="scale")}.te_dashboard .te_middle .te_middle{filter:alpha(opacity = 75);background:black}.te_dashboard .te_middle .te_right{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'dashboard/middle_right.png" , sizingMethod="scale")}.te_dashboard .te_bottom .te_left{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'dashboard/bottom_left.png" , sizingMethod="crop" )}.te_dashboard .te_bottom .te_middle{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'dashboard/bottom_middle.png", sizingMethod="scale")}.te_dashboard .te_bottom .te_right{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'dashboard/bottom_right.png" , sizingMethod="crop" )}.te_dashboard .te_controls{background:#505455}.te_dashboard .te_previous_link{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'dashboard/previous.png" , sizingMethod="crop" )}.te_dashboard .te_next_link{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'dashboard/next.png" , sizingMethod="crop" )}.te_dashboard .te_close_link{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'dashboard/close_link.png" , sizingMethod="crop" )} .te_quicklook .te_bottom{height:55px}.te_quicklook .te_controls{width:67px}.te_quicklook .te_top .te_left,.te_quicklook .te_top .te_middle,.te_quicklook .te_top .te_right{background-image:none}.te_quicklook .te_middle .te_left,.te_quicklook .te_middle .te_right{background-image:none}.te_quicklook .te_bottom .te_left,.te_quicklook .te_bottom .te_middle,.te_quicklook .te_bottom .te_right{background-image:none}.te_quicklook .te_previous_link,.te_quicklook .te_next_link,.te_quicklook .te_close_link{background-image:none}.te_quicklook .te_top .te_left{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'quicklook/top_left.png" , sizingMethod="crop" )}.te_quicklook .te_top .te_middle{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'quicklook/top_middle.png" , sizingMethod="scale")}.te_quicklook .te_top .te_right{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'quicklook/top_right.png" , sizingMethod="crop" )}.te_quicklook .te_middle .te_left{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'quicklook/middle_left.png" , sizingMethod="scale")}.te_quicklook .te_middle .te_middle{filter:alpha(opacity = 70);background:black}.te_quicklook .te_middle .te_right{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'quicklook/middle_right.png" , sizingMethod="scale")}.te_quicklook .te_bottom .te_left{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'quicklook/bottom_left.png" , sizingMethod="crop" )}.te_quicklook .te_bottom .te_middle{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'quicklook/bottom_middle.png", sizingMethod="scale")}.te_quicklook .te_bottom .te_right{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'quicklook/bottom_right.png" , sizingMethod="crop" )}.te_quicklook .te_previous_link{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'quicklook/previous.png" , sizingMethod="crop" )}.te_quicklook .te_next_link{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'quicklook/next.png" , sizingMethod="crop" )}.te_quicklook .te_close_link{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'quicklook/close_link.png" , sizingMethod="crop" )} .te_flatlook .te_bottom{height:55px}.te_flatlook .te_controls{width:67px}.te_flatlook .te_top .te_left,.te_flatlook .te_top .te_middle,.te_flatlook .te_top .te_right{background-image:none}.te_flatlook .te_middle .te_left,.te_flatlook .te_middle .te_right{background-image:none}.te_flatlook .te_bottom .te_left,.te_flatlook .te_bottom .te_middle,.te_flatlook .te_bottom .te_right{background-image:none}.te_flatlook .te_previous_link,.te_flatlook .te_next_link,.te_flatlook .te_close_link{background-image:none}.te_flatlook .te_top .te_left{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'flatlook/top_left.png" , sizingMethod="crop" )}.te_flatlook .te_top .te_middle{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'flatlook/top_middle.png" , sizingMethod="scale")}.te_flatlook .te_top .te_right{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'flatlook/top_right.png" , sizingMethod="crop" )}.te_flatlook .te_middle .te_left{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'flatlook/middle_left.png" , sizingMethod="scale")}.te_flatlook .te_middle .te_middle{filter:alpha(opacity = 70);background:black}.te_flatlook .te_middle .te_right{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'flatlook/middle_right.png" , sizingMethod="scale")}.te_flatlook .te_bottom .te_left{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'flatlook/bottom_left.png" , sizingMethod="crop" )}.te_flatlook .te_bottom .te_middle{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'flatlook/bottom_middle.png", sizingMethod="scale")}.te_flatlook .te_bottom .te_right{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'flatlook/bottom_right.png" , sizingMethod="crop" )}.te_flatlook .te_previous_link{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'flatlook/previous.png" , sizingMethod="crop" )}.te_flatlook .te_next_link{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'flatlook/next.png" , sizingMethod="crop" )}.te_flatlook .te_close_link{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+images_url+'flatlook/close_link.png" , sizingMethod="crop" )}</style>';
    var iefix='<style type="text/css" media="screen">#tu_overlay{top:expression((ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px");left:expression((ignoreMe2 = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px");position:absolute}.te_transparent{filter:alpha(opacity = 0)}.te_shaded{filter:alpha(opacity = 65)}.te_content{position:relative;zoom:1}</style>';
    var html='<div id="tu_overlay" onclick="TopUp.overlayClose()" style="display: none"></div><div id="top_up" class="te_top_up" style="display: none"><div class="te_wrapper"><div class="te_title"></div><table class="te_frame"><tr class="te_top"><td class="te_left te_corner"><div class="te_left_filler"></div></td><td class="te_middle te_rib"></td><td class="te_right te_corner"><div class="te_right_filler"></div></td></tr><tr class="te_middle"><td class="te_left te_rib"></td><td class="te_middle"><div class="te_content"><!-- Content --></div></td><td class="te_right te_rib"></td></tr><tr class="te_bottom"><td class="te_left te_corner"></td><td class="te_middle te_rib"></td><td class="te_right te_corner"></td></tr></table><div class="te_controls" style="display: none"><a class="te_previous_link" onclick="TopUp.previous()"></a><a class="te_next_link" onclick="TopUp.next()"></a></div><a class="te_close_link" onclick="TopUp.close()" style="display: none"></a></div></div><div id="temp_up" class="te_top_up te_transparent"><div class="te_wrapper"><div class="te_title"></div><table class="te_frame"><tr class="te_top"><td class="te_left te_corner"><div class="te_left_filler"></div></td><td class="te_middle te_rib"></td><td class="te_right te_corner"><div class="te_right_filler"></div></td></tr><tr class="te_middle"><td class="te_left te_rib"></td><td class="te_middle"><div class="te_content"><!-- Content --></div></td><td class="te_right te_rib"></td></tr><tr class="te_bottom"><td class="te_left te_corner"></td><td class="te_middle te_rib"></td><td class="te_right te_corner"></td></tr></table><div class="te_controls" style="display: none"><a class="te_previous_link" onclick="TopUp.previous()"></a><a class="te_next_link" onclick="TopUp.next()"></a></div><a class="te_close_link" onclick="TopUp.close()" style="display: none"></a></div></div><table id="tu_center_wrapper" style="display: none"><tr valign="middle"><td id="tu_centered_content" align="center"><!-- Top ups --></td></tr></table><div id="tu_loader" style="display: none"></div>';
    if(!jQuery("head").length){
        jQuery(document.body).before("<head></head>")
        }
        jQuery(css).prependTo("head");
    if(jQuery.ie7||jQuery.ie8){
        jQuery(ie7fix).insertAfter("head > style:first")
        }
        if(jQuery.ie6){
        jQuery(ie6fix).insertAfter("head > style:first")
        }
        if(jQuery.ie){
        jQuery(iefix).insertAfter("head > style:first")
        }
        jQuery(html).appendTo("body")
    };

var bind=function(){
    var coptions=[];
    if(!fast_mode){
        coptions.push("[class^=tu_][class*=x]");
        jQuery.each(["db","ql","fl","image","html","dom","iframe","ajax","script"],function(i,coption){
            coptions.push("[class^=tu_][class*=_"+coption+"]")
            })
        }
        selector=jQuery.merge([".top_up","[toptions]",coptions.join(",")],jQuery.keys(presets)).join();
    jQuery(selector).live("click",topUpClick);
    jQuery(document).bind("keyup",documentKeyPress)
    };

var fadeDuration=function(duration){
    return jQuery.ie8||jQuery.ie7||jQuery.ie6?0:duration
    };

var topUpClick=function(event){
    TopUp.displayTopUp(jQuery(event.target));
    return false
    };

var documentKeyPress=function(event){
    if(jQuery("#top_up").is(":hidden")||jQuery(event.target).is(":input")){
        return
    }
    switch(event.keyCode){
        case 27:
            TopUp.close();
            break;
        case 37:
            TopUp.previous();
            break;
        case 39:
            TopUp.next();
            break
            }
        };

var deriveTopUpOptions=function(topUp,opts){
    var toptions=jQuery.extend({},{
        topUp:"#"+topUp.element.id(),
        preset:topUp.selector
        });
    jQuery.each(topUp.element.attr("class").split(/\s/),function(i,c){
        if(c.match(/^tu_/)){
            jQuery.each(c.replace(/^tu_/,"").split("_"),function(j,coption){
                switch(coption){
                    case"db":case"ql":case"fl":
                        toptions.layout={
                        db:"dashboard",
                        ql:"quicklook",
                        fl:"flatlook"
                    }
                    [coption];
                    break;
                    case"image":case"html":case"dom":case"iframe":case"ajax":case"script":
                        toptions.type=coption;
                        break;
                    default:
                        if(coption.match(/\dx\d/)){
                        toptions.width=coption.split("x")[0];
                        toptions.height=coption.split("x")[1]
                        }
                    }
                })
    }
    });
if(topUp.element.is("[toptions]")){
    jQuery.each(topUp.element.attr("toptions").split(","),function(i,option){
        var key_value=option.split("=");
        toptions[jQuery.trim(key_value[0])]=jQuery.trim(key_value[1])
        })
    }
    if(toptions.noGroup&&parseInt(toptions.noGroup,10)==1){
    toptions.group=null
    }
    if(opts){
    toptions=jQuery.extend(toptions,opts)
    }
    return toptions
};

var deriveOptions=function(reference,opts,store){
    var result=jQuery.extend({},default_preset);
    if(opts){
        if(presets[opts.preset]){
            result=jQuery.extend(result,presets[opts.preset])
            }
            result=jQuery.extend(result,opts)
        }
        if(result.ondisplay&&!jQuery.isFunction(result.ondisplay)){
        var fdisplay=result.ondisplay;
        result.ondisplay=function(){
            eval(fdisplay)
            }
        }
    if(result.onclose&&!jQuery.isFunction(result.onclose)){
    var fclose=result.onclose;
    result.onclose=function(){
        eval(fclose)
        }
    }
if(store){
    result.reference=result.reference?jQuery(result.reference):reference;
    if(!result.type){
        result.type=deriveType(reference)
        }
        if(movieContentDisplayed(result)){
        result.resizable=0
        }
        options=jQuery.extend({},result)
    }
    return result
};

var deriveType=function(reference){
    if(reference.toLowerCase().match(/\.(gif|jpg|jpeg|png)(\?[0123456789]+)?$/)){
        return"image"
        }
        if(reference.toLowerCase().match(/\.(swf)(\?[0123456789]+)?$/)){
        return"flash"
        }
        if(reference.toLowerCase().match(/\.(flv)(\?[0123456789]+)?$/)){
        return"flashvideo"
        }
        if(reference.toLowerCase().match(/\.(aif|aiff|aac|au|bmp|gsm|mov|mid|midi|mpg|mpeg|m4a|m4v|mp4|psd|qt|qtif|qif|qti|snd|tif|tiff|wav|3g2|3gp|wbmp)(\?[0123456789]+)?$/)){
        return"quicktime"
        }
        if(reference.toLowerCase().match(/\.(ra|ram|rm|rpm|rv|smi|smil)(\?[0123456789]+)?$/)){
        return"realplayer"
        }
        if(reference.toLowerCase().match(/\.(asf|avi|wma|wmv)(\?[0123456789]+)?$/)){
        return"windowsmedia"
        }
        return"ajax"
    };

var movieContentDisplayed=function(opts){
    return jQuery.inArray((opts||options).type,["flash","flashvideo","quicktime","realplayer","windowsmedia"])!=-1
    };

var deriveGroup=function(){
    if(options.group){
        if(!(group&&group.name==options.group)){
            group={
                name:options.group,
                items:jQuery([])
                };

            jQuery.each(jQuery(selector),function(i,e){
                if(!jQuery(e).is("[tu_group]")){
                    jQuery(e).attr("tu_group",deriveOptions(null,deriveTopUpOptions(jQuery(e).bubbleDetect(selector))).group)
                    }
                    if(jQuery(e).attr("tu_group")==group.name){
                    group.items=group.items.add(e)
                    }
                })
        }
        var ids=jQuery.map(group.items,function(e,i){
        return"#"+jQuery(e).id()
        });
    index=options.topUp?jQuery.inArray(options.topUp,ids):-1
    }else{
    group=null
    }
};

var navigateInGroup=function(step){
    if(group===null){
        return
    }
    index=index+step;
    if(index<0){
        index=group.items.length-1
        }
        if(index>group.items.length-1){
        index=0
        }
        TopUp.displayTopUp(group.items[index])
    };

var prepare=function(){
    if(jQuery("#top_up .te_frame").resizable){
        jQuery("#top_up .te_frame").resizable("destroy")
        }
        jQuery("#top_up .te_title").fadeOut(fadeDuration(200));
    if(!(group&&group.items.length>1)){
        jQuery("#top_up .te_controls").fadeOut(fadeDuration(200))
        }
        jQuery(".te_wrapper").attr("class","te_wrapper te_"+options.layout);
    jQuery(".te_frame,.te_content").unlockDimensions();
    if(parseInt(options.shaded,10)==1){
        jQuery("#tu_overlay").addClass("te_shaded")
        }else{
        jQuery("#tu_overlay").removeClass("te_shaded")
        }
        if((parseInt(options.modal,10)==1)||(parseInt(options.shaded,10)==1)||(parseInt(options.overlayClose,10)==1)){
        if(jQuery.ie8){
            var fixOverlay=function(){
                jQuery("#tu_overlay").css("top",document.body.parentElement.scrollTop+"px")
                };

            fixOverlay.apply();
            window.onresize=fixOverlay;
            jQuery(window).bind("scroll",fixOverlay)
            }
            jQuery("#tu_overlay").show()
        }else{
        jQuery("#tu_overlay").hide()
        }
        var altText="";
    if(options.topUp&&(options.topUp!="")&&((parseInt(options.readAltText,10)==1)||(options.title&&options.title.match("{alt}")))){
        var topUp=jQuery(options.topUp);
        if(topUp.length){
            var image=topUp.find("img");
            if(image.length){
                altText=image.attr("alt")||""
                }
                if(altText!=""&&!(options.title&&options.title.match("{alt}"))){
                options.title="{alt}"
                }
            }
    }
options.title=(options.title||"").replace("{alt}",altText).replace("{current}",group===null?"":(index+1)).replace("{total}",group===null?"":group.items.length)
};

var loadContent=function(){
    switch(options.type){
        case"image":
            options.content=new Image();
            jQuery(options.content).load(function(){
            options.content=jQuery(this);
            onContentReady()
            }).attr("src",options.reference);
            break;
        case"flash":case"flashvideo":case"quicktime":case"realplayer":case"windowsmedia":
            loadMovie(options.type,options.reference,options.width,options.height);
            break;
        case"iframe":
            options.content=jQuery('<iframe src="'+options.reference+'" frameborder="0" border="0"></iframe>');
            break;
        case"html":case"dom":
            var reference=jQuery(options.reference);
            if(reference.context){
            var marker=jQuery("<div></div>").attr({
                id:reference.markerId(),
                "class":(reference.is(":hidden")?"hidden":""),
                style:"display: none"
            });
            options.content=jQuery("<div></div>").append(reference.before(marker).addClass("marked"));
            reference.show()
            }else{
            options.content=jQuery("<div></div>").append(reference)
            }
            break;
        case"ajax":case"script":
            options.content=null;
            jQuery.ajax({
            url:options.reference,
            type:(parseInt(options.post,10)==1)?"POST":"GET",
            cache:false,
            async:false,
            data:options.parameters,
            dataType:(options.type=="ajax")?"html":"script",
            success:onContentReady
        })
        }
        if(jQuery.inArray(options.type,["html","dom","iframe"])!=-1){
        onContentReady()
        }
    };

var loadMovie=function(type,src,width,height){
    if(!jQuery.ie){
        switch(options.type){
            case"flash":
                loadFlashContent();
                break;
            case"flashvideo":
                loadFlashVideoContent();
                break;
            case"quicktime":
                loadQuickTimeContent();
                break;
            case"realplayer":
                loadRealPlayerContent();
                break;
            case"windowsmedia":
                loadWindowsMediaContent();
                break
                }
                return
    }
    var object_attrs={
        width:width,
        height:height
    },params={
        src:src
    },classid=null,mimetype=null,codebase=null,pluginspage=null;
    switch(type){
        case"flash":case"flashvideo":
            classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
            codebase="https://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0";
            mimetype="application/x-shockwave-flash";
            pluginspage="https://get.adobe.com/flashplayer/";
            break;
        case"quicktime":
            classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B";
            codebase="https://www.apple.com/qtactivex/qtplugin.cab";
            mimetype="video/quicktime";
            pluginspage="https://www.apple.com/quicktime/download/";
            params.scale="aspect";
            params.bgcolor="black";
            params.showlogo="false";
            params.autoplay="true";
            break;
        case"realplayer":
            classid="clsid:CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA";
            mimetype="audio/x-pn-realaudio-plugin";
            pluginspage="https://www.real.com/freeplayer/?rppr=rnwk";
            params.controls="imagewindow";
            params.console="one";
            params.autostart="true";
            params.nojava="true";
            break;
        case"windowsmedia":
            classid="clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6";
            codebase="https://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701";
            mimetype="application/x-oleobject";
            pluginspage="https://www.microsoft.com/Windows/MediaPlayer/";
            params.filename=src;
            params.animationatstart="true";
            params.transparentatstart="true";
            params.autostart="true";
            params.showcontrols="true";
            params.showstatusbar="true";
            params.windowlessvideo="true";
            break
            }
            switch(type){
        case"flash":case"flashvideo":
            params.allowfullscreen="true";
        case"flashvideo":
            params.flashvars="file="+src+"&autostart=true";
            src=TopUp.host+TopUp.players_path+"flvplayer.swf";
            params.src=src;
            params.movie=src;
            break
            }
            object_attrs.codebase=codebase;
    if(window.ActiveXObject){
        object_attrs.classid=classid;
        object_attrs.data=src
        }
        var paramTags="";
    for(var key in params){
        paramTags+=" "+createElementTag("param",{
            name:key,
            value:params[key]
            })
        }
        params.width=width;
    params.height=height;
    params.mimetype=mimetype;
    params.pluginspage=pluginspage;
    var element=document.createElement("div");
    element.innerHTML=createElementTag("object",object_attrs)+paramTags+createElementTag("embed",params)+"</embed></object>";
    options.content=jQuery(element);
    onContentReady()
    };

var createElementTag=function(tagName,attrs){
    var html="<"+tagName;
    for(var key in attrs){
        html+=" "+key+"='"+attrs[key]+"'"
        }
        return html+">"
    };

var loadFlashContent=function(){
    var object=jQuery("<object></object>").attr({
        width:options.width,
        height:options.height,
        classid:"clsid:D27CDB6E-AE6D-11CF-96B8-444553540000",
        codebase:"https://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0",
        style:"display: none"
    });
    object.append(jQuery("<param></param>").attr({
        name:"src",
        value:options.reference
        }));
    object.append(jQuery("<param></param>").attr({
        name:"allowfullscreen",
        value:"true"
    }));
    object.append(jQuery("<embed></embed>").attr({
        src:options.reference,
        width:options.width,
        height:options.height,
        allowfullscreen:"true",
        type:"application/x-shockwave-flash",
        pluginspage:"https://get.adobe.com/flashplayer/"
    }));
    options.content=jQuery("<div></div>").attr({
        width:options.width,
        height:options.height
        });
    options.content.append(object);
    onContentReady()
    };

var loadFlashVideoContent=function(){
    var object=jQuery("<object></object>").attr({
        width:options.width,
        height:options.height,
        classid:"clsid:D27CDB6E-AE6D-11CF-96B8-444553540000",
        codebase:"https://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0",
        style:"display: none"
    });
    object.append(jQuery("<param></param>").attr({
        name:"movie",
        value:TopUp.host+TopUp.players_path+"flvplayer.swf"
        }));
    object.append(jQuery("<param></param>").attr({
        name:"flashvars",
        value:"file="+options.reference+"&autostart=true"
        }));
    object.append(jQuery("<param></param>").attr({
        name:"allowfullscreen",
        value:"true"
    }));
    object.append(jQuery("<embed></embed>").attr({
        src:TopUp.host+TopUp.players_path+"flvplayer.swf",
        width:options.width,
        height:options.height,
        flashvars:"file="+options.reference+"&autostart=true",
        allowfullscreen:"true",
        type:"application/x-shockwave-flash",
        pluginspage:"https://get.adobe.com/flashplayer/"
    }));
    options.content=jQuery("<div></div>").attr({
        width:options.width,
        height:options.height
        });
    options.content.append(object);
    onContentReady()
    };

var loadQuickTimeContent=function(){
    var object=jQuery("<object></object>").attr({
        width:options.width,
        height:options.height,
        classid:"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",
        codebase:"https://www.apple.com/qtactivex/qtplugin.cab",
        style:"display: none"
    });
    object.append(jQuery("<param></param>").attr({
        name:"src",
        value:options.reference
        }));
    object.append(jQuery("<param></param>").attr({
        name:"scale",
        value:"aspect"
    }));
    object.append(jQuery("<param></param>").attr({
        name:"bgcolor",
        value:"black"
    }));
    object.append(jQuery("<param></param>").attr({
        name:"showlogo",
        value:"false"
    }));
    object.append(jQuery("<param></param>").attr({
        name:"autoplay",
        value:"true"
    }));
    object.append(jQuery("<embed></embed>").attr({
        src:options.reference,
        width:options.width,
        height:options.height,
        scale:"aspect",
        bgcolor:"black",
        showlogo:"false",
        autoplay:"true",
        type:"video/quicktime",
        pluginspage:"https://www.apple.com/quicktime/download/"
    }));
    options.content=jQuery("<div></div>").attr({
        width:options.width,
        height:options.height,
        style:"background: black"
    });
    options.content.append(object);
    onContentReady()
    };

var loadRealPlayerContent=function(){
    var object=jQuery("<object></object>").attr({
        width:options.width,
        height:options.height,
        classid:"clsid:CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA",
        style:"display: none"
    });
    object.append(jQuery("<param></param>").attr({
        name:"src",
        value:options.reference
        }));
    object.append(jQuery("<param></param>").attr({
        name:"controls",
        value:"imagewindow"
    }));
    object.append(jQuery("<param></param>").attr({
        name:"console",
        value:"one"
    }));
    object.append(jQuery("<param></param>").attr({
        name:"autostart",
        value:"true"
    }));
    object.append(jQuery("<embed></embed>").attr({
        src:options.reference,
        width:options.width,
        height:options.height,
        controls:"imagewindow",
        console:"one",
        autostart:"true",
        nojava:"true",
        type:"audio/x-pn-realaudio-plugin",
        pluginspage:"https://www.real.com/freeplayer/?rppr=rnwk"
    }));
    options.content=jQuery("<div></div>").attr({
        width:options.width,
        height:options.height
        });
    options.content.append(object);
    onContentReady()
    };

var loadWindowsMediaContent=function(){
    loadQuickTimeContent()
    };

var onContentReady=function(html){
    hideLoader();
    if(html){
        options.content=jQuery(html)
        }
        switch(options.type){
        case"image":case"html":case"dom":case"iframe":
            options.resize=options.content;
            jQuery(".te_content").removeClass("te_scrollable");
            break;
        default:
            options.resize=jQuery("#temp_up .te_content");
            jQuery(".te_content").addClass("te_scrollable")
            }
            if(jQuery("#top_up").is(":hidden")){
        show()
        }else{
        replace()
        }
    };

var showLoader=function(){
    var origin=jQuery("#top_up");
    if(jQuery("#top_up").is(":hidden")){
        origin=jQuery(options.topUp);
        if(!origin.length){
            origin=jQuery(document)
            }else{
            if(origin.children().length>0){
                origin=jQuery(origin.children()[0])
                }
            }
    }
try{
    var dimensions={
        top:origin.offset().top,
        left:origin.offset().left,
        width:origin.outerWidth(),
        height:origin.outerHeight()
        }
    }catch(e){
    var dimensions={
        top:jQuery(window).scrollTop(),
        left:jQuery(window).scrollLeft(),
        width:parseInt(jQuery(window).width()/2,10),
        height:parseInt(jQuery(window).height()/2,10)
        }
    }
jQuery("#tu_loader").html("&nbsp;").css(dimensions).show()
};

var hideLoader=function(){
    jQuery("#tu_loader").hide()
    };

var show=function(){
    setContent();
    setDimensions();
    moveContent("top_up");
    jQuery("#top_up").center();
    if(options.x){
        jQuery("#top_up").css({
            left:parseInt(options.x,10)
            })
        }
        if(options.y){
        jQuery("#top_up").css({
            top:parseInt(options.y,10)
            })
        }
        switch(options.effect){
        case"appear":case"fade":
            jQuery("#top_up").fadeIn(fadeDuration(300),afterDisplay);
            break;
        case"switch":case"clip":
            jQuery("#top_up").show("clip",{
            direction:"vertical"
        },500,afterDisplay);
        break;
        case"transform":
            var origin=jQuery(options.topUp);
            if(origin.children().length>0){
            origin=jQuery(origin.children()[0])
            }
            var tuContent=jQuery("#top_up").find(".te_content");
            var dimensions=options.topUp?jQuery.extend({
            width:origin.outerWidth(),
            height:origin.outerHeight()
            },origin.offset()):{
            top:parseInt(jQuery(window).height()/2,10)-parseInt(tuContent.height()/2,10)+jQuery(window).scrollTop(),
            left:parseInt(jQuery(window).width()/2,10)-parseInt(tuContent.width()/2,10)+jQuery(window).scrollLeft(),
            width:10,
            height:10
        };

        transform("from",dimensions,afterDisplay);
            break;
        default:
            jQuery("#top_up").show();
            afterDisplay()
            }
        };

var replace=function(callback){
    var isScrollable=jQuery("#top_up .te_content").hasClass("te_scrollable");
    if(isScrollable){
        jQuery("#top_up .te_content").removeClass("te_scrollable")
        }
        var focusedElement=jQuery("#top_up .te_content :focus");
    var wrapper=jQuery("#top_up .te_content").lockDimensions().wrapInner("<div></div>").children();
    wrapper.fadeOut(fadeDuration(250),function(){
        if(parseInt(options.storeCurrent,10)==1){
            wrapper.addClass("te_stored_content").hide().find(".te_stored_content").before(wrapper)
            }else{
            wrapper.children().appendTo("#temp_up .te_content").end().end().remove()
            }
            if(callback){
            var arg=jQuery("#temp_up .te_content");
            if(jQuery.inArray(options.type,["html","dom"])!=-1){
                arg=arg.children().eq(0)
                }
                callback.apply(arg)
            }else{
            clearContent();
            setContent()
            }
            if(isScrollable){
            jQuery("#top_up .te_content").addClass("te_scrollable")
            }
            setDimensions();
        jQuery("#top_up").centerWrap(jQuery("#temp_up"));
        var animation={
            width:jQuery("#temp_up .te_content").outerWidth(),
            height:jQuery("#temp_up .te_content").outerHeight()
            };

        var newTopUpWidth=jQuery("#temp_up").outerWidth();
        jQuery("#top_up .te_content").animate(animation,400,function(){
            moveContent("top_up");
            jQuery("#top_up").removeCenterWrap(newTopUpWidth);
            focusedElement.focus();
            afterDisplay()
            })
        })
    };

var setContent=function(){
    options.content.appendTo("#temp_up .te_content")
    };

var moveContent=function(to){
    var from=to=="top_up"?"temp_up":"top_up";
    jQuery("#"+from+" .te_content").children().appendTo("#"+to+" .te_content");
    if(to=="top_up"){
        jQuery("#top_up .te_content").css({
            width:jQuery("#temp_up .te_content").css("width"),
            height:jQuery("#temp_up .te_content").css("height")
            })
        }
    };

var clearContent=function(){
    jQuery(".te_content .marked").each(function(){
        var marker=jQuery("#"+jQuery(this).markerId());
        if(marker.hasClass("hidden")){
            jQuery(this).hide()
            }
            marker.after(jQuery(this).removeClass("marked")).remove()
        });
    jQuery(".te_content").children(":not(.te_stored_content)").remove()
    };

var transform=function(direction,dimensions,callback){
    var topUp=jQuery("#top_up");
    var tuContent=topUp.find(".te_content");
    if(direction=="from"){
        topUp.addClass("te_transparent").show()
        }
        var topUpOffset=topUp.offset();
    var tuContentOffset=tuContent.offset();
    var tuContentDiff={
        width:topUp.width()-tuContent.width(),
        height:topUp.height()-tuContent.height()
        };

    dimensions.top-=tuContentOffset.top-topUpOffset.top;
    dimensions.left-=tuContentOffset.left-topUpOffset.left;
    var origin={
        top:topUp.css("top"),
        left:topUp.css("left"),
        width:topUp.outerWidth(),
        height:topUp.outerHeight()
        };

    var opts={
        to:direction=="from"?origin:dimensions,
        duration:500
    };

    if(direction=="from"){
        opts.to.width-=tuContentDiff.width;
        opts.to.height-=tuContentDiff.height
        }
        var animation=function(){
        var cb=function(){
            callback.apply();
            options.content.removeClass("te_overflow")
            };

        var onReady=direction=="to"?function(){
            topUp.fadeOut(fadeDuration(100),cb)
            }:cb;
        topUp.animate({
            top:opts.to.top,
            left:opts.to.left
            },opts.duration);
        options.content.animate({
            width:opts.to.width,
            height:opts.to.height
            },opts.duration,onReady)
        };

    options.content.addClass("te_overflow");
    if(direction=="from"){
        topUp.css({
            top:dimensions.top,
            left:dimensions.left
            });
        options.content.css({
            width:dimensions.width,
            height:dimensions.height
            });
        jQuery(".te_top_up,.te_content").unlockDimensions();
        topUp.hide().removeClass("te_transparent").fadeIn(fadeDuration(150),animation)
        }else{
        animation.apply()
        }
    };

var afterDisplay=function(){
    var duration=fadeDuration(500);
    if(jQuery("#top_up .te_frame").resizable&&parseInt(options.resizable,10)==1){
        var opts={
            stop:function(){
                jQuery("#top_up .te_frame").css({
                    width:"auto",
                    height:"auto"
                })
                },
            handles:"se",
            minWidth:200,
            minHeight:75,
            alsoResize:"#"+options.resize.id(),
            aspectRatio:options.type=="image"
            };

        jQuery("#top_up .te_frame").resizable(opts)
        }
        if(jQuery.ie6||jQuery.ie7){
        jQuery("#top_up .te_title").css("width",jQuery("#top_up").width())
        }
        jQuery("#top_up .te_title").html(options.title||"").fadeIn(duration);
    if(group&&group.items.length>1&&jQuery("#top_up .te_controls").is(":hidden")){
        if(jQuery.ie6){
            jQuery("#top_up .te_controls").show()
            }else{
            jQuery("#top_up .te_controls").fadeIn(duration)
            }
        }
    if(jQuery("#top_up .te_close_link").is(":hidden")){
    if(jQuery.ie6){
        jQuery("#top_up .te_close_link").show()
        }else{
        jQuery("#top_up .te_close_link").fadeIn(duration)
        }
    }
checkPosition();
jQuery(".te_top_up,.te_content").unlockDimensions();
if(movieContentDisplayed()){
    options.content.find("object").show()
    }
    if(options.ondisplay){
    options.ondisplay.apply(this,[jQuery("#top_up .te_content"),data])
    }
    displaying=false
};

var setDimensions=function(dimensions){
    var func=dimensions?null:checkHeight;
    if(!dimensions){
        options.resize.unlockDimensions();
        if(jQuery.inArray(options.type,["image","html","dom","iframe"])!=-1){
            jQuery("#temp_up .te_content").unlockDimensions()
            }
            dimensions={};

        if(options.width){
            dimensions.width=parseInt(options.width,10)
            }
            if(options.height){
            dimensions.height=parseInt(options.height,10)
            }
            if(jQuery.ie6){
            jQuery("#top_up .te_title").css("width",jQuery("#temp_up").outerWidth())
            }
        }
    if(jQuery.ie8){
    jQuery("#top_up .te_close_link").hide()
    }
    options.resize.css(dimensions);
if(jQuery.ie8){
    jQuery("#top_up .te_close").show()
    }
    if(func){
    func.apply()
    }
};

var checkHeight=function(){
    if(jQuery("#temp_up").outerHeight()<=jQuery(window).height()-4){
        return
    }
    var extraHeight=jQuery("#temp_up").outerHeight()-jQuery("#temp_up .te_content").height(),dimensions={
        height:jQuery(window).height()-4-extraHeight
        };

    if(options.type=="image"){
        dimensions.width=parseInt(options.content.width()*(dimensions.height/options.content.height()),10)
        }
        setDimensions(dimensions)
    };

var checkPosition=function(){
    var offset=jQuery("#top_up").offset();
    var dimensions={
        width:jQuery("#top_up").outerWidth(),
        height:jQuery("#top_up").outerHeight()
        };

    var position={};

    if(offset.top-jQuery(window).scrollTop()<2){
        position.top=jQuery(window).scrollTop()+2
        }else{
        if(offset.top+dimensions.height-jQuery(window).scrollTop()>jQuery(window).height()-2){
            position.top=jQuery(window).scrollTop()+jQuery(window).height()-dimensions.height-2
            }
        }
    if(offset.left-jQuery(window).scrollLeft()<2){
    position.left=jQuery(window).scrollLeft()+2
    }else{
    if(offset.left+dimensions.width-jQuery(window).scrollLeft()>jQuery(window).width()-2){
        position.left=jQuery(window).scrollLeft()+jQuery(window).width()-dimensions.width-24
        }
    }
if(jQuery.keys(position).length>0){
    if(jQuery.ie6||jQuery.ie7){
        jQuery("#top_up").css(position);
        window.setTimeout(function(){
            jQuery("#top_up .te_content").show()
            },1)
        }else{
        jQuery("#top_up").animate(position,300)
        }
    }
};

var hide=function(callback){
    jQuery(".te_content .te_stored_content").removeClass("te_stored_content");
    var duration=fadeDuration(250);
    var onReady=function(){
        animateHide(callback)
        };

    jQuery("#top_up .te_title").fadeOut(duration);
    jQuery("#top_up .te_controls").fadeOut(duration);
    if(movieContentDisplayed()){
        options.content.find("object").hide()
        }
        if(jQuery.ie){
        jQuery("#top_up .te_close_link").hide();
        onReady.apply()
        }else{
        jQuery("#top_up .te_close_link").fadeOut(duration,onReady)
        }
    };

var animateHide=function(callback){
    var afterHide=function(){
        if(callback){
            callback.apply(this,[jQuery("#top_up .te_content"),data])
            }
            if(options.onclose){
            options.onclose.apply(this,[jQuery("#top_up .te_content"),data])
            }
            clearContent();
        moveContent("temp_up")
        };

    switch(options.effect){
        case"appear":case"fade":
            jQuery("#top_up").fadeOut(fadeDuration(300),afterHide);
            break;
        case"switch":case"clip":
            jQuery("#top_up").hide("clip",{
            direction:"vertical"
        },400,afterHide);
        break;
        case"transform":
            if(jQuery.ie6){
            jQuery("#top_up").hide();
            afterHide.apply();
            break
        }
        var origin=jQuery(options.topUp);
            if(origin.children().length>0){
            origin=jQuery(origin.children()[0])
            }
            var tuContent=jQuery("#top_up").find(".te_content");
            var dimensions=options.topUp?jQuery.extend({
            width:origin.outerWidth(),
            height:origin.outerHeight()
            },origin.offset()):{
            top:parseInt(jQuery(window).height()/2,10)+jQuery(window).scrollTop(),
            left:parseInt(jQuery(window).width()/2,10)+jQuery(window).scrollLeft(),
            width:10,
            height:10
        };

        transform("to",dimensions,afterHide);
            break;
        default:
            jQuery("#top_up").hide();
            afterHide()
            }
            jQuery("#tu_overlay").hide()
    };

return{
    version:"1.7.2",
    jquery:null,
    host:scriptParams.host||scriptHost,
    images_path:scriptParams.images_path||"WC/Revamp_Cod/binary/public_html/images/top_up/",
    players_path:scriptParams.players_path||"players/",
    data:data,
    init:function(){
        if(initialized){
            return false
            }
            try{
            jQuery(document).ready(function(){
                TopUp.jquery=jQuery().jquery;
                fast_mode=parseInt(scriptParams.fast_mode,10)==1;
                default_preset.resizable=jQuery.ui&&jQuery.ui.resizable?1:0;
                extendjQuery();
                injectCode();
                bind();
                jQuery("#top_up").draggableZ({
                    only:".te_title,.te_top *,.te_bottom *"
                });
                jQuery.each(on_ready,function(i,func){
                    func.apply()
                    })
                });
            jQuery(window).unload(function(){
                jQuery("*").unbind();
                if(jQuery("#top_up .te_frame").resizable){
                    jQuery("#top_up .te_frame").resizable("destroy")
                    }
                });
        initialized=true
        }catch(e){}
},
defaultPreset:function(set){
    default_preset=jQuery.extend(default_preset,set)
    },
addPresets:function(sets){
    presets=jQuery.extend(presets,sets)
    },
ready:function(func){
    on_ready.push(func)
    },
enableFastMode:function(){
    var args=arguments;
    if(!jQuery.isReady){
        TopUp.ready(function(){
            TopUp.enableFastMode.apply(null,args)
            });
        return false
        }
        if(arguments.length){
        var arg=arguments[0];
        var func=jQuery.isFunction(arg)?arg:function(){
            return arg
            };

        fast_mode=func.apply()
        }else{
        fast_mode=true
        }
        fast_mode=fast_mode==true||parseInt(fast_mode,10)==1;
    TopUp.rebind()
    },
rebind:function(){
    if(selector){
        jQuery(selector).die("click",topUpClick)
        }
        bind()
    },
displayTopUp:function(element,opts){
    if(!jQuery.isReady){
        TopUp.ready(function(){
            TopUp.displayTopUp(element,opts)
            });
        return false
        }
        var topUp=jQuery(element).bubbleDetect(selector);
    var toptions=deriveTopUpOptions(topUp,jQuery.extend(opts||{},{
        trigger:"#"+jQuery(element).id()
        }));
    TopUp.display(topUp.element.attr("href"),toptions)
    },
display:function(reference,opts){
    if(!jQuery.isReady){
        TopUp.ready(function(){
            TopUp.display(reference,opts)
            });
        return false
        }
        if(displaying){
        return false
        }
        try{
        displaying=true;
        data={};

        deriveOptions(reference,opts,true);
        showLoader();
        var continueDisplaying=function(){
            try{
                deriveGroup();
                prepare();
                loadContent()
                }catch(e){
                displaying=false;
                hideLoader();
                alert("Sorry, but the following error occured:\n\n"+e)
                }
            };

    if(jQuery.ie6){
        window.setTimeout(continueDisplaying,1)
        }else{
        continueDisplaying()
        }
    }catch(e){
    displaying=false;
    hideLoader();
    alert("Sorry, but the following error occured:\n\n"+e)
    }
},
update:function(func){
    if(jQuery("#top_up").is(":hidden")){
        return
    }
    replace(func||function(){})
    },
restore:function(storeCurrent,callback){
    options.storeCurrent=storeCurrent?1:0;
    options.ondisplay=callback;
    TopUp.update(function(){
        clearContent();
        var stored_content=this.children(":not(.te_stored_content):first-child").prev();
        if(!stored_content.length){
            stored_content=this.children(".te_stored_content:last-child")
            }
            stored_content.children().insertBefore(stored_content).end().end().remove()
        })
    },
previous:function(){
    navigateInGroup(-1)
    },
next:function(){
    navigateInGroup(1)
    },
overlayClose:function(){
    if(parseInt(options.overlayClose,10)==1){
        TopUp.close()
        }
    },
close:function(callback){
    if(jQuery("#top_up").is(":visible")){
        hide(callback)
        }
    }
}
}());
(function(){
    var d=[];
    if(scriptParams.libs!=null){
        var b=scriptParams.libs.replace(/clip|switch/g,"fxc-clip").replace(/resize/g,"uic-resizable").split("+");
        for(var a=0;a<b.length;a++){
            if(["all","core","fxc-clip","uic-resizable"].indexOf(b[a])!=-1){
                if(d.indexOf(b[a])==-1){
                    d.push(b[a])
                    }
                }
        }
    }else{
    if(typeof(jQuery)=="undefined"){
        d.push("all")
        }else{
        if(!jQuery.effects||!jQuery.effects.clip){
            d.push("fxc-clip")
            }
            if(!jQuery.ui||!jQuery.ui.resizable){
            d.push("uic-resizable")
            }
        }
}
if(d.length==0){
    TopUp.init()
    }else{
    var c=scriptElement.getAttribute("src").replace(/(development\/)?top_up(\-min)?\.js.*$/,"jquery/"+d.sort().join(".")+".js");
    document.write('<script src="'+c+'" type="text/javascript" onload="TopUp.init()" onreadystatechange="TopUp.init()"><\/script>')
    }
}())
};
