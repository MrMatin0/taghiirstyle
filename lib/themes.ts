/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// Mappings
const identityCategoriesMap: Record<string, string> = { 'شرکتی': 'Corporate', 'دانشگاهی': 'Academic', 'خلاق': 'Creative', 'صنعتگر': 'Artisan', 'موسیقیدان': 'Musician', 'کژوال': 'Casual', 'مینیمالیست': 'Minimalist', 'کلاسیک': 'Classic', 'دراماتیک': 'Dramatic', 'تکنولوژی': 'Tech', 'امدادگر': 'First Responder', 'سیاه و سفید': 'B&W', 'طبیعت': 'Outdoor', 'ورزشکار': 'Athlete', 'سرآشپز': 'Chef', 'پزشک': 'Doctor', 'خلبان': 'Pilot', 'دانشمند': 'Scientist', 'گیمر': 'Gamer', 'روزنامه‌نگار': 'Journalist', 'محقق قدیمی': 'Vintage Scholar', 'کاوشگر شهری': 'Urban Explorer', 'مربی تناسب اندام': 'Fitness Instructor' };
const timeCategoriesMap: Record<string, string> = { 'دهه ۱۹۲۰': '1920s', 'دهه ۱۹۴۰': '1940s', 'دهه ۱۹۵۰': '1950s', 'دهه ۱۹۶۰': '1960s', 'دهه ۱۹۷۰': '1970s', 'دهه ۱۹۸۰': '1980s', 'دهه ۱۹۹۰': '1990s', 'دهه ۲۰۰۰': '2000s', 'دوران ویکتوریا': 'Victorian Era', 'روم باستان': 'Ancient Rome', 'عصر وایکینگ‌ها': 'Viking Age', 'آینده‌نگرانه': 'Futuristic', 'مصر باستان': 'Ancient Egypt', 'شوالیه قرون وسطی': 'Medieval Knight', 'هنرمند رنسانس': 'Renaissance Artist', 'دزد دریایی دوران طلایی': 'Golden Age Pirate', 'یاغی غرب وحشی': 'Wild West Outlaw', 'سامورایی دوره ادو': 'Edo Period Samurai', 'جاسوس جنگ سرد': 'Cold War Spy', 'تب دیسکو': 'Disco Fever', 'سایبرپانک ۲۰۷۷': 'Cyberpunk 2077', 'عصر حجر': 'Stone Age' };
const cinematicCategoriesMap: Record<string, string> = { 'شوالیه جدای': 'Jedi Knight', 'دانش‌آموز مدرسه جادوگری': 'Wizard School Student', 'کارآگاه فیلم نوآر': 'Film Noir Detective', 'قهرمان فیلم اکشن': 'Action Movie Hero', 'هفت‌تیرکش وسترن': 'Western Gunslinger', 'جاسوس فوق‌العاده': 'Suave Super Spy', 'جنگجوی سرزمین بایر': 'Wasteland Warrior', 'ماجراجوی جنگل': 'Jungle Adventurer', 'کاپیتان دزدان دریایی': 'Pirate Captain', 'پدرخوانده مافیا': 'Mafia Godfather', 'ستاره فیلم نوجوانان دهه ۸۰': '80s Teen Movie Star', 'ستاره فیلم صامت': 'Silent Film Star', 'شورشی دیستوپیایی': 'Dystopian Rebel', 'بازمانده فیلم کایجو': 'Kaiju Movie Survivor', 'اِلف فانتزی حماسی': 'Epic Fantasy Elf', 'شخصیت اصلی کمدی رمانتیک': 'Rom-Com Lead', 'هکر فضای سایبری': 'Cyberspace Hacker', 'شوالیه با زره درخشان': 'Knight in Shining Armor' };
const movieStyleCategoriesMap: Record<string, string> = { 'فیلم نوآر': 'Noir Film', 'فانتزی حماسی': 'Epic Fantasy', 'بلاک‌باستر علمی-تخیلی': 'Sci-Fi Blockbuster', 'فیلم وس اندرسون': 'Wes Anderson Film', 'فیلم اکشن دهه ۸۰': '80s Action Movie', 'انیمه سبک جیبلی': 'Ghibli-style Anime', 'وسترن اسپاگتی': 'Spaghetti Western', 'هالیوود دوران طلایی': 'Golden Age Hollywood', 'ترسناک مدرن': 'Modern Horror', 'انیمیشن پیکسار': 'Pixar Animation', 'فیلم ابرقهرمانی': 'Superhero Movie', 'درام تاریخی': 'Historical Drama', 'فیلم ویدئوی پیدا شده': 'Found Footage' };
const styleCategoriesMap: Record<string, string> = { 'سایبرپانک': 'Cyberpunk', 'استیم‌پانک': 'Steampunk', 'شوالیه فانتزی': 'Fantasy Knight', 'گرانج دهه ۹۰': '90s Grunge', 'آرت دکو': 'Art Deco', 'هالیوود قدیمی': 'Vintage Hollywood', 'قهرمان اپرای فضایی': 'Space Opera Hero', 'پسا-آخرالزمانی': 'Post-Apocalyptic', 'ترایبال فیوژن': 'Tribal Fusion', 'دیزل‌پانک': 'Dieselpunk', 'سولارپانک': 'Solarpunk', 'ویپورویو': 'Vaporwave', 'نوآر گوتیک': 'Gothic Noir', 'شیک بوهمی': 'Bohemian Chic', 'راننده سینث‌ویو': 'Synthwave Rider', 'ترس کیهانی': 'Cosmic Horror', 'فِیری‌کور': 'Fairycore', 'بایوپانک': 'Biopunk', 'رویال‌کور': 'Royalcore', 'اتم‌پانک': 'Atompunk', 'سرگردان صحرا': 'Desert Wanderer', 'ربات فشن': 'High Fashion Robot' };
const artisticCategoriesMap: Record<string, string> = { 'نقاشی آبرنگ': 'Watercolor Painting', 'نقاشی رنگ روغن': 'Oil Painting', 'طراحی با زغال': 'Charcoal Sketch', 'هنر کتاب کمیک': 'Comic Book Art', 'شخصیت خمیری': 'Claymation Figure', 'شیشه رنگی': 'Stained Glass', 'مجسمه مرمری': 'Marble Sculpture', 'اوریگامی': 'Origami', 'عروسک بافتنی': 'Knitted Doll', 'هنر پیکسلی': 'Pixel Art', 'رندر سه‌بعدی': '3D Render', 'کارتون قدیمی': 'Vintage Cartoon', 'نقاشی امپرسیونیستی': 'Impressionist Painting', 'پرتره کوبیستی': 'Cubist Portrait', 'رویای سورئالیستی': 'Surrealist Dream', 'چاپ پاپ آرت': 'Pop Art Screenprint', 'نقاشی غار باستانی': 'Ancient Cave Painting', 'شخصیت انیمه': 'Anime Character', 'نقاشی دیواری گرافیتی': 'Graffiti Mural', 'پوستر آرت نوو': 'Art Nouveau Poster', 'مجسمه برنزی': 'Bronze Statue', 'هولوگرام': 'Hologram' };
const hairstylesCategoriesMap: Record<string, string> = { 'بافت مو': 'Braids', 'آفروی فرفری': 'Curly Afro', 'موهای صاف به عقب': 'Slicked Back', 'گوجه‌ای نامرتب': 'Messy Bun', 'مدل باب': 'Bob Cut', 'موهیکان': 'Mohawk', 'موی بلند و مواج': 'Long Flowing', 'مدل پیکسی': 'Pixie Cut', 'رنگ فانتزی': 'Vibrant Color', 'کناره‌های تراشیده': 'Shaved Side', 'گره بالا': 'Top Knot', 'رول پیروزی': 'Victory Rolls', 'درِدلاک': 'Dreadlocks', 'مولت': 'Mullet', 'پومپادور': 'Pompadour', 'امواج انگشتی': 'Finger Waves', 'گوجه‌های فضایی': 'Space Buns', 'کورن‌روز': 'Cornrows', 'مدل کاسه‌ای': 'Bowl Cut', 'فاکس هاک': 'Faux Hawk', 'چتری پرده‌ای': 'Curtain Bangs', 'موی نقره‌ای': 'Silver Fox' };
const presidentCategoriesMap: Record<string, string> = { 'پرتره رسمی': 'Official Portrait', 'پویش انتخاباتی': 'Campaign Trail', 'روز تحلیف': 'Inauguration Day', 'پشت میز رزولوت': 'At the Resolute Desk', 'مناظره ریاست جمهوری': 'Presidential Debate', 'کوه راشمور': 'Mount Rushmore', 'عبور از دلاور': 'Crossing the Delaware', 'نطق گتیسبرگ': 'Gettysburg Address', 'گفتگوی کنار شومینه': 'Fireside Chat', 'امضای لایحه': 'Signing a Bill', 'سخنرانی وضعیت کشور': 'State of the Union', 'مراسم اهدای مدال': 'Medal Ceremony' };
const officialPortraitCategoriesMap: Record<string, string> = { 'پرتره سلطنتی': 'Royal Portrait', 'ظرافت مدیریتی': 'Executive Elegance', 'استایل دیپلماتیک': 'Diplomatic Style', 'شکوه کراوات مشکی': 'Black-Tie Glamour', 'مونوکروم کلاسیک': 'Classic Monochrome', 'اعتبار آکادمیک': 'Academic Prestige', 'اشرافی مدرن': 'Modern Aristocrat', 'رسمی نظامی سلطنتی': 'Royal Military Formal', 'شب اپرا': 'Opera Night', 'سرمقاله لوکس': 'Luxury Editorial', 'آقا/بانوی جاودانه': 'Timeless Gentleman/Lady', 'جشن طبقه بالا': 'High Society Gala', 'سلطنتی': 'Monarch Regal', 'اقتدار هیئت مدیره': 'Boardroom Authority', 'کلاسیک سفارت': 'Embassy Classic', 'اعتبار ویکتوریایی': 'Victorian Prestige', 'لوکس سیاه و سفید': 'Luxury Black & White', 'میراث اشرافی': 'Noble Heritage' };
const elegantDuoCategoriesMap: Record<string, string> = { 'شب جشن': 'Gala Night', 'مهمانی کوکتل': 'Cocktail Party', 'سالن رقص لوکس': 'Luxury Ballroom', 'لحظه فرش قرمز': 'Red Carpet Moment', 'شام رمانتیک': 'Romantic Dinner', 'مهمانی باغ': 'Garden Soirée', 'شب اپرا': 'Opera Night Out', 'شیک کلوپ مدرن': 'Modern Club Chic', 'استایل مهمان عروسی': 'Wedding Guest Style', 'سالن VIP': 'VIP Lounge', 'رویداد کراوات مشکی': 'Black-Tie Event', 'ضیافت سلطنتی': 'Royal Banquet', 'افتتاحیه گالری هنری': 'Art Gallery Opening', 'جشن خیریه': 'Charity Ball', 'مهمانی تراس پشت بام': 'Rooftop Terrace Party', 'اکران تئاتر کلاسیک': 'Classic Theater Premiere', 'بالماسکه در عمارت': 'Mansion Masquerade', 'اسپیک‌ایزی قدیمی': 'Vintage Speakeasy', 'پذیرایی در کلوپ قایقرانی': 'Yacht Club Reception', 'کنسرت سمفونی': 'Symphony Concert', 'رستوران ستاره میشلن': 'Michelin Star Restaurant', 'شب کازینو رویال': 'Casino Royale Night', 'شام ریاست جمهوری': 'Presidential Dinner', 'جشن شب سال نو': "New Year's Eve Ball" };
const masterstrokeCategoriesMap: Record<string, string> = { 'نقاشی رنگ روغن': 'Oil Painting', 'پرتره آبرنگ': 'Watercolor Portrait', 'اثر هنری پاستل': 'Pastel Artwork', 'پرتره هایپررئالیسم': 'Hyperrealism Portrait', 'سبک فرسکو': 'Fresco Style', 'هنر خطی مینیمالیستی': 'Minimalist Line Art', 'نقاشی آکادمیک کلاسیک': 'Classical Academic Painting' };

export interface ThemeDefinition {
  title: string;
  categories: string[];
  getPrompt: (category: string) => string;
  getFallbackPrompt: (category: string) => string;
}

export const THEMES: Record<string, ThemeDefinition> = {
  identity: {
    title: 'حالت‌های هویتی',
    categories: Object.keys(identityCategoriesMap),
    getPrompt: (category: string) => {
        const englishCategory = identityCategoriesMap[category] || category;
        return `Create a high-quality, professional headshot of the person in this photo, embodying a ${englishCategory === 'B&W' ? 'Classic Black and White' : englishCategory} aesthetic. The lighting should be studio-quality and flattering, with a clean, out-of-focus background. The person's expression should be confident and engaging. The final image must be photorealistic, preserving their unique facial features.`;
    },
    getFallbackPrompt: (category: string) => {
        const englishCategory = identityCategoriesMap[category] || category;
        return `Generate a professional headshot of the person from this image, styled for a ${englishCategory === 'B&W' ? 'Classic Black and White' : englishCategory} profession. Use professional lighting and a simple background. Ensure the person's facial identity is clearly maintained in a high-quality, photorealistic photograph.`;
    },
  },
  time: {
    title: 'سفر در زمان',
    categories: Object.keys(timeCategoriesMap),
    getPrompt: (category: string) => {
        const englishCategory = timeCategoriesMap[category] || category;
        return `Transport the person in this photo to the ${englishCategory}. The final image should be a photorealistic photograph, authentically capturing the fashion, hairstyles, and typical photographic style (e.g., film grain, color saturation, lighting) of that era. Ensure the person's core facial features are preserved.`;
    },
    getFallbackPrompt: (category: string) => {
        const englishCategory = timeCategoriesMap[category] || category;
        return `Create a photograph of the person in this image as if they were living in the ${englishCategory}. The photo should capture the distinct fashion, hairstyles, and atmosphere of the period. The final image should be a clear, high-quality photograph that looks authentic to the era.`;
    },
  },
  cinematic: {
    title: 'نقش‌های سینمایی',
    categories: Object.keys(cinematicCategoriesMap),
    getPrompt: (category: string) => {
        const englishCategory = cinematicCategoriesMap[category] || category;
        return `Place the person from this photo into a cinematic scene as a "${englishCategory}". The final image should be a high-quality, photorealistic movie still, with dramatic lighting, an authentic costume, and a background that perfectly captures the genre's aesthetic. It is crucial to maintain their facial likeness while ensuring they appear naturally part of the action-packed or dramatic composition. The output must be a high-quality, cinematic image.`;
    },
    getFallbackPrompt: (category: string) => {
        const englishCategory = cinematicCategoriesMap[category] || category;
        return `Create a high-quality image integrating the person from the photo into a movie scene as a "${englishCategory}". The costume and aesthetic should be authentic to the film genre. Ensure the person's facial identity is preserved and they are believably part of the scene.`
    }
  },
  movieStyle: {
    title: 'سبک فیلم',
    categories: Object.keys(movieStyleCategoriesMap),
    getPrompt: (category: string) => {
        const englishCategory = movieStyleCategoriesMap[category] || category;
        switch (englishCategory) {
            case 'Noir Film': return `Transform the person in the photo into a character from a 1940s Noir Film, rendered in dramatic black and white. Use high-contrast lighting (chiaroscuro) with deep shadows and a mysterious, smoky atmosphere. It is crucial to maintain their facial likeness within this classic cinematic style.`;
            case 'Epic Fantasy': return `Place the person from the photo into an Epic Fantasy movie. They should be a heroic character in a breathtaking, cinematic landscape like Middle-earth, wearing authentic fantasy attire. The lighting should be epic and majestic. The final image must be a high-quality movie still that preserves their facial features.`;
            case 'Sci-Fi Blockbuster': return `Create a movie still of the person in the photo as a character in a Sci-Fi Blockbuster. The setting is a futuristic, neon-lit cityscape. The image should have a high-budget, cinematic feel with lens flares and advanced technology. It is essential to maintain their facial identity within a sleek, futuristic costume.`;
            case 'Wes Anderson Film': return `Recreate the person in the photo in a scene from a Wes Anderson film. The composition must be perfectly symmetrical with a distinctive, muted pastel color palette. The character should have a quirky expression in a meticulously designed, whimsical setting. Their facial likeness must be preserved.`;
            case '80s Action Movie': return `Turn the person in the photo into the hero of an 80s Action Movie. The scene should be explosive and dramatic, with a warm, slightly grainy film look characteristic of the era. They must be in a dynamic action pose with a determined expression, and their facial features must be clearly recognizable.`;
            case 'Ghibli-style Anime': return `Reimagine the person in the photo as a character in a Ghibli-style anime movie. The style should be reminiscent of hand-drawn animation with soft, watercolor-like backgrounds and a sense of gentle magic. Faithfully translate their facial features and likeness into this iconic anime style in a high-quality final image.`;
            case 'Spaghetti Western': return `Create a movie still of the person in the photo as a gunslinger in a Spaghetti Western. The image must have a sun-bleached, dusty look with a wide-angle perspective. They should be wearing classic western attire against a desolate desert landscape. Their facial identity must be perfectly maintained.`;
            case 'Golden Age Hollywood': return `Transform the person in the photo into a star of a glamorous Golden Age Hollywood musical. The image should be shot in vibrant Technicolor, with dramatic, theatrical lighting. They should be wearing an elegant 1950s costume. It is crucial to preserve their facial likeness.`;
            case 'Modern Horror': return `Place the person from the photo into a tense scene from a Modern Horror film. The lighting must be dark and moody, using selective light to build suspense. Their expression should be fearful or intense, and their facial features must be clearly preserved within the suspenseful atmosphere.`;
            case 'Pixar Animation': return `Transform the person from the photo into a 3D animated character in the style of a Pixar movie. The character must be expressive and appealing, with realistic textures and lighting. It is crucial to capture their unique likeness and personality in the final high-quality 3D render.`;
            case 'Superhero Movie': return `Create a dynamic movie still of the person in the photo as a powerful superhero. The image should have a vibrant, comic book-inspired aesthetic with dramatic lighting. They must be wearing a unique superhero costume and striking a heroic pose, while perfectly maintaining their facial likeness.`;
            case 'Historical Drama': return `Render the person in the photo as a character in a lavish historical drama movie. They should be dressed in an authentic, period-accurate costume. The setting is an opulent, historically accurate location. The lighting is soft and painterly. Their facial features must be preserved.`;
            case 'Found Footage': return `Create an image of the person in the photo as if it were a still from a Found Footage horror film. The image quality must be intentionally degraded, with digital noise, motion blur, and a realistic, chaotic 'shaky cam' feel. Their facial features must be recognizable despite the low-fi aesthetic.`;
            default: return `Place the person from this photo into a cinematic scene in the style of a "${englishCategory}" movie. The final image should be a high-quality, photorealistic movie still, with lighting, costume, and background that perfectly captures the genre's aesthetic. It is crucial to maintain their facial likeness.`;
        }
    },
    getFallbackPrompt: (category: string) => {
        const englishCategory = movieStyleCategoriesMap[category] || category;
        return `Create a high-quality image of the person from the photo, styled as if they are in a ${englishCategory} movie. The aesthetic should be authentic to the genre. Ensure the person's facial identity is preserved.`;
    }
  },
  style: {
    title: 'تعویض استایل',
    categories: Object.keys(styleCategoriesMap),
    getPrompt: (category: string) => {
        const englishCategory = styleCategoriesMap[category] || category;
        return `Transform the person in this photo into a character with a rich ${englishCategory} aesthetic. This includes detailed clothing, accessories, and a complementary background that defines the style. The final image must be a high-quality, photorealistic, and cinematic composition that preserves the person's core facial features.`;
    },
    getFallbackPrompt: (category: string) => {
        const englishCategory = styleCategoriesMap[category] || category;
        return `Transform the person in this image, giving them a ${englishCategory} aesthetic. Focus on clothing, accessories, and background elements that are characteristic of the ${englishCategory} style, resulting in a high-quality, photorealistic image.`;
    },
  },
  artistic: {
    title: 'دیدگاه‌های هنری',
    categories: Object.keys(artisticCategoriesMap),
    getPrompt: (category: string) => {
        const englishCategory = artisticCategoriesMap[category] || category;
        return `Create a work of art depicting the person in this photo, rendered in the distinct and recognizable style of a ${englishCategory}. Faithfully translate their facial features and likeness into the chosen artistic medium, capturing its unique textures and characteristics. The output must be a high-quality, masterful artistic image.`;
    },
    getFallbackPrompt: (category: string) => {
        const englishCategory = artisticCategoriesMap[category] || category;
        return `Create an artwork of the person in this image in the style of a ${englishCategory}. The final image should clearly represent the chosen artistic medium while preserving the person's likeness. Generate a high-quality, artistic image.`;
    },
  },
  hairstyles: {
    title: 'غرفه مدل مو',
    categories: Object.keys(hairstylesCategoriesMap),
    getPrompt: (category: string) => {
        const englishCategory = hairstylesCategoriesMap[category] || category;
        return `Seamlessly change the hairstyle of the person in this photo to a ${englishCategory} style. It is critically important to keep their face, expression, clothing, and background exactly the same. The output must be a photorealistic image focusing exclusively on the new hairstyle, with no other alterations.`;
    },
    getFallbackPrompt: (category: string) => {
        const englishCategory = hairstylesCategoriesMap[category] || category;
        return `Give the person in this image a ${englishCategory} hairstyle. Critically, you must preserve their original facial features, expression, and clothing. Generate a high-quality, photorealistic image focusing only on the hair transformation.`;
    },
  },
  president: {
    title: 'پرتره‌های ریاست جمهوری',
    categories: Object.keys(presidentCategoriesMap),
    getPrompt: (category: string) => {
        const englishCategory = presidentCategoriesMap[category] || category;
        switch (englishCategory) {
            case 'Official Portrait': return `Create a photorealistic, official presidential portrait of the person in this photo. The style should be formal and dignified, reminiscent of portraits hanging in the White House. The background is a classic, stately setting. The lighting is masterful, creating a sense of importance and gravitas. Crucially, preserve their facial likeness perfectly.`;
            case 'Campaign Trail': return `Create a candid, photorealistic photograph of the person in this photo on the campaign trail. They are speaking passionately to a large, enthusiastic crowd at a rally. The lighting is dynamic, like that of a major political event. The image should feel energetic and hopeful. It is essential to maintain their facial likeness.`;
            case 'Inauguration Day': return `Create a photorealistic photograph of the person in this photo during their presidential inauguration. They are taking the oath of office on the steps of the U.S. Capitol, with one hand raised. The setting is grand and filled with onlookers. The mood is solemn and historic. Their facial features must be perfectly preserved.`;
            case 'At the Resolute Desk': return `Create a photorealistic image of the person in this photo sitting thoughtfully at the Resolute Desk in the Oval Office. The scene is formal, with presidential documents on the desk. The lighting is soft and focused, creating a contemplative mood. It is crucial to maintain their facial identity.`;
            case 'Presidential Debate': return `Create a photorealistic, broadcast-quality image of the person in this photo participating in a presidential debate. They are standing at a lectern, speaking with conviction. The background is a professional debate stage with bright television lighting. Their facial likeness must be accurately represented.`;
            case 'Mount Rushmore': return `Carve the face of the person in this photo into Mount Rushmore, alongside the other presidents. The final image should be a photorealistic photograph of the monument on a clear day, with the new face seamlessly integrated into the granite texture and style of the original sculptures. Their facial features must be recognizable.`;
            case 'Crossing the Delaware': return `Place the person from this photo as the commanding figure in a re-imagining of the famous "Washington Crossing the Delaware" painting. They should be rendered in the original artist's dramatic, heroic style. The lighting and composition must match the iconic artwork, and their facial likeness must be preserved within that style.`;
            case 'Gettysburg Address': return `Create a vintage, sepia-toned photograph of the person in this photo delivering a powerful speech, in the style of the Gettysburg Address. They are dressed in 19th-century attire, speaking to a crowd of soldiers and civilians. The image must look like an authentic historical photograph, while perfectly preserving their facial features.`;
            case 'Fireside Chat': return `Create a warm, intimate, black and white photograph of the person in this photo hosting a "fireside chat". They are seated in a comfortable chair by a fireplace, speaking into a vintage radio microphone. The mood is reassuring and personal. Their facial likeness must be perfectly maintained.`;
            case 'Signing a Bill': return `Create a photorealistic photograph of the person in this photo signing a historic bill into law. They are seated at a desk, surrounded by other distinguished individuals in a formal room like the Oval Office. The moment is momentous and positive. It is crucial to preserve their facial identity.`;
            case 'State of the Union': return `Create a wide, photorealistic shot of the person in this photo delivering the State of the Union address to a joint session of Congress. They are at the speaker's rostrum, with the Vice President and Speaker of the House seated behind them. The image should capture the scale and importance of the event, while keeping their facial features clear.`;
            case 'Medal Ceremony': return `Create a photorealistic photograph of the person in this photo awarding the Presidential Medal of Freedom to a deserving recipient in the East Room of the White House. The mood is respectful and celebratory. It is essential to preserve their facial likeness as the one presenting the award.`;
            default: return `Create a photorealistic, presidential-themed image of the person in this photo, inspired by the concept of "${englishCategory}". The setting should be formal and important. It is crucial to maintain their facial likeness.`;
        }
    },
    getFallbackPrompt: (category: string) => {
        const englishCategory = presidentCategoriesMap[category] || category;
        return `Create a high-quality, photorealistic image integrating the person from the photo into a presidential scene inspired by "${englishCategory}". The aesthetic should be formal and dignified. Ensure the person's facial identity is preserved and they are believably part of the scene.`
    }
  },
  officialPortrait: {
    title: 'پرتره رسمی',
    categories: Object.keys(officialPortraitCategoriesMap),
    getPrompt: (category: string) => {
        const englishCategory = officialPortraitCategoriesMap[category] || category;
        switch (englishCategory) {
            case 'Executive Elegance': return `Create an ultra-photorealistic, official portrait of the person in this photo, embodying an 'Executive Elegance' style. They should be dressed in sharp, high-end business attire, exuding confidence and authority. The setting is a modern, minimalist corner office with a large window overlooking a city skyline. The lighting is clean and professional, similar to a high-end corporate photoshoot. The final image must be of the highest quality, preserving their facial likeness perfectly.`;
            case 'Diplomatic Style': return `Create an ultra-photorealistic, official portrait of the person in this photo with a 'Diplomatic Style'. They are dressed in formal, impeccable attire suitable for an ambassador. The setting is an elegant, stately room, perhaps an embassy library or reception hall with tasteful decor and soft, dignified lighting. Their expression is composed and trustworthy. The final image must be of the highest quality, perfectly preserving their facial likeness.`;
            case 'Academic Prestige': return `Create an ultra-photorealistic, official portrait of the person in this photo that conveys 'Academic Prestige'. They are posed thoughtfully in a classic, wood-paneled university library or study, surrounded by books. They are wearing distinguished academic attire (like a tweed jacket or formal robes). The lighting is warm and intellectual, creating a sense of wisdom. The final image must be of the highest quality, preserving their facial likeness perfectly.`;
            case 'Boardroom Authority': return `Create an ultra-photorealistic, commanding portrait of the person in this photo that screams 'Boardroom Authority'. They are seated at the head of a large, polished mahogany table in a state-of-the-art boardroom. Their attire is a powerful business suit, and their expression is decisive and focused. The lighting is dramatic and strong, highlighting their features. The final image must be of the highest quality, preserving their facial likeness perfectly.`;
            case 'Luxury Black & White': return `Create a stunning, 'Luxury Black & White' official portrait of the person in this photo. The style should be timeless and elegant, with dramatic high-contrast lighting (chiaroscuro) that sculpts their facial features. The focus is purely on their expression and the texture of their clothing against a simple, dark background. The final image must be a masterful, high-quality monochrome photograph, preserving their likeness perfectly.`;
            case 'Noble Heritage': return `Create an ultra-photorealistic, official portrait of the person in this photo that evokes a sense of 'Noble Heritage'. They are dressed in opulent, aristocratic attire, possibly with vintage or heirloom accessories. The setting is a grand, ancestral home with rich tapestries, dark wood, and oil paintings in the background. The lighting is soft and painterly, reminiscent of old master portraits. The final image must be of the highest quality, perfectly preserving their facial likeness.`;
            default: return `Create an ultra-photorealistic, official portrait of the person in this photo, embodying a ${englishCategory} style. The setting should be grand and appropriate for the style, with masterful, studio-quality lighting to create a sense of importance and gravitas. The final image must be of the highest quality, preserving their facial likeness perfectly while fitting the sophisticated aesthetic.`;
        }
    },
    getFallbackPrompt: (category: string) => {
        const englishCategory = officialPortraitCategoriesMap[category] || category;
        return `Generate a high-quality, photorealistic portrait of the person from this image in a formal ${englishCategory} style. Use professional lighting and an elegant background. Ensure the person's facial identity is clearly maintained in a sophisticated photograph.`;
    },
  },
  elegantDuo: {
    title: 'دوئت شیک',
    categories: Object.keys(elegantDuoCategoriesMap),
    getPrompt: (category: string) => {
        const englishCategory = elegantDuoCategoriesMap[category] || category;
        return `Create an ultra-photorealistic, elegant portrait featuring the person from the photo standing with a person of the opposite gender at a ${englishCategory} event. Both individuals should be dressed in sophisticated, formal attire appropriate for the occasion. The lighting must be natural and flattering, capturing realistic textures of fabric and skin. The background should be a detailed, authentic setting of the event. The final image must be indistinguishable from a real high-end photograph, preserving the original person's facial features and identity perfectly.`;
    },
    getFallbackPrompt: (category: string) => {
        const englishCategory = elegantDuoCategoriesMap[category] || category;
        return `Generate a high-quality, realistic photograph of the person from this image attending a ${englishCategory} with a companion of the opposite gender. They are both wearing elegant, formal clothing. The lighting and background should be natural and appropriate for the setting. Ensure the original person's facial identity is clearly maintained in a true-to-life portrait.`;
    },
  },
  masterstroke: {
    title: 'شاهکارهای هنری',
    categories: Object.keys(masterstrokeCategoriesMap),
    getPrompt: (category: string) => {
        const englishCategory = masterstrokeCategoriesMap[category] || category;
        return `Create a masterful work of art of the person in this photo, rendered in the distinct and recognizable style of a ${englishCategory}. The final piece should faithfully translate their facial features and likeness into the chosen artistic medium, capturing its unique textures, brushwork, and characteristics. The output must be a high-quality, gallery-worthy artistic image.`;
    },
    getFallbackPrompt: (category: string) => {
        const englishCategory = masterstrokeCategoriesMap[category] || category;
        return `Create an artwork of the person in this image in the style of a ${englishCategory}. The final image should clearly represent the chosen artistic medium while preserving the person's likeness. Generate a high-quality artistic image.`;
    },
  },
};

export const CAMERA_ANGLES = {
  'Default Angle': { prompt: '', description: 'یک پرسپکتیو استاندارد در سطح چشم.' },
  'Low Angle Shot': { prompt: 'The final image must be captured from a dramatic low angle, looking up at the person to make them appear powerful and larger than life.', description: 'از پایین به سوژه نگاه می‌کند و او را قدرتمند نشان می‌دهد.' },
  'High Angle Shot': { prompt: 'The final image must be captured from a high angle, looking down on the person, creating a sense of scale or introspection.', description: 'از بالا به سوژه نگاه می‌کند و حس مقیاس ایجاد می‌کند.' },
  'Dutch Angle': { prompt: 'The final image must use a Dutch angle (canted angle), tilting the camera to create a sense of unease, tension, or disorientation.', description: 'دوربین را کج می‌کند تا اثری از اضطراب و تنش ایجاد کند.' },
  'Over-the-Shoulder': { prompt: "The final image must be an over-the-shoulder shot, as if we are looking past another person's shoulder at the subject, creating a conversational or observational feel.", description: 'سوژه را از پشت شانه فرد دیگری قاب‌بندی می‌کند.' },
  'Point of View (POV)': { prompt: 'The final image must be from a first-person point of view (POV), as if the viewer is seeing the person through their own eyes. The edges of the frame could be slightly blurred.', description: "صحنه را از دیدگاه سوژه نشان می‌دهد." },
  'Drone Shot': { prompt: 'The final image must be from a high-altitude drone shot perspective, looking directly down or at an oblique angle from above. The person should be a small but clear part of a larger scenic environment.', description: 'یک شات از ارتفاع بالا، با نگاه به پایین از بالا.' },
  'Macro Shot': { prompt: 'The final image must be an extreme close-up, macro shot, focusing on a specific, intricate detail of the person, such as their eye or a piece of jewelry. The background should be completely out of focus.', description: 'یک کلوزآپ شدید که روی یک جزئیات کوچک تمرکز دارد.' }
};

export type ThemeKey = keyof typeof THEMES;
export type CameraAngleKey = keyof typeof CAMERA_ANGLES;
