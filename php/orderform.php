<?php
//	print(" das " + $_POST[1] + "\n");
//	var_dump($_POST);


/*********variables**************/
	//Get variables from POST
	$load_csv = $_GET["csv"];
	
	$admin_info = $_POST["adminInfo"];
	$admin_status = $_POST["adminStatus"];
	
	$orderForm_version = $_POST["orderFormVersion"];

	$date = $_POST["date"];
	$BillTo_name = $_POST["BillTo_name"];
	$EAN_no = $_POST["EAN_name"];
	$EAN_Fakultet = $_POST["EAN_Fakultet"];
	$EAN_Institut = $_POST["EAN_Institut"];
	$EAN_Afdeling = $_POST["EAN_Afdeling"];
	$CVR_no = $_POST["CVR_no"];
	$CVR_adr1 = $_POST["CVR_adr1"];
	$CVR_adr2 = $_POST["CVR_adr2"];
	$LPname = $_POST["LP-name"];
	$LPmail = $_POST["LP-mail"];
	$LPphone = $_POST["LP-phone"];
	$BPname = $_POST["BP-name"];
	$BPmail = $_POST["BP-mail"];
	$BPphone = $_POST["BP-phone"];
	$PI = $_POST["PI"];
	$PIname = $_POST["PI-name"];
	$PImail = $_POST["PI-email"];
	$Addinfo = $_POST["Addinfo"];

	$Runtype0 = $_POST["runtype_0"];
	$Runtype1 = $_POST["runtype_1"];
	$Runtype2 = $_POST["runtype_2"];
	$Runtype3 = $_POST["runtype_3"];
	$Runtype4 = $_POST["runtype_4"];

	$PhiX = $_POST["phiX"];
	$SeqLib = $_POST["seqLib"];
	$Leftovers = $_POST["leftovers"];
	$SeqPrim = $_POST["seqPrim"];

	$tubeLay = "tubeTag_";
	$sampleId = "sampleId_";
	$concentration = "concentration_";
	$aveLibIns = "aveLibIns_";
	$indexSeq = "indexSeq_";
	$indexName = "indexName_";
	$ProjectName = "ProjectName_";

	$refgenome = "refgenome_";
	$species = "species_";
	$CellType = "CellType_";
	$IP = "IP_";
	$TOE = "TOE_";

	$tableNum = "";

	//Tabel variable
	$tableArray = array();
	$allTablesArray = array();
	$numTubetags = $_POST["tableTotalSize"];
	$rowlength = $_POST["t1_tableRowSize"];
	$columnlength = $_POST["t1_tableColSize"];
        $bric = ($columnlength <> 7);
	
	$orderNoteID = $_POST["orderNoteID"];
	$orderNoteName = $_POST["orderNoteName"];
	
	//Path to save ordresheets
	$path = "/home/seq/ordernotes";
	//$path = "/home/lh/ordre";
	$filename = $orderNoteName . ".csv";
	// Email specific variable
		
	$mailfileType = "csv";

/*********Variables end**************/

if(isset($load_csv)) {
    load_csv($path,$load_csv.".csv");
    exit();
}

//Openfile	to store the csvfile		- Remember file permission on folder/!
$fh = fopen($path ."/". $filename,"w") or die("can't open file!");//.$path."/".$filename); // only set for debugging!!, to avoid XSS attack
$csv_array = array_merge(required_section(), tube_section());
$csv_content = csv_from_array($csv_array);
//echo $csv_content;			//- for debugging
//Save file
fwrite($fh,$csv_content);
//Close file
fclose($fh);

if(empty($admin_info) && $admin_status){ // don't send an email if admin only edditing
	//don't send mail
	?> <h2> <? echo "New orderNoteName is " . $orderNoteName; ?> </h2> <?
} else{
	//send the email
	if(mail_csv($csv_content)) {
	  $mailto = $LPmail;
	  ?>
	  <h2>Pre-submitted order note <? echo $orderNoteName; ?></h2>

	  Your order is <i>NOT</i> submitted yet. To make sure the email
	  address <? echo xssafe($mailto) ?> is working, you need to reply to the email sent.

	  Follow the instructions in the email to submit the order note to the
	  Sequencing Center for processing.
	  <p>
	  View as CSV file: <a href="orderform.php?csv=<? echo $orderNoteName; ?>">
	  https://dna.ku.dk/orderform/php/orderform.php?csv=<? echo $orderNoteName; ?></a>.

	  <p>
	  Edit the ordernote: <a href="<? echo baseurl() . "?load=" . $orderNoteName; ?>">
	  <? echo baseurl() . "?load=" . $orderNoteName; ?></a>.
	  <?
	} else {
	  ?>
	  <h2>Mail failed!<h2>
	  Sending email failed. Please contact seqcenter@snm.ku.dk to investigate why.
	  <? 
	}
}


function selfurl() {
  $protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != "off") ? "https" : "http";
  return $protocol . "://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
}

function baseurl() {
  return dirname(dirname(selfurl()));
}

function required_section() {
  $orderForm_version = $_POST["orderFormVersion"];
  $date = $_POST["date"];
  $orderNoteID = $_POST["orderNoteID"];
  $orderNoteName = $_POST["orderNoteName"];
  $BillTo_name = $_POST["BillTo_name"];
  $EAN_no = $_POST["EAN_name"];
  $EAN_Fakultet = $_POST["EAN_Fakultet"];
  $EAN_Institut = $_POST["EAN_Institut"];
  $EAN_Afdeling = $_POST["EAN_Afdeling"];
  $CVR_no = $_POST["CVR_no"];
  $CVR_adr1 = $_POST["CVR_adr1"];
  $CVR_adr2 = $_POST["CVR_adr2"];
  $LPname = $_POST["LP-name"];
  $LPmail = $_POST["LP-mail"];
  $LPphone = $_POST["LP-phone"];
  $BPname = $_POST["BP-name"];
  $BPmail = $_POST["BP-mail"];
  $BPphone = $_POST["BP-phone"];
  $PI = $_POST["PI"];
  $PIname = $_POST["PI-name"];
  $PImail = $_POST["PI-email"];
  $Addinfo = $_POST["Addinfo"];
  
  //Runtype variables
  $runtype25PEMiSeq = $_POST["runtype25PEMiSeq"];
  
  $runtype50SR = $_POST["runtype50SR"];
  $runtype50PE = $_POST["runtype50PE"];
  $runtype50SRRapid = $_POST["runtype50SRRapid"];
  $runtype50PERapid = $_POST["runtype50PERapid"];
  $runtype50SRMiSeq = $_POST["runtype50SRMiSeq"];
  
  $runtype75PE = $_POST["runtype75PE"];
  
  $runtype100SR = $_POST["runtype100SR"];
  $runtype100PE = $_POST["runtype100PE"];
  $runtype100SRRapid = $_POST["runtype100SRRapid"];
  $runtype100PERapid = $_POST["runtype100PERapid"];
  
  $runtype150SRRapid = $_POST["runtype150SRRapid"];
  $runtype150PERapid = $_POST["runtype150PERapid"];
  $runtype150PEMiSeq = $_POST["runtype150PEMiSeq"];
  
  $runtype250SRMiSeq = $_POST["runtype250SRMiSeq"];
  $runtype250PEMiSeq = $_POST["runtype250PEMiSeq"];
  
  $PhiX = $_POST["phiX"];
  $SeqLib = $_POST["seqLib"];
  $Leftovers = $_POST["leftovers"];
  $ConcentrationUnit = $_POST["concentration_unit"];
  $SeqPrim = $_POST["seqPrim"];
  
  $tubeLay = "tubeTag_";
  $sampleId = "sampleId_";
  $concentration = "concentration_";
  $aveLibIns = "aveLibIns_";
  $indexSeq = "indexSeq_";
  $indexName = "indexName_";
  $ProjectName = "ProjectName_";

  $br = array("------------------------","-----------------------","--------------");
  //wrapping Additional info, to fit into one page
  $AddinfoWrapped = wordwrap($Addinfo, 70);	// split text after 70 chars

  
  $a = array(
 	     array(""," ============"," =========="),
	     array("ORDER",$orderNoteName),
 	     array(""," ============"," =========="),
	     array("OrderForm version:", $orderForm_version),
	     array("Date:", $date),
	     $br,
	     array("| Lab Person"),
	     array("| Lab Name:", $LPname),
	     array("| Lab Mail:", $LPmail),
	     array("| Lab Phone:", $LPphone),
	     $br,
	     array("| Bioinformatician"),
	     array("| Bio Name:",$BPname),
	     array("| Bio Mail:",$BPmail),
	     array("| Bio Phone:", $BPphone),
	     $br,
	     array("| PI"),
	     array("| PI Name:", $PIname),
	     array("| PI Mail:", $PImail),
	     array("| PI Phone:", $PI),
	     $br,
	     array("| Bill to:", $BillTo_name),
	     array("|"),
	     array("| EAN no.:", $EAN_no),
	     array("| Fakultet:", $EAN_Fakultet),
	     array("| Institut:", $EAN_Institut),
	     array("| Department:", $EAN_Afdeling),
	     array("|"),
	     array("| CVR no:", $CVR_no),
	     array("| Address:", $CVR_adr1),
	     array("| Address2:", $CVR_adr2),
	     $br,
	     array("Additional info:"),
	     array($AddinfoWrapped),
	     array(),
	     array("Cycles", "Single-Read"		, "Paired-End" 			,"SR_Rapid"				,"PE_Rapid"				,"SR_MiSeq"				,"PE_MiSeq"),
	     array("25",""					,""					,""						,""						,""						,"_".$runtype25PEMiSeq."_"),
	     array("50",  "_".$runtype50SR."_"	, "_".$runtype50PE."_"	,"_".$runtype50SRRapid."_"	,"_".$runtype50PERapid."_"	,"_".$runtype50SRMiSeq."_"	,""),
	     array("75",  ""					, "_".$runtype75PE."_"	,""						,""						,""						,""),
	     array("100", "_".$runtype100SR."_"	, "_".$runtype100PE."_"	,"_".$runtype100SRRapid."_"	,"_".$runtype100PERapid."_"	,""						,""),
	     array("150",""					,""					,"_".$runtype150SRRapid."_"	,"_".$runtype150PERapid."_"	,""						,"_".$runtype150PEMiSeq."_"),
	     array("250",""					,""					,""						,""						,"_".$runtype250SRMiSeq."_"	,"_".$runtype250PEMiSeq."_"),
	     $br,
	     array("phiX required?",$PhiX),
	     array("Libraries built?", $SeqLib),
	     $br,
	     array("Pick up leftover?", $Leftovers),
	     array("Custom seq. primer?", $SeqPrim),
	     );
  return $a;
}

function tube_section() {
  // Return array of array of values for the tube section
  $tubeLay = "tubeTag_";
  $sampleId = "sampleId_";
  $concentration = "concentration_";
  $aveLibIns = "aveLibIns_";
  $indexSeq = "indexSeq_";
  $indexName = "indexName_";
  $ProjectName = "ProjectName_";
  $refgenome = "refgenome_";
  $species = "species_";
  $CellType = "CellType_";
  $IP = "IP_";
  $TOE = "TOE_";
  $numTubetags = $_POST["tableTotalSize"];
  $rowlength = $_POST["t1_tableRowSize"];
  $columnlength = $_POST["t1_tableColSize"];
  $bric = ($columnlength <> 7);

  $a[] = array(" ==============="," ============"," ==========");
  // create header line
  $ConcentrationUnit = $_POST["concentration_unit"];
  if($bric) {
    $a[] = array($_POST["t1_" . $tubeLay . "0"], 
		 $_POST["t1_" . $sampleId . "0"],
		 $_POST["t1_" . $concentration . "0"]."(".$ConcentrationUnit.")",
		 $_POST["t1_" . $aveLibIns . "0"],
		 $_POST["t1_" . $indexName . "0"],
		 $_POST["t1_" . $indexSeq . "0"],
		 $_POST["t1_" . $ProjectName ."0"],
		 $_POST["t1_" . $refgenome ."0"],
		 $_POST["t1_" . $species ."0"],
		 $_POST["t1_" . $CellType ."0"],
		 $_POST["t1_" . $IP ."0"],
		 $_POST["t1_" . $TOE ."0"],
		 );
  } else {
    $a[] = array($_POST["t1_" . $tubeLay . "0"], 
		 $_POST["t1_" . $sampleId . "0"],
		 $_POST["t1_" . $concentration . "0"]."(".$ConcentrationUnit.")",
		 $_POST["t1_" . $aveLibIns . "0"],
		 $_POST["t1_" . $indexName . "0"],
		 $_POST["t1_" . $indexSeq . "0"],
		 $_POST["t1_" . $ProjectName ."0"],
		 );
  }

  for($j = 1; $j < $numTubetags+1;$j++){
      for($i = 1; $i < $rowlength;$i++){
	// fulltubetag = PRI_XYZV
	$fulltubetag = $_POST["PIShort"] . "_" . $_POST["t" . $j . "_" . $tubeLay . $i];
	// sampleid_val = PRI_XYZV_Sampleid
	$sampleid_val = $_POST["t" . $j . "_" . $sampleId . $i];
	$fullsampleid = $_POST["PIShort"] . "_" . $_POST["t" . $j . "_" . $tubeLay . $i] . "_" . $sampleid_val;
	$concentration_val = $_POST["t" . $j . "_" . $concentration . $i];
	$avgLibIns_val = $_POST["t" . $j . "_" . $aveLibIns . $i];
	$indexName_val = $_POST["t" . $j . "_" . $indexName . $i];
	$indexSeq_val = $_POST["t" . $j . "_" . $indexSeq . $i];
	$projectName_val = $_POST["t" . $j . "_" . $ProjectName . $i];

	$refgenome_val = $_POST["t" . $j . "_" . $refgenome . $i];
	$species_val = $_POST["t" . $j . "_" . $species . $i];
	$CellType_val = $_POST["t" . $j . "_" . $CellType . $i];
	$IP_val = $_POST["t" . $j . "_" . $IP . $i];
	$TOE_val = $_POST["t" . $j . "_" . $TOE . $i];

	if($sampleid_val != "") {
	  // check for empty rows. by checking for empty sampleID
	  if($bric) {
	    // - check if BRIC table is set. - a lot of overhead here, change to nicer code - (but working)
	    $a[] = array($fulltubetag, $fullsampleid, $concentration_val, $avgLibIns_val, 
				$indexName_val, $indexSeq_val,
				$projectName_val, $refgenome_val, $species_val, $CellType_val, $IP_val, $TOE_val);
	  } else {
	    $a[] = array($fulltubetag, $fullsampleid, $concentration_val, $avgLibIns_val, $indexName_val, $indexSeq_val,
				$projectName_val);
	  }
	} else {
	  break;
	}
      }
      $a[] = array("");
  }
  return $a;
}

function csv_from_array($a) {
  // return string with ';' separated values (That is the default delimiter in Microsoft Excel)
  // Newline after each line
  $out = "";
  foreach ($a as $arr) {
    $out.=join(";",$arr)."\n";
  }
  return $out;
}

function mail_csv($csvFile) {
  $BPmail = $_POST["BP-mail"];
  $PImail = $_POST["PI-email"];
  $LPmail = $_POST["LP-mail"];
  $orderNoteID = $_POST["orderNoteID"];
  $orderNoteName = $_POST["orderNoteName"];
  $admin_info = $_POST["adminInfo"];

  $mailto = $LPmail;
  $mailfrom = "seqcenter@snm.ku.dk";
  $mailsubject = 'Please confirm: Your sequencing order ' . $orderNoteName;
  $orderurl = "https://dna.ku.dk/orderform/?load=". $orderNoteName;
  $csvurl = "https://dna.ku.dk/orderform/php/orderform.php?csv=". $orderNoteName;
  //Send mail
  $ReplyTo = "The Sequencing Center <seqcenter@snm.ku.dk>, $BPmail, ".str_replace(" ","",$PImail);
  //create a boundary string. It must be unique
  //so we use the MD5 algorithm to generate a random hash
  $random_hash = md5(date('r', time()));
  //define the headers we want passed. Note that they are separated with \r\n
  $headers = "From: " . $mailfrom . "\r\nReply-To: " . $ReplyTo;
  //add boundary string and mime type specification
  $headers .= "\r\nContent-Type: multipart/mixed; boundary=\"PHP-mixed-".$random_hash."\"";
  //read the file string, encode it with MIME base64, and split it into smaller chunks
  $attachment = chunk_split(base64_encode($csvFile));
  $mailfileType = "csv";
  $filename = $orderNoteName . ".csv";

  $mailbody = 
    "!!! The order will NOT be processed unless you reply to this email !!!<br/><br/>" .
    "Find your sequencing order " . $orderNoteName . " at: <a href=$csvurl>$csvurl</a>.<br/><br/>" .
    "Please do not submit the order without checking that the system has indeed registered all your data correctly. If you need to change the order you need to make a new order.<br/><br/>".
    "You can create a new order based on this order by going to: <a href=$orderurl>$orderurl</a>.<br/><br/>" .
    "When you have reviewed the order please reply to this email that you want the order processed.<br/><br/>" .
    "When referring to this order in the future, please refer to " .
    $orderNoteID . " or " . $orderNoteName . ".<br/><br/>" . $admin_info . "<br/><br/>" .    

    "Regards,<br><br>" .
    "The Sequencing Center";
  
  //define the body of the message.
  $message = "--PHP-mixed-" . $random_hash . "\r\n" .
    "Content-Type: multipart/alternative; boundary=\"PHP-alt-" . $random_hash . "\"" . "\r\n\r\n" .
    "--PHP-alt-" . $random_hash . "\r\n" .
    "Content-Type: text/html; charset=\"iso-8859-1\"" . "\r\n" .
    "Content-Transfer-Encoding: 7bit" . "\r\n\r\n" .
    $mailbody .  "\r\n\r\n" .
    "--PHP-alt-" . $random_hash . "--" .  "\r\n\r\n" .
    // Send a link to the csv-file instead
    "--PHP-mixed-" . $random_hash .  "\r\n" .
    //    "Content-Type: application/". $mailfileType ."; name=\"" . $filename  ."\"" . "\r\n" .
    //    "Content-Transfer-Encoding: base64" . "\r\n" .
    //    "Content-Disposition: attachment \r\n\r\n" . $attachment . 
    "--PHP-mixed-" . $random_hash . "--";
  $mail_sent_status = @mail($mailto, $mailsubject, $message, $headers);
  return $mail_sent_status;
}

function load_csv($path,$file) {
    // Replace weird characters in $file with _
    $file = preg_replace('[^-_A-Za-z/0-9.]',"_",$file);
    // Outputting csv file
    header('Content-Type: text/csv');
    header('Content-Disposition: inline; filename="'.$file."\"; filename*=UTF-8''".$file);
    $pathfile = $path."/".$file;
    $fh = fopen($pathfile,"r") or die("can't open file ".$pathfile); 
    print fread($fh,filesize($pathfile));
    fclose($fh);
}

//xss mitigation functions
function xssafe($data,$encoding='UTF-8') {
	return htmlspecialchars($data,ENT_QUOTES | ENT_HTML401,$encoding);
}

?>
