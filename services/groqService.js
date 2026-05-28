const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const askGroq = async (messages) => {
  try {
    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages,

        temperature: 0.2
      });

    return completion.choices[0].message.content;
  } catch (error) {
    console.log("Groq Error:", error.message);
    throw new Error("Groq AI Failed");
  }
};

module.exports = askGroq;