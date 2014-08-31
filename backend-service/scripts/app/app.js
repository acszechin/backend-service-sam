var app;

function App () {
}

$(function(){
    app = new App();
});

window.onbeforeunload = function(e){
    app.refreshPage();
}

App.prototype = {
    getEverliveObject: function(){
        var elInstance = new Everlive(appSettings.everlive.apiKey);
        console.log("iniciando backend service para apiKey: " + appSettings.everlive.apiKey);

        return elInstance;
    },

    //login de usuario
    login: function(user, pass){
        console.log("inicio login...");

        displayControl.resetForms();

        var el = app.getEverliveObject();
        el.Users.login(
            user,
            pass,
            function(success){
                console.log(JSON.stringify(success));
                displayControl.hideDisplayLogin();
                document.getElementById("users-view").style.display = "block";
                app.saveCurrentUser(user, pass);
            },
            function(error){
                console.log(JSON.stringify(error));
                var element = document.getElementById("show-error-login");
                element.innerHTML = "Usuário ou senha inválido";
                element.style.display = "block";

                setTimeout(function(){element.style.display = "none";}, 3000);

            }
        );

        console.log("fim login...");
    },

    //faz logout 
    logout: function () {
        console.log("inicio logout");

        window.localStorage.clear();

        displayControl.hideAllPages();
        displayControl.showLogin();
    },

    //novo usuario
    addNewUser: function(user, pass, email, displayName, samsungId, form){       
        var el = app.getEverliveObject();
        el.Users.register(
            user,
            pass,
            {
                Email: email,
                DisplayName: displayName,
                SamsungID: samsungId,
                Role: 'authors'
            },
            function(success){
                console.log("sucesso no cadastro: " + JSON.stringify(success));
                displayControl.showInfo("Usuário " + user + " cadastrado com sucesso!", "success", "add");
                form.reset();
            },
            function(error){
                console.log("erro no cadastro: " + JSON.stringify(error));
                displayControl.showError(error.code);
            }
        );
    },

    //deleta unico usuario
    deleteSingleUser: function () {
        console.log("inicio deleteSingleUser...");

        var fields = document.getElementById("form-actions-user").getElementsByClassName("input-edit-user");
        var id = fields[1].id;  

        var el = app.getEverliveObject();
        el.Users.destroySingle(
            {
                Id: id    
            },
            function (success) {
                console.log("sucesso na exclusao do usuario: " + JSON.stringify(success));
                displayControl.showInfo("Usuário excluído com sucesso!", "success", "edit");
            },
            function (error) {
                console.log("erro na exclusao do usuario: " +  JSON.stringify(error));
                displayControl.showError(error.code, "error", "edit");
            }
        );
    },

    //deleta todos usuarios
    deleteAllUsers: function () {
        console.log("inicio deleteAllUsers...");

        var el = app.getEverliveObject();
        el.Users.destroy().then(
            function (success) {
                console.log("todos usuarios excluidos com sucesso: " + JSON.stringify(success));
                displayControl.showInfo("Todos usuários foram excluídos!", "success", "delete");
            },
            function (error) {
                console.log("erro ao excluir todos usuarios: " + JSON.stringify(error));
                displayControl.showError(error.code, "error", "edit");
            }
        );
    },

    //autaliza usuario
    updateUser: function () {
        console.log("inicio updateUser...");

        //obtem elemento HTML com dados
        var fields = document.getElementById("form-actions-user").getElementsByClassName("input-edit-user");  

        //obtem dados para alteracao
        var data = {
            'Id': fields[1].id, 
            'Username': fields[0].value, 
            'Email': fields[1].value, 
            'DisplayName': fields[2].value
        };

        var el = app.getEverliveObject();
        el.Users.updateSingle(
            data,
            function (success) {
                console.log("sucesso na alteracao: " + JSON.stringify(success));
                //displayControl.changeAttrEvent();
                displayControl.disableEdit();
                displayControl.showInfo("Alteração concluída com sucesso!", "success", "edit");
            },
            function (error) {
                console.log("erro na alteracao: " + JSON.stringify(error));
                //displayControl.changeAttrEvent();
                displayControl.showError(error.code, "alert", "edit");
            }
        );
    },

    //busca todos usuarios
    findAllUsers: function(id, factor){
        console.log("inicio findAllUsers...");
        
        displayControl.resetUserList();
        displayControl.hideFormFindUser();
        displayControl.showLoader();

        var element = document.getElementById(id);

        var el = app.getEverliveObject();
        el.Users.get().then(
            function(data){
                console.log("usuarios: " + JSON.stringify(data));

                if (factor !== undefined) {
                    app.findUserById(data, factor, element);
                } else{
                    displayControl.hideFormFindUser();
                    displayControl.hideLoader();

                    //cria elementos para mostrar usuarios
                    htmlElement.getItensUsersArray(data);                            
                    
                    displayControl.showListUsers();                    
                }
            },
            function(error){
                console.log("erro ao buscar usuarios: " + JSON.stringify(error));
                displayControl.hideFormFindUser();
                displayControl.hideLoader();
            }
        );
    },

    //busca unico usuario
    findUserById: function(usersArray, factor, element){
        console.log("findUserById inicio...");
        var id;

        //faz a busca no Array
        for(var i = 0; i < usersArray.count; i++){
            //faz a busca por Nome
            if (factor === 'name' && usersArray.result[i].DisplayName === element.value){
                id = usersArray.result[i].Id;
            }

            //faz a busca por Email
            if (factor === 'email' && usersArray.result[i].Email === element.value){
                id = usersArray.result[i].Id;
            }

            //faz a busca por Usuario
            if (factor === 'user' && usersArray.result[i].Username === element.value){
                id = usersArray.result[i].Id; 
            }

            //faz a busca por SamsungID
            if (factor === 'samsungid' && usersArray.result[i].SamsungID === element.value){
                id = usersArray.result[i].Id; 
            }
        }        

        var el = app.getEverliveObject();
        el.Users.getById(id).then(
            function(data){
                console.log("usuario: " + JSON.stringify(data));
                displayControl.hideFormFindUser();
                displayControl.hideLoader();

                //cria elementos para mostrar usuarios
                htmlElement.getItensSingleUser(data);                            
                
                displayControl.showListUsers();                 
            },
            function(error){
                console.log("erro ao buscar usuario: " + JSON.stringify(error));
                displayControl.showError(error.code);
                displayControl.hideFormFindUser();
                displayControl.hideLoader();
                displayControl.showFindUsers();
            }
        );
    },  

    //valida form de cadastro de novo usuario
    validateForm: function(form){
        console.log("inicio validateForm...");
        var formOk = true;        

        //variaveis-campos para o cadastro
        var user;
        var pass;
        var email;
        var displayName;
        var samsungId;

        for(var i = 0; i < form.length - 2; i++){
            if (form[i].value === "") {
                var textInfo = form[i].placeholder + " não pode ser vazio";
                displayControl.showInfo(textInfo, "error", "add");
                formOk = false;
                break;
            } else if (form[i].placeholder === "Email") {
                formOk = app.validateEmail(form[i].value);
            }

            //atribuindo valores dos campos para variaveis
            switch(form[i].placeholder){
                case "Username":
                    user = form[i].value;
                    break;
                case "Password":
                    pass = form[i].value;
                    break;                    
                case "Email":
                    email = form[i].value;
                    break;
                case "Display Name":
                    displayName = form[i].value;
                    break;
                case "Samsung ID":
                    samsungId = form[i].value;
                    break;                                            
            } 
        }
        if (formOk !== false){
            console.log("Form ok para cadastro...");
            app.addNewUser(user, pass, email, displayName, samsungId);            
        } else{
            console.log("Form invalido para cadastro...");            
        }
        
    },

    //valida email com regex
    validateEmail: function(email){
        console.log("inicio validateEmail...");
        var regexEmail = "^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";

        if (email.match(regexEmail) === null){
            var textInfo = "Informe um email válido";
            displayControl.showInfo(textInfo, "error", "add");
            return false;            
        }
    },

    getDataForm: function(){
        var username = $("#user").val();
        var password = $(":password").val();

        app.login(username, password);            
    },

    //armazena usuario corrente 
    saveCurrentUser: function(user, pass){
        console.log("inicio saveCurrentUser...");
        var dataUser = [user, pass];
        app.storageArray(dataUser);
    },

    refreshPage: function(){
        var array = app.getStorageArray();
        console.log("dados do usuario recuperados: " + array);
        var username = array[0];
        var password = array[1];
        document.getElementById("login").style.display = "none";
        document.getElementById("users-view").style.display = "block";

        return false;
    },

    storageArray: function(array){
        console.log("inicio storageArray...");
        window.localStorage.setItem(appSettings.keysStorage.currentUser, JSON.stringify(array));
        console.log("dados gravados: " + JSON.stringify(array));
    },

    getStorageArray: function(){
        var data = JSON.parse(window.localStorage.getItem(appSettings.keysStorage.currentUser));
        return data;
    }
};