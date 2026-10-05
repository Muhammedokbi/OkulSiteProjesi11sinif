// ═══════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════
const SCOL = { online: '#57F287', idle: '#FEE75C', dnd: '#ED4245', offline: '#747F8D' };
const STR = { online: 'Çevrimiçi', idle: 'Boşta', dnd: 'Rahatsız Etme', offline: 'Çevrimdışı' };
const LCOL = { 
    JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', HTML: '#e34c26', 
    CSS: '#563d7c', Java: '#b07219', 'C++': '#f34b7d', C: '#555555', Go: '#00ADD8', 
    Rust: '#dea584', PHP: '#4F5D95', Ruby: '#701516', Swift: '#FA7343', Kotlin: '#A97BFF', 
    Shell: '#89e051', Vue: '#41b883', 'C#': '#178600',
    'ASP.NET': '#9400ff', 'Makefile': '#427819', 'QML': '#44a51c', 'CMake': '#da3434',
    'HLSL': '#aace60', 'Roff': '#ecdebe', 'ShaderLab': '#222c37', 'Cython': '#fedf5b',
    'Fortran': '#4d41b1', 'Diğer (Other)': '#8b949e'
};
const GH_USER = 'muhammedokbi';
window.APP_CONFIG = window.APP_CONFIG || {
    GITHUB_TOKEN: '',
    LINKEDIN_TOKEN: '',
    LINKEDIN_PROFILE_URL: 'https://api.linkedin.com/v2/me',
    LINKEDIN_CONNECTIONS_URL: 'https://api.linkedin.com/v2/networkSizes'
};

function getAuthHeaders(token) {
    if (!token) return {};
    return {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
}

function lc(l) { return LCOL[l] || '#F4621F'; }
function esc(s = '') { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function timeSince(str) { const s = (Date.now() - new Date(str)) / 1000; if (s < 3600) return ~~(s / 60) + 'dk önce'; if (s < 86400) return ~~(s / 3600) + 's önce'; if (s < 2592000) return ~~(s / 86400) + 'g önce'; if (s < 31536000) return ~~(s / 2592000) + 'ay önce'; return ~~(s / 31536000) + 'y önce'; }