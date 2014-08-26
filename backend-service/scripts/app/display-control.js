var displayControl;

function DisplayControl(){	
}

$(function(){
	displayControl = new DisplayControl();
});

DisplayControl.prototype = {
	//exibe form de cadastro de novo usuario
	showAddNewUser: function(){
		console.log("inicio showAddNewUser...");
		document.getElementById("new-user").style.display = "block";

		document.getElementById("section-list-user").style.display = "none";
		document.getElementById("find-user").style.display = "none";
		document.getElementById("div-push").style.display = "none";
	},

	//exibe tela para busca de usuarios
	showFindUsers: function(){
		console.log("inicio showFindUsers...");
		document.getElementById("find-user").style.display = "block";

		document.getElementById("section-list-user").style.display = "none";
		document.getElementById("new-user").style.display = "none";
		document.getElementById("div-push").style.display = "none";
	},

	//exibe tela de envio e configuracao do push notification
	showSettingsPush: function(){
		console.log("inicio showSettingsPush...");
		document.getElementById("div-push").style.display = "block";

		document.getElementById("section-list-user").style.display = "none";
		document.getElementById("new-user").style.display = "none";
		document.getElementById("find-user").style.display = "none";
	},

	//esconde o form de busca de usuarios
	hideFormFindUser: function(){
		console.log("inicio hideFormFindUser...");

		document.getElementById("find-user").style.display = "none";
	},

	//mostra o loader
	showLoader: function(){
		document.getElementById("spinner").style.display = "block";
	},

	//esconde o loader
	hideLoader: function(){
		document.getElementById("spinner").style.display = "none";
	},

	//exibe info do cadastro de novo usuario
	showInfo: function(text, type, factor){
		console.log("inicio showInfo...");
		console.log(text);

		var textInfo;
		switch (factor){
			case "add":
				textInfo = document.getElementById("show-info-add");
				break;
			case "find":
				textInfo = document.getElementById("show-info-find");
				break;	
		}
		
		textInfo.style.display = "block";
		textInfo.innerHTML = text;
		if (type === "error"){
			textInfo.style.color = "rgb(148, 5, 5)";
			textInfo.style.borderColor = "rgb(148, 5, 5)";
		} else{
			textInfo.style.color = "rgb(48, 88, 173)";
			textInfo.style.borderColor = "rgb(48, 88, 173)";
		}		
	},

	showError: function(errorCode){
		var type = "error";
		switch(errorCode){
			case 201:
				displayControl.showInfo("Já existe um usuário com o mesmo username", type, "add");
				break;
			case 211:
				displayControl.showInfo("Já existe um usuário com o mesmo email", type, "add");
				break;
			case 801:
				displayControl.showInfo("Usuário não encontrado com esse parâmetro", null, "find");
				break;		
		}
	},

	clearFormAddUser: function(form){
		console.log("inicio clearFormAddUser...");

		form.reset();
	}	
}