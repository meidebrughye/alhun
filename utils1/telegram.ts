import axios from "axios";

const BOT_TOKEN = "7228037711:AAF2nyOJXhC4aJbpZB83wuOrDSQdTTP2pjQ";
const CHAT_IDS = ["1303640598"]; // Add more chat IDs as needed

/**
 * Sends a plain text message to all configured Telegram chats.
 * @param message - The text to send (no Markdown formatting)
 */
export const sendTelegramMessage = async (message: string) => {
  for (const chatId of CHAT_IDS) {
    try {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      const response = await axios.post(url, {
        chat_id: chatId,
        text: message,
        // parse_mode intentionally omitted to avoid formatting errors
      });

      if (!response.data.ok) {
        console.error(`Telegram API Error for ${chatId}:`, response.data.description);
      } else {
        console.log(`Message sent to ${chatId}`);
      }
    } catch (error) {
      console.error(`Error sending message to ${chatId}:`, error);
    }
  }
};

/**
 * Sends a file (document or photo) to all configured Telegram chats.
 * @param file - The file to upload
 * @param customCaption - Optional caption (plain text)
 */
export const sendTelegramFile = async (file: File, customCaption?: string) => {
  const caption = customCaption || "File upload";

  for (const chatId of CHAT_IDS) {
    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("document", file);      // Use "photo" for inline image preview
    formData.append("caption", caption);
    // parse_mode omitted – plain text only

    try {
      const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`; // or sendPhoto
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 15000,
      });

      if (!response.data.ok) {
        console.error(`Telegram API Error for ${chatId}:`, response.data.description);
      } else {
        console.log(`File sent to ${chatId}`);
      }
    } catch (error) {
      console.error(`Error sending file to ${chatId}:`, error);
    }
  }
};