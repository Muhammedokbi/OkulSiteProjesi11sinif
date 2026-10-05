// ═══════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
}

// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════
async function loadLinkedInProfile() {
    const target = document.querySelector('.dc-stxt span');
    if (!target) return;

    const token = window.APP_CONFIG?.LINKEDIN_TOKEN;
    if (!token) {
        target.textContent = 'LinkedIn Profili';
        return;
    }

    try {
        const profileResponse = await fetch('https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))', {
            headers: getAuthHeaders(token)
        });

        if (!profileResponse.ok) throw new Error('LinkedIn yetki hatası');

        const profileData = await profileResponse.json();
        const first = profileData.firstName?.localized?.tr || profileData.firstName?.localized?.en || '';
        const last = profileData.lastName?.localized?.tr || profileData.lastName?.localized?.en || '';

        const connectionsResponse = await fetch('https://api.linkedin.com/v2/networkSizes/urn:li:person:me?edgeType=CONNECTIONS', {
            headers: getAuthHeaders(token)
        });

        let connectionCount = null;
        if (connectionsResponse.ok) {
            const connectionsData = await connectionsResponse.json();
            connectionCount = connectionsData?.firstDegreeSize ?? connectionsData?.count ?? null;
        }

        if (connectionCount !== null) {
            target.textContent = `${connectionCount} Bağlantı`;
            return;
        }

        const fullName = `${first} ${last}`.trim();
        target.textContent = fullName || 'LinkedIn Profili';
    } catch (error) {
        target.textContent = 'LinkedIn Profili';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadGithub();
    loadLinkedInProfile();
    setInterval(loadGithub, 60000);
    setInterval(loadLinkedInProfile, 60000);
    initScrollReveal();
});