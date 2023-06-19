import { Button } from 'antd';
import SelectLanguage from './components/SelectLanguage';
import FormTablePage from './pages/FormTablePage';
import './App.scss'

function App() {
	return (
		<>
			<div className='headertopright'>
				<SelectLanguage  />
				<Button  style={{right: 0, top: '10px'}}>หน้าหลัก</Button>
			</div>
			<FormTablePage />
		</>
	)
}

export default App


