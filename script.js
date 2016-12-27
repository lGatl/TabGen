var cree = function  ( ) {
	nbcol = G("#colonnes").value;
	nblig = G("#lignes").value;

	/*td dans tr*/
	G("#reponse").elthtml({
		tag: "table",
		prop: "#tableau"
	});

	for(var i=0;i<nblig;i++){

		G("#tableau").elthtml({
			tag: "tr",
			prop: "#l"+i
		});


		for(var j=0;j<nbcol;j++){
			G("#l"+i).elthtml({
				tag: "td",
				prop: "#l"+i+"c"+j
			});
				G(("#l"+i+"c"+j)).elthtml({
				tag: "input",

				prop:{
					id: "Cl"+i+"c"+j,
					type: "checkbox",
					onclick: "console.log(this.id)"
					}
			});

		};
	};

};
