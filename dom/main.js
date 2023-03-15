const alterText = () => 
{
    const text = document.querySelector('p')
    text.innerHTML = "Engenharia de Software"
    text.style.color = "#F33"
}

const consoleLog = () => 
{
    const text = document.querySelectorAll('.name')

    console.log(text[0])
}

alterText()
consoleLog()