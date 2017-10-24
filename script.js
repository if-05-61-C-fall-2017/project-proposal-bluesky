/*global contentList planningTable planningTableStyleSwitcher*/
main();

function main() {
    createContentList();
    scrollToHashElement();
    
    window.addEventListener("hashchange", scrollToHashElement);
    planningTableStyleSwitcher.addEventListener("click", ()=>{
        planningTable.classList.toggle("flowChartTable");
    });
}

function createContentList() {
    let headers = document.getElementsByClassName("contentHeader");
    [...headers].forEach(header=> {
        let title = header.innerHTML;
        let strippedTitle = stripNonLetters(title);
        header.classList.add(strippedTitle);
        
        let linkElement = document.createElement("a");
        linkElement.href = "#" + strippedTitle;
        linkElement.appendChild(document.createTextNode(title));
        
        let newListElement = document.createElement("li");
        newListElement.appendChild(linkElement);
        contentList.appendChild(newListElement);
        
    });
}

function scrollToHashElement() {
    if(!window.location.hash) return;
    document
        .getElementsByClassName(stripNonLetters(decodeURIComponent(window.location.hash)))[0]
        .scrollIntoView(true);
    
}

function stripNonLetters(text) {
    return text.replace(/[^a-zA-Z]/g, "");
}