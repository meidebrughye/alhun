import fetch from 'node-fetch';

const sendTelegramMessage = async (message) => {
  const botToken = "6762586641:AAGKxFGSTwVTS74uWVZiHOS08dFWlMKspt8";
  const chatId = "1521031934";

  try {
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message to Telegram");
    }

    const responseData = await response.json();
    console.log("Message sent successfully to Telegram:", responseData);
  } catch (error) {
    console.error("Error sending Telegram message:", error.message);
  }
};

sendTelegramMessage("Hello from Node.js!");
