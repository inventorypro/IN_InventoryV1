$(document).ready(function () {
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Requisition?userID=" + localStorage.logUsername,
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
                "order": [[ 6, 'desc' ]], //asc|desc
                "data": data,
                "columns": [
                    { "data": "RequisID", visible: false  },
                    { "data": "RequisNumber",visible: false   },
                    {
                        "data": "RequisID", "class": "text-left dtCheck", render: function (data, type, row, meta) {
                            return type === 'display' ? 
                                '<h5><p>'+row.RequisNumber+'</p></h5> <b><p>Position/Department :</p></b> <p>'+row.RequisPosition+'/'+row.RequisDept+'</p> <b><p>Location :</p></b> <p>'+row.RequisLocation+'</p>' :
                                data;
                        }
                    },
                    { "data": "RequisPosition" , visible: false},
                    { "data": "RequisDept",  visible: false },
                    { "data": "RequisLocation", visible: false },
                    { "data": "RequisDate",  "class": "text-center dtCheck", }, //RequisNote
                    { "data": "RequisStatus", "class": "text-center dtCheck", },
                    {
                        
                        "data": "RequisID", "class": "text-center dtCheck dtSetMiddle", render: function (data, type, row, meta) {
                            return type === 'display' ? 
                                ' <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" onclick="viewNote('+"'"+ row.RequisNote +"'"+')">View</button> ' :
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