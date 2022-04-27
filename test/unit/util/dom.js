export function createAppDom() {
  let appDom = document.querySelector('#app');
  if (appDom) {
    appDom.remove();
  }
  appDom = document.createElement('div');
  appDom.id = 'app';
  document.body.appendChild(appDom);
}
