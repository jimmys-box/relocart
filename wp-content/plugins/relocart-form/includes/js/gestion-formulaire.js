function appelApi(url) {
    return fetch(url).then(res => res.json());
}

function recupinfos() {

    // e.preventDefault();

    // var formulaire = document.getElementById('formulaire-contact');
    // var inputs = document.querySelectorAll('#formulairecontact input[required]');


    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var phone = document.getElementById('phone').value;
    var mail = document.getElementById('email').value;
    var address = document.getElementById('address').value;

    if (fname == "" || phone == "" || mail == "" || lname == "" || address == "") {
        var mess = document.getElementById("messageretour");

        mess.style.backgroundColor = "orange";
        mess.innerHTML = "Please complete all required fields";
        console.log("Erreur : tous les champs ne sont pas remplis");
    } else {
        var lat;
        var long;
        var urlLocalisation;
        var addr;

        var etatDemande = appelApi('https://api.ipdata.co?api-key=79d09a0d85de38c3046635ae78e745afd01e5b51716645f6fc90f6ee')
            .then(data => {
                lat = data.latitude;
                long = data.longitude;
                return "ok";
            })
            .then(donnees => {
                if (lat && long) {
                    urlLocalisation = 'https://api.geoapify.com/v1/geocode/reverse?lat=' + lat + '&lon=' + long + '&apiKey=ceb2215885f14749a4fac3a60889c41e';
                    return urlLocalisation;
                }
            })
            .then(adresseApelLoca => {
                if (adresseApelLoca) {
                    var ad = appelApi(adresseApelLoca)
                        .then(result => { 
                            var adr = result.features[0].properties.formatted;
                            return adr; 
                        })
                        .then(ad => {
                            if (ad) {
                                addr = ad;
                            } else {
                                addr = 'aucune adresse détectée';
                            }
                        return addr;
                        });
                    return ad;
                }
            })
            .then(adresseComplete => {
                var retourEnvoi = appelApi('https://relocart.ch/wp-json/formulaires/contact/envoyer?nom=' + fname + '&fname=' + fname + '&phone=' + phone + '&email=' + mail + '&lname=' + lname + '&address=' + address + '&adressephysique=' + adresseComplete);
                return retourEnvoi;
            })
            .then(valeurRetour => {
                var succesDemande = (valeurRetour.insertion_liste_emailing);
                var val;
                if (succesDemande.length > 0) {
                    val = true;
                } else {
                    val = false;
                }
                console.log(val);
                return false;
            })
            .then(valRetour => {
                messageConfirmation(valRetour);
            });
        }
    }

function messageConfirmation(valeur) {
    var message = document.getElementById("messageretour");

    var contenuMessage;
    
    if (valeur) {
        contenuMessage = "Your request has been taken into account. We will contact you as soon as possible.";
        message.style.backgroundColor = "green";
    } else {
        contenuMessage = "An error occurred while sending your request. Please contact us via the e-mail address mentioned below.";
        message.style.backgroundColor = "red";
    }
    
    message.innerHTML = contenuMessage;
}

function autretest() {
    console.log("un 'autre test' depuis le fichier gestion-formulaire.js");
}