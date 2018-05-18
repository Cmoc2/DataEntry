var saveSOCday;
var isAdmit = null;
	//shorthand functions//
	function DocID(id){ return document.getElementById(id); }
	function DocName(name){	return document.getElementsByName(name);}
	//*******************//

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
		
	function PTCheck(discipline){
		//Add 24hr note if PT
		if(discipline == "PT"){
			DocID("preSpace").innerHTML = '<p style="margin: 0px; padding: 0px; color: #000000; font-family: tahoma; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; word-spacing: 0px; -webkit-text-stroke-width: 0px; widows: 1; font-size: 10pt; word-wrap: break-word;"><span style="font-family: tahoma, arial, helvetica, sans-serif; font-size: 12pt;"> </span></p>'
			DocID("PTnote").innerHTML = "PLEASE MAKE SURE TO SEE PATIENT WITHIN 24 HOURS"
			DocID("postSpace").innerHTML ='<p style="margin: 0px; padding: 0px; color: #000000; font-family: tahoma; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; word-spacing: 0px; -webkit-text-stroke-width: 0px; widows: 1; font-size: 10pt; word-wrap: break-word;"><span style="font-family: tahoma, arial, helvetica, sans-serif; font-size: 12pt;"> </span></p>'
		} else{
			DocID("preSpace").innerHTML = "";
			DocID("PTnote").innerHTML = '<p style="margin: 0px; padding: 0px; color: #000000; font-family: tahoma; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: bold; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; word-spacing: 0px; -webkit-text-stroke-width: 0px; widows: 1; font-size: 10pt; word-wrap: break-word;"><span style="font-size: 12pt; font-family: tahoma, arial, helvetica, sans-serif; color: #0000ff;" id="PTnote"> </span></p>';
			DocID("postSpace").innerHTML ="";
		}
	}
	DocName("Notes")[0].addEventListener("keypress", EnterKey);
	
	//function to add a new line into the notes section.
	function EnterKey(event){
		console.log(event.keyCode);
		if(event.keyCode == 13) DocName("Notes")[0].value += "<br>";
	}
	
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
		DocID("patientName").innerHTML = DocName("Patient")[0].value;
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
		saveSOCday = DocName("SOCDate")[0].value;
	}
	function SubmitAuthorization(){
		document.getElementById("Auth").innerHTML = (DocName("Auth")[1].value =="" || DocName("Auth")[0].value == ""? " ": '- Authorized from ' + document.getElementsByName("Auth")[0].value + ' until ' + document.getElementsByName("Auth")[1].value);
	}
	function SubmitNotes(){
		DocID("notes").innerHTML = DocName("Notes")[0].value;
		if(DocName("SpecialRate")[0].checked == true)DocID("notes").innerHTML += "<br> <span style='color: red;' >" + DocName("SpecialRate")[0].value + "</span>";
	}
	
	function SubmitRecipient(){
		DocID("recipient").innerHTML = DocName("Recipient")[0].value;
	}
	function SpecialRate(){
		if(DocName("SpecialRate")[0].checked == true){
			DocID("notes").innerHTML = DocName("Notes")[0].value;
			DocID("notes").innerHTML += "<br> <span style='color: red;' >" + DocName("SpecialRate")[0].value + "</span>";
		} else SubmitNotes();
	}
	
	function SubmitAll(){
		SubmitPatientName();
		SubmitDiscipline();
		SubmitOrder();
		//SubmitVisits must be done after SubmitColor(id 'visit' & 'Auth' gets placed)
		SubmitVisits();
		SubmitAuthorization();
		SubmitNotes();
		SpecialRate();
		SubmitRecipient();
	}