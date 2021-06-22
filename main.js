// SETOVANJE VARIJABLI

let row = document.querySelector(".row");
let my_form_div = document.querySelector(".my_form");
let inputs = document.querySelector(".inputs");
var db = []; /*Nasa baza podataka */
var person = {}; /*Jedan objekat za obou koji cemo pusovati u bazu */
let counter = 0; /*Brojac... ne znam da li sam ga na kraju koristion */
//Buttoni za eventove
let add_skill = document.querySelector(".add_skill");
let add_person = document.querySelector("button.btn");
let remove_skill = document.querySelector(".remove_skill");

// DODAVANJE EVENTOVA
add_person.addEventListener("click", dodajKartu);
add_skill.addEventListener("click", dodajSkill);
remove_skill.addEventListener("click", removeSkill);

function dodajKartu() {
	var input =
		document.querySelectorAll(
			"input"
		); /*Input je deklarisan ovde kako bi mogao da se updatuje */
	let job; /*  */
	let name;
	let newSkills = []; /* niz za skilove koje cemo da dodajemo u objekat */
	let skill; /*Key za skilove koje cemo da dodajemo u objekat */

	for (let i = 0; i < input.length; i++) {
		/*Imamo puno inputa pa moramo da vidimo koliko ih ima  */
		let key =
			input[i].getAttribute(
				"name"
			); /*od svakog inputa uzimam attribut name i stavljam ga u varijablju key */

		if (key === "name") {
			/*proveravam da kako se zove atribut name i ako je jedan od ova tri izvrsavam if */
			name = input[i].value;
		} else if (key === "job") {
			job = input[i].value;
		} else {
			skill = input[i].value;
			newSkills.push(
				skill
			); /*Ovde moram i da pushujem skilove koje smo pokupili */
		}
		console.log(newSkills);
	}
	console.log(`${name} , ${job}, ${newSkills}`);
	person = {
		/*popunjavam objekat koji cu posle da gurnem u DB */ name: name,
		job: job,
		skills: newSkills,
	};
	db.push(person); /*Guram objekat person u DB niz */

	counter++; /*Evo ga counter i njega sam povecao za jedan to ce nam posle trebati da se ne bi uvek ispisivala cela DB */

	dodajOsobu(
		counter
	); /* pokrecem funkcije dodaj osobu i input reset (da mi se izbrisu svi unosi) */
	inputReset(input);
}

function dodajOsobu(counter) {
	let index =
		counter -
		1; /* uzimam counter i smanjujem ga za jedan da mi odgovara indexu u DB-u */
	console.log("Baza Podataka", db[index]);

	napraviKarticu(
		index
	); /*Pokrecem funkciju za pravljenje kartice i dajem joj index kako bi napravila karticu sa tim indexom */
}

function napraviKarticu(index) {
	let card = document.createElement("div"); /*pravi - imenuj - stavi */
	card.className = "card";

	let header = document.createElement("div");
	header.className = "card_header";
	header.innerHTML = `<h2>${db[index].name}</h2>`; /*iz baze uzimam samo clana niza koji se poklapa sa indexom kako bi se samo on izlistao */
	let body = document.createElement("div");
	body.className = "card_body";
	body.innerHTML = `<h3>${db[index].job}</h3>`;
	let footer = document.createElement("div");
	footer.className = "card_footer";
	skills = db[index].skills;

	row.appendChild(card);
	card.appendChild(header);
	card.appendChild(body);
	card.appendChild(footer);

	skills.forEach((skill) => {
		/*prolazim kroz sve skilove i svaki stavljam u a sa ti textom */
		let my_skill = document.createElement("a");
		my_skill.className = "btn";
		my_skill.innerHTML = `${skill}`;
		footer.appendChild(my_skill);
		console.log(my_skill);
	});
}

function dodajSkill() {
	/*Klikom na gumb dodajem label i input za skillove */
	let label = document.createElement("label");
	label.innerHTML = "Skill: ";
	label.setAttribute("for", "skills");
	let input = document.createElement("input");
	input.setAttribute("type", "text");
	input.setAttribute("name", "skills");
	input.setAttribute("placeholder", "Your skill");

	label.appendChild(input);
	inputs.appendChild(
		label
	); /*Ovde je input kao neki objekt i u njemu bi trebali da budu svi input ali nisam siguran to mozemo pitati */
	console.log(typeof inputs);
}

function removeSkill() {
	/* */
	let skill_inputi =
		inputs.lastChild; /*Iz inputs uzimam samo poslenje napravljeno dete */
	if (skill_inputi.getAttribute("for") === "skills") {
		/*Proveravam da li poslednje dete ima atribut for koji se zove skills */
		inputs.removeChild(skill_inputi); /*dajem dete na usvajanje */
	}
}

function inputReset(input) {
	/*Uzimam sve trenutne inpute i brisem im value */
	input.forEach((inp) => {
		console.log("FUNKCIJA RESET", inp);
		inp.value = "";
	});
}
