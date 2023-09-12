import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IEquationSolverState {
    expressionString: string,

    infixInputArr: string[],
    postfixExpressionArr: string[],
    operatorStackArr: string[],
    isLoading:boolean,

    postfixExpressionString: string,
    answer:number,
}


const initialState: IEquationSolverState = {
    expressionString: "",
    infixInputArr: [],
    postfixExpressionArr: [],
    operatorStackArr: [],
    isLoading: false,
    postfixExpressionString: '0.00',
    answer: 0,
}


export const equationSolverSlice = createSlice({
    name: "equationSolver",
    initialState,
    reducers: {
        setExpressionString: (state, action: PayloadAction<string>) => {
            state.expressionString = action.payload
        },
        setInfixInputArr: (state, action: PayloadAction<string[]>) => {
            state.infixInputArr = action.payload
        },
        setPostfixExpressionArr: (state, action: PayloadAction<string[]>) => {
            state.postfixExpressionArr = action.payload
        },
        setOperatorStackArr: (state, action: PayloadAction<string[]>) => {
            state.operatorStackArr = action.payload
        },
        setIsLoading:  (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setPostfixExpressionString:  (state, action: PayloadAction<string>) => {
            state.postfixExpressionString = action.payload
        },
        setAnswer:  (state, action: PayloadAction<number>) => {
            state.answer = action.payload
        },
    }
});


export const {
    setExpressionString,
    setInfixInputArr,
    setPostfixExpressionArr,
    setOperatorStackArr,
    setIsLoading,
    setPostfixExpressionString,
    setAnswer,
} = equationSolverSlice.actions
export default equationSolverSlice.reducer






