const cyberQuestions = [
  {
    question: "Что такое фишинг?",
    answers: [
      "Попытка мошенничества с целью получения конфиденциальной информации",
      "Разновидность вредоносного вируса",
      "Способ шифрования данных",
      "Тип сетевого протокола"
    ],
    correct: 0,
    category: "Основы безопасности"
  },
  {
    question: "Какой пароль наиболее безопасен?",
    answers: ["123456", "password", "qwerty123", "G7$mK9@pL2!v"],
    correct: 3,
    category: "Парольная безопасность"
  },
  {
    question: "Что означает HTTPS в адресе сайта?",
    answers: [
      "Высокоскоростной протокол передачи данных",
      "Гипертекстовый протокол с шифрованием",
      "Протокол для передачи изображений",
      "Специальный протокол для мобильных устройств"
    ],
    correct: 1,
    category: "Веб-безопасность"
  },
  {
    question: "Что такое двухфакторная аутентификация?",
    answers: [
      "Использование двух разных паролей",
      "Сочетание пароля и дополнительного фактора подтверждения",
      "Двойное шифрование данных",
      "Использование двух разных учетных записей"
    ],
    correct: 1,
    category: "Аутентификация"
  },
  {
    question: "Как определить фишинговую ссылку?",
    answers: [
      "Проверить наличие HTTPS",
      "Проверить доменное имя",
      "Обратить внимание на опечатки в URL",
      "Все вышеперечисленные методы"
    ],
    correct: 3,
    category: "Фишинг"
  },
  {
    question: "Что такое ransomware?",
    answers: [
      "Программа для шифрования данных с требованием выкупа",
      "Антивирусное ПО",
      "Сетевой протокол",
      "Тип брандмауэра"
    ],
    correct: 0,
    category: "Вредоносное ПО"
  },
  {
    question: "Как защититься от вредоносного ПО?",
    answers: [
      "Устанавливать ПО только из официальных источников",
      "Не открывать подозрительные вложения",
      "Регулярно обновлять систему",
      "Все вышеперечисленные методы"
    ],
    correct: 3,
    category: "Защита системы"
  },
  {
    question: "Что такое социальная инженерия?",
    answers: [
      "Метод взлома компьютерных систем",
      "Манипуляция людьми для получения конфиденциальной информации",
      "Способ защиты от хакеров",
      "Тип шифрования данных"
    ],
    correct: 1,
    category: "Человеческий фактор"
  },
  {
    question: "Что делать при подозрении на взлом аккаунта?",
    answers: [
      "Сменить пароль",
      "Уведомить службу поддержки",
      "Проверить активность в аккаунте",
      "Все вышеперечисленные действия"
    ],
    correct: 3,
    category: "Реагирование на инциденты"
  },
  {
    question: "Какие символы должны присутствовать в надежном пароле?",
    answers: [
      "Только буквы",
      "Только цифры",
      "Буквы и цифры",
      "Буквы, цифры и специальные символы"
    ],
    correct: 3,
    category: "Парольная безопасность"
  },
  // Исправлено: добавлена запятая после предыдущего объекта
  {
    question:
      "Что делать, если вы перешли по фишинговой ссылке и ввели свои данные?",
    answers: [
      "Ничего, если ничего не пропало — всё в порядке",
      "Сразу сменить пароли, отозвать сессии и проверить аккаунты",
      "Удалить браузер и установить новый",
      "Написать мошенникам и потребовать вернуть данные"
    ],
    correct: 1,
    category: "Реагирование на инциденты"
  },
  {
    question: "Какой из этих адресов наиболее подозрителен?",
    answers: [
      "https://www.sberbank.ru",
      "https://sberbank-security-verify.ru",
      "https://online.sberbank.ru",
      "https://www.sberbank.com"
    ],
    correct: 1,
    category: "Фишинг"
  },
  {
    question: "Как мошенники могут использовать вашу фотографию?",
    answers: [
      "Только для создания мемов",
      "Для создания фейковых аккаунтов и обмана ваших друзей",
      "Фотографии не представляют угрозы",
      "Только если на фото есть геолокация"
    ],
    correct: 1,
    category: "Цифровой след"
  },
  {
    question: "Что такое «цифровой след»?",
    answers: [
      "След от пальца на экране смартфона",
      "Вся информация о вас в интернете: посты, лайки, регистрации, покупки",
      "История поиска в браузере за последний час",
      "Пароль, который вы забыли"
    ],
    correct: 1,
    category: "Цифровая гигиена"
  }
];

let currentQuestion = 0;
let userAnswers = Array(cyberQuestions.length).fill(null);
let testCompleted = false;

// ============================================
// ФУНКЦИИ СОХРАНЕНИЯ ДАННЫХ (LOCALSTORAGE)
// ============================================
function saveCertificateData() {
  try {
    const nameEl = document.getElementById("user-name");
    const surnameEl = document.getElementById("user-surname");
    const styleEl = document.querySelector(".certificate-style-option.active");
    const scoreEl = document.getElementById("score-percentage");
    const levelEl = document.getElementById("score-description");

    if (!nameEl || !surnameEl || !scoreEl || !levelEl) return;

    const data = {
      name: nameEl.value.trim(),
      surname: surnameEl.value.trim(),
      style: styleEl ? styleEl.dataset.style : "classic",
      score: scoreEl.textContent,
      level: levelEl.textContent,
      completed: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem("cyberguard-cert-data", JSON.stringify(data));
  } catch (e) {
    console.error("Ошибка сохранения данных сертификата", e);
  }
}

function loadCertificateData() {
  try {
    const storedData = localStorage.getItem("cyberguard-cert-data");
    if (storedData) {
      const data = JSON.parse(storedData);
      if (data && data.completed) {
        const nameEl = document.getElementById("user-name");
        const surnameEl = document.getElementById("user-surname");
        const scoreEl = document.getElementById("score-percentage");
        const levelEl = document.getElementById("score-description");
        const cyberTestEl = document.getElementById("cyber-test");
        const resultsPageEl = document.getElementById("results-page");
        const restartBtnEl = document.getElementById("restart-test");
        const certPreviewEl = document.getElementById("certificate-preview");
        const certNameEl = document.getElementById("cert-name");
        const certScoreEl = document.getElementById("cert-score");
        const certLevelEl = document.getElementById("cert-level");
        const certDateEl = document.getElementById("cert-date");

        if (nameEl) nameEl.value = data.name || "";
        if (surnameEl) surnameEl.value = data.surname || "";

        if (data.style) {
          setCertificateStyle(data.style);
        }

        if (scoreEl) scoreEl.textContent = data.score || "0%";
        if (levelEl) levelEl.textContent = data.level || "Начальный уровень";

        if (cyberTestEl) cyberTestEl.style.display = "none";
        if (resultsPageEl) resultsPageEl.style.display = "block";
        if (restartBtnEl) restartBtnEl.style.display = "block";
        if (certPreviewEl) certPreviewEl.style.display = "block";

        if (certNameEl) certNameEl.textContent = `${data.name} ${data.surname}`;
        if (certScoreEl) certScoreEl.textContent = data.score || "0%";
        if (certLevelEl) certLevelEl.textContent = data.level || "Начальный";

        if (certDateEl) {
          const today = new Date();
          certDateEl.textContent = today.toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric"
          });
        }

        testCompleted = true;
      }
    }
  } catch (e) {
    console.error("Ошибка загрузки данных сертификата", e);
  }
}

function clearCertificateData() {
  try {
    localStorage.removeItem("cyberguard-cert-data");
  } catch (e) {
    console.error("Ошибка очистки данных", e);
  }
}

// Инициализация теста
function initCyberTest() {
  loadCertificateData();
  if (!testCompleted) {
    initTestProgress();
    loadQuestion();
  }
}

// Инициализация прогресс-бара теста
function initTestProgress() {
  const progressContainer = document.getElementById("test-progress");
  if (!progressContainer) return;

  progressContainer.innerHTML = "";
  for (let i = 0; i < cyberQuestions.length; i++) {
    const dot = document.createElement("div");
    dot.className = "progress-dot";
    dot.id = `test-dot-${i}`;
    progressContainer.appendChild(dot);
  }

  const totalEl = document.getElementById("total-questions");
  if (totalEl) totalEl.textContent = cyberQuestions.length;
}

// Обновление прогресса теста
function updateTestProgress() {
  for (let i = 0; i < cyberQuestions.length; i++) {
    const dot = document.getElementById(`test-dot-${i}`);
    if (!dot) continue;
    if (i < currentQuestion) {
      dot.className = "progress-dot completed";
    } else if (i === currentQuestion) {
      dot.className = "progress-dot active";
    } else {
      dot.className = "progress-dot";
    }
  }

  const questionNumberEl = document.getElementById("question-number");
  if (questionNumberEl) {
    questionNumberEl.textContent = `Вопрос ${currentQuestion + 1} из ${
      cyberQuestions.length
    }`;
  }
}

// Загрузка вопроса
function loadQuestion() {
  const questionText = document.getElementById("question-text");
  const answersContainer = document.getElementById("answers-container");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");
  const prevBtn = document.getElementById("prev-btn");

  if (!questionText || !answersContainer) return;

  const question = cyberQuestions[currentQuestion];
  questionText.textContent = question.question;
  answersContainer.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const answerElement = document.createElement("div");
    answerElement.className = "answer-option";
    answerElement.innerHTML = `
      <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
      ${answer}
    `;
    answerElement.dataset.index = index;

    if (userAnswers[currentQuestion] === index) {
      answerElement.classList.add("selected");
    }

    answerElement.addEventListener("click", function () {
      document.querySelectorAll(".answer-option").forEach((el) => {
        el.classList.remove("selected");
      });
      this.classList.add("selected");
      userAnswers[currentQuestion] = index;

      if (nextBtn) nextBtn.disabled = false;

      if (currentQuestion === cyberQuestions.length - 1) {
        if (nextBtn) nextBtn.style.display = "none";
        if (submitBtn) submitBtn.style.display = "inline-block";
      } else {
        if (nextBtn) nextBtn.style.display = "inline-block";
        if (submitBtn) submitBtn.style.display = "none";
      }
    });

    answersContainer.appendChild(answerElement);
  });

  if (prevBtn) prevBtn.disabled = currentQuestion === 0;
  if (nextBtn) nextBtn.disabled = userAnswers[currentQuestion] === null;

  if (currentQuestion === cyberQuestions.length - 1) {
    if (nextBtn) nextBtn.style.display = "none";
    if (submitBtn) submitBtn.style.display = "inline-block";
  } else {
    if (nextBtn) nextBtn.style.display = "inline-block";
    if (submitBtn) submitBtn.style.display = "none";
  }

  updateTestProgress();
}

// Переход к следующему вопросу
function nextQuestion() {
  if (currentQuestion < cyberQuestions.length - 1) {
    currentQuestion++;
    loadQuestion();
  }
}

// Переход к предыдущему вопросу
function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

// Завершение теста
function submitTest() {
  testCompleted = true;
  const correctCount = calculateCorrectAnswers();
  const percentage = Math.round((correctCount / cyberQuestions.length) * 100);

  const cyberTestEl = document.getElementById("cyber-test");
  const resultsPageEl = document.getElementById("results-page");
  const restartBtnEl = document.getElementById("restart-test");
  const correctCountEl = document.getElementById("correct-count");
  const totalQuestionsEl = document.getElementById("total-questions");
  const scorePercentageEl = document.getElementById("score-percentage");
  const scoreValueEl = document.getElementById("score-value");
  const scoreDescriptionEl = document.getElementById("score-description");

  if (cyberTestEl) cyberTestEl.style.display = "none";
  if (resultsPageEl) resultsPageEl.style.display = "block";
  if (restartBtnEl) restartBtnEl.style.display = "block";
  if (correctCountEl) correctCountEl.textContent = correctCount;
  if (totalQuestionsEl) totalQuestionsEl.textContent = cyberQuestions.length;
  if (scorePercentageEl) scorePercentageEl.textContent = `${percentage}%`;
  if (scoreValueEl) scoreValueEl.textContent = correctCount;

  let levelDescription, levelColor;
  if (percentage >= 90) {
    levelDescription = "Экспертный уровень";
    levelColor = "var(--neon-green)";
  } else if (percentage >= 75) {
    levelDescription = "Продвинутый уровень";
    levelColor = "var(--neon-green)";
  } else if (percentage >= 60) {
    levelDescription = "Средний уровень";
    levelColor = "#f59e0b";
  } else {
    levelDescription = "Начальный уровень";
    levelColor = "var(--neon-red)";
  }

  if (scoreDescriptionEl) {
    scoreDescriptionEl.textContent = levelDescription;
    scoreDescriptionEl.style.color = levelColor;
  }

  showCategoryBreakdown();
}

// Подсчет правильных ответов
function calculateCorrectAnswers() {
  let correct = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === cyberQuestions[index].correct) {
      correct++;
    }
  });
  return correct;
}

// Показываем детали по категориям
function showCategoryBreakdown() {
  const breakdownContainer = document.getElementById("results-breakdown");
  if (!breakdownContainer) return;

  breakdownContainer.innerHTML =
    '<h5>По категориям:</h5><ul id="category-list"></ul>';
  const categoryList = document.getElementById("category-list");
  if (!categoryList) return;

  const categories = {};
  cyberQuestions.forEach((q, index) => {
    if (!categories[q.category]) {
      categories[q.category] = { total: 0, correct: 0 };
    }
    categories[q.category].total++;
    if (userAnswers[index] === q.correct) {
      categories[q.category].correct++;
    }
  });

  Object.keys(categories).forEach((category) => {
    const { total, correct } = categories[category];
    const percentage = Math.round((correct / total) * 100);
    const item = document.createElement("li");
    item.style.margin = "8px 0";
    item.style.padding = "5px 10px";
    item.style.borderLeft = `3px solid ${
      percentage >= 70 ? "var(--neon-green)" : "var(--neon-red)"
    }`;
    item.style.backgroundColor = `rgba(${
      percentage >= 70 ? "0, 255, 170" : "255, 0, 85"
    }, 0.1)`;
    item.style.borderRadius = "5px";
    item.innerHTML = `
      ${category}:
      <span style="color: ${
        percentage >= 70 ? "var(--neon-green)" : "var(--neon-red)"
      }; float: right;">
        ${correct}/${total} (${percentage}%)
      </span>
    `;
    categoryList.appendChild(item);
  });
}

// Генерация сертификата
function generateCertificate() {
  const nameEl = document.getElementById("user-name");
  const surnameEl = document.getElementById("user-surname");

  if (!nameEl || !surnameEl) {
    showNotification("Поля имени не найдены", "error");
    return;
  }

  const name = nameEl.value.trim();
  const surname = surnameEl.value.trim();
  const fullName = `${name} ${surname}`.trim();

  if (!name || !surname) {
    showNotification("Пожалуйста, введите корректное имя и фамилию", "error");
    return;
  }

  const certNameEl = document.getElementById("cert-name");
  const certScoreEl = document.getElementById("cert-score");
  const certLevelEl = document.getElementById("cert-level");
  const certDateEl = document.getElementById("cert-date");
  const certPreviewEl = document.getElementById("certificate-preview");

  if (certNameEl) certNameEl.textContent = fullName;

  const correctCount = calculateCorrectAnswers();
  const percentage = Math.round((correctCount / cyberQuestions.length) * 100);

  if (certScoreEl) certScoreEl.textContent = `${percentage}%`;

  let levelDescription;
  if (percentage >= 90) {
    levelDescription = "Эксперт";
  } else if (percentage >= 75) {
    levelDescription = "Продвинутый";
  } else if (percentage >= 60) {
    levelDescription = "Средний";
  } else {
    levelDescription = "Начальный";
  }

  if (certLevelEl) certLevelEl.textContent = levelDescription;

  if (certDateEl) {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    certDateEl.textContent = today.toLocaleDateString("ru-RU", options);
  }

  if (certPreviewEl) certPreviewEl.style.display = "block";

  // СОХРАНЯЕМ ДАННЫЕ В LOCALSTORAGE
  saveCertificateData();
}

// ============================================
// ИСПРАВЛЕННАЯ ФУНКЦИЯ СКАЧИВАНИЯ СЕРТИФИКАТА
// ============================================
function downloadCertificate() {
  const certificate = document.getElementById("certificate-template");
  if (!certificate) {
    showNotification("Сертификат не найден!", "error");
    return;
  }

  const downloadBtn = document.getElementById("download-certificate");
  const originalText = downloadBtn ? downloadBtn.innerHTML : "";

  // Проверяем, загружена ли библиотека html2canvas
  if (typeof html2canvas === "undefined") {
    showNotification("Загрузка компонента для создания сертификата...", "info");
    // Загружаем библиотеку
    const script = document.createElement("script");
    script.src = "https://html2canvas.hertzen.com/dist/html2canvas.min.js";
    script.async = true;
    script.onload = function () {
      downloadCertificate(); // Повторяем попытку после загрузки
    };
    script.onerror = function () {
      showNotification(
        "Не удалось загрузить библиотеку. Проверьте интернет-соединение.",
        "error"
      );
      if (downloadBtn) {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
      }
    };
    document.head.appendChild(script);
    return;
  }

  // Показываем индикатор загрузки
  if (downloadBtn) {
    downloadBtn.innerHTML = '<span class="icon">⏳</span> Создание...';
    downloadBtn.disabled = true;
  }

  // Создаем клон сертификата для экспорта
  const exportContainer = document.createElement("div");
  exportContainer.style.position = "fixed";
  exportContainer.style.top = "-9999px";
  exportContainer.style.left = "-9999px";
  exportContainer.style.width = "800px";
  exportContainer.style.background = "#ffffff";
  exportContainer.style.padding = "20px";
  exportContainer.style.zIndex = "-1";
  exportContainer.style.fontFamily = "Roboto, Arial, sans-serif";

  // Клонируем сертификат
  const certClone = certificate.cloneNode(true);
  certClone.style.width = "760px";
  certClone.style.margin = "0";
  certClone.style.boxShadow = "none";
  certClone.style.border = "none";
  exportContainer.appendChild(certClone);
  document.body.appendChild(exportContainer);

  // Даем время на рендеринг
  setTimeout(function () {
    html2canvas(exportContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      allowTaint: true,
      foreignObjectRendering: true
    })
      .then(function (canvas) {
        // Создаем ссылку для скачивания
        const link = document.createElement("a");
        link.download = `CyberGuard_Сертификат_${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

        // Очищаем
        document.body.removeChild(exportContainer);
        if (downloadBtn) {
          downloadBtn.innerHTML = originalText;
          downloadBtn.disabled = false;
        }
        showNotification("✅ Сертификат успешно сохранен!", "success");
      })
      .catch(function (error) {
        console.error("Ошибка при создании сертификата:", error);
        document.body.removeChild(exportContainer);
        if (downloadBtn) {
          downloadBtn.innerHTML = originalText;
          downloadBtn.disabled = false;
        }
        showNotification(
          "❌ Ошибка при создании сертификата. Попробуйте еще раз.",
          "error"
        );
      });
  }, 100);
}

// Перезапуск теста
function restartTest() {
  currentQuestion = 0;
  userAnswers = Array(cyberQuestions.length).fill(null);
  testCompleted = false;

  const resultsPageEl = document.getElementById("results-page");
  const restartBtnEl = document.getElementById("restart-test");
  const cyberTestEl = document.getElementById("cyber-test");

  if (resultsPageEl) resultsPageEl.style.display = "none";
  if (restartBtnEl) restartBtnEl.style.display = "none";
  if (cyberTestEl) cyberTestEl.style.display = "block";

  clearCertificateData();
  loadQuestion();
}

// Установка стиля сертификата
function setCertificateStyle(style) {
  const certificate = document.getElementById("certificate-template");
  if (!certificate) return;

  certificate.className = certificate.className
    .replace(/classic|tech|green|purple/g, "")
    .trim();
  certificate.classList.add(style);

  document.querySelectorAll(".certificate-style-option").forEach((option) => {
    option.classList.remove("active");
    if (option.dataset.style === style) {
      option.classList.add("active");
    }
  });
}

// ============================================
// ПРОВЕРКА ПАРОЛЯ
// ============================================
function analyzePassword(password) {
  const requirements = {
    length: document.getElementById("length-req"),
    upper: document.getElementById("upper-req"),
    lower: document.getElementById("lower-req"),
    number: document.getElementById("number-req"),
    special: document.getElementById("special-req"),
    common: document.getElementById("common-req")
  };

  const strengthFill = document.getElementById("password-strength-fill");
  const feedback = document.getElementById("password-feedback");
  const strengthBar = document.querySelector(".password-strength");

  if (!strengthFill || !feedback) return;

  if (!password || password.trim() === "") {
    document.querySelectorAll(".requirement").forEach((el) => {
      el.classList.remove("valid");
    });
    strengthFill.style.width = "0%";
    feedback.innerHTML = "Введите пароль для анализа";
    return;
  }

  const hasLength = password.length >= 12;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isNotCommon = !isCommonPassword(password);

  if (requirements.length) updateRequirement(requirements.length, hasLength);
  if (requirements.upper) updateRequirement(requirements.upper, hasUpper);
  if (requirements.lower) updateRequirement(requirements.lower, hasLower);
  if (requirements.number) updateRequirement(requirements.number, hasNumber);
  if (requirements.special) updateRequirement(requirements.special, hasSpecial);
  if (requirements.common) updateRequirement(requirements.common, isNotCommon);

  let score = 0;
  if (hasLength) score += 20;
  if (hasUpper) score += 20;
  if (hasLower) score += 20;
  if (hasNumber) score += 20;
  if (hasSpecial) score += 20;
  if (isNotCommon) score += 20;

  score = Math.min(score, 100);
  strengthFill.style.width = `${score}%`;

  if (strengthBar) {
    strengthBar.setAttribute("aria-valuenow", score);
  }

  if (score < 40) {
    strengthFill.style.background = "var(--neon-red)";
    feedback.innerHTML =
      '<span style="color: var(--neon-red);">СЛИШКОМ СЛАБЫЙ</span> - Риск очень высок';
  } else if (score < 70) {
    strengthFill.style.background = "linear-gradient(90deg, #ef4444, #f59e0b)";
    feedback.innerHTML =
      '<span style="color: #f59e0b;">СРЕДНИЙ</span> - Требуется улучшение';
  } else if (score < 90) {
    strengthFill.style.background = "linear-gradient(90deg, #f59e0b, #10b981)";
    feedback.innerHTML =
      '<span style="color: #10b981;">ХОРОШИЙ</span> - Хорошая защита';
  } else {
    strengthFill.style.background = "var(--neon-green)";
    feedback.innerHTML =
      '<span style="color: var(--neon-green);">ОТЛИЧНО</span> - Высокая безопасность';
  }
}

function updateRequirement(element, isValid) {
  if (!element) return;
  if (isValid) {
    element.classList.add("valid");
  } else {
    element.classList.remove("valid");
  }
}

function isCommonPassword(password) {
  const commonPasswords = [
    "123456",
    "password",
    "123456789",
    "qwerty",
    "1234567",
    "12345678",
    "12345",
    "iloveyou",
    "111111",
    "123123",
    "admin",
    "welcome",
    "abc123",
    "1234",
    "qwerty123",
    "password1",
    "1q2w3e4r",
    "dragon",
    "letmein",
    "monkey",
    "696969",
    "football",
    "555555",
    "shadow",
    "master",
    "666666",
    "qwertyuiop",
    "123321",
    "mustang"
  ];
  const lowerPassword = password.toLowerCase().trim();
  const reversedPassword = lowerPassword.split("").reverse().join("");

  if (commonPasswords.includes(lowerPassword)) return true;
  if (commonPasswords.includes(reversedPassword)) return true;

  return commonPasswords.some(
    (common) =>
      lowerPassword.includes(common) || reversedPassword.includes(common)
  );
}

// ============================================
// ГЕНЕРАТОР ПАРОЛЕЙ
// ============================================
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generatePassword() {
  const lengthEl = document.getElementById("password-length");
  const includeUpperEl = document.getElementById("include-upper");
  const includeLowerEl = document.getElementById("include-lower");
  const includeNumbersEl = document.getElementById("include-numbers");
  const includeSpecialEl = document.getElementById("include-special");
  const excludeAmbiguousEl = document.getElementById("exclude-ambiguous");
  const output = document.getElementById("generated-password");

  if (!output || !lengthEl) return;

  const length = parseInt(lengthEl.value);
  const includeUpper = includeUpperEl ? includeUpperEl.checked : true;
  const includeLower = includeLowerEl ? includeLowerEl.checked : true;
  const includeNumbers = includeNumbersEl ? includeNumbersEl.checked : true;
  const includeSpecial = includeSpecialEl ? includeSpecialEl.checked : true;
  const excludeAmbiguous = excludeAmbiguousEl
    ? excludeAmbiguousEl.checked
    : false;

  let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let lowerChars = "abcdefghijklmnopqrstuvwxyz";
  let numberChars = "0123456789";
  let specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  if (excludeAmbiguous) {
    upperChars = upperChars.replace(/[IO]/g, "");
    lowerChars = lowerChars.replace(/[l]/g, "");
    numberChars = numberChars.replace(/[0O]/g, "");
  }

  let charSet = "";
  if (includeUpper) charSet += upperChars;
  if (includeLower) charSet += lowerChars;
  if (includeNumbers) charSet += numberChars;
  if (includeSpecial) charSet += specialChars;

  if (charSet === "") {
    charSet = upperChars + lowerChars + numberChars + specialChars;
  }

  let password = "";
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    password += charSet[array[i] % charSet.length];
  }

  let passwordArray = password.split("");
  let missingChars = [];

  if (includeUpper && !/[A-Z]/.test(password)) {
    missingChars.push(
      upperChars[
        crypto.getRandomValues(new Uint32Array(1))[0] % upperChars.length
      ]
    );
  }
  if (includeLower && !/[a-z]/.test(password)) {
    missingChars.push(
      lowerChars[
        crypto.getRandomValues(new Uint32Array(1))[0] % lowerChars.length
      ]
    );
  }
  if (includeNumbers && !/[0-9]/.test(password)) {
    missingChars.push(
      numberChars[
        crypto.getRandomValues(new Uint32Array(1))[0] % numberChars.length
      ]
    );
  }
  if (includeSpecial && !/[^A-Za-z0-9]/.test(password)) {
    missingChars.push(
      specialChars[
        crypto.getRandomValues(new Uint32Array(1))[0] % specialChars.length
      ]
    );
  }

  if (missingChars.length > 0) {
    let indices = [];
    for (let i = 0; i < password.length; i++) {
      indices.push(i);
    }
    indices = shuffleArray(indices);
    for (let i = 0; i < Math.min(missingChars.length, indices.length); i++) {
      passwordArray[indices[i]] = missingChars[i];
    }
    password = passwordArray.join("");
  }

  password = shuffleArray(password.split("")).join("");
  output.value = password;
  analyzePassword(password);
}

function copyPassword() {
  const output = document.getElementById("generated-password");
  const notification = document.getElementById("copy-notification");

  if (!output || !output.value) {
    showNotification("Сначала сгенерируйте пароль!", "error");
    return;
  }

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(output.value)
      .then(() => {
        if (notification) {
          notification.classList.add("show");
          setTimeout(() => {
            notification.classList.remove("show");
          }, 2000);
        }
      })
      .catch((err) => {
        copyPasswordFallback(output, notification);
      });
  } else {
    copyPasswordFallback(output, notification);
  }
}

function copyPasswordFallback(output, notification) {
  const textarea = document.createElement("textarea");
  textarea.value = output.value;
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    const successful = document.execCommand("copy");
    if (successful && notification) {
      notification.classList.add("show");
      setTimeout(() => {
        notification.classList.remove("show");
      }, 2000);
    }
  } catch (err) {
    showNotification("Не удалось скопировать пароль.", "error");
  } finally {
    document.body.removeChild(textarea);
  }
}

// ============================================
// ПРОВЕРКА ССЫЛОК
// ============================================
function checkLinkSafety() {
  const linkInput = document.getElementById("link-input");
  const linkResult = document.getElementById("link-result");

  if (!linkInput || !linkResult) return;

  let url = linkInput.value.trim();
  if (!url) {
    showNotification("Введите URL для проверки", "error");
    return;
  }

  linkResult.classList.add("show");

  const safetyLevel = document.getElementById("safety-level");
  const linkDomain = document.getElementById("link-domain");
  const analysisList = document.getElementById("link-analysis");

  setTimeout(() => {
    analyzeLink(url, safetyLevel, linkDomain, analysisList);
  }, 800);
}

function analyzeLink(url, safetyLevel, linkDomain, analysisList) {
  if (!safetyLevel || !linkDomain || !analysisList) return;

  let domain = "Неизвестный домен";
  let protocol = "http";
  let isHttps = false;
  let isExampleDomain = false;

  function normalizeDomain(domain) {
    return domain.toLowerCase().replace(/^www\./, "");
  }

  function isExampleDomainCheck(domain) {
    const normalized = normalizeDomain(domain);
    return (
      normalized === "example.com" ||
      normalized === "example.net" ||
      normalized === "example.org" ||
      normalized.endsWith(".example.com") ||
      normalized.endsWith(".example.net") ||
      normalized.endsWith(".example.org")
    );
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  try {
    const urlObj = new URL(url);
    domain = urlObj.hostname;
    protocol = urlObj.protocol.replace(":", "");
    isHttps = protocol === "https";
    isExampleDomain = isExampleDomainCheck(domain);
  } catch (e) {
    safetyLevel.className = "link-safety-level safety-low";
    safetyLevel.textContent = "НЕВЕРНЫЙ URL-ФОРМАТ";
    linkDomain.textContent = `Введенная строка: ${url}`;
    analysisList.innerHTML =
      '<li class="invalid">Ошибка: Некорректный формат URL.</li>';
    return;
  }

  const phishingDomains = [
    "sberbank-security.ru",
    "gospohi.ru",
    "appleid-secure.com",
    "paypal-verification.com",
    "microsoft-login.net",
    "vk-confirm.ru",
    "secure-sberbank",
    "bank-login",
    "account-verify"
  ];

  const isPhishing = phishingDomains.some((phishingDomain) =>
    domain.toLowerCase().includes(phishingDomain.toLowerCase())
  );

  const suspiciousChars = /[%@!]/.test(url);
  const shortDomain = domain.replace("www.", "").split(".")[0].length < 5;
  const suspiciousPath =
    /login|secure|verify|account|update/i.test(url) &&
    !/^(https?:\/\/)?(www\.)?(sberbank|gazprombank|tinkoff|vk|mail|yandex)/i.test(
      domain
    );

  let issues = [];
  let safePoints = [];
  let infoMessages = [];

  if (isExampleDomain) {
    infoMessages.push("Этот домен используется только для примеров");
    infoMessages.push("Не используйте example.com в реальных операциях");
  } else {
    if (isHttps) {
      safePoints.push("Используется защищенное соединение HTTPS");
    } else {
      issues.push("Отсутствует HTTPS - данные могут быть перехвачены");
    }
    if (!isPhishing) {
      safePoints.push("Домен не найден в базе фишинговых сайтов");
    } else {
      issues.push("ВЫСОКИЙ РИСК: Домен подозрителен на фишинг!");
    }
    if (!suspiciousChars) {
      safePoints.push("URL не содержит подозрительных символов");
    } else {
      issues.push("URL содержит подозрительные символы");
    }
    if (!shortDomain) {
      safePoints.push("Домен имеет нормальную длину");
    } else {
      issues.push("Короткий домен - часто используется в фишинге");
    }
    if (!suspiciousPath) {
      safePoints.push("Путь в URL выглядит нормально");
    } else {
      issues.push("Подозрительный путь в URL");
    }
  }

  let safetyScore = 100;
  if (!isExampleDomain) {
    if (!isHttps) safetyScore -= 40;
    if (isPhishing) safetyScore -= 60;
    if (suspiciousChars) safetyScore -= 30;
    if (shortDomain) safetyScore -= 20;
    if (suspiciousPath) safetyScore -= 25;
  }

  linkDomain.textContent = `Домен: ${domain}`;

  if (isExampleDomain) {
    safetyLevel.className = "link-safety-level safety-info";
    safetyLevel.textContent = "ИНФОРМАЦИОННЫЙ ДОМЕН";
  } else if (safetyScore > 70) {
    safetyLevel.className = "link-safety-level safety-high";
    safetyLevel.textContent = "ВЫСОКИЙ УРОВЕНЬ БЕЗОПАСНОСТИ";
  } else if (safetyScore > 40) {
    safetyLevel.className = "link-safety-level safety-medium";
    safetyLevel.textContent = "СРЕДНИЙ УРОВЕНЬ БЕЗОПАСНОСТИ";
  } else {
    safetyLevel.className = "link-safety-level safety-low";
    safetyLevel.textContent = "НИЗКИЙ УРОВЕНЬ БЕЗОПАСНОСТИ";
  }

  analysisList.innerHTML = "";
  infoMessages.forEach((message) => {
    const li = document.createElement("li");
    li.className = "info";
    li.textContent = message;
    analysisList.appendChild(li);
  });
  safePoints.forEach((point) => {
    const li = document.createElement("li");
    li.className = "valid";
    li.textContent = point;
    analysisList.appendChild(li);
  });
  issues.forEach((issue) => {
    const li = document.createElement("li");
    li.className = "invalid";
    li.textContent = issue;
    analysisList.appendChild(li);
  });

  if (!isExampleDomain && safetyScore < 50) {
    const li = document.createElement("li");
    li.className = "invalid";
    li.innerHTML =
      "<strong>РЕКОМЕНДАЦИЯ:</strong> Не переходите по этой ссылке!";
    analysisList.appendChild(li);
  }
}

// ============================================
// УПРАВЛЕНИЕ ТЕМАМИ
// ============================================
const initTheme = () => {
  const savedTheme = localStorage.getItem("cyberguard-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "light") {
    setTheme("light");
  } else if (savedTheme === "dark") {
    setTheme("dark");
  } else if (prefersDark) {
    setTheme("dark");
  } else {
    setTheme("light");
  }

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
};

const toggleTheme = () => {
  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);
};

const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);

  const themeIcon = document.getElementById("theme-icon");
  if (themeIcon) {
    themeIcon.textContent = theme === "light" ? "☀️" : "🌙";
  }

  try {
    localStorage.setItem("cyberguard-theme", theme);
  } catch (e) {
    console.error("Не удалось сохранить тему", e);
  }
};

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 18px 30px;
    border-radius: 12px;
    font-weight: bold;
    z-index: 3000;
    color: white;
    text-align: center;
    max-width: 80%;
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
    transition: opacity 0.3s;
    font-size: 1.1rem;
    border: 1px solid rgba(255,255,255,0.2);
  `;

  if (type === "success") {
    notification.style.background = "var(--neon-green)";
    notification.style.textShadow = "0 0 10px rgba(0, 255, 170, 0.7)";
  } else if (type === "error") {
    notification.style.background = "var(--neon-red)";
    notification.style.textShadow = "0 0 10px rgba(255, 0, 85, 0.7)";
  } else {
    notification.style.background = "var(--neon-blue)";
    notification.style.textShadow = "0 0 10px rgba(0, 243, 255, 0.7)";
  }

  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// ============================================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ DOM
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initCyberTest();

  const passwordInput = document.getElementById("password-input");
  const togglePassword = document.getElementById("toggle-password");

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      const iconSpan = this.querySelector(".icon");
      if (iconSpan) {
        iconSpan.textContent = type === "password" ? "👁️" : "🙈";
      }
      this.setAttribute(
        "aria-label",
        type === "password" ? "Показать пароль" : "Скрыть пароль"
      );
    });

    passwordInput.addEventListener("input", function () {
      analyzePassword(this.value);
    });
  }

  const btnGenerate = document.getElementById("btn-generate");
  const btnCopy = document.getElementById("btn-copy");
  const passwordLength = document.getElementById("password-length");
  const lengthValue = document.getElementById("length-value");

  if (passwordLength && lengthValue) {
    passwordLength.addEventListener("input", function () {
      lengthValue.textContent = this.value;
    });
  }

  if (btnGenerate) {
    btnGenerate.addEventListener("click", generatePassword);
  }

  if (btnCopy) {
    btnCopy.addEventListener("click", copyPassword);
  }

  const checkLinkBtn = document.getElementById("check-link-btn");
  const linkInput = document.getElementById("link-input");

  if (checkLinkBtn) {
    checkLinkBtn.addEventListener("click", checkLinkSafety);
  }

  if (linkInput) {
    linkInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        checkLinkSafety();
      }
    });
  }

  document.getElementById("next-btn")?.addEventListener("click", nextQuestion);
  document.getElementById("prev-btn")?.addEventListener("click", prevQuestion);
  document.getElementById("submit-btn")?.addEventListener("click", submitTest);
  document
    .getElementById("generate-certificate")
    ?.addEventListener("click", generateCertificate);
  document
    .getElementById("download-certificate")
    ?.addEventListener("click", downloadCertificate);
  document
    .getElementById("restart-test")
    ?.addEventListener("click", restartTest);

  document.querySelectorAll(".certificate-style-option").forEach((option) => {
    option.addEventListener("click", function () {
      setCertificateStyle(this.dataset.style);
    });
  });
});