import React from "react";

const Blogs = () => {
  return (
    <div className='container mx-auto p3 text-lg my-10 md:my-20'>
      <div className='w-8/12 mx-auto'>
        <h1 className='font-semibold text-3xl mb-4'>
          How will you improve the performance of a React Application?
        </h1>
        <p className='mb-4'>
          So how did we improve the performance of a React Application? We came
          to know that all of these are happening because of the unnecessary
          re-rendering of components. Horribly it is killing the performance of
          a React Application. We looked at the smallest of the components and
          asked ourselves that if the data is not changing, then why does this
          component re-render itself? We started seeing the patterns and came up
          with the resolutions below:
          <br /> <br />
          1. Remove all Inline Functions An inline function is a function that
          is defined and passed down inside the render method of a React
          component. Our code was filled with inline functions. Inline functions
          have
          <br /> <br />
          2 big problems: It will always trigger a re-render of the component
          even if there is no change in the props. It increases the memory
          footprint of the app. (Refer: Function spaces in Memory snapshot of
          Firefox) Solution: Move all inline functions outside the render() such
          that it does not get redefined on every render cycle.
          <br />
          <br />
          3. Conditional rendering of the components Commonly, we write down
          components that get rendered when clicked or any other event e.g.
          Modals or Dropdowns. Solution: We avoided rendering these components
          until they are needed i.e. Conditional Rendering. 4. Remove
          unnecessary awaits and use Promise.all() wherever applicable
        </p>
      </div>
      <div className='w-8/12 mx-auto my-10'>
        <h1 className='font-semibold text-3xl mb-4'>
          What are the different ways to manage a state in a React application?
        </h1>
        <p className='mb-4'>
          There are Four Kinds of React State to Manage. When we talk about
          state in our applications, it's important to be clear about what types
          of state actually matter. There are four main types of state you need
          to properly manage in your React apps:
          <br />
          <strong>1. Local state </strong>
          <br />
          <strong>2. Global state </strong>
          <br />
          <strong>3. Server state </strong>
          <br />
          <strong>4. URL state </strong>
          <br /> <br />
          <strong>Local state:</strong> Local state is data we manage in one or
          another component. Local state is most often managed in React using
          the useState hook.
          <strong>Global state:</strong> Global state is data we manage across
          multiple components. Global state is necessary when we want to get and
          update data anywhere in our app, or in multiple components at least.We
          can Manage Global State With Redux. <strong>Server state</strong> Data
          that comes from an external server that must be integrated with our UI
          state. Server state is a simple concept, but can be hard to manage
          alongside all of our local and global UI state. URL state Data that
          exists on our URLs, including the pathname and query parameters.
        </p>
      </div>
      <div className='w-8/12 mx-auto'>
        <h1 className='font-semibold text-3xl mb-4'>
          How does prototypical inheritance work?
        </h1>
        <div className='mb-4'>
          The Prototypal Inheritance is a feature in javascript used to add
          methods and properties in objects. It is a method by which an object
          can inherit the properties and methods of another object.
          Traditionally, in order to get and set the [[Prototype]] of an object,
          we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in
          modern language, it is being set using __proto__.
        </div>
      </div>
      <div className='w-8/12 mx-auto'>
        <h1 className='font-semibold text-3xl mb-4'>
          Why you do not set the state directly in React?
        </h1>
        <p className='mb-4'>
          React follows Unidirectional Data Flow. Meaning, the data flow inside
          react should and will be expected to be in a circular path. To make
          React work like this, developers made React similar to functional
          programming. The rule of thumb of functional programming is
          immutability. Let me explain it loud and clear. So, when you mutate
          the state directly and call setState() with an empty object. The
          previous state will be polluted with your mutation. Due to which, the
          shallow compare and merge of two states will be disturbed or won't
          happen, because you'll have only one state now. This will disrupt all
          the React's Lifecycle Methods. As a result, your app will behave
          abnormal or even crash. Most of the times, it won't affect your app
          because all the apps which we use for testing this are pretty small.
          And another downside of mutation of Objects and Arrays in JavaScript
          is, when you assign an object or an array, you're just making a
          reference of that object or that array. When you mutate them, all the
          reference to that object or that array will be affected. React handles
          this in a intelligent way in the background and simply give us an API
          to make it work.
        </p>
      </div>
      <div className='w-8/12 mx-auto'>
        <h1 className='font-semibold text-3xl mb-4'>
          How will you implement a search to find products by name?
        </h1>
        <p className='mb-4'>
          You have an array of products. Each product has a name, price,
          description, etc. How will you implement a search to find products by
          name? The answer is very simple, I can find the products by name using
          filter() method. I will filter from array by name that includes the
          string that I give in search field.
        </p>
      </div>
      <div className='w-8/12 mx-auto'>
        <h1 className='font-semibold text-3xl mb-4'>
          What is a unit test? Why should write unit tests?
        </h1>
        <p className='mb-4'>
          What is Unit Testing? UNIT TESTING is a type of software testing where
          individual units or components of a software are tested. The purpose
          is to validate that each unit of the software code performs as
          expected. Unit Testing is done during the development (coding phase)
          of an application by the developers. Unit Tests isolate a section of
          code and verify its correctness. A unit may be an individual function,
          method, procedure, module, or object. Why Unit Testing? Unit Testing
          is important because software developers sometimes try saving time
          doing minimal unit testing and this is myth because inappropriate unit
          testing leads to high cost Defect fixing during System Testing,
          Integration Testing and even Beta Testing after application is built.
          If proper unit testing is done in early development, then it saves
          time and money in the end.
        </p>
      </div>
    </div>
  );
};

export default Blogs;
