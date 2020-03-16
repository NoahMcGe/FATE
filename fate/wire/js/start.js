if (_isOnline) {
	WireRedirector("start.html");
} else if (_isUnlocked) {
	ExitShell();
}

function window.onload () 
{	
	SetupImages();
	SetupListImage();
	SetupRotator(NUM_IMAGES_UPSELL, "feature_0");
	
	if (_isUnlocked == true){		
		HideElement("btn_buy_now");
		HideElement("btn_unlock");
		HideElement("only_price");
		HideElement("expiration");
	} else {
		HideElement("btn_more_games");
		DisplayExpirationText();
	}
}