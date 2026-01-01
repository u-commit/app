
import { GoogleGenAI } from "@google/genai";
import { MOCK_PRODUCTS } from "../constants";

// Fix: Strictly use the environment variable for initialization as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Bạn là một chuyên gia tư vấn công nghệ tại TechHaven. 
Dưới đây là danh sách sản phẩm hiện có của cửa hàng:
${JSON.stringify(MOCK_PRODUCTS, null, 2)}

Nhiệm vụ của bạn:
1. Tư vấn kỹ thuật chuyên sâu (giải thích về chip, màn hình, pin, hiệu năng).
2. So sánh các sản phẩm để khách hàng chọn được thiết bị phù hợp với nhu cầu (làm đồ họa, chơi game, văn phòng).
3. Luôn giữ thái độ chuyên nghiệp, am hiểu công nghệ và lịch sự.
4. Trả lời bằng tiếng Việt.
5. Nếu khách hỏi về sản phẩm không có, hãy gợi ý thiết bị có thông số kỹ thuật tương đương nhất trong cửa hàng.
`;

export const getShoppingAdvice = async (userPrompt: string) => {
  try {
    // Fix: Use generateContent directly as required.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.6,
      },
    });

    // Fix: Access the text output via the .text property (not a method).
    return response.text || "Hệ thống đang bận một chút, bạn vui lòng hỏi lại sau nhé!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Rất tiếc, TechHaven AI đang gặp sự cố kết nối. Hãy thử lại sau!";
  }
};
