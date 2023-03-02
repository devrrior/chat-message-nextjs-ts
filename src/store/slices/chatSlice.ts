import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {InsertOnePayloadType, SetRoomIdType, SetUsernameType} from "@/types/slices/chatSlice.type";
import {MessageType} from "@/types/models/message.type";

export interface ChatState {
    messages: MessageType[] | null;
    username: string | null;
    roomId: string | null
}

const initialState: ChatState = {
    messages: null,
    username: null,
    roomId: null,
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        insertOne: (state, action: PayloadAction<InsertOnePayloadType>) => {
            if (state.messages) {
                state.messages = [action.payload.message, ...state.messages];
            } else {
                state.messages = [action.payload.message];
            }
        },
        resetMessages: (state) => {
            state.messages = null;
        },
        setUsername: (state, action: PayloadAction<SetUsernameType>) => {
            state.username = action.payload.username;
        },
        setRoomId: (state, action: PayloadAction<SetRoomIdType>) => {
            state.roomId = action.payload.roomId;
        },

    },
})

// Action creators are generated for each case reducer function
export const {insertOne, setUsername, setRoomId, resetMessages} = chatSlice.actions

export default chatSlice.reducer
