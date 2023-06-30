import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormRecord {
  id: string;
  gender: string;
  idNumber: string;
  phoneNumber: string;
  prename: string;
  name: string;
  lastname: string;
  birthdate: string;
  nationality: string;
}

interface DataState {
  formData: FormRecord[];
}

const initialState: DataState = {
  formData: [
    {
      id: "0",
      gender: "ชาย",
      idNumber: "1-2222-33333-44-5",
      phoneNumber: "66-123456789",
      prename: "นาย",
      name: "1111",
      lastname: "2222222",
      birthdate: "2021-01-14",
      nationality: "ไทย",
    },
  ],
};

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		addFormData: (state, action: PayloadAction<FormRecord>) => {
			const id = (state.formData.length + 1).toString();
			const newData = { ...action.payload, id };
			state.formData.push(newData);
		},
		deleteFormData: (state, action: PayloadAction<FormRecord>) => {
			state.formData = state.formData.filter(
			(data) => data.id !== action.payload.id
		);
		},
		deleteAllFormData: (state, action: PayloadAction<FormRecord[]>) => {
			state.formData = state.formData.filter(
			(data) => !action.payload.some((record) => record.id === data.id)
		);
		},
		editFormData: (state, action: PayloadAction<FormRecord>) => {
			const { id, ...updatedData } = action.payload;
			const index = state.formData.findIndex(data => data.id === id);
			if (index !== -1) {
			  state.formData[index] = { ...state.formData[index], ...updatedData };
			}
		},
	},
  });
  
  export const { addFormData, deleteFormData, deleteAllFormData, editFormData } = dataSlice.actions;
  
  export default dataSlice.reducer;