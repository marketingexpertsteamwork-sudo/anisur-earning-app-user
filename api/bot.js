// এই লাইব্রেরিটি ব্যবহার করে আমরা টেলিগ্রামের কাছে ডেটা পাঠাব
const axios = require('axios');

// Vercel এই ফাংশনটিকেই রান করবে যখন কোনো রিকোয়েস্ট আসবে
export default async function handler(request, response) {
    try {
        // --- দুটি জায়গা এখানে পরিবর্তন করতে হবে ---
        const BOT_TOKEN = '7799196873:AAGoDltGbp2L-gQ-9Iua9d9PYb1BizgXDkE'; // <-- আপনার টেলিগ্রাম বট টোকেন দিন
        const WEB_APP_URL = 'https://anisur-earning-app-user.vercel.app'; // <-- আপনার Vercel অ্যাপের সঠিক URL দিন

        // টেলিগ্রাম থেকে আসা ডেটা পাওয়া
        const { message } = request.body;

        // যদি কোনো মেসেজ থাকে, তবেই কোডটি কাজ করবে
        if (message) {
            const chatId = message.chat.id;
            const text = message.text || '';

            let refCode = null;
            
            // ব্যবহারকারী /start কমান্ড দিলে রেফারেল কোড খোঁজা হবে
            if (text.startsWith('/start')) {
                // '/start' এবং কোডের মাঝখানে স্পেস থাকতে পারে, তাই এভাবে কোড বের করা হচ্ছে
                const parts = text.split(' ');
                if (parts.length > 1 && parts[1]) {
                    refCode = parts[1];
                }
            }

            // ওয়েব অ্যাপের জন্য একটি ডাইনামিক URL তৈরি করা
            // যদি রেফারেল কোড থাকে, তবেই সেটি URL এর সাথে যুক্ত হবে
            let webAppUrlWithRef = WEB_APP_URL;
            if (refCode) {
                webAppUrlWithRef += `/?start=${refCode}`;
            }

            // ব্যবহারকারীকে পাঠানোর জন্য মেসেজ এবং বাটন তৈরি করা
            const replyText = "Welcome! Click the button below to open the app and start earning.";
            
            const replyMarkup = {
                inline_keyboard: [
                    [
                        { 
                            text: '🚀 Open App', 
                            web_app: { url: webAppUrlWithRef } 
                        }
                    ]
                ]
            };

            // টেলিগ্রাম API ব্যবহার করে উত্তর পাঠানো
            // সঠিক কোড
await axios.post(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, // <-- এখানে ব্যাকটিক ব্যবহার করা হয়েছে
    { ... }
);
                {
                    chat_id: chatId,
                    text: replyText,
                    reply_markup: replyMarkup
                }
            );
        }
    } catch (error) {
        // কোনো সমস্যা হলে সেটি লগ করা হবে
        console.error('Error processing update:', error);
    }
    
    // টেলিগ্রামকে জানানো যে মেসেজ সফলভাবে প্রসেস হয়েছে
    response.status(200).send('OK');
}
