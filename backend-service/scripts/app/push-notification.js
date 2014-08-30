var pNotification;

function PNotification(){
}

$(function(){
	pNotification = new PNotification();
});

PNotification.prototype = {

	//envia o push
	sendPush: function(){
		console.log("inicio sendPush...");		

		var notification = {
			Message: pNotification.getMessagePush(),
			Filter: pNotification.getConditions()
		}

		var el = app.getEverliveObject();
		el.push.notifications.create(
			notification,
			function(data){
				console.log("sucesso ao enviar push: " + JSON.stringify(data));
				displayControl.showInfo("Push Notification enviado com sucesso!", "success", "push");
			},
			function(error){
				console.log("erro ao enviar push: " + JSON.stringify(error));
				displayControl.showError(error.code);
			}
		);
	},

	//envia push para unico usuario
	sendPushSingleUser: function () {
		console.log("inicio sendPushSingleUser...");

		var notification = {
			Message: pNotification.getMessageSinglePush(),
			Filter: pNotification.getConditionsSingleUser()
		}

		var el = app.getEverliveObject();
		el.push.notifications.create(
			notification,
			function (data){
				console.log("sucesso ao enviar push: " + JSON.stringify(data));
				displayControl.showInfo("Push Notification enviado com sucesso!", "success", "pushSingle");
			},
			function (error){
				console.log("erro ao enviar push: " + JSON.stringify(error));
				displayControl.showError(error.code, "error", "pushSingle");
			}
		);
	},

	//obtem os valores do form de push
	getMessagePush: function(){
		console.log("inicio getPushForm...");
		var form = document.getElementById("form-push");
		var message;

		for (var i = 0; i < form.length; i++) {
			if (form[i].name === "message-push") {
				message = form[i].value;
			}
		}

		return message;
	},

	//obtem mensagem para push individual
	getMessageSinglePush: function () {
		var message = document.getElementById("input-push-single-user").value;
		return message;
	},

	//definindo condicoes para push
	getConditions: function () {
		var conditions = {
			'PlatformType': 3,
		};

		return JSON.stringify(conditions);
	},

	getConditionsSingleUser: function () {
		var username = document.getElementById("edit-username").value;
		var conditionsSingleUser = {
			'PlatformType': 3,
			'Parameters.Username': username
		}

		return JSON.stringify(conditionsSingleUser);
	}	
}