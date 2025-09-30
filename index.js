const express = require("express");
const fs = require("fs");
const dateEt = require("./src/dateTimeET")
const bodyparser = require("body-parser");
//me loome objekti, mis ongi express.js_i programm ja edasi kasutame seda
const app = express();
//määrame renderdajaks ejs
app.set("view engine", "ejs");
//määrame kasutamiseks avaliku kataloogi
app.use(express.static("public"));
//päringu urli parsiine, eraldame post osa. False kui ainult tekst, true kui muud infot Kahjuks
app.use(bodyparser.urlencoded({extended: false}));


app.get("/", (req, res)=>{
	//res.send("Express.js läks edukalt käima!!")
	res.render("index");
});

app.get("/timenow", (req, res)=>{
	res.render("timenow", {nowDate: dateEt.longDate(), nowWd: dateEt.weekDay()});
});

app.get("/vanasonad", (req, res)=>{
	let folkWisdom = [];
		fs.readFile("public/txt/vanasonad.txt", "utf8", (err, data)=>{
	    if(err){
		    res.render("genericlist", {heading: "Valik Eesti tuntud Vanasõnasid", listData: ["Kahjuks vanasõnadi eksisid ära :("]});
		} else {
			folkWisdom = data.split(";");
			res.render("genericlist", {heading: "Valik Eesti tuntud vanasõnasid", listData: folkWisdom});
		}
	});
	
});

app.get("/regvisit", (req, res)=>{
	res.render("regvisit");
});

app.post("/regvisit", (req, res)=>{
	console.log(req.body);
	//avan tekstifaili kirjutamiseks sellisel moel, et kui teda pole, luuakse (parameeter "a")
	fs.open("public/txt/visitlog.txt", "a", (err, file)=>{
		if(err){
			throw(err);
		}
		else {
			//faili senisele sisule lisamine
			fs.appendFile("public/txt/visitlog.txt", req.body.nameInput + "; ", (err)=>{
				if(err){
					throw(err);
				}
				else {
					console.log("Salvestatud!");
					res.render("regvisit");
				}
			});
		}
	});
});

app.listen(5214);