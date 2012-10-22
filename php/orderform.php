<?php
//	print(" das " + $_POST[1] + "\n");
//	var_dump($_POST);


/*********variables**************/
	// wrap text after charter
	$wrapSize = 70;

	//Get variables from POST
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
	
	$orderNoteID = $_POST["orderNoteID"];
	
	//Path to save ordresheets
	//$path = "/home/lh/ordre/";
	$path = "/var/tmp/";
	$filename = $orderNoteID . ".csv";
//	str_replace(" ","_",$BillTo_name) ."_" . str_replace("/","-",$date) . "_" . rand(1000,10000) . ".csv";
	
		// Email specific variable
	$mailto = $LPmail;//"lh@binf.ku.dk";// $LPmail . ";" . $BPmail . ";" str_replace(" ","",$PImail) . ";seqcenter@snm.ku.dk"; 
	$mailfrom = "seqcenter@snm.ku.dk";
	$mailsubject = 'Your sequencing order ' . $orderNoteID;
	$mailbody = 	"Attached is your sequencing order " . $orderNoteID . ". Please review it. If you need to change it you need to make a new order. You get create a new order based on this order by going to: http://dna.ku.dk/orderform/?load=". $orderNoteID . "<br><br>" .
				"When you have reviewed the order please reply to this email that you want the order processed.<br><br>" .
				"Regards,<br><br>" .
				"The Sequencing Center";
	$mailfileType = "csv";
	$ReplyTo = "The Sequencing Center <seqcenter@snm.ku.dk>, $BPmail";
	
/*********Variables end**************/

//wrapping Additional info, to fit into one page
	$strSplitted = str_split($Addinfo,$wrapSize);	// split text after wrapSize char
	$AddinfoWrapped = "";
	for($i = 0; $i < sizeof($strSplitted);$i++){
			$AddinfoWrapped .= $strSplitted[$i] . "\n";	// insert line break after each split
	}

//Openfile	to store the csvfile		- Remember file permission on folder/!
	$fs = fopen($path . $filename,"w") or die("can't open file"); 
	$csvFile = "";

//Create "header" into file (change this to look "nicer")
	$csvFile = 	"\"OrderForm version\",\"1.0\",,\n" . 
				",,,,,,\n" .
				"\"Date:\",\"" . $date . "\",,,,\n" .
				",,,,,,\n" .
				"\"Lab Person\",,,,,\n" .
				"\"Name:\",\"" . $LPname .  "\",,,,\n" .
				"\"Mail:\",\"" . $LPmail . "\",,,,\n" .
				"\"Phone:\",\"" . $LPphone . "\",,,,\n" .
				",,,,,,\n" .
				"\"Bioinformatics Person\",,,,,,\n" .
				"\"Name:\",\"" . $BPname . "\",,,,\n" .
				"\"Mail:\",\"" . $BPmail . "\",\n" .
				"\"Phone:\",\"" . $BPphone . "\",\n" .
				",,,,,,\n" .
				"PI,\n" .
				"\"Name:\",\"" . $PIname . "\",\n" .
				"\"Mail:\",\"" . $PImail . "\",\n" .
				//			"\"Phone:\",\"" . $PI . "\",\n" .
				",,,,,,\n" .
				"\"Bill to\",\"". $BillTo_name . "\",\n" .
				",,,,,,\n" .
				"\"EAN no.\",\"". $EAN_no . "\",\n" .
				"\"Fakultet.\",\"". $EAN_Fakultet . "\",\n" .
				"\"Institut\",\"". $EAN_Institut . "\",\n" .
				",,,,,,\n" .
				"\"CVR no\",\"". $CVR_no ."\",,\n" .
				"\"Address\",\"". $CVR_adr ."\",,\n" .
				",,,,,,\n" .
				"\"Additional information for sequencing center\",,,\n" .
				"\"" . $AddinfoWrapped . "\",,\n" .
				",,,,,,\n" .
				"\"Number of Cycles\",\"Single-Read\",\"Paired-End\",,\n";
	$csvFile .=	"\"50\",\"" . $Runtype0 . "\",\"" . $Runtype1 . "\",,,\n" .
				"\"75\",,\"" . $Runtype2 . "\",,,\n" .
				"\"100\",\"" . $Runtype3 . "\",\"" . $Runtype4 . "\",,,\n" .
				",,,,,,\n" .
				"\"Is addition of phiX required? (low complexity sample)\",\"" . $PhiX ."\",,\n\"Are the sequencing libraries already built?\",\"" . $SeqLib . "\",,\n" .
				",,,,,,\n" .
				"\"Do you want to pick up leftover sample? (if any)\",\"" . $Leftovers ."\",,\n\"Is usage of custom sequencing primer required?\",\"" . $SeqPrim . "\",,\n" .
				",,,,,,\n";

	//echo $csvFile;echo "<br>";
				
		//Indsæt i column x - opret ved hjælp af et loop?? eller gør det statisk ???????

//Create table into file
	// create header line
	if($columnlength == 7){
				$csvFile .= "\"" . $_POST["t1_" . $tubeLay . "0"] . "\",";
				$csvFile .= "\"" . $_POST["t1_" . $sampleId . "0"]  . "\",";
				$csvFile .= "\"" . $_POST["t1_" . $concentration . "0"]  . "\",";
				$csvFile .= "\"" . $_POST["t1_" . $aveLibIns . "0"]  . "\",";
				$csvFile .= "\"" . $_POST["t1_" . $indexSeq . "0"]  . "\",";
				$csvFile .= "\"" . $_POST["t1_" . $ProjectName ."0"]  . "\",\n";
	} else {
				$csvFile .= "\"" . $_POST["t1_" . $tubeLay . "0"] . "\",";
				$csvFile .= "\"" . $_POST["t1_" . $sampleId . "0"]  . "\",";
				$csvFile .= "\"" . $_POST["t1_" . $concentration . "0"]  . "\",";
				$csvFile .= "\"" . $_POST["t1_" . $aveLibIns . "0"]  . "\",";
				$csvFile .= "\"" . $_POST["t1_" . $indexSeq . "0"]  . "\",";
				$csvFile .= "\"" . $_POST["t1_" . $ProjectName ."0"]  . "\",";
				$csvFile .= "\"" . $_POST["t1_" . $refgenome ."0"]  . "\",";
				$csvFile .= "\"" . $_POST["t1_" . $species ."0"]  . "\",";
				$csvFile .= "\"" . $_POST["t1_" . $CellType ."0"]  . "\",";
				$csvFile .= "\"" . $_POST["t1_" . $IP ."0"]  . "\",";
				$csvFile .= "\"" . $_POST["t1_" . $TOE ."0"]  . "\",\n";
	}
	
	
	
	// create all rows
	for($j = 1; $j < $numTubetags+1;$j++){
		if($columnlength == 7){		// - check if BRIC table is set. - a lot of overhead here, change to nicer code - (but working)
			for($i = 1; $i < $rowlength;$i++){
			$tmp = $_POST["t" . $j . "_" . $sampleId . $i];

			if($tmp != "") {				// check for empty rows. by checking for null in sampleID
				$csvFile .= "\"" . $_POST["PIShort"] . "_" . $_POST["t" . $j . "_" . $tubeLay . $i] . "\",";
				$csvFile .= "\"" . $tmp  . "\",";
				$csvFile .= "\"" . $_POST["t" . $j . "_" . $concentration . $i]  . "\",";
				$csvFile .= "\"" . $_POST["t" . $j . "_" . $aveLibIns . $i]  . "\",";
				$csvFile .= "\"" . $_POST["t" . $j . "_" . $indexSeq . $i]  . "\",";
				$csvFile .= "\"" . $_POST["t" . $j . "_" . $ProjectName . $i]  . "\",\n";
				} else
					break;
			}
		} else {
			for($i = 1 ; $i < $rowlength;$i++){
			$tmp = $_POST["t" . $j . "_" . $sampleId . $i];
				if($tmp != "") {				// check for empty rows. by checking for null in sampleID
					$csvFile .= "\"" . $_POST["PIShort"] . "_" . $_POST["t" . $j . "_" . $tubeLay . $i] . "\",";
					$csvFile .= "\"" . $tmp  . "\",";
					$csvFile .= "\"" . $_POST["t" . $j . "_" . $concentration . $i]  . "\",";
					$csvFile .= "\"" . $_POST["t" . $j . "_" . $aveLibIns . $i]  . "\",";
					$csvFile .= "\"" . $_POST["t" . $j . "_" . $indexSeq . $i]  . "\",";
					$csvFile .= "\"" . $_POST["t" . $j . "_" . $ProjectName . $i]  . "\",";
					$csvFile .= "\"" . $_POST["t" . $j . "_" . $refgenome . $i] . "\",";
					$csvFile .= "\"" . $_POST["t" . $j . "_" . $species . $i] . "\",";
					$csvFile .= "\"" . $_POST["t" . $j . "_" . $CellType . $i] . "\",";
					$csvFile .= "\"" . $_POST["t" . $j . "_" . $IP . $i] . "\",";
					$csvFile .= "\"" . $_POST["t" . $j . "_" . $TOE . $i] . "\",\n"; // \n
				} else
					break;
				/*$csvFile .= "\"" . $_POST["t" . $j . "_" . $tubeLay . $i] . "\",";
				$csvFile .= "\"" . $_POST["t" . $j . "_" . $sampleId . $i] . "\",";
				$csvFile .= "\"" . $_POST["t" . $j . "_" . $concentration . $i] . "\",";
				$csvFile .= "\"" . $_POST["t" . $j . "_" . $aveLibIns . $i] . "\",";
				$csvFile .= "\"" . $_POST["t" . $j . "_" . $indexSeq . $i] . "\",";
				$csvFile .= "\"" . $_POST["t" . $j . "_" . $ProjectName . $i] . "\",";
				$csvFile .= "\"" . $_POST["t" . $j . "_" . $refgenome . $i] . "\",";
				$csvFile .= "\"" . $_POST["t" . $j . "_" . $species . $i] . "\",";
				$csvFile .= "\"" . $_POST["t" . $j . "_" . $CellType . $i] . "\",";
				$csvFile .= "\"" . $_POST["t" . $j . "_" . $IP . $i] . "\",";
				$csvFile .= "\"" . $_POST["t" . $j . "_" . $TOE . $i] . "\",\n";*/
			}
		}
	}
	
//Save file
	fwrite($fs,$csvFile);

//Send mail
	//create a boundary string. It must be unique
	//so we use the MD5 algorithm to generate a random hash
	$random_hash = md5(date('r', time()));
	//define the headers we want passed. Note that they are separated with \r\n
	$headers = "From: " . $mailfrom . "\r\nReply-To: " . $ReplyTo;
	//add boundary string and mime type specification
	$headers .= "\r\nContent-Type: multipart/mixed; boundary=\"PHP-mixed-".$random_hash."\"";
	//read the file string, encode it with MIME base64, and split it into smaller chunks
	$attachment = chunk_split(base64_encode($csvFile));
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

	//send the email
		$mail_sent = @mail( $mailto, $mailsubject, $message, $headers );

//if the message is sent successfully print "Mail sent". Otherwise print "Mail failed"
	echo $mail_sent ? "<h2>Mail sent.</h2>" : "<h2>Mail failed!<h2>"; 
	echo "Edit the ordernote: <a href=\"".
	"http://dna.ku.dk/orderform/?load=". $orderNoteID . 
	"\">http://dna.ku.dk/orderform/?load=". $orderNoteID . "</a>.";

//Close file
	fclose($fs);

	//goTo another page!
		//header("Location thankyou.html");
	//	echo "<br>HELLO = " . $_POST["orderNoteID"];
		
		
?>
