import { SettingsForm } from './components/SettingsForm'
import './App.css'

function App() {
  return (
    <main className="app">
      <SettingsForm
        initialValues={{
          displayName: 'Alex Rivera',
          email: 'alex@example.com',
          company: 'FlyRank',
        }}
        onSave={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 600))
          console.log('Saved settings:', values)
        }}
      />
    </main>
  )
}

export default App
