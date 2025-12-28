import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import ProfileLayout from './components/layout/ProfileLayout'
import GeneralLayout from './components/layout/GeneralLayout'

createInertiaApp({
  resolve: async (name) => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })

    // Normalize the name (handle both dot and slash notation)
    const normalized = name.replace(/\./g, '/').toLowerCase()

    // Try these path patterns
    const paths = [
      `./Pages/${normalized}.jsx`,

      `./Pages/**/${normalized}.jsx`,
      `./Pages/${name.replace(/\./g, '/')}.jsx`, // original case
    ]

    for (const path of paths) {
      if (pages[path]) {
        const page = pages[path]

        // Ensure the module has a default export
        if (!page.default) {
          console.error(`Page found at ${path} but missing default export`)
          continue
        }

        // Apply layout if not defined
        if (page.default.layout === undefined) {
            const useProfileLayout = name.startsWith('dashboard')  ||  name.startsWith('coursedashboard') || name.startsWith('materials') || name.startsWith('quizdashboard') || name.startsWith('q&a') | name.startsWith('leader')
          page.default.layout = useProfileLayout
            ? (page) => <ProfileLayout {...page.props}>{page}</ProfileLayout>
            : (page) => <GeneralLayout {...page.props}>{page}</GeneralLayout>
        }else if(name.startsWith('ai')){
         //setting no layout for ai pages
          page.default.layout = (page) => <>{page}</>
        }

        return page
      }
    }

    throw new Error(`Page not found: ${name}. Tried:\n${paths.join('\n')}`)
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
