function getIsDesktop() {
    const userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;
  
    if (macosPlatforms.indexOf(platform) !== -1) { //Desktop - Mac
      return true
    } else if (iosPlatforms.indexOf(platform) !== -1) { // IOS
      return false
    } else if (windowsPlatforms.indexOf(platform) !== -1) { //Desktop - window
      return true
    } else if (/Android/.test(userAgent)) { //Android
      return false
    } else if (!os && /Linux/.test(platform)) { //Linux
      return true
    }
  
    return os;
}

export default getIsDesktop