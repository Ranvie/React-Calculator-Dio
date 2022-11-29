import { Container, Content, Row } from "./style";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { useState } from "react";

const App = () => {
  const [currentNumber, setCurrentNumber] = useState("0");
  const [totalNumber, setTotalNumber] = useState("");
  const [pointCount, setPointCount] = useState(0);

  const onAddNumber = (number) => {
    setCurrentNumber(prev => prev !== "0" ? `${prev}${number}` : `${number}`);
  }

  const onAddOperator = (operator) => {
    setPointCount(0);
    setCurrentNumber(checkIfNumberIsOk(currentNumber));
    setCurrentNumber(prev => !isOperator(prev[prev.length-2]) ? `${prev} ${operator} ` : `${prev.substring(0, prev.length-3)} ${operator} `);
  }

  const checkIfNumberIsOk = (expression) => {
    if(!isCurrentNumberComplete(expression)){ 
      expression = expression.substring(0, expression.length-1);
    };

    return expression;
  }

  const isCurrentNumberComplete = (expression="") => {
    return expression[expression.length-1] !== '.';
  }

  const isOperator = (operator) => {
    return operator === "+" || operator === "-" || 
      operator === "*" || operator === "/";
  }

  const onClear = () => {
    setTotalNumber("");
    setCurrentNumber("0");
    setPointCount(0);
  }

  //TODO: Reset when the result is displayed -> 45.2. or, 23 not allowing to set a point;
  const onAddPoint = () => {
    if(pointCount < 1){
      setCurrentNumber(prev => prev[prev.length-1] === " " ? `${prev}0.` : `${prev}.`);
      setPointCount(1);
    }
  }

  const onCalculate = () => {
    let expression = currentNumber;

    expression = checkIfNumberIsOk(expression);
    expression = checkIfDontEndWithOperator(expression);
    expression = expression.split(" ").filter(val => val !== "");

    setTotalNumber(expression.join(" "));
    setCurrentNumber(calculate(expression));

    if(!isFloat(expression)) { setPointCount(0); };
  }

  const checkIfDontEndWithOperator = (expression) => {
    if(!isExpressionComplete(expression)){
      expression += completeExpression(expression[expression.length-2]);
    }

    return expression;
  }

  const isExpressionComplete = (expression) => {
    return !isOperator(expression[expression.length-2]);
  }
  
  const isFloat = (value) => {
    return value !== parseInt(value);
  }

  const completeExpression = (topOperator) => {
    if(topOperator === "/" || topOperator === "*") { return "1" };

    return "0";
  }

  function basicMath(firstNum, secondNum, op)
  {
    let result;

    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);

    switch(op)
    {
      case "+":
        result = firstNum + secondNum;
        break;

      case "-":
        result = firstNum - secondNum;
        break;

      case "*":
        result = firstNum * secondNum;
        break;

      case "/":
        result = firstNum / secondNum;
        break;

      default:
        break;
    }

    return result;
  }

  //TODO: Try refactor;
  function calculate(expressionArray)
  {   
    let numberArray = [];
    let operatorArray = [];

    let numberTwo;
    let numberOne;
    let operator;

    //Separate operator and numbers;
    for(let position = 0; position < expressionArray.length; position++)
    {
      //Check what to do if operator;
      if(isOperator(expressionArray[position]))
      {
        //Check operator at array top, if * or /, remove two numbers and an operator,
        //do the math later adding to number array;
        //else, keep adding operators normally;
        if(operatorArray[operatorArray.length-1] === "*" || operatorArray[operatorArray.length-1] === "/")
        {
          //do math
          //Resolve order caused by popping top number (it comes reversed)
          numberTwo = numberArray.pop();
          numberOne = numberArray.pop();
          operator = operatorArray.pop();

          numberArray.push(basicMath(numberOne, numberTwo, operator));

          //Add next operator to op array;
          operatorArray.push(expressionArray[position]);

        } //Insert operator to array;
        else
        {
          operatorArray.push(expressionArray[position]);
        }
      } //Insert into number array;
      else
      {
        numberArray.push(expressionArray[position]);
      }
    }

    while(operatorArray.length > 0)
    {
      //Incase the operator that came before numberOne is a minus, since the math is done backwards;
      //0 - 2 + 5 = 3 would be done 2 + 5 - 0 = 7;
      //Fixed will be: 0 + -2 + 5 = 3;
      if(operatorArray[operatorArray.length-2] === "-")
      {
        operatorArray[operatorArray.length-2] = "+";
        numberTwo = numberArray.pop();
        numberOne = numberArray.pop()*-1;
        operator = operatorArray.pop();
      }
      else
      {
        numberTwo = numberArray.pop();
        numberOne = numberArray.pop();
        operator = operatorArray.pop();
      }

      numberArray.push(basicMath(numberOne, numberTwo, operator));
    }

    return numberArray;
  }

  return (
    <Container className="App">
      <Content>
        <Input value={currentNumber} expression={totalNumber}/>
        <Row>
          <Button label="/" onClick={() => onAddOperator("/")}/>
          <Button label="*" onClick={() => onAddOperator("*")}/>
          <Button label="C" onClick={onClear}/>
        </Row>
        <Row>
          <Button label="7" onClick={() => onAddNumber("7")} />
          <Button label="8" onClick={() => onAddNumber("8")} />
          <Button label="9" onClick={() => onAddNumber("9")} />
          <Button label="-" onClick={() => onAddOperator("-")}/>
        </Row>
        <Row>
          <Button label="4" onClick={() => onAddNumber("4")} />
          <Button label="5" onClick={() => onAddNumber("5")} />
          <Button label="6" onClick={() => onAddNumber("6")} />
          <Button label="+" onClick={() => onAddOperator("+")}/>
        </Row>
        <Row>
          <Button label="1" onClick={() => onAddNumber("1")} />
          <Button label="2" onClick={() => onAddNumber("2")} />
          <Button label="3" onClick={() => onAddNumber("3")} />
          <Button label="=" onClick={onCalculate}/>
        </Row>
        <Row>
          <Button label="0" onClick={() => onAddNumber("0")} />
          <Button label="." onClick={onAddPoint} />
        </Row>
      </Content>
    </Container>
  );
}

export default App;