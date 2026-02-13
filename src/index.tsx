// React kutubxonasini import qilyapmiz
// React JSX ishlashi uchun kerak (React 17+ da ba'zi joylarda avtomatik bo‘ladi)
import React from "react";

// ReactDOM - brauzerdagi REAL DOM bilan ishlovchi modul
// Bu React komponentlarni HTML ichiga joylashtirish uchun kerak
import ReactDOM from "react-dom";

// Redux store ni butun app ga ulash uchun Provider kerak
import { Provider } from "react-redux";

// Biz oldin yaratgan global Redux store ni import qilyapmiz
// store ichida barcha reducerlar va state boshqaruvi bor
import { store } from "./app/store";

// Asosiy App komponentimiz
// Barcha sahifalar va componentlar shu yer ichida bo‘ladi
import App from "./app/App";

// Performance o‘lchash uchun CRA default fayl
// (ixtiyoriy, analytics uchun ishlatiladi)
import reportWebVitals from "./reportWebVitals";

// MUI (Material UI) dan global CSS reset komponent
// Bu brauzer default style larini tozalaydi
import CssBaseline from "@mui/material/CssBaseline";

// MUI theme ishlatish uchun Provider
// ThemeProvider orqali butun app ga dizayn uzatiladi
import { ThemeProvider } from "@mui/material/styles";
/*
MUI (Material UI) — bu React uchun tayyor, chiroyli va professional UI komponentlar
 kutubxonasi. Oddiy qilib aytganda:
MUI — bu React’da dizaynni noldan yozmasdan, tayyor button, input, card, modal va 
boshqa elementlarni ishlatish imkonini beradigan framework.
*/

// O‘zing yaratgan custom theme
// Ranglar, fontlar, spacing va hokazo shu yerda sozlanadi
import theme from "./app/MaterialTheme";

// Global CSS fayl
// index.css ichida umumiy style lar bo‘ladi
import "./css/index.css";

import { BrowserRouter as Router } from "react-router-dom";

// ============================
// React ilovani DOM ga joylashtirish
// ============================

// ReactDOM.render() — React 17 va undan oldingi versiyalar uchun
// Bu App ni HTML dagi <div id="root"></div> ichiga joylashtiradi

ReactDOM.render(

  // React.StrictMode — development rejimida
  // xatolarni aniqlash uchun ishlatiladi
  // Production da ishlamaydi (faqat dev uchun)
  <React.StrictMode>

    {/* 
      Provider — Redux store ni butun ilovaga beradi.
      Shundan keyin istalgan component ichida:
      useSelector() va useDispatch() ishlata olamiz.
      
      useSelector() → store’dan ma’lumot olish
      useDispatch() → store’ga action yuborish
    */}
    <Provider store={store}>

      {/*
        ThemeProvider — MUI theme ni global qiladi.
        Button, Typography va boshqa MUI komponentlar
        shu theme asosida ishlaydi.
      */}
      <ThemeProvider theme={theme}>

        {/* 
          CssBaseline — brauzer default CSS ni reset qiladi.
          Bu professional app larda doim ishlatiladi.
        */}
        <CssBaseline/>
          <Router>
               {/* 
          Asosiy App component.
          Barcha routing, page, UI elementlar shu yerda.
        */}
                <App />

          </Router>
     

      </ThemeProvider>
    </Provider>
  </React.StrictMode>,

  // React qaysi HTML element ichiga joylashtirilishini aytyapmiz
  // public/index.html ichida <div id="root"></div> bo‘ladi
  document.getElementById("root")
);


// =======================================
// Performance o‘lchash qismi
// =======================================

// Agar app tezligini o‘lchamoqchi bo‘lsang
// reportWebVitals(console.log) yozish mumkin
// yoki analytics ga yuborish mumkin
reportWebVitals();
