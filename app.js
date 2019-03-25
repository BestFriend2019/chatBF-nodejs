const prompt = require('prompt-sync')();
const watson = require('watson-developer-cloud/assistant/v1');
require('dotenv').config();
const chatBot = new watson({
    username: '0a0bb0ea-a75b-45be-94eb-24c982c2ef69',
    password: 'L4A2dOInHL8z',
    version:  '2018-02-16',
});

const workspace_id = 'be4db96d-bf0f-4905-8544-1a462fbe1760';

//começamos a conversação com uma sms vazia
chatBot.message({workspace_id}, trataResposta);

let fimDeConversa = false;

function trataResposta(err, resposta) {
    if(err){
        console.log(err);
        return;
    }
    
    //detecta a intenção do usuario
    if(resposta.intents.length > 0){
        console.log("Eu detectei a intenção: " + resposta.intents[0].intent);
        if(resposta.intents[0].intent == 'despedida'){
            fimDeConversa = true;
        }
    }

    //exibi a resposta do dialogo
    if(resposta.output.text.length > 0){
        console.log(resposta.output.text);
    }

    if(!fimDeConversa){
        const mensagemUsuario = prompt(">> ");
        chatBot.message({
            workspace_id,
            input: {text: mensagemUsuario},
            context: resposta.context
        }, trataResposta);
    }
}