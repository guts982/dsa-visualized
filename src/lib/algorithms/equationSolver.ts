import { Exception } from "sass"

const OPERATOR_PRECEDENCE:  { [key: string]: number } =
    { "+":1, "-":1, "*":2, "/":2, "^":3 }

const LTR = "left to right"
const RTL = "right to left"
const OPERATOR_ASSOCIATION:  { [key: string]: string } = 
    { "+": LTR, "-":LTR, "*":LTR, "/":LTR, "^":RTL}



export const solveEquation = (expression:string) => {
    return parseInfixToPostfix(expression)
}

export const parseInfixToPostfix = (expression:string) => {

    //non-functional stores for frontend
    // const infixInputArr : string[] = []
    const postfixExpressionArr : string[]  = []
    const operatorStackArr : string[]  = []

    //functional arrays
    const operatorStack: string[] = []
    const postfixQueue: string[] = []
   
    expression = expression.replace(/\s+/g,'') //remove spaces
    
    //expression as an array of digits and operator tokens and brackets
    const infixTokens = expression.split(/(\d+\.\d+|\d+|[-+*/^()])/).filter(token => token.trim() !== '');
    const infixInputArr = [...infixTokens];

    //Iterate through tokens in expression
    for(const token of infixTokens) {
      
        if(isDigit(token)) { // 0 1 2 3 4 5 6 7 8 9 10 11...
           
            postfixQueue.push(token)

        } else {
            //token is an operator or bracket, it goes to the operator stack
            if(isOperator(token)) { //+ - * / ^

                 while ( operatorStack.length > 0 
                    && operatorStack[operatorStack.length-1] != '(' 
                    && precedenceOf(token) <= precedenceOf(operatorStack[operatorStack.length-1]) 
                    
                    ) {
                       
                        if(getAssociation(token) == LTR ) {
                            const op = operatorStack.pop() as string
                            postfixQueue.push(op)
                            while(operatorStack.length && getAssociation(operatorStack[operatorStack.length-1])==RTL) {
                                const op1 = operatorStack.pop() as string
                                postfixQueue.push(op1)
                            }
                        } else {
                            break;
                        }
                       

                    }
                operatorStack.push(token)
 
            } else if ( token == "(" ){  // ( 
                operatorStack.push(token)
               
            } else {  // )
                while (operatorStack.length && operatorStack[operatorStack.length-1] != '(' ) {
                    const op = operatorStack.pop() as string
                    postfixQueue.push(op)
                }
                operatorStack.pop()
}
        } 

        postfixExpressionArr.push(arrToExpression(postfixQueue)+" ")
        operatorStackArr.push(arrToExpression(operatorStack)+" ")

    }

    while (operatorStack.length > 0 ){
        const op = operatorStack.pop() as string
        
        postfixExpressionArr.push(`${arrToExpression(postfixQueue)} ${op}`)
        postfixQueue.push(op)
    }

    const answer = equationSolver(postfixQueue)
    return {infixInputArr, operatorStackArr, postfixExpressionArr,answer, operatorStack, postfixQueue}

}


export const equationSolver = (postfixQueue:string[]) => {
    const executionStack: string[] = []

    while(postfixQueue.length>0 ) {
        const token = postfixQueue.shift() as string
        if(isOperator(token)) {
            const operator = token 
            const operand2 = executionStack.pop() as string
            const operand1 = executionStack.pop() as string
            const result = executeOperation(operator, operand1, operand2)
            executionStack.push(result.toString())
        }
        else if(isDigit(token)) {
            executionStack.push(token)
        } else {
            console.error("Invalid Operand type or missing ')'!")
        }
    }
    try{
        const answer = executionStack.pop()
        return Number(answer)
    }catch(err) {
        console.error("Error encountered!")
        return 0
    }
   
}

const executeOperation = (operator:string, operand1:string, operand2:string) => {
    
    if (operator == "+")
        return Number(operand1) + Number(operand2)
    else if (operator == "-")
        return Number(operand1) - Number(operand2)
    else if( operator == "*")
        return Number(operand1) * Number(operand2)
    else if (operator == "/")
        return Number(operand1) / Number(operand2)
    else if (operator == "^")  // since its association is from right to left
        return Number(operand1) ** Number(operand2)
    else
        console.error("Invalid Operator!")
        return 0
}

const getAssociation = (operator:string) => {
    return OPERATOR_ASSOCIATION[operator] || LTR   
}

const precedenceOf = (operator:string) => {
    return OPERATOR_PRECEDENCE[operator] || 0   
}
       

const isOperator = (token:string) => {
    return /[-+*/^]/.test(token) 
}

const isDigit = (token:string) => {
    return /\d/.test(token)
}

const isNonDigit = (token:string) => {
    //operators or brackets 
    return /[-+*/^()]/.test(token)
}

const arrToExpression = (arr:string[]) => {
    let expr = ''
    // if(arr.length)
    //     expr = `${arr[arr.length-1]} `
    for(const token of arr) {
        expr += `${token} `
    }
    

    return expr
}


// infixInputArr: [],
// postfixExpressionArr: [],
// operatorStackArr: [],
