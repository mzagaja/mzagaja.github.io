---
title: One Scope Issue with Ruby 2 and 3 Keyword Argument Updates
layout: post
---
The other day we had an issue with scope when migrating from the Ruby 2 to Ruby 3 syntax for hash arguments. Previously we had something like:

```ruby
def foo(**kwargs)
  kwargs[:value] += 1
end
```

In Ruby 2 you can then do:

```ruby
hash = { value: 1 }
foo(hash)
```

and the value of `kwargs[:value]` **inside** the method would increment, but it would not impact the value o**utside** the method.

In Ruby 3 `foo(hash)` is now an error:

```
(irb):1:in `foo': wrong number of arguments (given 1, expected 0) (ArgumentError)
```

To fix this the [migration guide](https://www.ruby-lang.org/en/news/2019/12/12/separation-of-positional-and-keyword-arguments-in-ruby-3-0/) suggests you might change the method to read:

```ruby
def foo(kwargs = {})
  kwargs[:value] += 1
end
```

This is mostly equivalent but the trick is this now mutates the value of `kwargs[:value]` **outside** the method. Suddenly you might see bugs you did not see before.

### What This Means
In Ruby 2 `def foo(**kwargs)` creates a copy of the hash and changes it inside the method without the impacting its value outside the method. In Ruby 2 and 3 the `def foo(kwargs = {})` syntax merely passes the hash into the method and any changes you make to it are seen inside or outside the method.