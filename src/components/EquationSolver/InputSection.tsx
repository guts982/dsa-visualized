"use client"

import {useState, useMemo, useEffect} from 'react';
import {Input} from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { setAnswer, setExpressionString, setInfixInputArr, setIsLoading, setOperatorStackArr, setPostfixExpressionArr, setPostfixExpressionString } from '@/lib/redux/slices/equitionSolverSlice';
import { solveEquation } from '@/lib/algorithms/equationSolver';
import { useDebounce } from 'use-debounce';


const InputSection = () => {

    const expressionString  = useSelector((state:RootState)=>state.equationSolver.expressionString);
    const dispatch = useDispatch();
    const [value, setValue] = useState(expressionString);
    const [debouncedValue] = useDebounce(value, 500);

    

const validateExpression = (value:string) => value.match(/^[-+*/^().\d\s]+$/i);

  const validationState = useMemo(() => {
    if (value === "") return undefined;

    return validateExpression(value) ? "valid" : "invalid";
  }, [value]);

  useEffect(()=>{
    dispatch(setIsLoading(true))
    if(!validateExpression(value)) {
      dispatch(setPostfixExpressionString("0.00"))
      dispatch(setAnswer(0))
      return
    }
    const {infixInputArr,operatorStackArr, postfixExpressionArr, answer} = solveEquation(value)
    if(postfixExpressionArr.length) {
      dispatch(setPostfixExpressionString(postfixExpressionArr[postfixExpressionArr.length-1]))
      dispatch(setAnswer(Number(answer)))
    }
    dispatch(setExpressionString(value))
    dispatch(setInfixInputArr(infixInputArr))
    dispatch(setPostfixExpressionArr(postfixExpressionArr))
    dispatch(setOperatorStackArr(operatorStackArr))
   
    dispatch(setIsLoading(false))
  },[dispatch, debouncedValue])

  return (
    <div className='w-full  flex justify-center items-center px-4 sm:px-10 '>
        <Input
        value={value}
        type="text"
        label="Infix Expression"
        variant="underlined"
        color={validationState === "invalid" ? "danger" : "success"}
        errorMessage={validationState === "invalid" && "Please enter a valid mathematical expression ( eg: 2+(3/5^2)/7 )."}
        validationState={validationState}
        onValueChange={setValue}
        className=" text-xl font-semibold text-center text-white"
        />
    </div>


  );
};

export default InputSection;

