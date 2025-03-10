function toggle(id) {
    var contenido = document.getElementById(id);
    contenido.style.display = (contenido.style.display === "block") ? "none" : "block";
}

function searchText() {
    var input = document.getElementById('searchBox').value.trim().toLowerCase();
    var temas = document.querySelectorAll('.contenido');
    var count = 0;

    // Eliminar resaltado previo
    document.querySelectorAll('.highlight').forEach(span => {
        span.replaceWith(document.createTextNode(span.textContent));
    });

    if (input.length > 0) {
        temas.forEach(tema => {
            let textNodes = [];
            let walker = document.createTreeWalker(tema, NodeFilter.SHOW_TEXT, null, false);

            while (walker.nextNode()) {
                textNodes.push(walker.currentNode);
            }

            textNodes.forEach(node => {
                let words = node.nodeValue.split(/\b/); // Divide el texto en palabras
                let newText = words.map(word => 
                    word.toLowerCase().includes(input) ? `<span class="highlight">${word}</span>` : word
                ).join('');

                if (newText !== node.nodeValue) {
                    let tempElement = document.createElement("span");
                    tempElement.innerHTML = newText;
                    node.replaceWith(...tempElement.childNodes);
                    count += (node.nodeValue.toLowerCase().split(input).length - 1); // Contar ocurrencias
                }
            });
        });
    }

    document.getElementById('searchCount').innerText = count;
}
