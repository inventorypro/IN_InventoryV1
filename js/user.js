$( document ).ready(function() {
 
    if (typeof(Storage) !== "undefined") {
    
    $.ajax({
      
        type: "GET",
        url: "http://localhost:51940/api/UserPermission",
        dataType: 'json',
         headers :{
          'Authorization':'basic '+btoa(localStorage.logUsername + ':' + localStorage.logPassword)
         },
    
    success: function (data) {
     //console.table(data);
     console.log(data[0].Permission.toLowerCase());
     console.log(localStorage.logUsername);
     if (data[0].Permission.toLowerCase() === "user") {
        
    }else{
       window.location.href = "index.html";
    }
   
    },
    error: function (jqXHR,xhr, ajaxOptions, thrownError) {
        console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
      //  alert('check !');
        window.location.href = "index.html";
    }
   });
   
   
      } else {
       console.log("localStorage error");
      }
    
   });