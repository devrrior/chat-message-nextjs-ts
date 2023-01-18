import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {MessageType} from "@/types/models/message.type";
import {
    InsertInitialMessages,
    InsertOnePayloadType,
    SetRoomIdType,
    SetUsernameType
} from "@/types/slices/chatSlice.type";

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
        insertInitialMessages: (state, action: PayloadAction<InsertInitialMessages>) => {
            state.messages = action.payload.messages;
        },
        insertOne: (state, action: PayloadAction<InsertOnePayloadType>) => {
            if (state.messages) {
                state.messages = [action.payload.message, ...state.messages];
            }
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
export const {insertInitialMessages, insertOne, setUsername, setRoomId} = chatSlice.actions

export default chatSlice.reducer