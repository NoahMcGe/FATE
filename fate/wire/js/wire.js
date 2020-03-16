var _displayName = " FATE";

var _dpName = (window.external.DPName).toLowerCase();
var _gameName =  (window.external.ContentName).toLowerCase();

var _isOnline = window.external.Online;
var _isUnlocked = window.external.Unlocked;
window.external.Title = _displayName;
window.external.EnableResize(false);

var VERSION = "11";
var NUM_IMAGES_UPSELL = 3;			// number of images for upsell rotation
var NUM_IMAGES_UPSELL_UNLOCKED = 3;	// number of images for unlocked upsell rotation
var NOT_IN_USE = -1;				// if sessions/plays/time is -1 then it is not in use

var _imageArray;					// array of rotation images
var _counter = 0;					// current image in rotation

// create the base image path to offline images
var _imageBasePath = window.external.BaseUrl + "wire/images/";

/** WIRE callback functions **/
function OnClose()
{
	// need to exit process so the game doesn't launch when using X, Alt-F4, Close
	window.external.ExitShellAndProcess();
}

function OnNavigateError(URL, errorCode)
{
	return false;
}

/** Show DEMO status functions **/
function DisplayExpirationText ()
{
	var sessionsRemaining = window.external.SessionsRemaining;
	var playsRemaining = window.external.PlaysRemaining;
	var timeRemaining = window.external.TimeRemaining; 
	var unitMeasure = "";
	
	if (!(sessionsRemaining == NOT_IN_USE)) {
		if (sessionsRemaining == 0) {
			DemoExpired();
		} else {
			unitMeasure = "session";
			SetRemainingMessage(sessionsRemaining, unitMeasure);
		}
	} else if (!(playsRemaining == NOT_IN_USE)) {
		if (playsRemaining == 0) {
			DemoExpired();
		} else {
			unitMeasure = "play";	
			SetRemainingMessage(playsRemaining, unitMeasure);
		}
	} else if (!(timeRemaining == NOT_IN_USE)) {
		if (timeRemaining == 0) {
			DemoExpired();
		} else {
			timeRemaining = Math.round(timeRemaining / 60);
			unitMeasure = "minute";
			SetRemainingMessage(timeRemaining, unitMeasure);
		}
	} else {
		// no demo mechanism is used by DRM so assume the game is handling
		SetExpirationHtml("");	
	}
}


function DemoExpired ()
{
	SetExpirationHtml("<span class='alert'>Demo play has expired.</span>")
	
	ShowElement("btn_play_now_expired");
	HideElement("btn_play_now");
}


function SetExpirationHtml (html)
{
	var element = document.getElementById("expiration");
	if (element != null) {
		element.innerHTML = html;
	}
}

function SetRemainingMessage (units, unitMeasure)
{
	if (units == "" || unitMeasure == "") {
		return;
	}

	if (units != 1) {
		unitMeasure = unitMeasure + "s";
	}

	SetExpirationHtml("You have <span class='highlight'>" + units + "</span>&nbsp;" + unitMeasure + " left.");
}

function ShowDisclaimer (show) {
	var element = document.getElementById("disclaimer");
	if (element != null) {
		if (show) {
			element.style.visibility = "visible";
		} else {
			element.style.visibility = "hidden";
		}	
	}
}

/** navigation functions **/
function GoBuyURL () {
	var url = window.external.BuyURL;
	window.open(url);
}

function InternalNavigate (pageName) {
	pageName = pageName + "?v=" + VERSION;
	window.navigate(pageName);
}

function OpenRedirector (pageName) {
	var url = "http://rdr.wildtangent.com/wire/" + pageName + "?dp=" + _dpName + "&itemName=" + _gameName;
	window.open(url);
}

function WireRedirector (pageName) {
	window.navigate("http://wire.wildgames.com/" + _gameName + "/" + _dpName + "/" + pageName + "?v=" + VERSION);
}

/** misc helper functions **/
function ExitShell ()
{
	// use this to exit the shell and continue as appropriate with containing application
	window.external.ExitShell();
}

function HideElement (elementId) 
{
	var element = document.getElementById(elementId)
	if (element != null) {
		element.style.visibility = "hidden";
	}
}

function ShowElement (elementId) 
{
	var element = document.getElementById(elementId)
	if (element != null) {
		element.style.visibility = "visible";
	}
}

/** image functions **/
function SetImageSourceById (imageId, imagePath) {
	var imageElement = document.getElementById(imageId);

	if (imageElement != null) {
		imageElement.src = _imageBasePath + imagePath;
	}
}

function SetImageSourceByName (imageName, imagePath) {
	var imageElement = document.getElementByName(imageName);

	if (imageElement != null) {
		imageElement.src = _imageBasePath + imagePath;
	}
}

function SetImageOver (imageElement, imagePath) {
	imageElement.style.cursor = "hand";
	imageElement.src = _imageBasePath + imagePath;
}

function SetImageOut (imageElement, imagePath) {
	imageElement.src = _imageBasePath + imagePath;
	imageElement.style.cursor = "default";
}

// rotates to the next image rotation array
function FeatureImageRotate() {
	_counter++;	
	if (_counter >= (_imageArray.length)) {
		_counter = 0;
	}

	document.feature_image.src = _imageArray[_counter].src;	
	setTimeout("FeatureImageRotate()", 2500);
}

// creates the image rotation array and begins rotation
function SetupRotator (imageNumber, baseImageName) {
	if (document.images) {
		_imageArray = new Array(imageNumber);
		
		for (var ii = 0; ii < imageNumber; ii++) {
			_imageArray[ii] = new Image();
			_imageArray[ii].src = _imageBasePath + baseImageName + ii + ".jpg";
		}
	}
	
	setTimeout("FeatureImageRotate()", 2000);
}

// loads all images from the local directory; the name attribute contains the name of the image
function SetupImages () {
	if (document.images) {
		var images = document.images;
		
		for (var ii = 0; ii < images.length; ii++) {
			if (images[ii].name != "") {
				images[ii].src = _imageBasePath + images[ii].name;
			}
		}
	}

	// load element background images
	var imgNavPath = _imageBasePath + "nav_gradient.jpg";
	var style = "#588DC7 url(" + imgNavPath + ") repeat-x";
	document.getElementById("top_nav").style.background = style;
	document.getElementById("bottom_nav").style.background = style;	
}

function SetupListImage () {
	// load list image (li) background images
	var imgBullet = _imageBasePath + "list_item_image.gif";
	var listItems = document.getElementsByTagName("li");
	for(var ii = 0; ii < listItems.length; ii++) {
		listItems[ii].style.background = "url(" + imgBullet + ") no-repeat 0 50%";
	}
}