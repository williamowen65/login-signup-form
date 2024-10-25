## Losse-coupling (form)

I'm wondering about the form HTML...

The abstract/form and the Form sub-classes assume a specific html input style with layout, css, and class, ids...
    Should the shape of the html be built into the class so that the "client" doesn't need know how to make them?
    But what about customizing the form?
        YOu want to maintain the ability to have flexibility with forms..
        Maybe this abstract Form has its own custom html components which are for form inputs.
            You can still arrange them how you like..
