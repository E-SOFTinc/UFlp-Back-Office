function addNewFields()
{
//alert(document.addcustomerform.service.value);
    if(document.addcustomerform.service.value=='14')
        {
           // alert("ppp");
            $("#product_type").show();

        }
        else
            {
                $("#product_type").hide();
            //    alert("no");
            }
}



function trim(a)
	{

	  return a.replace(/^\s+|\s+$/,'');
	}

function getXMLHTTP() { //fuction to return the xml http object
		var xmlhttp=false;
		try{
			xmlhttp=new XMLHttpRequest();
		}
		catch(e)	{
			try{
				xmlhttp= new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e){
				try{
				xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch(e1){
					xmlhttp=false;
				}
			}
		}

		return xmlhttp;
    }





    function getServiceId(service_id)
        {
	   //var strURL="ajax/findDistrict.php?state_id="+service_id;
           var strURL="../ajax_add_customer/service_id:"+service_id;
		var req = getXMLHTTP();

		if (req) {

			req.onreadystatechange = function() {
                        if (req.readyState == 4) {
                            // only if "OK"
            if (req.status == 200) {
             // alert(trim(req.responseText));
                document.getElementById('product_type').innerHTML=trim(req.responseText);
            } else {
                        alert("There was a problem while using XMLHTTP:\n" + req.statusText);
					}
				}
			}
			req.open("GET", strURL, true);
			//alert(strURL);
			req.send(null);
		}
	}