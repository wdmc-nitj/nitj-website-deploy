import { faker } from "https://cdn.skypack.dev/@faker-js/faker@7.6.0"
		  
window.addEventListener("DOMContentLoaded",() => {
	const t = new Timeline(".timeline");
});

class Timeline {
	articles = [];

	constructor(el) {
		this.el = document.querySelector(el);

		this.init();
	}
	init() {
		this.generateArticles();
		this.removeLoading();
		this.build();
		this.observeArticles();
	}
	build() {
		const itemContainer = this.el.querySelector("[data-items]");
		if (!itemContainer) return;

		const localeCode = "en-US";

		this.articles.forEach(article => {
			const time = document.createElement("time");
			time.className = "timeline__item-time";

			const DRaw = new Date(article.date);
			const D = {
				y: DRaw.getFullYear(),
				m: DRaw.getMonth() + 1,
				d: DRaw.getDate()
			};

			if (D.m < 10) D.m = `0${D.m}`;
			if (D.d < 10) D.d = `0${D.d}`;

			time.setAttribute("datetime", `${D.y}-${D.m}-${D.d}`);

			const articleDateLocal = DRaw.toLocaleDateString(localeCode,{
				year: "numeric",
				month: "long",
				day: "numeric"
			});
			time.innerText = articleDateLocal;

			const link = document.createElement("a");
			link.className = "timeline__item-link";
			link.href = "#";
			link.innerText = article.title;

			const published = document.createElement("small");
			published.className = "timeline__item-pub";
			published.innerText = article.publisher;

			const item = document.createElement("li");
			item.className = "timeline__item";
			item.appendChild(time);
			item.appendChild(document.createElement("br"));
			item.appendChild(link);
			item.appendChild(document.createElement("br"));
			item.appendChild(published);

			itemContainer.appendChild(item);
		});
	}
	generateArticles() {
		const articleCount = 30;

		try {
			for (let a = 0; a < articleCount; ++a) {
				const adjective = faker.company.catchPhraseAdjective();
				const noun = faker.company.catchPhraseNoun();

				this.articles.push({
					title: this.toTitleCase(`${adjective} ${noun}`),
					date: faker.date.past(10),
					publisher: faker.company.name(),
				});
			}
		} catch (err) {
			console.log("Faker unavailable");
		}
		// reverse chronological order
		this.articles.sort((a,b) => b.date - a.date);
	}
	observeArticles() {
		this.observer = new IntersectionObserver(
			entries => { 
				entries.forEach(entry => {
					const { target } = entry;
					const itemIn = "timeline__item--in";

					if (entry.isIntersecting) target.classList.add(itemIn);
					else target.classList.remove(itemIn);
				});
			}, {
				root: null,
				rootMargin: "0px",
				threshold: 1
			}
		);
		// observe the items
		const items = document.querySelectorAll(".timeline__item");
		Array.from(items).forEach(item => {
			this.observer.observe(item);
		});
	}
	removeLoading() {
		const loading = this.el.querySelector("[data-loading]");
		if (!loading) return;

		this.el.removeChild(loading);
	}
	toTitleCase(title) {
		return title.split(" ").map(word => word[0].toUpperCase() + word.substring(1)).join(" ");
	}
}