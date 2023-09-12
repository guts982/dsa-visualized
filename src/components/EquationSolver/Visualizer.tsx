"use client";
import {useState, useEffect} from "react";
import { RootState } from "@/lib/redux/store";
import {
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import {useSelector} from "react-redux";

type IRows = {id:number,infix_input:string, operator_stack:string,postfix_expression:string}
const rows:IRows[] = [];


const columns = [
  {
    key: "id",
    label: "SN.",
  },
  {
    key: "infix_input",
    label: "INFIX INPUT",
  },
  {
    key: "operator_stack",
    label: "OPERATOR STACK",
  },
  {
    key: "postfix_expression",
    label: "POSTFIX EXPRESSION SO FAR",
  },
];

const Visualizer = () => {

    const {   infixInputArr,
        postfixExpressionArr,
        operatorStackArr,
        isLoading,
      } = useSelector((state:RootState)=>state.equationSolver)


    const [ rows, setRows ] = useState<IRows[]>([])


    useEffect(()=>{
     
        const newRows:IRows[] = []
        const len = Math.max(postfixExpressionArr.length, infixInputArr.length,operatorStackArr.length)
        for(let i=0;i<len;i++) {
          newRows.push({
            id:i+1,
            infix_input:infixInputArr[i] || "<empty>",
            operator_stack:operatorStackArr[i] || "<empty>",
            postfix_expression:postfixExpressionArr[i] || "<empty>",
          })
        }
        setRows(newRows)
    
      },[infixInputArr,postfixExpressionArr,operatorStackArr])

  return (
    <div className="flex-grow w-full  bg-[#23374D]  p-4 flex justify-center items-center flex-col gap-4">
     
      {
        isLoading ?  <Spinner className="" color="warning" /> :

        <div className="dark max-w-fit w-full ">
        <Table  aria-label="Example static collection table" onVolumeChange={()=>{console.log("volume changed");}} >
          <TableHeader columns={columns} >
            {(column) => (
              <TableColumn key={column.key} className="bg-[#295E6A]">{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows} emptyContent={"No rows to display."}>
            {(item) => (
              // @ts-ignore
              <TableRow key={item?.key}>
                {(columnKey) => (
                  <TableCell className="text-white">{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      }
      

   
    </div>
  );
};

export default Visualizer;
