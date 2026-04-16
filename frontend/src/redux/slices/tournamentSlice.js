import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../App";
import { toast } from "react-hot-toast";

export const createTournament = createAsyncThunk(
  "tournament/createTournament",
  async (tournamentData, { rejectWithValue }) => {
    console.log(tournamentData);
    try {
      const response = await axios.post(`${api}/tournaments`, tournamentData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      toast.error(
        error.response.data.message || "Failed to create tournament!",
      );
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchTournaments = createAsyncThunk(
  "tournament/fetchTournaments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}/tournaments`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const tournamentSlice = createSlice({
  name: "tournament",
  initialState: {
    tournaments: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTournament.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTournament.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ correct push
        state.tournaments.push(action.payload.tournament);
      })
      .addCase(createTournament.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchTournaments.fulfilled, (state, action) => {
        state.tournaments = action.payload;
      });
  },
});

export default tournamentSlice.reducer;
