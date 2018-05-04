/* eslint-disable */
const getPlatform = ReleasesGithubReducerData => {
  let buttonPlatformContent = 'CLI';
  let linkPlatform = 'https://github.com/containerum/chkit/releases/latest';
  const version = Object.keys(ReleasesGithubReducerData).length
    ? ReleasesGithubReducerData.tag_name
    : 'v.2.14';
  let size = '222202';

  if (typeof window !== 'undefined') {
    const windowAgent = window ? window.navigator.userAgent : undefined;
    if (windowAgent) {
      const platformToLowerCase = windowAgent.toLowerCase();
      const platformMac = platformToLowerCase.indexOf('mac') + 1;
      const platformLinux = platformToLowerCase.indexOf('linux') + 1;
      const platformWindows = platformToLowerCase.indexOf('win') + 1;
      const platformX64 = platformToLowerCase.indexOf('64') + 1;
      const platformArm = platformToLowerCase.indexOf('arm') + 1;
      const objBrowserDownloadUrl = {
        linuxArm: {},
        linuxX64: {},
        linuxX86: {},
        macX64: {},
        winX64: {},
        winX86: {}
      };
      Object.keys(ReleasesGithubReducerData).length
        ? ReleasesGithubReducerData.assets.map(item => {
            const currentLowerItem = item.browser_download_url.toLowerCase();
            const browserDownloadUrl = item.browser_download_url;
            if (currentLowerItem.indexOf('linux_arm') + 1) {
              objBrowserDownloadUrl.linuxArm.url = browserDownloadUrl;
              objBrowserDownloadUrl.linuxArm.size = item.size;
            } else if (currentLowerItem.indexOf('linux_amd64') + 1) {
              objBrowserDownloadUrl.linuxX64.url = browserDownloadUrl;
              objBrowserDownloadUrl.linuxX64.size = item.size;
            } else if (currentLowerItem.indexOf('linux_386') + 1) {
              objBrowserDownloadUrl.linuxX86.url = browserDownloadUrl;
              objBrowserDownloadUrl.linuxX86.size = item.size;
            } else if (currentLowerItem.indexOf('darwin_amd64') + 1) {
              objBrowserDownloadUrl.macX64.url = browserDownloadUrl;
              objBrowserDownloadUrl.macX64.size = item.size;
            } else if (currentLowerItem.indexOf('windows_amd64') + 1) {
              objBrowserDownloadUrl.winX64.url = browserDownloadUrl;
              objBrowserDownloadUrl.winX64.size = item.size;
            } else if (currentLowerItem.indexOf('windows_386') + 1) {
              objBrowserDownloadUrl.winX86.url = browserDownloadUrl;
              objBrowserDownloadUrl.winX86.size = item.size;
            }
            return null;
          })
        : [];
      if (platformMac) {
        buttonPlatformContent = 'CLI for MacOS';
        if (objBrowserDownloadUrl.macX64.url)
          linkPlatform = objBrowserDownloadUrl.macX64.url;
        if (objBrowserDownloadUrl.macX64.size)
          size = objBrowserDownloadUrl.macX64.size;
      } else if (platformLinux) {
        buttonPlatformContent = 'CLI for Linux';
        if (platformArm) {
          if (objBrowserDownloadUrl.linuxArm.url)
            linkPlatform = objBrowserDownloadUrl.linuxArm.url;
          if (objBrowserDownloadUrl.linuxArm.size)
            size = objBrowserDownloadUrl.linuxArm.size;
        } else if (platformX64) {
          if (objBrowserDownloadUrl.linuxX64.url)
            linkPlatform = objBrowserDownloadUrl.linuxX64.url;
          if (objBrowserDownloadUrl.linuxX64.size)
            size = objBrowserDownloadUrl.linuxX64.size;
        } else {
          if (objBrowserDownloadUrl.linuxX86.url)
            linkPlatform = objBrowserDownloadUrl.linuxX86.url;
          if (objBrowserDownloadUrl.linuxX86.size)
            size = objBrowserDownloadUrl.linuxX86.size;
        }
      } else if (platformWindows) {
        buttonPlatformContent = 'CLI for Windows';
        if (platformX64) {
          if (objBrowserDownloadUrl.winX64.url)
            linkPlatform = objBrowserDownloadUrl.winX64.url;
          if (objBrowserDownloadUrl.winX64.size)
            size = objBrowserDownloadUrl.winX64.size;
        } else {
          if (objBrowserDownloadUrl.winX86.url)
            linkPlatform = objBrowserDownloadUrl.winX86.url;
          if (objBrowserDownloadUrl.winX86.size)
            size = objBrowserDownloadUrl.winX86.size;
        }
      }
    }
  }
  size = (size / 1048576).toFixed(2);
  return {
    buttonPlatformContent,
    linkPlatform,
    version,
    size
  };
};

export default getPlatform;
