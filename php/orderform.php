<?php
//	print(" das " + $_POST[1] + "\n");
//	var_dump($_POST);


/*********variables**************/
	//Get variables from POST
	$load_csv = $_GET["csv"];

	$date = $_POST["date"];
	$BillTo_name = $_POST["BillTo_name"];
	$EAN_no = $_POST["EAN_name"];
	$EAN_Fakultet = $_POST["EAN_Fakultet"];
	$EAN_Institut = $_POST["EAN_Institut"];
	$EAN_Afdeling = $_POST["EAN_Afdeling"];
	$CVR_no = $_POST["CVR_no"];
	$CVR_adr = $_POST["CVR_adr"];
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
        $bric = ($columnlength == 7);
	
	$orderNoteID = $_POST["orderNoteID"];
	
	//Path to save ordresheets
	$path = "/home/seq/ordernotes";
	$filename = $orderNoteID . ".csv";
	// Email specific variable
		
	$mailfileType = "csv";

/*********Variables end**************/

if(isset($load_csv)) {
    load_csv($path,$load_csv.".csv");
    exit();
}

//Openfile	to store the csvfile		- Remember file permission on folder/!
$fh = fopen($path ."/". $filename,"w") or die("can't open file ".$path."/".$filename); 
$csv_array = array_merge(required_section(), tube_section());
$csv_content = csv_from_array($csv_array);
//Save file
fwrite($fh,$csv_content);
//Close file
fclose($fh);

//send the email
if(mail_csv($csv_content)) {
  $mailto = $LPmail;
  ?>
  <h2>Mail sent to <? echo $mailto ?> with ordernote <? echo $orderNoteID; ?>.</h2>
  Follow the instructions in the email to submit the ordernote to the sequencing center for processing.
  <p>
  View as CSV file: <a href="https://dna.ku.dk/orderform/php/orderform?csv=<? echo $orderNoteID; ?>">
  https://dna.ku.dk/orderform/php/orderform?csv=<? echo $orderNoteID; ?></a>.

  <p>
  <!--
	Enable this when ?load works
        Edit the ordernote: <a href="https://dna.ku.dk/orderform/?load=<? echo $orderNoteID; ?>">
	https://dna.ku.dk/orderform/?load=<? echo $orderNoteID; ?></a>.
  -->
  <?
} else {
  ?>
  <h2>Mail failed!<h2>
  Sending email failed. Please contact seqcenter@snm.ku.dk to investigate why.
  <? 
}


function required_section() {
  $date = $_POST["date"];
  $BillTo_name = $_POST["BillTo_name"];
  $EAN_no = $_POST["EAN_name"];
  $EAN_Fakultet = $_POST["EAN_Fakultet"];
  $EAN_Institut = $_POST["EAN_Institut"];
  $EAN_Afdeling = $_POST["EAN_Afdeling"];
  $CVR_no = $_POST["CVR_no"];
  $CVR_adr = $_POST["CVR_adr"];
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
  // wrap text after character
  $wrapSize = 70;

  $strSplitted = str_split($Addinfo,$wrapSize);	// split text after wrapSize char
  $AddinfoWrapped = "";
  for($i = 0; $i < sizeof($strSplitted);$i++){
      $AddinfoWrapped .= $strSplitted[$i] . "\n";	// insert line break after each split
  }

  
  $a = array(
	     array("OrderForm version:", "1.0"),
	     array("Date:", $date),
	     $br,
	     array("| Lab Person"),
	     array("| Name:", $LPname),
	     array("| Mail:", $LPmail),
	     array("| Phone:", $LPphone),
	     $br,
	     array("| Bioinformatician"),
	     array("| Name:",$BPname),
	     array("| Mail:",$BPmail),
	     array("| Phone:", $BPphone),
	     $br,
	     array("| PI"),
	     array("| Name:", $PIname),
	     array("| Mail:", $PImail),
	     array("| Phone:", $PI),
	     $br,
	     array("| Bill to:", $BillTo_name),
	     array("|"),
	     array("| EAN no.:", $EAN_no),
	     array("| Fakultet:", $EAN_Fakultet),
	     array("| Institut:", $EAN_Institut),
	     array("|"),
	     array("| CVR no:", $CVR_no),
	     array("| Address:", $CVR_adr),
	     $br,
	     array("Additional info:",$AddinfoWrapped),
	     array(),
	     array("Cycles", "Single-Read", "Paired-End"),
	     array("50",               $Runtype0,     $Runtype1),
	     array("75",               "",            $Runtype2),
	     array("100",              $Runtype3,     $Runtype4),
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
  $bric = ($columnlength == 7);

  $a[] = array(" ==============="," ============"," ==========");
  // create header line
  $ConcentrationUnit = $_POST["concentration_unit"];
  if($bric) {
    $a[] = array($_POST["t1_" . $tubeLay . "0"], 
		 $_POST["t1_" . $sampleId . "0"],
		 $_POST["t1_" . $concentration . "0"]."(".$ConcentrationUnit.")",
		 $_POST["t1_" . $aveLibIns . "0"],
		 $_POST["t1_" . $indexSeq . "0"],
		 $_POST["t1_" . $indexName . "0"],
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
		 $_POST["t1_" . $indexSeq . "0"],
		 $_POST["t1_" . $indexName . "0"],
		 $_POST["t1_" . $ProjectName ."0"],
		 );
  }

  for($j = 1; $j < $numTubetags+1;$j++){
      for($i = 1; $i < $rowlength;$i++){
	// fulltubetag = PRI_XYZV
	$fulltubetag = $_POST["PIShort"] . "_" . $_POST["t" . $j . "_" . $tubeLay . $i];
	$sampleid_val = $_POST["t" . $j . "_" . $sampleId . $i];
	$concentration_val = $_POST["t" . $j . "_" . $concentration . $i];
	$avgLibIns_val = $_POST["t" . $j . "_" . $aveLibIns . $i];
	$indexSeq_val = $_POST["t" . $j . "_" . $indexSeq . $i];
	$projectName_val = $_POST["t" . $j . "_" . $ProjectName . $i];

	$refgenome_val = $_POST["t" . $j . "_" . $refgenome . $i];
	$species_val = $_POST["t" . $j . "_" . $species . $i];
	$CellType_val = $_POST["t" . $j . "_" . $CellType . $i];
	$IP_val = $_POST["t" . $j . "_" . $IP . $i];
	$TOE_val = $_POST["t" . $j . "_" . $TOE . $i];

	if($sampleid_val != "") {
	  // check for empty rows. by checking for null in sampleID
	  if($bric) {
	    // - check if BRIC table is set. - a lot of overhead here, change to nicer code - (but working)
	    $a[] = array($fulltubetag, $sampleid_val, $concentration_val, $avgLibIns_val, $indexSeq_val,
			  $projectName_val, $refgenome_val, $species_val, $CellType_val, $IP_val, $TOE_val);
	  } else {
	    $a[] = array($fulltubetag, $sampleid_val, $concentration_val, $avgLibIns_val, $indexSeq_val);
	  }
	} else {
	  break;
	}
      }
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

  $mailto = $LPmail;
  $mailfrom = "seqcenter@snm.ku.dk";
  $mailsubject = 'Your sequencing order ' . $orderNoteID;
  $orderurl = "https://dna.ku.dk/orderform/?load=". $orderNoteID;
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
  $filename = $orderNoteID . ".csv";

  $mailbody = "Attached is your sequencing order " . $orderNoteID . ". ".
    "Please review it. If you need to change it you need to make a new order. ".
    // Enable when loading works:
    //	"You get create a new order based on this order by going to: <a href=$orderurl>$orderurl</a>.<br/><br/>" .
    "When you have reviewed the order please reply to this email that you want the order processed.<br/><br/>" .
    "Do NOT change the attached csv-file<br/><br/>" .
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
    "--PHP-mixed-" . $random_hash .  "\r\n" .
    "Content-Type: application/". $mailfileType ."; name=\"" . $filename  ."\"" . "\r\n" .
    "Content-Transfer-Encoding: base64" . "\r\n" .
    "Content-Disposition: attachment \r\n\r\n" . $attachment . 
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


?>
