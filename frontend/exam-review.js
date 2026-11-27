const byId = id => document.getElementById(id);
const filter = byId('reviewFilter');
const language = byId('reviewLanguage');
const statuses = { correct: 'Correct', wrong: 'Wrong', skipped: 'Skipped' };
const labels = ['A', 'B', 'C', 'D'];
const languageLabels = { en: 'English', te: 'తెలుగు', hi: 'हिन्दी' };

function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text) element.textContent = text;
    if (className) element.className = className;
    return element;
}

function addImages(parent, paths, label) {
    paths.forEach((path, index) => {
        if (!/^\/assets\/[a-zA-Z0-9_./-]+\.(?:jpg|jpeg|png|webp|gif)$/i.test(path) || path.includes('..')) return;
        const image = node('img');
        image.alt = `${label} image ${index + 1}`;
        image.loading = 'lazy';
        image.src = path;
        parent.append(image);
    });
}

function renderQuestion(row) {
    const lang = language.value;
    const card = node('article', '', 'review-question');
    card.append(
        node('h3', `Question ${row.number} · ${statuses[row.status]} · ${row.awarded}/${row.marks} marks`),
        node('p', row.questionTranslations[lang] || row.question, 'review-text')
    );
    addImages(card, row.questionImages, `Question ${row.number}`);
    const choices = node('ul', '', 'review-options');
    labels.forEach((label, index) => {
        const markers = [];
        if (label === row.selected) markers.push('Your answer');
        if (label === row.correctAnswer) markers.push('Correct answer');
        const option = node('li', '', 'review-option');
        option.dataset.correct = String(label === row.correctAnswer);
        option.dataset.selected = String(label === row.selected);
        option.append(node('strong', `${label}${markers.length ? ' · ' + markers.join(' · ') : ''}`));
        const content = row.optionTranslations[lang]?.[index] || row.options[index];
        if (content) option.append(document.createTextNode(` — ${content}`));
        addImages(option, row.optionImages[index], `Option ${label}`);
        choices.append(option);
    });
    card.append(choices);
    if (row.selected === null) card.append(node('p', 'You skipped this question.'));
    if (!row.correctAnswer) card.append(node('p', 'The answer key is unavailable for this question.'));
    if (row.explanation) {
        const explanation = node('div', '', 'review-explanation');
        explanation.append(node('strong', 'Explanation'), node('p', row.explanation, 'review-text'));
        card.append(explanation);
    }
    return card;
}

function showLogin() {
    byId('reviewStatus').textContent = 'Log in to view your exam review.';
    const login = node('a', 'Log in', 'review-login');
    login.href = `/login.html?redirect=${encodeURIComponent(location.pathname + location.search)}`;
    byId('reviewStatus').append(login);
}

async function loadReview() {
    const id = new URLSearchParams(location.search).get('id');
    if (!id) throw new Error('Open an exam review from My Results.');
    const token = localStorage.getItem('token');
    if (!token) return showLogin();
    const response = await fetch(`/api/results/${encodeURIComponent(id)}/review`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
    });
    if (response.status === 401) return showLogin();
    const data = await response.json();
    if (!response.ok || !data.success) throw new Error(data.message || 'Unable to load this review.');
    const { result } = data;
    const { counts, rows } = result.review;
    const available = Object.entries(languageLabels).filter(([lang]) => lang === 'en' ||
        rows.some(row => row.questionTranslations[lang] || row.optionTranslations[lang]));
    available.forEach(([lang, label]) => language.add(new Option(label, lang)));
    byId('reviewLanguageControl').hidden = available.length < 2;
    byId('reviewTitle').textContent = result.exam;
    byId('reviewScore').textContent = `Score: ${result.score}/${result.total} (${result.percentage}%)`;
    function render() {
        const visible = rows.filter(row => filter.value === 'all' || row.status === filter.value);
        byId('reviewSummary').textContent = `${counts.correct} correct · ${counts.wrong} wrong · ${counts.skipped} skipped · Showing ${visible.length} of ${rows.length}`;
        byId('reviewQuestions').replaceChildren(...(visible.length
            ? visible.map(renderQuestion)
            : [node('p', 'No questions match this filter.')]));
    }
    filter.addEventListener('change', render);
    language.addEventListener('change', render);
    render();
    byId('reviewStatus').hidden = true;
    byId('reviewContent').hidden = false;
}

loadReview().catch(error => {
    byId('reviewStatus').textContent = error.message;
});
