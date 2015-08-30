<?phprequire_once "../../class/Auth.php";$sess_obj=new Auth();$sess_obj->checkAdminLoged();
// include the php-excel class
require (dirname (__FILE__) . "/class-excel-xml.inc.php");

require_once '../../class/Payout.php';
$obj_payout = new Payout();

if($_GET["from"] and $_GET["to"])
{
$from_date = $_GET["from"];
$to_date = $_GET["to"];

//echo "From: $from_date To: $to_date";

	
	$obj_payout->getTotalPayout($from_date,$to_date);
	//print_r($obj_payout->all_payout_details);
	$count = count($obj_payout->all_payout_details);
	if($count >= 1)
	{
	
	$doc[1][0] = "No";
	$doc[1][1] = "Username";
	$doc[1][2] = "Left Count";
	$doc[1][3] = "Right Count";
	$doc[1][4] = "Total Leg";
	$doc[1][5] = "Total amount";
	$doc[1][6] = "TDS";
	$doc[1][7] = "Service Charge";
	$doc[1][8] = "Amount Payable";

    $count = $count + 2;
	$j = 0;
	
for($i=2;$i<$count;$i++)
{        
	
	
	$doc[$i][0] = $j+1;
	$doc[$i][1] = $obj_payout->all_payout_details["detail$j"]["user_name"];    
    $doc[$i][2] = $obj_payout->all_payout_details["detail$j"]["left_leg"];
    $doc[$i][3] = $obj_payout->all_payout_details["detail$j"]["right_leg"];
    $doc[$i][4] = $obj_payout->all_payout_details["detail$j"]["total_leg"];
    $doc[$i][5] = $obj_payout->all_payout_details["detail$j"]["total_amount"];    
    $doc[$i][6] = $obj_payout->all_payout_details["detail$j"]["tds"];
    $doc[$i][7] = $obj_payout->all_payout_details["detail$j"]["service_charge"];
	$doc[$i][8] = $obj_payout->all_payout_details["detail$j"]["amount_payable"];

	$j = $j+1;

	} // For loop ends
	
		$now = date("Y-W");
		$xls = new Excel_XML;
		$xls->addArray ( $doc );
		$xls->generateXML ("weekly_report-$now");
} // End of if
	
// generate excel file

}

?>