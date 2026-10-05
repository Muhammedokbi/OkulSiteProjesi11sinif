// ═══════════════════════════════════════
// TERMINAL
// ═══════════════════════════════════════
let termHist = [], termHIdx = -1;
const ASCII = `  ██████╗ ██╗  ██╗██████╗ ██╗\n ██╔═══██╗██║ ██╔╝██╔══██╗██║\n ██║   ██║█████╔╝ ██████╔╝██║\n ██║   ██║██╔═██╗ ██╔══██╗██║\n ╚██████╔╝██║  ██╗██████╔╝██║\n  ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝`;

let chatMode = false;
let aiHistory = [];

function prompt() { 
    if (chatMode) return `<span class="t-ai" style="color:#8AE234">qwen2.5</span><span class="t-dim">></span> `;
    return `<span class="t-user">okbi</span><span class="t-dim">@</span><span class="t-host">ubuntu</span><span class="t-dim">:</span><span class="t-path">~</span><span class="t-dim">$</span> `; 
}
function addLine(html) {
    const tb = document.getElementById('termBody'); if (!tb) return;
    const inputRow = document.getElementById('termInputRow');
    const d = document.createElement('div'); d.className = 'term-line'; d.innerHTML = html;
    if (inputRow) tb.insertBefore(d, inputRow); else tb.appendChild(d);
    tb.scrollTop = tb.scrollHeight;
}
function addPrompt(cmd) { addLine(`${prompt()}<span class="t-cmd">${esc(cmd)}</span>`); }

async function runCmd(cmd) {
    const c = cmd.trim(); if (!c) return;
    termHist.unshift(cmd); termHIdx = -1; addPrompt(cmd);
    
    if (chatMode) {
        if (c.toLowerCase() === 'exit') {
            chatMode = false;
            aiHistory = [];
            addLine(`<span class="t-dim">Qwen2.5 sohbetinden çıkıldı. Normal terminale dönüldü.</span>`);
            updateInputPrompt();
        } else {
            handleAI(c);
        }
        return;
    }
    
    const cmdLower = c.toLowerCase();
    
    // Explicit commands
    if (cmdLower === 'help') {
        addLine(`<span class="t-sec">Qwen2.5 Asistan Sistemi:</span>
  <span class="t-dim">Bu terminal doğrudan bilgisayarda çalışan</span>
  <span class="t-val">Ollama (qwen2.5-coder:7b)</span> <span class="t-dim">modeline bağlıdır.</span>
  <span class="t-dim">Herhangi bir soru sorduğunuzda doğrudan yanıt verir.</span>
  
  <span class="t-sec">Komutlar:</span>
  <span class="t-key">whoami</span>    <span class="t-dim">— kim benim</span>
  <span class="t-key">github</span>    <span class="t-dim">— istatistikler</span>
  <span class="t-key">projects</span>  <span class="t-dim">— projeler</span>
  <span class="t-key">skills</span>    <span class="t-dim">— tech stack</span>
  <span class="t-key">contact</span>   <span class="t-dim">— iletişim</span>
  <span class="t-key">chat</span>      <span class="t-dim">— Qwen2.5 ile kesintisiz sohbet moduna geç</span>
  <span class="t-key">clear</span>     <span class="t-dim">— ekranı temizle</span>
  <span class="t-key">exit</span>      <span class="t-dim">— terminali kapat</span>`);
        return;
    }
    
    switch (cmdLower) {
        case 'whoami': addLine(`<span class="t-sec">About:</span>\n  <span class="t-key">name</span>    <span class="t-val">Muhammed Okbi</span>\n  <span class="t-key">alias</span>   <span class="t-val">okbi</span>\n  <span class="t-key">role</span>    <span class="t-val">Software Developer</span>\n  <span class="t-key">os</span>      <span class="t-val">Ubuntu 22.04 LTS</span>\n  <span class="t-key">editor</span>  <span class="t-val">VS Code</span>`); break;
        case 'github': {
            if (ghData.user) {
                const u = ghData.user; const s = ghData.repos?.reduce((s, r) => s + (r.stargazers_count || 0), 0) || 0;
                addLine(`<span class="t-sec">GitHub:</span>\n  <span class="t-key">user</span>     <span class="t-val">${esc(u.login)}</span>\n  <span class="t-key">repos</span>    <span class="t-val">${u.public_repos}</span>\n  <span class="t-key">stars</span>    <span class="t-lem">${s}</span>\n  <span class="t-key">url</span>      <span class="t-link" onclick="window.open('https://github.com/${GH_USER}','_blank')">github.com/${GH_USER}</span>`);
            } else addLine(`<span class="t-err">// Veri yok</span>`); break;
        }
        case 'projects': {
            if (ghData.repos?.length) {
                const top = [...ghData.repos].filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5);
                let out = `<span class="t-sec">Projeler:</span>\n`;
                top.forEach((r, i) => out += `  <span class="t-dim">${i + 1}.</span> <span class="t-val t-link" onclick="window.open('${r.html_url}','_blank')">${esc(r.name)}</span> <span class="t-dim">[${esc(r.language || '—')}]</span>\n`);
                addLine(out);
            } else addLine(`<span class="t-err">// Veri yok</span>`); break;
        }
        case 'skills': addLine(`<span class="t-sec">Tech Stack:</span>\n  <span class="t-val">JS</span>  <span class="t-val">TS</span>  <span class="t-val">Python</span>  <span class="t-val">C#</span>  <span class="t-val">C++</span>  <span class="t-val">React</span>  <span class="t-val">Git</span>  <span class="t-val">Docker</span>`); break;
        case 'contact': addLine(`<span class="t-sec">İletişim:</span>\n  <span class="t-key">github</span>     <span class="t-link" onclick="window.open('https://github.com/${GH_USER}','_blank')">github.com/${GH_USER}</span>\n  <span class="t-key">instagram</span>  <span class="t-link" onclick="window.open('https://instagram.com/muhammedokbii','_blank')">@muhammedokbii</span>`); break;
        case 'chat': 
            chatMode = true; 
            addLine(`<span class="t-sec">Qwen2.5 sohbet modu aktif!</span>\n<span class="t-dim">Çıkmak için 'exit' yazın.</span>`); 
            updateInputPrompt(); 
            return;
        case 'clear': document.getElementById('termBody').innerHTML = ''; initTerm(); return;
        case 'exit': closeTerm(); return;
        default: 
            // Any unknown command automatically goes to Qwen2.5!
            if (cmdLower.startsWith('ai ')) {
                handleAI(c.substring(3).trim());
            } else if (cmdLower === 'ai') {
                handleAI('');
            } else {
                handleAI(c);
            }
            break;
    }
}

function updateInputPrompt() {
    const row = document.getElementById('termInputRow');
    if (row) {
        const inp = document.getElementById('termInput');
        const val = inp ? inp.value : '';
        row.innerHTML = `${prompt()}<input class="term-input" id="termInput" autocomplete="off" spellcheck="false">`;
        const newInp = document.getElementById('termInput');
        if (newInp) {
            newInp.value = val;
            newInp.focus();
            newInp.addEventListener('keydown', e => {
                if (e.key === 'Enter') { const v = newInp.value; newInp.value = ''; runCmd(v); }
                else if (e.key === 'ArrowUp') { e.preventDefault(); if (termHIdx < termHist.length - 1) { termHIdx++; newInp.value = termHist[termHIdx]; } }
                else if (e.key === 'ArrowDown') { e.preventDefault(); if (termHIdx > 0) { termHIdx--; newInp.value = termHist[termHIdx]; } else { termHIdx = -1; newInp.value = ''; } }
            });
        }
    }
}

function initTerm() {
    const tb = document.getElementById('termBody'); if (!tb) return;
    tb.innerHTML = `<pre class="ascii">${ASCII}</pre><span class="term-line"><span class="t-val t-bold">okbi@ubuntu</span> <span class="t-dim">— Dashboard Terminal</span></span><span class="term-line t-dim">'help' yazarak başla</span><br><div class="term-input-row" id="termInputRow">${prompt()}<input class="term-input" id="termInput" autocomplete="off" spellcheck="false"></div>`;
    setTimeout(() => document.getElementById('termInput')?.focus(), 50);
    const inp = document.getElementById('termInput');
    if (inp) {
        inp.addEventListener('keydown', e => {
            if (e.key === 'Enter') { const v = inp.value; inp.value = ''; runCmd(v); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); if (termHIdx < termHist.length - 1) { termHIdx++; inp.value = termHist[termHIdx]; } }
            else if (e.key === 'ArrowDown') { e.preventDefault(); if (termHIdx > 0) { termHIdx--; inp.value = termHist[termHIdx]; } else { termHIdx = -1; inp.value = ''; } }
        });
    }
}
function openTerm() { document.getElementById('termOverlay').classList.add('open'); initTerm(); }
function closeTerm() { document.getElementById('termOverlay').classList.remove('open'); }

async function handleAI(q) {
    if (!q) { addLine(`<span class="t-ai">Qwen2.5:</span> <span class="t-ai-msg">Selam! Benimle 'ai [soru]' yazarak veya 'chat' komutuyla konuşabilirsin.</span>`); return; }

    const loadingId = 'ai-load-' + Date.now();
    const loading = document.createElement('div');
    loading.className = 'term-line';
    loading.id = loadingId;
    loading.innerHTML = `<span class="t-ai">Qwen2.5:</span> <span class="t-ai-msg">düşünüyor</span><span class="ai-dots"></span>`;
    const tb = document.getElementById('termBody');
    const inputRow = document.getElementById('termInputRow');
    tb.insertBefore(loading, inputRow);
    tb.scrollTop = tb.scrollHeight;

    if (aiHistory.length === 0) {
        aiHistory.push({ role: 'system', content: "Sen okbi'nin portfolyosundaki akıllı asistansın. Adın Qwen2.5. Lütfen kısa ve öz cevap ver." });
    }
    aiHistory.push({ role: 'user', content: q });

    try {
        const response = await fetch('http://127.0.0.1:11434/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'qwen2.5-coder:7b',
                messages: aiHistory,
                stream: false
            })
        });

        if (!response.ok) throw new Error('API Hatası');
        const data = await response.json();
        
        aiHistory.push({ role: 'assistant', content: data.message.content });
        
        document.getElementById(loadingId)?.remove();
        addLine(`<span class="t-ai">Qwen2.5:</span> <span class="t-ai-msg">${esc(data.message.content)}</span>`);
        
    } catch (e) {
        aiHistory.pop(); // Remove the last user message if it failed
        document.getElementById(loadingId)?.remove();
        addLine(`<span class="t-err">// Ollama bağlantı hatası: Qwen2.5 yanıt veremiyor. Ollama'nın çalıştığından ve CORS izni olduğundan emin olun (OLLAMA_ORIGINS="*" ollama serve).</span>`);
    }
}

// ═══════════════════════════════════════
// CURSOR GLOW
// ═══════════════════════════════════════
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
    let glowActive = false;
    document.addEventListener('mousemove', e => {
        if (!glowActive) { cursorGlow.classList.add('active'); glowActive = true; }
        requestAnimationFrame(() => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    });
    document.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('active');
        glowActive = false;
    });
}
// Attach to window so HTML inline handlers still work for now
window.openTerm = openTerm;
window.closeTerm = closeTerm;

// evaluates terminal logic and attaches to window