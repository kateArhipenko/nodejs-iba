var express = require('express'),
	bodyPareser = require('body-parser'),
	app = express();

app.use(bodyPareser.urlencoded({ extended: true }));
app.use(bodyPareser.json());

var HEROES = [
	{ 
    id: 1,
    name: 'Example1',
    score: 20
  },
  { 
    id: 11, 
    name: 'Example2',
    score: 11
  },
  { 
    id: 12, 
    name: 'Example3',
    score: 12
  },
  { 
    id: 13, 
    name: 'Example4',
    score: 13 
  },
  { id: 14, 
    name: 'Example5',
    score: 14 
  },
  { 
    id: 15, 
    name: 'Example6',
    score: 16 
  },
  { 
    id: 16, 
    name: 'Example7',
    score: 17
  },
  { 
    id: 17, 
    name: 'Example8',
    score: 18
  }
]

app.get("/", function(req, res) {
	var heroes = HEROES.sort(function(hero1, hero2) {
    return hero2.score - hero1.score
  }).slice(0,4);
  res.json(heroes)
	// res.render('dashboard.ejs', { heroes: heroes });
});

app.get("/dashboard", function(req, res) {
	var heroes = HEROES.sort(function(hero1, hero2) {
    return hero2.score - hero1.score
  }).slice(0,4);
  res.json(heroes)
	//res.render('dashboard.ejs', { heroes: heroes });
});

app.get("/heroes", function(req, res) {
  res.json(HEROES)
	//res.render('heroes.ejs', { heroes: HEROES });
});

app.get("/heroes/:id", function(req, res) {
	var id = req.params.id;
	var hero;
	for (var i = 0; i < HEROES.length; i++) {
		if(Number(id) === HEROES[i].id) {
			hero = HEROES[i];
		}
	}
	res.json(hero)	
	// res.render("hero-detail.ejs", { hero: hero });
});


app.get("/create", function(req, res) {
	res.render("hero-form.ejs");
})

app.post("/create", function(req, res) {
	var name = req.body.name,
			score = Number(req.body.score),
			id = (HEROES[HEROES.length - 1].id + 1);

	HEROES.push({
		id: id,
		name: name,
		score: score
	});
	res.redirect("/heroes")
})

app.listen(3000, function() {
	console.log("Server start");
});
