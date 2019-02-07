$( document ).ready(function() {
 
    if (typeof(Storage) !== "undefined") {
    
    $.ajax({
      
        type: "GET",
        url: "http://localhost:60443/api/UserPermission",
        dataType: 'json',
         headers :{
          'Authorization':'basic '+btoa(localStorage.logUsername + ':' + localStorage.logPassword)
         },
    
    success: function (data) {
     //console.table(data);
     console.log(data[0].Permission.toLowerCase());
     console.log(localStorage.logUsername);
  

    try {
        if (data[0].Permission.toLowerCase() === "admin") {
        
        }else if(data[0].Permission.toLowerCase() === "manager"){
            
        }else{
            
        }
        
      }
      catch(err) {
        
       // window.location.href = "index.html";
        alert(err.message);
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