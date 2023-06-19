import { Button } from 'antd'
import DataForm from '../components/DataForm'
import SelectLanguage from '../components/SelectLanguage'
import TableForm from '../components/TableForm'
import { Link } from 'react-router-dom'

function FormTablePage() {
	return (
		<>
			<div className='headertopleft'>
				<h1>การจัดการหน้าฟอร์ม</h1>
			</div>
			<div className='headertopright'>
				<SelectLanguage  />
                <Link to="/">
                    <Button  style={{right: 0, top: '10px'}}>หน้าหลัก</Button>
                </Link>
			</div>
			<DataForm />
			<TableForm />
		</>
	)
}

export default FormTablePage


