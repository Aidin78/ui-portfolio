window.GsiBooks = (() => {
  const books = [
    { id: 'b1', title: 'پارینه‌لرزه‌شناسی', subject: 'زمین‌ساخت و لرزه‌شناسی', credit: 'سید علی آقانباتی', cover: 'b1.jpg', price: 800000,
      description: 'این کتاب روش شناسایی زمین‌لرزه‌های گذشته را با مطالعهٔ رسوبات و آثار جابه‌جایی گسل معرفی می‌کند. مطالعهٔ موردی آن به گسل قلعه‌سرخ در خاور ایران می‌پردازد.',
      overview: 'در پژوهش گسل قلعه‌سرخ، تصاویر ماهواره‌ای، نقشه‌های زمین‌شناسی، مدل ارتفاعی و داده‌های میدانی در کنار هم بررسی شده‌اند. نشانه‌هایی مانند بریدگی رسوبات کواترنر و جابه‌جایی آبراهه‌ها مبنای انتخاب محل حفر ترانشه‌ها بوده‌اند. پژوهشگران با بررسی یک ترانشهٔ اصلی و دو ترانشهٔ جانبی، شواهدی از حرکت عمدتاً راست‌بر گسل با مؤلفهٔ معکوس به دست آورده‌اند.' },
    { id: 'b2', title: 'مطالعات میکروسکوپی و پردازش تصویری بتن', subject: 'مواد و انرژی', credit: 'فریدون رضایی و مهدی عسگری‌نژاد', cover: 'b2.png', price: 800000,
      description: 'معرفی روش‌های بررسی ساختار بتن با تصاویر میکروسکوپی و پردازش تصویر برای مطالعهٔ ویژگی‌های این ماده.' },
    { id: 'b3', title: 'انرژی‌های زیستی و هیدروژنی', subject: 'مواد و انرژی', credit: 'علیرضا واعظی، عمار قاسمیان عزیزی و حمید نظری', cover: 'b3.png', price: null,
      description: 'آشنایی با انرژی زیستی، هیدروژن و نقش آن‌ها در تولید انرژی و استفاده از منابع جایگزین.' },
    { id: 'b4', title: 'پیش‌درآمدی بر اصول و مفاهیم ژئوکانزرویشن', subject: 'حفاظت و میراث زمین‌شناسی', cover: 'b4.png', price: 800000,
      description: 'آشنایی با اصول حفاظت از میراث زمین‌شناسی و اهمیت شناسایی، معرفی و نگهداری از مکان‌های ارزشمند زمین‌شناختی.' },
    { id: 'b5', title: 'کاتالوگ نقشه‌های سازمان زمین‌شناسی و اکتشافات معدنی', subject: 'نقشه‌ها و داده‌های زمین‌شناسی', cover: 'b5.png', price: null,
      description: 'معرفی نقشه‌های زمین‌شناسی سازمان برای شناخت پوشش و تنوع داده‌ها و پیدا کردن نقشهٔ مناسب برای مطالعه.' },
    { id: 'b6', title: 'زمین‌شناسی بخش شمالی خلیج فارس', subject: 'نقشه‌ها و داده‌های زمین‌شناسی', cover: 'b6.png', price: 800000,
      description: 'معرفی زمین‌شناسی بخش شمالی خلیج فارس با تمرکز بر ویژگی‌های منطقه، چینه‌شناسی و اجزای رسوبی.' },
    { id: 'b7', title: 'سنگ‌شناسی دگرگونی، مفاهیم و واژه‌ها', subject: 'سنگ‌شناسی', cover: 'b7.png', price: 800000,
      description: 'آشنایی با مفاهیم و واژه‌های سنگ‌شناسی دگرگونی برای مطالعهٔ سنگ‌ها و خواندن منابع تخصصی.' },
    { id: 'b8', title: 'زمین‌شناسی ساختاری و زمین‌ساخت کاربردی', subject: 'زمین‌ساخت و لرزه‌شناسی', cover: 'b8.png', price: 800000,
      description: 'معرفی ساختارهایی مانند چین‌ها و گسل‌ها و کاربرد شناخت آن‌ها در تفسیر تغییر شکل پوستهٔ زمین.' }
  ];
  // Keep Persian digits, but use the familiar baseline comma instead of the
  // elevated Arabic thousands separator produced by Intl for fa-IR.
  const number = value => {
    const raw = new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(value);
    const [integer, fraction] = raw.split('٫');
    const grouped = integer.replace(/([۰-۹])(?=(?:[۰-۹]{3})+(?![۰-۹]))/g, '$1,');
    return fraction === undefined ? grouped : grouped + '٫' + fraction;
  };
  const digits = value => String(value).replace(/[۰-۹٠-٩]/g, digit =>
    digit >= '۰' ? '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit) : '٠١٢٣٤٥٦٧٨٩'.indexOf(digit)
  );
  const money = value => value === null ? 'قیمت درج نشده' : number(value) + ' ریال';
  const details = book => book.id === 'b1' ? 'books-info.html' : 'books-info.html?book=' + book.id;
  return { books, find: id => books.find(book => book.id === id), number, digits, money, details };
})();
