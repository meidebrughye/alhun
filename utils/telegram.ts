import axios from "axios";

export const sendTelegramMessage = async (message: string) => {
  const botToken = "7228037711:AAF2nyOJXhC4aJbpZB83wuOrDSQdTTP2pjQ";

  // Multiple chat IDs
  const chatIds = ["5074398256", "1303640598"];

  if (!botToken || chatIds.length === 0) {
    console.error("Bot token or chat IDs are missing.");
    return;
  }

  let locationInfo = "";

  try {
    // Get Public IP
    const ipResponse = await axios.get("https://api.ipify.org?format=json");
    const ip = ipResponse.data.ip;

    // Get Geolocation Data
    const locationResponse = await axios.get(`https://ipwho.is/${ip}`);
    const location = locationResponse.data;

    if (location.success) {
      locationInfo = `
IP Address: ${ip}
Country: ${location.country}
City: ${location.city}
ISP: ${location.connection.isp}
`;
    } else {
      locationInfo = "Geolocation lookup failed.";
    }
  } catch (error) {
    console.error("Error fetching location:", error);
    locationInfo = "Failed to fetch location.";
  }

  const finalMessage = `${message}\n\n📍 Location Info:\n${locationInfo}`;

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    for (const chatId of chatIds) {
      const response = await axios.post(url, {
        chat_id: chatId,
        text: finalMessage,
      });

      if (response.data.ok) {
        console.log(`Message sent to ${chatId}`);
      } else {
        console.error(`Telegram API Error for ${chatId}:`, response.data.description);
      }
    }
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
};