export const questionsAndAnswers = {
  nonGraduate: [
    // --- Активність (Activity) ---
    {
      trait: "activity",
      questionTextOne: "Я віддаю перевагу роботі в швидкому темпі.",
      questionTextTwo: "Я віддаю перевагу роботі в розміреному темпі.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "activity",
      questionTextOne: "Я люблю братися за кілька завдань одночасно.",
      questionTextTwo: "Я вважаю за краще фокусуватися на одному завданні до його завершення.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "activity",
      questionTextOne: "Мене надихає динамічна і змінна атмосфера.",
      questionTextTwo: "Мене надихає стабільна і передбачувана атмосфера.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },

    // --- Соціальність (Social) ---
    {
      trait: "social",
      questionTextOne: "Я люблю обговорювати ідеї в команді.",
      questionTextTwo: "Я люблю обдумувати ідеї самостійно.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "social",
      questionTextOne: "Я легко знаходжу спільну мову з новими людьми.",
      questionTextTwo: "Я віддаю перевагу спілкуванню з вузьким колом знайомих.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "social",
      questionTextOne: "Робота з людьми мене заряджає енергією.",
      questionTextTwo: "Робота з людьми виснажує мене емоційно.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },

    // --- Емоційна стабільність (Emotional Stability) ---
    {
      trait: "emotionalStability",
      questionTextOne: "Я зберігаю спокій навіть у стресових ситуаціях.",
      questionTextTwo: "Я можу емоційно реагувати на непередбачувані ситуації.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "emotionalStability",
      questionTextOne: "Я легко відпускаю робочі невдачі.",
      questionTextTwo: "Я довго аналізую свої помилки.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "emotionalStability",
      questionTextOne: "Мене важко вивести з рівноваги.",
      questionTextTwo: "Мій настрій може часто змінюватись.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },

    // --- Структурованість (Structure) ---
    {
      trait: "structure",
      questionTextOne: "Я ретельно планую свій робочий день.",
      questionTextTwo: "Я дію за ситуацією та імпровізую.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "structure",
      questionTextOne: "Я люблю дотримуватись чітких правил та інструкцій.",
      questionTextTwo: "Я віддаю перевагу творчому підходу без суворих рамок.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "structure",
      questionTextOne: "Я завжди тримаю своє робоче місце в ідеальному порядку.",
      questionTextTwo: "На моєму столі може бути 'творчий безлад'.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },

    // --- Лідерство (Leadership) ---
    {
      trait: "leadership",
      questionTextOne: "Я часто беру на себе відповідальність за прийняття рішень.",
      questionTextTwo: "Я віддаю перевагу, щоб рішення приймав хтось інший.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "leadership",
      questionTextOne: "Мені подобається керувати та направляти інших.",
      questionTextTwo: "Мені комфортніше бути виконавцем і виконувати свою частину роботи.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "leadership",
      questionTextOne: "У конфліктних ситуаціях я беру ініціативу в свої руки.",
      questionTextTwo: "У конфліктних ситуаціях я намагаюся знайти компроміс або уникаю їх.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    // --- Додаткові питання (Activity) ---
    {
      trait: "activity",
      questionTextOne: "Я люблю швидко переключатися між різними завданнями.",
      questionTextTwo: "Мені потрібен час, щоб налаштуватися на нове завдання.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "activity",
      questionTextOne: "Мене мотивують жорсткі дедлайни.",
      questionTextTwo: "Я краще працюю без обмежень у часі.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "activity",
      questionTextOne: "Я часто беру на себе ініціативу в нових проектах.",
      questionTextTwo: "Я приєднуюсь до проектів, коли все вже організовано.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    // --- Додаткові питання (Social) ---
    {
      trait: "social",
      questionTextOne: "Я отримую задоволення від публічних виступів.",
      questionTextTwo: "Я уникаю виступів перед великою аудиторією.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "social",
      questionTextOne: "Мені подобається розширювати мережу контактів.",
      questionTextTwo: "Я не бачу сенсу у формальному нетворкінгу.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "social",
      questionTextOne: "Я легко висловлюю свою думку в групі незнайомців.",
      questionTextTwo: "Я рідко ділюся думками з малознайомими людьми.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    // --- Додаткові питання (Emotional Stability) ---
    {
      trait: "emotionalStability",
      questionTextOne: "Критика стимулює мене працювати краще.",
      questionTextTwo: "Критика часто демотивує мене.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "emotionalStability",
      questionTextOne: "Я швидко відновлююся після конфліктів.",
      questionTextTwo: "Конфлікти надовго вибивають мене з колії.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "emotionalStability",
      questionTextOne: "Я легко адаптуюсь до несподіваних змін.",
      questionTextTwo: "Раптові зміни викликають у мене стрес.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    // --- Додаткові питання (Structure) ---
    {
      trait: "structure",
      questionTextOne: "Я завжди тримаю своє робоче місце в ідеальному порядку.",
      questionTextTwo: "Мене влаштовує творчий безлад.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "structure",
      questionTextOne: "Я надаю перевагу задачам з чітким алгоритмом дій.",
      questionTextTwo: "Я люблю завдання, де алгоритм потрібно винаходити самому.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "structure",
      questionTextOne: "Я завжди завершую одну справу перед початком іншої.",
      questionTextTwo: "Я часто перемикаюсь між незавершеними справами.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    // --- Додаткові питання (Leadership) ---
    {
      trait: "leadership",
      questionTextOne: "Я готовий брати на себе відповідальність за чужі помилки.",
      questionTextTwo: "Кожен має сам відповідати за свої дії.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "leadership",
      questionTextOne: "Мені легко переконувати інших у своїй правоті.",
      questionTextTwo: "Я віддаю перевагу компромісам замість суперечок.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    },
    {
      trait: "leadership",
      questionTextOne: "Я бачу себе керівником великої команди в майбутньому.",
      questionTextTwo: "Я бачу себе цінним спеціалістом без управлінських функцій.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    }

  ],
  graduate: [
    {
      trait: "math",
      isSubjectScore: true,
      questionTextOne: "Введіть ваш бал ЗНО/НМТ з математики (100-200) або шкільну оцінку (1-12)",
      questionTextTwo: "Введіть просто число",
      answers: [] // special handling in UI
    },
    {
      trait: "physics",
      isSubjectScore: true,
      questionTextOne: "Введіть ваш бал ЗНО/НМТ з фізики (100-200) або шкільну оцінку (1-12)",
      questionTextTwo: "Введіть просто число (якщо не складали - залиште порожнім або введіть 0)",
      answers: []
    }
  ]
};

questionsAndAnswers.graduate.push(...questionsAndAnswers.nonGraduate);
