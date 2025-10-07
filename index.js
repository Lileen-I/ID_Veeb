const express = require("express");
const fs = require("fs");
const dateEt = require("./src/dateTimeET")
const bodyparser = require("body-parser");
//me loome objekti, mis ongi express.js_i programm ja edasi kasutame seda
const app = express();
const moment = require('moment');
const FormattedDate1 = moment().format('MMMM Do YYYY, h:mm:ss a');
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
	const firstName = req.body.firstNameInput;
	const lastName = req.body.lastNameInput;
	const fullName = `${firstName} ${lastName}`;

	fs.open("public/txt/visitlog.txt", "a", (err, file)=>{
		if(err){
			throw(err);
		} else {
			fs.appendFile(
				"public/txt/visitlog.txt",
				`${fullName} , külastas ${FormattedDate1}; `,
				(err)=>{
					if(err){
						throw(err);
					} else {
						console.log("Salvestatud!");
						res.render("visitregistered", { name: fullName });
					}
				}
			);
		}
	});
});

app.get("/visitlog", (req, res)=>{
	let visitlog = [];
		fs.readFile("public/txt/visitlog.txt", "utf8", (err, data)=>{
	    if(err){
		    res.render("genericlist", {heading: "Mind on külastanud", listData: ["Kahjuks ei ole näha nimesi :("]});
		} else {
			let tempListData
			for(let i = 0; i < visitlog.length - 1; i++){
				listData.push(tempListData[i]);
			}
			visitlog = data.split(";");
			res.render("genericlist", {heading: "Meie külalised", listData: visitlog});
		}
	});
	
});

app.listen(5214);