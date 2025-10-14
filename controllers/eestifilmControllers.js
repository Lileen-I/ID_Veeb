const mysql = require("mysql2/promise");
const dbInfo = require("../../../vp2025config");

const dbConf = {
	host: dbInfo.configData.host, 
	user: dbInfo.configData.user,
	password: dbInfo.configData.passWord,
	database: dbInfo.configData.dataBase 
};

//@desc home page for estonian film section
//@route GET /eestifilm
//@access pubic

const filmHomePage = (req, res)=>{
	res.render("eestifilm");
};

//@desc page for list of people involved in the estonian film industry
//@route GET /eestifilm/inimesed
//@access pubic

const filmPeople = async (req, res)=>{
	let conn;
	const sqlReq = "SELECT * FROM person"
	try {
		conn = await mysql.createConnection(dbConf);
		console.log("andmebaasiühendus loodud!");
		const [rows, fields] = await conn.execute(sqlReq);
		res.render("filmiinimesed", {personList: rows});
	}
	catch(err) {
		console.log("Viga: " + err);
		res.render("filmiinimesed", {personList: []});
	}
	finally {
		if(conn){
			await conn.end();
			console.log("Andmebaasiühendus suletud! ;)")
		}
	}
};
	
//@desc page for adding to the list of people involved in the estonian film industry
//@route GET /eestifilm/inimesed_add
//@access pubic

const filmPeoplAdd = (req, res)=>{
	res.render("filmiinimesed_add", {notice: "Ootan sisestust!"});
};

//@desc page for adding to the list of people involved in the estonian film industry
//@route POST /eestifilm/inimesed_add
//@access pubic

const filmPeopleAddPost = async (req, res)=>{
	let conn;
	let sqlReq = "INSERT INTO person (first_name, last_name, born, deceased) VALUES (?,?,?,?)";
	
	// Kas andmed on olemas?
	if(!req.body.firstNameInput || !req.body.lastNameInput || !req.body.bornInput || req.body.bornInput > new Date()){
		res.render("filmiinimesed_add", {notice: "Andmed on vigased! Vaata üle!" + req.body});
		return;
	}
	else {
		try {
			conn = await mysql.createConnection(dbConf);
			console.log("andmebaasiühendus loodud!");
			if(req.body.deceasedInput != ""){
				deceasedDate = req.body.deceasedInput
			}
			const [result] = await conn.execute(sqlReq, [req.body.firstNameInput, req.body.lastNameInput, req.body.bornInput, deceasedDate]);
			console.log("Salvestati kirje id: " + result.insert) 
		}
	catch(err) {
		console.log("Viga: " + err);
		res.render("filmiinimesed_add", {notice: "Tekkis viga" + err});
	}
	finally {
		if(conn){
			await conn.end();
			console.log("Andmebaasiühendus suletud! ;)")
		}
	}
};

//@desc page of estonian film industry peoples positions
//@route GET /eestifilm/ametid
//@access pubic	

const filmPosition = (req, res)=>{
	const sqlReq = "SELECT * FROM position";
	conn.execute(sqlReq, (err, sqlRes)=>{
		if(err){
			console.log(err);
			res.render("filmiametid", {positionList: []});
		}
		else {
			console.log(sqlRes);
			res.render("filmiametid", {positionList: sqlRes});
		}
		
	});
};

//@desc page adding to the list of estonian film industry peoples positions
//@route GET /eestifilm/ametid_add
//@access pubic

const filmPositionAdd = (req, res)=>{
	res.render("filmiametid_add", {notice: "Ootan sisestust!"});
};

//@desc page adding to the list of estonian film industry peoples positions
//@route POST /eestifilm/ametid_add
//@access pubic

const filmPositionAddPost = (req, res)=>{
	console.log(req.body);
	//kas andmed on olemas?
	if(!req.body.positionNameInput){
		res.render("filmiametid_add", {notice: "Palun kirjuta ameti nimetus!"});
	}
	else {
		let positionDescription = null;
		if(req.body.positionDescriptionInput != ""){
			positionDescription = req.body.positionDescriptionInput;
		}
		let sqlReq = "INSERT INTO `position` (position_name, description) VALUES (?,?)";
		conn.execute(sqlReq, [req.body.positionNameInput, positionDescription], (err, sqlRes)=>{
			if(err){
				res.render("filmiametid_add", {notice: "Tekkis tehniline viga:" + err});
			}
			else {
				//res.render("filmiametid_add", {notice: "Andmed on salvestatud!"});
				res.redirect("/eestifilm/ametid");
			}
		});
	}
};

module.exports = {
	filmHomePage,
	filmPeople,
	filmPeopleAdd,
	filmPeopleAddPost,
	filmPosition,
	filmPositionAdd,
	filmPositionAddPost
};