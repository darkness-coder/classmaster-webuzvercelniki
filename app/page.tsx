"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  TrendingUp,
  Users,
  ChevronRight,
  MapPinned,
  PhoneCall,
  MailOpen,
  Send,
  Globe,
  ChevronDown,
  X,
  Sun,
  Moon,
  Menu,
  CheckCircle,
  AlertCircle,
  Loader2,
  MonitorSmartphone,
  Video,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  course: string;
  days: string;
  time: string;
  comment: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";
type Lang = "uz" | "ru" | "en";

// ─── Translations ──────────────────────────────────────────────────────────────
const T = {
  uz: {
    nav: ["Bosh sahifa", "Yangiliklar", "Kurslar", "Biz haqimizda", "Bog'lanish"],
    heroTag: "Xush kelibsiz",
    heroTitle: "Classmaster",
    heroSub: "O'quv  Markazi",
    heroDesc: "Zamonaviy metodika yordamida kelajak mutaxassislarini tayyorlaydigan innovatsion ta'lim markazi.",
    heroCta: "Kurslarni tanlash",
    statsYears: "Yillik tajriba",
    statsCourses: "O'quv kurslari",
    statsTeachers: "Bitiruvchilar ",
    coursesTitle: "BIZNING",
    coursesSpan: "KURSLAR",
    enroll: "Kursga yozilish",
    highlightsTitle: "BIZNING",
    highlightsSpan: "YUTUQLAR",
    newsTitle: "SO'NGGI",
    newsSpan: "YANGILIKLAR",
    newsReadMore: "Batafsil o'qish →",
    contactTitle: "BIZ BILAN",
    contactSpan: "BOG'LANING",
    contactAddress: "Manzil (ustiga bosing)",
    contactPhone: "Telefon",
    contactHours: "Har kuni 09:00-18:00",
    formName: "Ismingiz",
    formPhone: "Telefon",
    formCourse: "Tanlangan kurs",
    formDays: "Dars kunlari",
    formTime: "Dars vaqti",
    formComment: "Qo'shimcha izoh",
    formCommentPlaceholder: "O'zingizni qiziqtirgan savollarni yozing...",
    formSend: "Arizani yuborish",
    formSending: "Yuborilmoqda...",
    formSuccess: "Ariza qabul qilindi! 🎉",
    formSuccessDesc: "Tez orada siz bilan bog'lanamiz.",
    formClose: "Yopish",
    formError: "Xatolik yuz berdi",
    formErrorDesc: "Iltimos qayta urinib ko'ring yoki bizga qo'ng'iroq qiling.",
    formRetry: "Qayta urinish",
    socialTitle: "IJTIMOIY",
    socialSpan: "TARMOQLAR",
    telegramChannel: "Telegram Kanal",
    telegramChannelDesc: "Yangiliklar va e'lonlar",
    instagramChannel: "Instagram",
    instagramChannelDesc: "Fotolar va Stories",
    youtubeChannel: "YouTube Kanal",
    youtubeChannelDesc: "Darslar va videolar",
    footerDesc: "Zamonaviy kasblarni o'rgatuvchi innovatsion ta'lim markazi.",
    footerLinks: "Havolalar",
    footerCourses: "Kurslar",
    footerContact: "Aloqa",
    footerRights: "Barcha huquqlar himoyalangan.",
    msgSend: "Xabarni yuborish",
    msgPlaceholder: "Xabar...",
    msgName: "Ismingiz",
    msgPhone: "+998 90 123 45 67",
    msgSent: "Xabar yuborildi! 🎉",
    msgSentDesc: "Tez orada siz bilan bog'lanamiz.",
    msgAgain: "Yana yuborish",
    msgError: "Xatolik! Qayta urinib ko'ring.",
    formLastName: "Familiyangiz",
    formNamePlaceholder: "Ismingizni kiriting",
    formLastNamePlaceholder: "Familiyangizni kiriting",
    formSelectCourse: "Kursni tanlang",
    formDaysOpt1: "Dush-Chor-Jum (Toq)",
    formDaysOpt2: "Sesh-Pay-Shan (Juft)",
    courseNames: ["Dasturlash", "Ingliz tili", "Matematika", "Rus tili", "Nemis tili", "Koreys tili", "Boshlang'ich ta'lim", "Fizika", "Kompyuter savodxonligi"],
    courses: [
      { title: "Dasturlash",            items: ["Foundation", "Web dasturlash", "Frontend", "Backend"] },
      { title: "Ingliz tili",           items: ["IELTS", "General English", "Mock Exam", "Grammarway"] },
      { title: "Matematika",            items: ["Pre-school", "Milliy sertifikat", "Matematika Master", "DTM"] },
      { title: "Rus tili",              items: ["Boshlang'ich daraja", "O'rta daraja", "Yuqori daraja", "Sertifikat"] },
      { title: "Nemis tili",            items: ["B1 daraja", "B2 daraja", "Grammatika", "Sertifikat"] },
      { title: "Koreys tili",           items: ["Hangeul alifbosi", "Boshlang'ich daraja", "O'rta daraja", "TOPIK imtihoni"] },
      { title: "Boshlang'ich ta'lim",   items: ["1-sinf tayyorlov", "O'qish va yozish", "Matematika asoslari", "Rivojlantirish"] },
      { title: "Fizika",               items: ["Umumiy fizika", "Milliy sertifikat", "Olimpiada tayyorlov", "DTM"] },
      { title: "Kompyuter savodxonligi",items: ["MS Office", "Internet asoslari", "Grafik dizayn", "1C dasturi"] },
    ],
  },
  ru: {
    nav: ["Главная", "Новости", "Курсы", "О нас", "Контакты"],
    heroTag: "Инвестируйте в знания",
    heroTitle: "Classmaster",
    heroSub: "Учебный Центр",
    heroDesc: "Инновационный образовательный центр, готовящий специалистов будущего с помощью современных методик.",
    heroCta: "Выбрать курс",
    statsYears: "Лет опыта",
    statsCourses: "Учебных курсов",
    statsTeachers: "Преподавателей",
    coursesTitle: "НАШИ",
    coursesSpan: "КУРСЫ",
    enroll: "Записаться на курс",
    highlightsTitle: "НАШИ",
    highlightsSpan: "ДОСТИЖЕНИЯ",
    newsTitle: "ПОСЛЕДНИЕ",
    newsSpan: "НОВОСТИ",
    newsReadMore: "Читать далее →",
    contactTitle: "СВЯЖИТЕСЬ",
    contactSpan: "С НАМИ",
    contactAddress: "Адрес (нажмите)",
    contactPhone: "Телефон",
    contactHours: "Каждый день 09:00-18:00",
    formName: "Ваше имя",
    formPhone: "Телефон",
    formCourse: "Выбранный курс",
    formDays: "Дни занятий",
    formTime: "Время занятий",
    formComment: "Дополнительный комментарий",
    formCommentPlaceholder: "Напишите вопросы, которые вас интересуют...",
    formSend: "Отправить заявку",
    formSending: "Отправка...",
    formSuccess: "Заявка принята! 🎉",
    formSuccessDesc: "Мы свяжемся с вами в ближайшее время.",
    formClose: "Закрыть",
    formError: "Произошла ошибка",
    formErrorDesc: "Пожалуйста, попробуйте снова или позвоните нам.",
    formRetry: "Попробовать снова",
    socialTitle: "СОЦИАЛЬНЫЕ",
    socialSpan: "СЕТИ",
    telegramChannel: "Telegram Канал",
    telegramChannelDesc: "Новости и объявления",
    instagramChannel: "Instagram",
    instagramChannelDesc: "Фото и истории",
    youtubeChannel: "YouTube Канал",
    youtubeChannelDesc: "Уроки и видео",
    footerDesc: "Инновационный образовательный центр, обучающий современным профессиям.",
    footerLinks: "Ссылки",
    footerCourses: "Курсы",
    footerContact: "Контакты",
    footerRights: "Все права защищены.",
    msgSend: "Отправить сообщение",
    msgPlaceholder: "Сообщение...",
    msgName: "Ваше имя",
    msgPhone: "+998 90 123 45 67",
    msgSent: "Сообщение отправлено! 🎉",
    msgSentDesc: "Мы свяжемся с вами в ближайшее время.",
    msgAgain: "Отправить ещё",
    msgError: "Ошибка! Попробуйте снова.",
    formLastName: "Фамилия",
    formNamePlaceholder: "Введите ваше имя",
    formLastNamePlaceholder: "Введите вашу фамилию",
    formSelectCourse: "Выберите курс",
    formDaysOpt1: "Пн-Ср-Пт (Нечётные)",
    formDaysOpt2: "Вт-Чт-Сб (Чётные)",
    courseNames: ["Программирование", "Английский язык", "Математика", "Русский язык", "Немецкий язык", "Корейский язык", "Начальное образование", "Физика", "Компьютерная грамотность"],
    courses: [
      { title: "Программирование",        items: ["Foundation", "Веб-разработка", "Frontend", "Backend"] },
      { title: "Английский язык",        items: ["IELTS", "General English", "Mock Exam", "Grammarway"] },
      { title: "Математика",             items: ["Pre-school", "Нац. сертификат", "Math Master", "DTM"] },
      { title: "Русский язык",          items: ["Начальный уровень", "Средний уровень", "Высокий уровень", "Сертификат"] },
      { title: "Немецкий язык",         items: ["B1", "B2", "Грамматика", "Сертификат"] },
      { title: "Корейский язык",          items: ["Алфавит хангыль", "Начальный уровень", "Средний уровень", "Экзамен TOPIK"] },
      { title: "Начальное образование",  items: ["Подготовка к 1 классу", "Чтение и письмо", "Основы математики", "Развитие"] },
      { title: "Физика",                 items: ["Общая физика", "Нац. сертификат", "Подготовка к олимпиаде", "DTM"] },
      { title: "Компьютерная грамотность",items: ["MS Office", "Основы интернета", "Графический дизайн", "1С"] },
    ],
  },
  en: {
    nav: ["Home", "News", "Courses", "About", "Contact"],
    heroTag: "Invest in your knowledge",
    heroTitle: "Classmaster",
    heroSub: "Learning Center",
    heroDesc: "An innovative education center preparing future specialists using modern teaching methods.",
    heroCta: "Browse Courses",
    statsYears: "Years of experience",
    statsCourses: "Learning courses",
    statsTeachers: "Teachers",
    coursesTitle: "OUR",
    coursesSpan: "COURSES",
    enroll: "Enroll now",
    highlightsTitle: "OUR",
    highlightsSpan: "HIGHLIGHTS",
    newsTitle: "LATEST",
    newsSpan: "NEWS",
    newsReadMore: "Read more →",
    contactTitle: "GET IN",
    contactSpan: "TOUCH",
    contactAddress: "Address (click to open)",
    contactPhone: "Phone",
    contactHours: "Every day 09:00-18:00",
    formName: "Your name",
    formPhone: "Phone",
    formCourse: "Selected course",
    formDays: "Class days",
    formTime: "Class time",
    formComment: "Additional comment",
    formCommentPlaceholder: "Write any questions you have...",
    formSend: "Submit application",
    formSending: "Sending...",
    formSuccess: "Application received! 🎉",
    formSuccessDesc: "We will contact you soon.",
    formClose: "Close",
    formError: "An error occurred",
    formErrorDesc: "Please try again or give us a call.",
    formRetry: "Try again",
    socialTitle: "SOCIAL",
    socialSpan: "MEDIA",
    telegramChannel: "Telegram Channel",
    telegramChannelDesc: "News and announcements",
    instagramChannel: "Instagram",
    instagramChannelDesc: "Photos and Stories",
    youtubeChannel: "YouTube Channel",
    youtubeChannelDesc: "Lessons and videos",
    footerDesc: "An innovative education center teaching modern professions.",
    footerLinks: "Links",
    footerCourses: "Courses",
    footerContact: "Contact",
    footerRights: "All rights reserved.",
    msgSend: "Send message",
    msgPlaceholder: "Message...",
    msgName: "Your name",
    msgPhone: "+998 90 123 45 67",
    msgSent: "Message sent! 🎉",
    msgSentDesc: "We will contact you soon.",
    msgAgain: "Send another",
    msgError: "Error! Please try again.",
    formLastName: "Last name",
    formNamePlaceholder: "Enter your name",
    formLastNamePlaceholder: "Enter your last name",
    formSelectCourse: "Select a course",
    formDaysOpt1: "Mon-Wed-Fri (Odd)",
    formDaysOpt2: "Tue-Thu-Sat (Even)",
    courseNames: ["Programming", "English", "Mathematics", "Russian", "German", "Korean", "Primary Education", "Physics", "Computer Literacy"],
    courses: [
      { title: "Programming",           items: ["Foundation", "Web Development", "Frontend", "Backend"] },
      { title: "English",               items: ["IELTS", "General English", "Mock Exam", "Grammarway"] },
      { title: "Mathematics",           items: ["Pre-school", "National Certificate", "Math Master", "DTM"] },
      { title: "Russian",               items: ["Beginner Level", "Intermediate Level", "Advanced Level", "Certificate"] },
      { title: "German",                items: ["B1 Level", "B2 Level", "Grammar", "Certificate"] },
      { title: "Korean",                items: ["Hangeul Alphabet", "Beginner Level", "Intermediate Level", "TOPIK Exam"] },
      { title: "Primary Education",     items: ["1st Grade Prep", "Reading & Writing", "Math Basics", "Development"] },
      { title: "Physics",               items: ["General Physics", "National Certificate", "Olympiad Prep", "DTM"] },
      { title: "Computer Literacy",     items: ["MS Office", "Internet Basics", "Graphic Design", "1C Program"] },
    ],
  },
} as const;

// ─── Dark-mode context trick using data-theme on <html> ──────────────────────
const useDarkMode = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cm-theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (saved === "light") {
      setDark(false);
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      // follow system
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(prefersDark);
      document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    const theme = next ? "dark" : "light";
    localStorage.setItem("cm-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return { dark, toggle };
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const LandingPage = () => {
  const { dark, toggle } = useDarkMode();
  const [lang, setLang] = useState<Lang>("uz");
  const t = T[lang];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    course: "",
    days: "Dush-Chor-Jum (Toq kunlar)",
    time: "09:00 - 11:00",
    comment: "",
  });

  const handleOpenModal = (courseName: string) => {
    setFormData((f) => ({ ...f, course: courseName }));
    setIsModalOpen(true);
    setSubmitStatus("idle");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmitStatus("idle");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.phone) return;

    setSubmitStatus("loading");
    try {
      const res = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          course: "",
          days: "Dush-Chor-Jum (Toq kunlar)",
          time: "09:00 - 11:00",
          comment: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  // class helpers
  const bg = dark ? "bg-[#0F172A]" : "bg-[#F9FAFB]";
  const text = dark ? "text-slate-100" : "text-[#002B5B]";
  const headerBg = dark ? "bg-[#0F172A]/80 border-white/10" : "bg-white/80 border-gray-100";
  const cardBg = dark ? "bg-[#1E293B] border-white/10" : "bg-white border-gray-100";
  const inputBg = dark ? "bg-slate-700 text-slate-100 placeholder:text-slate-400" : "bg-gray-50 text-gray-700 placeholder:text-gray-400";

  return (
    <div className={`min-h-screen ${bg} ${text} font-sans antialiased scroll-smooth transition-colors duration-300`}>

      {/* ── MODAL ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />

            {/* card */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className={`relative w-full max-w-lg rounded-[2rem] p-5 sm:p-8 shadow-2xl z-10 my-4 max-h-[92vh] overflow-y-auto ${cardBg} border`}
            >
              {/* close */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors text-gray-400"
              >
                <X size={22} />
              </button>

              {/* logo */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-md border border-gray-50 overflow-hidden">
                  <img src="/photo_2024-12-13_14-07-31.jpg" alt="Classmaster Logo" className="w-full h-full object-contain p-1.5" />
                </div>
                <h3 className={`text-2xl font-black tracking-tighter ${text}`}>Classmaster</h3>
                <p className="text-blue-500 font-bold text-[10px] uppercase tracking-widest mt-1">O'quv Markazi</p>
              </div>

              {/* success state */}
              <AnimatePresence mode="wait">
                {submitStatus === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-3 py-6 text-center"
                  >
                    <CheckCircle size={48} className="text-green-500" />
                    <h4 className="text-xl font-black">{t.formSuccess}</h4>
                    <p className={`text-sm max-w-xs ${dark ? "text-slate-400" : "text-gray-400"}`}>
                      {t.formSuccessDesc}
                    </p>
                    <button
                      onClick={handleCloseModal}
                      className="mt-2 px-8 py-3 rounded-2xl bg-[#002B5B] text-white font-bold hover:bg-blue-900 transition-colors"
                    >
                      {t.formClose}
                    </button>
                  </motion.div>
                ) : submitStatus === "error" ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4 py-6 text-center"
                  >
                    <AlertCircle size={48} className="text-red-500" />
                    <p className="font-bold text-lg">{t.formError}</p>
                    <p className="text-gray-400 text-sm">{t.formErrorDesc}</p>
                    <button
                      onClick={() => setSubmitStatus("idle")}
                      className="px-6 py-3 rounded-2xl bg-[#002B5B] text-white font-bold"
                    >
                      {t.formRetry}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {/* Name */}
                    <div className="space-y-1">
                      <label className={`text-xs font-bold ml-1 ${dark ? "text-slate-300" : "text-gray-600"}`}>
                        {t.formName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder={t.formNamePlaceholder}
                        className={`w-full px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-400 text-sm ${inputBg}`}
                      />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1">
                      <label className={`text-xs font-bold ml-1 ${dark ? "text-slate-300" : "text-gray-600"}`}>{t.formLastName}</label>
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        type="text"
                        placeholder={t.formLastNamePlaceholder}
                        className={`w-full px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-400 text-sm ${inputBg}`}
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1">
                      <label className={`text-xs font-bold ml-1 ${dark ? "text-slate-300" : "text-gray-600"}`}>
                        {t.formPhone} <span className="text-red-500">*</span>
                      </label>
                      <div className={`flex items-center ${inputBg} rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-400`}>
                        <span className={`text-sm font-medium border-r pr-3 mr-3 ${dark ? "border-slate-500 text-slate-400" : "border-gray-300 text-gray-500"}`}>+998</span>
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 9);
                            setFormData((f) => ({ ...f, phone: val }));
                          }}
                          required
                          type="tel"
                          maxLength={9}
                          placeholder="90 123 45 67"
                          className="w-full bg-transparent border-none outline-none text-sm"
                        />
                      </div>
                    </div>

                    {/* Course */}
                    <div className="space-y-1">
                      <label className={`text-xs font-bold ml-1 ${dark ? "text-slate-300" : "text-gray-600"}`}>{t.formCourse}</label>
                      <div className="relative">
                        <select
                          name="course"
                          value={formData.course}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-400 appearance-none font-medium text-sm ${inputBg}`}
                        >
                          <option value="">{t.formSelectCourse}</option>
                          {t.courseNames.map((cn: string, i: number) => (
                            <option key={i} value={["Dasturlash","Ingliz tili","Matematika","Rus tili","Nemis tili","Koreys tili","Boshlang'ich ta'lim","Fizika","Kompyuter savodxonligi"][i]}>{cn}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={15} />
                      </div>
                    </div>

                    {/* Days */}
                    <div className="space-y-1">
                      <label className={`text-xs font-bold ml-1 ${dark ? "text-slate-300" : "text-gray-600"}`}>{t.formDays}</label>
                      <div className="relative">
                        <select
                          name="days"
                          value={formData.days}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-400 appearance-none font-medium text-sm ${inputBg}`}
                        >
                          <option>{t.formDaysOpt1}</option>
                          <option>{t.formDaysOpt2}</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={15} />
                      </div>
                    </div>

                    {/* Time */}
                    <div className="space-y-1">
                      <label className={`text-xs font-bold ml-1 ${dark ? "text-slate-300" : "text-gray-600"}`}>{t.formTime}</label>
                      <div className="relative">
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-400 appearance-none font-medium text-sm ${inputBg}`}
                        >
                          <option>09:00 - 11:00</option>
                          <option>14:00 - 16:00</option>
                          <option>16:00 - 18:00</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={15} />
                      </div>
                    </div>

                    {/* Comment */}
                    <div className="sm:col-span-2 space-y-1">
                      <label className={`text-xs font-bold ml-1 ${dark ? "text-slate-300" : "text-gray-600"}`}>{t.formComment}</label>
                      <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        rows={2}
                        placeholder={t.formCommentPlaceholder}
                        className={`w-full px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-400 resize-none text-sm ${inputBg}`}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitStatus === "loading"}
                      className="sm:col-span-2 w-full py-3.5 mt-1 rounded-xl bg-[#002B5B] text-white font-black text-sm shadow-xl hover:bg-blue-900 transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {submitStatus === "loading" ? (
                        <><Loader2 size={20} className="animate-spin" />{t.formSending}</>
                      ) : (
                        <><Send size={18} />{t.formSend}</>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className={`mt-8 pt-5 border-t ${dark ? "border-white/10" : "border-gray-100"} flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest`}>
                <p>© 2026 Classmaster</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${headerBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <img src="/photo_2024-12-13_14-07-31.jpg" alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-lg" />
            <div className={`font-black text-xl sm:text-2xl tracking-tighter leading-none ${text}`}>
              classmaster
              <br />
              <span className="text-sm font-bold tracking-normal uppercase text-blue-500">O'quv Markazi</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 font-semibold">
            {([["#home","#news","#courses","#about","#contact"]] [0]).map((href, i) => (
              <a
                key={href}
                href={href}
                className={`hover:text-blue-500 transition-colors ${dark ? "text-slate-200" : "text-[#002B5B]"}`}
              >
                {t.nav[i]}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className={`hidden sm:flex items-center rounded-xl border overflow-hidden ${dark ? "border-slate-600" : "border-gray-200"}`}>
              {(["uz","ru","en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-2 text-xs font-black uppercase tracking-wider transition-all ${
                    lang === l
                      ? "bg-[#002B5B] text-white"
                      : dark ? "bg-slate-700 text-slate-300 hover:bg-slate-600" : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              aria-label="Mavzu almashtirish"
              style={{ touchAction: 'manipulation' }}
              className={`p-2.5 rounded-xl border transition-colors ${dark ? "bg-slate-700 border-slate-600 text-yellow-300" : "bg-gray-100 border-gray-200 text-gray-600"}`}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              style={{ touchAction: 'manipulation' }}
              className={`md:hidden p-2.5 rounded-xl border transition-colors ${dark ? "bg-slate-700 border-slate-600 text-slate-200" : "bg-gray-100 border-gray-200 text-gray-600"}`}
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU OVERLAY (fixed, outside sticky header) ─────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 md:hidden"
            />
            {/* drawer */}
            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className={`fixed top-16 sm:top-20 left-0 right-0 z-50 md:hidden shadow-xl border-b ${
                dark ? "bg-[#0F172A] border-white/10" : "bg-white border-gray-100"
              }`}
            >
              <nav className="flex flex-col px-6 py-4 gap-1 font-semibold">
                {(["#home","#news","#courses","#about","#contact"]).map((href, i) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ touchAction: 'manipulation' }}
                    className={`py-3 px-2 rounded-xl hover:bg-blue-50 hover:text-blue-500 transition-colors ${
                      dark ? "text-slate-200 hover:bg-slate-800" : "text-[#002B5B]"
                    }`}
                  >
                    {t.nav[i]}
                  </a>
                ))}
                {/* Lang + dark row */}
                <div className={`flex items-center justify-between pt-3 mt-2 border-t ${
                  dark ? "border-white/10" : "border-gray-100"
                }`}>
                  <div className="flex gap-2">
                    {(["uz","ru","en"] as Lang[]).map((l) => (
                      <button
                        key={l}
                        style={{ touchAction: 'manipulation' }}
                        onClick={() => { setLang(l); setMobileMenuOpen(false); }}
                        className={`px-3 py-2 rounded-lg text-xs font-black uppercase ${
                          lang === l ? "bg-[#002B5B] text-white" : dark ? "bg-slate-700 text-slate-300" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                  <button
                    style={{ touchAction: 'manipulation' }}
                    onClick={() => toggle()}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                      dark ? "bg-slate-700 text-yellow-300" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {dark ? <Sun size={16} /> : <Moon size={16} />}
                    {dark ? "Light" : "Dark"}
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN ───────────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-24">

        {/* HERO */}
        <section id="home" className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-24 sm:mb-32 scroll-mt-24">
          {/* Image — shows first on mobile */}
          <div className="order-first lg:order-last relative w-full aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden shadow-xl">
            <img src="/head.jpg" alt="Hero" className="w-full h-full object-contain" />
          </div>
          {/* Text */}
          <div className="space-y-5 sm:space-y-8">
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold uppercase">
              {t.heroTag}
            </div>
            <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] ${text}`}>
              {t.heroTitle}{" "}
              <br />
              <span className="bg-gradient-to-r from-[#00A3FF] to-[#0057FF] bg-clip-text text-transparent">
                {t.heroSub}
              </span>
            </h1>
            <p className={`text-base sm:text-lg max-w-lg ${dark ? "text-slate-400" : "text-gray-500"}`}>
              {t.heroDesc}
            </p>
            <a
              href="#courses"
              className="inline-flex items-center gap-2 bg-[#002B5B] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-blue-900 transition-all shadow-lg"
            >
              {t.heroCta} <ArrowRight size={20} />
            </a>
          </div>
        </section>

        {/* STATS */}
        <section id="about" className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-24 sm:mb-32 scroll-mt-24">
          <div className="bg-[#002B5B] text-white rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between min-h-[180px] sm:min-h-[220px]">
            <h3 className="text-4xl sm:text-5xl font-black">6+</h3>
            <p className="uppercase font-medium text-blue-200">{t.statsYears}</p>
          </div>
          <div className={`rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between min-h-[180px] sm:min-h-[220px] shadow-sm border ${cardBg}`}>
            <TrendingUp size={32} className="text-blue-500" />
            <h3 className={`text-4xl sm:text-5xl font-black ${text}`}>10+</h3>
            <p className={`uppercase font-medium ${dark ? "text-slate-400" : "text-gray-400"}`}>{t.statsCourses}</p>
          </div>
          <div className="bg-[#00C853] text-white rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between min-h-[180px] sm:min-h-[220px]">
            <Users size={32} />
            <h3 className="text-4xl sm:text-5xl font-black">1000+</h3>
            <p className="uppercase font-medium text-green-50">{t.statsTeachers}</p>
          </div>
        </section>

        {/* KURSLAR */}
        <section id="courses" className="mb-24 sm:mb-32 scroll-mt-24">
          <h2 className={`text-center text-3xl sm:text-4xl md:text-5xl font-black mb-10 sm:mb-16 ${text}`}>
            {t.coursesTitle} <span className="text-blue-500">{t.coursesSpan}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { iconSrc: "/icons/programming.png",       bgColor: "bg-emerald-50",  key: "Dasturlash" },
              { iconSrc: "/icons/english.png",           bgColor: "bg-orange-50",   key: "Ingliz tili" },
              { iconSrc: "/icons/math.png",              bgColor: "bg-blue-50",     key: "Matematika" },
              { iconSrc: "/icons/russia.png",            bgColor: "bg-red-50",      key: "Rus tili" },
              { iconSrc: "/icons/german.png",            bgColor: "bg-amber-50",    key: "Nemis tili" },
              { iconSrc: "/icons/korea.png",             bgColor: "bg-pink-50",     key: "Koreys tili" },
              { iconSrc: "/icons/primaryeducation.png",  bgColor: "bg-teal-50",     key: "Boshlang'ich ta'lim" },
              { iconSrc: "/icons/physics.png",           bgColor: "bg-indigo-50",   key: "Fizika" },
              { iconSrc: null,                           bgColor: "bg-cyan-50",     key: "Kompyuter savodxonligi" },
            ].map((meta, i) => (
              <CourseCard
                key={meta.key}
                dark={dark}
                cardBg={cardBg}
                title={t.courses[i].title}
                iconSrc={meta.iconSrc}
                bgColor={meta.bgColor}
                items={[...t.courses[i].items]}
                enroll={t.enroll}
                onBtnClick={() => handleOpenModal(meta.key)}
              />
            ))}
          </div>
        </section>

        {/* ── NEWS ──────────────────────────────────────────────────────────── */}
        <section id="news" className="mb-24 sm:mb-32 scroll-mt-24">
          <h2 className={`text-center text-3xl sm:text-4xl md:text-5xl font-black mb-10 sm:mb-16 ${text}`}>
            {t.newsTitle} <span className="text-blue-500">{t.newsSpan}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                date: "2026-05-10",
                emoji: "🎓",
                color: "from-blue-500 to-indigo-600",
                title: { uz: "Yangi dasturlash kursi ochildi!", ru: "Открылся новый курс программирования!", en: "New programming course launched!" },
                desc: { uz: "Foundation va Web dasturlash yo'nalishlarida yangi guruhlar boshlandi.", ru: "Начались новые группы по Foundation и Web-разработке.", en: "New groups started in Foundation and Web development." },
              },
              {
                date: "2026-05-01",
                emoji: "🌟",
                color: "from-amber-400 to-orange-500",
                title: { uz: "Classmaster — Turtkuldagi eng yaxshi markazi!", ru: "Classmaster — лучший центр Нукуса!", en: "Classmaster — Best center in Nukus!" },
                desc: { uz: "2026-yil natijalari bo'yicha eng yaxshi o'quv markazi unvonini oldik.", ru: "По итогам 2026 года мы получили звание лучшего учебного центра.", en: "We received the best learning center award for 2026." },
              },
              {
                date: "2026-04-20",
                emoji: "📱",
                color: "from-emerald-400 to-teal-600",
                title: { uz: "IELTS tayyorlov yangi guruhlar", ru: "Новые группы подготовки к IELTS", en: "New IELTS preparation groups" },
                desc: { uz: "May oyida IELTS kursi uchun yangi guruhlar yozilishi boshlandi.", ru: "В апреле начался набор в новые группы курса IELTS.", en: "April enrollment opened for new IELTS course groups." },
              },
            ].map((news, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className={`rounded-[2rem] overflow-hidden border shadow-sm flex flex-col ${cardBg}`}
              >
                <div className={`h-2 w-full bg-gradient-to-r ${news.color}`} />
                <div className="p-7 flex flex-col gap-3 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{news.emoji}</span>
                    <span className={`text-xs font-bold ${dark ? "text-slate-500" : "text-gray-400"}`}>{news.date}</span>
                  </div>
                  <h3 className={`text-lg font-black leading-tight ${text}`}>{news.title[lang]}</h3>
                  <p className={`text-sm flex-1 ${dark ? "text-slate-400" : "text-gray-500"}`}>{news.desc[lang]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── SOCIAL MEDIA ──────────────────────────────────────────────────── */}
        <section id="social" className="mb-24 sm:mb-32 scroll-mt-24">
          <h2 className={`text-center text-3xl sm:text-4xl md:text-5xl font-black mb-10 sm:mb-16 ${text}`}>
            {t.socialTitle} <span className="text-blue-500">{t.socialSpan}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Telegram */}
            <a href="https://t.me/classmaster95" target="_blank" rel="noopener noreferrer"
              className="group rounded-[2rem] p-8 flex flex-col items-center gap-4 bg-[#0088cc] text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </div>
              <div className="text-center">
                <p className="font-black text-xl">{t.telegramChannel}</p>
                <p className="text-blue-100 text-sm mt-1">{t.telegramChannelDesc}</p>
              </div>
              <span className="mt-auto px-6 py-2 rounded-full bg-white/20 font-bold text-sm group-hover:bg-white/30 transition-all">@classmaster95</span>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com/classmaster_uz" target="_blank" rel="noopener noreferrer"
              className="group rounded-[2rem] p-8 flex flex-col items-center gap-4 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
              style={{ background: "linear-gradient(135deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" }}
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <div className="text-center">
                <p className="font-black text-xl">{t.instagramChannel}</p>
                <p className="text-pink-100 text-sm mt-1">{t.instagramChannelDesc}</p>
              </div>
              <span className="mt-auto px-6 py-2 rounded-full bg-white/20 font-bold text-sm group-hover:bg-white/30 transition-all">@classmaster95</span>
            </a>

            {/* YouTube */}
            <a href="https://youtube.com/@classmaster95" target="_blank" rel="noopener noreferrer"
              className="group rounded-[2rem] p-8 flex flex-col items-center gap-4 bg-[#FF0000] text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
              </div>
              <div className="text-center">
                <p className="font-black text-xl">{t.youtubeChannel}</p>
                <p className="text-red-100 text-sm mt-1">{t.youtubeChannelDesc}</p>
              </div>
              <span className="mt-auto px-6 py-2 rounded-full bg-white/20 font-bold text-sm group-hover:bg-white/30 transition-all">@classmaster95</span>
            </a>
          </div>
        </section>

        {/* BOG'LANISH */}
        <section id="contact" className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start pb-24 sm:pb-32 scroll-mt-24">
          <div className="space-y-8">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase ${text}`}>
              {t.contactTitle} <span className="text-blue-500">{t.contactSpan}</span>
            </h2>
            <div className="space-y-5">
              <ContactInfoCard dark={dark} cardBg={cardBg} href="https://www.google.com/maps/place/ClassMaster/@41.553137,60.9960846,18z/data=!4m14!1m7!3m6!1s0x41e079007918c205:0xfaa17bde7bfac8a5!2z0KLRg9GA0YLQutGD0LvRjA!8m2!3d41.619168!4d60.9743809!16s%2Fg%2F11xp8hg660!3m5!1s0x41dfd97ea5a1efa7:0x8604a00892a0aa97!8m2!3d41.5526679!4d60.9975609!16s%2Fg%2F11sqf49mzc?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D" icon={<MapPinned className="text-blue-500" />} title={t.contactAddress} description="To'rtko'l ko'chasi 52" subDescription="Soliq idorasi yonida" />
              <ContactInfoCard dark={dark} cardBg={cardBg} href="tel:+998958995500" icon={<PhoneCall className="text-green-500" />} title={t.contactPhone} description="+998 95 899-55-00" subDescription={t.contactHours} />
              <ContactInfoCard dark={dark} cardBg={cardBg} href="mailto:classmaster95@gmail.com" icon={<MailOpen className="text-purple-500" />} title="Email" description="classmaster95@gmail.com" />
            </div>
          </div>
          <div className={`rounded-[2rem] p-6 sm:p-10 shadow-2xl border ${cardBg}`}>
            <DirectContactForm dark={dark} inputBg={inputBg} text={text} t={t} />
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#001D3D] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 border-b border-white/10 pb-12 sm:pb-16">
          <div className="col-span-2 md:col-span-1 space-y-5">
            <div className="flex items-center gap-3">
              <img src="/photo_2024-12-13_14-07-31.jpg" alt="Logo" className="w-10 h-10 object-contain rounded-lg" />
              <div className="font-black text-xl tracking-tighter">
                classmaster <br />
                <span className="text-xs text-blue-400 uppercase">O'quv Markazi</span>
              </div>
            </div>
            <p className="text-blue-100/60 text-sm">{t.footerDesc}</p>
            <div className="flex gap-3">
              <a href="https://t.me/classmaster95" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-[#0088cc] hover:border-[#0088cc] transition-all">
                <Send size={18} />
              </a>
              <a href="https://instagram.com/classmaster95" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-pink-600 hover:border-pink-600 transition-all">
                <Globe size={18} />
              </a>
              <a href="https://youtube.com/@classmaster95" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-red-600 hover:border-red-600 transition-all">
                <Video size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-blue-400 mb-5 uppercase tracking-widest text-xs">{t.footerLinks}</h4>
            <ul className="space-y-3 text-sm text-blue-100/60 font-medium">
              {([["#home",0],["#courses",2],["#about",3]] as [string,number][]).map(([href,i]) => (
                <li key={href}><a href={href} className="hover:text-white transition-colors">{t.nav[i]}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-blue-400 mb-5 uppercase tracking-widest text-xs">{t.footerCourses}</h4>
            <ul className="space-y-3 text-sm text-blue-100/60 font-medium">
              {t.courseNames.map((c: string) => (
                <li key={c}><a href="#courses" className="hover:text-white transition-colors">{c}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-blue-400 mb-5 uppercase tracking-widest text-xs">{t.footerContact}</h4>
            <p className="text-sm text-blue-100/60">+998 95 899-55-00</p>
            <p className="text-sm text-blue-100/60 mt-2">Nukus, To'rtko'l ko'chasi 52</p>
          </div>
        </div>
        <div className="text-center mt-8 text-[10px] text-blue-100/30 uppercase font-bold tracking-widest">
          © 2026 classmaster O'quv Markazi. {t.footerRights}
        </div>
      </footer>
    </div>
  );
};

// ─── Course Card ─────────────────────────────────────────────────────────────
const CourseCard = ({ title, iconSrc, bgColor, items, onBtnClick, dark, cardBg, enroll }: any) => (
  <div className={`rounded-[2.5rem] p-7 sm:p-8 shadow-sm flex flex-col items-center transition-all hover:shadow-xl hover:-translate-y-1 border ${cardBg}`}>
    <div className={`${dark ? "bg-slate-700" : bgColor} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
      {iconSrc
        ? <img src={iconSrc} alt="" className="w-9 h-9 object-contain" />
        : <MonitorSmartphone className="text-cyan-500" />}
    </div>
    <h3 className={`text-xl sm:text-2xl font-black mb-6 ${dark ? "text-slate-100" : "text-[#002B5B]"}`}>{title}</h3>
    <ul className="space-y-3 mb-8 w-full">
      {items.map((item: string, i: number) => (
        <li key={i} className={`flex gap-2 text-sm font-medium ${dark ? "text-slate-400" : "text-gray-500"}`}>
          <ChevronRight size={16} className="text-blue-400 shrink-0 mt-0.5" />
          {item}
        </li>
      ))}
    </ul>
    <button
      onClick={onBtnClick}
      className="mt-auto w-full py-3.5 rounded-2xl bg-[#002B5B] hover:bg-[#003f85] text-white font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
    >
      {enroll || "Kursga yozilish"}
    </button>
  </div>
);

// ─── Contact Info Card ────────────────────────────────────────────────────────
const ContactInfoCard = ({ icon, title, description, subDescription, dark, cardBg, href }: any) => {
  const inner = (
    <>
      <div className={`${dark ? "bg-slate-700" : "bg-blue-50"} p-3.5 rounded-2xl shrink-0`}>{icon}</div>
      <div>
        <h4 className={`font-black text-lg ${dark ? "text-slate-100" : "text-[#002B5B]"}`}>{title}</h4>
        <p className={`font-medium ${dark ? "text-slate-300" : "text-gray-600"}`}>{description}</p>
        {subDescription && <p className={`text-sm ${dark ? "text-slate-500" : "text-gray-400"}`}>{subDescription}</p>}
      </div>
    </>
  );
  const cls = `p-5 sm:p-6 rounded-[2rem] flex items-center gap-5 transition-all hover:border-blue-200 border ${cardBg} ${href ? "cursor-pointer hover:shadow-md" : ""}`;
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <div className={cls}>{inner}</div>
  );
};

// ─── Direct Contact Form (in contact section) ─────────────────────────────────
const DirectContactForm = ({ dark, inputBg, text, t }: any) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name,
          phone,
          comment: message,
          course: "—",
          days: "—",
          time: "—",
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <CheckCircle size={48} className="text-green-500" />
        <p className={`font-black text-xl ${text}`}>{t?.msgSent || "Xabar yuborildi! 🎉"}</p>
        <p className={`text-sm ${dark ? "text-slate-400" : "text-gray-400"}`}>{t?.msgSentDesc || "Tez orada siz bilan bog'lanamiz."}</p>
        <button onClick={() => { setStatus("idle"); setName(""); setPhone(""); setMessage(""); }} className="mt-2 text-sm text-blue-500 hover:underline">
          {t?.msgAgain || "Yana yuborish"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder={t?.msgName || "Ismingiz"}
        required
        className={`w-full px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 ${inputBg}`}
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        type="tel"
        placeholder={t?.msgPhone || "+998 90 123 45 67"}
        required
        className={`w-full px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 ${inputBg}`}
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        placeholder={t?.msgPlaceholder || "Xabar..."}
        className={`w-full px-5 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 resize-none ${inputBg}`}
      />
      {status === "error" && (
        <p className="text-red-500 text-sm font-medium">{t?.msgError || "Xatolik! Qayta urinib ko'ring."}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 rounded-2xl bg-[#002B5B] hover:bg-blue-900 text-white font-black text-lg transition-all hover:scale-[1.01] disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <><Loader2 size={20} className="animate-spin" />{t?.formSending || "Yuborilmoqda..."}</>
        ) : (
          <><Send size={18} />{t?.msgSend || "Xabarni yuborish"}</>
        )}
      </button>
    </form>
  );
};

export default LandingPage;