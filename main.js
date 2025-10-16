// عناصر DOM
const identifier = document.getElementById("identifier");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");
const formError = document.getElementById("formError");
const togglePwd = document.getElementById("togglePwd");

// التحقق من الحقول
function isValidIdentifier(value) {
  if (!value) return false;
  // إذا احتوى على @ نتحقق من نمط البريد
  if (value.includes("@")) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  }

  // اسم المستخدم: 3-30 حرف/م رقم
  else {
    const usernamePattern = /^[\u0600-\u06FF\w.-]{3,30}$/;
    return usernamePattern.test(value);
  }
}

function isValidPassword(value) {
  return value && value.length >= 8;
}

function updateState() {
  formError.style.display = "none";
  const valid =
    isValidIdentifier(identifier.value.trim()) &&
    isValidPassword(password.value);
  loginBtn.disabled = !valid;
}

identifier.addEventListener("input", () => {
  updateState();
  // validation message live
  if (!isValidIdentifier(identifier.value.trim())) {
    formError.textContent =
      "يرجى إدخال بريد إلكتروني صالح أو اسم مستخدم (3-30 حرف).";
    formError.style.display = "block";
  } else {
    formError.style.display = "none";
  }
});

password.addEventListener("input", () => {
  updateState();
  if (!isValidPassword(password.value)) {
    formError.textContent =
      "كلمة المرور قصيرة — يجب أن تتكون من 8 أحرف على الأقل.";
    formError.style.display = "block";
  } else {
    formError.style.display = "none";
  }
});

togglePwd.addEventListener("click", () => {
  const t = password.type === "password" ? "text" : "password";
  password.type = t;
  togglePwd.textContent = t === "text" ? "🙈" : "👁️";
  togglePwd.setAttribute("aria-pressed", t === "text");
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //   نعرض رسالة نجاح وهميّة
  loginBtn.disabled = true;
  loginBtn.textContent = "جاري التحقق...";

  // النتيجة: نجاح تسجيل الدخول — في مشروع حقيقي تعالج الاستجابة هنا
  setTimeout(() => {
    loginBtn.textContent = "تم تسجيل الدخول ✓";
    loginBtn.style.opacity = 0.95;
    // إعادة تهيئة بعد لحظة صغيرة
    setTimeout(() => {
      loginBtn.textContent = "تسجيل الدخول";
      loginBtn.disabled = false;
      identifier.value = "";
      password.value = "";
      updateState();
    }, 1500);
  }, 1000);
});

// تهيئة أوليّة
updateState();
