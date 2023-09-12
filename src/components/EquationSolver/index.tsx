"use client"
import InputSection from './InputSection';
import { Divider } from '@nextui-org/react';
import Visualizer from './Visualizer';
import AnswerSection from './AnswerSection';

const EquationSolver = () => {
    return (
        <div className='h-screen w-screen bg-[#001C30] flex flex-col justify-start items-center'>
             
             <div className="pt-4 font-normal text-lg xl:text-2xl  text-[#ffffff] ">
                Infix to Postfix Conversion
            </div>

            <InputSection />

            <Divider className='bg-zinc-500 my-10' />

            <AnswerSection />
            <Divider className='bg-zinc-500 mt-10 mb-2' />


            <Visualizer />
        </div>
    );
};

export default EquationSolver;