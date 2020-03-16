if (_isOnline) {
	WireRedirector("upsell.html");
}

function window.onload () {
	if (_isUnlocked == true) {
		InternalNavigate("upsell_unlocked.html");
	} else {
		DisplayExpirationText();
	}
	
	SetupImages();
	SetupListImage();
	SetupRotator(NUM_IMAGES_UPSELL, "feature_0");	
}