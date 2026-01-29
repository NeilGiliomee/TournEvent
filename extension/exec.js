(() => {
	// Get participant first names
	const participants = Array.from(
		document.querySelectorAll(".participant-name + div")
	)
		.map(p => p.textContent.trim())
		.map(fullName => fullName.split(" ")[0]);

	// Find date in any div text
	const dateRegex = /\b\d{1,2} (January|February|March|April|May|June|July|August|September|October|November|December) \d{4}\b/;
	const divs = document.querySelectorAll("div");
	const matchingDivs = Array.from(divs).filter(div =>
		dateRegex.test(div.textContent)
	);
	const dateMatch = matchingDivs.length
		? matchingDivs[0].textContent.match(dateRegex)[0]
		: "";

	console.log("Players (first names only):", participants);
	console.log("Date:", dateMatch);

	// Build URL
	const encodedList = encodeURIComponent(JSON.stringify(participants));
	const title = encodeURIComponent("Entelect Padel: " + dateMatch);

	const url = `https://tourn-event.vercel.app/event-create.html?playerList=${encodedList}&title=${title}`;

	console.log("Opening URL:", url);

	// Open in new tab
	window.open(url, "_blank");

	// Return values so you can inspect easily
	return { participants, date: dateMatch, url };
})();
