import { BSON } from 'mongodb';

const labels = ['A', 'B', 'C', 'D'];
const text = value => typeof value === 'string' ? value : '';
const languages = ['en', 'te', 'hi'];
const languageValues = (source, convert) => Object.fromEntries(
  languages.filter(lang => source?.[lang] != null).map(lang => [lang, convert(source[lang])])
);
const options = values => labels.map((_, index) => text(values?.[index]));
const imagePaths = values => Array.isArray(values) ? values.filter(value =>
  typeof value === 'string' &&
  /^\/assets\/[a-zA-Z0-9_./-]+\.(?:jpg|jpeg|png|webp|gif)$/i.test(value) &&
  !value.includes('..')
) : [];

export function buildExamReview(questions, answers) {
  const counts = { correct: 0, wrong: 0, skipped: 0 };
  const rows = questions.map((q, index) => {
    const selected = labels.includes(answers?.[q.id]) ? answers[q.id] : null;
    const correctAnswer = text(q.correct_answer);
    const status = selected === null ? 'skipped' : selected === correctAnswer ? 'correct' : 'wrong';
    const marks = Number(q.marks) > 0 ? Number(q.marks) : 1;
    counts[status]++;
    return {
      number: index + 1,
      question: text(q.question),
      options: options(q.options),
      questionTranslations: languageValues(q.questionTranslations, text),
      optionTranslations: languageValues(q.optionTranslations, options),
      questionImages: imagePaths(q.questionImages),
      optionImages: labels.map((_, i) => imagePaths(q.optionImages?.[i])),
      selected,
      correctAnswer: labels.includes(correctAnswer) ? correctAnswer : null,
      status,
      marks,
      awarded: status === 'correct' ? marks : 0,
      explanation: text(q.explanation),
    };
  });
  const review = { counts, rows };
  // Leave room below MongoDB's document limit for the rest of the result.
  return BSON.calculateObjectSize(review) <= 8 * 1024 * 1024 ? review : null;
}

export function getOwnedExamReview(results, id, userId) {
  return results.findOne({ id, user_id: userId }, {
    projection: { _id: 0, exam: 1, score: 1, total: 1, percentage: 1, created_at: 1, review: 1 },
  });
}
