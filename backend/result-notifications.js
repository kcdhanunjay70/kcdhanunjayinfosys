export function buildResultEmail(result, rank, participants) {
  const details = [
    `Student: ${result.name}`,
    `Student ID: ${result.studentId}`,
    `Exam: ${result.exam}`,
    `Score: ${result.score}/${result.total}`,
    `Percentage: ${result.percentage}%`,
    `Rank: ${rank} of ${participants}`,
    `Proctoring Risk: ${result.risk}/100`
  ].join('\n');

  return {
    studentSubject: `KCDHANUNJAY INFOSYS - Exam Result: ${result.exam}`,
    studentText:
      `Dear ${result.name},\n\n` +
      `Your exam result has been saved successfully.\n\n` +
      details +
      `\n\nRegards,\nKCDHANUNJAY INFOSYS`,

    adminSubject: `New Exam Result - ${result.name} - ${result.exam}`,
    adminText:
      `A student has completed an exam.\n\n` +
      details +
      `\nStudent Email: ${result.email || 'Not available'}` +
      `\nStudent Phone: ${result.phone || 'Not available'}` +
      `\n\nKCDHANUNJAY INFOSYS`
  };
}
