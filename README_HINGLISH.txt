DRXKT REALTY — PREMIUM WEBSITE (VERSION 2.0)
==============================================

IS ZIP MEIN KYA HAI?
- Premium responsive real estate landing page
- Animated hero image, scroll reveal, hover interactions
- Property cards and working location/type/budget filters
- Schematic interactive NCR area guide (not a navigation map)
- Contact form that prepares an enquiry in WhatsApp
- Floating WhatsApp CTA
- Social links configurable in public/config.js
- Mobile navigation and mobile-friendly layout
- CSS and JavaScript files included; no missing styles.css

RUN KARNE KE STEPS (WINDOWS)
1. ZIP ko Extract All karein.
2. Extracted folder DRXKT_Realty_Premium kholein.
3. Folder ke address bar mein cmd type karke Enter dabayein.
4. Run karein: npm install
5. Run karein: npm start
6. Browser mein kholein: http://localhost:3000

IMPORTANT:
- CMD window open rehni chahiye jab tak website use kar rahe hain.
- Agar Node.js install nahi hai, https://nodejs.org/ se LTS install karein.
- Agar port 3000 already use ho raha hai, CMD mein `npx http-server public -p 3001 -c-1` chalayein aur http://localhost:3001 kholein.

WHATSAPP:
- Number already set hai: +91 98133 27686
- Form details WhatsApp mein prefilled message ke roop mein khulti hain.
- Message automatically send nahi hota. Customer ko WhatsApp mein Send press karna hota hai.

EMAIL DELIVERY:
- Browser se email silently send karne ke liye EmailJS configure karna hoga.
- Is version mein form ka dependable fallback WhatsApp hai. EmailJS settings file mein placeholders hain; code ko EmailJS SDK aur send logic ke saath configure kiye bina email sending active nahi hai.
- public/config.js mein receiver email configured hai: khalid.hussain@chaahathomes.org
- Kabhi bhi private SMTP password ya secret key frontend JavaScript mein paste na karein.

SOCIAL LINKS:
- public/config.js mein instagramUrl aur facebookUrl mein apne real profile URLs add karein.
- Abhi URLs blank hain kyunki real profile links provide nahi kiye gaye.

PROPERTY / MAP DISCLAIMER:
- Property cards demo/indicative content hain. Live inventory, prices, availability, RERA, possession aur specifications ko developer se verify karein.
- Area map schematic illustration hai, GPS/navigation map nahi.
- Hero and property photos Unsplash CDN se load hoti hain; images dikhne ke liye internet connection chahiye.

TROUBLESHOOTING:
- Browser mein hard refresh: Ctrl + F5.
- Confirm karein ki public folder ke andar index.html, styles.css, config.js aur script.js maujood hain.
- CMD mein `npm start` chalane ke baad http://localhost:3000 open karein.
- Blank page aaye toh browser mein F12 > Console ka screenshot bhejein.
