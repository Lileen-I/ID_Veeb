const dateFormattedET = function(){
	let timeNow = new Date();
	const monthNamesET = ["jaanuar", "veebruar", "mÃ¤rts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
	return timeNow.getDate() + ". " + monthNamesET[timeNow.getMonth()] + " " + timeNow.getFullYear();
}

const weekDayET = function(){
	let timeNow = new Date();
	const weekdayNamesEt = ["pÃ¼hapÃ¤ev", "esmaspÃ¤ev", "teisipÃ¤ev", "kolmapÃ¤ev", "neljapÃ¤ev", "reede", "laupÃ¤ev"];
	return weekdayNamesEt[timeNow.getDay()];
}

const timeNowFormattedET = function(){
	let timeNow = new Date();
	return timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds();
}

module.exports = {longDate: dateFormattedET, weekDay: weekDayET, time: timeNowFormattedET};