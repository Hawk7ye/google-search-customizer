const input_isEnabled = document.querySelector("#input_isEnabled");

// Show chrome.notifications
function showStatusNotification(msg) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "/public/images/favicon.ico",
    title: "Google Search Customizer",
    message: msg,
    priority: 0,
  });
}

// Saves options to chrome.storage
function save_options() {
  var isEnabeled = input_isEnabled.checked;
  chrome.storage.sync.set(
    {
      isEnabeled: isEnabeled,
    },
    function () {
      // Update status to let user know options were saved.
      if (isEnabeled) {
        msg = chrome.i18n.getMessage("enabled");
      } else {
        msg = chrome.i18n.getMessage("disabled");
      }
      showStatusNotification(msg);
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(
    {
      isEnabeled: false,
    },
    function (items) {
      input_isEnabled.checked = items.isEnabeled;
    }
  );
}

document.addEventListener("DOMContentLoaded", restore_options);
input_isEnabled.addEventListener("change", save_options);
