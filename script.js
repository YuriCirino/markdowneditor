// Using regex-replace to:
    //bold tag,
    //italic tag
    //link tag
    //image tag
    //Anchor tag
//Then split by \n
//Indetify the Heading tags
    //When analizyng the heading tags, is important take care on blank lines with line break
    //because it results in <p></p> 
//Indetify the blockquote tags

const regexs = {
    headings: {
        h1: /(^#\s)/gm,
        h2: /(^##\s)/gm,
        h3: /(^###\s)/gm,
        h4: /(^####\s)/gm,
        h5: /(^#####\s)/gm,
        h6: /(^######\s)/gm,
    },

    'link' : /[\[]([\w+|\s+]+)[\]][(]([\S+]+)[)]/gm,
    'image':/![\[]([\w+|\s+]+)[\]][(]([\S+]+)[)]/gm,
    blockquote: /(^>\s)/gm

}
const stylesByTag = {
    h1: " font-bold text-4xl mb-3",
    h2: " font-bold text-3xl mb-2.5",
    h3: " font-bold text-2xl mb-2",
    h4: " font-bold text-xl mb-1.5",
    h5: " font-bold text-lg mb-1.5",
    h6: " font-bold text-base mb-1.5",
    p: " my-1",
    blockquote: " px-6 py-2 bg-gray-100 border-l-4 border-gray-400 "
}

function CreateNewElement(tag, text) {
    let element = document.createElement(tag)
    let textNode = document.createTextNode(text)
    element.appendChild(textNode)
    return element
}
let main = document.getElementById("main")
main.value = ""
let result = document.getElementById("result")
let timer
let lines

function processChange() {
    let newInnerHtml
    clearTimeout(timer)
    timer = setTimeout(() => {
        newInnerHtml = ""
        let plainText = main.innerText
        //spliting by "**" to add strong tag
        let splited = plainText.split("**")
        splited.forEach((part, index) => {
            if (index % 2 == 0) {
                newInnerHtml += part
            } else {
                newInnerHtml += `<strong>${part}</strong>`
            }
        })
        
        plainText = newInnerHtml
        newInnerHtml = "" // reseting newInnerHtml
        //spliting by "__" to add i tag
        splited = plainText.split("__")
        splited.forEach((part,index) => {
            if(index % 2 == 0) {
                newInnerHtml += part
            }else{
                newInnerHtml += `<i>${part}</i>`
            }
        })
        //
        let selectedTag = ""
        result.innerHTML = newInnerHtml
        plainText = newInnerHtml
        newInnerHtml = ""
        //spliting text by line breaks
        splited = plainText.split("\n")
        console.log('splited by break line->',splited)
        splited.forEach((line) => {
            //going throug lines  to identify headings 
            selectedTag = "p" // by default, if no headings or blockquotes were found, put the line in paragraph tag

            Object.entries(regexs.headings).forEach((arr) => { // identifying headings, going through heading regexs objetc
                let [tag, expression] = arr
                if (line.match(expression)) {
                    line = line.replace(expression, "")
                    selectedTag = tag
                }
            })
            // now identifying blockquote in the line
            if(line.match(regexs.blockquote)) {
                selectedTag = "blockquote"
                line = line.replaceAll(regexs.blockquote, "")
            }
            
            newInnerHtml += `<${selectedTag} class="${stylesByTag[selectedTag]}">${line}</${selectedTag}>`
        })
        newInnerHtml = newInnerHtml.replaceAll(regexs.image,'<img alt="$1" src="$2">')
        newInnerHtml = newInnerHtml.replaceAll(regexs.link, '<a href="$2" class="text-sky-500 p-1 bg-gray-100 rounded">$1</a>')
        result.innerHTML = newInnerHtml
    }, 300)
}

main.addEventListener("input", processChange)
document.addEventListener("DOMContentLoaded",processChange);


