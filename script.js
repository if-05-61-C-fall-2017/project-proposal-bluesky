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

//Ok, I admit it. This piece of code isn't very elegant.
function createFootnotes() {
    [...document.getElementsByClassName("contentText")].forEach(element => {
        let footnotes = element.getElementsByTagName("footnote");
        let footnoteList = document.createElement("ol");
        footnoteList.classList.add("footnoteList");
        [...footnotes].forEach((footnote, i) => {
            //Clickable & visible part of the footnotes
            let footnoteText = footnote.innerHTML;
            footnote.innerHTML = "";

            let numberElement = document.createElement("sup");
            numberElement.appendChild(
                document.createTextNode(`[${i + 1}]`)
            );

            let textElement = document.createElement("span");
            textElement.appendChild(
                document.createTextNode(footnoteText)
            );
            textElement.classList.add("footnoteText");

            numberElement.addEventListener("click", (event) => {

                textElement.style.display =
                    (textElement.style.display == "initial") ? "none" : "initial";
                event.stopPropagation();
                return false;
            });

            footnote.appendChild(numberElement);
            footnote.appendChild(textElement);
            footnote.style.display = "initial";

            //Footnotes
            let footnoteListElement = document.createElement("li");
            footnoteListElement.appendChild(document.createTextNode(footnoteText));
            footnoteList.appendChild(footnoteListElement);
        });

        element.appendChild(footnoteList);
    });

    let footnoteTextElements = [...document.getElementsByClassName("footnoteText")];
    document.addEventListener("click", (event) => {
        if (!event.target.classList.contains("footnoteText")) {
            footnoteTextElements.forEach(element => {
                element.style.display = "none";
            });
        }
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

//But this one is beautiful because REGEX!
function stripNonLetters(text) {
    return text.replace(/[^a-zA-Z]/g, "");
}
