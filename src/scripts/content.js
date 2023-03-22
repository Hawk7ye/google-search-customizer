function openLink(event, location, target) {
  event.preventDefault();
  window.open(location, target);
}

function replaceLinks() {
  try {
    let links = document.querySelectorAll("[data-rw]");
    for (let link of links) {
      let originalTarget = link.getAttribute("href");

      link.addEventListener("click", function (event) {
        openLink(event, originalTarget, "_self");
      });
      link.addEventListener("auxclick", function (event) {
        openLink(event, originalTarget, "_blank");
      });
    }
  } catch (error) {}
}

function replaceImageLinks() {
  try {
    document.querySelector("#plahover").remove();

    let links = document.querySelectorAll(".pla-unit");
    for (const link of links) {
      let originalTarget = link.querySelectorAll("a")[1].getAttribute("href");

      link.addEventListener("click", function (event) {
        openLink(event, originalTarget, "_self");
      });
      link.addEventListener("auxclick", function (event) {
        openLink(event, originalTarget, "_blank");
      });
    }
  } catch (error) {}
}

chrome.storage.sync
  .get("isEnabeled")
  .then((result) => {
    if (result["isEnabeled"]) {
      console.log(chrome.i18n.getMessage("enabled"));
      replaceLinks();
      replaceImageLinks();
    } else {
      console.log(chrome.i18n.getMessage("disabled"));
    }
  })
  .catch((err) => {
    console.error(err);
  });
