import { openai } from "../../config/gptClient";

export const createIngredientRating = async (ingArr) => {
  const systemMessage = {
    role: "system",
    content: `
      You are a dietary health expert. You will be provided an ingredient, and you will return a JSON object that contains the ingredient and its effects on three diseases: Irritable Bowel Syndrome (IBS), Crohn's Disease, and Ulcerative Colitis (UC).
      For each disease, include:
        1. A rating of how well the ingredient is tolerated (Good, Moderate, or Bad).
        2. An explanation of why the ingredient is rated that way for each disease.
      Please return the data in the following JSON format:
      {
        "ingredient": "example",
        "IBS Rating": "Good",
        "Crohn’s Rating": "Good",
        "UC Rating": "Good",
        "IBS Reason": "Explain why the ingredient is good for IBS.",
        "Crohn’s Reason": "Explain why the ingredient is good for Crohn’s.",
        "UC Reason": "Explain why the ingredient is good for UC."
      }
      Only return the JSON object, nothing else.
      `,
  };

  try {
    const responses = await Promise.all(
      ingArr.map(async (ing) => {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            systemMessage,
            { role: "user", content: `Ingredient: ${ing}` },
          ],
        });
        const assistantMessage = response.choices[0].message.content;
        const parsedData = JSON.parse(assistantMessage);
        return parsedData;
      })
    );

    console.log(responses);
    return responses;
  } catch (error) {
    console.error("Error generating ingredient ratings:", error);
  }
};
