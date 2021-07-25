---
title: Efficently Implementing the Lamda Calculus
date: "2020-07-25T22:12:03.284Z"
description: Implementing the lambda calculus with naive term-substitution is inefficient - instead, modern compilers for functional languages convert the code to a form that can be more efficiently executed.
---

## Practice run with Arithmetic Expressions:

Invented by Xavier Leroy, Zinc is an "abstract machine" capable of representing any computation. An abstract machine is just a specification of a computing system - other examples are the lambda calculus, turing machines, and cellular automata. 

It turns out that a pretty good way of implementing the lambda calculus (LC) is to just convert an LC term to a list of Zinc instructions. To understand how this works, I'll use the example that everyone uses, which is converting arithmetic expressions to reverse polish notation.

### The Arithmetic Expression Language

Let's imagine an arithmetic expression language, which we'll define in ReasonML like this:

```reason
type lang =
  | Num(int) 
  | Add(lang, lang)
  | Sub(lang, lang);


// Examples:
let one = Num(1);
let three = Num(3);
let ten = Num(10);
let ten_plus_three_minus_one = Add(ten, Sub(three, one));
```

You could easily imagine a "direct" interpreter of these expressions. It would look something like this:

```reason
let rec interpret = l => {
  switch (l) {
  | Num(i) => i
  | Add(a, b) => interpret(a) + interpret(b)
  | Sub(a, b) => interpret(a) - interpret(b)
  };
};


// Example:

let () = Printf.printf("%d\n", interpret(ten_plus_three_minus_one)); 
// 12
```

### Reverse Polish Notation

And that would be fine for most purposes. However, for the sake of illustration, let's convert it to another way of writing arithmetic expressions that can be evaluated slightly more efficiently, called reverse polish notation (RPN). The nice thing about RPN is that it's non-hierarchial and doesn't require parentheses, making it a closer approximation to how computers work.

How RPN works is simple. This is the definition of an RPN instruction:

```reason
type rpn_instruction =
  | Num(int)
  | Add
  | Sub;
type rpn = list(rpn_instruction);
```

A value of type `rpn` can express anything our `lang` type could. For example, `Add(ten, Sub(three, one))` becomes `[Num(10), Num(1), Num(3), Sub, Add]`. To evaluate it, you need two things:

1) An "instruction pointer" telling you the next instruction to execute.

2) A stack to hold intermediate values. 

Here are the rules. `Num(x)` adds `x` to the stack. `Add` pops two values off the stack, adds them, then pushes the result back onto the stack. `Sub` does the same thing, except subtracting instead of adding. By example:

```
instructions: [Num(10), Num(1), Num(3), Sub, Add]
                ☝️
stack:        []
```

`Num(10)`, so we push `10` onto the stack, and advance the instruction pointer:

```
instructions: [Num(10), Num(1), Num(3), Sub, Add]
                         ☝️
stack:        [10]
```

Same for `Num(1)`,

```
instructions: [Num(10), Num(1), Num(3), Sub, Add]
                                  ☝️
stack:        [1, 10]
```

and `Num(3)`.

```
instructions: [Num(10), Num(1), Num(3), Sub, Add]
                                        ☝️
stack:        [3, 1, 10]
```

Now the instruction pointer is pointing to `Sub`, so we pop the top two numbers off the stack, subtract them, then push the result back onto the stack. The top two numbers are `3` and `1`, and `3-1` is `2`, so that turns the stack into `[2, 10]`. 

```
instructions: [Num(10), Num(1), Num(3), Sub, Add]
                                             ☝️
stack:        [2, 10]
```

Now, same thing for `Add`. Pop the top two numbers off the stack (`2` and `10`), add them, then push the result onto the stack.


```
instructions: [Num(10), Num(1), Num(3), Sub, Add]
                                                ☝️
stack:        [12]
```

And our instruction pointer has reached the end of the program, so we're done! The only thing on the stack is `12`, so that's the result of our computation. 

### Converting Between Arithmetic Expressions and RPN

To get started, I'm going to put `rpn` and `lang` in separate modules.

```reason
module Arithmetic = {
  type t =
    | Num(int)
    | Add(t, t)
    | Sub(t, t);
};

module Rpn = {
  type instruction =
    | Num(int)
    | Add
    | Sub;
  type t = list(instruction);
};
```

Now, we need to find some way to convert between `Arithmetic.t` and `RPN.t`. The function is going to look something like this:

```reason
let rec arithmetic_to_rpn = l =>
  switch (l) {
  | Arithmetic.Num(i) => assert(false)
  | Arithmetic.Add(a, b) => assert(false)
  | Arithmetic.Sub(a, b) => assert(false)
  };
```

We just need to fill in `assert(false)` with the correct values. The first one is easy:

```reason
let rec arithmetic_to_rpn = l =>
  switch (l) {
  | Arithmetic.Num(i) => [Rpn.Num(i)]
  | Arithmetic.Add(a, b) => assert(false)
  | Arithmetic.Sub(a, b) => assert(false)
  };
```

`Add` and `Sub` are easy too. They each have two arguments in our arithmetic language - all we do is push the instructions for evaluating the first argument, then the second, then the `Add` or `Sub` instruction.

```reason
let rec arithmetic_to_rpn = l =>
  switch (l) {
  | Arithmetic.Num(i) => [Rpn.Num(i)]
  | Arithmetic.Add(a, b) =>
    arithmetic_to_rpn(a) @ arithmetic_to_rpn(b) @ [Rpn.Add]
  | Arithmetic.Sub(a, b) =>
    arithmetic_to_rpn(a) @ arithmetic_to_rpn(b) @ [Rpn.Sub]
  };


// Example:

arithmetic_to_rpn(ten_plus_three_minus_one) 
// [Num(10), Num(3), Num(1), Sub, Add]
```

### Specifying RPN's semantics

I explained that RPN could be evaluated with an instruction pointer. But the instruction pointer only goes in one direction, so we can slightly simplify our semantics. Instead of an instruction pointer, we'll say there's an code-stack (full of instructions) as well as a values-stack (full of values). We always execute the first instruction on the code-stack, and pop it when we're done. This lets us treat the instructions and the intermediate values with the same metaphor, which is helpful for specifying the semantics.

To actually specify the semantics, you can use code, but you can also use this table notation that you'll often see:

| Code             | Instructions   | → → → | Code | Instructions    |
| :--------------- | :------------- | :---- | :--- | :-------------- |
| `[Num(x), ...c]` | `s`            | → → → | `c`  | `[x, ...s]`     |
| `[Add, ...c]`    | `[a, b, ...s]` | → → → | `c`  | `[a + b, ...s]` |
| `[Sub, ...c]`    | `[a, b, ...s]` | → → → | `c`  | `[a - b, ...s]` |

That table specifies how to advance "one step" in RPN. You find the row where the left side of the table matches your current code-stack and instructions-stack, and the output is the code and instruction stack on the right side of the table. You repeat this process until you have nothing left to do (empty instruction stack, or no matching row), and then halt.

Implementing this in Reason is super straightforward:

```reason
type state = (list(Rpn.instruction), list(int));
let advance = (s: state): state => {
  Rpn.(
    switch (s) {
    | ([Rpn.Num(x), ...c],           s ) => (c, [x, ...s])
    | ([Add,        ...c], [a, b, ...s]) => (c, [a + b, ...s])
    | ([Sub,        ...c], [a, b, ...s]) => (c, [a - b, ...s])
    | _ => assert(false)
    }
  );
};
```

