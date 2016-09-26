window.infositeConfig = {
	infositeBasePath: '/infosite/infositeR_POC',
	routing:true,
	style: {
		responsive: false, // flag to determine responsive style to add to program 
		cssUrl: {
			mobile: 'http://localhost:8080/infositeR/css/mobile.css', // url for mobile css (non responsive)
			desktop: 'http://localhost:8080/infositeR/css/desktop.css', // url for desktop css (non responsive)
			responsive: 'http://localhost:8080/infositeR/css/responsive.css' // url for responsive css 
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
				url: "/article/article-1",
				targetBlank: true,
				submenu: [
					{
						title: "Salutrib (somaet iatrob) 50mg",
						url: "/article/article-2",
						targetBlank: true
					},
					{
						title: "Treatment Guidelines",
						url: "/article/article-3",
						targetBlank: true
					},
					{
						title: "Clinical Data",
						url: "/article/article-4",
						targetBlank: true
					},
					{
						title: "Video: MOA",
						url: "/article/article-5",
						targetBlank: true
					}
				]
			},
			{
				title: "Important Safety Information",
				url: "#isi",
				targetBlank: true,
				submenu:[
					{
						title: "Efficacy and Safety Data",
						url: "/article/article-6",
						targetBlank: true
					}
				]
			},
			{
				title: "Prescribing Information",
				url: "http://www.medscape.com",
				targetBlank: true
			}
		]

	}
};