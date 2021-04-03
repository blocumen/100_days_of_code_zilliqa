# Mistakes I made

1. While assigning values to mutable variables we should use :=
   e.g.
   welcome_msg := msg;

I have used just = and compiler didn't show any error but on deploy, value was not getting assigned
welcome_msg = msg; -- this is wrong
