import { ActivateWidget } from './widget/Widget'
import { useEffect } from 'react'
import './widget/widget.css'

function App() {
  useEffect(() => {
    ActivateWidget()
  }, [])

  return (
    <div className="App">
      <div id="glasses-quiz-widget" data-source="https://example.com/"></div>
    </div>
  )
}

export default App
