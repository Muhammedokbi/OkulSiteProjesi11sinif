// ═══════════════════════════════════════
// GITHUB
// ═══════════════════════════════════════
let ghData = {};
async function loadGithub() {
    const card = document.getElementById('ghCard');
    try {
        const headers = window.APP_CONFIG?.GITHUB_TOKEN ? {
            'Authorization': `Bearer ${window.APP_CONFIG.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github+json'
        } : {
            'Accept': 'application/vnd.github+json'
        };

        const starredCount = async () => {
            let page = 1;
            let total = 0;

            while (true) {
                const response = await fetch(`https://api.github.com/users/${GH_USER}/starred?per_page=100&page=${page}`, { headers });
                if (!response.ok) break;

                const items = await response.json();
                if (!Array.isArray(items) || items.length === 0) break;

                total += items.length;
                if (items.length < 100) break;
                page += 1;
            }

            return total;
        };

        const [uR, rR, eR, starsTotal] = await Promise.all([
            fetch(`https://api.github.com/users/${GH_USER}`, { headers }),
            fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`, { headers }),
            fetch(`https://api.github.com/users/${GH_USER}/events/public?per_page=100`, { headers }),
            starredCount()
        ]);
        let user, repos = [], evts = [];
        const fallbackUser = {
            login: GH_USER,
            avatar_url: 'assets/ellie.png',
            bio: 'Bizim aşkımız bile open source.',
            public_repos: 18,
            followers: 7
        };

        if (uR.ok) user = await uR.json();
        else user = { ...fallbackUser };
        user = { ...fallbackUser, ...user };

        // Keep the live GitHub avatar when available; use the fallback image only if the API fails.
        user.avatar_url = user.avatar_url || fallbackUser.avatar_url;

        if (rR && rR.ok) repos = await rR.json();
        if (eR && eR.ok) evts = await eR.json();

        ghData = { user, repos, evts };

        const stars = Number(starsTotal || 0);
        const pushes = evts.filter(e => e.type === 'PushEvent');
        const commits = pushes.reduce((s, e) => s + (e.payload?.commits?.length || 0), 0);
        const userRepos = Number(user.public_repos ?? repos.length ?? 18);
        const liveFollowers = Number(user.followers ?? 7);

        const customLangs = [
            ['Python', 49.13],
            ['C++', 18.45],
            ['JavaScript', 16.18],
            ['ASP.NET', 6.33],
            ['CSS', 5.51],
            ['C#', 5.28],
            ['HTML', 2.60],
            ['C', 2.50],
            ['Makefile', 1.55],
            ['QML', 0.27],
            ['TypeScript', 0.16],
            ['Diğer (Other)', 0.14],
            ['CMake', 0.13],
            ['HLSL', 0.10],
            ['Roff', 0.04]
        ];

        const lbarHtml = customLangs.map(([l, p]) => `<div class="lseg" style="flex:${p};background:${lc(l)}" title="${l}"></div>`).join('');
        const llistHtml = customLangs.map(([l, p]) => `<div class="li"><div class="ld" style="background:${lc(l)}"></div><span>${l}</span> ${p}%</div>`).join('');

        const cgridHtml = `<div style="margin-top:18px; padding:10px; background:rgba(0,0,0,0.2); border-radius:8px; display:flex; justify-content:center; overflow-x:auto;">
          <img src="https://ghchart.rshah.org/F4621F/${GH_USER}" alt="${GH_USER}'s Github Chart" style="max-width:100%; min-width:600px; filter: brightness(0.9) contrast(1.2);" />
        </div>`;

        const skillsTable = `
  <div style="margin-top:24px; padding:20px; background:rgba(0,0,0,0.2); border:1px solid var(--bdr); border-radius:8px; display:flex; justify-content:center;">
    <table border="0" style="border-collapse:collapse; width:100%;">
      <tr>
        <td align="center" style="padding:10px;"><img src="https://skillicons.dev/icons?i=cpp,cs,py,linux,vscode,git,tensorflow" alt="Skills 1" style="max-width:100%; height:auto;" /></td>
        <td align="center" style="padding:10px;"><img src="assets/Fenerbahçe_SK.png" height="48" alt="Fenerbahçe" style="filter: drop-shadow(0 0 8px rgba(232,216,75,0.3));" /></td>
        <td align="center" style="padding:10px;"><img src="https://skillicons.dev/icons?i=pytorch,arduino,opencv,flutter,dart,ubuntu,arch" alt="Skills 2" style="max-width:100%; height:auto;" /></td>
      </tr>
    </table>
  </div>`;

        card.innerHTML = `<div class="gh-top"><div class="gh-user"><img class="gh-av" src="${user.avatar_url}" alt=""><div><div class="gh-un">${esc(user.login)}</div><div class="gh-bio">${esc(user.bio || 'Software Developer')}</div></div></div><div class="gh-stats"><div class="gh-stat"><div class="gh-sval">${userRepos}</div><div class="gh-slbl">Repo</div></div><div class="gh-stat"><div class="gh-sval">${stars}</div><div class="gh-slbl">Yıldız</div></div><div class="gh-stat"><div class="gh-sval">${liveFollowers}</div><div class="gh-slbl">Takipçi</div></div><div class="gh-stat"><div class="gh-sval">${commits}</div><div class="gh-slbl">Commit</div></div></div></div>${cgridHtml}<div class="lbar">${lbarHtml}</div><div class="llist">${llistHtml}</div>${skillsTable}`;
    } catch (e) { card.innerHTML = `<div class="errmsg">// GitHub Hatası: ${esc(e.message)}</div>`; }
}