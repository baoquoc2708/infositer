window.infositeConfig = {
	style: {
		responsive: false, // flag to determine responsive style to add to program 
		cssUrl: {
			mobile: 'http://img.staging.medscapestatic.com/pi/sites/infosite/infositeR_POC/css/mobile.css', // url for mobile css (non responsive)
			desktop: 'http://img.staging.medscapestatic.com/pi/sites/infosite/infositeR_POC/css/desktop.css', // url for desktop css (non responsive)
			responsive: 'http://img.staging.medscapestatic.com/pi/sites/infosite/infositeR_POC/css/responsive.css' // url for responsive css 
		}
	},
	features: { // external features incusion flag
		navigation: true,
		giftmanager: true,
		qna: false,
		svplayer: false
	},
	navigation: {
		navDesktopStyle: "top", // manu options top, right, left 
		navMobileStyle: 'top', //  humburger manu options top, right, left 
		navTabletStyle: true,   // options for tab manu true, false
		navMenu: [
			{
				title: "Infosite Home",
				url: "article-1",
				submenu: [
					{
						title: "Salutrib (somaet iatrob) 50mg",
						url: "article-2"
					},
					{
						title: "Treatment Guidelines",
						url: "article-3"
					},
					{
						title: "Clinical Data",
						url: "article-4"
					},
					{
						title: "Video: MOA",
						url: "article-5"
					}
				]
			},
			{
				title: "Important Safety Information",
				url: "#isi",
				submenu:[
					{
						title: "Efficacy and Safety Data",
						url: "article-6"
					}
				]
			},
			{
				title: "Prescribing Information",
				url: "http://www.medscape.com"
			}
		]

	}
};