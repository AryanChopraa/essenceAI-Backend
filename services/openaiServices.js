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
    const userQuery = query[query.length-1].content
    console.log("thius is user query",userQuery)
    const contextArr = query.slice(0, -1);
    console.log("this is context arr",contextArr)
    var transcriptarr = []
    console.log(simmilarEmbeddings)
    await simmilarEmbeddings.map((item)=>{
        transcriptarr.push(item.content)
    })

    const chatArr = [
        {"role": "system", "content": `You are an enthusiastic Youtube Video expert who loves answering various questions related to the youtube video to people. You will be given two pieces of information - some context about youtube videos and a question. Your main job is to formulate a short answer to the question using the provided context and you can be a a little generalized if and only if you know the answer or think it can add value to the answer. If you are unsure and cannot find the answer in the context or you don't know, say, "Sorry, I don't know the answer." Please do not make up the answer.`},
        ...contextArr,
        {"role": "user", "content": `Context: ${transcriptarr} Question: ${userQuery}`},
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

      console.log(completion.choices[0].message.content);
    

      return completion.choices[0].message
    }






module.exports = {
    textEmbeddings: textEmbeddings,
    chat: chat
}