/* This javascript file contains (readonly) variables
 * Change this file if you need to add/change error messsage, list etc.
 *
 */

//PI person contacts
var PIList = {	
		"Anders Krogh" : "krogh @ binf.ku.dk",
		"Anders Lund" : "Anders.Lund @ bric.ku.dk",
		"Albin Sandelin" : "albin @ binf.ku.dk",
		"Bo Porse" : "bo.porse @ bric.ku.dk",
		"Claus Soerensen" : "Claus.storgaard @ bric.ku.dk",
		"Eske Willerslev" : "ewillerslev @ snm.ku.dk",
		"Jeppe Vinther" : "jvinther @ bio.ku.dk",
		"Kristian Helin" : "Kristian.Helin @ bric.ku.dk",
		"Kurt Kjaer" : "kurtk @ snm.ku.dk",
		"Klaus Hansen" : "Klaus.Hansen @ bric.ku.dk",
		"Ludovic Orlando" : "lorlando @ snm.ku.dk",
		"Morten Froedin" : "Morten.Frodin @ bric.ku.dk",
		"Soeren Soerensen" : "sjs @ bio.ku.dk",
		"Tom Gilbert" : "tgilbert @ snm.ku.dk"
	};
	
	var tubeTagList = {	
		"Anders Krogh" : "ANK",
		"Anders Lund" : "ANL",
		"Albin Sandelin" : "ALS",
		"Bo Porse" : "BOP",
		"Claus Soerensen" : "CLS",
		"Eske Willerslev" : "ESW",
		"Jeppe Vinther" : "JEV",
		"Kristian Helin" : "KRH",
		"Kurt Kjaer" : "KUK",
		"Klaus Hansen" : "KLH",
		"Ludovic Orlando" : "LUO",
		"Morten Froedin" : "MOF",
		"Soeren Soerensen" : "SOS",
		"Tom Gilbert" : "TOG"
	};
	
//Table variables:
	var concentrationMin = 0.5; 
	var concentrationMax = 100;
	var AverageLibInsMin = 30; 
	var AverageLibInsMax = 650;
	
	//Add runtype min and max

//Table class names
	var tubeTagClassname = "tubeTag";
	var sampleIdClassname = "sampleId";
	var concentrationClassname = "concentration";
	var averageLibClassname = "aveLibIns";
	var indexSeqClassname = "indexSeq";
	var indexNameClassname = "indexName";
	var projectNameClassname = "ProjectName";
	
	var refGenomeClassname = "refgenome";
	var spicesClassname = "species";
	var cellTypeClassname = "CellType";
	var ipClassname = "IP";
	var TOEClassname = "TOE";

	// Table list:
	$indexSequenceList = ["a", "b", "c"]
	
	$refgenomeList = ["hg19","hg18","mm9","mm10","rn5","rn4","dm3","ce6","ce10","sacCer3"]
	$speciesList = ["human","mouse","rat"]
	$cellTypeList = ["ESC","E14","NPC","Fibroblast","LSK","NB4","HL60"]
	$IPList = ["IgG"]
	$TOEList = ["ChiP","DIP","RNA","shRNA","Exome","Genome"]
	
//wiki Links
	var dateLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_date";
	var BilltoLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_billto";
	var LPLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_labperson";
	var BPLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_bioperson";
	var PILink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_pi";
	var addInfoLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_addinfo";
	var runtypeLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_runtype";
	var phixLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_phix";
	var seqLibLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_seqLib";
	var leftoversLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_leftovers";
	var custSeqLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_custSeq";

	var tubeTagLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_tubetag";
	var simpleIdLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_sampleid";
	var concentrationLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_concentration";
	var averageLibLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_averageLib";
	var indexSeqLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_indexSeq";
	var indexNameLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_indexName";
	var projectNameLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_projectName";
	
	var refGenomeLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_refGenome";
	var speciesLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_species";
	var cellTypeLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_cellType";
	var ipLink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_ip";
	var TOELink = "https://wiki.dna.ku.dk/dokuwiki/doku.php?id=orderform_typeofexperiment";

//Error msg:
	var labPNerr = "Lab person name must be filled out";
	var labPMerr = "Lab person mail must be filled out or not a valid email";
	var labPPerr = "Lab person phone must be filled out";
	var bioPNerr = "Bioinformatics person name must be filled out";
	var bioPMerr = "Bioinformatics person mail must be filled out or not a valid email";
	var pierr = "You havn't select any PI";
	var billToerr = "Bill To must be filled out";
	var CVROrEANerr = "Need to specify either CVR or EAN information.";
	var interr = "Have to specify a number";
	var doublerr = "Have to specify a number";
	var runtypeerr = "Need to specify one runtype";
	// err msg for numberbetween is in validate.js file!
