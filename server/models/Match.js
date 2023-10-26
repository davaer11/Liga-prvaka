const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
	team1: {
		type: String,
		required: true,
	},
	team2: {
		type: String,
		required: true,
	},
	result: {
		type: String,
	},
	round: {
		type: Number,
		default: -1, //-1 znači da nije utakmica kola već završnice turnira
	},
});

const Match = mongoose.model('Match', MatchSchema);
module.exports = { Match, MatchSchema };

//KOMENTAR:
//utakmice trebaju još imati atribut kola koji je opcionalan tj. ako je utakmica u prvih 6 kola treba pisat koje je kolo, ako nije onda je utakmica završnice turnira (to kasnije)
//tako će se svako kolo izvlačit utakmice i na clientu prikazivat samo za to kolo (korisnik će moć mijenjat ono što je stisnuo do npr. 1h prije utakmice )
//utakmice također imaju rezultat koji se upisuje nakon svakog kola za svaku utakmicu - taj rezultat se uspoređuje s onim što je korisnik stisnuo i temeljem točnih odgovora dodjeljuju
//se bodovi korisniku

//što se tiče inicijalne forme -> korisnik bi trebao nju moć mijenjat dok ne počne prvo kolo natjecanja
