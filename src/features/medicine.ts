
import { createAsyncThunk, createSlice, PayloadAction, PayloadActionCreator } from "@reduxjs/toolkit";
import { DateTime, } from "luxon";
import { scheduleNotification } from "../utils";
import { RootState } from "./store";

type timestamp = number;

type periods = "morning"|"evening";

export interface Imedicine {
    id: number;
    perdiod: periods;
    taken: boolean;
    scheduledHour: string;
    takenHour: timestamp;
}

interface state {
    medicines: {[key:number]: Imedicine};
    lastUpdate: timestamp;
}

export const defaultState: state = {
    medicines: {
        1: {
            id: 1,
            perdiod: "morning",
            scheduledHour: "08:00",
            taken: false,
            takenHour: 0
        },
        2: {
            id: 2,
            perdiod: "evening",
            scheduledHour: "20:00",
            taken: false,
            takenHour: 0
        },
    },
    lastUpdate: DateTime.now().toMillis()
}


/**
 * 
 */
const setTaken = createAsyncThunk(
    "medicine/setTaken",
    async (id: number, thunkAPI) => {
        const state = thunkAPI.getState() as RootState
        if (!state.medicine.medicines[id].taken)
            await scheduleNotification(state.medicine.medicines[id].scheduledHour);
        return id;
    }
)


const medicineSlice = createSlice({
    name: "medicine",
    initialState: defaultState,
    reducers: {
        update(state, action: PayloadAction<void>){
            // must be called at the opening of the app to check if we are the next day.
            const tempDate = new Date();
            tempDate.setHours(0);
            tempDate.setMilliseconds(0);
            tempDate.setMinutes(0);
            tempDate.setSeconds(0);
            const dayToReach = DateTime.fromJSDate(tempDate).plus({day: 1});
            if( DateTime.now().toMillis() > dayToReach.toMillis()){
                Object.values(state.medicines).forEach((item)=>{
                    item.taken = false;
                })
                state.lastUpdate = DateTime.now().toMillis();
            }
        },
        reset(state, action: PayloadAction<void>){
            console.log("in");
            state.medicines = defaultState.medicines;
        }

    }, 
    extraReducers: (builder) => {
        builder.addCase(setTaken.fulfilled, (state, action)=>{
            state.medicines[action.payload].taken = true;
            state.medicines[action.payload].takenHour = DateTime.now().toMillis();
        })
    }
})


export const MedicineActions = {
    ...medicineSlice.actions,
    setTaken,
}
export const selecteMedicine = (state: RootState) => Object.values(state.medicine.medicines);

export default medicineSlice.reducer;