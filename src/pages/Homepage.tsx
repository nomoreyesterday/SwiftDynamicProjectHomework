import SelectLanguage from '../components/SelectLanguage';

import { Link  } from 'react-router-dom';

function HomePage() {
	return (
        <>
            <div className='headertopright'>
                <SelectLanguage  />
            </div>
            <div className='boxcontainer'>
                <div className='TestBox box1'>
                    <h2>Test1</h2>
                    <p>Layout & Style</p>
                </div>
                <div className='TestBox box2'>
                    <h2>Test2</h2>
                    <p>Connect API</p>
                </div>
                <Link to="/form-table">
                    <div className='TestBox box3'>
                        <h2>Test3</h2>
                        <p>Form & Table</p>
                    </div>
                </Link>
            </div>
        </>
	)
}

export default HomePage


