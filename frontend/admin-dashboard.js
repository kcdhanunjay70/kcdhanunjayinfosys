const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
const socket = window.io && token ? io({ auth: { token } }) : { on() {} };

if (!token) {
    alert("Please login as admin first");
    window.location.href = "login.html";
}

function authHeaders(extra = {}) {
    return { ...extra, Authorization: "Bearer " + token };
}

async function api(path, options = {}) {
    const res = await fetch(path, {
        ...options,
        headers: authHeaders(options.headers || {})
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === false) throw new Error(data.message || "Request failed");
    return data;
}

function getStoredUser() {
    try {
        return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
        localStorage.removeItem("user");
        return null;
    }
}

async function requireAdmin() {
    const data = await api("/api/auth/verify");
    const user = data.user || getStoredUser();

    if (String(user?.role || "").toLowerCase() !== "admin") {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("Please login as admin first");
        window.location.href = "login.html";
        return false;
    }

    localStorage.setItem("user", JSON.stringify(user));
    return true;
}

async function loadSection(loader, label) {
    try {
        await loader();
    } catch (err) {
        console.error(`${label} failed:`, err);
        alert(`${label}: ${err.message}`);
    }
}

async function createExam() {
    try {
        await api("/api/admin/create-exam", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: document.getElementById("title").value,
                subject: document.getElementById("subject").value,
                duration: document.getElementById("duration").value,
                total_marks: document.getElementById("total_marks").value || 0,
                access_type: document.getElementById("newExamAccess").value
            })
        });
        alert("Exam created");
        loadExams();
    } catch (err) {
        alert(err.message);
    }
}

async function addQuestion() {
    try {
        await api("/api/admin/add-questions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                exam_id: document.getElementById("exam_id").value,
                question: document.getElementById("question").value,
                option_a: document.getElementById("a").value,
                option_b: document.getElementById("b").value,
                option_c: document.getElementById("c").value,
                option_d: document.getElementById("d").value,
                correct_answer: document.getElementById("answer").value
            })
        });
        alert("Question added");
    } catch (err) {
        alert(err.message);
    }
}

async function uploadQuestions() {
    const examId = document.getElementById("uploadExam").value;
    const file = document.getElementById("jsonFile").files[0];

    if (!examId || !file) {
        alert("Select exam and JSON file");
        return;
    }

    const formData = new FormData();
    formData.append("exam_id", examId);
    formData.append("file", file);

    try {
        const data = await api("/api/admin/upload-questions", {
            method: "POST",
            body: formData
        });
        alert(data.message);
        loadExams();
    } catch (err) {
        alert(err.message);
    }
}

async function uploadTypedQuestions() {
    const examId = document.getElementById("bulkExam").value;
    const bulkText = document.getElementById("bulkQuestions").value;

    if (!examId || !bulkText.trim()) {
        alert("Select exam and type questions first");
        return;
    }

    try {
        const data = await api("/api/admin/bulk-questions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                exam_id: examId,
                bulk_text: bulkText
            })
        });
        alert(data.message);
        document.getElementById("bulkQuestions").value = "";
        loadExams();
    } catch (err) {
        alert(err.message);
    }
}

function addAuthToTemplate(event) {
    event.preventDefault();
    fetch("/api/admin/questions-template", {
        headers: authHeaders()
    })
        .then((res) => res.blob())
        .then((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "question-upload-template.json";
            link.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        })
        .catch(() => alert("JSON template download failed"));
    return false;
}

async function loadExams() {
    const data = await api("/api/admin/exams");
    document.getElementById("examCount").innerText = data.exams.length;

    const options = data.exams
        .map((e) => `<option value="${escapeAttribute(e.id)}">${escapeHtml(e.id)} - ${escapeHtml(e.title)}</option>`)
        .join("");

    document.getElementById("exam_id").innerHTML = options;
    document.getElementById("uploadExam").innerHTML = options;
    document.getElementById("bulkExam").innerHTML = options;

    document.getElementById("examList").innerHTML = data.exams.map((e) => `
        <div class="row">
            <strong>${escapeHtml(e.title)}</strong>
            <div class="muted">ID: ${escapeHtml(e.id)} | Type: ${escapeHtml(e.type || "-")} | Subject: ${escapeHtml(e.subject || "-")} | Duration: ${escapeHtml(e.duration)} mins | Questions: ${escapeHtml(e.question_count || 0)}</div>
            <div class="muted">Access: <strong>${e.access_type === 'free' ? 'FREE' : 'PAID'}</strong> | Status: <strong>${e.is_archived ? 'ARCHIVED' : 'ACTIVE'}</strong></div>
            <div class="inline-form" style="margin:10px 0;">
                <input id="exam-title-${safeId(e.id)}" value="${escapeAttribute(e.title || '')}" placeholder="Exam Title" aria-label="Exam title">
                <input id="exam-subject-${safeId(e.id)}" value="${escapeAttribute(e.subject || '')}" placeholder="Subject" aria-label="Exam subject">
                <button class="mini-btn" onclick="saveExamDetails(decodeURIComponent('${safeId(e.id)}'))">Save Changes</button>
                <button class="${e.is_archived ? 'mini-btn' : 'mini-danger'}" onclick="toggleExamArchive(decodeURIComponent('${safeId(e.id)}'),${!e.is_archived})">${e.is_archived ? 'Restore Exam' : 'Archive Exam'}</button>
            </div>
            <div class="row-actions">
                <select aria-label="Access type for ${escapeAttribute(e.title)}" id="access-${safeId(e.id)}" style="max-width:220px"><option value="paid" ${e.access_type !== 'free' ? 'selected' : ''}>PAID</option><option value="free" ${e.access_type === 'free' ? 'selected' : ''}>FREE</option></select>
                <button class="mini-btn" onclick="saveExamAccess(decodeURIComponent('${safeId(e.id)}'))">Save Access</button>
                <a class="mini-btn" href="/exam.html?access=${e.access_type === 'free' ? 'free' : 'paid'}&exam_id=${encodeURIComponent(e.id)}&type=${encodeURIComponent(e.type || '')}" target="_blank">Open Exam</a>
            </div>
        </div>
    `).join("");
}

async function saveExamDetails(examId) {
    const title = document.getElementById(`exam-title-${safeId(examId)}`).value.trim();
    const subject = document.getElementById(`exam-subject-${safeId(examId)}`).value.trim();

    if (!title) {
        alert('Exam title is required');
        return;
    }

    if (!confirm('Save exam title and subject corrections?')) return;

    try {
        await api(`/api/admin/exams/${encodeURIComponent(examId)}/edit`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, subject })
        });
        await loadExams();
        alert('Exam details updated successfully');
    } catch (err) {
        alert(err.message);
    }
}

async function toggleExamArchive(examId, isArchived) {
    const action = isArchived ? 'ARCHIVE' : 'RESTORE';

    if (!confirm(`${action} this exam? Existing results and payments will be preserved.`)) return;

    try {
        await api(`/api/admin/exams/${encodeURIComponent(examId)}/archive`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_archived: isArchived })
        });
        await loadExams();
        alert(`Exam ${isArchived ? 'archived' : 'restored'} successfully`);
    } catch (err) {
        alert(err.message);
    }
}
async function saveExamAccess(examId) {
    const access_type = document.getElementById(`access-${safeId(examId)}`).value;
    if (!confirm(`Set this exam to ${access_type.toUpperCase()}?`)) return;
    try {
        await api(`/api/admin/exams/${encodeURIComponent(examId)}/access`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ access_type })
        });
        await loadExams();
        alert(`Exam access updated to ${access_type.toUpperCase()}`);
    } catch (err) { alert(err.message); }
}

async function loadDatabaseSummary() {
    const data = await api("/api/admin/database-summary");
    const message = document.getElementById("databaseStatusMessage");
    const list = document.getElementById("databaseSummary");
    const collections = data.collections || [];

    if (message) {
        message.textContent = `Connected database: ${data.databaseName || "MongoDB"}. Exam collection counts are shown below.`;
    }
    if (!list) return;

    list.classList.remove("list");
    list.innerHTML = collections.length ? `
        <div class="table-wrap">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Collection</th>
                        <th>Records</th>
                        <th>What It Shows</th>
                    </tr>
                </thead>
                <tbody>
                    ${collections.map((item) => `
                        <tr>
                            <td><strong>${escapeHtml(item.label || item.key || "-")}</strong></td>
                            <td>${Number(item.count || 0)}</td>
                            <td class="muted">${escapeHtml(item.note || "-")}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    ` : `<div class="muted">No database summary available.</div>`;
}

function selectedStudentIds() {
    return Array.from(
        document.querySelectorAll(".bulk-student-checkbox:checked")
    ).map((checkbox) => checkbox.value);
}

function updateSelectedStudentCount() {
    const count = selectedStudentIds().length;
    document.getElementById("selectedStudentCount").textContent =
        `${count} student${count === 1 ? "" : "s"} selected`;
}

function selectAllStudents() {
    const checkboxes = Array.from(document.querySelectorAll(".bulk-student-checkbox"));
    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = index < 100;
    });
    updateSelectedStudentCount();
    if (checkboxes.length > 100) {
        alert("Only the first 100 students were selected. Maximum 100 per operation.");
    }
}

function clearStudentSelection() {
    document.querySelectorAll(".bulk-student-checkbox").forEach((checkbox) => {
        checkbox.checked = false;
    });
    updateSelectedStudentCount();
}

let studentBulkBusy = false;

async function bulkUpdateStudents(isActive) {
    if (studentBulkBusy) return;
    const studentIds = selectedStudentIds();

    if (!studentIds.length) {
        alert("Select at least one student");
        return;
    }

    if (studentIds.length > 100) {
        alert("Select a maximum of 100 students per operation");
        return;
    }

    const action = isActive ? "enable" : "disable";

    if (!confirm(`Are you sure you want to ${action} ${studentIds.length} selected student(s)?`)) {
        return;
    }

    studentBulkBusy = true;
    document.querySelectorAll("#bulkStudentControls button").forEach(button => {
        button.disabled = true;
    });

    try {
        const result = await api("/api/admin/students/bulk-status", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                student_ids: studentIds,
                is_active: isActive
            })
        });

        await loadStudents();

        alert(`${result.modified} student account(s) updated successfully`);
    } catch (err) {
        alert(err.message);
    } finally {
        studentBulkBusy = false;
        document.querySelectorAll("#bulkStudentControls button").forEach(button => {
            button.disabled = false;
        });
    }
}
async function loadStudents() {
    const data = await api("/api/admin/students");
    document.getElementById("studentCount").innerText = data.total ?? data.students.length;
    document.getElementById("students").innerHTML = data.students.map((s) => `
        <div class="row">
            <div class="row-top">
                <label><input type="checkbox" class="bulk-student-checkbox" value="${escapeAttribute(s.id)}" onchange="updateSelectedStudentCount()"> Select</label>
                <strong>${escapeHtml(s.name)}</strong>
                <span class="muted">${s.is_active === false ? "Disabled" : "Active"} | ${s.is_paid ? "Paid" : "Not paid"}</span>
            </div>
            <div class="muted">Login User ID: ${escapeHtml(s.username || "Legacy account (email/mobile login)")} | Email: ${escapeHtml(s.email || "-")} | Mobile: ${escapeHtml(s.phone || "-")}</div>
            <div class="muted">User ID: ${escapeHtml(s.id)} | Registered: ${escapeHtml(formatDate(s.created_at))}</div>
            <div class="muted">Password: ${escapeHtml(s.password_status || "Set securely")} (hidden for security)</div>
            <div class="muted">Paid Exams: ${(s.paid_exams || []).map((exam) => escapeHtml(exam.exam_title || exam.exam_type)).join(", ") || "None"}</div>
            <div class="inline-form" style="margin:10px 0 0;">
                <input id="name-${safeId(s.id)}" value="${escapeAttribute(s.name || "")}" placeholder="Name">
                <input id="email-${safeId(s.id)}" value="${escapeAttribute(s.email || "")}" placeholder="Email">
                <input id="phone-${safeId(s.id)}" value="${escapeAttribute(s.phone || "")}" placeholder="Mobile">
                <input id="password-${safeId(s.id)}" type="password" placeholder="New password">
            </div>
            <div class="row-actions">
                <button class="mini-btn" onclick="saveStudent(decodeURIComponent('${safeId(s.id)}'))">Save</button>
                <button class="mini-btn" onclick="resetStudentPassword(decodeURIComponent('${safeId(s.id)}'))">Reset Password</button>
                <button class="mini-btn" onclick="toggleStudent(decodeURIComponent('${safeId(s.id)}'), ${s.is_active === false ? "true" : "false"})">${s.is_active === false ? "Enable" : "Disable"}</button>
                <button class="mini-danger" onclick="deleteStudent(decodeURIComponent('${safeId(s.id)}'))">Delete</button>
            </div>
        </div>
    `).join("");
    updateSelectedStudentCount();
}

async function createStudent() {
    const name = document.getElementById("studentName").value.trim();
    const email = document.getElementById("studentEmail").value.trim();
    const phone = document.getElementById("studentPhone").value.trim();
    const password = document.getElementById("studentPassword").value.trim();

    try {
        await api("/api/admin/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, password })
        });
        document.getElementById("studentName").value = "";
        document.getElementById("studentEmail").value = "";
        document.getElementById("studentPhone").value = "";
        document.getElementById("studentPassword").value = "";
        await loadStudents();
        alert("Student account created");
    } catch (err) {
        alert(err.message);
    }
}

async function saveStudent(studentId) {
    try {
        await api(`/api/admin/students/${studentId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: document.getElementById(`name-${safeId(studentId)}`).value,
                email: document.getElementById(`email-${safeId(studentId)}`).value,
                phone: document.getElementById(`phone-${safeId(studentId)}`).value
            })
        });
        await loadStudents();
        alert("Student account updated");
    } catch (err) {
        alert(err.message);
    }
}

async function resetStudentPassword(studentId) {
    const password = document.getElementById(`password-${safeId(studentId)}`).value.trim();
    if (!password) {
        alert("Enter new password first");
        return;
    }

    try {
        await api(`/api/admin/students/${studentId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password })
        });
        await loadStudents();
        alert("Password reset successfully");
    } catch (err) {
        alert(err.message);
    }
}

async function toggleStudent(studentId, isActive) {
    if (!confirm(isActive ? "Enable this student account?" : "Disable this student account?")) return;

    try {
        await api(`/api/admin/students/${studentId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ is_active: isActive })
        });
        await loadStudents();
    } catch (err) {
        alert(err.message);
    }
}

async function deleteStudent(studentId) {
    if (!confirm("Delete this student account and related dashboard data?")) return;

    try {
        await api(`/api/admin/students/${studentId}`, { method: "DELETE" });
        await loadStudents();
        await loadLoginLogs();
        await loadAlerts();
        await loadCompletions();
    } catch (err) {
        alert(err.message);
    }
}

async function loadSampleLeads() {
    const data = await api("/api/admin/sample-leads");
    document.getElementById("sampleLeadCount").innerText = data.leads.length;
    document.getElementById("sampleLeads").innerHTML = data.leads.map((lead) => `
        <div class="row">
            <div class="row-top">
                <strong>${escapeHtml(lead.name || "Exam Student")}</strong>
                <button class="mini-danger" onclick="deleteSampleLead(decodeURIComponent('${safeId(lead.id)}'))">Delete</button>
            </div>
            <div class="muted">Email: ${escapeHtml(lead.email || "-")} | Mobile: ${escapeHtml(lead.phone || "-")}</div>
            <div class="muted">Exam: ${escapeHtml(lead.exam_type || "-")} | Year: ${escapeHtml(lead.sample_year || "All")} | Mock: ${escapeHtml(lead.mock || "-")} | ${escapeHtml(formatDate(lead.created_at))}</div>
            <div class="muted">Access: ${lead.access_mode === "direct_2025" ? "2025 mock direct" : "Admin approval required"}${lead.exam_url ? ` | URL: ${escapeHtml(lead.exam_url)}` : ""}</div>
        </div>
    `).join("") || `<div class="muted">No exam student leads yet</div>`;
}

async function deleteSampleLead(id) {
    if (!confirm("Delete this exam student lead?")) return;
    await api(`/api/admin/sample-leads/${id}`, { method: "DELETE" });
    await loadSampleLeads();
}

async function clearSampleLeads() {
    if (!confirm("Delete all exam student leads?")) return;
    await api("/api/admin/sample-leads", { method: "DELETE" });
    await loadSampleLeads();
}

async function loadLoginLogs() {
    const data = await api("/api/admin/login-logs");
    document.getElementById("loginLogs").innerHTML = data.logs.map((log) => `
        <div class="row">
            <div class="row-top">
                <strong>${escapeHtml(log.name || "Unknown user")}</strong>
                <button class="mini-danger" onclick="deleteLoginLog(decodeURIComponent('${safeId(log.id)}'))">Delete</button>
            </div>
            <div class="muted">${escapeHtml(log.email || "-")} | IP: ${escapeHtml(log.ip_address || "-")} | ${escapeHtml(formatDate(log.login_time))}</div>
        </div>
    `).join("") || `<div class="muted">No login logs yet</div>`;
}

async function loadAlerts() {
    const data = await api("/api/admin/cheating-alerts");
    document.getElementById("alertCount").innerText = data.alerts.length;
    document.getElementById("alerts").innerHTML = data.alerts.map(renderAlert).join("") || `<div class="muted">No alerts yet</div>`;
}

async function loadCompletions() {
    const data = await api("/api/admin/exam-completions");
    document.getElementById("examCompletions").innerHTML = data.completions.map((item) => {
        const d = item.details || {};
        return `
            <div class="row">
                <div class="row-top">
                    <strong>${escapeHtml(d.exam_title || item.exam_title || "Exam")}</strong>
                    <button class="mini-danger" onclick="deleteCompletion(decodeURIComponent('${safeId(item.id)}'))">Delete</button>
                </div>
                <div class="muted">User: ${escapeHtml(item.name || item.email || "Guest")} | Email: ${escapeHtml(item.email || "-")} | Mobile: ${escapeHtml(item.phone || d.student?.phone || "-")}</div>
                <div class="muted">Score: ${escapeHtml(d.score ?? "-")} / ${escapeHtml(d.total ?? "-")} | Percentage: ${escapeHtml(d.percentage ?? "-")}% | Rank: ${escapeHtml(d.rank ?? "-")} of ${escapeHtml(d.participants ?? "-")} | Risk: ${escapeHtml(d.risk ?? 0)}/100 | Answered: ${escapeHtml(d.answered ?? 0)} | ${escapeHtml(formatDate(item.created_at))}</div>
                <div class="muted">Risk Types: No Face ${escapeHtml(d.riskTypes?.noFace || 0)}, Multiple Faces ${escapeHtml(d.riskTypes?.multiFace || 0)}, Tab ${escapeHtml(d.riskTypes?.tab || 0)}, Action ${escapeHtml(d.riskTypes?.action || 0)}</div>
                <div class="muted">Response Mail: ${formatMailStatus(d.responseSheetMail)}</div>
                ${d.whatsappAdminUrl ? `<div class="muted"><a href="${escapeAttribute(safeExternalUrl(d.whatsappAdminUrl))}" target="_blank" rel="noopener">Open Admin WhatsApp Result</a></div>` : ""}
            </div>
        `;
    }).join("") || `<div class="muted">No completed exams yet</div>`;
}

function renderAlert(alert) {
    const details = alert.details || {};
    const activities = Array.isArray(details.proctorActivities)
        ? details.proctorActivities
        : details.activity
            ? [details.activity]
            : [];
    const activityRows = activities.length ? `
        <div class="muted">Activities:</div>
        ${activities.map((activity) => `
            <div class="muted">- ${escapeHtml(activity.label || activity.type || "Activity")} | Marks +${escapeHtml(activity.marks ?? details.risk ?? 0)} | Total ${escapeHtml(activity.total ?? details.total ?? 0)}/100</div>
        `).join("")}
    ` : "";
    return `
        <div class="row">
            <div class="row-top">
                <strong>${escapeHtml(details.message || alert.event_type || "Alert")}</strong>
                ${alert.id ? `<button class="mini-danger" onclick="deleteAlert(decodeURIComponent('${safeId(alert.id)}'))">Delete</button>` : ""}
            </div>
            <div class="muted">Exam: ${escapeHtml(details.exam_title || alert.exam_title || "-")} | User: ${escapeHtml(alert.name || alert.email || details.student?.name || "Guest")} | Risk +${escapeHtml(details.risk || 0)}, Total ${escapeHtml(details.total || details.risk || 0)}/100 | ${escapeHtml(formatDate(alert.created_at))}</div>
            ${activityRows}
        </div>
    `;
}

async function deleteLoginLog(id) {
    if (!confirm("Delete this login log?")) return;
    await api(`/api/admin/login-logs/${id}`, { method: "DELETE" });
    loadLoginLogs();
}

async function clearLoginLogs() {
    if (!confirm("Delete all login logs?")) return;
    await api("/api/admin/login-logs", { method: "DELETE" });
    loadLoginLogs();
}

async function deleteAlert(id) {
    if (!confirm("Delete this alert/risk log?")) return;
    await api(`/api/admin/cheating-alerts/${id}`, { method: "DELETE" });
    await loadAlerts();
}

async function clearAlerts() {
    if (!confirm("Delete all cheating alerts and risk logs?")) return;
    await api("/api/admin/cheating-alerts", { method: "DELETE" });
    await loadAlerts();
}

async function deleteCompletion(id) {
    if (!confirm("Delete this exam completion and related risk data?")) return;
    await api(`/api/admin/exam-completions/${id}`, { method: "DELETE" });
    await loadCompletions();
    await loadAlerts();
}

async function clearCompletions() {
    if (!confirm("Delete all completed exam data and risk logs?")) return;
    await api("/api/admin/exam-completions", { method: "DELETE" });
    await loadCompletions();
    await loadAlerts();
}

async function clearDashboardData() {
    if (!confirm("Delete all dashboard logs, alerts, risk data and exam completion records?")) return;
    await api("/api/admin/dashboard-data", { method: "DELETE" });
    await loadLoginLogs();
    await loadAlerts();
    await loadCompletions();
}

async function sendTestResponseMail() {
    try {
        const data = await api("/api/admin/test-response-mail", { method: "POST" });
        alert(`Test mail sent to: ${(data.mailTo || []).join(", ") || "admin email"}`);
    } catch (err) {
        alert(`Test mail failed: ${err.message}`);
    }
}

socket.on("cheating-alert", (data) => {
    const container = document.getElementById("alerts");
    container.insertAdjacentHTML("afterbegin", renderAlert({
        event_type: data.type,
        details: data,
        created_at: new Date().toISOString()
    }));
    document.getElementById("alertCount").innerText = Number(document.getElementById("alertCount").innerText || 0) + 1;
});

function logout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

function formatDate(value) {
    if (!value) return "-";
    return new Date(value).toLocaleString();
}

function formatMailStatus(mail = {}) {
    if (mail.sent) {
        return `Sent to ${(mail.to || []).map(escapeHtml).join(", ") || "admin"}`;
    }

    return `Not sent${mail.error ? ` - ${escapeHtml(mail.error)}` : ""}`;
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

// Encode untrusted identifiers before embedding them in inline handlers and DOM IDs.
function safeId(value) {
    return encodeURIComponent(String(value ?? "")).replaceAll("'", "%27");
}

// Reject javascript:, data:, and non-HTTPS links in API-provided URLs.
function safeExternalUrl(value) {
    try {
        const url = new URL(String(value));
        return url.protocol === "https:" ? url.href : "about:blank";
    } catch {
        return "about:blank";
    }
}

function escapeAttribute(value) {
    return escapeHtml(value).replaceAll("`", "&#096;");
}

async function init() {
    if (!(await requireAdmin())) return;await loadSection(loadExams, "Exams");
    await loadSection(loadDatabaseSummary, "Database summary");
    await loadSection(loadStudents, "Students");
    await loadSection(loadSampleLeads, "Exam student leads");
    await loadSection(loadEmailStatus, "Email setup");
    await loadSection(loadLoginLogs, "Login logs");
    await loadSection(loadAlerts, "Cheating alerts");
    await loadSection(loadCompletions, "Exam completions");
}

init();



