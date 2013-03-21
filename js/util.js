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

/*
 * Function check if value (string) is empty
 */
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

function tubeTagTaken(tag) {
	var httpOutput = null;
	httpOutput = new XMLHttpRequest();
	httpOutput.open( "GET", "/tubetag/?taken="+tag, false );
	httpOutput.send( null );
	return chomp(httpOutput.responseText) == "true";
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
    var arId = Array("BillToLink","LPLink","BPLink","PILink","addInfoLink","runtypeLink","phixLink","seqLibLink","leftoversLink","custSeqLink","date","concentrationUnitLink");
    var arLinks = Array(BilltoLink, LPLink, BPLink, PILink, addInfoLink, runtypeLink, phixLink, seqLibLink, leftoversLink,custSeqLink,dateLink,concentrationUnitLink);

	for(var i = 0; i < arId.length;i++){
		$("#"+arId[i]).attr("href", arLinks[i]);
		$("#"+arId[i]).attr("target", "_blank"); // Open in new window because 'Back' clears the form.
		$("#"+arId[i]).attr("tabindex", "-1");	// prevend "tabbing" into the link
	}
}

/*
 * Test function for debugging
 */
function test(){
	alert(testvar);
}

/*
 * Resert automatic insertion, when a Principle Investigator is selected.
 */
function PIOther(){
    alert("Error. Contact Ole");
}

function PIInsert(str){
    if(str.value == "other") {
	$('#PI-name').val("");
	$('#PI-email').val("");
	$('#PI-name').val("");
	$('#PI-email').val("");
	$('#BillTo_name').val("");
	$('#EAN_No_id').val("");
	$('#EAN_Fakultet_id').val("");
	$('#EAN_Institut_id').val("");
	$('#EAN_Afdeling_id').val("");
	$('.PI-field').show();
    } else {
	$('#PI-name').val(str.value);
	$('#PI-email').val(PIList[str.value]["Email"]);
	$('#BillTo_name').val(PIList[str.value]["BillTo"]);
	$('#EAN_No_id').val(PIList[str.value]["EAN"]);
	$('#EAN_Fakultet_id').val(PIList[str.value]["Faculty"]);
	$('#EAN_Institut_id').val(PIList[str.value]["Institute"]);
	$('#EAN_Afdeling_id').val(PIList[str.value]["Department"]);
	$('.PI-field').hide();
    }
}

function PIInsert4Load(str){
    if(str == "other") {
	$('#PI-name').val("");
	$('#PI-email').val("");
	$('#PI-name').val("");
	$('#PI-email').val("");
	$('#BillTo_name').val("");
	$('#EAN_No_id').val("");
	$('#EAN_Fakultet_id').val("");
	$('#EAN_Institut_id').val("");
	$('#EAN_Afdeling_id').val("");
	$('.PI-field').show();
    } else {
	$('#PI-name').val(str);
	$('#PI-email').val(PIList[str]["Email"]);
	$('#BillTo_name').val(PIList[str]["BillTo"]);
	$('#EAN_No_id').val(PIList[str]["EAN"]);
	$('#EAN_Fakultet_id').val(PIList[str]["Faculty"]);
	$('#EAN_Institut_id').val(PIList[str]["Institute"]);
	$('#EAN_Afdeling_id').val(PIList[str]["Department"]);
	$('.PI-field').hide();
    }
}

/*
 * Add the PI shortcut to the PIShort hidden input, used to insert PI-shortcut before the tubetag in the csv file generated from php.
 */
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


/*
 *  Generate OrderNoteID in format: date_tubetag
 */
function generateOrderNoteID(){
    var date = $("#datepicker")[0].value;
    var orderNoteID = date.replace(/-/g,"") + "_" + getTubeTag();
    
    var seqTable = document.getElementById("t");
    var orderNoteIDInput = document.createElement("input");
    orderNoteIDInput.type = "hidden";
    orderNoteIDInput.name = "orderNoteID";
    orderNoteIDInput.id = "orderNoteID";
    orderNoteIDInput.value = orderNoteID;
    seqTable.appendChild(orderNoteIDInput);
    generateOrderNoteName(orderNoteID);
}

/*
 *  Generate OrderNoteName in format: date_ID_LabPersonName
 */
function generateOrderNoteName(orderNoteID) {
    var LabPersonName = $('input[name=LP-name]')[0].value;
    
    var seqTable = document.getElementById("t");
    var orderNoteNameInput = document.createElement("input");
    orderNoteNameInput.type = "hidden";
    orderNoteNameInput.name = "orderNoteName";
    orderNoteNameInput.value = orderNoteID + "_" + LabPersonName;
    seqTable.appendChild(orderNoteNameInput);
}

/*
 * This function is called everytime index seq. is fulfill
 * It automatic get the indexName value from the $indexSequenceList.
 */
function updateIndexName(a,ui){
	$('#'+(a.id).replace(/indexSeq/g,indexNameClassname)).val((ui.item.id).toUpperCase()); // set index_name
	$('#'+a.id).val(ui.item.value);						// set Index_sequence	
}

/*
 * This function is called everytime index Name. is fulfill
 * It automatic get the indexName value from the $indexNameList.
 */
function updateIndexSeq(a,ui){
	$('#'+(a.id).replace(/indexName/g,indexSeqClassname)).val(ui.item.id);
	$('#'+a.id).val((ui.item.value).toUpperCase());							
}

/*
 * Returns the secound index of a underscore char.
 */
function getIndexOf2seq(str){
	tmpIndex = str.indexOf("_");
	newStr = str.substr(tmpIndex+1);
	tempIndex = newStr.indexOf("_");
	return tempIndex+tmpIndex+2;	// +2 - also exclude the two underscores
}

/*
 * Insert "str" in all input boxes in tableid with the column class.
 */
function autofillRestOfColumn(str,tableid,columnClass){
	$("tbody#"+tableid+" tr td input."+columnClass).val(str);
}
