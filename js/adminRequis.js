$(document).ready(function () {
  
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Requisition?userID=all&SITES="+localStorage.logSite,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {

            // console.table(data);


            var datatable = $('#example').DataTable({

                // dom: 'lBrtip',

                responsive: true,
                // dom: 'Bfrtip',
                autoWidth: false,
                buttons: [

                    // 'copy', 'csv', 'excel',
                    // {
                    //     extend: 'collection',
                    //     text: 'Table control',
                    //     autoClose: true,
                    //     buttons: [
                    //         'colvis'
                    //     ]
                    // }

                ],
                "order": [[ 0, 'desc' ]], //asc|desc
                "data": data,
                "columns": [
                    { "data": "RequisID", visible: false  },
                    { "data": "RequisNumber",visible: false   },
                    {
                        "data": "RequisID", "class": "text-left dtCheck", render: function (data, type, row, meta) {
                            return type === 'display' ? 
                                '<h5><p>'+row.RequisNumber+'</p></h5> <b><p>'+row.RequisName+'</p><p>Position/Department :</p></b> <p>'+row.RequisPosition+'/'+row.RequisDept+'</p> <b><p>Location :</p></b> <p>'+row.RequisLocation+'</p>' :
                                data;
                        }
                    },
                    { "data": "RequisPosition" , visible: false},
                    { "data": "RequisDept",  visible: false },
                    { "data": "RequisLocation", visible: false },
                    // { "data": "RequisDate",  "class": "text-center dtCheck","type": 'date-dd-mmm-yyyy', targets: 0  }, //RequisNote
                    { 
                        data: "RequisDate",
                        render: function(data, type, row){
                            if(type === "sort" || type === "type"){
                                return row.RequisDate;
                            }
                            return moment(row.RequisDate).format("DD-MM-YYYY HH:mm");
                        }
                    },
                    { "data": "RequisStatus", "class": "text-center dtCheck", },
                    {
                        
                        "data": "RequisID", "class": "text-center dtCheck dtSetMiddle", render: function (data, type, row, meta) {
                            return type === 'display' ? 
                                ' <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" onclick="viewNote('+"'"+ row.RequisNote +"'"+')">View</button> ' :
                                data;
                        }
                    },
                    {
                        
                        "data": "RequisID", "class": "text-center dtCheck dtSetMiddle", render: function (data, type, row, meta) {
                            return type === 'display' ? 
                                '<button onclick="setIDrequisViewPro('+"'"+row.RequisNumber+"',"+''+row.RequisID+')">View Product</button>' :
                                data;
                        }
                    },

                ]




            });


            // for(var i = 0 ; i <= data.length ; i++){
            //     $( ".getMyProduct" ).append( "<p>"+data[i].ProductID +"</p>" );
            // }
        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            // alert('check !');

        }

    });
});

function viewNote(note){
    document.getElementById("getNoteView").innerHTML =  note;

}

function setIDrequisViewPro(setId,requisId){
    localStorage.setItem("logIDrequisViewPro", setId);
    localStorage.setItem("logIDrequis", requisId);
     window.location.href = "AdminViewProductRequis.html";

}