/**
 * Interactive Developer Terminal for D Nagasumukh's Portfolio
 * Emulates a real Linux/bash CLI with interactive commands and quick-click chips
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  const chipBtns = document.querySelectorAll('.chip-btn');

  if (!terminalBody || !terminalInput) return;

  const COMMANDS = {
    help: () => `
<span style="color:var(--neon-cyan)">AVAILABLE COMMANDS:</span>
  <span style="color:#f59e0b">about</span>         - Print engineering bio & college info
  <span style="color:#f59e0b">projects</span>      - List core ML & Full-Stack projects with live links
  <span style="color:#f59e0b">skills</span>        - Technical proficiencies & stack
  <span style="color:#f59e0b">awards</span>        - Hackathon wins & competitive achievements
  <span style="color:#f59e0b">experience</span>    - Internship details & R&D work
  <span style="color:#f59e0b">contact</span>       - Direct email, phone, and social handles
  <span style="color:#f59e0b">clear</span>         - Clear the terminal screen
`,

    about: () => `
{
  <span style="color:#38bdf8">"name"</span>: "D Nagasumukh",
  <span style="color:#38bdf8">"education"</span>: "B.Tech in Computer Science & Engineering (2023 - Present)",
  <span style="color:#38bdf8">"institution"</span>: "Reva University, Bangalore",
  <span style="color:#38bdf8">"cgpa"</span>: "8.06 / 10.0",
  <span style="color:#38bdf8">"interests"</span>: ["Full Stack Engineering", "Machine Learning", "Explainable AI", "App Development"],
  <span style="color:#38bdf8">"location"</span>: "Bangalore, India",
  <span style="color:#38bdf8">"status"</span>: "Actively seeking Software Engineering & ML internships"
}
`,

    projects: () => `
<span style="color:var(--neon-cyan)">LIVE DEPLOYED PROJECTS:</span>
1. <span style="color:#38bdf8; font-weight:600">Fraud Detection System (XAI)</span>
   - Explainable AI dashboard for transaction security
   - URL: <a href="https://etgt-frd-v2-xai.streamlit.app/" target="_blank" style="color:var(--neon-emerald)">https://etgt-frd-v2-xai.streamlit.app/</a>

2. <span style="color:#38bdf8; font-weight:600">ATS SACS Resume Evaluator</span>
   - AI-driven resume scoring and keyword gap feedback
   - URL: <a href="https://ats-sacs-resume.streamlit.app/" target="_blank" style="color:var(--neon-emerald)">https://ats-sacs-resume.streamlit.app/</a>

3. <span style="color:#38bdf8; font-weight:600">Research Lens AI</span>
   - Automated research paper summarizer and critic
   - URL: <a href="https://research-lens-ai.streamlit.app/" target="_blank" style="color:var(--neon-emerald)">https://research-lens-ai.streamlit.app/</a>

4. <span style="color:#38bdf8; font-weight:600">GitHub Repositories</span>
   - Open source projects, C systems code, algorithms
   - URL: <a href="https://github.com/nagasumukh01" target="_blank" style="color:var(--neon-emerald)">https://github.com/nagasumukh01</a>
`,

    skills: () => `
<span style="color:var(--neon-cyan)">TECHNICAL ARSENAL:</span>
- <span style="color:#f59e0b">Languages</span>: Python, Java, C Programming, SQL, JavaScript
- <span style="color:#f59e0b">AI & ML</span>: Machine Learning, Scikit-Learn, Explainable AI, Data Science, LLMs / GenAI
- <span style="color:#f59e0b">Frontend</span>: React, Streamlit, HTML5, CSS3, Tailwind CSS
- <span style="color:#f59e0b">Backend</span>: Node.js, Express.js, MongoDB, PostgreSQL, MySQL, REST APIs
- <span style="color:#f59e0b">Platforms</span>: Git, GitHub, VS Code, Cursor, LeetCode, HackerRank
`,

    awards: () => `
<span style="color:var(--neon-cyan)">HONORS & HACKATHONS:</span>
🏆 <span style="color:#eab308">WINNER</span> - UI/UX Design Challenge, IIT Jammu (Anhad'25, Team Error Fusion)
🥈 <span style="color:#eab308">2nd RUNNER-UP</span> - Iotopia Hackathon (Reva University, 350+ teams)
🌟 <span style="color:#eab308">TOP 14 FINALIST</span> - Pan-India NER Tech Hackathon 2.0 (Marriott Bangalore, 600+ teams)
`,

    experience: () => `
<span style="color:var(--neon-cyan)">INTERNSHIP EXPERIENCE:</span>
1. <span style="color:#38bdf8">R&D Intern</span> @ DevCreations & Solutions, Reva Nest (07/2025 - 01/2026)
   - Research on web engineering, performance testing, and cloud microservices.

2. <span style="color:#38bdf8">C Program Intern</span> @ PINNACLE (05/2025 - 06/2025)
   - Developed foundational to advanced C systems code and algorithmic modules.
`,

    contact: () => `
<span style="color:var(--neon-cyan)">CONTACT CHANNELS:</span>
📧 Email:     <a href="mailto:nagasumukh01@gmail.com" style="color:var(--neon-cyan)">nagasumukh01@gmail.com</a>
📱 Phone:     <a href="tel:9448794069" style="color:var(--neon-cyan)">+91 9448794069</a>
💼 LinkedIn:  <a href="https://linkedin.com/in/nagasumukh-d-05423934a" target="_blank" style="color:var(--neon-cyan)">linkedin.com/in/nagasumukh-d-05423934a</a>
🐙 GitHub:    <a href="https://github.com/nagasumukh01" target="_blank" style="color:var(--neon-cyan)">github.com/nagasumukh01</a>
⚡ LeetCode:  <a href="https://leetcode.com/nagasumukh01/" target="_blank" style="color:var(--neon-cyan)">leetcode.com/nagasumukh01</a>
`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();

    // Echo command line
    const outputContainer = document.getElementById('terminal-history');
    
    if (cmd === 'clear') {
      if (outputContainer) outputContainer.innerHTML = '';
      terminalInput.value = '';
      return;
    }

    const cmdLine = document.createElement('div');
    cmdLine.className = 'cmd-line';
    cmdLine.innerHTML = `<span class="cmd-prompt">nagasumukh@dev:~$</span> <span class="cmd-text">${escapeHtml(rawCmd)}</span>`;
    outputContainer.appendChild(cmdLine);

    const responseLine = document.createElement('div');
    responseLine.className = 'cmd-response';

    if (cmd === '') {
      // Do nothing
    } else if (COMMANDS[cmd]) {
      responseLine.innerHTML = COMMANDS[cmd]();
      outputContainer.appendChild(responseLine);
    } else if (cmd === 'cat about.json') {
      responseLine.innerHTML = COMMANDS['about']();
      outputContainer.appendChild(responseLine);
    } else if (cmd === 'ls projects' || cmd === 'list projects') {
      responseLine.innerHTML = COMMANDS['projects']();
      outputContainer.appendChild(responseLine);
    } else {
      responseLine.innerHTML = `<span style="color:#ef4444">Command not found: "${escapeHtml(cmd)}". Type <span style="color:var(--neon-cyan)">help</span> to see available commands.</span>`;
      outputContainer.appendChild(responseLine);
    }

    terminalInput.value = '';
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Handle enter key
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
    }
  });

  // Handle quick command chips
  chipBtns.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });
});
