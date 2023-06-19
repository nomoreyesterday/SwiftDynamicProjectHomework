import DataForm from '../components/DataForm'
import TableForm from '../components/TableForm'

function FormTablePage() {
	return (
		<>
			<div className='headertopleft'>
				<h1>การจัดการหน้าฟอร์ม</h1>
			</div>
			<DataForm />
			<TableForm />
		</>
	)
}

export default FormTablePage


