import { createSlice, createAsyncThunk, AsyncThunk, PayloadAction } from "@reduxjs/toolkit";


export class SliceService {

    public fetchAPI<T, U>(title: string, getData: (params: T) => Promise<U>) {
        return createAsyncThunk(title, async (params: T) => {
            return await getData(params);
        });
    }

    public sliceData<TResponse, TState extends object>(
        title: string,
        initialState: TState,
        fetchData: AsyncThunk<TResponse, any, {}>
    ) {
        return createSlice({
            name: title,
            initialState,
            reducers: {},
            extraReducers: (builder) => {
                builder
                    .addCase(fetchData.pending, (state: any) => {
                        state.loading = true;
                        state.error = null;
                    })
                    .addCase(fetchData.fulfilled, (state: any, action: PayloadAction<TResponse>) => {
                        state.loading = false;
                        state.data = action.payload;
                    })
                    .addCase(fetchData.rejected, (state: any, action) => {
                        state.loading = false;
                        state.error = action.error.message || "Gagal mengambil data";
                    });
            },
        });
    }

}
