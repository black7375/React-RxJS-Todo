## React RxJS Todo

### Goal
* Performance
* Code of simplicity
* Using React && RxJS
* Design concepts to be concerned later in other project
* Responsive design
* PWA and Web Component are also introduced after a time
* And so on overengineering

[Redux Sample](https://github.com/black7375/React-RxJS-Todo/tree/redux)

### Library
**Main**
* [React](https://reactjs.org/) (with @types)
* [RxJS](https://rxjs-dev.firebaseapp.com/)
* [Typescript](https://www.typescriptlang.org/)
* [SCSS](https://sass-lang.com/) (with @types)

**Sub**
* [ImmutableJS](https://immutable-js.github.io/immutable-js/)
* [RecyclerListView](https://github.com/Flipkart/recyclerlistview)

### Performance
**Condition**

I tried to make it as slow as possible.
* Develope mode
* Disable Cache
* CPUx6 Throttling
* 2500 List
* Checkbox ON/OFF

**Load Result:** 773ms
![todo-performance](https://user-images.githubusercontent.com/25581533/82766185-7ea8a880-9e0c-11ea-894c-77ad343509ef.png)

**Rendering Result:** 6.4ms
![todo-performance2](https://user-images.githubusercontent.com/25581533/82767118-79e7f280-9e14-11ea-821d-62ff1bff492c.png)
To the unusual point.  
`App`, `TodoTemplate`, and `TotoInsert` are excluded from rendering.


### Design
**Fluid Size**

A method of fluidly resizing in response to various devices.

It is a way to respond to the distance between the eye and the device, the size and resolution of the device.
![fluid-font-size](https://user-images.githubusercontent.com/25581533/82766346-d8f63900-9e0d-11ea-9b3b-ceabd7832e4b.png)

**Principle**

Use visual angles to determine the `fit size`(I called) for each device.
![View_Distance](https://user-images.githubusercontent.com/25581533/82766340-cc71e080-9e0d-11ea-8268-7c965e6544c0.jpeg)
source: [Legibility: how to make text convenient to read](https://uxdesign.cc/legibility-how-to-make-text-convenient-to-read-7f96b84bd8af), 

**Calculation process**

1. Size specification
2. Angle calculations in the devices that would look the smallest(or can you specify which device to reference?)
3. Generate a `fit size` for each device based on the angle
4. Provides fluidity between devices
