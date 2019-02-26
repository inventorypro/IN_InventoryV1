

function fnLogin(){
var username = $('#txtUsername').val();
var password = $('#txtPassword').val();


    localStorage.setItem("logUsername", username);
    localStorage.setItem("logPassword", password);


checkLogin(localStorage.logUsername,localStorage.logPassword);
}

function checkLogin(username, password){
    console.log(username);

    $.ajax({
      
        type: "GET",
        url: "http://localhost:60443/api/UserPermission",
        dataType: 'json',
         headers :{
          'Authorization':'basic '+btoa(localStorage.logUsername + ':' + localStorage.logPassword)
         },
    
    success: function (data) {
        localStorage.setItem("logSite", data[0].SITES.toLowerCase() );
        localStorage.setItem("logDept", data[0].Department);
        localStorage.setItem("getMyUsername", data[0].EMP_EngName);
        localStorage.setItem("getMyPosition", data[0].Position);
        try {
            if (data[0].Permission.toLowerCase() === "admin") {
                window.location.href = "Dashboard.html";
            }else if(data[0].Permission.toLowerCase() === "manager"){
                window.location.href = "manager.html";
            }else{
                window.location.href = "user.html";
            }
          }
          catch(err) {
      
            alert(err.message);
          }

        
    },
    error: function (jqXHR,xhr, ajaxOptions, thrownError) {
        console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
        alert('Failed to login user profile !');
        //window.location.href = "index.html";
    }
});
}


function fnLogout(){
    localStorage.removeItem("logUsername");
    localStorage.removeItem("logPassword");
    localStorage.removeItem("logSite");
    localStorage.clear();
    window.location.href = "index.html";
    alert("Logout success");
}

