function CustomAlert(){
    this.render = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.left = (winW/2) - (550 * .5)+"px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = "Push Notification";
        document.getElementById('dialogboxbody').innerHTML =  "<input type='text' id='input-push-single-user' placeholder='Escreva a mensagem de push aqui...' autofocus><br><p id='info-push-single-user'>Push enviado com sucesso!</p>"
        document.getElementById('dialogboxfoot').innerHTML = "<input type='button' onclick='Alert.ok()' value='Voltar'><input type='button' id='bt-send-push-single-user' value='Enviar' onclick='pNotification.sendPushSingleUser()'>";
    }
    this.ok = function(){
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    }
}

var Alert = new CustomAlert();   

