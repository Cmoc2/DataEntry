//shorthand functions//
function DocID(id){ return document.getElementById(id); }
function DocName(name){	return document.getElementsByName(name);}
//*******************//

//toggles
var isAdmit = null; 
var onBlur = true;  //toggle for automatic updating of individual fields


//individual variables
var notes_value = "";
var specialRate_selection = null;
var fileIn = document.getElementById("monkeyCSVInput");
/* Section 1: Pre-Admit / Admit */

//Constants
const Sunday    = 0;
const Monday    = 1;
const Tuesday   = 2;
const Wednesday = 3;
const Thursday  = 4;
const Friday    = 5;
const Saturday  = 6;

//d3 code for dynamic button selections
d3.select("#preAdmitButton")
	.on("click", function(){
		d3.select(this)
            .transition().duration(500)
            .style("background-color", "blue");
        d3.select("#admitButton")
            .transition().duration(500)
            .style("background-color", "grey");
        d3.select("#patientInput")
            .transition().duration(300)
			.style("background-color", "#87CEEB");
        isAdmit = false;
        AdmitCheck();
    });
		
d3.select("#admitButton")
    .on("click", function(){
        d3.select(this)
            .transition().duration(500)
            .style("background-color", "green");
        d3.select("#preAdmitButton")
            .transition().duration(500)
            .style("background-color", "grey");
        d3.select("#patientInput")
            .transition().duration(300)
            .style("background-color", "#3CBC8D");
        isAdmit = true;
        AdmitCheck();
    });

/* Section : Rate Selection*/
d3.select("#socRateButton")
    .on("click", function(){
        d3.select(this)
            .transition().duration(1000)
            .style("background-color", "red");
        d3.select("#socCancelButton")
            .transition().duration(500)
            .style("background-color", "grey");
        d3.select("#specialRateButton")
            .transition().duration(300)
            .style("background-color", "gray");
        d3.select("#specialRateTextid")
            .attr("hidden", true)
        specialRate_selection = "SOC Rate";
        SubmitRate();
    })

d3.select("#socCancelButton")
    .on("click", function(){
        d3.select(this)
            .transition().duration(1000)
            .style("background-color", "red")
            .transition().duration(1000)
            .style("background-color", "grey");
        d3.select("#socRateButton")
            .transition().duration(500)
            .style("background-color", "grey");
        d3.select("#specialRateButton")
            .transition().duration(300)
            .style("background-color", "gray");
        d3.select("#specialRateTextid")
            .attr("hidden", true);
        specialRate_selection = null;
        SubmitRate();
    })

d3.select("#specialRateButton")
    .on("click", function(){
        d3.select(this)
            .transition().duration(1000)
            .style("background-color", "red");
        d3.select("#socCancelButton")
            .transition().duration(500)
            .style("background-color", "grey");
        d3.select("#socRateButton")
            .transition().duration(300)
            .style("background-color", "gray");
        d3.select("#specialRateTextid")
            .transition().duration(500)
            .attr("hidden", null);
        specialRate_selection = "Special Rate";
        SubmitRate();
    })

var fileInData;

function ReadCSV(){
	//if file not csv, alert("File Not Accepted");
	var reader = new FileReader();
	reader.onload = function () {
    	fileInData = reader.result;
    	//parse Text file into CSV Array with D3. Saved in variable.
    	fileInData = d3.csvParse(fileInData);
    };
    // start reading the file. When it is done, calls the onload event defined above.
    // reader.readAsBinaryString(fileInput.files[0]);
    reader.readAsText(fileIn.files[0], 'utf8');
}

function PTCheck(discipline){
		//Add 24hr note if PT
		if(discipline == "PT"){
			DocID("preSpace").innerHTML = '<p class="normalP"> </p>'
			DocID("PTnote").innerHTML = "PLEASE MAKE SURE TO SEE PATIENT WITHIN 24 HOURS"
			DocID("postSpace").innerHTML ='<p style="margin: 0px; padding: 0px; color: #000000; font-family: tahoma; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; word-spacing: 0px; -webkit-text-stroke-width: 0px; widows: 1; font-size: 10pt; word-wrap: break-word;"><span style="font-family: tahoma, arial, helvetica, sans-serif; font-size: 12pt;"> </span></p>'
		} else{
			DocID("preSpace").innerHTML = "";
			DocID("PTnote").innerHTML = '<p style="margin: 0px; padding: 0px; color: #000000; font-family: tahoma; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: bold; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; word-spacing: 0px; -webkit-text-stroke-width: 0px; widows: 1; font-size: 10pt; word-wrap: break-word;"><span style="font-size: 12pt; font-family: tahoma, arial, helvetica, sans-serif; color: #0000ff;" id="PTnote"> </span></p>';
			DocID("postSpace").innerHTML ="";
		}
}
	DocName("Notes")[0].addEventListener("keypress", EnterKey);
	
	function AdmitCheck(){
		switch(isAdmit){
			//if g, SOCDate variable added. Visits always added.
			case true:
				DocID("ifG").innerHTML = 'SoC Date: <input type="text" name="SOCDate" onblur="SubmitSOC()"><br>'
				DocID("isAdmit").innerHTML = '- Frequency: <span id="visits"></span>; Case opened & SOC\'d <span id="SOCDate"></span>'+ '<br>'+ '<span id="Auth"></span>'
				break;
			case false:
				DocID("ifG").innerHTML = '';
				DocID("isAdmit").innerHTML = '- Frequency: <span id="visits"></span>; Patient not yet SOC\'d'+ '<br>'+ '<span id="Auth"></span>'
				break;
			default:
				alert('Admit Color invalid input.');
		}
	}
	
	function SubmitColor(){ //same as admitCheck
		var colorCode = document.querySelector('input[name="AdmitColor"]:checked').value
		
		//"g"= Admitted; "b"= PreAdmit; anything else blank.
		switch(colorCode){
			//if g, SOCDate variable added. Visits always added.
			case "Admitted":
				DocID("ifG").innerHTML = 'SoC Date: <input type="text" name="SOCDate" onblur="SubmitSOC()"><br>'
				DocID("isAdmit").innerHTML = '- Frequency: <span id="visits"></span>; Case opened & SOC\'d <span id="SOCDate"></span>'+ '<br>'+ '<span id="Auth"></span>'
				break;
			case "Pre-Admit":
				DocID("ifG").innerHTML = '';
				DocID("isAdmit").innerHTML = '- Frequency: <span id="visits"></span>; Patient not yet SOC\'d'+ '<br>'+ '<span id="Auth"></span>'
				break;
			default:
				alert('Admit Color invalid input.');
		}
		SubmitAuthorization();
		return colorCode;
	}
	function SubmitPatientName(){
		//Path A: Devero ID
		if(Number.isInteger(Number(DocName("Patient")[0].value))){
			var a = ParseDeveroID(fileInData, Number(DocName("Patient")[0].value));
			//On Match Found:
			if(a != null){
				DocID("patientInputCode").innerHTML = "<green>Match Found.</green>";
				console.log(a);
				DocID("patientName").innerHTML = a.Patient;
				//DocID("test").innerHTML = "Please report to " + Find_Branch(a) + ".";
				if(a["Care Coordinator"] == "") DocID("patientInputCode").innerHTML += "<red> Verify CC.</red>"
				DocID("test").innerHTML = "Please report to " + a["Care Coordinator"] + ".";
			} else{
				console.error("Devero ID Match Not Found.")
				DocID("patientInputCode").innerHTML = "<red> Match Not Found.</red>";
			}

		}
		//Path B: Patient Name
		else{ 
			DocID("patientInputCode").innerHTML = "";
			DocID("patientName").innerHTML = DocName("Patient")[0].value;
		}
	}
	function SubmitDiscipline(){
		PTCheck(document.querySelector('input[name="Discipline"]:checked').value);
		DocID("discipline").innerHTML = document.querySelector('input[name="Discipline"]:checked').value;
	}
	function SubmitOrder(){
		
		var x ="";
		
		for(i=1; i < (DocName("Order").length-1); i++){
			if(DocName("Order")[i].checked == true){
				x += DocName("Order")[i].value;
			}
		}
		x += " " + DocName("Order")[DocName("Order").length-1].value;
		
		DocID("order").innerHTML = x;
		return x;
	}
	function SubmitVisits(){
		DocID("visits").innerHTML = DocName("Visits")[0].value;
	}
	function SubmitSOC(){
		DocID("SOCDate").innerHTML = DocName("SOCDate")[0].value;
	}
	function SubmitAuthorization(){
		document.getElementById("Auth").innerHTML = (DocName("Auth")[1].value =="" || DocName("Auth")[0].value == ""? " ": '- Authorized from ' + document.getElementsByName("Auth")[0].value + ' until ' + document.getElementsByName("Auth")[1].value);
	}
	function SubmitNotes(){
        if(onBlur==false){} else{
            DocID("notes").innerHTML = DocName("Notes")[0].value;
            SubmitRate();
        }
    }
	function SubmitRecipient(){
		DocID("recipient").innerHTML = DocName("Recipient")[0].value;
	}
	function SubmitRate(){
        switch(specialRate_selection){
            case "SOC Rate":
                DocID("notes").innerHTML = DocName("Notes")[0].value;
                DocID("notes").innerHTML += "<br> <span style='color: red;' >" + specialRate_selection + "</span>";
                break;
            case null:
                DocID("notes").innerHTML = DocName("Notes")[0].value;
                break;
            case "Special Rate":
                DocID("notes").innerHTML = DocName("Notes")[0].value;
                DocID("notes").innerHTML += "<br> <span style='color: red;' >" + DocID("specialRateTextid").value + "</span>";
                break;
        }
	}
	
	function SubmitAll(){
        if(isAdmit==null)alert("Select Admittion Status.")
        onBlur = true;
		SubmitPatientName();
		SubmitDiscipline();
		SubmitOrder();
		//SubmitVisits must be done after SubmitColor(id 'visit' & 'Auth' gets placed)
		SubmitVisits();
		SubmitAuthorization();
		SubmitNotes();
		SubmitRate();
		SubmitRecipient();

		//add functionality for clipboard.js
	}

/*Helper Functions*/
function EnterKey(event){ //function to add a new line into the notes section.
	console.log(event.keyCode);
	if(event.keyCode == 13) DocName("Notes")[0].value += "<br>";
}

function ParseDeveroID(data, monkeyInput){
	console.log(monkeyInput);
	var x = null;
	for(var i = 0; i < data.length; i++){
		if(Number(data[i]["MR#"]) == monkeyInput){
			console.log("Match Found.");
			return data[i];
		}
	}
	return null;
}

function LA_Coordinator(x){
	var referralDate = new Date(x["Referral Date"]);

	switch(referralDate.getDay()){
		case Sunday:
		case Thursday:
			return "Darwin";
			break;
		case Monday:
		case Friday:
		case Saturday:
			return "Marissa";
			break;
		case Tuesday:
		case Wednesday:
			return "Klarizza";
			break;
		default: 
			alert("Some Kind of error in function LA_Coordinator");
			return "";
	}
}

function BP_Coordinator(x){
	var referralDate = new Date(x["Referral Date"]);
	
	//if the referral Date is between "Since beginning" and Oct 1, 2018
	/*if(Date.parse(referralDate) < Date.parse(Date(10/01/2018))){
		BP_Coordinator_until_20181001(x);
	} else{
	//else do what is current:*/
		switch(referralDate.getDay()){
			case Saturday:
			case Sunday:
			case Tuesday:
			case Thursday:
				return "Angela";
				break;
			case Monday:
			case Wednesday:
			case Friday:
				return "Gladys";
				break;
			default: 
				alert("Some Kind of error in function BP_Coordinator");
				console.error("Error in function BP_Coordinator");
				console.error(referralDate);
				return "";
		}
	//}
}

function Find_Branch(x){
	/*
	Will need to add a timeline: CC/week do change, so our referrals need to change on CC Updates.
	*/
	switch(x.Team){
		case "COM KP Panorama":
		case "COM KP Woodland Hills":
			return "Andrea Aquino";
			break;
		case "COM KP Los Angeles":
			return LA_Coordinator(x);
			break;
		case "COM KP Baldwin Park":
			return BP_Coordinator(x);
			break;
		case "COM KP South Bay":
			return "Jann";
			break;
		case "COM KP Fontana":
			return "Marcela";
			break;
		case "COM KP Downey":
			return "Catherine";
			break;
		case "COM Caremore":
			return "Jovana"
			break;
		default:
			alert("Some Kind of Error in function Find_Branch");
			console.error("Error in function Find_Branch");
			console.log(x.Team);
			return "";
	}
}



function BP_Coordinator_until_20181001(x){
	var referralDate = new Date(x["Referral Date"]);

	switch(referralDate.getDay()){
		case Saturday:
		case Sunday:
			return "Massiel";
			break;
		case Monday:
		case Wednesday:
		case Friday:
			return "Gladys";
			break;
		case Tuesday:
		case Thursday:
			return "Andrea";
			break;
		default: 
			alert("Some Kind of error in function BP_Coordinator_until_20181001");
			console.error("Error in function BP_Coordinator_until_20181001.");
			console.error(referralDate);
			return "";
	}
}

new ClipboardJS('.copyTrigger');