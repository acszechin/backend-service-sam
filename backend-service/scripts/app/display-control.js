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

		displayControl.resetForms();
		displayControl.resetAttrFormEditUser();

		document.getElementById("new-user").style.display = "block";

		document.getElementById("section-user-actions").style.display = "none";
		document.getElementById("section-list-user").style.display = "none";
		document.getElementById("find-user").style.display = "none";
		document.getElementById("section-push").style.display = "none";
		displayControl.hideDeleteAllUsers();
	},

	//exibe tela para busca de usuarios
	showFindUsers: function(){
		console.log("inicio showFindUsers...");

		displayControl.resetForms();
		displayControl.resetAttrFormEditUser();

		document.getElementById("find-user").style.display = "block";

		document.getElementById("section-user-actions").style.display = "none";
		document.getElementById("section-list-user").style.display = "none";
		document.getElementById("new-user").style.display = "none";
		document.getElementById("section-push").style.display = "none";
		displayControl.hideDeleteAllUsers();
	},

	//exibe tela para exclusao de todos usuarios
	showDeleteAllUsers: function(){
		console.log("inicio showDeleteAllUsers...");

		document.getElementById("section-delete-all").style.display = "block";

		document.getElementById("new-user").style.display = "none";
		document.getElementById("section-user-actions").style.display = "none";
		document.getElementById("section-list-user").style.display = "none";
		document.getElementById("find-user").style.display = "none";
		document.getElementById("section-push").style.display = "none";		
	},

	//exbibe lista de usuarios
	showListUsers: function(){
		console.log("inicio showListUsers...");

		displayControl.resetForms();
		displayControl.resetAttrFormEditUser();

        document.getElementById("section-list-user").style.display = "block";
        document.getElementById("list-user").style.display = "block";
        displayControl.hideDeleteAllUsers();
	},

	//exibe tela de envio e configuracao do push notification
	showSettingsPush: function(){
		console.log("inicio showSettingsPush...");

		displayControl.resetForms();
		displayControl.resetAttrFormEditUser();

		document.getElementById("section-push").style.display = "block";

		document.getElementById("section-user-actions").style.display = "none";
		document.getElementById("section-list-user").style.display = "none";
		document.getElementById("new-user").style.display = "none";
		document.getElementById("find-user").style.display = "none";
		displayControl.hideDeleteAllUsers();		
	},

	//exibe tela de acoes para um usuario
	showActionsUser: function(id) {
		document.getElementById("section-list-user").style.display = "none";
		
		displayControl.showInfoUser(id);

		document.getElementById("section-user-actions").style.display = "block";
	},

	//esconde tela de excluir todos usuarios
	hideDeleteAllUsers: function () {
		console.log("inicio hideDeleteAllUsers...");

		document.getElementById("section-delete-all").style.display = "none";
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

	//limpa todos os forms
	resetForms: function () {
		console.log("inicio resetForms...");
		var forms = document.getElementsByTagName("form");
		for (var i = 0; i < forms.length; i++) {
			forms[i].reset();
		}
	},

	//limpa lista de usuarios
	resetUserList: function(){
		var list = document.getElementById("list-user");

		for (var i = 0; i < list.children.length; i++) {
			list.children[i].remove();
		}
	},

	//ebibe campos do usuario para edicao
	showInfoUser: function (id) {
		console.log("inicio showInfoUser...");

		var data = document.getElementById(id);

		var form = document.getElementById("form-actions-user");
		var arrayInput = form.getElementsByTagName("input");

		arrayInput[0].value = data.children[1].textContent; //user
		arrayInput[1].value = data.children[2].textContent; //email
		arrayInput[2].value = data.children[0].textContent; //name			
		arrayInput[3].value = data.children[3].textContent; //samsungId

		arrayInput[1].id = id //id do usuario no banco de dados para uso na atualizacao do usuario			
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
			case "push":
				textInfo = document.getElementById("show-info-push");
				break;
			case "pushSingle":
				textInfo = document.getElementById("info-push-single-user");
				break;		
			case "edit":
				textInfo = document.getElementById("show-info-actions");			
				break;
			case "delete":
				textInfo = document.getElementById("show-info-actions");
				break;								
		}
		
		textInfo.style.display = "block";
		textInfo.innerHTML = text;
		if (type === "error"){
			textInfo.style.color = "rgb(255, 245, 0)";
			textInfo.style.borderColor = "rgb(255, 245, 0)";
		} else if (type === "alert") {
			textInfo.style.color = "yellow";
			textInfo.style.borderColor = "yellow";
			textInfo.style.backgroundColor = "black";
		} else{
			textInfo.style.color = "rgb(48, 88, 173)";
			textInfo.style.borderColor = "rgb(48, 88, 173)";
		}

		setTimeout(function () {
			textInfo.style.display = "none";
		}, 3000);		
	},

	showError: function(errorCode, type, factor){
		switch(errorCode){
			case 201:
				displayControl.showInfo("Já existe um usuário com o mesmo username", "error" , "add");
				break;
			case 211:
				displayControl.showInfo("Já existe um usuário com o mesmo email", type, factor);
				break;
			case 601:
				displayControl.showInfo("Por favor, escreva uma mensagem!", "alert", "push");
				break;
			case 603:
				displayControl.showInfo("Usuário sem permissão para esse tipo de ação", type, factor);
				break;		
			case 801:
				displayControl.showInfo("Usuário não encontrado com esse parâmetro", null, "find");
				break;		
		}
	},

	//habilita o form edicao do usuario
	enableEdit: function () {
		console.log("inicio enableEdit...");
		var formEdit = document.getElementById("form-actions-user");
		var inputEdit = formEdit.getElementsByClassName("input-edit-user"); 

		for (var i = 0; i < inputEdit.length; i++) {
			inputEdit[i].disabled = false;
		}

		inputEdit[0].focus();

		displayControl.changeAttrEvent();	
	},

	//desabilita o form de edicao do usario
	disableEdit: function(){
		console.log("inicio disableEdit...");

		var formEdit = document.getElementById("form-actions-user");
		var inputEdit = formEdit.getElementsByClassName("input-edit-user"); 

		for (var i = 0; i < inputEdit.length; i++) {
			inputEdit[i].disabled = true;
		}

		displayControl.changeAttrEvent();		
	},

	//troca a funcao do evento onclick do botao de editar usuario
	changeAttrEvent: function () {
		console.log("inicio changeAttrEevent...");

		var formEdit = document.getElementById("form-actions-user");
		var inputUpdate = formEdit.getElementsByClassName("update-user");

		if (inputUpdate.item().value === "Editar"){
			inputUpdate.item().value = "Salvar";
			inputUpdate.item().setAttribute("onclick", "app.updateUser()");			
		} else{
			inputUpdate.item().value = "Editar";
			inputUpdate.item().setAttribute("onclick", "displayControl.enableEdit()");
		}	
	},

	//reseta para configuracao inicial os atributos do form de edicao de usuario
	resetAttrFormEditUser: function () {
		console.log("inicio resetAttrFormEditUser...");

		var formEdit = document.getElementById("form-actions-user");
		var inputEdit = formEdit.getElementsByClassName("input-edit-user");
		var inputUpdate = formEdit.getElementsByClassName("update-user"); 

		for (var i = 0; i < inputEdit.length; i++) {
			inputEdit[i].disabled = true;
		}

		inputUpdate.item().value = "Editar";
		inputUpdate.item().setAttribute("onclick", "displayControl.enableEdit()");
	},


	clearFormAddUser: function(form){
		console.log("inicio clearFormAddUser...");

		form.reset();
	}	 
}