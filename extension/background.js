chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(
    tab.id,
    {
      code: `
        const participants = Array.from(
          document.querySelectorAll(".participant-name + div")
        )
        .map(p => p.textContent.trim())
        .map(fullName => fullName.split(" ")[0]);

        const dateRegex = /\\b\\d{1,2} (January|February|March|April|May|June|July|August|September|October|November|December) \\d{4}\\b/;
        const divs = document.querySelectorAll("div");
        const matchingDivs = Array.from(divs).filter(div => dateRegex.test(div.textContent));
        const dateMatch = matchingDivs.length ? matchingDivs[0].textContent.match(dateRegex)[0] : "";

        ({ participants, date: dateMatch });
      `,
    },
    function (results) {
      if (!results || !results[0]) {
        console.warn("No results returned. Maybe the page is not ready or not accessible.");
        return;
      }

      const { participants, date } = results[0];
      console.log("Players (first names only):", participants);
      console.log("Date:", date);

      const encodedList = encodeURIComponent(JSON.stringify(participants));
      const title = encodeURIComponent("Entelect Padel: " + date);

      const url = `https://tourn-event.vercel.app/event-create.html?playerList=${encodedList}&title=${title}`;
      chrome.tabs.create({ url });
    },
  );
});
