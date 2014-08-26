var htmlElement;

function HtmlElement() {
}

$(function(){
	htmlElement = new HtmlElement();
});

HtmlElement.prototype = {
	//cria lista de usuarios
	createUsersList: function(name, user, email, samsungId, id){
		//cria <li> para cada usuario
		var newList = document.createElement("li");
		newList.id = id;
		document.getElementById("list-user").appendChild(newList);

		//cria <span> para Display Name
		var spanName = document.createElement("span");
		spanName.className = "list-displayname";
		spanName.innerHTML = name;
		document.getElementById(newList.id).appendChild(spanName);

		//cria <span> para Username
		var spanUser = document.createElement("span");
		spanUser.className = "list-user";
		spanUser.innerHTML = user;
		document.getElementById(newList.id).appendChild(spanUser);

		//cria <span> para Email
		var spanEmail = document.createElement("span");
		spanEmail.className = "list-email";
		spanEmail.innerHTML = email;
		document.getElementById(newList.id).appendChild(spanEmail);

		//cria <span> para SamsungID
		var spanSamsungId = document.createElement("span");
		spanSamsungId.className = "list-samsungid";
		spanSamsungId.innerHTML = samsungId;
		document.getElementById(newList.id).appendChild(spanSamsungId);
	},

	//cria mais paginas para os registros de usuario
	createPages: function(data){
		for (var i = 0; i < data.count; i++) {
			var ulPage = document.createElement("ul");
			ulPage.id = "list-user" + i;
			ulPage.style.display = "none"; 
		}	
	},

	//faz iteracao para pegar itens de um array de usuarios
	getItensUsersArray: function(data){
		//quantidade de paginas para criar
		var numPages = data.count / 4;

		//resto de divisao -> quantidade de registro para adicionar na proxima pagina
		var rest = data.count % 4;

		//TODO pensar em logica para criar mais de uma pagina(com paginacao)

		var i;
		for(i = 0; i < data.count; i++){
			if (i < 3) {
				var name = data.result[i].DisplayName;
				var user = data.result[i].Username;
				var email = data.result[i].Email;
				var samsungId = data.result[i].SamsungID;
				var id = data.result[i].Id;

				htmlElement.createUsersList(name, user, email, samsungId, id);
			} else{
				htmlElement.createPages(data.result[i]);
			}	
		}			
	}
} 