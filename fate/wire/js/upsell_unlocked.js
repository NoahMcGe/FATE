if (_isOnline) {
	WireRedirector("upsell_unlocked.html");
}

function window.onload () {
	SetupImages();
	SetupListImage();
	SetupRotator(NUM_IMAGES_UPSELL_UNLOCKED, "cross_0");	
}