export const questionsAndAnswers = {
  nonGraduate: [
    {
      trait: "activity",
      questionTextOne: "I prefer working fast.",
      questionTextTwo: "I prefer working carefully.",
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
      questionTextOne: "I like working in a team.",
      questionTextTwo: "I like working alone.",
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
      questionTextOne: "Enter your Math score (1-12)",
      questionTextTwo: "",
      answers: [] // special handling in UI
    },
    {
      trait: "physics",
      isSubjectScore: true,
      questionTextOne: "Enter your Physics score (1-12)",
      questionTextTwo: "",
      answers: []
    },
    {
      trait: "activity",
      questionTextOne: "I prefer working fast.",
      questionTextTwo: "I prefer working carefully.",
      answers: [
        { points: 1, text: "Точно А" },
        { points: 0.5, text: "Ближче до А" },
        { points: 0, text: "Не знаю" },
        { points: -0.5, text: "Ближче до Б" },
        { points: -1, text: "Точно Б" }
      ]
    }
  ]
};
