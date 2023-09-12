"use client"
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import Link from "next/link";


const UnderConstruction = () => {
    return (
        <div>
             <Card shadow="md" isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={"Under Construction Image"}
              className="w-full object-cover h-[70vh]"
              src={`/images/under-construction.jpg`}
            />
          </CardBody>
          <CardFooter className="bg-[#016A70] p-4 text-lg justify-between text-white">
            <b>Under Construction!</b>
            <Link href="/equation-solver" className=" hover:underline hover:text-blue-300 text-yellow-500 ">Go to Equation Solver for now!</Link>
          </CardFooter>
        </Card>
        </div>
    );
};

export default UnderConstruction;