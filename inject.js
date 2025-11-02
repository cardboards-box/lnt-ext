
const PARAM_NAME = 'lnt-ext-bypass';

/**
 * Adds the bypass parameter to the given URL
 * @param {string} url 
 * @returns {string}
 */
function setParameter(url) {
    const newUrl = new URL(url);
    newUrl.searchParams.set(PARAM_NAME, '1');
    return newUrl.toString();
}

/**
 * Change all a tags to include a fake query parameter at the end of the URL to bypass WP issues
 */
function changeAllUrls() {
    const links = document.querySelectorAll('a[href]');
    let count = 0;
    links.forEach(link => {
        if (!link.href.includes('lightnovelstranslations.com')) return;
        link.href = setParameter(link.href);
        count++;
    });
    console.log(`[LNT-EXT] Modified ${count} links to include bypass parameter.`);
}

/**
 * Check if the current page has a WP error indication
 * @returns {boolean}
 */
function isErroredPage() {
    //Skip if the parameter is already present to avoid loops
    if (window.location.href.includes(PARAM_NAME)) return false;

    // Check for common WP error indicators in the body text
    const bodyText = (document.body.innerText || '').toLocaleLowerCase();
    const slugs = [
        'lightnovelstranslations.com/wp-config.php',
        'fatal error',
        'parse error'
    ];
    return slugs.some(slug => bodyText.includes(slug));
}

/**
 * If the page is fully loaded and it doesn't have our parameter, add the parameter and reload the page.
 */
function init() {
    if (isErroredPage()) {
        console.log('[LNT-EXT] Detected errored page, reloading with bypass parameter...');
        window.location.href = setParameter(window.location.href);
        return;
    }

    //Update all LNT links on the page
    changeAllUrls();
}

/**
 * Entry point
 */
function main() {
    document.readyState === 'complete' 
        ? init() 
        : window.addEventListener('load', init);
}

main();