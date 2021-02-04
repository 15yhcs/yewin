function visibility() { 
	var x = document.getElementById("Ptype").value;
	if(x === "Volunteer"){
		document.getElementById("PaidAmount").style.visibility = "hidden";
	}
	else{
		document.getElementById("PaidAmount").style.visibility = "visible";
	}
}

