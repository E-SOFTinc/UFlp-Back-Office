function trim(a){    return a.replace(/^\s+|\s+$/,'');}function getXMLHTTP() { //fuction to return the xml http object    var xmlhttp=false;	    try{        xmlhttp=new XMLHttpRequest();    }    catch(e)	{		        try{			            xmlhttp= new ActiveXObject("Microsoft.XMLHTTP");        }        catch(e){            try{                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");            }            catch(e1){                xmlhttp=false;            }        }    }		 	    return xmlhttp;}	function getProductValue(amount) {    amount=amount.value;    var strURL="product/ajax_get_product/amount:"+amount;    var req = getXMLHTTP();		    if (req) {			        req.onreadystatechange = function() {            if (req.readyState == 4) {                // only if "OK"                if (req.status == 200) {                    //  alert(trim(req.responseText));                    var product_value=trim(req.responseText);                    document.proadd.product_value.value=product_value;                } else {                    alert("There was a problem while using XMLHTTP:\n" + req.statusText);                }            }				        }			        req.open("GET", strURL, true);        //alert(strURL);        req.send(null);    }		}	