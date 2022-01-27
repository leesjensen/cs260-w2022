function toggleDisplay(e) {
  const expandableElement = e.parentElement.querySelector(".expandable");
  console.log(expandableElement);
  if (expandableElement) {
    if (expandableElement.classList.contains("expanded")) {
      expandableElement.classList.remove("expanded");
    } else {
      expandableElement.classList.add("expanded");
    }
  }
}
