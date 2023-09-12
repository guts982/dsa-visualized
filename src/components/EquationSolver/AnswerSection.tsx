"use client"

import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";

const AnswerSection = () => {

    const {   postfixExpressionString, answer,
        isLoading,
      } = useSelector((state:RootState)=>state.equationSolver)

 

    return (
        <div className=" text-white flex justify-center items-center gap-3">
            <div className="text-lg font-semibold mr-2 text-zinc-400">Result:</div>
            <div className="text-lg font-light text-yellow-500 ">{postfixExpressionString}</div>
            <div className="text-lg font-light  "> =</div>
            <div className="text-xl font-bold text-yellow-200">{answer ? answer.toFixed(2)  : "0"}</div>
        </div>
    );
};

export default AnswerSection;