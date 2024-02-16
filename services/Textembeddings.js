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




module.exports = textEmbeddings;