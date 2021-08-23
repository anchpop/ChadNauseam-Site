---
title: Recursion Schemes in OCaml
date: "2021-08-23T22:12:03.284Z"
description: Recursion schemes are functions that automate the traversal of nested data structures. With them, recursive code can be written in a way that is much simpler and easier to understand.
---

Recursion schemes are functions that automate the traversal of nested data structures. With them, recursive code can be written in a way that is much simpler and easier to understand. The best introduction in the world to recursion schemes is written by [Patrick Thomson on Sum Type Of Way](https://blog.sumtypeofway.com/posts/introduction-to-recursion-schemes.html), and the [documentation for the Haskell recursion-schemes library](https://hackage.haskell.org/package/recursion-schemes-5.2.2.1/docs/Data-Functor-Foldable.html#g:3) is a nice complement. (But in case you don't like Haskell, I'll briefly go over them as I implement them.)

Recursion schemes are popular in Haskell, but I think they actually make even more sense for OCaml. That's because they abstract away the actual process of recursing through a data structure. That means they can be implemented in such a way that all operations are tail-recursive and therefore stack-safe, which is otherwise a pain to do by hand.

So, let's get into it.

## Opening Up Recursive Types

The basic operation we want to do is this transformation:

```reasonml
type List('a)     = Nil | Cons('a, List('a))
                    ↓
type List('a, 'f) = Nil | Cons('a, 'f)
```

This turns a recursive type to a type that supports "open recursion". If you have rectypes enabled, you can actually recover the original type using `List('a, 'f) as 'f`.

(In case that's confusing, here's a hint: it's kind of like saying `'f = List('a, 'f)`. Substituting `'f` on the right hand side, you get `'f = List('a, List('a, 'f))`. Repeat and you get `'f = List('a, List('a, List('a, List('a, ...))))` to infinity.)
