var G = function(arg) {
	try {
		var element;
		var elements = [];
		var StringEnObjet = function(arg) {
			var premCaractere = arg.substring(0, 1);
			var reste = arg.substring(1, arg.length),
				tout = arg;

			var arg = {};
			premCaractere == "#" ? arg = {
					id: reste
				} :
				premCaractere == "." ? arg = {
					class: reste
				} :
				premCaractere == "@" ? arg = {
					href: reste
				} :
				arg = {
					tag: tout
				};
			return arg;
		};

		var selection = function(arg) {
			var select, selects = [];

			var k = Object.keys(arg)[0];
			var v = Object.values(arg)[0];

			(k === "id") ? select = document.getElementById(v):
				(k === "class") ? select = document.getElementsByClassName(v) :
				(k === "tag") ? select = document.getElementsByTagName(v) : "";

			if (select.length) {
				for (var s = 0; s < select.length; s++) {
					selects.push(select[s]);
				}
			} else {
				typeof(select) == "array" ? selects.push([select]): selects.push(select);
			}

			return selects;
		};

		args = [];
		if (!Array.isArray(arg)) {
			typeof(arg) == "string" ? arg = StringEnObjet(arg): "";
			args.push(arg);

		} else {
			for (var i = 0; i < arg.length; i++) {
				typeof(arg[i]) == "string" ? arg[i] = StringEnObjet(arg[i]): "";
				if (typeof(arg[i] == "object")) {
					for (var a in arg[i]) {
						args.push({
							[a]: arg[i][a]
						});
					}
				} else {
					args.push(arg)
				}
			}
		}

		for (var i = 0; i < args.length; i++) {
			var selectionne = selection(args[i]);


			for (var z = 0; z < selectionne.length; z++) {
				selectionne[z] ? elements.push(selectionne[z]) : "";
			}
		}
		elements.length == 1 ? elements = elements[0] : "";

		elements.vider = function() {

			while (this.firstChild) {
				this.removeChild(this.firstChild);
			}
		};

		elements.elthtml = function(arg) {

			var init = function(arg) {
				var cls = Object.keys(arg);

				for (var i = 0; i < cls.length; i++) {
					if (cls[i] != "contenu" && cls[i] != "tag" && cls[i] != "prop") {

						console.log(
							"ATTENTION!!!\nla clee " + '%c' + cls[i], "background: rgba(255,0,0,1); color: rgba(0,5,0,1);",
							"est erronée dans l'objet argument de .elthtml()\n =>tag, prop ou contenu");

					}
				}
				var contenu = arg.contenu,
					tag = arg.tag,
					prop = arg.prop;



				return {
					contenu: contenu,
					tag: tag,
					prop: prop
				};
			};

			/*une fonction pour faciliter la creation d'element dans le DOM
			Son argument est un objet:

			  {
			    contenu: "text ou html",
			    tag: "nom du tag de l'element à creer exemple: div"
			    prop: [".nom" ou "#nom" ou "@cible" ou {class: nom} ou {id: nom} ou {href: cible} ou {title: titre} ... ] ce tableau regroupe toutes les proprietées à ajouter à notre élément, il peut contenir plusieurs elements et les objets qui s'y trouvent aussi!!
			  };

			On peut donc creer un element avec plusieurs proprietees a plusieurs endroits
			DONC FAIRE ATTENTION A NE PAS AVOIR PLUSIEURS FOIS LE MEME ID!!
			  */
			var prepElt = function(arg) {

				arg = init(arg);
				var tag, prop = "",
					tag = arg.tag;
				arg.prop ? prop = arg.prop : prop = "";
				arg.contenu ? contenu = arg.contenu : contenu = "";
				var monLien = document.createElement(tag); /*cree un element => var tag*/
				if (prop) {
					if (typeof(prop) == "string") {

						prop = StringEnObjet(prop);
					}


					if (prop.length) {
						for (var i = 0; i < prop.length; i++) { /*pour chaque prop*/
							if (typeof(prop[i]) == "string") { /*si la proprieté est un string*/
								prop[i] = StringEnObjet(prop[i]);
							}

							if (typeof(prop[i]) == "object") {
								var cles = Object.keys(prop[i]),
									valeur = Object.values(prop[i]);
								for (var cle = 0; cle < cles.length; cle++) {
									monLien.setAttribute(cles[cle], valeur[cle]);
								}
							}
						}
					} else {
						if (typeof(prop) == "object") {
							var cles = Object.keys(prop),
								valeur = Object.values(prop);
							for (var cle = 0; cle < cles.length; cle++) {
								monLien.setAttribute(cles[cle], valeur[cle]);
							}
						}
						var cles = Object.keys(prop),
							valeur = Object.values(prop);
						monLien.setAttribute(cles[0], valeur[0]);
					}
				}
				monLien.innerHTML = contenu; /*rempli la div avec le texte a afficher*/
				return monLien;
			};



			if (this.length) {
				for (var s = 0; s < this.length; s++) {
					monLien = prepElt(arg);
					this[s].appendChild(monLien);
				}
			} else {
				monLien = prepElt(arg);
				typeof(this) == "array" ? this[0].appendChild(monLien): this.appendChild(monLien);
			}
		};

		return elements;
	} catch (e) {
		var text = "mauvaise utilisation de G()";
		console.log('%c' + text, "background: rgba(0,255,0,1); color: rgba(0,0,255,1);", "\n ",
			"Arguments possible :\n ",
			'-"#identifient"\n',
			'-".classe"\n',
			'-"balise"\n',
			'{id:"identifient"}\n',
			'-{class:"classe"}\n',
			'-{tag:"classe"}\n',
			"-tableau contenant les exemples si dessus\n",
			"Les objets peuvent contenir plusieurs cle/val\n",
			"G() retourne alors un element ou un tableau d'elements"
		);
	}
};
