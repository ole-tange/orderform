/* 
 * Generate 10 new rows in the tubetag table
 * It will first delete last row - the row with the "Add 10 lines"-button.
 * Then add 10 new rows
 * and at last append a new row with a new  "Add 10 lines"-button.
 * All this in the table with the id "tableid"
 */
function append10RowsWtihID(tableid){
	deleteButton(tableid);		// Delete the old button
	
	for(var z = 0; z < 10 ;z++){
		appendRow(tableid);
	}
	appendButton(tableid);		// Append a new after the rows are inserted
}

/*
 * Generate 10 new rows in the last tubetag-table
 */
function append10Rows(){
	for(var z = 0; z < 10 ;z++){
		appendRow("t" + ($('.tableNum').length));
	}
}

/*
 * Generate the table header
 * Including (TubeTag,SampleID,Concentration,Average library insert,Index Sequence,Index Name, Project Name)
 */
function CreateTableHeader(tableId){
	//var seqTable = document.createElement("TABLE");
	var seqTable = document.getElementById(tableId);
	
	seqTable.appendChild(InsertTableHead(tableId));	
	
}

/*
 * Append the header of the table, to the table with id - tableid.
 */
function InsertTableHead(tableId){
	var row0 = document.createElement("TR");
	
	//create table header
	var headArray = Array();
	headArray[0] = createTableHead("th","hidden",tableId+ "_"+tubeTagClassname+"_0","Tube tag","Tube tag",tubeTagLink);
	headArray[1] = createTableHead("th","hidden",tableId+ "_"+sampleIdClassname+"_0","Sample ID","Sample ID",simpleIdLink);
	headArray[2] = createTableHead("th","hidden",tableId+ "_"+concentrationClassname+"_0","Conc","Concentration\n(nM or ng/ul)",concentrationLink);
	headArray[3] = createTableHead("th","hidden",tableId+ "_"+averageLibClassname+"_0","Insert","Average library insert",averageLibLink);
	headArray[4] = createTableHead("th","hidden",tableId+ "_"+indexNameClassname + "_0","Index Name","Index Name",indexNameLink);
	headArray[5] = createTableHead("th","hidden",tableId+ "_"+indexSeqClassname + "_0","Sequence","Index Sequence",indexSeqLink);
	headArray[6] = createTableHead("th","hidden",tableId+ "_"+projectNameClassname + "_0","Project name","Project name",projectNameLink);

	//insert 7 new headers in the table
	for(var i = 0; i < 7 ; i++){
		row0.appendChild(headArray[i]);
	}
	return row0;
}

/*
 * This function append a "10 new lines row" for each table
 */
function appendButton(tableid){

	var seqTable = document.getElementById(tableid);
	var numOfRows = seqTable.rows.length;
	
	var row = document.createElement("TR");	// create row
	row.id = tableid + "_" + numOfRows;
	var cell = document.createElement("TD");
	cell.setAttribute('border', "0");
		
	var button = document.createElement("input");
	button.type = "button";
	button.value = "Add 10 lines";
	button.setAttribute('onclick', "append10RowsWtihID('"+tableid+"')");	
	
	cell.appendChild(button);
	row.appendChild(cell);
	seqTable.appendChild(row);
}

/*
 * This function delete the last row of the an table, with the id "tableid"
 * This will always be the "Add 10 lines"-button
 */
function deleteButton(tableid){
	var seqTable = document.getElementById(tableid);
	var numOfRows = seqTable.rows.length;
	
	var trId = tableid + "_" + (numOfRows-1);
	$('#' + trId).remove();
}

/*
 * Append one new row to the seq table
 * Insert proper settings (name, type, onkeyup etc.) for each colum.
 */
function appendRow(tableid){
    var seqTable = document.getElementById(tableid);
    var row0 = seqTable.rows[0];
    var cells = row0.cells;
    var len = cells.length;
    var rowLength = seqTable.rows[0].cells.length;
    var numOfRows = seqTable.rows.length;
    var cells = new Array(rowLength);
    var row = document.createElement("TR");
	
	row.id = tableid + "_" + numOfRows;
		
	
	//adds setting to cells and insert into array
	for(var i = 0; i < rowLength;i++){
		var tempCell = document.createElement("TD");
		//tempCell.setAttribute('height', "100");
		//tempcell.width = "500";
		var input = document.createElement("input");
		input.type = "text";
		if(i==0){
			if(numOfRows > 1){ 					// if not new tube
				tubetag = $("#"+tableid+tubeTagClassname+"1");
			} else{
				var tmp = tableid.replace("t","");
				if($('.tableNum').length == tmp){		 // generate tube in first row
				//	alert("her");
					tubeTag = getTubeTag(); // tableid + "-" + "TEST-"+numOfRows; // getTubeTag();
				}else							// copy tube
					tubetag = $("#"+tableid+tubeTagClassname+"1");
			}
					
			input.name = tableid + "_" + tubeTagClassname+"_"+numOfRows;
			input.id = tableid + tubeTagClassname+numOfRows;
			input.setAttribute('class', tubeTagClassname);	
			input.value = tubeTag;
		}else if(i==1){
			input.name = tableid + "_" + sampleIdClassname +"_"+numOfRows;
			input.id = tableid + sampleIdClassname +numOfRows;
			input.setAttribute('class', tableid + sampleIdClassname);
		//	input.onblur= function () { checkNull(this);};
			input.onkeyup= function () {verifyChar(this)};
//			input.value = numOfRows;
		}else if(i==2){
			input.name = tableid + "_" + concentrationClassname+"_"+numOfRows;
			input.id = tableid +concentrationClassname+numOfRows;
			input.onblur= function () {validateConcentrationOnTheFly(this)};
		//	input.type="hidden";
			input.setAttribute('class', concentrationClassname);
		//	input.setAttribute('size', "100%");
			//input.size="100%";
		}else if(i==3){
			input.name = tableid + "_" + averageLibClassname+"_"+numOfRows;
			input.id = tableid +averageLibClassname+numOfRows;
			input.onblur= function () {validateAverageLibInsOnTheFly(this)};
			input.setAttribute('class', averageLibClassname);
		}else if(i==5){
			input.name = tableid + "_" + indexSeqClassname+"_"+numOfRows;
			input.id = tableid +indexSeqClassname+numOfRows;
	//		input.onblur= function () { checkNull(this);};
			input.setAttribute('maxlength', '6');
			input.setAttribute('class', indexSeqClassname);
		}else if(i == 4){
			input.name = tableid + "_" + indexNameClassname+"_"+numOfRows;
			input.id = tableid + indexNameClassname+numOfRows;
			input.setAttribute('class', tableid + indexNameClassname);
	//		input.onblur= function () { checkNull(this);};
			input.onkeyup= function () {verifyChar(this)};
		}else if(i == 6){
			input.setAttribute('class', projectNameClassname);
			input.name = tableid + "_" + projectNameClassname+"_"+numOfRows;
			input.id = tableid + projectNameClassname+numOfRows;
	//		input.onblur= function () { checkNull(this);};
	//		input.value=2*numOfRows%7;
			input.onkeyup= function () {verifyChar(this)};
		} 
		
		if(rowLength > 7){ //If bric row inserted
			if(i == 7){
		//		var select = document.createElement("select");
				//input = select;
				//alert("her");
		//		createSelect(tableid,select, numOfRows,refGenomeClassname,$refgenomeList);
		//		input = select;
				createInputSettings(tableid,input, numOfRows,refGenomeClassname);
			} else if(i == 8){
				createInputSettings(tableid,input, numOfRows,spicesClassname);
			}else if(i == 9){
				createInputSettings(tableid,input, numOfRows,cellTypeClassname);
			}else if(i == 10){
				createInputSettings(tableid,input, numOfRows,ipClassname);
			}else if(i == 11){
				createInputSettings(tableid,input, numOfRows,TOEClassname);
			}
		} 
		
		tempCell.appendChild(input);
		cells[i] = tempCell;
		
	}

	//add cells to row
	for(var i = 0;i< cells.length;i++){
		row.appendChild(cells[i]);
	}
	
	//add row to table body
	seqTable.appendChild(row);
	
	//add validation, autocomplete .... to the table.
	addValidation2Row(tableid,rowLength);
//	validUniqueSampleId();
}

/*
 * Use a select box instead of a text input field
 * NOT implemented yet!!!
 */ 
function createInputSettings(tableid,input, numOfRows, columnClass){
	input.type = "text";
	input.name = tableid + "_" + columnClass + "_"+numOfRows;
	input.setAttribute('class', columnClass);
	
	return input;
}

/*
 * Use a select instead of a input textbox
 * (NOT implemented yet...)
 */
function createSelect(tableid,select, numOfRows, columnClass, arr){
	for(var s = 0; s < arr.length;s++){
//	for(i = 0; i < cells.length;i++)
	
		var option = document.createElement("option");
//		option.value = "aaa";
		option.id = tableid + "_" + columnClass + "_"+numOfRows;
		option.onclick = function () { bricFunction(this) };
		option.text = arr[s];
		select.appendChild(option);
	}
	
		select.name = tableid + "_" + columnClass + "_"+numOfRows;
		select.id = tableid + "_" + columnClass + "_"+numOfRows;
		select.setAttribute('class', columnClass);
	return select;
}

function bricFunction(obj){
//	alert(obj.value);
	//	$("#"+obj.id).hide();
	//alert("as");
}

/*
 * Add autocomplete etc. on the table. (see the wiki for what is validated on)
 * If row length is more than 7 (bric columns is add'ed the validation for those is add'ed to.)
 * (some of the "validation" is add'ed when in the add row function.)
 */
function addValidation2Row(tableid,rowLength){
	//add autocomplete forcolumn index Sequencing.
	var indexSeqCol = $("tbody#"+tableid+" tr td input.indexSeq");
	indexSeqCol.autocomplete({
		source: $indexSequenceList,
		position: { 	my: "center top",
					at: "center bottom",
					collision: "none"
				},
		focus: 	  function (e,ui) {	updateIndexName(this,ui);
				}
		});
		
	//add autocomplete forcolumn index Name
	var indexNameCol = $("tbody#"+tableid+" tr td input."+tableid+"indexName");
	indexNameCol.autocomplete({
		source: $indexNameList,
		position: { 	my: "center top",
					at: "center bottom",
					collision: "none"
				},
		focus: 	function (e,ui) {	updateIndexSeq(this,ui);
				}
		});
		
		//indexSeqCol.autocomplete({ position: { my : "right top", at: "right bottom" } });
		
	if(rowLength > 7){
		insertBricTableValidation(tableid);
	}
}

/*
 * Add  validation for columns used by Bric - (Refrence Genome,Species,Cell Type, IP, Type of experiment)
 */
function insertBricTableValidation(tableid){
	//insert auto complete for reference genome
	var refgenome = $("tbody#"+tableid+" tr td input."+refGenomeClassname);
	refgenome.autocomplete({
		source: $refgenomeList
	});
	
	//insert auto complete for Species
	var speciesClass = $("tbody#"+tableid+" tr td input."+spicesClassname);
	speciesClass.autocomplete({
		source: $speciesList
	});
	
	//insert auto complete for CellType
	var CellType = $("tbody#"+tableid+" tr td input."+cellTypeClassname);
	CellType.autocomplete({
		source: $cellTypeList
	});
	
	//insert auto complete for IP
	var IP = $("tbody#"+tableid+" tr td input."+ipClassname);
	IP.autocomplete({
		source: $IPList
	});
	
	//insert auto complete for Type of Experiment
	var TOEClass = $("tbody#"+tableid+" tr td input." + TOEClassname);
	TOEClass.autocomplete({
		source: $TOEList
	});
}

/*
 * Expand All tables with the bric columns, this function calculates the number of tables, and expand each of them
 */
function expandAllTables(){
	//alert($('.tableNum').length);
		
	var numOfTables = $('.tableNum');
	for(var k = 0;k < numOfTables.length;k++){
		var tableid = "t"+(k+1);
		expandTable(tableid);
	}	
}

/*
 * Expand the table with bric columns.
 * Adds (ReferenceGenome,Species,Cell Type, IP (antibody),Type of experiment).
 * Generate a number of rows, so it fit with the original rowlength
 */
function expandTable(tableid){
//	alert("dsadsa");
//	alert(tableid);
	var seqTable = document.getElementById(tableid);
	var numOfRows = (seqTable.rows.length);  // minus 1 because we don't need to expand the last row, because it contains the "Add 10 lines"-button
	var columnLength = seqTable.rows[0].cells.length;
	
	if(columnLength == 7){	// check not adding columns more then one
	
		//create table header
		var thArray = Array();
		thArray[0] = createTableHead("th","hidden",tableid+"_"+refGenomeClassname+"_0","Reference genome","Reference\ngenome",refGenomeLink);
		thArray[1] = createTableHead("th","hidden",tableid+"_"+spicesClassname+"_0","Species","Species",speciesLink);
		thArray[2] = createTableHead("th","hidden",tableid+"_"+cellTypeClassname+"_0","Cell type","Cell type",cellTypeLink);
		thArray[3] = createTableHead("th","hidden",tableid+"_"+ipClassname+"_0","IP","IP (antibody)",ipLink);
		thArray[4] = createTableHead("th","hidden",tableid+"_"+TOEClassname + "_0","Type of experiment","Type of experiment",TOELink);
	
		//insert 5 new headers in the table
		for(var i = 0; i < 5 ; i++){
			seqTable.rows[0].appendChild(thArray[i]);
		}
		
		// create rows
		var tdArray = Array();
		numOfRows = numOfRows - (numOfRows%10);		// the modulus operation and the "+1" in the loop
													// is a bug fix for not inserting input fields in the "Add-10-lines-button"-row
	
		for(var i = 1; i < numOfRows+1 ; i++){				
			//insert refrerence Genome cell
			var tdRefG = document.createElement("TD");
			var inputRefG = document.createElement("input");
			
			createInputSettings(tableid,inputRefG,i,refGenomeClassname);
			//	inputRefG.size = "6";
			tdRefG.appendChild(inputRefG);
			tdArray[0] = tdRefG;
		
			//insert Species cell
			var tdSpe = document.createElement("TD");
			var inputSpe = document.createElement("input");
			createInputSettings(tableid,inputSpe,i,spicesClassname);
			tdSpe.appendChild(inputSpe);
			tdArray[1] = tdSpe;
				
			//insert CellType cell
			var tdCellType = document.createElement("TD");
			var inputCellType = document.createElement("input");
			createInputSettings(tableid,inputCellType,i,cellTypeClassname);
			tdCellType.appendChild(inputCellType);
			tdArray[2] = tdCellType;

			//insert IP cell
			var tdIP = document.createElement("TD");
			var inputIP = document.createElement("input");
			createInputSettings(tableid,inputIP,i,ipClassname);
			//createIPInputSettings(inputIP,i);
			tdIP.appendChild(inputIP);
			tdArray[3] = tdIP;
		
			//insert Type of experiment cell
			var tdTOE = document.createElement("TD");
			var inputTOE = document.createElement("input");
			createInputSettings(tableid,inputTOE,i,TOEClassname);
			tdTOE.appendChild(inputTOE);
			tdArray[4] = tdTOE;
		
			for(var j = 0; j < 5 ; j++){
				seqTable.rows[i].appendChild(tdArray[j]);	// insert each td into the i'ne row
			}
		}
		
		insertBricTableValidation(tableid);
	}
	
	//$('#BricButton').css("border","15px solid red");
	$('#BricButton').hide();
	$('#BricButton1').hide();
}

/*
 * Create table headers with the type, name, value, text and classname, link etc. specifyed in the parameters.
 * (element add'ed to not only create a th - tableheader, but possible to create td etc.)
 */
function createTableHead(element, type, name, value, text, link){
	var th = document.createElement(element);
	var input = document.createElement("input");
	var a = document.createElement("a");
	a.setAttribute("href",link);
	a.setAttribute("target","_blank");
	//Set when click on table go to url:
	//th.setAttribute('onClick', "document.location.href='http://www.google.com';");
	
	input.name = name;
//	input.setAttribute('class', clas);
	
	input.type = type;
	th.appendChild(input);

	if(type == "hidden"){
		var cellText = document.createTextNode(text);
		a.appendChild(cellText);
		th.appendChild(a);
		input.value = value;
	}
		
	return th;
}

/*
 * Add's a new table (or tubetag) - this function is used whenever we need a new tubetag.
 */
function addNewTable(){
	var seqTable = document.getElementById("t");
	var table = document.createElement("TABLE");
	var tbody = document.createElement("TBODY");
	var numOfTables = $('.tableNum').length;
	var id = "t" + ($('.tableNum').length + 1);

	tbody.id = id;
	table.border="1";
	tbody.setAttribute('class', "tableNum");
	
	if(numOfTables < 1){			// first table(tubetag) add'ed
		table.appendChild(tbody);
		seqTable.appendChild(table);
		CreateTableHeader(id);
		append10Rows(id);
	} else {
		var seqTable1 = document.getElementById("t1");
		if (seqTable1.rows[0].cells.length == 7){	// check if the tubetag table is expanded with a bric table.
			table.appendChild(tbody);
			seqTable.appendChild(table);
			CreateTableHeader(id);
			append10Rows(id);
			appendButton("t"+numOfTables);
		} else {
			table.appendChild(tbody);
			seqTable.appendChild(table);
			CreateTableHeader(id);
			expandTable(id);
			append10Rows(id);
			appendButton("t"+numOfTables);
		}
	}
}

