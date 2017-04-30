/////////////////////////////////////////////////////////////
////////////////                                           //
//SCREENSHOTS CANVAS TO IMAGE (base64) TO SERVER UPLOAD // //
////////////////                                           //
/////////////////////////////////////////////////////////////
function screen(argument) {
    html2canvas(document.body, {
        onrendered: function(canvas) {
            // var my = document.body.appendChild(canvas);
            // my.setAttribute("id", "myCan");             //creating intermediate canvas 
            c2i(canvas);
        }
    });
}

function c2i(canvas) {
    //var canvas = document.getElementById('myCan'),
    dataUrl = canvas.toDataURL();
    //alert(dataUrl);
    // var blob = dataURItoBlob(dataUrl);
    // alert(blob);
    // var form=$('form')[0];
    // var fd = new FormData();
    // fd.append("fileUploadKey", blob);

    //checkURL = blob;
    //screenShotUpload();


    //imageFoo = document.createElement('img');
    //imageFoo.src = dataUrl;
    //imageFoo.style.width = '100%';
    //imageFoo.style.height = '100%';
    //document.body.appendChild(imageFoo);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //copyTextToClipboard(server+xhttp.responseText.trim());
            copyToClipboard(server + xhttp.responseText.trim());
        }
    };
    xhttp.open("POST", "http://test.terasol.in/moonis/msg/screenShotUpload.php", true);
    var parameters = "screen=" + dataUrl;
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(parameters);

}

function copyToClipboard(text) {
    window.prompt("Copy to clipboard:", text);
}
///////////////////////////////////////
//works in browser but not on mobile //
///////////////////////////////////////
function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");

    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';


    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        alert('Link Copied To Your Clipboard');
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
}


// var copyBobBtn = document.querySelector('.js-copy-bob-btn'),
//   copyJaneBtn = document.querySelector('.js-copy-jane-btn');

// copyBobBtn.addEventListener('click', function(event) {
//   copyTextToClipboard('Bob');
// });


// copyJaneBtn.addEventListener('click', function(event) {
//   copyTextToClipboard('Jane');
// });

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}


function screenShotUpload() {
    alert("in upload file:" + checkURL);
    // already filled in global variables-----var fileURL = "///storage/emulated/0/DCIM/myFile"
    var uri = encodeURI("http://test.terasol.in/moonis/msg/screenShotUpload.php");
    //console.log(uri);
    var options = new FileUploadOptions();

    options.fileKey = "fileUploadKey";
    options.fileName = checkURL.substr(checkURL.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.httpMethod = 'POST';
    var params = {};
    params.id = localStorage.getItem("PROID");
    //params.value2 = "param";
    options.params = params;
    options.chunkedMode = false;
    var headers = {
        'headerParam': 'headerValue'
    };
    options.headers = headers;

    var ft = new FileTransfer();

    ft.upload(checkURL, uri, onSucc, onErr, options); //main function of the plugin for upload (file URL,Server add,win,fail,opt)
    //success handler
    function onSucc(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        alert(r.response);
    }
    //error handler
    function onErr(error) {
        console.log("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
        alert("Failure");
    }
}

//------------------------------------------ END SCREEN SHOT -----------------------------------------------//