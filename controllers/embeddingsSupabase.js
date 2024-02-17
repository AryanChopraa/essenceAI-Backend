const { createClient } = require("@supabase/supabase-js");
require('dotenv').config()

const privateKey = process.env.SUPABASE_PUBLIC_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`);
const url = process.env.SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);
const supabase = createClient(url, privateKey);

const insertEmbeddings = async (data) => {
    var count=0
    try {
        await Promise.all(data.map(async(item) => {
       
            try {
                await supabase.from('documents').insert({
                    content: item.content, 
                    embedding: item.embedding 
                });
            count++
        


            } catch (insertError) {
                console.error("Error inserting data:", insertError.message);
            }
        }));
    console.log("Inserted", count, "documents");
    } 
    catch (error) {
        console.error("Error during insertion:", error.message);
    }
}

const getEmbeddings = async (queryVector) => {
    console.log(queryVector)

    const { data } = await supabase.rpc('match_documents', {
        query_embedding: queryVector,
        match_threshold: 0.35,
        match_count: 5
      });
    return data
}



module.exports = {
    insertEmbeddings: insertEmbeddings,
    getEmbeddings: getEmbeddings
  };