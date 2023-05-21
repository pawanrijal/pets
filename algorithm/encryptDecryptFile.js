/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Encrypt/decrypt files                                                                         */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

function encryptFile(file) {
  // use FileReader.readAsArrayBuffer to handle binary files
  var reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = function (evt) {
    $("body").css({ cursor: "wait" });

    // Aes.Ctr.encrypt expects a string, but converting binary file directly to string could
    // give invalid Unicode sequences, so convert bytestream ArrayBuffer to single-byte chars
    var contentBytes = new Uint8Array(reader.result); // ≡ evt.target.result
    var contentStr = "";
    for (var i = 0; i < contentBytes.length; i++) {
      contentStr += String.fromCharCode(contentBytes[i]);
    }

    var password = $("#password-file").val();

    var t1 = new Date();
    var ciphertext = Aes.Ctr.encrypt(contentStr, password, 256);
    var t2 = new Date();

    // use Blob to save encrypted file
    var blob = new Blob([ciphertext], { type: "text/plain" });
    var filename = file.name + ".encrypted";
    saveAs(blob, filename);

    $("#encrypt-file-time").html((t2 - t1) / 1000 + "s"); // display time taken
    $("body").css({ cursor: "default" });
  };
}

function decryptFile(file) {
  // use FileReader.ReadAsText to read (base64-encoded) ciphertext file
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function (evt) {
    $("body").css({ cursor: "wait" });

    var content = reader.result; // ≡ evt.target.result
    var password = $("#password-file").val();

    var t1 = new Date();
    var plaintext = Aes.Ctr.decrypt(content, password, 256);
    var t2 = new Date();

    // convert single-byte character stream to ArrayBuffer bytestream
    var contentBytes = new Uint8Array(plaintext.length);
    for (var i = 0; i < plaintext.length; i++) {
      contentBytes[i] = plaintext.charCodeAt(i);
    }

    // use Blob to save decrypted file
    var blob = new Blob([contentBytes], { type: "application/octet-stream" });
    var filename = file.name.replace(/\.encrypted$/, "") + ".decrypted";
    saveAs(blob, filename);

    $("#decrypt-file-time").html((t2 - t1) / 1000 + "s"); // display time taken
    $("body").css({ cursor: "default" });
  };
}
