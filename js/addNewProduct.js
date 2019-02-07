$(document).ready(function () {
    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#myfileUpload").change(function () {

        var fileName = document.getElementById("myfileUpload").value;
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            readURL(this);
            document.getElementById("loader").style.display = "block";

        } else {
            $('#myfileUpload').val("");
            alert("Only jpg/jpeg and png files are allowed!");
        }
    });

    $('input[type=file]').on("change", function () {

        var $files = $(this).get(0).files;

        if ($files.length) {

            // Reject big files
            if ($files[0].size > $(this).data("max-size") * 1024) {
                console.log("Please select a smaller file");
                return false;
            }

            // Replace ctrlq with your own API key
            var apiUrl = 'https://api.imgur.com/3/image';
            var apiKey = 'b8732e440376e3d';

            var formData = new FormData();
            formData.append("image", $files[0]);

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": apiUrl,
                "method": "POST",
                "datatype": "json",
                "headers": {
                    "Authorization": "Client-ID " + apiKey
                },
                "processData": false,
                "contentType": false,
                "data": formData,
                beforeSend: function (xhr) {
                    console.log("Uploading...");
                },
                success: function (res) {
                    document.getElementById("loader").style.display = "none";

                    console.log(res.data.link);
                    document.getElementById("addImgProduct").value = res.data.link;
                    // $('body').append('<img src="' + res.data.link + '" />');
                },
                error: function () {
                    alert("Failed");
                }
            }
            $.ajax(settings).done(function (response) {
                console.log("Done");
            });
        }
    });






});

function btnDelete(idVal) {
    var showCfDelete = confirm("Are you sure you want to delete this product?");
    if (showCfDelete == true) {
        txtShow = "You delete success!";

        $.ajax({

            type: "DELETE",
            url: "http://localhost:60443/api/IN_Product/" + idVal,
            dataType: 'json',
            headers: {
                'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
            },

            success: function (data) {
                console.log("success");
            },
            error: function (jqXHR, xhr, ajaxOptions, thrownError) {
                console.log("Your can't delete, error is '" + thrownError + "'");
                //window.location.href = "index.html";
            }
        });

        alert(txtShow);
        location.reload();
    } else {


    }

}

function toggleCheckbox(source) {
    checkboxes = document.getElementsByName('deleteMulti');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
    }
}

function multiDelete() {


    var items = document.getElementsByName('deleteMulti');
    var selectedItems = [];;
    for (var i = 0; i < items.length; i++) {
        if (items[i].type == 'checkbox' && items[i].checked == true) {
            selectedItems[i] = items[i].value;
        }


        // ccnMultiDelete(items[i].value);
    }
    if (selectedItems.length === 0) {
        alert("You have not selected data!");
    } else {
        var multiCfDelete = confirm("Are you sure you want to delete this product?");
        if (multiCfDelete == true) {
            for (var i = 0; i < selectedItems.length; i++) {
                if (selectedItems[i] !== undefined) {
                    ccnMultiDelete(selectedItems[i])


                }
            }

            alert("You delete success!");
            location.reload();
        }

    }



}

function ccnMultiDelete(getIdDelete) {
    $.ajax({

        type: "DELETE",
        url: "http://localhost:60443/api/IN_Product/" + getIdDelete,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            console.log("success " + data);
        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Your can't delete, error is '" + thrownError + "'");
            //window.location.href = "index.html";
        }
    });

}

function ShowDataEditor(a) {
    $.ajax({

        type: "GET",
        url: "http://localhost:60443/api/IN_Product/" + a,
        dataType: 'json',
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },

        success: function (data) {
            console.log(data);
            document.getElementById("editProductID").value = data.ProductID;
            document.getElementById("editProductName").value = data.ProductName;
            document.getElementById("editCategory").value = data.Category;
            document.getElementById("editUnitType").value = data.UnitType;
            document.getElementById("editPrice").value = data.Price;
            document.getElementById("editMinValue").value = data.MinValue;
            document.getElementById("editMaxValue").value = data.MaxValue;
            document.getElementById("editProductStatus").value = data.ProductStatus;
            document.getElementById("editAmount").value = data.Amount;
            document.getElementById("editSITES").value = data.SITES;
            document.getElementById("editImgProduct").value = data.ImgProduct; editUnitType

        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("+++++++++++++++++++++++++  Bot notification failed, error is '" + thrownError + "'");
            //window.location.href = "index.html";
        }
    });
}

function deleteDataProduct(a) {
    // var getA = a;
    // var x = document.getElementById("addProductName"+getA).value;

    // alert(getA+":"+x);
    alert(a);

}

function addNewProduct() {


    var formdata = {
        ProductID: $('#addProductID').val(),
        ProductName: $('#addProductName').val(),
        Category: $('#addCategory').val(),
        UnitType: $('#addUnitType').val(),
        Price: $('#addPrice').val(),
        MinValue: $('#addMinValue').val(),
        MaxValue: $('#addMaxValue').val(),
        ProductStatus: "true",
        ImgProduct: $('#addImgProduct').val(),
        Amount: $('#addAmount').val(),
        SITES: localStorage.logSite
    }

    $.ajax({

        type: "POST",
        url: "http://localhost:60443/api/IN_Product",
        dataType: 'json',
        data: formdata,
        headers: {
            'Authorization': 'basic ' + btoa(localStorage.logUsername + ':' + localStorage.logPassword)
        },
        success: function (data) {
            console.table(data);
        },
        error: function (jqXHR, xhr, ajaxOptions, thrownError) {
            console.log("Add new product failed, error is '" + thrownError + "'");

        }

    });
}

$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
})


{/* <form id="imgur">
<input type="file" id="myfileUpload" class="imgur" accept="image/*" data-max-size="5000" />
<img id="blah" height="200" src="#" alt="your image" />
</form> */}