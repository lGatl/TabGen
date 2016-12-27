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
			prop: "#c"+i
		});


		for(var j=0;j<nbcol;j++){
			G("#c"+i).elthtml({
				tag: "td",
				prop: "#c"+i+"l"+j
			});
				G(("#c"+i+"l"+j)).elthtml({
				tag: "input",

				prop:{
					id: "Cc"+i+"l"+j,
					type: "checkbox",
					onclick: "console.log( "+ "Cl"+i+"c"+j+")"
					}
			});

		};
	};

};
