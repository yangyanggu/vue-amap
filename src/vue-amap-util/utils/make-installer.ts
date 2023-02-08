import type { App, Plugin } from 'vue'

export const makeInstaller = (components: Plugin[] = []) => {
  const apps: App[] = []

  const install = (app: App) => {

    if (apps.includes(app)) return
    apps.push(app)

    components.forEach((c) => app.use(c))
  }

  return {
    install,
  }
}
