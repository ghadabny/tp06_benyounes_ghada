
exports.get = (req, res) => {
        const catalogue = [
            { ref: "X001", titre: "Le Parrain", prix: 10 },
            { ref: "X002", titre: "Forrest Gump", prix: 11 },
            { ref: "X003", titre: "Inception", prix: 12 },
            { ref: "X004", titre: "Matrix", prix: 13 },
            { ref: "X005", titre: "Le Seigneur des Anneaux", prix: 14 },
            { ref: "X006", titre: "Interstellar", prix: 15 },
            { ref: "X007", titre: "Titanic", prix: 16 },
            { ref: "X008", titre: "Gladiator", prix: 17 },
            { ref: "X009", titre: "Le Silence des Agneaux", prix: 18 },
            { ref: "X010", titre: "Jurassic Park", prix: 19 },
            { ref: "X011", titre: "La Liste de Schindler", prix: 20 },
            { ref: "X012", titre: "Fight Club", prix: 21 },
            { ref: "X013", titre: "Pulp Fiction", prix: 22 },
            { ref: "X014", titre: "The Dark Knight", prix: 23 },
            { ref: "X015", titre: "Star Wars", prix: 24 },
            { ref: "X016", titre: "Avatar", prix: 25 },
            { ref: "X017", titre: "Le Roi Lion", prix: 26 },
            { ref: "X018", titre: "Braveheart", prix: 27 },
            { ref: "X019", titre: "Toy Story", prix: 28 },
            { ref: "X020", titre: "Les Évadés", prix: 29 }
		];
		
    	
	res.setHeader('Content-Type', 'application/json');
      
    res.send(catalogue);
   };    

exports.optionsCatalogue = (req, res) => {
    res.setHeader('Access-Control-Max-Age', 600);
    // Ajouter d'autres en-têtes si nécessaire
    res.send();
};

// hello.js
exports.hello = (req, res) => {
    let responseObj = { nom: req.params.name };
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(responseObj));
};

exports.getSearchCatalogue = (req, res) => {
    console.log("Requête reçue avec le paramètre : ", req.query.filtre);
    const filtre = req.query.filtre; 
    const catalogue = 
    [   
        { ref: "X001", titre: "Le Parrain", prix: 10 },
        { ref: "X002", titre: "Forrest Gump", prix: 11 },
        { ref: "X003", titre: "Inception", prix: 12 },
        { ref: "X004", titre: "Matrix", prix: 13 },
        { ref: "X005", titre: "Le Seigneur des Anneaux", prix: 14 },
        { ref: "X006", titre: "Interstellar", prix: 15 },
        { ref: "X007", titre: "Titanic", prix: 16 },
        { ref: "X008", titre: "Gladiator", prix: 17 },
        { ref: "X009", titre: "Le Silence des Agneaux", prix: 18 },
        { ref: "X010", titre: "Jurassic Park", prix: 19 },
        { ref: "X011", titre: "La Liste de Schindler", prix: 20 },
        { ref: "X012", titre: "Fight Club", prix: 21 },
        { ref: "X013", titre: "Pulp Fiction", prix: 22 },
        { ref: "X014", titre: "The Dark Knight", prix: 23 },
        { ref: "X015", titre: "Star Wars", prix: 24 },
        { ref: "X016", titre: "Avatar", prix: 25 },
        { ref: "X017", titre: "Le Roi Lion", prix: 26 },
        { ref: "X018", titre: "Braveheart", prix: 27 },
        { ref: "X019", titre: "Toy Story", prix: 28 },
        { ref: "X020", titre: "Les Évadés", prix: 29 }
    ];

    let data = filtre ? catalogue.filter(obj => obj.titre.toLowerCase().includes(filtre.toLowerCase())) : catalogue;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
};


