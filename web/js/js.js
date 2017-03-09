/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var URL = "http://192.168.130.22:5000/";

$(document).ready(function () {
    var path;
    var link;
    $("#subir").click(function () {
        var ACCESS_TOKEN = "957NesrUISAAAAAAAAAAMVRus44-AFW-ec0OFMDhXgrbm8macTcaJvjc8G7bGaez";
        var dbx = new Dropbox({accessToken: ACCESS_TOKEN});
        var file = $("#doc")[0].files[0];
        dbx.filesUpload({path: '/Pruebita/' + file.name, contents: file})
                .then(function (response) {
                    console.log(response);
                    path = response.path_display;
                    console.log(path);
                    obj = {
                        path: path
                    };
                    $.ajax({
                        type: "POST",
                        url: URL + "createLink/",
                        processData: false,
                        contentType: 'application/json',
                        data: JSON.stringify(obj),
                        success: function (r) {
                            link = r.url;
                            console.log(typeof link);
                        }});
                })
                .catch(function (error) {
                    console.error(error);
                });
        setTimeout(function () {
            console.log("jaja");
            console.log(link);
            var SHARED_LINK = link;
            var dbx = new Dropbox({accessToken: ACCESS_TOKEN});
            dbx.sharingGetSharedLinkFile({url: SHARED_LINK})
                    .then(function (data) {
                        console.log(data);
                        console.log(data.fileBlob);
                        var downloadUrl = window.webkitURL.createObjectURL(data.fileBlob);
                        $("#bajar").attr("href", downloadUrl);
                        $("#bajar").attr("download", data.name);
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
        }, 10000);

    });
    $("#bajar").click(function () {
        console.log("bajando");
    });
});