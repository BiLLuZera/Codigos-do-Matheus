let botao = document.querySelector(".botao-gerar")
let chave = "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"
let endereco = "https://api.groq.com/openai/v1/chat/completions"

async function gerarCodigo() {
    let textoUsuario = document.querySelector("textarea").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")

    let resposta = await fetch(endereco, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${chave}`
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{
                role: "system",
                content: "Você é um gerador de codigo HTML e CSS. Gere apenas o código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate no @keyframes. Se pedir algo piscando, use opacity no @keyframes. Se pedir algo com gradiente, use background: linear-gradient. Se pedir algo com borda, use border. Se pedir algo com sombra, use box-shadow."
            },
            {
                role: "user",
                content: textoUsuario
            }


            ]
        })
    })

    let dados = await resposta.json()
    let resultado = dados.choices[0].message.content
    blocoCodigo.textContent = resultado
    resultadoCodigo.srcdoc = resultado


    console.log(dados)
}

botao.addEventListener("click", gerarCodigo)
