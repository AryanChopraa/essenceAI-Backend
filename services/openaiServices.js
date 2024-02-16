const OpenAI = require("openai");
require('dotenv').config()


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const textEmbeddings = async(splittedText) => {

    const vectorArr = []
   
    if (typeof(splittedText) == "string") {
        const embedding = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: splittedText,
            encoding_format: "float",
        });

        return embedding.data[0].embedding
      
        
       }
       else{
        await Promise.all(splittedText.map(async(item) => {
           const tempObj = {};
           tempObj['content'] = item;
           const embedding = await openai.embeddings.create({
               model: "text-embedding-3-small",
               input: item,
               encoding_format: "float",
           });

           tempObj['embedding'] = embedding.data[0].embedding;
           vectorArr.push(tempObj);
       }));
       return vectorArr
    }
}

const chat = async(query,simmilarEmbeddings) => {
    const transcript = simmilarEmbeddings.map((item)=>{
        return item.content

    })

    [
        {
          id: 81,
          content: "of coding don't try to program before you know how to code and don't waste all of your time coding and not programming subscribe smash the like button and go break some eggs",
          similarity: 0.999998807907112
        }
      ]
    const chatArr = [

        {"role": "system", "content": "You are a chat with video assistant that replies to queries related to the youtube video whose link is shared with you , so be polite and useful , the user will ask you a question about the video and you will be provided with the simmillar simmilarity search you will receive the related video transcripts , stick to those transcripts and try to answer the query , DONT TALK GIBBERISH OR talk general rubbish be clear and precise and if you Dont know a answer just say ## Really sorry , but i Dont know the answer to that ! Try again ##"},
        {"role": "user", "content": `Question: ${query} , Related video transcripts array:${transcript}`},
        ]
    console.log(chatArr)

    const completion = await openai.chat.completions.create({
        messages:chatArr ,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        model: "gpt-4",
      });

      console.log(completion.choices[0]);
    }






module.exports = {
    textEmbeddings: textEmbeddings,
    chat: chat
}