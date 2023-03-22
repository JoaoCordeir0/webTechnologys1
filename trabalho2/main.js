const createEl = () => {
    // Criar elemento
    var titulo = document.createElement("h1");

    // Cria um texto para ser inserido dentro da tag h1
    var texto = document.createTextNode("Um título qualquer");
    
    // Adiciona o texto dentro da tag H1
    titulo.appendChild(texto);

    // Insere o elemento filho (titulo) ao elemento pai (body)
    document.body.insertBefore(titulo, document.getElementById("button")); 
}

const deleteEl = () => {
    document.body.removeChild(document.getElementsByTagName('h1'));
}

const replaceEl = () => {
    const newNode = document.createTextNode("Um título qualquer alterado");
    const element = document.getElementsByTagName("h1");
        
    element.replaceChild(newNode, element);
}