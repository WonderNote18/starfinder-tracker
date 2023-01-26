  function changeActiveTab(e, tabID) {
    let element = event.target;
    while (element.nodeName !== "A") {
      element = element.parentNode;
    }
    tabList = element.parentNode.parentNode;
    tabOptions = tabList.querySelectorAll("li > a");
    tabContents = document.querySelectorAll(".tab-content > div");
    for (let i = 0; i < tabOptions.length; i++) {
      tabOptions[i].classList.remove("formTabHeaderActive");
      tabOptions[i].classList.add("formTabHeaderInactive");
      tabContents[i].classList.add("hidden");
      tabContents[i].classList.remove("block");
    }
    element.classList.remove("formTabHeaderInactive");
    element.classList.add("formTabHeaderActive");
    document.getElementById(tabID).classList.remove("hidden");
    document.getElementById(tabID).classList.add("block");
  }

  module.exports = { changeActiveTab }