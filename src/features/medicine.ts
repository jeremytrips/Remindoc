
import { createAsyncThunk, createSlice, PayloadAction, PayloadActionCreator } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { RootState } from "./store";

type timestamp = number;

type periods = "morning"|"evening";

interface Imedicine {
    perdiod: periods;
    taken: boolean;
    scheduledHour: timestamp;
    takenHour: timestamp;
}

interface state {
    medicines: Array<Imedicine>;
    lastUpdate: timestamp;
}

export const defaultState: state = {
    medicines: [],
    lastUpdate: DateTime.now().toMillis()
}


/**
 * 
 */
const setTaken = createAsyncThunk(
    "medicine/setTaken",
    async (data: periods, thunkAPI) => {
        const state = thunkAPI.getState() as RootState
        const newArray = state.medicine.medicines.filter(item=>item.perdiod !== data);
        // const toUpdate = state.medicine.medicines.
        // const temp = 
    }
)


const medicineSlice = createSlice({
    name: "medicine",
    initialState: defaultState,
    reducers: {

    }, 
    extraReducers: (builder) => {

    }
})


export const selecteMedicine = (state: RootState) => state.medicine;


export default medicineSlice.reducer;