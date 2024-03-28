import './App.css'
import Content from './components/common/Content';
import Footer from './components/common/Footer';
import Header from './components/common/Header';

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default App
