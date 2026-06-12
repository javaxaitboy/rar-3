# WorldExplorer — Dunyo Davlatlari Ma'lumotlar Platformasi

**WorldExplorer** — REST Countries API ma'lumotlaridan foydalangan holda butun jahon mamlakatlarini o'rganish, qidirish, filtrlash hamda tahlil qilish imkonini beruvchi zamonaviy va mukammal integratsiyalangan full-stack ma'lumotlar platformasi.

---

## 🎨 Loyiha Imkoniyatlari

Loyiha quyidagi ilg'or funksional qismlardan iborat:

*   **Dynamic Page Router**: Dunyo davlatlarini bir zumda yuklash hamda tafsilotlarini silliq o'tishlar bilan har bir davlat uchun `/country/:cca3` yo'nalishida ulash (masalan: `/country/uzb`).
*   **Aesthetic Responsive Design**: Har qanday smartfon, planshet, noutbuk va keng monitorlarda mukammal moslashadigan dizayn.
*   **Real-time Search & Filter**: Davlatlarni nomi, poytaxti yoki rasmiy qonuniy nomlari bo'yicha real vaqt rejimida qidirish hamda qulay hududiy pills (Africa, Americas, Asia, Europe, Oceania, Antarctic) orqali guruhlash.
*   **Robust Sorting Engine**: Davlatlarni Alifbo (A-Z, Z-A), Aholi soni (Kamayish va O'sish) hamda Yer maydoni hajmi bo'yicha tartiblash.
*   **Favorites Persistence**: `localStorage` bazasiga to'liq bog'langan Saralanganlar (Favorites) tizimi. Sahifalar yopilib qayta ochilganda ham ma'lumotlar saqlanib qoladi.
*   **In-Memory API Cache**: REST Countries API-ga keraksiz so'rovlar yuborilishining oldini oluvchi in-memory kesh qatlami (navigatsiya tezligini 10 barobarga oshiradi).
*   **Adaptive Theme Engine**: Tizim interfeysini Light va Dark rejimlariga o'rganuvchi va saqlab qoluvchi o'tish moslamasi.
*   **Neighbor Resolution Engine**: Davlatlarning chegaradosh qo'shnilari kodlarini (masalan, `AFG`, `KAZ`) avtomatik ravishda inson o'qiy oladigan to'liq nomlarga ("Afg'oniston", "Qozog'iston") aylantirib ko'rsatuvchi aqlli mexanizm.

---

## 📁 Loyiha Tuzilmasi

Loyiha Vite + React + TypeScript qatlamlarida quyidagi tuzilmaga ega:

```text
/src/
├── components/
│   ├── CountryCard.tsx        # Davlatning qisqacha ma'lumoti va bayrog'i kartasi
│   ├── SearchBar.tsx          # Tozalash tugmasiga ega qidiruv paneli
│   ├── RegionFilter.tsx       # Gorizontal hududlar bo'yicha pill filtri
│   ├── SortDropdown.tsx       # Tartiblash kriteriyalari dropdown-i
│   ├── FavoriteButton.tsx     # Animated Heart sevimliga qo'shish tugmasi
│   ├── Loading.tsx            # Spinner va Skeleton yuklanish kartalari
│   ├── ErrorMessage.tsx       # Qayta urinish tugmasiga ega xatolik paneli
│   ├── StatCard.tsx           # Geografik va demografik tafsilotlar kartasi
│   ├── BorderCountry.tsx      # Chegaradosh hamda o'tish imkoniga ega qo'shni havola
│   └── CountriesClient.tsx    # Qidiruv, sorting va filtrlash mantiqiy boshqaruvchi
│
├── hooks/
│   ├── useFavorites.ts        # Sevimli mamlakatlarni localStorage-da boshqarish hooki
│   └── useDebounce.ts         # Qidiruv so'rovlarini kechiktirish (debouncing) hooki
│
├── lib/
│   └── api.ts                 # REST Countries API va Kesh integratsiyasi
│
├── pages/
│   ├── Home.tsx               # Asosiy sahifa
│   ├── CountryDetail.tsx      # Batafsil ma'lumotlar sahifasi
│   └── Favorites.tsx          # Sevimli davlatlar ro'yxati sahifasi
│
├── types/
│   └── index.ts               # API davlat tuzilmasi va TS turlari
│
├── utils/
│   └── formatters.ts          # Raqamlar, maydon va tillarni formatlash utiliti
│
├── App.tsx                    # Loyiha bosh boshqaruvchisi va Router tuzilmasi
├── index.css                  # Tailwind v4 va maxsus animatsiyalar stylari
└── main.tsx                   # Ilova kirish nuqtasi
```

---

## ⚡ Ishga Tushirish Ko'rsatmalari

### 1. Bog'liqliklarni o'rnatish:
```bash
npm install
```

### 2. Mahalliy rivojlantirish serverini ishga tushirish:
```bash
npm run dev
```
Ushbu buyruq loyihani [http://localhost:3000](http://localhost:3000) manzilida ishga tushiradi.

### 3. Loyihani ishlab chiqarish (production) uchun tayyorlash:
```bash
npm run build
```
Tayyorlangan statik fayllar `/dist` papkasida shakllanadi.

---

## 🛠️ Foydalanilgan Texnologiyalar

*   **Vite 6** & **React 19** — Yuqori tezlikda ishlovchi SPA arxitekturasi.
*   **TypeScript** — To'liq xavfsiz type tizimi.
*   **Tailwind CSS v4** — Ultra zamonaviy responsive dizayn va animatsiyalar.
*   **Motion (Framer Motion)** — Silliq dinamik o'tishlar va mikro-interaktiv animatsiyalar.
*   **Lucide React** — Chiroyli va minimalistik grafik ikonkalar.
