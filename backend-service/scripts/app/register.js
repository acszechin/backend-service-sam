function elObject(){
    var api = appSettings.everlive.apiKey;
    console.log("inicio de registro para apiKey: " + api);
    
    var el = new Everlive(api);
    return el;
}

function authenticateUser(){
    alert("autenticar usuario...");
    var el = elObject();
    
    el.Users.login('user1', 'pass1',
		function(data){
			alert("Usuario autenticado!!!");
            console.log(JSON.stringify(data));
        },
    	function(error){
            alert("erro ao se autenticar: " + JSON.stringify(error));
            console.log(JSON.stringify(error));
        }
    );
}

function registerUser(){
    alert("Registrar...");
    var el = elObject(); 
    
    el.Users.register('user1', //username
    				'pass1', //password
    				{//campos adicionais
                        Email: 'acs.zechin@knowlodge.com.br', //email
                        DisplayName: 'Antonio Carlos', //display name
                        OtherInfo: 'outras informações', 
                        Role: 'authors'
                    },
    				function(data){
                        alert("sucesso: " + JSON.stringify(data));
						console.log(JSON.stringify(data));
                    },
    				function(error){
                        alert("erro: " + JSON.stringify(error));
						console.log(JSON.stringify(error));
                    }
    )
}

function getUserById(){
	alert("Obtem User...");
    var el = elObject();
    
    el.Users.getById('c1d826a0-279b-11e4-b9a3-b545ac9026a2')
    	.then(
    		function(data){
            	console.log(JSON.stringify(data));
				alert(JSON.stringify(data));            
        	},
    		function(error){
            	console.log(JSON.stringify(error));
				alert(JSON.stringify(error));			       	     
        	}
    	);
}

function getMultipleUsers(){
    alert("Obtem multiplos users...");
    var el = elObject();
    
    el.Users.get()
    	.then(
    		function(data){
            	var i;
            	for(i = 0; data.result.length; i++){
					alert(data.result[i].Username);                          
                	console.log(JSON.stringify(data.result[i]));
                    console.log("-------------------------         -------------------------");
            	}
        	},
    		function(error){
            	console.log(JSON.stringify(error));
            	alert(JSON.stringify(error));
        	}
    	);
}

function deleteAllUsers(){
    alert("Deleta todos usuarios...");
    var el = elObject();
    
    el.Users.destroy()
    	.then(
    		function(data){
            	alert("usuarios excluídos com sucesso!!!");
                console.log("usuarios excluídos com sucesso: " + JSON.stringify(data));
        	},
    		function(error){
                alert("erro ao excluir usuarios");
                console.log(JSON.stringify(error));
            }
    	);
}

function settingsPush(){
    alert("Primeiro teste de Push...");
    var el = elObject();
    
    var pushSettings = {
        android:{
			senderID: "990749078674"
        },
        notificationCallbackAndroid: function(e){
            console.log("notificationCallbackAndroid: " + e);
        }
    }
    
    var successFunction = function(data){
		alert("sucesso nas configurações do push");
        console.log("sucesso nas configurações do push: " + JSON.stringify(data));
    };
    
    var errorFunction = function(error){
        alert("erro nas configurações do Push");
        console.log("erro nas configurações do Push: " + JSON.stringify(error));
    }    
    
    el.push.currentDevice().enableNotifications(pushSettings, successFunction, errorFunction);    
}

function registerDeviceInTelerik(){
    alert("Registrando Device no Servico Telerik");
    var el = elObject();
    var customParameters = "parameter";
    
    el.push.currentDevice().register(customParameters, 
    	function(data){
        	alert("sucesso ao registrar no telerik");
            console.log("sucesso ao registrar no telerik: " + JSON.stringify(data));
    	},
    	function(error){
        	alert("erro ao registrar no telerik");
            console.log("erro ao registrar no telerik: " + JSON.stringify(error));            
        }
    );
}

function createNotification(){
    alert("Cirando push notification");
    var el = elObject();
    
    var conditions = {
        'PlatformType':'3'
    }
    
    var notification = {
        Filter: JSON.stringify(conditions),
        'Android':{
           'data':{
               'title': 'Push Title',
               'message': 'Push para Android',
               'customData': 'Custom data para Android'
           }
        }
    }
        
    el.push.notifications.create(
    	notification, 
    	function(data){
            console.log("sucesso: " + JSON.stringify(data));
        },
    	function(error){
            console.log("error: " + JSON.stringify(error));
        }
    );
}