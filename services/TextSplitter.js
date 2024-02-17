const { CharacterTextSplitter } = require("langchain/text_splitter");

// LangChain text splitter
async function splitDocument(text) {
  const arrOfText = []  

  const splitter = new CharacterTextSplitter({
    separator: " ",
    chunkSize: 500,
    chunkOverlap: 100,
  });
  
  const output = await splitter.createDocuments([text]);
  output.map((item) => {
    arrOfText.push(item.pageContent)
  })

  return arrOfText;

}

module.exports = splitDocument;
