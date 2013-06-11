function loadOrder(file){
        var url = "http://people.binf.ku.dk/lh/test/";
        var protocol = window.location.protocol
	//var url = protocol + "//dna.ku.dk/orderform/php/orderform.php?csv=";

	var filnavn = file;
	var end = true;
	var version = 1;

	// Get csvfil
	var httpOutput = null;
	httpOutput = new XMLHttpRequest();
	httpOutput.open( "GET",  url + filnavn, false );
	httpOutput.send( null );
	var csvData = httpOutput.responseText;
	
//	try{
	// change csv fil into 2d array
		var dataArray = $.csv.toArrays(csvData,{
							// delimiter:"'", // sets a custom value delimiter character
							separator: ';' // sets a custom field separator character
							});
				
	// looping through array and insert to the right input boxes.						
	for(var i = 0; i < dataArray.length;i++){
		if(end){
			switch (dataArray[i][0])
			{
		//		case "ORDER":
				//	alert(dataArray[i][1]);
		//			break;
				case "OrderForm version:":
					version = dataArray[i][1];
					break;
				case "Date:":
					$("#datepicker").val(dataArray[i][1]);
					break;
				case "| Lab Name:":
					$("#LP-name").val(dataArray[i][1]);
					break;
				case "| Lab Mail:":
					$('input[name="LP-mail"]').val(dataArray[i][1]);
					break;
				case "| Lab Phone:":
					$('input[name="LP-phone"]').val(dataArray[i][1]);
					break;
				case "| Bio Name:":
					$('input[name="BP-name"]').val(dataArray[i][1]);
					break;
				case "| Bio Mail:":
					$('input[name="BP-mail"]').val(dataArray[i][1]);
					break;
				case "| Bio Phone:":
					$('input[name="BP-phone"]').val(dataArray[i][1]);
					break;	
				case "| PI Name:":
					$("#PI").val(dataArray[i][1]);
					try{
					PIInsert4Load(dataArray[i][1]);
					} catch (error){
						$("#PI").val("other");
						$('.PI-field').show();
						$("#PI-name").val(dataArray[i][1]);
					}
					break;
				case "| PI Mail:":
					$("#PI-email").val(dataArray[i][1]);
					break;
				case "| Bill to:":
					$("#BillTo_name").val(dataArray[i][1]);
					break;
				case "| EAN no.:":
					$("#EAN_No_id").val(dataArray[i][1]);
					break;
				case "| Fakultet:":
					$("#EAN_Fakultet_id").val(dataArray[i][1]);
					break;
				case "| Institut:":
					$("#EAN_Institut_id").val(dataArray[i][1]);
					break;
				case "| Department:":
					$("#EAN_Afdeling_id").val(dataArray[i][1]);
					break;
				case "| CVR no:":
					$("#CVR_no_id").val(dataArray[i][1]);
					break;
				case "| Address:":
					$("#CVR_adr1_id").val(dataArray[i][1]);
					break;					
				case "| Address2:":
					$("#CVR_adr2_id").val(dataArray[i][1]);
					break;
				case "Additional info:":				// handles if the text is wrapped
					var j = i;
					while(dataArray[j][0] != "Cycles"){
						j++;
					}
					var lines = j-i;
					
					var tmp = "";
					for(var z = 1; z < lines;z++){		// start from one because we don't want to include "Additional info:".
						tmp += dataArray[i+z][0] + " ";
					}

					$("#Addinfo").val(tmp);
					break;
				case "25":
					if(dataArray[i][6] != "__")
						$("#runtype25PEMiSeq").val(dataArray[i][6].replace(/_/g,""));
					break;
				case "50":
					if(dataArray[i][1] != "__")
						$("#runtype50SR").val(dataArray[i][1].replace(/_/g,""));
					else if(dataArray[i][2] != "__")
						$("#runtype50PE").val(dataArray[i][2].replace(/_/g,""));
					else if(dataArray[i][3] != "__"){
						if(!emptyString(dataArray[i][3]))
							$("#runtype50SRRapid").val(dataArray[i][3].replace(/_/g,""));
						else
							break;
					}else if(dataArray[i][4] != "__")
						$("#runtype50PERapid").val(dataArray[i][4].replace(/_/g,""));
					else if(dataArray[i][5] != "__")
						$("#runtype50SRMiSeq").val(dataArray[i][5].replace(/_/g,""));
					break;
				case "75":
					if(dataArray[i][2] != "__")
						$("#runtype75PE").val(dataArray[i][2].replace(/_/g,""));
					break;
				case "100":
					if(dataArray[i][1] != "__")
						$("#runtype100SR").val(dataArray[i][1].replace(/_/g,""));
					else if(dataArray[i][2] != "__")
						$("#runtype100PE").val(dataArray[i][2].replace(/_/g,""));
					else if(dataArray[i][3] != "__"){
						if(!emptyString(dataArray[i][3]))
							$("#runtype100SRRapid").val(dataArray[i][3].replace(/_/g,""));
						else
							break;
					}else if(dataArray[i][4] != "__")
						$("#runtype100PERapid").val(dataArray[i][4].replace(/_/g,""));
					break;
				case "150":
					if(dataArray[i][3] != "__")
						$("#runtype150SRRapid").val(dataArray[i][3].replace(/_/g,""));
					else if(dataArray[i][4] != "__")
						$("#runtype150PERapid").val(dataArray[i][4].replace(/_/g,""));
					else if(dataArray[i][6] != "__")
						$("#runtype150PEMiSeq").val(dataArray[i][6].replace(/_/g,""));
					break;
				case "250":
					if(dataArray[i][5] != "__")
						$("#runtype250SRMiSeq").val(dataArray[i][5].replace(/_/g,""));
					else if(dataArray[i][6] != "__")
						$("#runtype250PEMiSeq").val(dataArray[i][6].replace(/_/g,""));
					break;
				case "phiX required?":
					if(dataArray[i][1] == "no"){
						$('#phixNo').attr('checked', true);
					} else if(dataArray[i][1] == "yes"){
						$('#phixYes').attr('checked', true);
					}
					break;
				case "Libraries built?":
					if(dataArray[i][1] == "no"){
						$('#seqLibNo').attr('checked', true);
					} else if(dataArray[i][1] == "yes"){
						$('#seqLibYes').attr('checked', true);
					}
					break;
				case "Pick up leftover?":
					if(dataArray[i][1] == "no"){
						$('#leftoversNo').attr('checked', true);
					} else if(dataArray[i][1] == "yes"){
						$('#leftoversYes').attr('checked', true);
					}
					break;
				case "Custom seq. primer?":
					if(dataArray[i][1] == "no"){
						$('#seqPrimNo').attr('checked', true);
					} else if(dataArray[i][1] == "yes"){
						$('#seqPrimYes').attr('checked', true);
					}
					break;
				case "Tube tag":
					// handle the unit concentration radio
					if(dataArray[i][2] == "Conc(nM)"){
						$('#unit-nM').attr('checked', true);
					} else if(dataArray[i][2] == "Conc(ng/ul)"){
						$('#unit-ng').attr('checked', true);
					}	
					
					// inserting data in tubetag table(s)
					var tubeTagsRows = dataArray.length-i-1;
					
					// For at tjekke om det er en bric table
					var colLength = dataArray[i].length;		
					var bricBoo = false;
					if(colLength > 7){
						//alert("a");
						bricBoo = true;						
					}
					
					// start upload af tubetag table(s) data
					i = i + 1;
					end = false;		// stopping the loop, when First Tubetag reach.
					var table = "t";
					var id = 1;		// the id of the table
					var rowid = 1;
					var tmpTubeTag = dataArray[i][0];

					if(bricBoo){
						addNewTable(tmpTubeTag.substr(4),true);
					}else
						addNewTable(tmpTubeTag.substr(4));
					for(var j = 0; j < tubeTagsRows; j++ ){
						if(dataArray[i][0] == tmpTubeTag){	// not new tubetag			
							if(rowid % 10 == 0 ){	// check om 10 nye rækker skal sættes ind.
								if((i+1) < dataArray.length){	// check if last line in spreadsheet is reached
									if(dataArray[i+1][0] != "") // check if the next line is a new tubetag.
										append10RowsWtihIDLoad(table+id,dataArray[i][0].substr(4));
								}
							}	
							// indsæt ny række
								// Same in all versions
							$("#"+table+id+tubeTagClassname+rowid).val(dataArray[i][0].substr(4));
							$("#"+table+id+sampleIdClassname+rowid).val(dataArray[i][1].substr(getIndexOf2seq(dataArray[i][1])));
							$("#"+table+id+concentrationClassname+rowid).val(dataArray[i][2]);
							$("#"+table+id+averageLibClassname+rowid).val(dataArray[i][3]);
							if(version == 1){
								$("#"+table+id+indexNameClassname+rowid).val(dataArray[i][5]);
								$("#"+table+id+indexSeqClassname+rowid).val(dataArray[i][4]);
							} else if(version == 1.1){		// switched index name and index seq column from version 1.1
								$("#"+table+id+indexNameClassname+rowid).val(dataArray[i][4]);
								$("#"+table+id+indexSeqClassname+rowid).val(dataArray[i][5]);
							} else{ 						// unknown version !
								//alert("unknown version");
								$("#"+table+id+indexNameClassname+rowid).val(dataArray[i][4]);
								$("#"+table+id+indexSeqClassname+rowid).val(dataArray[i][5]);
							}
								$("#"+table+id+projectNameClassname+rowid).val(dataArray[i][6]);
							
							if(bricBoo){
								// Same in all versions
								$("#"+table+id+refGenomeClassname+rowid).val(dataArray[i][7]);
								$("#"+table+id+spicesClassname+rowid).val(dataArray[i][8]);
								$("#"+table+id+cellTypeClassname+rowid).val(dataArray[i][9]);
								$("#"+table+id+ipClassname+rowid).val(dataArray[i][10]);
								$("#"+table+id+TOEClassname+rowid).val(dataArray[i][11]);
							}
							rowid++;
						} 
						else if(dataArray[i][0] == ""){	// ny tubetag
						    if(dataArray[i+1]) {
							tmpTubeTag = dataArray[i+1][0];
							id++;			// indsæt i næste tabel
							rowid = 1;		// reset rownumber - 0 because there is a blank row between the tubetags, by using 0, we skip it.
							if(bricBoo) {
							    // indsæt ny tabel
							    addNewTable(tmpTubeTag.substr(4),true);
							} else {
							    addNewTable(tmpTubeTag.substr(4));
							}
						    }
						}
						i++;
					}
			}
		}
	}
//	} catch(error){
//		alert("Error catch: " + error);
//	}
}
