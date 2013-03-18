/* javascript for validating input from webformular.
 *
 *
 */

/*
 * Test function
 */
function projectVal(){
	var projectNameColumn = $("tbody#t1 tr td input.ProjectName");
	projectNameColumn.css("border","13px solid red");

	for(var i = 0; i < projectNameColumn.length;i++){
		if(!verifyStr(projectNameColumn[i].value)){
			alert("at index " + i + " it is false!")
		}
	}	

}

/*
 * This function is called when the submit button is pressed.
 */
function validateForm(){

	// Next tree lines only used for debugging purpose
	var boo1 = validateLabPerson();
	var boo2 = validateBioPerson();
	var boo3 = validatePI();
	var boo4 = validateBillTo();
	var boo5 = validateRunType();
	
	var boo6 = validateAllTables();
	var boo7 = validateDate();
	var boo8 = validateIAccept();
	var boo9 = validateConcentrationUnit();
	var boo10 = validateTubesAndLanes();
	
//	alert("boo1 = " + boo1 + " boo2 = " + boo2 + " boo3 = " + boo3 + " boo4 = " + boo4 +" boo5 = " + boo5 +" boo6 = " + boo6 + " boo7 = " + boo7);
	if (boo1 && boo2 && boo3 && boo4 && boo5 && boo6 && boo7 && boo8 && boo9 && boo10){	
//	if(validateLabPerson() && validateBioPerson() && validatePI() && validateBillTo() && validateRunType() && validateTable()){
		//insert hidden fields
		insertTableSize();	// insert size of all table - used when generating csv file
		generateOrderNoteID();	// insert orderNoteID
		if($("#PI")[0].value != "other")
			PIInsert($("#PI")[0]);	// insert PI information (name and e-mail adr. in form) - if not inserted in advance.
			addPI2TubeTag();		// indsæt "de tre tegn" (fra PI) i tubetaggen.
		return true;
	} else {
		return false;
	}
}

/* Validate number of tubes and the requested lanes..
 *
 */
function validateTubesAndLanes(){
	boo = true;
	
	var runtype = $(".runtype");
	var temp = "";
	var counter = 0;
	var tubetagList = $('.tableNum');
	
	// This loop count one up everytime runtype is filled, set the temp value to the runtype value.
	for(var i=0;i<runtype.length;i++){
		if(runtype[i].value != ""){
			counter++;
			temp = runtype[i].value;
		}
	}
	
	if (counter != 0 && !isNaN(temp)){
		if (tubetagList.length <= temp){
			setValidOnBox(runtype);
			setValidOnBox(tubetagList.closest('table'));
		} else {
			setErrorOnBox(runtype);
			setErrorOnBox(tubetagList.closest('table'));
			boo = false;
		}
	} 	
	
	return boo;
}

function validateConcentrationUnit(){
	var boo = true;
	var nMisChecked = $('#unit-nM').attr('checked')?true:false;
	var ngisChecked = $('#unit-ng').attr('checked')?true:false;
	
	if(!nMisChecked && !ngisChecked){
		setErrorOnBox($('#unit-nM').closest('td'));
		boo = false;
	}else{
		setValidOnBox($('#unit-nM').closest('td'));
	}
	
	return boo;
}

/*
 * Validate the LabPersonName if it's not null
 */
function validateLPname(){
	var name = $('input[name=LP-name]');
	if (name[0].value==null || name[0].value==""){
		setErrorOnBox(name);
	//	name.focus();
		return false;
	} else{
		setValidOnBox(name);
		return true;
	}
}

/*
 * Validate the mandatory "Lab person" data
 */
function validateLabPerson(){
	var boo = true;

	//validate name
	if(!validateLPname()){
		boo = false;
	}
	
	//validate mail
	var mail=$('input[name=LP-mail]');
	if (!validateEmail(mail[0].value)){
		setErrorOnBox(mail);
		//mail.focus();
		boo = false;
	} else{
		setValidOnBox(mail);
	}
	
	//validate phone
	var phone=$('input[name=LP-phone]');
	if (phone[0].value==null || phone[0].value==""){
		setErrorOnBox(phone);
		//phone.focus();
		boo = false;
	} else{
		if(!phone[0].value.match(/^[0-9+ ]+$/)){
			setErrorOnBox(phone);
			boo = false;
		} else {
			setValidOnBox(phone);
		}
	}
	
	return boo;
}

/*
 * Validate the mandatory "Bioinformatic person" data
 */
function validateBioPerson(){
	var boo = true;
	var name=$('input[name=BP-name]');
	if (name[0].value==null || name[0].value==""){
		setErrorOnBox(name);
	//	name.focus();
		boo = false;
	} else{
		setValidOnBox(name);
	}
  
	var mail=$('input[name=BP-mail]');
	if (!validateEmail(mail[0].value)){
		setErrorOnBox(mail);
	//	mail.focus();
		boo = false;
	} else{
		setValidOnBox(mail);
	}
	
	return boo;
}

/*
 * Validate the "PI" data
 */
function validatePI(){
	var PI = $('select[name=PI]');
	if(PI[0].value == "person"){
		setErrorOnBox(PI);
//		document.forms["seqForm"]["PI"].focus();
		return false;
	} else{
		setValidOnBox(PI);
		return true;
	}
}

/*
 * Validate an email address
 */
function validateEmail(mailStr){
	var atpos=mailStr.indexOf("@");
	var dotpos=mailStr.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=mailStr.length){
		return false;
	} else
		return true;
}

/*
 * Validate the "Bill to" data
 */
function validateBillTo(){
	var boo = true;
	
	//validate Bill TO
	var billTo=$('input[name=BillTo_name]');
	if (billTo[0].value==null || billTo[0].value==""){
		setErrorOnBox(billTo);
	//	billTo.focus();
		boo = false;
	} else{
		setValidOnBox(billTo);
	}
	
	if(!validateCVRAndEAN()){
		boo = false;
	}
	
	return boo;
}

/*
 * Validate The CVR and EAN fields for:
 * Either EAN or CVR is fullfilled
 * For not null
 */
function validateCVRAndEAN(){
	var booCVR = false;
		var indexCVR = 0;
		var booEAN = false;
		var indexEAN = 0;
		var EAN = $(".EAN");
		var CVR = $(".CVR");
		
		//check for either CVR or EAN is fullfilled
		for(var i = 0 ; i < CVR.length;i++){
			if (CVR[i].value != ""){
				booCVR = true;
				break;
			}		
		}
		for(var i = 0 ; i < EAN.length;i++){
			if (EAN[i].value != ""){
				booEAN = true;
				break;
			}
		}
	
		//check if both is specified - comment out, it is allowed to specify both EAN and CVR
	//	if(booEAN && booCVR){
	//		setErrorOnBox(EAN);
	//		setErrorOnBox(CVR);
	//		return false;
	//	}
		
		//validate input for CVR or EAN
		if(booEAN){
			setValidOnBox(EAN);
			setValidOnBox(CVR);
			return validateEAN();
		}
		else if(booCVR){
			setValidOnBox(EAN);
			setValidOnBox(CVR);
			return validateCVR();
		}
		else{ // check if none of them is specified
			setErrorOnBox(EAN);
			setErrorOnBox(CVR);
			return false;
		}
		return true;
}

/*
 * Validate the "CVR" data if it's empty
 */
function validateCVR(){
	var boo = true;
	var cvr = $(".CVR");
	
	for(var i = 0; i < cvr.length;i++){
		if(emptyString(cvr[i].value)){ // check for an empty string
			setErrorOnBox($("#"+cvr[i].id));
			boo = false;
		}	
	}
	return boo;
}

/*
 * Validate the "EAN" data if it's empty
 */
function validateEAN(){
	var boo = true;
	var ean = $(".EAN");
	
	for(var i = 0; i < ean.length;i++){
		if(emptyString(ean[i].value)){ // check for an empty string
			setErrorOnBox($("#"+ean[i].id));
			boo = false;
		}	
	}
	return boo;
}

/*
 * Verify a char and substitute wrong charters (doesn't match the regexp) with an underscore
 */
function verifyChar4AddInfo(field){
    var currStr = field.value;
    field.value = currStr.replace(/["]/g,"_")
}

/*
 * Verify a char and substitute wrong charters (doesn't match the regexp) with an underscore
 */
function verifyChar(field){
    var currStr = field.value;
    field.value = currStr.replace(/[^A-Z0-9a-z]/g,"_")
}

/*
 * Check if num-variable is between from-varibale and to-variable
 * vali - string included in the error msg
 */
function checkNumberBetween(num, from, to, vali){

	if(num <= to && num >= from){	//Check between "from"-"to"
		return true;
	}else if(num == ""){				// Allow null!
		return true;
	}
	else{
//		alert(vali + " - Must specify a number between " + from + "-" + to);
		//elem.focus();
		return false;
	}
}

/*
 * Check if str-variable is a double
 */
function validateIfDoubleNumberBetween(str, from, to, vali){
    var myArray = str.match(/^([0-9.]*) *(nM|ng.mL)?$/i);

    if(myArray != null) {
	return checkNumberBetween(myArray[1],from,to,vali);
    } else{                                                              
//		alert(vali + " - " + doublerr);
	return false;
    }
}

/*
 * Check if str-variable is a int
 */
function validateIfIntNumberBetween(str, from, to, vali){
	if(str.match(/^[0-9]*$/)){	//Check if it's a number
		return checkNumberBetween(str,from,to,vali);
	} else{                                                              
		return false;
	}
}

/*
 * Validate runtype. check if only one of the textbox (with class name runtype) is filled.
 * and check if the filled checkbox contains a number between 1 - 32
 */
function validateRunType(){
	var runtype = $(".runtype");
	var temp = "";
	var counter = 0;
	
	// This loop count one up everytime runtype is filled.
	for(var i=0;i<runtype.length;i++){
		if(runtype[i].value != ""){
			counter++;
			temp = runtype[i].value;
			var index = i;
		}
	}

	if(counter>1){	//Check only one box is filled
//		setErrorOnBox(runtype);
//		//alert(runtypeerr);
		return false;
	} else if (counter == 0){	//Check if any is filled
		setErrorOnBox(runtype);
		return false;
	}
//	else{
				// add if here - to show error box when refreshing and then push submit for not int and not between 1-32 
		return validateIfIntNumberBetween(temp,1,32,"runtype"); // check when one is filled - check if it's an integer and between 1-32
//	}
}

/*
 * Validate Runtype boxes.
 * Check if only one box is filled
 * Check if any is filled
 * if only one is filled, check if it is not out of range
 */
function validateRuntypeOnTheFly(parameter){
	var runtype = $(".runtype");
	var runtype0 = $("#runtype0");
	var runtype1 = $("#runtype1");
	var runtype2 = $("#runtype2");
	var runtype3 = $("#runtype3");
	var runtype4 = $("#runtype4");
	var tempRuntype;
	var counter = 0;
	var index=-1;
	var temp = "";
	
//	runtypeCases("runtype2",runtype0,runtype1,runtype2,runtype3,runtype4);
	//setRuntypeNoInput(runtype[3]);
	
	//check if any input
	//find the right one
	//setRuntypeNoInput on all others


	// This loop count one up everytime runtype is filled.
	for(var i=0;i<runtype.length;i++){
		if(runtype[i].value != ""){
			counter++;
			temp = runtype[i].value;
			index = i;
		}
	}
	
	switch (index){
		case (0):
			tempRuntype = runtype0;
			break;
		case (1):
			tempRuntype = runtype1;
			break;
		case (2):
			tempRuntype = runtype2;
			break;
		case (3):
			tempRuntype = runtype3;
			break;
		case (4):
			tempRuntype = runtype4;
			break;
	}
	
	if(counter>1){	//Check only one box is filled
		setErrorOnBox(runtype);
		return false;
	} else if (counter == 0){	//Check if any is filled
		//reset all - so it is possible to write to the other boxes again.
		setRuntypeReset(runtype0);
		setRuntypeReset(runtype1);
		setRuntypeReset(runtype2);
		setRuntypeReset(runtype3);
		setRuntypeReset(runtype4);
		return false;
	}else{
		runtypeCases("runtype"+index,runtype0,runtype1,runtype2,runtype3,runtype4);
		var boo = validateIfIntNumberBetween(temp,1,32,"runtype"); // check when one is filled - check if it's an integer and between 1-32
		if(boo){
			setValidOnBox(tempRuntype);
			return true;
		}else{
			setErrorOnBox(tempRuntype);
			return false;
		}
	}
}

/*
 *  This function handles which ryntype box need to be grey-scaled (can't insert anything in)
 */
function runtypeCases(cas,r0,r1,r2,r3,r4){
	switch (cas) {
		case ("runtype0"):
			setRuntypeNoInput(r1);
			setRuntypeNoInput(r2);
			setRuntypeNoInput(r3);
			setRuntypeNoInput(r4);
			break;
		case ("runtype1"):
			setRuntypeNoInput(r0);
			setRuntypeNoInput(r2);
			setRuntypeNoInput(r3);
			setRuntypeNoInput(r4);
			break;
		case ("runtype2"):
			setRuntypeNoInput(r1);
			setRuntypeNoInput(r0);
			setRuntypeNoInput(r3);
			setRuntypeNoInput(r4);
			break;
		case ("runtype3"):
			setRuntypeNoInput(r1);
			setRuntypeNoInput(r2);
			setRuntypeNoInput(r0);
			setRuntypeNoInput(r4);			
			break;
		case ("runtype4"):
			setRuntypeNoInput(r1);
			setRuntypeNoInput(r2);
			setRuntypeNoInput(r3);
			setRuntypeNoInput(r0);			
			break;
	}
}

/*
 * Validate the SampleID, to check if a sampleID is unique. validdate on each table - tubetag_sampleID is unique
 */
function validUniqueSampleId(tableid){
	var boo = true;
	var map = new Object();
	var tmp = "";
	var sampleID = $("." + tableid + "sampleId");
	for(var i = 0;i < sampleID.length;i++){
		if(sampleID[i].value != ""){				// Don't check if empty
			tmp = map[sampleID[i].value];
			map[sampleID[i].value] = sampleID[i].id;	//Insert sampleID into map
			if (tmp != null){				//Check if the sampleID exist before inserting.
				setErrorOnBox($("#"+tmp));
				setErrorOnBox($("#"+ sampleID[i].id));
				boo = false;
			} else {
				setValidOnBox($("#"+ sampleID[i].id));
			}
		}	// make setValidOnBox when empty ??? insert here then
	}
	return boo;
}

function validUniqueIndexName(tableid){
        var boo = true;
        var map = new Object();
        var tmp = "";
        var indexName = $("." + tableid + "indexName");
        for(var i = 0;i < indexName.length;i++){
                if(indexName[i].value != ""){                            // Don't check if empty
                        tmp = map[indexName[i].value];
                        map[indexName[i].value] = indexName[i].id;        //Insert sampleID into map
                        if (tmp != null){                               //Check if the sampleID exist before inserting.
                                setErrorOnBox($("#"+tmp));
                                setErrorOnBox($("#"+ indexName[i].id));
                                boo = false;
                        } else {
                                setValidOnBox($("#"+ indexName[i].id));
                        }
                }       // make setValidOnBox when empty ??? insert here then
        }
        return boo;
}

function validTubeTag(tableid){
    var boo = true;
    var map = new Object();
    var tmp = "";
    // List of all elements of class tubeTag
    var tubeTag = $(".tubeTag");
    for(var i = 0;i < tubeTag.length;i++){
        if(tubeTag[i].value != "") {
            // Don't check if empty
	    if(! tubeTagTaken(tubeTag[i].value)) {
                setErrorOnBox($("#"+ tubeTag[i].id));
                boo = false;
            } else {
                setValidOnBox($("#"+ tubeTag[i].id));
            }
	}
    }
    return boo;
}


/*
 * Validate if the num-variable is a double between concentrationMin to concentrationMax
 */
function validateConcentrationOnTheFly(num){
    var boo = validateIfDoubleNumberBetween(num.value,concentrationMin,concentrationMax,"Concentration");
	if(boo){
		setValidOnBox($('#'+num.id));
		return true;
	}else{
		setErrorOnBox($('#'+num.id));
		return false;
	}
}

/*
 * Validate if the num-variable is a int between AverageLibInsMin to AverageLibInsMax
 */
function validateAverageLibInsOnTheFly(num){
	
//	if(num.value == "" || num.value==null )
//		return true;

	var boo = validateIfIntNumberBetween(num.value,AverageLibInsMin,AverageLibInsMax,"Average library insert");
	if(boo){
		setValidOnBox($('#'+num.id));
		return true;
	}else{
		setErrorOnBox($('#'+num.id));
		return false;
	}
	
}

/*
 * Check if the jqueary object, num, is empty.
 */
function checkNull(num){
	boo = emptyString(num.value);
	
	if(!boo){
		setValidOnBox($('#'+num.id));
		return true;
	}else{
		setErrorOnBox($('#'+num.id));
		return false;
	}
}

/*
 * Validate all tables (Tubetag-tables).
 */
function validateAllTables(){
	var boo = true;
	var numOfTables = $('.tableNum');
	var lengthOfTable = numOfTables.length+1;
	for(j = 1;j < lengthOfTable;j++){
		if(!validateTable("t"+(j))){
			boo = false;
		}
	}
	return boo;
}

/*
 * This function validate a table with a specific tubetag.
 */
function validateTable(tableid){
	var boo = true;
	
	// Validate All fields are required in the table, so if you fill in one field you must fill out the rest.
	if(!validAllFieldReqInTable(tableid)){
                boo = false;
       } else {

	// Validate for availible chars!
	if(!validateTableStrings(tableid)){
		boo = false;
	}	
	
	//validate Sample ID is unique
	if(!validUniqueSampleId(tableid)){
		boo = false;
	}

        //validate IndexName is unique
        if(!validUniqueIndexName(tableid)){
                boo = false;
        }

	//validate TubeTag is known
	if(!validTubeTag(tableid)){
	     boo = false;
	}
	   
	//Validate concentration and Average library insert is between.
	var concenArr = $("tbody#"+tableid+" tr td input."+ concentrationClassname);
	var AverageLibArr = $("tbody#"+tableid+" tr td input."+ averageLibClassname);
	
	for(var i = 0; i < concenArr.length;i++){
		if(!validateConcentrationOnTheFly(concenArr[i])){
			boo = false;
		}
	}
	
	for(var i = 0; i < AverageLibArr.length;i++){
		if(!validateAverageLibInsOnTheFly(AverageLibArr[i])){
			boo = false;
		}
	}
}
/*	
	if(!validateBricTable){
		boo=false;
	}
*/	
	return boo;
}

/*
 * Validate the Bric table.
 */
function validateBricTable(){
	var boo = true;
	
	return boo;
}

/* Validate all fields in a row, to check if one of them is missing. 
 * It mean one need to fullfill all row or nothing (The tubetag is autogenerated, so it isn't considered in the check!!)
 */
function validAllFieldReqInTable(tableid){
	
	var projectNameColumn = $("tbody#"+tableid+" tr td input.ProjectName");
	var indexSeqColumn = $("tbody#"+tableid+" tr td input.indexSeq");
	var indexNameColumn = $("."+tableid+"indexName");
	var sampleIdColumn = $("."+tableid+"sampleId");
	var concenColumn = $("tbody#"+tableid+" tr td input.concentration");
	var aveLibInsColumn = $("tbody#"+tableid+" tr td input.aveLibIns");
	boo = true

	for(i = 0; i < sampleIdColumn.length; i++){
		tempboo = (sampleIdColumn[i].value != "") ^ (indexSeqColumn[i].value != "") ^ (indexNameColumn[i].value != "")
		^ (projectNameColumn[i].value != "") ^ (concenColumn[i].value != "") ^ (aveLibInsColumn[i].value != "");
		if(!tempboo){
			setValidOnBox($("#" + sampleIdColumn[i].id));
			setValidOnBox($("#" + indexSeqColumn[i].id));
			setValidOnBox($("#" + indexNameColumn[i].id));
			setValidOnBox($("#" + projectNameColumn[i].id));
			setValidOnBox($("#" + concenColumn[i].id));
			setValidOnBox($("#" + aveLibInsColumn[i].id));
		} else{
			setErrorOnBox($("#" + sampleIdColumn[i].id));
			setErrorOnBox($("#" + indexSeqColumn[i].id));
			setErrorOnBox($("#" + indexNameColumn[i].id));
			setErrorOnBox($("#" + projectNameColumn[i].id));
			setErrorOnBox($("#" + concenColumn[i].id));
			setErrorOnBox($("#" + aveLibInsColumn[i].id));
			boo = false;
		}
	}

	return boo;
}

/*
 * Validate the seq table for valid strings
 */
function validateTableStrings(tableid){
	
	var projectNameColumn = $("tbody#"+tableid+" tr td input.ProjectName");
	var indexSeqColumn = $("tbody#"+tableid+" tr td input.indexSeq");
	var indexNameColumn = $("tbody#"+tableid+" tr td input.indexName");
	var sampleIdColumn = $("tbody#"+tableid+" tr td input.sampleId");
	var tubeTagColumn = $("tbody#"+tableid+" tr td input."+tubeTagClassname);
	
	var boo = true;
	
	var sampleidBoo = checkForValidChars(tableid,sampleIdColumn,sampleIdClassname);
	var indexSeqBoo = checkForValidChars(tableid,indexSeqColumn,indexSeqClassname);
	var indexColBoo = checkForValidChars(tableid,indexNameColumn,indexNameClassname);
	var projectNameBoo = checkForValidChars(tableid,projectNameColumn,projectNameClassname);
	var tubeTagBoo = true;
	
	for(var i = 0; i<tubeTagColumn.length;i++){	// Check if tubetag is null
		if(!checkNull(tubeTagColumn[i])){
			tubeTagBoo = false;
		}
	}

	if (!sampleidBoo || !indexColBoo || !projectNameBoo || !indexSeqBoo || !tubeTagBoo) {
//		alert("Some chars are invalid in \"Sample ID\" column = " + sampleidBoo);
		boo = false;
	}else{
		//alert("OK");
		boo = true;
	}
	
	return boo;
}

/*
 * Validate if the date is not null
 */
function validateDate(){
	var boo;
	var date = $("#datepicker");

	if(emptyString(date[0].value)) {
		setErrorOnBox(date);
		boo = false;
	} else {
		setValidOnBox(date);
		boo = true;
	}
	
	return boo;
}


/*
 * Validate I accept is checked
 */
function validateIAccept(){
    var boo;
    var iaccept = $("#iaccept");

    if(iaccept[0].checked) {
        setValidOnBox(iaccept.closest('td'));
	boo = true;
    } else{
	setErrorOnBox(iaccept.closest('td'));
	boo = false;
    }
    
    return boo;
}



/*
 * validate "str" for any unvalid char according to the regexp.
 */
function verifyStr(str){
        var regExp = /^[0-9A-Za-z_]$/;	
//	var regExp =  /^[3-9A-NP-Za-hj-km-np-y_]$/;			// Not included 0, 1, 2, i, l, o, z, O, Z - and only underscore as special char
//	

   //     if(str != null && str != ""){	// Check if empty
		for(var i = 0; i < str.length; i++){ // check each char in string
			if (!str.charAt(i).match(regExp) ){	// check if char match expression
				return false;
			}
		}
	//} else {
	//	return false;
	//}
        return true;
}

function checkForValidCharsOnBox(str){
	var boo = true;
	if(!verifyStr(str.value)){
		setErrorOnBox(temp);
		boo = false;
	} else{
		setValidOnBox(temp);
	}
	return boo;
}

/*
 * Check if the array "arr" has any unvalid chars
 */
function checkForValidChars(tableid,arr,validating){
	var boo = true;
	var temp;
	
	for(var i = 0;i < arr.length;i++){
		temp = $("tbody#"+tableid+" tr td input#"+validating+(i+1));
		if(!verifyStr(arr[i].value)){
			setErrorOnBox($("#" + arr[i].id));
			boo = false;
		} else{
			setValidOnBox($("#" + arr[i].id));
		}
	}
	return boo;
}

/*
 * Set redboxes on all at startup (not used).
 */
function setRedBoxes(){
	setInputBox2RedBorder($('input[name=LP-name]'));
	setInputBox2RedBorder($('input[name=LP-mail]'));
	setInputBox2RedBorder($('input[name=LP-phone]'));
	setInputBox2RedBorder($('input[name=BP-name]'));
	setInputBox2RedBorder($('input[name=BP-mail]'));
	//setInputBox2RedBorder($('input[name=LP-phone]'));
	setInputBox2RedBorder($(".CVR"));
	setInputBox2RedBorder($(".EAN"));
	setInputBox2RedBorder($("#datepicker"));
	//$("LP-name").css("border","3px solid red");
	var name = document.getElementsByName("LP-name");
	//name[0].focus();
	//alert();
	//name[0].css("border","3px solid red");
}

function setInputBox2RedBorder(input){
	input.css("border","3px solid red");
}

/*
 * Set input box, border to red.
 * Show error-box on top.
 */
function setErrorOnBox(input){
	input.css("border","3px solid red");
	$('#t0').show();
}

/*
 * Set Runtype input filed to grey border.
 * Set not able to insert any data in the box
 */
function setRuntypeNoInput(input){
	input.css("background-color","gray");
	input.attr('maxlength', "0");
	input.css("border","");
}

/*
 * Reset the runtype input field
 */
function setRuntypeReset(input){
	input.css("background-color","");
	input.attr('maxlength', "");
	input.css("border","");
}

/*
 * Set the box to "valid". remove any border on the input box.
 */
function setValidOnBox(input){
	input.css("border","");
}

/*
 * Test function
 */
function test123(str){
	alert(str.id);
}
