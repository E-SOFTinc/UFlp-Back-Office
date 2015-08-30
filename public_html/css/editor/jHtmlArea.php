<?php
header("Content-type: text/css");
$jHtmlArea_Toolbar_Group_BG = TEMPLATE_PUBLIC_PATH."images/jHtmlArea_Toolbar_Group_BG.png";
$jHtmlArea_Toolbar_Group__Btn_Select_BG =TEMPLATE_PUBLIC_PATH."images/jHtmlArea_Toolbar_Group__Btn_Select_BG.png";
$jHtmlArea = TEMPLATE_PUBLIC_PATH."images/jHtmlArea.png";
?>

﻿div.jHtmlArea { display: inline block; }
div.jHtmlArea div { padding: 0px; margin: 0px; }
div.jHtmlArea .ToolBar { }
div.jHtmlArea .ToolBar ul { border: solid 1px #ccc; margin: 1px; padding: 1px; float: left; background: #fff url(<?php  echo $jHtmlArea_Toolbar_Group_BG; ?>) repeat-x;}
div.jHtmlArea .ToolBar ul li { list-style-type: none; float: left; border: none; padding: 1px; margin: 1px; }
div.jHtmlArea .ToolBar ul li:hover { border: solid 1px #ccc; background: #ddd url(<?php  echo $jHtmlArea_Toolbar_Group__Btn_Select_BG; ?>); padding: 0; }
div.jHtmlArea .ToolBar ul li a { display: block; width: 16px; height: 16px; background: url(<?php echo $jHtmlArea; ?>) no-repeat -16px -500px; border: none; cursor: pointer; padding: 0px; }
div.jHtmlArea .ToolBar ul li a.highlighted { border: solid 1px #aaa; background-color: #000; padding: 0; }
div.jHtmlArea .ToolBar ul li.separator {height: 16px; margin: 0 2px 0 3px; border-left: 1px solid #ccc;}
div.jHtmlArea .ToolBar ul li.separator:hover { padding: 1px; background-color: #000; border-top:none; border-bottom:none; border-right:none;}

div.jHtmlArea .ToolBar ul li a:hover { }
div.jHtmlArea .ToolBar ul li a.bold { background-position: 0 0; }
div.jHtmlArea .ToolBar ul li a.italic { background-position: -16px 0; }
div.jHtmlArea .ToolBar ul li a.underline { background-position: -32px 0; }
div.jHtmlArea .ToolBar ul li a.strikethrough { background-position: -48px 0; }
div.jHtmlArea .ToolBar ul li a.link { background-position: -64px 0; }
div.jHtmlArea .ToolBar ul li a.unlink { background-position: -80px 0; }
div.jHtmlArea .ToolBar ul li a.orderedlist { background-position: -96px 0; }
div.jHtmlArea .ToolBar ul li a.unorderedlist { background-position: -112px 0; }
div.jHtmlArea .ToolBar ul li a.image { background-position: -128px 0; }
div.jHtmlArea .ToolBar ul li a.cut { background-position: -144px 0; }
div.jHtmlArea .ToolBar ul li a.copy { background-position: -160px 0; }
div.jHtmlArea .ToolBar ul li a.paste { background-position: -176px 0; }

div.jHtmlArea .ToolBar ul li a.html { background-position: -192px 0; opacity:0.6; filter:alpha(opacity=60);}
div.jHtmlArea .ToolBar ul li a.html.highlighted { opacity:1.0; filter:alpha(opacity=100);}

div.jHtmlArea .ToolBar ul li a.h1 { background-position: 0 -16px;}
div.jHtmlArea .ToolBar ul li a.h2 { background-position: -16px -16px;}
div.jHtmlArea .ToolBar ul li a.h3 { background-position: -32px -16px;}
div.jHtmlArea .ToolBar ul li a.h4 { background-position: -48px -16px;}
div.jHtmlArea .ToolBar ul li a.h5 { background-position: -64px -16px;}
div.jHtmlArea .ToolBar ul li a.h6 { background-position: -80px -16px;}
div.jHtmlArea .ToolBar ul li a.subscript   { background-position: -96px -16px;}
div.jHtmlArea .ToolBar ul li a.superscript { background-position: -112px -16px;}
div.jHtmlArea .ToolBar ul li a.indent { background-position: -128px -16px;}
div.jHtmlArea .ToolBar ul li a.outdent { background-position: -144px -16px;}
div.jHtmlArea .ToolBar ul li a.horizontalrule { background-position: -160px -16px;}
div.jHtmlArea .ToolBar ul li a.p { background-position: -176px -16px;}


div.jHtmlArea .ToolBar ul li a.justifyleft { background-position: 0 -32px;}
div.jHtmlArea .ToolBar ul li a.justifycenter { background-position: -16px -32px;}
div.jHtmlArea .ToolBar ul li a.justifyright { background-position: -32px -32px;}
div.jHtmlArea .ToolBar ul li a.increasefontsize { background-position: -48px -32px;}
div.jHtmlArea .ToolBar ul li a.decreasefontsize { background-position: -64px -32px;}
div.jHtmlArea .ToolBar ul li a.forecolor { background-position: -80px -32px;}
