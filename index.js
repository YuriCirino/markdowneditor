//separate the text in lines
//analize in the line in:
//Heading tags
//Bold tags
//Anchor tags
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
    'image':/![\[]([\w+|\s+]+)[\]][(]([\S+]+)[)]/gm
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

// function processChange() {
//   let text
//   let tagToCreate = 'div'
//   clearTimeout(timer)
//   timer = setTimeout(() => {
//     result.innerHTML = ''
//     text = main.value
//     lines = text.split('\n')

//     lines.forEach((line) => {
//       Object.entries(regexs).forEach(arr => {
//         let [tag, expression] = arr
//         if (line.match(expression)) {
//           tagToCreate = tag
//           line = line.replace(expression, '$2')
//         }
//       })

//       result.appendChild(CreateNewElement(tagToCreate, line))
//     })
//   }, 300)
// }

function processChange2() {
    let newInnerHtml = ""
    clearTimeout(timer)
    timer = setTimeout(() => {
        let plainText = main.innerText
        let splited = plainText.split("**")
        splited.forEach((part, index) => {
            if (index % 2 == 0) {
                newInnerHtml += part
            } else {
                newInnerHtml += `<strong>${part}</strong>`
            }
        })
        let selectedTag = ""
        result.innerHTML = newInnerHtml
        plainText = newInnerHtml
        newInnerHtml = ""
        splited = plainText.split("\n")
        splited.forEach((line) => {
            selectedTag = "p"

            Object.entries(regexs.headings).forEach((arr) => {
                let [tag, expression] = arr
                if (line.match(expression)) {
                    line = line.replace(expression, "")
                    selectedTag = tag
                }
            })
            newInnerHtml += `<${selectedTag}>${line}</${selectedTag}>`
        })
        console.log(newInnerHtml)
        newInnerHtml = newInnerHtml.replaceAll(regexs.image,'<img alt="$1" src="$2">')
        newInnerHtml = newInnerHtml.replaceAll(regexs.link, '<a href="$2">$1</a>')
        result.innerHTML = newInnerHtml
    }, 300)
}

main.addEventListener("input", processChange2)
