function visibility() { 
	var x = document.getElementById("repeat_status").value;
    console.log(x);
	if(x === "Yes"){
		document.getElementById("r_dr").style.visibility = "visible";
        document.getElementById("r_da").style.visibility = "visible";
	}
	else{
		document.getElementById("r_dr").style.visibility = "hidden";
        document.getElementById("r_da").style.visibility = "hidden";
	}
}