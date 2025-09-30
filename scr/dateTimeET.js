function dateFormattedET (){
	let timeNow = new Date();	
	let hourNow = timeNow.getHours();
	let minuteNow = timeNow.getMinutes();
	let secondNow = timeNow.getSeconds();
	let dateNow = timeNow.getDate();
	let dayNow = timeNow.getDay();
	let monthNow = timeNow.getMonth();
	let yearNow = timeNow.getFullYear();
	const dayNameET = ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];
	const monthNamesET = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
	//console.log(timeNow);
	//console.log ("täna on" + " " + dateNow + "." + + (monthNow + 1) + "." + (yearNow));
	console.log ("Täna on" + " " + dayNameET[dayNow] + " "+ dateNow + "." + monthNamesET[monthNow] + " " + yearNow);
	console.log ("Kell" + " " + hourNow + ":" + minuteNow + ":" + secondNow) 
	
}	

dateFormattedET();