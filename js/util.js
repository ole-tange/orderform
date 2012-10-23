/*
 * Print out an array - used for testing/debugging
 */
function printArray(arr){
	var tmp = "";
	for (var j = 0; j < arr.length-1; j++){
		tmp += arr[j].value + " ";			// remember .value
	}
	$("#results").text(""+tmp);
}

/*
 * Sort an array
 */ 
function sortArray(array){
	array.sort(function(a, b){
					return a.value-b.value
				});
}

function emptyString(value){
	if(value == null || value == ""){
		return true;
	} else {
		return false;
	}
}

/*
 * Get unique 4 character identifier
 */
function getTubeTag() {
	var httpOutput = null;
	httpOutput = new XMLHttpRequest();
	httpOutput.open( "GET", "/tubetag/?textonly=1", false );
	httpOutput.send( null );
	return chomp(httpOutput.responseText);
}

function chomp(raw_text)
{
    // do perl chomp
    return raw_text.replace(/(\n|\r)+$/, '');
}

/*
 * Add's Link to all "headlines".
 */
function addLinks(){
	var arId = Array("BillToLink","LPLink","BPLink","PILink","addInfoLink","runtypeLink","phixLink","seqLibLink","leftoversLink","custSeqLink","date");
	var arLinks = Array(BilltoLink, LPLink, BPLink, PILink, addInfoLink, runtypeLink, phixLink, seqLibLink, leftoversLink, custSeqLink,dateLink);

	for(var i = 0; i < arId.length;i++){
		$("#"+arId[i]).attr("href", arLinks[i]);
		$("#"+arId[i]).attr("tabindex", "-1");	// prevend "tabbing" into the link
	}
}

/*
 * Test function for debugging
 */
function test(){
	alert(testvar);
	//var a = $(".EAN");
//a.css("border","13px solid red");
}

function PIOther(){
	$('#PI-name').val("");
	$('#PI-email').val("");
	$('.PI-field').show();
}

function PIInsert(str){
    $('#PI-name').val(str.value);
    $('#PI-email').val(PIList[str.value]["Email"]);
    $('#BillTo_name').val(PIList[str.value]["BillTo"]);
    $('#EAN_No_id').val(PIList[str.value]["EAN"]);
    $('#EAN_Fakultet_id').val(PIList[str.value]["Faculty"]);
    $('#EAN_Institut_id').val(PIList[str.value]["Institute"]);
    $('#EAN_Afdeling_id').val(PIList[str.value]["Department"]);

    $('.PI-field').hide();
}

function addPI2TubeTag(){
	str = $("#PI")[0].value;
	if(str != "other")
		$('#PIShort').val(tubeTagList[str]);
	else
		$('#PIShort').val("PRI");
}	

/*
 * This function checks the table size (columns and rows) and then add it to the seqform via an input with the hidden type.
 */
function insertTableSize(){
	var numOfTables = $('.tableNum');
	for(var w = 0;w < numOfTables.length;w++){
		
		var tname = "t" + (w+1);
		var seqTable = document.getElementById(tname);	// 
		var culumnslength = seqTable.rows[0].cells.length; // check columns for the first row
		var rowlength = seqTable.rows.length;
	
		var inputColumn = document.createElement("input");
		inputColumn.type = "hidden";
		inputColumn.name = tname +"_tableColSize";
		inputColumn.value = culumnslength;
	
		var inputRow = document.createElement("input");
		inputRow.type = "hidden";
		inputRow.name = tname+ "_tableRowSize";
		inputRow.value = rowlength;
	
		seqTable.appendChild(inputColumn);
		seqTable.appendChild(inputRow);
	}
	
	var InputTableTotalSize = document.createElement("input");
	InputTableTotalSize.type = "hidden";
	InputTableTotalSize.name = "tableTotalSize";
	InputTableTotalSize.value = numOfTables.length;
	seqTable.appendChild(InputTableTotalSize);
	
}

function generateOrderNoteID(){
	
        var date = $("#datepicker")[0].value;
//	var tubetag = $("#t1tubeTag1")[0].value;
        var tubetag = getTubeTag();
	var LabPersonName = $('input[name=LP-name]')[0].value;
//	var orderNoteID = date.replace("-","") + "_" + tubetag + "_" + LabPersonName;
	
	var seqTable = document.getElementById("t");
	var orderNoteIDInput = document.createElement("input");
	orderNoteIDInput.type = "hidden";
	orderNoteIDInput.name = "orderNoteID";
	orderNoteIDInput.value = date.replace(/-/g,"") + "_" + tubetag + "_" + LabPersonName;
	seqTable.appendChild(orderNoteIDInput);
	
	//return orderNoteID;
}
