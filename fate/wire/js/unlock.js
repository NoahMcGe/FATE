if (_isOnline) {
	WireRedirector("unlock.html");
}
	
function window.onload () {
	SetupImages();
}

function inputSubmit () {
	var inputText = document.getElementById("unlock_textInput").value;
	var validateInput = inputText.match(/\w{4}[ -]{0,1}\w{4}[ -]{0,1}\w{4}/);

	if (!validateInput) {
		document.getElementById("errorText").innerHTML = "Invalid unlock code format.<br /><span class='smallerText'>(Example: 1234-5678-9ABC)</span><br />Please check your entry and try again.";
	} else {
		var unlocked = window.external.UnlockGame(inputText);	
		var lastUnlockError = window.external.GetValue("LastUnlockError");

		if (unlocked) {
			InternalNavigate("start.html");
		} else {
			var errorMessage = "";
			
			switch (parseInt(lastUnlockError)) {
				case 1:
					errorMessage = "You must be connected to the Internet to unlock. Please connect and try again.";
					break;
					
				case 2:
				case 3:
					errorMessage = "Could not connect to the Unlock Server.  Please make sure you are connected to the internet and are not running a firewall.  More info: <a href='http://support.wildgames.com' target='_blank'>http://support.wildgames.com</a>";
					break;
					
				case 4:
					errorMessage = "Invalid unlock code.<br />Please check your entry and try again.";
					break;
						
				default:
					errorMessage = "";
					break;
			}
			
			document.getElementById("errorText").innerHTML = errorMessage;
		}
	}
}