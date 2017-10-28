/*global contentList planningTable planningTableStyleSwitcher*/
main();

function main() {
    createContentList();
    scrollToHashElement();

    window.addEventListener("hashchange", scrollToHashElement);

    planningTableStyleSwitcher.addEventListener("click", () => {
        planningTable.classList.toggle("flowChartTable");
    });

    createFootnotes();
}

function createFootnotes() {
    [...document.getElementsByClassName("contentText")].forEach(element => {
        let footnotes = document.getElementsByTagName("footnote");
        let footnoteList = document.createElement("ol");
        footnoteList.classList.add("footnoteList");
        [...footnotes].forEach((footnote, i) => {
            let footnoteText = footnote.innerHTML;
            footnote.innerHTML = "";
            let numberElement = document.createElement("sup");
            numberElement.appendChild(
                document.createTextNode(`[${i + 1}]`)
            );
            numberElement.addEventListener("click", (event) => {

            });
            footnote.appendChild(numberElement);
            //TODO Stefan, make this bettah
            footnote.style.display = "initial";


            let footnoteListElement = document.createElement("li");
            footnoteListElement.appendChild(document.createTextNode(footnoteText));
            footnoteList.appendChild(footnoteListElement);
        });

        element.appendChild(footnoteList);
    });
}

function createContentList() {
    let headers = document.getElementsByClassName("contentHeader");
    [...headers].forEach(header => {
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
    if (!window.location.hash) return;
    document
        .getElementsByClassName(stripNonLetters(decodeURIComponent(window.location.hash)))[0]
        .scrollIntoView(true);

}

function stripNonLetters(text) {
    return text.replace(/[^a-zA-Z]/g, "");
}
