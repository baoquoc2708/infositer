window.infositeConfig = {
	projectName: 'infosite', // project name infoste or infositeR for routing 
	programName: 'infositeR_POC', // program name 
	articleDirectory: 'article', // content directory ariticles in case of routing
	articleMain:'article-home', // main article whe program loads without specific article url
	routing:true, // if its false page will redirect on navigation 
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
		navDesktopStyle: "top", // manu options top, right-static, left-static, right, left 
		navMobileStyle: 'top', //  humburger manu options top, right, left 
		navTabletStyle: true,   // options for tab manu true, false
		navMenu: [
			{
				title: "Infosite Home",
				url: "article-home",
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
						url: "article-1"
					}
				]
			},
			{
				title: "Prescribing Information",
				url: "http://www.medscape.com",
				target: '_blank',
				submenu:[]
			}
		]
	}
};