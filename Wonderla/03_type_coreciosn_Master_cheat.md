Man, this is a very good observation. ❤️ Your confusion is understandable because `+`, `==`, `===` and relational operators don't follow the same conversion rules.

Let's create a cheat sheet that you can keep as your JavaScript interview revision notes.

# JavaScript Type Coercion – Master Cheat Sheet

## 1. Operator-wise conversion rules

This is the most important table.

\| Operator | Conversion rule |\
\|---|---|\
\| `+` | Convert objects to primitives. If either primitive is a string, concatenate. Otherwise, numeric addition (or BigInt addition). |\
\| `-` | Convert operands to numeric values. |\
\| `*` | Convert operands to numeric values. |\
\| `/` | Convert operands to numeric values. |\
\| `%` | Convert operands to numeric values. |\
\| Unary `+` | Convert operand to Number. |\
\| `==` | Apply Abstract Equality Comparison rules. |\
\| `===` | No type coercion; compare types and values/identity. |\
\| `>` `<` `>=` `<=` | Convert to primitives; compare strings lexically if both are strings, otherwise use numeric comparison. |\
\| `!` | Convert to Boolean, then invert. |\
\| `&&` | Return first falsy operand, otherwise last operand. |\
\| `||` | Return first truthy operand, otherwise last operand. |\
\| `??` | Return right operand only if left is null or undefined. |

## 2. The `+` operator – conversion flow

## Binary + algorithm

A + B

Convert objects to primitives (`ToPrimitive`)

Is either primitive a string?

Yes

String conversion

Concatenation

No

Numeric conversion

Addition

Examples:

```
10 + "20"    // "1020"
10 + true    // 11
10 + null    // 10
10 + undefined // NaN
[] + 10      // "10"
{} + 10      // "[object Object]10" when parsed as an object expression
```

Important: For binary `+`, both operands are converted to primitives first. BigInt and Number cannot be mixed in arithmetic, so `10n + 10` throws a `TypeError`.

## 3. The `==` operator – conversion rules

Memorize this decision table.

| Left operand | Right operand  | What happens?                           |
| ------------ | -------------- | --------------------------------------- |
| Same type    | Same type      | Compare values or object identity       |
| Number       | String         | Convert string to number                |
| String       | Number         | Convert string to number                |
| Boolean      | Any other type | Convert Boolean to number               |
| Any type     | Boolean        | Convert Boolean to number               |
| Object       | Primitive      | Convert object to primitive             |
| Primitive    | Object         | Convert object to primitive             |
| `null`       | `undefined`    | Always true                             |
| `null`       | Other values   | False under this special null rule      |
| `undefined`  | Other values   | False under this special undefined rule |

console.log([] == []);  // false
console.log([] === []); // false

Because each [] creates a new array object.

Examples:

```
10 == "10"       // true
true == 1        // true
false == 0       // true
null == undefined // true
null == 0        // false
[] == 0          // true
[] == false      // true
[1] == 1         // true
```

### Special rule: Null and undefined

Keep this separate in your mind.

```
null == undefined // true

null == 0         // false
null == false     // false
null == ""        // false

undefined == 0    // false
undefined == false // false
```

Don't apply ordinary numeric conversion to `null` and `undefined` when performing loose equality.

## 4. The `===` operator

No coercion

```
10 === "10"       // false
true === 1        // false
null === undefined // false

[] === []         // false
{} === {}         // false

NaN === NaN       // false
+0 === -0         // true
```

Objects are compared by identity, not their contents.

## 5. Relational operators – conversion rules

For `>`, `<`, `>=`, `<=`:

1. Convert objects to primitives.
2. If both primitives are strings, compare lexicographically.
3. Otherwise, perform numeric comparison.
4. If numeric conversion produces `NaN`, the comparison is false.

| Expression      | Result | Reason             |
| --------------- | ------ | ------------------ |
| `"10" > "2"`    | false  | String comparison  |
| `"10" > 2`      | true   | Numeric comparison |
| `true > false`  | true   | 1 > 0              |
| `null >= 0`     | true   | 0 >= 0             |
| `null > 0`      | false  | 0 > 0              |
| `undefined > 0` | false  | NaN comparison     |
| `NaN >= 0`      | false  | NaN comparison     |

## 6. Conversion reference table

This is your quick lookup when you encounter arrays, objects, null and undefined.

| Value       | `Number(value)` | `String(value)`     | `Boolean(value)` |
| ----------- | --------------- | ------------------- | ---------------- |
| `0`         | 0               | `"0"`               | false            |
| `1`         | 1               | `"1"`               | true             |
| `true`      | 1               | `"true"`            | true             |
| `false`     | 0               | `"false"`           | false            |
| `null`      | 0               | `"null"`            | false            |
| `undefined` | NaN             | `"undefined"`       | false            |
| `""`        | 0               | `""`                | false            |
| `"10"`      | 10              | `"10"`              | true             |
| `"hello"`   | NaN             | `"hello"`           | true             |
| `" "`       | 0               | `" "`               | true             |
| `[]`        | 0               | `""`                | true             |
| `[5]`       | 5               | `"5"`               | true             |
| `[1,2]`     | NaN             | `"1,2"`             | true             |
| `{}`        | NaN             | `"[object Object]"` | true             |

These object conversion results assume ordinary built-in conversion behavior, without custom methods.

## 7. Falsy values – memorize these eight

# 8 falsy values

## false

## 0

## -0

## 0n

## ""

## null

## undefined

## NaN

Everything else is truthy (for ordinary JavaScript values).

## 8. The most useful conversion examples

| Expression    | Result              |
| ------------- | ------------------- |
| `+[]`         | `0`                 |
| `+{}`         | `NaN`               |
| `!![]`        | `true`              |
| `!!{}`        | `true`              |
| `![] + []`    | `"false"`           |
| `[] + []`     | `""`                |
| `[] + {}`     | `"[object Object]"` |
| `true + true` | `2`                 |
| `[] == ![]`   | `true`              |
| `[] == false` | `true`              |
| `[1] == true` | `true`              |
| `null == 0`   | `false`             |
| `null >= 0`   | `true`              |

# My recommended solving technique

Whenever you see a tricky expression, follow this sequence:

1. Identify the operator

   Is it `+`, `==`, `===`, `>`, `!`, `&&` or `||`?
2. Check operand types

   Are they strings, numbers, Booleans, arrays, objects or null?
3. Apply the operator's conversion rule

   Don't apply `+` rules to `==` or relational operators.
4. Convert objects to primitives when required

   Check `valueOf()`, `toString()` and `Symbol.toPrimitive`.
5. Evaluate left to right

   Respect parentheses, operator precedence and short-circuiting.
6. Determine the final type and value

   Is the result a number, string, Boolean or an error?

One final piece of advice, man: Don't try to remember 100 strange JavaScript outputs. Remember these conversion rules. Once you understand the rules, you can solve expressions you've never seen before.

Keep this cheat sheet handy for Part 8 – our final advanced assessment. 💪