window.infositeConfig = {
	style: {
		responsive: false, // flag to determine responsive style to add to program 
		cssUrl: {
			mobile: '/InfositeR/css/mobile.css', // url for mobile css (non responsive)
			desktop: '/InfositeR/css/desktop.css', // url for desktop css (non responsive)
			responsive: '/InfositeR/css/responsive.css' // url for responsive css 
		}
	},
	features: { // external features incusion flag
		navigation: true,
		giftmanager: true,
		qna: false,
		svplayer: false
	},
	navigationDesktopStyle: "top", // manu options top, right, left 
	navigationMobileStyle: 'top', //  humburger manu options top, right, left 
	navigationTabletStyle: true,   // options for tab manu true, false
	navigation: [
		{
			title: "Infosite Home",
			url: "/article-1",
			submenu: [
				{
					title: "Salutrib (somaet iatrob) 50mg",
					url: "/article-2"
				},
				{
					title: "Salutrib (somaet iatrob) 50mg",
					url: "/article-3"
				},
				{
					title: "Salutrib (somaet iatrob) 50mg",
					url: "/article-4"
				},
				{
					title: "Salutrib (somaet iatrob) 50mg",
					url: "/article-5"
				}
			]
		},
		{
			title: "Important Safety Information",
			url: "#isi"
		},
		{
			title: "Prescribing Information",
			url: "http://www.medscape.com"
		}
	]
};