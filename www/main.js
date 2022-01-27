function toggleDisplay(e) {
  const expandableElement = e.parentElement.querySelector(".expandable");
  console.log(expandableElement);
  if (expandableElement) {
    if (expandableElement.classList.contains("collapsed")) {
      expandableElement.classList.remove("collapsed");
      expandableElement.parentElement.classList.remove("collapsed");
    } else {
      expandableElement.classList.add("collapsed");
      expandableElement.parentElement.classList.add("collapsed");
    }
  }
}
