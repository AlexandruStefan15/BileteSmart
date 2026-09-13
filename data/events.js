import { images } from "@/assets/images";

export const events = [
	{
		id_event: "129",
		title: "CS GLORIA 2018 BN - CSM SLATINA",
		subtitle: "Complex Sportiv Polivalent TeraPlast Arena",
		event_img: "https://timponline.ro/wp-content/uploads/2025/04/494343811_661552870180862_5699633605865152324_n.jpg",
		eventCard_img:
			"https://timponline.ro/wp-content/uploads/2025/04/494343811_661552870180862_5699633605865152324_n.jpg",
		event_type: "Sportiv",
		event_type_name: "Baschet Masculin SC 2024-2025",
		logo_images: [images.gloriaBistritaLogo, images.csmSlatinaLogo], //links to images
		time: "17:00",
		date: "2025-05-03",
		location: {
			id: 1,
			city: "Bistrita",
		},
		demo: "1",
	},
	{
		id_event: "138",
		title: "CS GLORIA BISTRITA - STORHAMAR HANDBALL ELITE",
		subtitle: "Complex Sportiv Polivalent TeraPlast Arena",
		event_img:
			"https://rasunetul.ro/sites/default/files/styles/galleryformatter_slide/public/articole/2025/09/meci.jpg?itok=Wr8juHMj",
		eventCard_img:
			"https://rasunetul.ro/sites/default/files/styles/galleryformatter_slide/public/articole/2025/09/meci.jpg?itok=Wr8juHMj",

		event_type: "Sportiv",
		event_type_name: "Champions League",
		logo_images: [images.gloriaBistritaLogo, images.storhamarLogo],
		time: "17:00",
		date: "2025-09-06",
		location: {
			id: 1,
			city: "Bistrita",
		},
		demo: "0",
	},
	{
		id_event: "123",
		title: "FC ARGES - CSM GALATI",
		subtitle: "Complex Sportiv Polivalent Pitesti Arena",
		event_img: "https://fotbalclubarges.ro/wp-content/uploads/2025/10/vsgalati-1-2-scaled.jpg",
		eventCard_img: "https://fotbalclubarges.ro/wp-content/uploads/2025/10/vsgalati-1-2-scaled.jpg",
		event_type: "Sportiv",
		event_type_name: "Baschet Masculin SC 2024-2025",
		logo_images: [images.fcArges, images.csmGalati],
		time: "17:00",
		date: "2025-04-26",
		location: {
			id: 2,
			city: "Pitesti",
		},
		demo: "0",
	},
	{
		id_event: "91",
		title: "ROMANIA - CROATIA",
		subtitle: "Sala Polivalentă Alba Blaj",
		event_img: "https://alba-sport.ro/wp-content/uploads/2025/08/1-3.jpg",
		eventCard_img: "https://alba-sport.ro/wp-content/uploads/2025/08/1-3.jpg",
		event_type: "Sportiv",
		event_type_name: "CEV EuroVolley 2026 Qualifiers",
		logo_images: [images.romaniaFlag, images.croatiaFlag],
		time: "18:00",
		date: "2025-08-06",
		location: {
			id: 3,
			city: "Blaj",
		},
		demo: "0",
	},
];
